// src/components/CategoryDropdown.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaThLarge, FaChevronDown, FaAngleRight } from "react-icons/fa";
import {
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

const CategoryDropdown = ({ isMobileView }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("it");
  const dropdownRef = useRef(null);

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
          title: "Central Exams",
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
          title: "State Exams",
          items: [
            "UPPSC",
            "BPSC",
            "MPPSC",
            "RPSC",
            "MPSC",
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleCategoryHover = (category) => setActiveCategory(category);

  const handleViewMoreClick = (category) => {
    navigate(`/categories/#${category}`);
    setIsDropdownOpen(false);
  };

  return (
    !isMobileView && (
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
          <div className="absolute left-0 mt-2 bg-white shadow-xl rounded-lg w-[400px] sm:w-[550px] md:w-[650px] lg:w-[750px] xl:w-[850px] overflow-hidden animate-fadeIn z-50">
            <div className="flex h-[280px] sm:h-[320px]">
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
                      <span className="text-lg mr-2">{category.icon}</span>
                      <span className="text-sm whitespace-nowrap truncate">
                        {category.title}
                      </span>
                    </div>
                  ))}
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
                      View all categories
                    </span>
                  </Link>
                </div>
              </div>
              <div className="w-2/3 p-2 sm:p-4 overflow-y-auto min-w-[280px] sm:min-w-[390px] md:min-w-[490px]">
                <div className="space-y-2 sm:space-y-4 animate-fadeIn">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center truncate">
                    <span className="mr-2">{categories[activeCategory].icon}</span>
                    {categories[activeCategory].title}
                  </h3>
                  {categories[activeCategory].sections ? (
                    categories[activeCategory].sections.map((section) => (
                      <div
                        key={section.title}
                        className={`space-y-2 sm:space-y-3 p-2 sm:p-3 rounded-lg ${section.color} ${
                          section.isScrollingFrame ? "h-[140px] overflow-y-auto" : ""
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
                                onClick={() => handleViewMoreClick(activeCategory)}
                              >
                                <div className="w-full transform transition-all duration-300 hover:translate-x-1">
                                  <div className="flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-opacity-0 group-hover:bg-white group-hover:bg-opacity-70 transition-colors duration-200">
                                    {techIcons[item] && (
                                      <span className="mr-1 sm:mr-2">{techIcons[item]}</span>
                                    )}
                                    <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-200 truncate">
                                      {item}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <Link
                                to={`/categories/${activeCategory}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="flex items-center group"
                                key={item}
                                onClick={() => setIsDropdownOpen(false)}
                              >
                                <div className="w-full transform transition-all duration-300 hover:translate-x-1">
                                  <div className="flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-opacity-0 group-hover:bg-white group-hover:bg-opacity-70 transition-colors duration-200">
                                    {techIcons[item] ? (
                                      <span className="mr-1 sm:mr-2">{techIcons[item]}</span>
                                    ) : (
                                      <FaAngleRight className="text-blue-500 text-xs mr-1 sm:mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                    )}
                                    <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-200 truncate">
                                      {item}
                                    </span>
                                  </div>
                                </div>
                              </Link>
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
                            onClick={() => handleViewMoreClick(activeCategory)}
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
                          <Link
                            to={`/categories/${activeCategory}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className="flex items-center group"
                            key={item}
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <div className="w-full transform transition-all duration-300 hover:translate-x-1">
                              <div className="flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-opacity-0 group-hover:bg-blue-50 transition-colors duration-200">
                                <FaAngleRight className="text-blue-500 text-xs mr-1 sm:mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-200 truncate">
                                  {item}
                                </span>
                                {activeCategory === "bank" && item === "Coming Soon" && (
                                  <span className="ml-1 sm:ml-2 px-1 sm:px-2 py-0.5 sm:py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full animate-pulse whitespace-nowrap">
                                    Soon
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-3 sm:px-4 py-1 sm:py-2 border-t text-center w-full">
              <p className="text-xs text-gray-500 animate-bounce whitespace-nowrap">
                Browse all {categories[activeCategory].title.toLowerCase()} categories
              </p>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default CategoryDropdown;