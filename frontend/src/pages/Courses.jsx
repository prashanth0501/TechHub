import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CourseModal from '../components/CourseModal';

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const courseCategories = [
    {
      title: "Programming Courses",
      courses: [
        { title: "Principles of Programming using C", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=600&auto=format&fit=crop", reviews: 178 },
        { title: "C#", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop", reviews: 178 },
        { title: "Python Programming", img: "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?q=80&w=600&auto=format&fit=crop", reviews: 178 }
      ]
    },
    {
      title: "Full Stack Development Courses",
      courses: [
        { title: "Full Stack Web Development", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop", reviews: 178 },
        { title: "Full stack java", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop", reviews: 178 },
        { title: "Full Stack python", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop", reviews: 178 }
      ]
    },
    {
      title: "GenAI Courses",
      courses: [
        { title: "Machine Learning", img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=600&auto=format&fit=crop", reviews: 178 },
        { title: "Deep Learning", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop", reviews: 178 },
        { title: "Natural Language Processing", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop", reviews: 178 }
      ]
    },
    {
      title: "Cloud Computing & Networking",
      courses: [
        { title: "Amazon Web Services", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop", reviews: 178 },
        { title: "Microsoft Azure", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop", reviews: 178 },
        { title: "Google Cloud Platform", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop", reviews: 178 },
        { title: "Cyber security", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop", reviews: 178 },
        { title: "DevOps", img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=600&auto=format&fit=crop", reviews: 178 },
        { title: "Kubernetes", img: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=600&auto=format&fit=crop", reviews: 178 }
      ]
    },
    {
      title: "DataBase Management",
      courses: [
        { title: "MySQL", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop", reviews: 178 },
        { title: "MongoDB", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop", reviews: 178 },
        { title: "Apache Cassandra", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop", reviews: 178 }
      ]
    },
    {
      title: "Data Science Courses",
      courses: [
        { title: "Data Structures using C", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop", reviews: 178 },
        { title: "Design and analysis of Algorithm", img: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=600&auto=format&fit=crop", reviews: 178 }
      ]
    },
    {
      title: "Business Intelligence Courses",
      courses: [
        { title: "Power BI", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop", reviews: 178 },
        { title: "Salesforce Development", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop", reviews: 178 }
      ]
    }
  ];

  return (
    <div>
      {/* Premium Hero Section */}
      <div 
        className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-dark">
          <div className="absolute inset-0 bg-[url('/img/cover2.jpg')] bg-cover bg-center bg-fixed opacity-40"></div>
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
          {/* Decorative glowing orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50 mix-blend-screen pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <p className="text-primary font-bold tracking-wider uppercase text-xs md:text-sm">Explore Your Potential</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
              Unlock the Future of <br className="hidden md:block"/> 
              <span className="text-primary relative inline-block">
                Technology
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="text-gray-300 mt-6 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed drop-shadow">
              Master in-demand tech skills through our industry-relevant, expert-led premium programs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="bg-light dark:bg-gray-900 transition-colors pt-4 pb-20">
        {courseCategories.map((category, catIdx) => (
          <section key={catIdx} className="pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-dark dark:text-white tracking-tight">{category.title}</h2>
                  <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full"></div>
                </div>
                <div className="text-gray-500 dark:text-gray-400 font-medium">
                  {category.courses.length} {category.courses.length === 1 ? 'Program' : 'Programs'} Available
                </div>
              </div>
  
              {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.courses.map((course, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-800 flex flex-col h-full group"
                  >
                    <div className="h-56 overflow-hidden relative">
                      <img 
                        src={course.img} 
                        alt={course.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                      />
                      {/* Glassmorphism Hover Overlay */}
                      <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <button 
                          onClick={() => setSelectedCourse({ ...course, category: category.title })}
                          className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white rounded-full font-bold uppercase tracking-widest text-xs transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300"
                        >
                          Quick View
                        </button>
                      </div>
                      {/* Category Tag */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 dark:bg-dark/90 backdrop-blur-sm text-primary text-xs font-bold uppercase tracking-wider rounded-md shadow-sm">
                          {catIdx % 2 === 0 ? 'Featured' : 'Popular'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex text-yellow-400 text-sm">
                          ★★★★★ <span className="text-gray-400 dark:text-gray-500 ml-2 font-medium text-xs">({course.reviews})</span>
                        </div>
                        <span className="text-xs font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">All Levels</span>
                      </div>
                      
                      <h3 className="text-xl font-extrabold text-dark dark:text-white mb-4 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {course.title}
                      </h3>
                      
                      <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          10 Weeks
                        </div>
                        <button 
                          onClick={() => setSelectedCourse({ ...course, category: category.title })} 
                          className="text-primary hover:text-secondary font-bold transition-colors text-sm uppercase tracking-wide flex items-center gap-1"
                        >
                          Details
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <CourseModal 
        course={selectedCourse} 
        isOpen={!!selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
      />
    </div>
  );
};

export default Courses;
