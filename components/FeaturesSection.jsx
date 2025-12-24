import React from 'react';
import { FiBook, FiCode, FiTrendingUp, FiBarChart2, FiCheckCircle, FiAward } from 'react-icons/fi';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FiBook className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: "Comprehensive MCQs",
      description: "Thousands of carefully curated multiple-choice questions covering all exam patterns."
    },
    {
      icon: <FiCode className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: "Interactive Platform",
      description: "Engaging practice environment with instant feedback and detailed explanations."
    },
    {
      icon: <FiTrendingUp className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: "Progress Tracking",
      description: "Visual analytics dashboard to monitor your performance metrics."
    },
    {
      icon: <FiBarChart2 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: "Performance Analytics",
      description: "Detailed breakdowns of your strengths and weaknesses."
    },
    {
      icon: <FiCheckCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: "Mock Tests",
      description: "Full-length simulated exams with real-time scoring."
    },
    {
      icon: <FiAward className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: "Personalized Learning",
      description: "AI-powered recommendations tailored to your needs."
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <span className="inline-block px-3 py-1 text-xs sm:text-sm font-semibold text-[#0a63b0] bg-blue-100 rounded-full mb-3 sm:mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Powerful <span className="text-[#0a63b0]">Learning Features</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto">
            Everything you need to prepare effectively and track your progress.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white p-6 sm:p-7 lg:p-8 rounded-lg cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-2 border border-gray-100 hover:border-blue-100 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-4 sm:mb-5 lg:mb-6 rounded-lg sm:rounded-xl bg-blue-50 text-[#0a63b0] group-hover:bg-blue-100 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed sm:leading-normal">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <button 
            onClick={() => window.location.href = '/categories'}
            className="px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-medium bg-[#0a63b0] hover:bg-[white] hover:text-[#0a63b0] text-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Start Learning Now
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;