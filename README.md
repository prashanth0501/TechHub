# TechHub Website

TechHub is an educational platform offering modern software development courses, feedback systems, and community expert guidance.

## Project Architecture

This project is structured as a modern single-page application (SPA) backed by a REST API. It is divided into two main components:

### 1. Frontend (`/frontend`)
The client-side interface built with modern web technologies:
- **Framework**: React.js (via Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router

**To run the frontend locally:**
```bash
cd frontend
npm install
npm run dev
```

### 2. Backend API (`/Python-feedback`)
The RESTful JSON API handling authentication, role-based dashboards, and feedback submission:
- **Framework**: Python Flask
- **Database**: MongoDB
- **Authentication**: Flask-Login & bcrypt

**To run the backend locally:**
```bash
cd Python-feedback
python app.py
```

## Core Features
- **Role-Based Access Control**: Distinct features and dashboard experiences for Students and Faculty.
- **Feedback Management**: Secure session codes for submitting and aggregating course feedback.
- **Dynamic Course Showcase**: Explore courses, meet the founders, and connect with community experts.
