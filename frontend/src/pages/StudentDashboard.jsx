import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [accessCode, setAccessCode] = useState('');
  const [classInfo, setClassInfo] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!accessCode.trim()) return;
    setIsSubmitting(true);
    setError('');
    try {
      const res = await api.get(`/student/verify_code/${accessCode}`);
      setClassInfo({ faculty: res.data.faculty, class_name: res.data.class_name });
      setQuestions(res.data.questions || []);
      setResponses({});
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid access code');
      setClassInfo(null);
      setQuestions([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingChange = (questionText, rating) => {
    setResponses(prev => ({ ...prev, [questionText]: rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(responses).length !== questions.length) {
      setError('Please rate all questions');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const formattedResponses = Object.keys(responses).map(q => ({
      question: q,
      rating: parseInt(responses[q], 10)
    }));

    try {
      await api.post('/student/feedback', {
        faculty: classInfo.faculty,
        access_code: accessCode,
        is_anonymous: isAnonymous,
        responses: formattedResponses,
        comment
      });
      setSubmitSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-light dark:bg-gray-900 pt-32 pb-20 flex items-center justify-center px-4 transition-colors">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-10 rounded shadow-sm text-center max-w-lg w-full border-t-4 border-primary border border-white/50 dark:border-gray-700/50"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary text-4xl">
            ✓
          </div>
          <h2 className="text-3xl font-bold text-dark dark:text-white mb-4">Thank You!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Your feedback has been submitted successfully and will help us improve.</p>
          <button 
            onClick={() => {
              setSubmitSuccess(false);
              setAccessCode('');
              setClassInfo(null);
              setComment('');
              setResponses({});
              setIsAnonymous(false);
            }}
            className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded uppercase tracking-wide transition-colors"
          >
            Submit Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light dark:bg-gray-900 pt-32 pb-20 transition-colors">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-10 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 dark:bg-white/10 backdrop-blur-md border border-primary/20 dark:border-white/20 mb-6">
            <p className="text-primary font-bold tracking-wider uppercase text-xs md:text-sm">Student Portal</p>
          </div>
          <h1 className="text-4xl font-extrabold text-dark dark:text-white mb-4">Feedback System</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back, <span className="text-primary font-bold">{user?.username}</span>. Your feedback helps us improve.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-8 text-sm text-center">
            {error}
          </div>
        )}

        {!classInfo && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/50 dark:border-gray-700/50 p-8 rounded shadow-sm mb-8">
            <h2 className="text-xl font-bold text-dark dark:text-white mb-6">Enter Access Code</h2>
            <form onSubmit={handleVerifyCode} className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="E.g. X7K9QA"
                className="flex-1 bg-transparent border border-gray-200 dark:border-gray-700 dark:text-white rounded px-4 py-4 focus:outline-none focus:border-primary transition-colors text-sm font-mono tracking-widest uppercase"
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded font-bold transition-colors uppercase tracking-wide text-sm disabled:opacity-70"
              >
                {isSubmitting ? 'Verifying...' : 'Verify Code'}
              </button>
            </form>
          </div>
        )}

        <AnimatePresence>
          {classInfo && questions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t-4 border-t-primary p-6 rounded shadow-sm border border-white/50 dark:border-gray-700/50 mb-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-dark dark:text-white">{classInfo.class_name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">Faculty: <span className="font-bold text-primary">{classInfo.faculty}</span></p>
                  </div>
                  <button type="button" onClick={() => setClassInfo(null)} className="text-sm text-gray-400 hover:text-dark dark:hover:text-white transition-colors">Change Class</button>
                </div>

                <div className="space-y-6">
                  {questions.map((q, idx) => (
                    <div key={q._id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded shadow-sm hover:shadow-md transition-shadow border-l-4 border-transparent hover:border-primary border-t border-r border-b border-white/50 dark:border-t-gray-700/50 dark:border-r-gray-700/50 dark:border-b-gray-700/50">
                      <p className="text-lg text-dark dark:text-white font-medium mb-6"><span className="text-primary mr-2 font-bold">{idx + 1}.</span>{q.question}</p>
                      <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <label key={rating} className="relative cursor-pointer">
                            <input 
                              type="radio" 
                              name={`rating-${q._id}`} 
                              value={rating} 
                              className="sr-only peer"
                              onChange={() => handleRatingChange(q.question, rating)}
                              checked={responses[q.question] === rating}
                            />
                            <motion.div 
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 font-bold text-lg
                                ${responses[q.question] === rating 
                                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' 
                                  : 'bg-transparent border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:border-primary hover:text-primary'
                                }`}
                            >
                              {rating}
                            </motion.div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/50 dark:border-gray-700/50 p-8 rounded shadow-sm">
                  <label className="block text-sm font-bold text-dark dark:text-white mb-3 uppercase tracking-wide">Additional Comments (Optional)</label>
                  <textarea 
                    rows="4"
                    className="w-full bg-transparent border border-gray-200 dark:border-gray-700 dark:text-white rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                    placeholder="Share any other thoughts..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded shadow-sm border border-white/50 dark:border-gray-700/50">
                  <input 
                    type="checkbox" 
                    id="anonymous" 
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                  <label htmlFor="anonymous" className="text-dark dark:text-white font-medium cursor-pointer flex-1">
                    Submit Anonymously
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">Your username will not be recorded with this feedback.</p>
                  </label>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wide"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StudentDashboard;
