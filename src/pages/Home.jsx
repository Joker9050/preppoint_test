import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import Slidebar from "../componets/Slidebar";
import FeaturesSection from "../componets/FeaturesSection"
import ContactUs from "../componets/ContactUs"
import FeedbackSection from "../componets/FeedbackSection"
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
// Your provided JSON data
const tempContent = [
  {
    id: 1,
    title: "Mathematics Basics",
    content: "Introduction to algebra and geometry concepts",
    url: "/mathematics-basics",
    category: "Mathematics"
  },
  {
    id: 2,
    title: "Physics Fundamentals",
    content: "Basic principles of physics and mechanics",
    url: "/physics-fundamentals",
    category: "Science"
  },
  {
    id: 3,
    title: "English Grammar",
    content: "Essential grammar rules and writing techniques",
    url: "/english-grammar",
    category: "Language"
  },
  {
    id: 4,
    title: "History of Computers",
    content: "Evolution of computing technology through ages",
    url: "/computer-history",
    category: "Technology"
  },
  {
    id: 5,
    title: "Chemistry Experiments",
    content: "Basic chemistry lab experiments and procedures",
    url: "/chemistry-experiments",
    category: "Science"
  },
  {
    id: 6,
    title: "Machine Learning",
    content: "Multiple choice questions on Machine Learning concepts",
    url: "/machine-learning",
    category: "Technology"
  },
  {
    id: 7,
    title: "Computer Fundamentals",
    content: "MCQs on basic computer knowledge and functions",
    url: "/computer-fundamentals",
    category: "Technology"
  },
  {
    id: 8,
    title: "DBMS",
    content: "Database Management Systems multiple choice questions",
    url: "/dbms",
    category: "Technology"
  },
  {
    id: 9,
    title: "Operating System",
    content: "MCQs on operating system concepts and architecture",
    url: "/operating-system",
    category: "Technology"
  },
  {
    id: 10,
    title: "Computer Networks",
    content: "Networking basics and protocols in MCQ format",
    url: "/computer-networks",
    category: "Technology"
  },
  {
    id: 11,
    title: "PHP",
    content: "PHP programming multiple choice questions",
    url: "/php",
    category: "Programming"
  },
  {
    id: 12,
    title: "CSS",
    content: "Cascading Style Sheets MCQs for styling web pages",
    url: "/css",
    category: "Web Development"
  },
  {
    id: 13,
    title: "C Programming",
    content: "Multiple choice questions on C programming language",
    url: "/c-programming",
    category: "Programming"
  },
  {
    id: 14,
    title: "Java",
    content: "Java language fundamentals in MCQ format",
    url: "/java",
    category: "Programming"
  },
  {
    id: 15,
    title: "JavaScript",
    content: "Test your JavaScript knowledge with these MCQs",
    url: "/javascript",
    category: "Web Development"
  },
  {
    id: 16,
    title: "SSC CGL",
    content: "MCQ practice set for SSC CGL examination",
    url: "/ssc-cgl",
    category: "Government Exams"
  },
  {
    id: 17,
    title: "SSC CHSL",
    content: "MCQs covering topics for SSC CHSL preparation",
    url: "/ssc-chsl",
    category: "Government Exams"
  },
  {
    id: 18,
    title: "SSC GD",
    content: "Practice multiple choice questions for SSC GD",
    url: "/ssc-gd",
    category: "Government Exams"
  },
  {
    id: 19,
    title: "SSC MTS",
    content: "MCQs for SSC MTS exam preparation",
    url: "/ssc-mts",
    category: "Government Exams"
  },
  {
    id: 20,
    title: "SSC Stenographer",
    content: "Multiple choice questions for SSC Stenographer exam",
    url: "/ssc-stenographer",
    category: "Government Exams"
  }
];


const PrepPointWelcome = () => {
  const [placeholder, setPlaceholder] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showClear, setShowClear] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  const timeoutRef = useRef(null);
  const [learningIT, setLearningIT] = useState([]);
  // const [learningGovernment, setLearningGovernment] = useState([]);
  const [loadingIT, setLoadingIT] = useState(false);
  // const [loadingGovernment, setLoadingGovernment] = useState(false);
  const [errorIT, setErrorIT] = useState(null);
  // const [errorGovernment, setErrorGovernment] = useState(null);

  
  const phrases = [
    "Search for MCQs...",
    "Find practice questions...",
    "Type a topic name...",
    "Search PYOs...",
  ];
  
  // Static learning data
  const staticLearningData = {
    it: [
      "Machine Learning",
      "Computer Fundamentals",
      "DBMS",
      "Operating System",
      "Computer Networks",
      "PHP",
      "CSS",
      "C Programming",
      "Java",
      "JavaScript"
    ],
    government: [
      'SSC CGL', 'SSC CHSL', 'SSC GD', 'SSC MTS', 'SSC Stenographer'
    ]
  };

  useEffect(() => {
    setLearningIT(staticLearningData.it);
    setLoadingIT(false);
    // setLearningGovernment(staticLearningData.government);
    // setLoadingGovernment(false);
  }, []);


  const learning = {
    it: [
      "Machine Learning",
      "Computer Fundamentals",
      "DBMS",
      "Operating System",
      "Computer Networks",
      "PHP",
      "CSS",
      "C",
      "Java",
      "JavaScript"
    ],
    government: [
      'SSC CGL', 'SSC CHSL', 'SSC GD', 'SSC MTS', 'SSC Stenographer'
    ]
  }

  // Enhanced search function
  const handleSearch = (query) => {
    if (query.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    const lowerCaseQuery = query.toLowerCase();
    const filteredResults = tempContent.filter(item =>
      item.title.toLowerCase().includes(lowerCaseQuery) ||
      item.content.toLowerCase().includes(lowerCaseQuery) ||
      item.category.toLowerCase().includes(lowerCaseQuery)
    );
    
    setSearchResults(filteredResults);
    setShowResults(true);
  };

  // Update search when query changes
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target) &&
          searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Typing animation logic
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isFocused) return; // Pause animation when focused

    const typingEffect = () => {
      if (isTyping) {
        if (charIndex < phrases[phraseIndex].length) {
          setPlaceholder(phrases[phraseIndex].substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setIsTyping(false);
          setTimeout(() => setIsTyping(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setPlaceholder(phrases[phraseIndex].substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsTyping(true);
          setPhraseIndex((phraseIndex + 1) % phrases.length);
        }
      }
    };

    const timer = setTimeout(typingEffect, isTyping ? 100 : 50);

    return () => clearTimeout(timer);
  }, [charIndex, isTyping, phraseIndex, phrases, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    setPlaceholder(""); // Clear animation when focused
    if (searchQuery) {
      setShowResults(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Reset animation state when blurring
    if (!searchQuery) {
      setCharIndex(0);
      setPhraseIndex(0);
      setIsTyping(true);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowClear(e.target.value.length > 0);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
    if (searchRef.current) searchRef.current.focus();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  const handleResultClick = (url) => {
    // Navigate to the result's URL
    window.location.href = url;
    setShowResults(false);
  };

  return (
    <>
      <Navbar />
      <div className="h-screen bg-gradient-to-t from-blue-100 via-blue-400 to-blue-500 flex flex-col items-center justify-center p-4 relative">
        {/* Animated Search Bar */}
        <div className="w-full max-w-md mb-8">
          <form 
            onSubmit={handleSearchSubmit}
            className={`transform transition-all duration-300 hover:scale-105 ${
              isFocused ? "scale-105" : ""
            }`}
          >
            <div className="relative">
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={isFocused || searchQuery ? "Search..." : placeholder}
                className="w-full py-3 px-5 pr-12 rounded-full bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg text-gray-700"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {showClear ? (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-11 top-3.5 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              ) : null}
              <button 
                type="submit"
                className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FiSearch className={`text-xl ${!isFocused && !searchQuery ? "animate-bounce" : ""}`} />
              </button>
            </div>
          </form>
          
          {/* Enhanced Search Results Dropdown */}
          {showResults && searchQuery && (
            <div 
              ref={resultsRef}
              className="absolute z-10 mt-2 w-full max-w-md bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto"
            >
              {searchResults.length > 0 ? (
                <ul className="py-1">
                  {searchResults.map((result) => (
                    <li 
                      key={result.id} 
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100"
                      onClick={() => handleResultClick(result.url)}
                    >
                      <div className="font-medium text-gray-800">{result.title}</div>
                      <div className="text-sm text-gray-600 mt-1">{result.content}</div>
                      <div className="mt-2">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {result.category}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-6 text-center text-gray-500">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Welcome section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full text-center"
        >
          <h1 className="text-[3rem] font-bold text-white mb-2">
            Welcome to PrepPoint
          </h1>
          <p className="text-gray-100 mb-3">
            Your one-stop solution for detailed MCQs and PYQs Practice
          </p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="hover:bg-white hover:text-[#2e669d] text-white font-medium border-[#0a63b0] bg-[#0a63b0] rounded-lg border-2 py-3 px-6 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => window.location.href = '/categories'}
          >
            GET STARTED
          </motion.button>
        </motion.div>
      </div>       
      <Slidebar name={"Learning IT"} courses={learningIT} portion='/categories#it'/>
      {/* <Slidebar name={"Learning Gov.t"} courses={learningGovernment} portion='/categories#government' /> */}

      <section>
        <FeaturesSection/>
      </section>
      <section className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 md:gap-8 lg:gap-12 bg-gray-50 p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <ContactUs />
        </div>
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <FeedbackSection />
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default PrepPointWelcome;