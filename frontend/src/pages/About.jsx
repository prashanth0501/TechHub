import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/img/back2.jpg')" }}
      >
        <div className="absolute inset-0 bg-dark/70"></div>
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <p className="text-primary font-bold tracking-wider uppercase text-xs md:text-sm">About Us</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white">About TechHub</h1>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
            <div className="w-full md:w-1/2">
              <img 
                src="/img/a.png" 
                alt="About us" 
                className="rounded shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Welcome to TechHub, Enhance your skills with best courses.</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                Embark on a transformative journey with TechHub as we guide you through the realm of cutting-edge software development. Our programs are meticulously crafted to empower individuals and organizations with the skills and knowledge essential for success in the dynamic and ever-evolving field of software development.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded flex items-center justify-center">
                    <img src="/img/fe1.png" alt="Courses icon" className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-primary mb-2">Courses</h5>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                      TechHub: Master in-demand tech skills like Fullstack, AI, Cybersecurity, and programming (Python, C) through our expert-led courses.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded flex items-center justify-center">
                    <img src="/img/fe2.png" alt="Internship icon" className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-primary mb-2">Internship</h5>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                      Gain hands-on experience with 10+ real-world projects, mastering essential skills like MySQL, Python, statistics, data preparation, visualization, and machine learning. Upon successful completion, you'll receive a valuable certificate to boost your resume and land your dream job.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-light dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-8">Trusted By</h2>
          <div className="flex flex-wrap justify-center gap-12 items-center opacity-60 dark:opacity-80">
            <img src="https://res.cloudinary.com/techhub-ncet/image/upload/v1738131216/wuy0udmncrinpksx4nnb.png" alt="Trusted Partner 1" className="h-10 object-contain grayscale hover:grayscale-0 transition-all dark:invert" />
            <img src="https://res.cloudinary.com/techhub-ncet/image/upload/v1738130574/ttgut2yyzzwlp5dz5yjn.png" alt="Trusted Partner 2" className="h-10 object-contain grayscale hover:grayscale-0 transition-all dark:invert" />
            <img src="https://res.cloudinary.com/techhub-ncet/image/upload/v1738131213/e8xhnopqdsmb8s581ura.png" alt="Trusted Partner 3" className="h-10 object-contain grayscale hover:grayscale-0 transition-all dark:invert" />
            <img src="https://res.cloudinary.com/techhub-ncet/image/upload/v1738131218/hhzikyyjfcnhzevb7hju.png" alt="Trusted Partner 4" className="h-10 object-contain grayscale hover:grayscale-0 transition-all dark:invert" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
