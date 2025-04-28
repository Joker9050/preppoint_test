import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Flag from "react-world-flags";
import "../assets/css/style.css";
import { Search, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import profile from "../assets/images/profile.png";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaThLarge,
  FaAngleRight,
  FaBook,
  FaGraduationCap,
  FaCertificate,
  FaEnvelope,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaJava,
  FaPython,
  FaDatabase,
  FaServer,
  FaCode,
  FaUserCircle,
} from "react-icons/fa";
import {
  SiAngular,
  SiVuedotjs,
  SiDotnet,
  SiSwift,
  SiPostgresql,
  SiMongodb,
} from "react-icons/si";
import { DiRuby } from "react-icons/di";
import { useAuth } from "../pages/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("it");
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(null);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [language, setLanguage] = useState("en-IN");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isOpen_, setIsOpen_] = useState(false);
  const [isOpenc, setIsOpenc] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth <= 1080);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileCategory = (category) => {
    setMobileCategoryOpen(mobileCategoryOpen === category ? null : category);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCategoryHover = (category) => {
    setActiveCategory(category);
  };

  const handleViewMoreClick = (category) => {
    navigate(`/categories`);
    setIsDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
        setIsOpenc(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const languages = [{ code: "en-IN", label: "En-In" }];

  const toggleDropdownL = () => setIsOpen(!isOpen);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const techIcons = {
    HTML5: <FaHtml5 className="text-orange-500" />,
    CSS: <FaCss3Alt className="text-blue-500" />,
    JavaScript: <FaJs className="text-yellow-400" />,
    React: <FaReact className="text-blue-400" />,
    Angular: <SiAngular className="text-red-500" />,
    "Vue.js": <SiVuedotjs className="text-green-500" />,
    "Node.js": <FaNodeJs className="text-green-600" />,
    PHP: <span className="text-purple-500">PHP</span>,
    Python: <FaPython className="text-blue-600" />,
    Java: <FaJava className="text-red-400" />,
    Ruby: <DiRuby className="text-red-600" />,
    ".NET": <SiDotnet className="text-purple-600" />,
    SQL: <FaDatabase className="text-blue-300" />,
    MongoDB: <SiMongodb className="text-green-500" />,
    PostgreSQL: <SiPostgresql className="text-blue-400" />,
    "Data Structures": <FaCode className="text-yellow-500" />,
    Algorithms: <FaCode className="text-purple-400" />,
    "C++": <span className="text-blue-500">C++</span>,
    "C#": <span className="text-purple-500">C#</span>,
    Swift: <SiSwift className="text-orange-400" />,
    "Computer Networks": <FaServer className="text-green-400" />,
    "Operating Systems": <FaServer className="text-gray-500" />,
    DBMS: <FaDatabase className="text-blue-500" />,
    OOP: <FaCode className="text-red-500" />,
    "System Design": <FaServer className="text-indigo-500" />,
    "view more →": <FaAngleRight className="text-blue-500" />,
  };

  const categories = {
    it: {
      title: "Information Technology",
      sections: [
        {
          title: "Technology Stack",
          items: [
            "HTML5",
            "CSS",
            "JavaScript",
            "React",
            "Angular",
            "Vue.js",
            "Node.js",
            "PHP",
            "Python",
            "Java",
            "Ruby",
            ".NET",
            "SQL",
            "MongoDB",
            "PostgreSQL",
            "Data Structures",
            "Algorithms",
            "Python",
            "JavaScript",
            "Java",
            "C++",
            "C#",
            "Swift",
            "view more →",
          ],
          color: "bg-gradient-to-r from-blue-50 via-purple-50 to-green-50",
          isScrollingFrame: true,
        },
        {
          title: "Core Subjects",
          items: [
            "Computer Networks",
            "Operating Systems",
            "DBMS",
            "OOP",
            "System Design",
            "view more →",
          ],
          color: "bg-red-50",
          isScrollingFrame: true,
        },
      ],
      icon: "💻",
    },
    government: {
      title: "Government Exams",
      sections: [
        {
          title: "Centeral Exam",
          items: [
            "SSC CGL",
            "SSC CHSL",
            "SSC GD",
            "SSC MTS",
            "SSC Stenographer",
            "view more →",
          ],
          color: "bg-indigo-50",
          isScrollingFrame: true,
        },
        {
          title: "State Exam",
          items: [
            "SSC CGL",
            "SSC CHSL",
            "SSC GD",
            "SSC MTS",
            "SSC Stenographer",
            "view more →",
          ],
          color: "bg-indigo-50",
          isScrollingFrame: true,
        },
      ],
      icon: "🏛️",
    },
    bank: {
      title: "Banking Exams",
      items: ["Coming Soon"],
      icon: "🏦",
    },
  };

  const navLinks = [
    { icon: <FaBook />, label: "Library" },
    { icon: <FaGraduationCap />, label: "Courses" },
    { icon: <FaCertificate />, label: "Certifications" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderAuthButton = () => {
    if (user) {
      return (
        <div className="flex items-center space-x-4">
          <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Avatar Button */}
            <button
              onClick={() => setIsOpen_((prev) => !prev)}
              className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-transparent hover:border-blue-500 transition duration-300 focus:ring-4  overflow-hidden"
              aria-expanded={isOpen_}
              aria-controls="dropdownAvatar"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-full h-full object-cover"
                src={profile}
                alt="User photo"
              />
            </button>

            {/* Dropdown Menu */}
            {isOpen_ && (
              <div
                id="dropdownAvatar"
                className="absolute right-0 z-20 mt-3 w-52 bg-white shadow-xl rounded-xl border border-gray-100 animate-fadeIn"
              >
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <a
                      href="/dashboard"
                      className="flex gap-2 px-4 py-2 hover:bg-gray-100 transition-all duration-200"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      Dashboard
                    </a>
                  </li>
                  <li
                    className="flex gap-2 px-4 py-2 text-[red] cursor-pointer hover:bg-gray-100 transition-all duration-200"
                    onClick={handleLogout}
                  >
                    <svg
                      className="w-5 h-5 rotate-180"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15.75 8.25L19.5 12L15.75 15.75" />
                      <path d="M19.5 12H9.75" />
                      <path d="M9.75 19.5H6C5.17 19.5 4.5 18.83 4.5 18V6C4.5 5.17 5.17 4.5 6 4.5H9.75" />
                    </svg>
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <a
          href="/login"
          className="flex items-center space-x-1 sm:space-x-2 border-2 p-2 sm:p-2 border-[#0a63b0] bg-[#0a63b0] rounded-lg text-white font-bold hover:bg-white hover:text-[#0a63b0] transition-all duration-300 hover:shadow-lg text-lg"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.75 8.25L19.5 12L15.75 15.75"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.5 12H9.75"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.75 19.5H6C5.17157 19.5 4.5 18.8284 4.5 18V6C4.5 5.17157 5.17157 4.5 6 4.5H9.75"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="ml-1 sm:ml-2">Login</span>
        </a>
      );
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      {/* Top bar for contact information */}
      <div className="bg-[#0a63b0] flex justify-between items-center px-2 sm:px-4 py-1 w-full">
        {!isMobileView && (
          <div className="text-white text-xs sm:text-sm hover:text-blue-200 transition-colors duration-300 flex items-center">
            <FaEnvelope className="mr-1 sm:mr-2" />
            mail: prep_point@gmail.com
          </div>
        )}
        {isMobileView && (
          <button
            className="text-gray-100 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
        {isMobileView && (
          <button
            onClick={() => setIsOpenc(!isOpenc)}
            className="flex items-center justify-between px-4 py-2 text-gray-100 rounded-md"
          >
            <span>Categories</span>
            <svg
              className={`w-5 h-5 ml-2 transition-transform ${
                isOpenc ? "transform rotate-180" : ""
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
        )}
        <div className="relative">
          <button
            onClick={toggleDropdownL}
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

        {isMobileView && renderAuthButton()}
      </div>

      {/* Navbar Main Content */}
      <div className="mx-auto flex justify-between items-center py-3 sm:py-2 px-4 sm:px-6 w-full max-w-[1800px]">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center space-x-2 xl:space-x-4 ">
          <div className="logo-container transform hover:scale-105 transition-transform duration-300">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="w-[180px] h-[50px] sm:w-[180px] sm:h-[50px]"
              />
            </Link>
          </div>

          {/* Enhanced Category Dropdown - Hidden on mobile and 1080px screens */}
          {!isMobileView && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300 hover:shadow-md min-w-[160px]"
                aria-expanded={isDropdownOpen}
              >
                <FaThLarge className="text-[#0a63b0] text-lg" />
                <span className="font-semibold text-lg whitespace-nowrap">
                  Categories
                </span>
                <FaChevronDown
                  className={`text-sm transition-transform duration-300 ${
                    isDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 bg-white shadow-xl rounded-lg w-[400px] sm:w-[550px] md:w-[650px] lg:w-[750px] xl:w-[850px] overflow-hidden animate-fadeIn">
                  <div className="flex h-[280px] sm:h-[320px]">
                    {/* Sidebar - Fixed width */}
                    <div className="w-1/3 bg-gray-50 border-r min-w-[120px] sm:min-w-[160px]">
                      <div className="p-2 space-y-1">
                        {Object.entries(categories).map(([key, category]) => (
                          <div
                            key={key}
                            className={`flex items-center py-2 sm:py-3 px-2 sm:px-3 cursor-pointer rounded-md transition-all duration-200 ${
                              activeCategory === key
                                ? "bg-blue-100 text-[#0a63b0] font-medium shadow-inner"
                                : "hover:bg-gray-100 hover:text-gray-800"
                            }`}
                            onMouseEnter={() => handleCategoryHover(key)}
                          >
                            <span className="text-lg mr-2">
                              {category.icon}
                            </span>
                            <span className="text-sm whitespace-nowrap truncate">
                              {category.title}
                            </span>
                          </div>
                        ))}
                        {/* More Categories Link */}
                        <Link
                          to="/categories"
                          className="flex items-center py-2 sm:py-3 px-2 sm:px-3 rounded-md hover:bg-gray-100 transition-all duration-200 text-sm text-[#0a63b0] font-medium"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <span className="text-lg mr-2">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 18l6-6-6-6"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className="whitespace-nowrap text-black">
                            View more
                          </span>
                        </Link>
                      </div>
                    </div>

                    {/* Content Area - Flexible width with proper constraints */}
                    <div className="w-2/3 p-2 sm:p-4 overflow-y-auto min-w-[280px] sm:min-w-[390px] md:min-w-[490px]">
                      <div className="space-y-2 sm:space-y-4 animate-fadeIn">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center truncate">
                          <span className="mr-2">
                            {categories[activeCategory].icon}
                          </span>
                          {categories[activeCategory].title}
                        </h3>

                        {categories[activeCategory].sections ? (
                          categories[activeCategory].sections.map((section) => (
                            <div
                              key={section.title}
                              className={`space-y-2 sm:space-y-3 p-2 sm:p-3 rounded-lg ${
                                section.color
                              } ${
                                section.isScrollingFrame
                                  ? "h-[140px] overflow-y-auto"
                                  : ""
                              }`}
                            >
                              <h4 className="text-sm font-medium text-gray-600 border-b pb-1">
                                {section.title}
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                                {section.items.map((item) =>
                                  item === "view more →" ? (
                                    <div
                                      key={item}
                                      className="flex items-center group cursor-pointer"
                                      onClick={() =>
                                        handleViewMoreClick(activeCategory)
                                      }
                                    >
                                      <div className="w-full transform transition-all duration-300 hover:translate-x-1">
                                        <div className="flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-opacity-0 group-hover:bg-white group-hover:bg-opacity-70 transition-colors duration-200">
                                          {techIcons[item] && (
                                            <span className="mr-1 sm:mr-2">
                                              {techIcons[item]}
                                            </span>
                                          )}
                                          <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-200 truncate">
                                            {item}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <a
                                      href="#"
                                      className="flex items-center group"
                                      key={item}
                                    >
                                      <div className="w-full transform transition-all duration-300 hover:translate-x-1">
                                        <div className="flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-opacity-0 group-hover:bg-white group-hover:bg-opacity-70 transition-colors duration-200">
                                          {techIcons[item] ? (
                                            <span className="mr-1 sm:mr-2">
                                              {techIcons[item]}
                                            </span>
                                          ) : (
                                            <FaAngleRight className="text-blue-500 text-xs mr-1 sm:mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                          )}
                                          <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-200 truncate">
                                            {item}
                                          </span>
                                        </div>
                                      </div>
                                    </a>
                                  )
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="space-y-2 sm:space-y-3">
                            {categories[activeCategory].items.map((item) =>
                              item === "view more →" ? (
                                <div
                                  key={item}
                                  className="flex items-center group cursor-pointer"
                                  onClick={() =>
                                    handleViewMoreClick(activeCategory)
                                  }
                                >
                                  <div className="w-full transform transition-all duration-300 hover:translate-x-1">
                                    <div className="flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-opacity-0 group-hover:bg-blue-50 transition-colors duration-200">
                                      <FaAngleRight className="text-blue-500 text-xs mr-1 sm:mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                      <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-200 truncate">
                                        {item}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <a
                                  href="#"
                                  className="flex items-center group"
                                  key={item}
                                >
                                  <div className="w-full transform transition-all duration-300 hover:translate-x-1">
                                    <div className="flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-opacity-0 group-hover:bg-blue-50 transition-colors duration-200">
                                      <FaAngleRight className="text-blue-500 text-xs mr-1 sm:mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                      <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-200 truncate">
                                        {item}
                                      </span>
                                      {activeCategory === "bank" &&
                                        item === "Coming Soon" && (
                                          <span className="ml-1 sm:ml-2 px-1 sm:px-2 py-0.5 sm:py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full animate-pulse whitespace-nowrap">
                                            Soon
                                          </span>
                                        )}
                                    </div>
                                  </div>
                                </a>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer with fixed width */}
                  <div className="bg-gray-50 px-3 sm:px-4 py-1 sm:py-2 border-t text-center w-full">
                    <p className="text-xs text-gray-500 animate-bounce whitespace-nowrap">
                      Browse all{" "}
                      {categories[activeCategory].title.toLowerCase()}{" "}
                      categories
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Search Button - Visible only on mobile and 1080px screens */}
        {isMobileView && (
          <button
            className="text-gray-700 p-2 focus:outline-none"
            onClick={() => setIsFocused(!isFocused)}
          >
            <Search size={20} />
          </button>
        )}

        {/* Desktop Navbar Links - Hidden on mobile and 1080px screens */}
        {!isMobileView && (
          <nav className="flex space-x-2 md:space-x-6 lg:space-x-6 xl:space-x-8">
            {/* Search Bar - Hidden on mobile and 1080px screens */}
            {!isMobileView && (
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div
                    className={`flex cursor-pointer items-center gap-2 border-l-4 border-r-4 border-[#0a63b0] rounded-full px-2 transition-all duration-300 ease-in-out ${
                      isFocused
                        ? "w-[190px] lg:w-[230px] xl:w-[400px] p-2 shadow-md "
                        : "w-[170px] xl:w-[290px] p-2 shadow-md"
                    }`}
                  >
                    <Search className="text-blue-900 cursor-pointer flex hover:text-blue-700 transition-colors duration-200" />
                    <input
                      type="text"
                      placeholder={"Search your favourite Mcqs..."}
                      className="w-full cursor-pointer outline-none bg-transparent animate-fadeIn text-sm md:text-base"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />
                  </div>
                </div>
              </div>
            )}
            {navLinks.map((link) => (
              <a
                key={link.label}
                href="#"
                className="group relative flex flex-col hover:-translate-y-1 items-center px-1 sm:px-2 py-1 sm:py-2 text-gray-700 transition-all duration-300"
              >
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className="text-gray-600 group-hover:text-[#0a63b0] transition-colors duration-300 text-lg">
                    {link.icon}
                  </span>
                  <span className="font-medium group-hover:text-[#0a63b0] transition-colors duration-300 text-lg">
                    {link.label}
                  </span>
                </div>
                <span className="absolute bottom-0 left-0 h-0.5 bg-[#0a63b0] w-0 group-hover:w-full transition-all duration-300 origin-left"></span>
              </a>
            ))}
            {renderAuthButton()}
          </nav>
        )}
      </div>

      {/* Mobile Search Input - Appears when search button is clicked */}
      {isFocused && isMobileView && (
        <div className="fixed inset-0 bg-white z-50 p-4">
          <div className="flex items-center border-b border-gray-300 pb-4">
            <button onClick={() => setIsFocused(false)} className="mr-2">
              <X size={24} />
            </button>
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 outline-none text-lg"
              autoFocus
            />
          </div>
        </div>
      )}
      {isOpenc && isMobileView && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-white shadow-lg w-full"
          ref={mobileMenuRef}
        >
          {/* Mobile Navigation Links */}
          <div className="py-1 w-full">
            {Object.entries(categories).map(([key, category]) => (
              <div
                key={key}
                to="/categories"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                onClick={() => setIsOpenc(false)}
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
              </div>
            ))}
            <div
              to="/categories"
              className="block px-4 py-3 text-blue-600 hover:bg-gray-100 flex items-center justify-between border-t border-gray-200"
              onClick={() => setIsOpenc(false)}
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
            </div>
          </div>
        </motion.div>
      )}
      {/* Mobile Menu - Appears when menu button is clicked on mobile or 1080px screens */}
      {mobileMenuOpen && isMobileView && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-white shadow-lg w-full"
          ref={mobileMenuRef}
        >
          {/* Mobile Navigation Links */}
          <div className="px-4 py-3 w-full">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href="#"
                className="flex items-center py-4 text-gray-700 border-b border-gray-100 w-full"
              >
                <span className="text-gray-600 mr-3 text-lg">{link.icon}</span>
                <span className="font-medium text-lg">{link.label}</span>
              </a>
            ))}
            <div className="text-black text-xs sm:text-sm hover:text-blue-200 transition-colors duration-300 flex items-center">
              <span className="text-gray-600 mr-3 text-lg">
                <FaEnvelope className="mr-1 sm:mr-2" />
              </span>
              <span className="text-lg">mail: prep_point@gmail.com</span>
            </div>
            <div className="flex justify-center items-center">
              <div className="bg-[#0a63b0] rounded-xl w-16 mt-6 h-1"></div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
