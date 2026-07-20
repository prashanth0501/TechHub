import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const result = await login(username, password);
    if (result.success) {
      if (result.role === 'student') navigate('/feedback');
      else if (result.role === 'faculty') navigate('/faculty/dashboard');
      else navigate('/');
    } else {
      setError(result.error);
    }
    setIsLoading(false);
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
            <h1 className="text-4xl md:text-6xl font-extrabold text-white">Login</h1>
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
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-6 text-center">Welcome Back</h2>
          
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
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-dark dark:text-white uppercase tracking-wide">Password</label>
              </div>
              <input 
                type="password" 
                required
                className="w-full bg-transparent border border-gray-200 dark:border-gray-700 dark:text-white rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-4 rounded transition-colors uppercase tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-dark dark:hover:text-gray-300 font-bold transition-colors">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
