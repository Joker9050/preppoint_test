// src/components/MobileMenu.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

const MobileMenu = ({ isMobileView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const categories = {
    it: { title: "Information Technology", icon: "💻" },
    government: { title: "Government Exams", icon: "🏛️" },
    bank: { title: "Banking Exams", icon: "🏦" },
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    if (isCategoriesOpen) setIsCategoriesOpen(false); // Close categories if open
  };

  const toggleCategories = () => {
    setIsCategoriesOpen((prev) => !prev);
    if (mobileMenuOpen) setMobileMenuOpen(false); // Close main menu if open
  };

  // Handle clicks outside the mobile menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
        setIsCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    isMobileView && (
      <div className="flex items-center gap-2">
        {/* Hamburger Menu Button */}
        <button
          className="text-gray-100 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Categories Button */}
        <button
          onClick={toggleCategories}
          className="flex items-center justify-between px-4 py-2 text-gray-100 rounded-md focus:outline-none"
          aria-label={isCategoriesOpen ? "Close categories" : "Open categories"}
        >
          <span>Categories</span>
          <svg
            className={`w-5 h-5 ml-2 transition-transform ${
              isCategoriesOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Categories Dropdown */}
        {isCategoriesOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-10 left-0 right-0 bg-white shadow-lg w-full z-50"
            ref={mobileMenuRef}
          >
            <div className="py-1 w-full">
              {Object.entries(categories).map(([key, category]) => (
                <Link
                  key={key}
                  to="/categories"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 flex justify-between"
                  onClick={() => setIsCategoriesOpen(false)}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{category.icon}</span>
                    <span>{category.title}</span>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              ))}
              <Link
                to="/categories"
                className="block px-4 py-3 text-blue-600 hover:bg-gray-100 flex items-center justify-between border-t border-gray-200"
                onClick={() => setIsCategoriesOpen(false)}
              >
                <span>View More</span>
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Main Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-10 left-0 right-0 bg-white shadow-lg w-full z-50"
            ref={mobileMenuRef}
          >
            <div className="px-4 py-3 w-full">
              <NavLinks />
              <div className="text-black text-sm hover:text-blue-200 transition-colors duration-300 flex items-center mt-4">
                <span className="text-gray-600 mr-3 text-lg">
                  <FaEnvelope className="mr-2" />
                </span>
                <span className="text-lg">mail: prep_point@gmail.com</span>
              </div>
              <div className="flex justify-center items-center">
                <div className="bg-[#0a63b0] rounded-xl w-16 mt-6 h-1"></div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    )
  );
};

export default MobileMenu;