 // src/components/CategoryDropdown.jsx
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaThLarge, 
  FaChevronDown, 
  FaAngleRight,
  FaSpinner,
  FaPython,
  FaJava,
  FaJs,
  FaDatabase,
  FaServer,
  FaCode
} from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
// Static mappings for icons and colors (frontend only)
const CATEGORY_ICONS = {
  "Information Technology": "💻",
  "Government Exams": "🏛️",
  "Banking Exams": "🏦"
};

const SECTION_COLORS = {
  "Programming": "bg-gradient-to-r from-blue-50 via-purple-50 to-green-50",
  "Core Subjects": "bg-red-50",
  "Central Exams": "bg-indigo-50",
  "State Exams": "bg-indigo-50",
  "Default": "bg-gray-50"
};

const ITEM_ICONS = {
  // Programming
  "Python": { icon: <FaPython />, color: "text-blue-600" },
  "Java": { icon: <FaJava />, color: "text-red-400" },
  "JavaScript": { icon: <FaJs />, color: "text-yellow-400" },
  "C++": { text: "C++", color: "text-blue-500" },
  "C Programming": { text: "C", color: "text-blue-500" },
  "SQL": { icon: <FaDatabase />, color: "text-blue-300" },
  "PHP": { text: "PHP", color: "text-purple-500" },
  "TypeScript": { icon: <SiTypescript />, color: "text-blue-700" },
  
  // Core Subjects
  "Data Structures & Algorithms": { icon: <FaCode />, color: "text-purple-400" },
  "DBMS": { icon: <FaDatabase />, color: "text-blue-500" },
  "Operating System": { icon: <FaServer />, color: "text-gray-500" },
  "Computer Networks": { icon: <FaServer />, color: "text-green-400" },
  "OOPs Concepts": { icon: <FaCode />, color: "text-red-500" },
  "Software Engineering": { icon: <FaCode />, color: "text-green-600" },
  "Web & Internet Technologies": { icon: <FaCode />, color: "text-blue-400" },
  "Computer Organization & Architecture": { icon: <FaServer />, color: "text-indigo-500" },
  
  // Government Exams
  "SSC CGL": { icon: <FaAngleRight />, color: "text-blue-500" },
  "SSC CHSL": { icon: <FaAngleRight />, color: "text-blue-500" },
  "SSC GD": { icon: <FaAngleRight />, color: "text-blue-500" },
  "SSC MTS": { icon: <FaAngleRight />, color: "text-blue-500" },
  "SSC Stenographer": { icon: <FaAngleRight />, color: "text-blue-500" },
  
  // Special items
  "Coming Soon": { icon: <FaAngleRight />, color: "text-blue-500" },
  "view more →": { icon: <FaAngleRight />, color: "text-blue-500" }
};

const CategoryDropdown = ({ isMobileView }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("it");
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const hasFetched = useRef(false);

  // Transform API data to frontend structure
  const transformApiData = (apiData) => {
    const transformed = {};
    
    Object.entries(apiData).forEach(([categoryName, categoryData]) => {
      // Normalize category names (remove trailing spaces)
      const normalizedName = categoryName.trim();
      
      // Map to frontend keys
      const categoryKeyMap = {
        "Information Technology": "it",
        "Government Exams": "government",
        "Banking Exams": "bank"
      };
      
      const categoryKey = categoryKeyMap[normalizedName];
      if (!categoryKey) return;
      
      // Get icon from frontend mapping
      const icon = CATEGORY_ICONS[normalizedName] || "📁";
      
      // Check if it's a "Coming Soon" category
      const isComingSoon = categoryData.sections?.[0]?.title === "Coming Soon";
      
      if (isComingSoon) {
        transformed[categoryKey] = {
          title: categoryData.title,
          items: ["Coming Soon"],
          icon
        };
      } else {
        transformed[categoryKey] = {
          title: categoryData.title,
          sections: categoryData.sections.map(section => ({
            ...section,
            color: SECTION_COLORS[section.title] || SECTION_COLORS.Default,
            isScrollingFrame: section.isScrollingFrame
          })),
          icon
        };
      }
    });
    
    return transformed;
  };

  // Static categories data
  const staticCategories = {
    it: {
      title: "Information Technology",
      sections: [
        {
          title: "Programming Languages",
          items: ["HTML", "CSS", "JavaScript", "React", "Python", "Java", "PHP", "C Programming", "TypeScript"],
          color: "bg-gradient-to-r from-blue-50 via-purple-50 to-green-50",
          isScrollingFrame: true
        },
        {
          title: "Computer Science Fundamentals",
          items: ["Data Structures & Algorithms", "DBMS", "Operating System", "Computer Networks", "OOPs Concepts", "Software Engineering", "Web & Internet Technologies", "Computer Organization & Architecture", "Theory of Computation", "Compiler Design"],
          color: "bg-gradient-to-r from-purple-50 via-pink-50 to-red-50",
          isScrollingFrame: true
        }
      ],
      icon: "💻"
    },
    government: {
      title: "Government Exams",
      sections: [
        {
          title: "SSC Exams",
          items: ["SSC CGL", "SSC CHSL", "SSC GD", "SSC MTS", "SSC Stenographer"],
          color: "bg-gradient-to-r from-green-50 via-teal-50 to-cyan-50",
          isScrollingFrame: true
        },
        {
          title: "Other Government Exams",
          items: ["view more →"],
          color: "bg-gradient-to-r from-emerald-50 via-cyan-50 to-blue-50",
          isScrollingFrame: true
        }
      ],
      icon: "🏛️"
    },
    bank: {
      title: "Banking Exams",
      sections: [
        {
          title: "Banking Exams",
          items: ["IBPS PO", "IBPS Clerk", "SBI PO", "SBI Clerk", "RBI Grade B", "NABARD Grade A", "SEBI Grade A"],
          color: "bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50",
          isScrollingFrame: true
        }
      ],
      icon: "🏦"
    }
  };

  // Load static data
  const loadStaticCategories = () => {
    setCategories(staticCategories);
    setLoading(false);
  };

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load static data when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && !hasFetched.current) {
      hasFetched.current = true;
      loadStaticCategories();
    }
  }, [isDropdownOpen]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleCategoryHover = (category) => setActiveCategory(category);

  const handleViewMoreClick = (category) => {
    router.push(`/categories#${category}`);
    setIsDropdownOpen(false);
  };

  // Get icon for item
  const getItemIcon = (item) => {
    const iconData = ITEM_ICONS[item] || { icon: <FaAngleRight className="text-blue-500" /> };
    
    if (iconData.icon) {
      return React.cloneElement(iconData.icon, { 
        className: `${iconData.color || "text-blue-500"} mr-2` 
      });
    }
    
    return (
      <span className={`${iconData.color || "text-blue-500"} mr-2`}>
        {iconData.text}
      </span>
    );
  };

  // Loading state for dropdown
  if (loading && !categories) {
    return (
      <div className="relative">
        <button
          className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg min-w-[160px]"
          aria-expanded={false}
        >
          <FaThLarge className="text-[#0a63b0] text-lg" />
          <span className="font-semibold text-lg whitespace-nowrap">
            Categories
          </span>
          <FaSpinner className="animate-spin text-sm" />
        </button>
      </div>
    );
  }

  // Use categories if loaded, otherwise use static fallback
  const categoryData = categories || {
    it: {
      title: "Information Technology",
      sections: [
        {
          title: "Technology Stack",
          items: ["Loading..."],
          color: "bg-gradient-to-r from-blue-50 via-purple-50 to-green-50",
          isScrollingFrame: true
        }
      ],
      icon: "💻"
    },
    government: {
      title: "Government Exams",
      items: ["Loading..."],
      icon: "🏛️"
    },
    bank: {
      title: "Banking Exams",
      items: ["Loading..."],
      icon: "🏦"
    }
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
              {/* Category list */}
              <div className="w-1/3 bg-gray-50 border-r min-w-[120px] sm:min-w-[160px]">
                <div className="p-2 space-y-1">
                  {Object.entries(categoryData).map(([key, category]) => (
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
                    href="/categories"
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
              
              {/* Category content */}
              <div className="w-2/3 p-2 sm:p-4 overflow-y-auto min-w-[280px] sm:min-w-[390px] md:min-w-[490px]">
                {categoryData[activeCategory] && (
                  <div className="space-y-2 sm:space-y-4 animate-fadeIn">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center truncate">
                      <span className="mr-2">{categoryData[activeCategory].icon}</span>
                      {categoryData[activeCategory].title}
                    </h3>
                    
                    {categoryData[activeCategory].sections ? (
                      categoryData[activeCategory].sections.map((section) => (
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
                                      {getItemIcon(item)}
                                      <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-200 truncate">
                                        {item}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <Link
                                  href={
                                    item === "Coming Soon"
                                      ? "#"
                                      : `/categories/${activeCategory}/${item.toLowerCase().replace(/\s+/g, '-')}`
                                  }
                                  className="flex items-center group"
                                  key={item}
                                  onClick={(e) => {
                                    if (item === "Coming Soon") {
                                      e.preventDefault();
                                    }
                                    setIsDropdownOpen(false);
                                  }}
                                >
                                  <div className="w-full transform transition-all duration-300 hover:translate-x-1">
                                    <div className="flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-opacity-0 group-hover:bg-white group-hover:bg-opacity-70 transition-colors duration-200">
                                      {getItemIcon(item)}
                                      <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-200 truncate">
                                        {item}
                                      </span>
                                      {item === "Coming Soon" && (
                                        <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full animate-pulse whitespace-nowrap">
                                          Soon
                                        </span>
                                      )}
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
                        {categoryData[activeCategory].items?.map((item) => (
                          <Link
                            href={item === "Coming Soon" ? "#" : `/categories/${activeCategory}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className="flex items-center group"
                            key={item}
                            onClick={(e) => {
                              if (item === "Coming Soon") {
                                e.preventDefault();
                              }
                              setIsDropdownOpen(false);
                            }}
                          >
                            <div className="w-full transform transition-all duration-300 hover:translate-x-1">
                              <div className="flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-opacity-0 group-hover:bg-blue-50 transition-colors duration-200">
                                {getItemIcon(item)}
                                <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-200 truncate">
                                  {item}
                                </span>
                                {item === "Coming Soon" && (
                                  <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full animate-pulse whitespace-nowrap">
                                    Soon
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gray-50 px-3 sm:px-4 py-1 sm:py-2 border-t text-center w-full">
              <p className="text-xs text-gray-500 animate-bounce whitespace-nowrap">
                Browse all {categoryData[activeCategory]?.title.toLowerCase()} categories
              </p>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default CategoryDropdown;