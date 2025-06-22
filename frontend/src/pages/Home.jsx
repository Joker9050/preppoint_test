import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import Slidebar from "../componets/Slidebar";
import FeaturesSection from "../componets/FeaturesSection"
import ContactUs from "../componets/ContactUs"
import FeedbackSection from "../componets/FeedbackSection"

const PrepPointWelcome = () => {
  const [placeholder, setPlaceholder] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showClear, setShowClear] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [learningSections, setLearningSections] = useState({
    it: [],
    government: []
  });
  const [loadingSections, setLoadingSections] = useState({
    it: true,
    government: true
  });
  const [errors, setErrors] = useState({
    it: null,
    government: null
  });
  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  const timeoutRef = useRef(null);
  
  const phrases = [
    "Search for MCQs...",
    "Find practice questions...",
    "Type a topic name...",
    "Search PYOs...",
  ];

  // Fetch learning sections from API
  const fetchLearningSection = async (category) => {
    try {
      setLoadingSections(prev => ({ ...prev, [category]: true }));
      setErrors(prev => ({ ...prev, [category]: null }));
      
      const response = await fetch(
        "http://localhost:8080/PrepPoint/public/api/learning_section.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "prep_2025_$trong_k3y"
          },
          body: JSON.stringify({ category })
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract the first (and only) key from the response
      const categoryName = Object.keys(data)[0];
      const subjects = data[categoryName] || [];
      
      setLearningSections(prev => ({
        ...prev,
        [category]: subjects
      }));
      
    } catch (err) {
      console.error(`API Error (${category}):`, err);
      setErrors(prev => ({
        ...prev,
        [category]: err.message || `Failed to fetch ${category} sections`
      }));
    } finally {
      setLoadingSections(prev => ({ ...prev, [category]: false }));
    }
  };

  // Fetch both sections in parallel
  useEffect(() => {
    const fetchAllSections = async () => {
      await Promise.all([
        fetchLearningSection('it'),
        fetchLearningSection('Government')
      ]);
    };
    
    fetchAllSections();
  }, []);

  // Enhanced search function using API data
  const handleSearch = (query) => {
    if (query.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    const lowerCaseQuery = query.toLowerCase();
    
    // Combine all subjects from both categories
    const allSubjects = [
      ...learningSections.it.map(subject => ({ 
        title: subject, 
        category: 'Information Technology' 
      })),
      ...learningSections.government.map(subject => ({ 
        title: subject, 
        category: 'Government Exams' 
      }))
    ];
    
    const filteredResults = allSubjects.filter(item =>
      item.title.toLowerCase().includes(lowerCaseQuery) ||
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
  }, [searchQuery, learningSections]);

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

  const handleResultClick = (title) => {
    // Generate URL based on title
    const url = `/${title.toLowerCase().replace(/\s+/g, '-')}`;
    window.location.href = url;
    setShowResults(false);
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center py-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  // Error display component
  const ErrorDisplay = ({ category }) => (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
      <h3 className="text-sm font-medium text-red-800">Error loading {category} sections</h3>
      <p className="text-sm text-red-700 mt-2">{errors[category]}</p>
      <button
        onClick={() => fetchLearningSection(category)}
        className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
      >
        Retry
      </button>
    </div>
  );

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
                  {searchResults.map((result, index) => (
                    <li 
                      key={index} 
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100"
                      onClick={() => handleResultClick(result.title)}
                    >
                      <div className="font-medium text-gray-800">{result.title}</div>
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
          <p className="text-gray-200 mb-6">
            Your one-stop solution for MCQs and PYQs Practice
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
      
      {/* IT Learning Section */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">Learning IT</h2>
          {loadingSections.it ? (
            <LoadingSpinner />
          ) : errors.it ? (
            <ErrorDisplay category="it" />
          ) : (
            <Slidebar 
              name="Information Technology" 
              courses={learningSections.it} 
              portion="/categories#it"
            />
          )}
        </div>
      </div>
      
      {/* Government Learning Section */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">Government Exams</h2>
          {loadingSections.government ? (
            <LoadingSpinner />
          ) : errors.government ? (
            <ErrorDisplay category="government" />
          ) : (
            <Slidebar 
              name="Government Exams" 
              courses={learningSections.government} 
              portion="/categories#government"
            />
          )}
        </div>
      </div>
      
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