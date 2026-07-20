import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, LogOut, User, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { isAuthenticated, role, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navClass = scrolled || !isHome 
    ? 'nav-scrolled bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm border-b border-gray-100/50 dark:border-gray-800' 
    : 'nav-transparent bg-transparent absolute w-full top-0 z-50';
    
  const textClass = scrolled || !isHome ? 'text-dark dark:text-white' : 'text-white';

  const NavLink = ({ to, children }) => (
    <Link 
      to={to} 
      className={`${textClass} hover:text-primary px-3 py-2 text-[15px] font-medium transition-colors uppercase tracking-wide`}
    >
      {children}
    </Link>
  );

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="https://res.cloudinary.com/techhub-ncet/image/upload/v1737949559/bdfdtbcfqszyjy2qlkvu.jpg" 
                alt="TechHub Logo" 
                className="h-10 w-auto rounded"
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/courses">Courses</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              
              {isAuthenticated ? (
                <>
                  {role === 'student' && (
                    <NavLink to="/feedback">Feedback</NavLink>
                  )}
                  {role === 'faculty' && (
                    <NavLink to="/faculty/dashboard">Dashboard</NavLink>
                  )}
                  <div className="flex items-center ml-4 pl-4 border-l border-gray-300">
                    <span className={`${textClass} mr-4 flex items-center text-sm font-medium`}>
                      <User className="w-4 h-4 mr-2" />
                      {user?.username}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="flex items-center bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors uppercase tracking-wide"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <NavLink to="/login">Login</NavLink>
                  <Link to="/signup" className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded text-[15px] font-medium transition-all ml-2 uppercase tracking-wide">
                    Sign Up
                  </Link>
                </>
              )}
              
              <button 
                onClick={toggleTheme}
                className={`ml-4 p-2 flex items-center justify-center rounded-full transition-colors ${scrolled || !isHome ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${textClass} hover:text-primary focus:outline-none`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-xl overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
              <Link to="/" className="text-dark dark:text-white hover:text-primary dark:hover:text-primary block px-3 py-2 font-medium uppercase tracking-wide">Home</Link>
              <Link to="/about" className="text-dark dark:text-white hover:text-primary dark:hover:text-primary block px-3 py-2 font-medium uppercase tracking-wide">About</Link>
              <Link to="/courses" className="text-dark dark:text-white hover:text-primary dark:hover:text-primary block px-3 py-2 font-medium uppercase tracking-wide">Courses</Link>
              <Link to="/contact" className="text-dark dark:text-white hover:text-primary dark:hover:text-primary block px-3 py-2 font-medium uppercase tracking-wide">Contact</Link>
              
              {isAuthenticated ? (
                <>
                  {role === 'student' && (
                    <Link to="/feedback" className="text-dark dark:text-white hover:text-primary dark:hover:text-primary block px-3 py-2 font-medium uppercase tracking-wide">Feedback</Link>
                  )}
                  {role === 'faculty' && (
                    <Link to="/faculty/dashboard" className="text-dark dark:text-white hover:text-primary dark:hover:text-primary block px-3 py-2 font-medium uppercase tracking-wide">Dashboard</Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-secondary hover:text-secondary/80 block px-3 py-2 font-medium w-full text-center uppercase tracking-wide"
                  >
                    Logout ({user?.username})
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-dark dark:text-white hover:text-primary dark:hover:text-primary block px-3 py-2 font-medium uppercase tracking-wide">Login</Link>
                  <Link to="/signup" className="text-primary font-bold block px-3 py-2 uppercase tracking-wide">Sign Up</Link>
                </>
              )}
              
              <button 
                onClick={toggleTheme}
                className="flex w-full items-center justify-center gap-2 px-3 py-2 mt-2 text-base font-medium text-dark dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                {theme === 'dark' ? <><Sun size={18} /> Light Mode</> : <><Moon size={18} /> Dark Mode</>}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
