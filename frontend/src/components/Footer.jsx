import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-gray-300 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1 */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">TechHub</h2>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              Embark on a transformative journey with TechHub as we guide you through the realm of cutting-edge software development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <span className="text-white text-xl"><i className="fab fa-facebook"></i> f</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <span className="text-white text-xl"><i className="fab fa-instagram"></i> i</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <span className="text-white text-xl"><i className="fab fa-linkedin-in"></i> in</span>
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h2 className="text-lg font-bold text-white mb-6">Top Products</h2>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Manage Reputation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Power Tools</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Managed Website</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Marketing Service</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h2 className="text-lg font-bold text-white mb-6">Power Tools</h2>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Jobs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Marketing Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Top Products</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Manage Reputation</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h2 className="text-lg font-bold text-white mb-6">Newsletter</h2>
            <p className="text-sm text-gray-400 mb-4">You can trust us.</p>
            <div className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email Address" 
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary text-sm"
              />
              <button className="bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-4 rounded transition-colors uppercase tracking-wide text-sm">
                Subscribe
              </button>
            </div>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>
            Copyright &copy; {new Date().getFullYear()} All rights reserved | <a href="#" className="text-primary hover:text-white transition-colors">TECHHUB</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
