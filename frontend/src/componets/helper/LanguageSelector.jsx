// src/components/LanguageSelector.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import Flag from "react-world-flags";

const LanguageSelector = () => {
  const [language, setLanguage] = useState("en-IN");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [{ code: "en-IN", label: "En-In" }];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 rounded-lg text-white bg-[#0a63b0] focus:outline-none transition-all duration-300"
      >
        <Flag
          code={language === "en-IN" ? "IN" : language}
          className="w-4 h-4 sm:w-6 sm:h-6"
        />
        <span className="text-xs sm:text-sm">
          {languages.find((lang) => lang.code === language)?.label}
        </span>
        <FaChevronDown
          className={`text-xs transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 sm:w-40 bg-white shadow-lg rounded-lg z-10 animate-fadeIn">
          <ul className="text-gray-700">
            {languages.map((lang) => (
              <li
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="flex items-center space-x-2 px-3 py-2 text-xs sm:text-sm cursor-pointer hover:bg-blue-100 transition-colors duration-200"
              >
                <Flag
                  code={lang.code === "en-IN" ? "IN" : lang.code}
                  className="w-4 h-4 sm:w-6 sm:h-6"
                />
                <span>{lang.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;