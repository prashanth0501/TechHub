from flask import Flask, request, jsonify, session, send_file
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer
from flask_cors import CORS
import pandas as pd
from io import BytesIO
from datetime import datetime
import os

app = Flask(__name__)
# Enable CORS for the frontend origin
CORS(app, supports_credentials=True, origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"])

app.secret_key = os.urandom(24)  # Secret key for session handling
bcrypt = Bcrypt(app)

# Email Configuration
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = "iamprashanthb05@gmail.com"  
app.config["MAIL_PASSWORD"] = "ljvt wxit nfzw nujk" 
app.config["MAIL_DEFAULT_SENDER"] = "iamprashanthb05@gmail.com"

mail = Mail(app)

# Secret Key for Token Generation
app.config["SECRET_KEY"] = "your_secret_key"
serializer = URLSafeTimedSerializer(app.config["SECRET_KEY"])

# Initialize LoginManager
login_manager = LoginManager()
login_manager.init_app(app)

# Custom Unauthorized Handler for APIs
@login_manager.unauthorized_handler
def unauthorized():
    return jsonify({"error": "Unauthorized"}), 401

# Set up MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["feedbackDB"]
users_collection = db["users"]
feedback_collection = db["feedback"]
questions_collection = db["questions"]
classes_collection = db["classes"]

# Constants for user roles
ROLE_STUDENT = "student"
ROLE_FACULTY = "faculty"

# User class to work with Flask-Login
class User(UserMixin):
    def __init__(self, id, username, role):
        self.id = id
        self.username = username
        self.role = role

# This will be used to load the user from the database
@login_manager.user_loader
def load_user(user_id):
    user_data = users_collection.find_one({"_id": ObjectId(user_id)})
    if user_data:
        return User(str(user_data["_id"]), user_data["username"], user_data["role"])
    return None

# Check current user session route
@app.route("/api/auth/me", methods=["GET"])
def get_current_user():
    if current_user.is_authenticated:
        return jsonify({
            "user": {
                "id": current_user.id,
                "username": current_user.username,
                "role": current_user.role
            }
        })
    return jsonify({"user": None}), 401

# Signup Page API
@app.route("/api/auth/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    role = data.get("role")

    if not username or not password or not role:
        return jsonify({"error": "Missing fields"}), 400

    # Check if the username already exists
    if users_collection.find_one({"username": username}):
        return jsonify({"error": "Username already exists. Please choose a different one."}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    users_collection.insert_one({"username": username, "password": hashed_password, "role": role})
    return jsonify({"message": "Signup successful!"}), 201

# Login Page API
@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    
    user = users_collection.find_one({"username": username})

    if user and bcrypt.check_password_hash(user["password"], password):
        user_obj = User(str(user["_id"]), user["username"], user["role"])
        login_user(user_obj)
        session["username"] = user["username"]
        session["role"] = user["role"]
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": str(user["_id"]),
                "username": user["username"],
                "role": user["role"]
            }
        }), 200
    else:
        return jsonify({"error": "Invalid credentials. Please try again."}), 401

# Forgot Password Route API
@app.route("/api/auth/forgot_password", methods=["POST"])
def forgot_password():
    data = request.json
    email = data.get("email")
    user = users_collection.find_one({"username": email})  

    if user:
        token = serializer.dumps(email, salt="password-reset-salt")
        reset_link = f"http://localhost:5173/reset-password/{token}"

        # Send Reset Email
        msg = Message("Password Reset Request", recipients=[email])
        msg.body = f"Click the link to reset your password: {reset_link}"
        mail.send(msg)

        return jsonify({"message": "A password reset link has been sent to your email."}), 200
    else:
        return jsonify({"error": "No account found with this email."}), 404


# Reset Password Route API
@app.route("/api/auth/reset_password/<token>", methods=["POST"])
def reset_password(token):
    try:
        email = serializer.loads(token, salt="password-reset-salt", max_age=600)  # 10 min expiry
    except:
        return jsonify({"error": "Invalid or expired token."}), 400

    data = request.json
    new_password = data.get("password")
    if not new_password:
        return jsonify({"error": "Password is required"}), 400

    hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")
    users_collection.update_one({"username": email}, {"$set": {"password": hashed_password}})

    return jsonify({"message": "Your password has been reset successfully."}), 200

# Fetch Questions API for Faculty
@app.route("/api/faculty/questions", methods=["GET"])
@login_required
def get_faculty_questions():
    if current_user.role != ROLE_FACULTY:
        return jsonify({"error": "Unauthorized"}), 403
    
    questions = list(questions_collection.find({"faculty": current_user.username}))
    for q in questions:
        q["_id"] = str(q["_id"])
    return jsonify({"questions": questions}), 200

# Add/Update/Delete Questions API
@app.route("/api/faculty/questions", methods=["POST", "PUT", "DELETE"])
@login_required
def manage_questions():
    if current_user.role != ROLE_FACULTY:
        return jsonify({"error": "Unauthorized"}), 403
        
    data = request.json
    question_text = data.get("question")
    
    if request.method == "POST":
        if not question_text:
            return jsonify({"error": "Question is required"}), 400
        questions_collection.insert_one({"faculty": current_user.username, "question": question_text})
        return jsonify({"message": "Question added successfully."}), 201
        
    elif request.method == "PUT":
        new_question = data.get("new_question")
        questions_collection.update_one(
            {"faculty": current_user.username, "question": question_text},
            {"$set": {"question": new_question}}
        )
        return jsonify({"message": "Question updated successfully."}), 200
        
    elif request.method == "DELETE":
        questions_collection.delete_one({"faculty": current_user.username, "question": question_text})
        return jsonify({"message": "Question deleted successfully."}), 200

# Faculty Dashboard Analysis API
@app.route('/api/faculty/dashboard', methods=['GET'])
@login_required
def faculty_dashboard():
    if current_user.role != ROLE_FACULTY:
        return jsonify({"error": "Unauthorized"}), 403
    
    feedback_data = feedback_collection.find({"faculty": current_user.username})
    positive_feedback = []
    negative_feedback = []
    avg_ratings = []
    comments = []
    
    for feedback in feedback_data:
        responses = feedback["responses"]
        avg_rating = sum(response["rating"] for response in responses) / len(responses) if responses else 0
        feedback_analysis = {
            "student": feedback.get("student", "Anonymous"),
            "responses": responses,
            "avg_rating": avg_rating,
            "comment": feedback.get("comment", ""),
            "submitted_at": feedback["submitted_at"],
            "class_name": feedback.get("class_name", "Unknown Class")
        }
        
        avg_ratings.append(avg_rating)
        comments.append(feedback.get("comment", ""))
        
        if avg_rating >= 4:
            positive_feedback.append(feedback_analysis)
        else:
            negative_feedback.append(feedback_analysis)
    
    positive_count = len(positive_feedback)
    negative_count = len(negative_feedback)
    
    avg_rating = sum(avg_ratings) / len(avg_ratings) if avg_ratings else 0

    return jsonify({
        "positive_feedback": positive_feedback,
        "negative_feedback": negative_feedback,
        "positive_count": positive_count,
        "negative_count": negative_count,
        "avg_rating": avg_rating,
        "comments": comments
    }), 200

# Faculty Manage Classes API
@app.route("/api/faculty/classes", methods=["GET", "POST"])
@login_required
def manage_classes():
    if current_user.role != ROLE_FACULTY:
        return jsonify({"error": "Unauthorized"}), 403
    
    if request.method == "POST":
        data = request.json
        class_name = data.get("class_name")
        if not class_name:
            return jsonify({"error": "Class name is required"}), 400
            
        import random
        import string
        # Generate a 6-character random alphanumeric access code
        access_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        
        new_class = {
            "faculty_username": current_user.username,
            "class_name": class_name,
            "access_code": access_code,
            "is_active": True,
            "created_at": datetime.utcnow()
        }
        classes_collection.insert_one(new_class)
        return jsonify({"message": "Class created successfully", "access_code": access_code}), 201
        
    elif request.method == "GET":
        classes = list(classes_collection.find({"faculty_username": current_user.username}))
        for c in classes:
            c["_id"] = str(c["_id"])
        return jsonify({"classes": classes}), 200

# Student Verify Access Code API
@app.route("/api/student/verify_code/<code>", methods=["GET"])
@login_required
def verify_code(code):
    if current_user.role != ROLE_STUDENT:
        return jsonify({"error": "Unauthorized"}), 403
        
    class_obj = classes_collection.find_one({"access_code": code.upper()})
    if not class_obj:
        return jsonify({"error": "Invalid Access Code"}), 404
        
    if not class_obj.get("is_active", True):
        return jsonify({"error": "This feedback session has been closed"}), 403
        
    faculty = class_obj["faculty_username"]
    questions = list(questions_collection.find({"faculty": faculty}))
    for q in questions:
        q["_id"] = str(q["_id"])
        
    return jsonify({
        "faculty": faculty,
        "class_name": class_obj["class_name"],
        "questions": questions
    }), 200

# Student Get Faculties API
@app.route("/api/student/faculties", methods=["GET"])
@login_required
def get_faculties():
    if current_user.role != ROLE_STUDENT:
        return jsonify({"error": "Unauthorized"}), 403
    faculties = [f["username"] for f in users_collection.find({"role": ROLE_FACULTY})]
    return jsonify({"faculties": faculties}), 200

# Student Get Questions for Faculty API
@app.route("/api/student/questions/<faculty_username>", methods=["GET"])
@login_required
def get_student_questions(faculty_username):
    if current_user.role != ROLE_STUDENT:
        return jsonify({"error": "Unauthorized"}), 403
    questions = list(questions_collection.find({"faculty": faculty_username}))
    for q in questions:
        q["_id"] = str(q["_id"])
    return jsonify({"questions": questions}), 200

# Student Submit Feedback API
@app.route("/api/student/feedback", methods=["POST"])
@login_required
def submit_feedback():
    if current_user.role != ROLE_STUDENT:
        return jsonify({"error": "Unauthorized"}), 403
        
    data = request.json
    faculty = data.get("faculty")
    responses = data.get("responses")
    comment = data.get("comment", "")
    access_code = data.get("access_code", "")
    is_anonymous = data.get("is_anonymous", False)

    if not faculty or not responses or not access_code:
        return jsonify({"error": "Invalid data"}), 400
        
    class_obj = classes_collection.find_one({"access_code": access_code.upper()})
    class_name = class_obj["class_name"] if class_obj else "Unknown Class"

    feedback_collection.insert_one({
        "student": "Anonymous" if is_anonymous else current_user.username,
        "faculty": faculty,
        "class_name": class_name,
        "access_code": access_code.upper(),
        "responses": responses,
        "comment": comment,
        "submitted_at": datetime.utcnow()
    })

    return jsonify({"message": "Feedback submitted successfully."}), 201

# Download Feedback API
@app.route('/api/faculty/download_feedback', methods=['GET'])
@login_required
def download_feedback():
    if current_user.role != ROLE_FACULTY:
        return jsonify({"error": "Unauthorized"}), 403
        
    feedback_data = feedback_collection.find({"faculty": current_user.username})
    feedback_list = []
    
    for feedback in feedback_data:
        for response in feedback["responses"]:
            feedback_list.append({
                "student": feedback["student"],
                "question": response["question"],
                "rating": response["rating"],
                "comment": feedback.get("comment", ""),
                "submitted_at": feedback["submitted_at"].strftime('%Y-%m-%d %H:%M:%S') if isinstance(feedback.get("submitted_at"), datetime) else feedback.get("submitted_at")
            })
            
    df = pd.DataFrame(feedback_list)
    output = BytesIO()
    with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
        df.to_excel(writer, index=False)
    output.seek(0)
    
    return send_file(output, as_attachment=True, download_name="feedback.xlsx", mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")

# Logout Route API
@app.route("/api/auth/logout", methods=["POST"])
def logout():
    logout_user()
    session.clear()
    return jsonify({"message": "You have been logged out."}), 200

# Run the app
if __name__ == "__main__":
    app.run(debug=True, port=5000)
