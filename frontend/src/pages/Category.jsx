import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import { motion } from "framer-motion";

const languageIcons = {
  'HTML5gg': 'fab fa-html5 text-orange-500',
  'CSS': 'fab fa-css3-alt text-blue-500',
  'JavaScript': 'fab fa-js-square text-yellow-400',
  'React': 'fab fa-react text-blue-400',
  'Angular': 'fab fa-angular text-red-500',
  'Vue.js': 'fab fa-vuejs text-green-500',
  'Node.js': 'fab fa-node-js text-green-600',
  'PHP': 'fab fa-php text-purple-500',
  'Python': 'fab fa-python text-blue-400',
  'Java': 'fab fa-java text-red-500',
  'Ruby': 'fab fa-ruby text-red-400',
  '.NET': 'fab fa-microsoft text-[#0a63b0]',
  'SQL': 'fas fa-database text-blue-500',
  'MongoDB': 'devicon-mongodb-plain text-green-600',
  'PostgreSQL': 'devicon-postgresql-plain text-[#0a63b0]',
  'Data Structures': 'fas fa-code-branch text-purple-500',
  'Algorithms': 'fas fa-sort-amount-up text-indigo-500',
  'C++': 'devicon-cplusplus-plain text-[#0a63b0]',
  'C#': 'devicon-csharp-plain text-purple-600',
  'Swift': 'fab fa-swift text-orange-500',
  'Computer Networks': 'fas fa-network-wired text-blue-500',
  'Operating Systems': 'fas fa-desktop text-green-500',
  'DBMS': 'fas fa-database text-blue-400',
  'OOP': 'fas fa-cubes text-red-500',
  'System Design': 'fas fa-sitemap text-indigo-500',
};

const categories = {
  it: {
    title: "Information Technology",
    description: "Master modern technologies and core computer science concepts",
    sections: [
      {
        title: "Technology Stack",
        items: [
          'HTML5', 'CSS', 'JavaScript', 'React', 'Angular', 'Vue.js',
          'Node.js', 'PHP', 'Python', 'Java', 'Ruby', '.NET',
          'SQL', 'MongoDB', 'PostgreSQL', 'Data Structures', 'Algorithms',
          'C++', 'C#', 'Swift'
        ],
        color: "from-blue-400 to-purple-500",
        icon: "💻"
      },
      {
        title: "Core Subjects",
        items: ['Computer Networks', 'Operating Systems', 'DBMS', 'OOP', 'System Design'],
        color: "from-red-400 to-orange-500",
        icon: "📚"
      }
    ],
    mainIcon: '💻',
    bgColor: 'bg-gradient-to-br from-blue-50 to-purple-50'
  },
  government: {
    title: "Government Exams",
    description: "Prepare for central and state government competitive examinations",
    sections: [
      {
        title: "Central Exam",
        items: ['SSC CGL', 'SSC CHSL', 'SSC GD', 'SSC MTS', 'SSC Stenographer'],
        color: "from-indigo-500 to-[#0a63b0]",
        icon: "🏛️"
      },
      {
        title: "State Exam",
        items: ['SSC CGL', 'SSC CHSL', 'SSC GD', 'SSC MTS', 'SSC Stenographer'],
        color: "from-purple-500 to-indigo-600",
        icon: "🏢"
      }
    ],
    mainIcon: '🏛️',
    bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50'
  },
  bank: {
    title: "Banking Exams",
    description: "Ace your banking sector competitive exams",
    sections: [{
      title: "Coming Soon !!",
      items: [],
      color: "from-green-500 to-teal-200",
      icon: ""
    }],
    mainIcon: '🏦',
    bgColor: 'bg-gradient-to-br from-green-50 to-teal-50'
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

function Category() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          
          // Add temporary highlight class
          element.classList.add('highlight-section');
          setTimeout(() => {
            element.classList.remove('highlight-section');
          }, 2000);
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-t from-blue-100 via-blue-400 to-blue-500 text-white py-16">
          <div className="container mx-auto px-3 text-center">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Explore Learning Categories
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200"
            >
              Discover our comprehensive collection of courses and resources
            </motion.p>
        <div id="it"></div>

          </div>
        </section>
        {/* Categories Section */}
        <div className="container mx-auto px-4 py-12">
          {/* Information Technology Section */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className={`mb-16 p-8 rounded-2xl shadow-lg ${categories.it.bgColor}`}
          >
            <div className="flex items-center mb-8">
              <div className="text-5xl mr-4">{categories.it.mainIcon}</div>
              <div>
                <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-800">
                  {categories.it.title}
                </motion.h2>
                <motion.p variants={itemVariants} className="text-lg text-gray-600">
                  {categories.it.description}
                </motion.p>
              </div>
            </div>

            <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-8">
              {categories.it.sections.map((section, index) => (
                <motion.div 
                  key={`it-${index}`} 
                  variants={itemVariants}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className={`text-3xl mr-3 bg-gradient-to-r ${section.color} text-transparent bg-clip-text`}>
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {section.items.map((item, i) => (
                      <motion.div 
                        key={`it-item-${i}`}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white border cursor-pointer border-gray-200 rounded-lg p-3 hover:shadow-md transition-all flex flex-col items-center"
                      >

                        <i className={`${languageIcons[item]} text-2xl mb-2`}></i>
                        <div className={`text-sm font-medium text-center text-[#0a63b0] bg-clip-text`}>
                          {item}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div id="government"></div>
          </motion.section>
          
          {/* Government Exams Section */}
          <motion.section 
            initial="hidden"  
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className={`mb-16 p-8 rounded-2xl shadow-lg ${categories.government.bgColor}`}
          >
            <div className="flex items-center mb-8">
              <div className="text-5xl mr-4">{categories.government.mainIcon}</div>
              <div>
                <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-800">
                  {categories.government.title}
                </motion.h2>
                <motion.p variants={itemVariants} className="text-lg text-gray-600">
                  {categories.government.description}
                </motion.p>
              </div>
            </div>

            <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-8">
              {categories.government.sections.map((section, index) => (
                <motion.div 
                  key={`gov-${index}`} 
                  variants={itemVariants}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className={`text-3xl mr-3 bg-gradient-to-r ${section.color} text-transparent bg-clip-text`}>
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {section.items.map((item, i) => (
                      <motion.div 
                        key={`gov-item-${i}`}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white border cursor-pointer border-gray-200 rounded-lg p-3 hover:shadow-md transition-all flex flex-col items-center"
                      >
                        
                          <i className='fas fa-file-alt text-blue-500 text-2xl mb-2'></i>
                        
                        <div className={`text-sm font-medium text-center text-[#0a63b0] bg-clip-text`}>
                          {item}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Banking Exams Section */}
          <motion.section 
            id="bank"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className={`mb-16 p-8 rounded-2xl shadow-lg ${categories.bank.bgColor}`}
          >
            <div className="flex items-center mb-8">
              <div className="text-5xl mr-4">{categories.bank.mainIcon}</div>
              <div>
                <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-800">
                  {categories.bank.title}
                </motion.h2>
                <motion.p variants={itemVariants} className="text-lg text-gray-600">
                  {categories.bank.description}
                </motion.p>
              </div>
            </div>

            <motion.div variants={containerVariants} className="grid md:grid-cols-1 gap-8">
              {categories.bank.sections.map((section, index) => (
                <motion.div 
                  key={`bank-${index}`} 
                  variants={itemVariants}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className={`text-3xl mr-3 bg-gradient-to-r ${section.color} text-transparent bg-clip-text`}>
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {section.items.map((item, i) => (
                      <motion.div 
                        key={`bank-item-${i}`}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all flex flex-col items-center"
                      >
                        {languageIcons[item] && (
                          <i className={`${languageIcons[item]} text-2xl mb-2`}></i>
                        )}
                        <div className={`text-sm font-medium text-center bg-gradient-to-r ${section.color} text-transparent bg-clip-text`}>
                          {item}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Category;