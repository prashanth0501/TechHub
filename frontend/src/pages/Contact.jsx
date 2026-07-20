import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/img/cover4.jpg')" }}
      >
        <div className="absolute inset-0 bg-dark/70"></div>
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <p className="text-primary font-bold tracking-wider uppercase text-xs md:text-sm">Contact</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white">Contact Us</h1>
          </motion.div>
        </div>
      </div>

      <section className="py-20 bg-light dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 p-8 text-center rounded shadow-sm hover:shadow-md transition-shadow">
              <span className="text-primary text-3xl mb-4 block">📍</span>
              <p className="text-dark dark:text-white font-medium">Visit Office</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Nagarjuna College of Engineering Technologies, NCET Campus, Bangalore</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 text-center rounded shadow-sm hover:shadow-md transition-shadow">
              <span className="text-primary text-3xl mb-4 block">📞</span>
              <p className="text-dark dark:text-white font-medium">Phone</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 font-bold">(+91) 9663300824 <br/> (+91) 8553246449</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 text-center rounded shadow-sm hover:shadow-md transition-shadow">
              <span className="text-primary text-3xl mb-4 block">✉️</span>
              <p className="text-dark dark:text-white font-medium">Support</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 font-bold">techhub@ncetmail.com <br/> techhub24@ncetmail.com</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded shadow-sm">
            <form action="#">
              <div className="text-center mb-8">
                <h4 className="text-3xl font-bold text-dark dark:text-white mb-2">Let's Connect</h4>
                <p className="text-gray-500 dark:text-gray-400">Be the first to know about our latest products and services.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input 
                  type="text" 
                  className="w-full bg-transparent border border-gray-200 dark:border-gray-700 dark:text-white rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm" 
                  placeholder="Your Name" 
                />
                <input 
                  type="email" 
                  className="w-full bg-transparent border border-gray-200 dark:border-gray-700 dark:text-white rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm" 
                  placeholder="Your Email" 
                />
              </div>
              <div className="mb-6">
                <input 
                  type="text" 
                  className="w-full bg-transparent border border-gray-200 dark:border-gray-700 dark:text-white rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm" 
                  placeholder="Subject line..." 
                />
              </div>
              <div className="mb-6">
                <textarea 
                  cols="30" 
                  rows="7" 
                  className="w-full bg-transparent border border-gray-200 dark:border-gray-700 dark:text-white rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm resize-none" 
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-12 rounded transition-colors uppercase tracking-wide text-sm">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-96">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30711686.029386617!2d64.41853642919325!3d20.009139591170264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1652012148253!5m2!1sen!2sin" 
          className="w-full h-full border-0" 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
