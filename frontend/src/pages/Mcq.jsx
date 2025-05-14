import React, { useState } from 'react';
import { FiCheck, FiX, FiBook, FiAward, FiBarChart2, FiRefreshCw } from 'react-icons/fi';
import { motion } from 'framer-motion';

const JavaMCQApp = () => {
  // Vibrant color palette
  const colors = {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    correct: '#10b981',
    incorrect: '#ef4444',
    background: '#f8fafc',
    card: '#ffffff',
    text: '#1e293b',
    muted: '#64748b'
  };

  // Sample data
  const topics = [
    { id: 1, name: 'Java Basics', icon: '🧱' },
    { id: 2, name: 'OOP Concepts', icon: '🧩' },
    { id: 3, name: 'Data Types', icon: '🔢' },
    { id: 4, name: 'Collections', icon: '🗃️' },
    { id: 5, name: 'Multithreading', icon: '🧵' }
  ];

  const allMCQs = [
    {
      id: 1,
      topicId: 1,
      question: 'What is the default value of an int in Java?',
      options: ['0', 'null', '1', 'Not defined'],
      correctAnswer: 0,
      explanation: 'Primitive types in Java have default values. For int, the default is 0.'
    },
    {
      id: 2,
      topicId: 1,
      question: 'Which keyword is used to define a constant in Java?',
      options: ['const', 'final', 'static', 'define'],
      correctAnswer: 1,
      explanation: 'The "final" keyword makes a variable unchangeable after initialization.'
    },
    {
      id: 3,
      topicId: 2,
      question: 'Which OOP concept is implemented by method overriding?',
      options: ['Encapsulation', 'Abstraction', 'Polymorphism', 'Inheritance'],
      correctAnswer: 2,
      explanation: 'Method overriding is runtime polymorphism where a subclass provides a specific implementation.'
    },
    {
      id: 4,
      topicId: 3,
      question: 'What is the size of a "double" in Java?',
      options: ['32 bits', '64 bits', '16 bits', 'Depends on JVM'],
      correctAnswer: 1,
      explanation: 'Double-precision floating-point uses 64 bits (8 bytes) of storage.'
    }
  ];

  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [activeTopic, setActiveTopic] = useState(null);

  // Filter MCQs by topic
  const displayedMCQs = activeTopic 
    ? allMCQs.filter(mcq => mcq.topicId === activeTopic)
    : allMCQs;

  const handleOptionSelect = (mcqId, optionIndex) => {
    if (!showResults) {
      setSelectedOptions(prev => ({
        ...prev,
        [mcqId]: optionIndex
      }));
    }
  };

  const calculateScore = () => {
    let correct = 0;
    allMCQs.forEach(mcq => {
      if (selectedOptions[mcq.id] === mcq.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: allMCQs.length,
      percentage: Math.round((correct / allMCQs.length) * 100)
    };
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setSelectedOptions({});
    setShowResults(false);
  };

  const score = calculateScore();

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: colors.background }}>
      {/* Left Sidebar - Topics & Score */}
      <div className="w-1/4 bg-white border-r border-gray-200 overflow-y-auto shadow-lg">
        <div className="p-6 sticky top-0 bg-white border-b border-gray-200">
          <div className="flex items-center mb-6">
            <FiBook className="text-2xl mr-3" style={{ color: colors.primary }} />
            <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
              Java Topics
            </h2>
          </div>
          
          {showResults && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-xl mb-6"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                color: 'white'
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FiAward className="text-xl mr-2" />
                  <span className="font-semibold">Your Score</span>
                </div>
                <span className="font-bold text-lg">
                  {score.correct}/{score.total}
                </span>
              </div>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-2.5 mb-2">
                <div 
                  className="h-2.5 rounded-full bg-white" 
                  style={{ width: `${score.percentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span>{score.percentage}% Correct</span>
                <span>{score.total - score.correct} Mistakes</span>
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-4 space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTopic(null)}
            className={`w-full text-left p-4 rounded-xl transition-all flex items-center ${!activeTopic ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <span className="text-lg mr-3">📚</span>
            <span>All Topics</span>
          </motion.button>
          
          {topics.map(topic => (
            <motion.button
              key={topic.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTopic(topic.id)}
              className={`w-full text-left p-4 rounded-xl transition-all flex items-center ${activeTopic === topic.id ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <span className="text-lg mr-3">{topic.icon}</span>
              <span>{topic.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Middle Section - MCQs */}
      <div className="w-2/4 p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold" style={{ color: colors.text }}>
              {activeTopic 
                ? `${topics.find(t => t.id === activeTopic)?.name} Questions` 
                : 'All Java Questions'}
            </h1>
            {showResults && (
              <button 
                onClick={resetQuiz}
                className="flex items-center px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              >
                <FiRefreshCw className="mr-2" />
                Retry
              </button>
            )}
          </div>
          
          <div className="space-y-6">
            {displayedMCQs.map((mcq, index) => {
              const isCorrect = selectedOptions[mcq.id] === mcq.correctAnswer;
              const showCorrect = showResults && !isCorrect;
              
              return (
                <motion.div 
                  key={mcq.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl shadow-md overflow-hidden"
                  style={{ backgroundColor: colors.card }}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm" style={{ color: colors.muted }}>
                        Question #{mcq.id} • {topics.find(t => t.id === mcq.topicId)?.name}
                      </span>
                      {showResults && (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-5" style={{ color: colors.text }}>
                      {mcq.question}
                    </h3>
                    
                    <div className="space-y-3">
                      {mcq.options.map((option, index) => {
                        const isSelected = selectedOptions[mcq.id] === index;
                        const isActuallyCorrect = index === mcq.correctAnswer;
                        
                        let optionClasses = 'p-4 rounded-xl transition-all flex items-center';
                        
                        if (showResults) {
                          if (isActuallyCorrect) {
                            optionClasses += ' bg-green-50 border border-green-200';
                          } else if (isSelected && !isActuallyCorrect) {
                            optionClasses += ' bg-red-50 border border-red-200';
                          } else {
                            optionClasses += ' border border-gray-100';
                          }
                        } else {
                          optionClasses += isSelected 
                            ? ' bg-indigo-50 border border-indigo-300' 
                            : ' border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50';
                        }
                        
                        return (
                          <motion.div
                            key={index}
                            whileHover={!showResults ? { scale: 1.01 } : {}}
                            whileTap={!showResults ? { scale: 0.99 } : {}}
                            onClick={() => handleOptionSelect(mcq.id, index)}
                            className={`${optionClasses} ${!showResults ? 'cursor-pointer' : ''}`}
                          >
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${showResults ? 
                              (isActuallyCorrect ? 'bg-green-100 text-green-600' : 
                               (isSelected ? 'bg-red-100 text-red-600' : 'bg-gray-100')) : 
                              (isSelected ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100')}`}>
                              {showResults ? 
                                (isActuallyCorrect ? <FiCheck /> : 
                                 (isSelected ? <FiX /> : null)) : 
                                (isSelected ? <FiCheck /> : null)}
                            </div>
                            <span className="flex-1">{option}</span>
                            {showResults && isActuallyCorrect && (
                              <span className="ml-2 text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">
                                Correct
                              </span>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {showResults && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 p-4 rounded-lg overflow-hidden"
                        style={{ backgroundColor: colors.background }}
                      >
                        <h4 className="font-medium mb-2" style={{ color: colors.primary }}>
                          Explanation:
                        </h4>
                        <p style={{ color: colors.muted }}>{mcq.explanation}</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {!showResults && (
            <motion.div 
              className="mt-10 sticky bottom-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button 
                onClick={handleSubmit}
                disabled={Object.keys(selectedOptions).length !== allMCQs.length}
                className={`w-full py-4 rounded-xl text-lg font-semibold transition-all ${Object.keys(selectedOptions).length === allMCQs.length ? 
                  `bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl` : 
                  'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                Submit Answers
                <FiBarChart2 className="inline ml-2" />
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Notes */}
      <div className="w-1/4 bg-white border-l border-gray-200 shadow-lg">
        <div className="p-6 sticky top-0 bg-white border-b border-gray-200">
          <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
            Notes
          </h2>
          <p className="text-sm mt-1" style={{ color: colors.muted }}>
            Jot down important points here
          </p>
        </div>
        <div className="p-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
            <h4 className="font-medium text-yellow-800 mb-1">Tip:</h4>
            <p className="text-yellow-700 text-sm">
              Use this space to note concepts you need to review or important syntax examples.
            </p>
          </div>
          <textarea 
            className="w-full h-64 p-4 border border-gray-200 rounded-xl focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition"
            placeholder="Write your notes here..."
            style={{ backgroundColor: colors.background }}
          ></textarea>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Save Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default JavaMCQApp;