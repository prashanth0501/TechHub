import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Clock, BookOpen, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseModal = ({ course, isOpen, onClose }) => {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!course) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-5xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/20 dark:border-gray-700/50"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="overflow-y-auto">
              {/* Hero Image Area */}
              <div className="relative h-64 md:h-80 w-full">
                <img 
                  src={course.img} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary px-3 py-1 text-white text-xs font-bold rounded uppercase tracking-wide">
                      {course.category || 'Professional Course'}
                    </span>
                    <span className="text-yellow-400 text-sm flex items-center">
                      ★★★★★ <span className="text-gray-300 ml-1">({course.reviews} reviews)</span>
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                    {course.title}
                  </h2>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  
                  {/* Main Details (Left Column) */}
                  <div className="md:col-span-2 space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-dark dark:text-white mb-4">Course Overview</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        Dive deep into {course.title} with our industry-leading curriculum. This program is meticulously designed to take you from fundamentals to advanced concepts, ensuring you gain hands-on, practical experience. Master the tools and methodologies used by top professionals in the tech industry today.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-dark dark:text-white mb-4">What You'll Learn</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          "Industry best practices and patterns",
                          "Real-world project implementations",
                          "Advanced problem solving techniques",
                          "Performance optimization",
                          "Modern tooling and workflows",
                          "Preparation for global certification"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="text-primary w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Sidebar (Right Column) */}
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-100/50 dark:border-gray-700/50 h-fit space-y-6 shadow-sm">
                    <div>
                      <h4 className="font-bold text-dark dark:text-white mb-4 uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-2">Course Details</h4>
                      <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                          <Clock className="w-5 h-5 text-primary" />
                          <span>Duration: <strong className="text-dark dark:text-white">10 Weeks</strong></span>
                        </li>
                        <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                          <BookOpen className="w-5 h-5 text-primary" />
                          <span>Format: <strong className="text-dark dark:text-white">Online / Hybrid</strong></span>
                        </li>
                        <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                          <Award className="w-5 h-5 text-primary" />
                          <span>Certificate: <strong className="text-dark dark:text-white">Included</strong></span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Link 
                        to="/contact" 
                        className="block w-full text-center bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded transition-colors uppercase tracking-wide shadow-md hover:shadow-lg"
                        onClick={onClose}
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CourseModal;
