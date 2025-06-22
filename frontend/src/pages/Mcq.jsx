import React, { useState } from 'react';
import { motion } from 'framer-motion';

const questions = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinking Text Management Language"
    ],
    answer: "Hyper Text Markup Language",
    topic: "HTML"
  },
  {
    id: 2,
    question: "Which language is used for styling web pages?",
    options: [
      "HTML",
      "JQuery",
      "CSS",
      "XML"
    ],
    answer: "CSS",
    topic: "CSS"
  },
  {
    id: 3,
    question: "Which is not a JavaScript Framework?",
    options: [
      "Python Script",
      "JQuery",
      "Django",
      "NodeJS"
    ],
    answer: "Django",
    topic: "JavaScript"
  }
];

const topics = ["HTML", "CSS", "JavaScript", "React", "Node.js"];
const ads = [
  "Upgrade your skills with our premium courses!",
  "Try our interactive coding challenges!",
  "Hiring developers? Post your jobs here!"
];

export default function MCQPage() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const filteredQuestions = selectedTopic 
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setSelectedTopic(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 flex">
        {/* Left Sidebar - Topics */}
        <aside className="w-64 pr-6 hidden md:block">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Topics</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setSelectedTopic(null)}
                  className={`w-full text-left px-4 py-2 rounded-lg ${!selectedTopic ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                >
                  All Topics
                </button>
              </li>
              {topics.map(topic => (
                <li key={topic}>
                  <button
                    onClick={() => setSelectedTopic(topic)}
                    className={`w-full text-left px-4 py-2 rounded-lg ${selectedTopic === topic ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                  >
                    {topic}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <motion.div
            className="bg-white rounded-xl shadow-md p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-blue-700">MCQ Quiz</h1>
              {selectedTopic && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {selectedTopic}
                </span>
              )}
            </div>

            {filteredQuestions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No questions available for this topic.</p>
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  View All Questions
                </button>
              </div>
            ) : (
              <>
                {filteredQuestions.map((q) => (
                  <motion.div
                    key={q.id}
                    className="mb-6 p-6 border border-gray-200 rounded-xl hover:border-blue-200 transition duration-300"
                    whileHover={{ scale: 1.005 }}
                  >
                    <p className="font-semibold text-lg mb-4 text-gray-800">{q.id}. {q.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {q.options.map((option, index) => (
                        <label key={index} className="flex items-start cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={option}
                            onChange={() => handleOptionChange(q.id, option)}
                            disabled={showResults}
                            className="mt-1 mr-3 h-5 w-5 accent-blue-600"
                          />
                          <div className={`flex-1 p-3 rounded-lg transition ${selectedAnswers[q.id] === option ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'}`}>
                            {option}
                            {showResults && selectedAnswers[q.id] === option && (
                              <span className={`ml-2 font-medium ${
                                option === q.answer ? "text-green-600" : "text-red-600"
                              }`}>
                                {option === q.answer ? "✔ Correct" : "✖ Incorrect"}
                              </span>
                            )}
                            {showResults && option === q.answer && selectedAnswers[q.id] !== option && (
                              <span className="ml-2 font-medium text-green-600">✓ Correct answer</span>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                ))}

                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                  {!showResults ? (
                    <motion.button
                      onClick={checkAnswers}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 shadow-md w-full sm:w-auto"
                      whileHover={{ scale: 1.02 }}
                    >
                      Submit Answers
                    </motion.button>
                  ) : (
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <motion.div
                        className="text-xl font-semibold text-blue-700 bg-blue-50 px-6 py-3 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        Score: {
                          Object.entries(selectedAnswers).filter(([id, answer]) => {
                            const q = questions.find(q => q.id === parseInt(id));
                            return q?.answer === answer;
                          }).length
                        } / {filteredQuestions.length}
                      </motion.div>
                      <button
                        onClick={resetQuiz}
                        className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300"
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </main>

        {/* Right Sidebar - Ads */}
        <aside className="w-64 pl-6 hidden lg:block">
          <div className="sticky top-8 space-y-4">
            {ads.map((ad, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
                <div className="text-xs text-blue-500 mb-1">Sponsored</div>
                <h3 className="font-medium text-gray-800 mb-2">{ad}</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Learn more →
                </button>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}