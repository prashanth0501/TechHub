import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/signup', { username, password, role });
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
      >
        <div className="absolute inset-0 bg-dark/60"></div>
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <p className="text-primary font-bold tracking-wider uppercase text-xs md:text-sm">Account</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white">Sign Up</h1>
          </motion.div>
        </div>
      </div>

      <div className="py-20 bg-light dark:bg-gray-900 flex justify-center px-4 transition-colors">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 md:p-12 rounded shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 w-full max-w-md border-t-4 border-primary border border-white/50 dark:border-gray-700/50"
        >
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-6 text-center">Create Account</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-dark dark:text-white mb-2 uppercase tracking-wide">Username</label>
              <input 
                type="text" 
                required
                className="w-full bg-transparent border border-gray-200 dark:border-gray-700 dark:text-white rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-dark dark:text-white mb-2 uppercase tracking-wide">Password</label>
              <input 
                type="password" 
                required
                className="w-full bg-transparent border border-gray-200 dark:border-gray-700 dark:text-white rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark dark:text-white mb-2 uppercase tracking-wide">Role</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`py-3 rounded border font-bold transition-colors uppercase tracking-wide text-xs ${role === 'student' ? 'bg-primary border-primary text-white' : 'bg-transparent border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:border-primary'}`}
                  onClick={() => setRole('student')}
                >
                  Student
                </button>
                <button
                  type="button"
                  className={`py-3 rounded border font-bold transition-colors uppercase tracking-wide text-xs ${role === 'faculty' ? 'bg-primary border-primary text-white' : 'bg-transparent border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:border-primary'}`}
                  onClick={() => setRole('faculty')}
                >
                  Faculty
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-4 rounded transition-colors uppercase tracking-wide disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-dark dark:hover:text-gray-300 font-bold transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
