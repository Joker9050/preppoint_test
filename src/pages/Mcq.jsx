import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBook, FiClock, FiTarget, FiBookmark, FiFlag, FiChevronLeft, FiChevronRight as FiChevronRightIcon, FiCheckCircle, FiXCircle, FiSearch, FiUser, FiChevronRight, FiChevronDown } from 'react-icons/fi';
import Navbar from '../componets/Navbar';
import Footer from '../componets/Footer';

// Static categories data matching Category.jsx
const subjectsData = [
  {
    id: "html",
    name: "HTML",
    icon: "fab fa-html5 text-orange-500",
    topics: [
      {
        id: "html-basics",
        name: "Basics",
        subtopics: [
          {
            id: "html-fundamentals",
            name: "Fundamentals",
            questions: [
              {
                id: 1,
                question: "What does HTML stand for?",
                type: "text",
                options: [
                  "Hyperlinks and Text Markup Language",
                  "Hyper Text Markup Language",
                  "Home Tool Markup Language",
                  "Hyperlinking Text Management Language"
                ],
                answer: "Hyper Text Markup Language",
                explanation: "HTML stands for Hyper Text Markup Language. It is the standard markup language for creating web pages and web applications.",
                marks: 1
              },
              {
                id: 2,
                question: "Which tag is used to create a hyperlink in HTML?",
                type: "text",
                options: ["<link>", "<a>", "<href>", "<url>"],
                answer: "<a>",
                explanation: "The `<a>` tag (anchor tag) is used to create hyperlinks in HTML. The href attribute specifies the URL of the page the link goes to.",
                marks: 1
              },
              {
                id: 3,
                question: "Which input type creates a password field?",
                type: "text",
                options: ["text", "password", "hidden", "secure"],
                answer: "password",
                explanation: "The `password` input type creates a password field where the characters are masked (usually as dots or asterisks) for security.",
                marks: 1
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "css",
    name: "CSS",
    icon: "fab fa-css3-alt text-blue-500",
    topics: [
      {
        id: "css-basics",
        name: "Basics",
        subtopics: [
          {
            id: "css-fundamentals",
            name: "Fundamentals",
            questions: [
              {
                id: 4,
                question: "Which CSS property is used to change the text color?",
                type: "text",
                options: ["font-color", "text-color", "color", "foreground-color"],
                answer: "color",
                explanation: "The `color` property in CSS is used to set the color of text. It accepts color names, hex codes, RGB values, etc.",
                marks: 1
              },
              {
                id: 5,
                question: "What does CSS stand for?",
                type: "text",
                options: [
                  "Computer Style Sheets",
                  "Creative Style Sheets",
                  "Cascading Style Sheets",
                  "Colorful Style Sheets"
                ],
                answer: "Cascading Style Sheets",
                explanation: "CSS stands for Cascading Style Sheets. It describes how HTML elements are to be displayed on screen, paper, or in other media.",
                marks: 1
              },
              {
                id: 6,
                question: "Which CSS property is used to create a flex container?",
                type: "text",
                options: ["display: flex", "display: block", "display: inline", "display: grid"],
                answer: "display: flex",
                explanation: "Setting `display: flex` on a container element creates a flex container, enabling flexbox layout for its children.",
                marks: 1
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "fab fa-js-square text-yellow-400",
    topics: [
      {
        id: "js-basics",
        name: "Basics",
        subtopics: [
          {
            id: "js-fundamentals",
            name: "Fundamentals",
            questions: [
              {
                id: 7,
                question: "Which keyword is used to declare a constant in JavaScript?",
                type: "text",
                options: ["var", "let", "const", "constant"],
                answer: "const",
                explanation: "The `const` keyword is used to declare constants in JavaScript. Once assigned, the value cannot be changed.",
                marks: 1
              },
              {
                id: 8,
                question: "What will `typeof null` return in JavaScript?",
                type: "text",
                options: ["null", "undefined", "object", "boolean"],
                answer: "object",
                explanation: "In JavaScript, `typeof null` returns 'object'. This is a well-known quirk in the language.",
                marks: 1
              },
              {
                id: 9,
                question: "Which method adds an element to the end of an array?",
                type: "text",
                options: ["push()", "pop()", "shift()", "unshift()"],
                answer: "push()",
                explanation: "The `push()` method adds one or more elements to the end of an array and returns the new length of the array.",
                marks: 1
              },
              {
                id: 10,
                question: "Consider the following code:\n```javascript\nfunction test() {\n  console.log(x);\n  var x = 5;\n}\ntest();\n```\nWhat will be logged to the console?",
                type: "code",
                options: ["5", "undefined", "ReferenceError", "null"],
                answer: "undefined",
                explanation: "Due to hoisting, the variable declaration `var x` is moved to the top of the function scope, but the assignment stays in place. So `x` is `undefined` when accessed before the assignment.",
                marks: 2
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "react",
    name: "React",
    icon: "fab fa-react text-blue-400",
    topics: [
      {
        id: "react-basics",
        name: "Basics",
        subtopics: [
          {
            id: "react-fundamentals",
            name: "Fundamentals",
            questions: [
              {
                id: 11,
                question: "What is JSX in React?",
                type: "text",
                options: [
                  "A JavaScript framework",
                  "A syntax extension for JavaScript",
                  "A CSS preprocessor",
                  "A database query language"
                ],
                answer: "A syntax extension for JavaScript",
                explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.",
                marks: 1
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "python",
    name: "Python",
    icon: "fab fa-python text-blue-400",
    topics: [
      {
        id: "python-basics",
        name: "Basics",
        subtopics: [
          {
            id: "python-fundamentals",
            name: "Fundamentals",
            questions: [
              {
                id: 12,
                question: "What is the time complexity of accessing an element in an array by index?",
                type: "text",
                options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
                answer: "O(1)",
                explanation: "Array access by index is O(1) because arrays provide direct access to elements using their memory addresses.",
                marks: 1
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "java",
    name: "Java",
    icon: "fab fa-java text-red-500",
    topics: [
      {
        id: "java-basics",
        name: "Basics",
        subtopics: [
          {
            id: "java-fundamentals",
            name: "Fundamentals",
            questions: [
              {
                id: 13,
                question: "What is the main difference between an interface and an abstract class in Java?",
                type: "text",
                options: [
                  "Interfaces can have method implementations",
                  "Abstract classes cannot be instantiated",
                  "Interfaces support multiple inheritance",
                  "Abstract classes are always final"
                ],
                answer: "Interfaces support multiple inheritance",
                explanation: "In Java, a class can implement multiple interfaces but can only extend one abstract class, making interfaces useful for multiple inheritance.",
                marks: 1
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "php",
    name: "PHP",
    icon: "fab fa-php text-purple-500",
    topics: [
      {
        id: "php-basics",
        name: "Basics",
        subtopics: [
          {
            id: "php-fundamentals",
            name: "Fundamentals",
            questions: [
              {
                id: 14,
                question: "What does PHP stand for?",
                type: "text",
                options: [
                  "Personal Home Page",
                  "PHP: Hypertext Preprocessor",
                  "Pre-Hypertext Processor",
                  "Public HTML Processor"
                ],
                answer: "PHP: Hypertext Preprocessor",
                explanation: "PHP originally stood for Personal Home Page, but now it stands for PHP: Hypertext Preprocessor.",
                marks: 1
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "c-programming",
    name: "C Programming",
    icon: "fas fa-code text-green-600",
    topics: [
      {
        id: "c-basics",
        name: "Basics",
        subtopics: [
          {
            id: "c-fundamentals",
            name: "Fundamentals",
            questions: [
              {
                id: 15,
                question: "Which operator is used to access the value at the address stored in a pointer?",
                type: "text",
                options: ["&", "*", "->", "."],
                answer: "*",
                explanation: "The dereference operator (*) is used to access the value stored at the memory address contained in a pointer.",
                marks: 1
              }
            ]
          }
        ]
      }
    ]
  }
];

export default function MCQPage() {
  // State management
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [expandedSubjects, setExpandedSubjects] = useState(new Set());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [progress, setProgress] = useState({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Get current questions based on selection
  const getCurrentQuestions = () => {
    if (!selectedSubject || !selectedTopic || !selectedSubtopic) return [];
    const subject = subjectsData.find(s => s.id === selectedSubject);
    const topic = subject?.topics.find(t => t.id === selectedTopic);
    const subtopic = topic?.subtopics.find(st => st.id === selectedSubtopic);
    return subtopic?.questions || [];
  };

  const currentQuestions = getCurrentQuestions();
  const currentQuestion = currentQuestions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      // Auto-submit or show time up message
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle subject/topic/subtopic selection
  const handleSubtopicSelect = (subjectId, topicId, subtopicId) => {
    setSelectedSubject(subjectId);
    setSelectedTopic(topicId);
    setSelectedSubtopic(subtopicId);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsTimerActive(true);
  };

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  // Submit answer
  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const questionId = currentQuestion.id;
    const isCorrect = selectedAnswer === currentQuestion.answer;

    setProgress(prev => ({
      ...prev,
      [questionId]: {
        answer: selectedAnswer,
        isCorrect,
        timeSpent: 1800 - timeLeft
      }
    }));

    setShowExplanation(true);
  };

  // Navigate to next/previous question
  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(progress[currentQuestions[currentQuestionIndex - 1]?.id]?.answer || null);
      setShowExplanation(progress[currentQuestions[currentQuestionIndex - 1]?.id]?.isCorrect !== undefined);
    }
  };

  // Toggle bookmark
  const toggleBookmark = () => {
    const newBookmarks = new Set(bookmarkedQuestions);
    if (newBookmarks.has(currentQuestion.id)) {
      newBookmarks.delete(currentQuestion.id);
    } else {
      newBookmarks.add(currentQuestion.id);
    }
    setBookmarkedQuestions(newBookmarks);
  };

  // Calculate progress
  const getProgressStats = () => {
    const attempted = Object.keys(progress).length;
    const correct = Object.values(progress).filter(p => p.isCorrect).length;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    return { attempted, correct, accuracy, total: currentQuestions.length };
  };

  const progressStats = getProgressStats();

  // Toggle subject expansion
  const toggleSubjectExpansion = (subjectId) => {
    const newExpanded = new Set(expandedSubjects);
    if (newExpanded.has(subjectId)) {
      newExpanded.delete(subjectId);
    } else {
      newExpanded.add(subjectId);
    }
    setExpandedSubjects(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Top Navbar */}
      <nav className="bg-white shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="text-xl font-bold text-blue-700">PrepPoint</span>
              </div>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search subjects, topics..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                  <FiUser className="w-5 h-5" />
                  <span>Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 flex gap-6">
        {/* Left Sidebar - Hierarchical Navigation */}
        <aside className={`${sidebarCollapsed ? 'w-16' : 'w-80'} transition-all duration-300`}>
          <div className="bg-white rounded-xl shadow-lg border border-blue-100 sticky top-24 overflow-hidden">
            <div className="p-4 border-b border-blue-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-blue-700">Subjects</h2>
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  {sidebarCollapsed ? <FiChevronRight className="w-4 h-4" /> : <FiChevronLeft className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {subjectsData.map(subject => (
                <div key={subject.id} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => toggleSubjectExpansion(subject.id)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{subject.icon}</span>
                      {!sidebarCollapsed && (
                        <span className="font-medium text-gray-800">{subject.name}</span>
                      )}
                    </div>
                    {!sidebarCollapsed && (
                      expandedSubjects.has(subject.id) ?
                        <FiChevronDown className="w-4 h-4 text-gray-500" /> :
                        <FiChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedSubjects.has(subject.id) && !sidebarCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        {subject.topics.map(topic => (
                          <div key={topic.id} className="ml-6 border-l-2 border-blue-100">
                            <div className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50">
                              📖 {topic.name}
                            </div>
                            {topic.subtopics.map(subtopic => (
                              <button
                                key={subtopic.id}
                                onClick={() => handleSubtopicSelect(subject.id, topic.id, subtopic.id)}
                                className={`w-full px-6 py-2 text-left text-sm hover:bg-blue-50 transition-colors ${
                                  selectedSubtopic === subtopic.id ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-500' : 'text-gray-600'
                                }`}
                              >
                                📑 {subtopic.name}
                              </button>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {!selectedSubtopic ? (
            <motion.div
              className="bg-white rounded-xl shadow-lg border border-blue-100 p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FiBook className="w-16 h-16 text-blue-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to PrepPoint MCQ Practice</h2>
              <p className="text-gray-600 mb-6">Select a subject, topic, and subtopic from the sidebar to start practicing MCQs.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {subjectsData.map(subject => (
                  <div key={subject.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                        <p className="text-sm text-gray-600">{subject.topics.length} topics available</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Header with Breadcrumb and Progress */}
              <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>PrepPoint</span>
                    <span>›</span>
                    <span>{subjectsData.find(s => s.id === selectedSubject)?.name}</span>
                    <span>›</span>
                    <span>{subjectsData.find(s => s.id === selectedSubject)?.topics.find(t => t.id === selectedTopic)?.name}</span>
                    <span>›</span>
                    <span className="text-blue-600 font-medium">
                      {subjectsData.find(s => s.id === selectedSubject)?.topics.find(t => t.id === selectedTopic)?.subtopics.find(st => st.id === selectedSubtopic)?.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FiClock className="w-4 h-4" />
                      <span>{formatTime(timeLeft)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FiTarget className="w-4 h-4" />
                      <span>{progressStats.attempted}/{progressStats.total}</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentQuestionIndex / currentQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question Card */}
              <AnimatePresence mode="wait">
                {currentQuestion && (
                  <motion.div
                    key={currentQuestion.id}
                    className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            Question {currentQuestionIndex + 1} of {currentQuestions.length}
                          </span>
                          <span className="text-sm text-gray-500">{currentQuestion.marks} mark{currentQuestion.marks > 1 ? 's' : ''}</span>
                        </div>
                        <button
                          onClick={toggleBookmark}
                          className={`p-2 rounded-lg transition-colors ${
                            bookmarkedQuestions.has(currentQuestion.id)
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'hover:bg-gray-100 text-gray-400'
                          }`}
                        >
                          <FiBookmark className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="mb-8">
                        <div className="prose prose-lg max-w-none">
                          {currentQuestion.type === 'code' ? (
                            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                              <pre>{currentQuestion.question.replace(/```javascript\n?|```\n?/g, '')}</pre>
                            </div>
                          ) : (
                            <p className="text-lg text-gray-800 leading-relaxed">{currentQuestion.question}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                          <label
                            key={index}
                            className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedAnswer === option
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="answer"
                              value={option}
                              checked={selectedAnswer === option}
                              onChange={() => handleAnswerSelect(option)}
                              className="mt-1 mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <div className="flex-1">
                              {option.includes('```') ? (
                                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                                  <pre>{option.replace(/```javascript\n?|```\n?/g, '')}</pre>
                                </div>
                              ) : (
                                <span className="text-gray-700">{option}</span>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>

                      <div className="mt-8 flex justify-center">
                        <motion.button
                          onClick={handleSubmit}
                          disabled={!selectedAnswer}
                          className={`px-8 py-3 rounded-lg font-medium transition-all ${
                            selectedAnswer
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                          whileHover={selectedAnswer ? { scale: 1.02 } : {}}
                          whileTap={selectedAnswer ? { scale: 0.98 } : {}}
                        >
                          Submit Answer
                        </motion.button>
                      </div>
                    </div>

                    {/* Explanation Section */}
                    <AnimatePresence>
                      {showExplanation && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-blue-100 bg-gradient-to-r from-green-50 to-blue-50"
                        >
                          <div className="p-6">
                            <div className="flex items-center space-x-3 mb-4">
                              {selectedAnswer === currentQuestion.answer ? (
                                <>
                                  <FiCheckCircle className="w-6 h-6 text-green-600" />
                                  <span className="text-lg font-semibold text-green-700">Correct Answer!</span>
                                </>
                              ) : (
                                <>
                                  <FiXCircle className="w-6 h-6 text-red-600" />
                                  <span className="text-lg font-semibold text-red-700">Incorrect Answer</span>
                                </>
                              )}
                            </div>

                            <div className="mb-4">
                              <p className="text-sm text-gray-600 mb-2">Correct Answer:</p>
                              <div className="bg-green-100 border border-green-200 rounded-lg p-3">
                                <span className="font-medium text-green-800">{currentQuestion.answer}</span>
                              </div>
                            </div>

                            <div className="prose prose-sm max-w-none">
                              <p className="text-gray-700">{currentQuestion.explanation}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </main>

        {/* Right Panel - Progress & Stats */}
        <aside className="w-80 hidden xl:block">
          <div className="space-y-6 sticky top-24">
            {/* Progress Card */}
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
              <h3 className="text-lg font-bold text-blue-700 mb-4">Progress</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Questions Attempted</span>
                  <span className="font-semibold">{progressStats.attempted}/{progressStats.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Correct Answers</span>
                  <span className="font-semibold text-green-600">{progressStats.correct}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Accuracy</span>
                  <span className="font-semibold text-blue-600">{progressStats.accuracy}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Time Remaining</span>
                  <span className="font-semibold text-orange-600">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>

            {/* Bookmarks */}
            {bookmarkedQuestions.size > 0 && (
              <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
                <h3 className="text-lg font-bold text-blue-700 mb-4">Bookmarked Questions</h3>
                <div className="space-y-2">
                  {Array.from(bookmarkedQuestions).map(id => {
                    const question = currentQuestions.find(q => q.id === id);
                    return question ? (
                      <div key={id} className="flex items-center space-x-2 text-sm text-gray-600">
                        <FiBookmark className="w-4 h-4 text-yellow-500" />
                        <span>Question {currentQuestions.findIndex(q => q.id === id) + 1}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
              <h3 className="text-lg font-bold text-blue-700 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg transition-colors">
                  View All Questions
                </button>
                <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                  Reset Progress
                </button>
                <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-2 rounded-lg transition-colors">
                  Practice Mode
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Navigation */}
      {selectedSubtopic && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-blue-100 shadow-lg"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    currentQuestionIndex === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                  }`}
                  whileHover={currentQuestionIndex !== 0 ? { scale: 1.02 } : {}}
                >
                  <FiChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </motion.button>

                <span className="text-sm text-gray-600">
                  {currentQuestionIndex + 1} of {currentQuestions.length}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors">
                  <FiFlag className="w-4 h-4" />
                  <span>Report</span>
                </button>

                <motion.button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === currentQuestions.length - 1}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    currentQuestionIndex === currentQuestions.length - 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                  }`}
                  whileHover={currentQuestionIndex !== currentQuestions.length - 1 ? { scale: 1.02 } : {}}
                >
                  <span>Next</span>
                  <FiChevronRightIcon className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}