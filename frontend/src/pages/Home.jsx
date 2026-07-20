import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CourseModal from '../components/CourseModal';
import ExpertModal from '../components/ExpertModal';

const Home = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedExpert, setSelectedExpert] = useState(null);
  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/img/indexbg.jpg')" }}
      >
        <div className="absolute inset-0 bg-dark/70"></div>
        
        <div className="relative z-10 text-center px-4 mt-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-[40px] whitespace-nowrap font-extrabold mb-6 text-white leading-tight">
              Enhance Your Future With <span className="text-primary">Tech HUB</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
              Embark on a transformative journey with TechHub as we guide you through the realm of cutting-edge software development. Our programs are meticulously crafted to empower individuals and organizations with the skills and knowledge essential for success in the dynamic and ever-evolving field of software development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/about" className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded transition-colors text-sm uppercase tracking-wide">
                Learn More
              </Link>
              <Link to="/courses" className="bg-white hover:bg-gray-100 text-primary font-bold py-4 px-8 rounded transition-colors text-sm uppercase tracking-wide">
                Visit Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-light dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">TECH HUB Features</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto uppercase tracking-wide text-sm font-bold text-primary">Skilling Techminds</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/40 dark:border-gray-700/50 p-8 rounded shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-primary">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">CodeTantra</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Codetantra is a comprehensive EdTech platform for effective teaching, hands-on learning, and automated assessments.
              </p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/40 dark:border-gray-700/50 p-8 rounded shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-primary">💻</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Advance Coders</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                TechHub empowers students with advanced coding and problem-solving skills, enabling them to excel in hackathons, codeathons, and the job market.
              </p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/40 dark:border-gray-700/50 p-8 rounded shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-primary">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Global Certification</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                TechHub equips students with in demand skills and facilitates globally recognized certifications, enhancing their career prospects worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Popular Courses</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Master In-Demand Skills with Our Industry-Relevant Programs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col h-full">
              <div className="h-48 overflow-hidden">
                <img src="https://res.cloudinary.com/techhub-ncet/image/upload/v1737949548/nptzjxfhlaiubquurpgo.webp" alt="Principles of Programming using C" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-primary mb-2">Principles of Programming using C</h3>
                <div className="text-primary text-sm mb-4">
                  ★★★★★ <span className="text-gray-400 ml-1">(178)</span>
                </div>
                <div className="mt-auto">
                  <button onClick={() => setSelectedCourse({ title: "Principles of Programming using C", img: "https://res.cloudinary.com/techhub-ncet/image/upload/v1737949548/nptzjxfhlaiubquurpgo.webp", reviews: 178, category: "Programming" })} className="text-primary font-bold hover:text-dark dark:hover:text-gray-300 transition-colors text-sm uppercase tracking-wide">View Course →</button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col h-full">
              <div className="h-48 overflow-hidden">
                <img src="https://res.cloudinary.com/techhub-ncet/image/upload/v1737951422/yjj7z0q0ehu8odauomxx.jpg" alt="Data Structures using C" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-primary mb-2">Data Structures using C</h3>
                <div className="text-primary text-sm mb-4">
                  ★★★★★ <span className="text-gray-400 ml-1">(100)</span>
                </div>
                <div className="mt-auto">
                  <button onClick={() => setSelectedCourse({ title: "Data Structures using C", img: "https://res.cloudinary.com/techhub-ncet/image/upload/v1737951422/yjj7z0q0ehu8odauomxx.jpg", reviews: 100, category: "Data Science" })} className="text-primary font-bold hover:text-dark dark:hover:text-gray-300 transition-colors text-sm uppercase tracking-wide">View Course →</button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col h-full">
              <div className="h-48 overflow-hidden">
                <img src="https://res.cloudinary.com/techhub-ncet/image/upload/v1737949549/t8wwtmnmwkuhtyjffiie.jpg" alt="Python Programming" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-primary mb-2">Python Programming</h3>
                <div className="text-primary text-sm mb-4">
                  ★★★★★ <span className="text-gray-400 ml-1">(143)</span>
                </div>
                <div className="mt-auto">
                  <button onClick={() => setSelectedCourse({ title: "Python Programming", img: "https://res.cloudinary.com/techhub-ncet/image/upload/v1737949549/t8wwtmnmwkuhtyjffiie.jpg", reviews: 143, category: "Programming" })} className="text-primary font-bold hover:text-dark dark:hover:text-gray-300 transition-colors text-sm uppercase tracking-wide">View Course →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-light dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Meet Our Founders</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Leaders Who Inspire and Shape the Future of TechHub</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Bhanu Chaitanya', role: 'CEO, TechHub' },
              { name: 'Dr. Mallikarjun Kodabagi', role: 'Director, TechHub' },
              { name: 'Kishan Kulkarni', role: 'Managing Director, TechHub' },
              { name: 'Dr. Bhargav R', role: 'Member, TechHub' }
            ].map((founder, idx) => (
              <div key={idx} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/40 dark:border-gray-700/50 rounded shadow-sm p-6 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-primary/20">
                  <img src="https://res.cloudinary.com/techhub-ncet/image/upload/v1737949558/te8pl9g04lybzzrxctnu.jpg" alt={founder.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-1">{founder.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">{founder.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Experts Section */}
      <section className="py-24 bg-light dark:bg-gray-900 relative border-t border-gray-100 dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">Community Experts</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">Dedicated professionals guiding your journey to success.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Abhraham Rajan', role: 'Full Stack Developer', bio: 'An experienced software architect specializing in scalable web applications.', phd: 'M.Tech in Computer Science', linkedin: '#', scholar: '#' },
              { name: 'Ragavandra', role: 'Data Structures', bio: 'Passionate about algorithms and competitive programming. Dedicated to helping students crack technical interviews.', phd: 'PhD in Algorithms', linkedin: '#', scholar: '#' },
              { name: 'Pooja Ahuja', role: 'Full Stack Developer', bio: 'A creative frontend engineer with a deep understanding of user experience and modern web frameworks.', phd: 'MS in Information Technology', linkedin: '#', scholar: '#' },
              { name: 'Nikhila M R', role: 'Web Development', bio: 'Expert in modern JavaScript ecosystems. Loves building interactive and highly performant user interfaces.', phd: 'B.Tech in Computer Engineering', linkedin: '#', scholar: '#' },
              { name: 'Vinit Kumar Shukla', role: 'Python Developer', bio: 'Backend specialist focused on Python, Django, and machine learning model deployments.', phd: 'PhD in Artificial Intelligence', linkedin: '#', scholar: '#' },
              { name: 'Tejas', role: 'Full Stack Developer', bio: 'Versatile developer bridging the gap between elegant UI and robust API architectures.', phd: 'MCA', linkedin: '#', scholar: '#' },
              { name: 'Karthik', role: 'Full Stack Developer', bio: 'Systems engineer with a knack for cloud computing and distributed system design.', phd: 'M.Tech in Software Engineering', linkedin: '#', scholar: '#' },
              { name: 'Nikitha', role: 'Python Developer', bio: 'Data science enthusiast and Python expert, mentoring students in data analysis and automation.', phd: 'MS in Data Science', linkedin: '#', scholar: '#' }
            ].map((expert, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedExpert({ ...expert, img: "https://res.cloudinary.com/techhub-ncet/image/upload/v1737949558/te8pl9g04lybzzrxctnu.jpg" })}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 text-center shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 border border-white/50 dark:border-gray-700/50 cursor-pointer group"
              >
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4 border border-gray-200 dark:border-gray-600 group-hover:border-primary transition-colors p-1">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img src="https://res.cloudinary.com/techhub-ncet/image/upload/v1737949558/te8pl9g04lybzzrxctnu.jpg" alt={expert.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-primary mb-1">{expert.name}</h4>
                <p className="text-xs text-primary uppercase tracking-wide font-bold">{expert.role}</p>
                
                <div className="mt-5 pt-4 border-t border-gray-50 dark:border-gray-700 text-gray-400 group-hover:text-primary transition-colors text-sm font-medium flex items-center justify-center gap-1">
                  View Profile <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CourseModal 
        course={selectedCourse} 
        isOpen={!!selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
      />

      <ExpertModal
        expert={selectedExpert}
        isOpen={!!selectedExpert}
        onClose={() => setSelectedExpert(null)}
      />
    </div>
  );
};

export default Home;
