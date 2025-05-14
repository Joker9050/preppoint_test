import React, { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
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
  const searchRef = useRef(null);
  const phrases = [
    "Search for MCQs...",
    "Find practice questions...",
    "Type a topic name...",
    "Search PYOs...",
  ];
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
    government:[
      'SSC CGL', 'SSC CHSL', 'SSC GD', 'SSC MTS', 'SSC Stenographer'
    ]
  }
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
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Reset animation state when blurring
    setCharIndex(0);
    setPhraseIndex(0);
    setIsTyping(true);
  };

  return (
    <>
      <Navbar />
      <div className="h-screen bg-gradient-to-t from-blue-100 via-blue-400 to-blue-500 flex flex-col items-center justify-center p-4">
        {/* Animated Search Bar */}
        <div
          className={`w-full max-w-md mb-8 transform transition-all duration-300 hover:scale-105 ${
            isFocused ? "scale-105" : ""
          }`}
        >
          <div className="relative">
            <input
              ref={searchRef}
              type="text"
              placeholder={isFocused ? "Search..." : placeholder}
              className="w-full py-3 px-5 pr-12  rounded-full bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg text-gray-700"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <FiSearch
              className={`absolute right-4 top-3.5 text-gray-500 text-xl ${
                !isFocused ? "animate-bounce" : ""
              }`}
            />
          </div>
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
          >
            GET STARTED
          </motion.button>
        </motion.div>
      </div>       
      <Slidebar name={"Learning IT"} courses={learning.it} portion = '/categories#it'/>
      <Slidebar name={"Learning Gov.t"}  courses={learning.government} portion='/categories#government' />
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
