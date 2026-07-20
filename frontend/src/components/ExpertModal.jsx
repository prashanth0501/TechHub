import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ExternalLink, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExpertModal = ({ expert, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!expert) return null;

  const ProgressBar = ({ label, score }) => {
    const percentage = (score / 5) * 100;
    return (
      <div className="mb-4">
        <div className="flex justify-between items-end mb-1 text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium">{label} <span className="text-gray-400 dark:text-gray-500 font-normal text-xs">(out of 5)</span></span>
          <span className="font-bold">{score}</span>
        </div>
        <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

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
            className="absolute inset-0 bg-dark/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            className="relative w-full max-w-5xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/20 dark:border-gray-700/50"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="overflow-y-auto w-full pb-4">
              
              {/* Header Section */}
              <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <img src={expert.img} alt={expert.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-dark dark:text-white mb-1">{expert.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{expert.role} - Expert Guide</p>
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-wide border border-primary/20">
                      <Star size={12} className="fill-primary" /> Top Rated Mentor
                    </div>
                  </div>
                </div>

                {/* Rating Box (Right side) */}
                <div className="flex items-center gap-4 border border-white/50 dark:border-gray-700/50 p-4 rounded-lg bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-sm">
                  <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
                    <Star className="text-white fill-white" size={24} />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-dark dark:text-white">4.9<span className="text-sm text-gray-500 dark:text-gray-400 font-normal">/5</span></div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Based on 142 Reviews</div>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100 dark:border-gray-700 mx-6 md:mx-8" />

              {/* Bio / Description */}
              <div className="p-6 md:px-8 md:py-6">
                <h3 className="font-bold text-dark dark:text-white flex items-center gap-2 mb-2">
                  Expert Overview
                  <span className="w-4 h-4 bg-primary text-white rounded-full inline-flex items-center justify-center text-[10px] font-bold">i</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {expert.bio} Connect with {expert.name.split(' ')[0]} to gain deeper insights into {expert.role} and accelerate your technical journey with personalized mentoring.
                </p>
              </div>

              {/* Two Column Grid */}
              <div className="px-6 md:px-8 pb-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                
                {/* Left Column - Progress Bars */}
                <div>
                  <h3 className="font-bold text-dark dark:text-white mb-4 text-sm">Why choose {expert.name}?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    <ProgressBar label="Teaching Quality" score={4.9} />
                    <ProgressBar label="Industry Knowledge" score={4.8} />
                    <ProgressBar label="Mentorship" score={4.9} />
                    <ProgressBar label="Communication" score={4.7} />
                  </div>
                  
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="font-medium text-dark dark:text-white flex items-center gap-2">
                      Availability: <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">Open for Mentoring</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Categories & Links */}
                <div className="border-l border-gray-100 dark:border-gray-700 md:pl-10 space-y-6">
                  
                  <div>
                    <h3 className="font-bold text-dark dark:text-white mb-3 text-sm">Credentials & Background</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      <span className="text-primary hover:underline cursor-pointer">{expert.phd}</span> | <br/>
                      <span className="text-primary hover:underline cursor-pointer">10+ Years Industry Experience</span> | <br/>
                      <span className="text-primary hover:underline cursor-pointer">Published in 15+ Journals</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-dark dark:text-white mb-3 text-sm">Professional Profiles</h3>
                    <div className="flex flex-col gap-2 text-sm text-primary">
                      <a href={expert.linkedin} className="flex items-center gap-2 hover:underline w-fit">
                        LinkedIn Profile <ExternalLink size={12} />
                      </a>
                      <a href={expert.scholar} className="flex items-center gap-2 hover:underline w-fit">
                        Google Scholar <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              <hr className="border-gray-100 dark:border-gray-700" />

              {/* Footer */}
              <div className="p-6 md:px-8 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-xl border-t border-white/20 dark:border-gray-700/50">
                <label className="flex items-center gap-2 text-sm text-dark dark:text-white cursor-pointer select-none">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary bg-white dark:bg-gray-800" />
                  Follow Expert
                </label>
                
                <div className="text-sm font-medium text-dark dark:text-white flex items-center gap-2">
                  <span className="text-primary text-lg">✓</span> <span className="font-bold">98.5%</span> of students recommend this expert
                </div>
                
                <div className="flex gap-3 w-full sm:w-auto">
                  <Link to="/contact" className="flex-1 sm:flex-none text-center bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded text-sm transition-colors uppercase tracking-wide">
                    Contact Expert
                  </Link>
                  <Link to="/contact" className="flex-1 sm:flex-none text-center bg-dark hover:bg-gray-800 text-white font-medium py-2 px-6 rounded text-sm transition-colors uppercase tracking-wide">
                    Book Session
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ExpertModal;
