import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Download, BarChart2, MessageSquare, AlertCircle, Copy, BookOpen } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const FacultyDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('analysis');
  
  // State for questions
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editQuestionText, setEditQuestionText] = useState('');

  // State for classes
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState('');

  // State for analysis
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [qRes, aRes, cRes] = await Promise.all([
        api.get('/faculty/questions'),
        api.get('/faculty/dashboard'),
        api.get('/faculty/classes')
      ]);
      setQuestions(qRes.data.questions || []);
      setAnalysis(aRes.data);
      setClasses(cRes.data.classes || []);
    } catch (error) {
      console.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClass = async (e) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    try {
      await api.post('/faculty/classes', { class_name: newClassName });
      setNewClassName('');
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const loadDefaultQuestions = async () => {
    const defaults = [
      "How would you rate the punctuality of the faculty?",
      "Was the syllabus covered in a timely manner?",
      "How effective were the communication skills?",
      "Did the faculty clarify doubts effectively?",
      "How would you rate the overall teaching effectiveness?"
    ];
    try {
      for (let q of defaults) {
        await api.post('/faculty/questions', { question: q });
      }
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    try {
      await api.post('/faculty/questions', { question: newQuestion });
      setNewQuestion('');
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateQuestion = async (e) => {
    e.preventDefault();
    if (!editQuestionText.trim()) return;
    try {
      await api.put('/faculty/questions', { 
        question: editingQuestion.question,
        new_question: editQuestionText 
      });
      setEditingQuestion(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteQuestion = async (questionText) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await api.delete('/faculty/questions', { data: { question: questionText } });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await api.get('/faculty/download_feedback', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'feedback.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Download failed', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-light dark:bg-gray-900 transition-colors">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light dark:bg-gray-900 pt-32 pb-20 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 dark:bg-white/10 backdrop-blur-md border border-primary/20 dark:border-white/20 mb-6">
              <p className="text-primary font-bold tracking-wider uppercase text-xs md:text-sm">Faculty</p>
            </div>
            <h1 className="text-4xl font-extrabold text-dark dark:text-white mb-2">Management Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Welcome, <span className="font-bold text-primary">{user?.username}</span>.</p>
          </div>
          <button 
            onClick={handleDownload}
            className="flex items-center justify-center px-6 py-3 bg-secondary hover:bg-secondary/90 text-white font-bold rounded shadow-sm transition-colors uppercase tracking-wide text-sm w-fit"
          >
            <Download className="w-4 h-4 mr-2" />
            Export to Excel
          </button>
        </div>

        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-10 overflow-x-auto hide-scrollbar">
          <button
            className={`px-8 py-4 font-bold uppercase tracking-wide text-sm transition-colors whitespace-nowrap ${activeTab === 'analysis' ? 'text-primary border-b-2 border-primary bg-white dark:bg-gray-800' : 'text-gray-500 dark:text-gray-400 hover:text-dark dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            onClick={() => setActiveTab('analysis')}
          >
            <div className="flex items-center">
              <BarChart2 className="w-4 h-4 mr-2" />
              Feedback Analysis
            </div>
          </button>
          <button
            className={`px-8 py-4 font-bold uppercase tracking-wide text-sm transition-colors whitespace-nowrap ${activeTab === 'questions' ? 'text-primary border-b-2 border-primary bg-white dark:bg-gray-800' : 'text-gray-500 dark:text-gray-400 hover:text-dark dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            onClick={() => setActiveTab('questions')}
          >
            <div className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Manage Questions
            </div>
          </button>
          <button
            className={`px-8 py-4 font-bold uppercase tracking-wide text-sm transition-colors whitespace-nowrap ${activeTab === 'classes' ? 'text-primary border-b-2 border-primary bg-white dark:bg-gray-800' : 'text-gray-500 dark:text-gray-400 hover:text-dark dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            onClick={() => setActiveTab('classes')}
          >
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Classes & Codes
            </div>
          </button>
        </div>

        {activeTab === 'classes' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded shadow-sm mb-10 border border-white/50 dark:border-gray-700/50">
              <h3 className="text-xl font-bold text-dark dark:text-white mb-6">Create New Class</h3>
              <form onSubmit={handleCreateClass} className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text" 
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="E.g. Data Structures - Section A"
                  className="flex-1 bg-transparent border border-gray-200 dark:border-gray-700 dark:text-white rounded px-4 py-4 focus:outline-none focus:border-primary transition-colors text-sm"
                />
                <button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded font-bold transition-colors flex items-center justify-center uppercase tracking-wide text-sm"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create
                </button>
              </form>
            </div>

            <h3 className="text-xl font-bold text-dark dark:text-white mb-6">Active Classes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.length > 0 ? (
                classes.map((cls, idx) => (
                  <div key={idx} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded shadow-sm border-t-4 border-t-primary border-l border-r border-b border-white/50 dark:border-l-gray-700/50 dark:border-r-gray-700/50 dark:border-b-gray-700/50 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-dark dark:text-white mb-2">{cls.class_name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Share this code with your students so they can rate you.</p>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <span className="font-mono text-2xl font-bold text-primary tracking-widest">{cls.access_code}</span>
                      <button 
                        onClick={() => navigator.clipboard.writeText(cls.access_code)}
                        className="p-2 text-gray-400 hover:text-primary transition-colors bg-white dark:bg-gray-800 rounded shadow-sm"
                        title="Copy Code"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-12 rounded shadow-sm text-center text-gray-400 dark:text-gray-500 border border-white/50 dark:border-gray-700/50">
                  <p className="font-medium text-lg">You haven't created any classes yet.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'analysis' && analysis && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded shadow-sm border-t-4 border-t-primary text-center border border-white/50 dark:border-gray-700/50">
                <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Average Rating</h3>
                <p className="text-5xl font-extrabold text-dark dark:text-white">{analysis.avg_rating.toFixed(1)} <span className="text-xl text-gray-400 dark:text-gray-500 font-normal">/ 5.0</span></p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded shadow-sm border-t-4 border-t-green-500 text-center border border-white/50 dark:border-gray-700/50">
                <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Positive Feedback</h3>
                <p className="text-5xl font-extrabold text-dark dark:text-white">{analysis.positive_count}</p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded shadow-sm border-t-4 border-t-secondary text-center border border-white/50 dark:border-gray-700/50">
                <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Needs Improvement</h3>
                <p className="text-5xl font-extrabold text-dark dark:text-white">{analysis.negative_count}</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-dark dark:text-white mb-6">Recent Comments</h3>
            <div className="space-y-4">
              {analysis.comments.filter(c => c.trim()).length > 0 ? (
                analysis.comments.filter(c => c.trim()).map((comment, idx) => (
                  <div key={idx} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded shadow-sm border-l-4 border-l-primary border-t border-r border-b border-white/50 dark:border-t-gray-700/50 dark:border-r-gray-700/50 dark:border-b-gray-700/50">
                    <p className="text-gray-600 dark:text-gray-300 italic">"{comment}"</p>
                  </div>
                ))
              ) : (
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-12 rounded shadow-sm text-center text-gray-400 dark:text-gray-500 flex flex-col items-center border border-white/50 dark:border-gray-700/50">
                  <AlertCircle className="w-10 h-10 mb-4 opacity-30" />
                  <p className="font-medium text-lg">No comments received yet.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'questions' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded shadow-sm mb-10 border border-white/50 dark:border-gray-700/50">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                <h3 className="text-xl font-bold text-dark dark:text-white">Add New Question</h3>
                <button 
                  onClick={loadDefaultQuestions}
                  type="button"
                  className="px-6 py-3 bg-secondary hover:bg-secondary/90 text-white font-bold rounded shadow-sm transition-colors uppercase tracking-wide text-xs w-fit flex items-center"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Load College Defaults
                </button>
              </div>
              <form onSubmit={handleAddQuestion} className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text" 
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Enter evaluation question..."
                  className="flex-1 bg-transparent border border-gray-200 dark:border-gray-700 dark:text-white rounded px-4 py-4 focus:outline-none focus:border-primary transition-colors text-sm"
                />
                <button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded font-bold transition-colors flex items-center justify-center uppercase tracking-wide text-sm"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add
                </button>
              </form>
            </div>

            <h3 className="text-xl font-bold text-dark dark:text-white mb-6">Current Questions</h3>
            <div className="space-y-4">
              {questions.length > 0 ? (
                questions.map((q, idx) => (
                  <div key={q._id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group transition-all hover:shadow-md border-l-4 border-transparent hover:border-primary border-t border-r border-b border-white/50 dark:border-t-gray-700/50 dark:border-r-gray-700/50 dark:border-b-gray-700/50">
                    {editingQuestion?._id === q._id ? (
                      <form onSubmit={handleUpdateQuestion} className="flex-1 flex flex-col sm:flex-row gap-2">
                        <input 
                          type="text" 
                          value={editQuestionText}
                          onChange={(e) => setEditQuestionText(e.target.value)}
                          className="flex-1 bg-transparent border border-gray-200 dark:border-gray-700 dark:text-white rounded px-3 py-3 focus:outline-none focus:border-primary text-sm"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button type="submit" className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded font-bold uppercase text-xs tracking-wide">Save</button>
                          <button type="button" onClick={() => setEditingQuestion(null)} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-dark dark:text-white rounded font-bold uppercase text-xs tracking-wide">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <p className="text-dark dark:text-white font-medium flex-1"><span className="text-primary font-bold mr-3">{idx + 1}.</span>{q.question}</p>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => { setEditingQuestion(q); setEditQuestionText(q.question); }}
                            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteQuestion(q.question)}
                            className="p-2 text-gray-400 hover:text-secondary hover:bg-secondary/10 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-12 rounded shadow-sm text-center text-gray-400 dark:text-gray-500 border border-white/50 dark:border-gray-700/50">
                  <p className="font-medium text-lg">You haven't added any questions yet.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
