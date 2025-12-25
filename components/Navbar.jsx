import React, { useState, useEffect, useCallback } from "react";
import { FaEnvelope } from "react-icons/fa";
import { debounce } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "./helper/Logo";
import LanguageSelector from "./helper/LanguageSelector";
import AuthButton from "./helper/AuthButton";
import CategoryDropdown from "./helper/CategoryDropdown";
import SearchBar from "./helper/SearchBar";
import NavLinks from "./helper/NavLinks";
import MobileMenu from "./helper/MobileMenu";

// Temporary JSON data for testing search
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

const Navbar = () => {
 const [isMobileView, setIsMobileView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth <= 1080);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Debounced search function
  const performSearch = useCallback(debounce((query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      // Simulate API delay
      setTimeout(() => {
        const results = tempContent.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.content.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(results);
        setIsSearching(false);
      }, 500); // Simulate network delay
    } catch (error) {
      console.error("Search error:", error);
      setSearchError("Failed to perform search");
      setSearchResults([]);
      setIsSearching(false);
    }
  }, 300), []);

  // Handle search query changes
  const handleSearch = (query) => {
    setSearchQuery(query);

    // Only search if query has at least 2 characters
    if (query.length >= 2) {
      performSearch(query);
    } else {
      setSearchResults([]);
    }
  };

  // Clear search results
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchError(null);
  };
  return (
    <header className={`bg-white shadow-md ${mobileMenuOpen || isCategoriesOpen ? 'relative' : 'sticky top-0'} z-50 w-full`}>
      {/* Top blue bar */}
      <div className="bg-[#0a63b0] flex justify-between items-center px-2 sm:px-4 py-1 w-full">
        {!isMobileView && (
          <div className="text-white text-xs sm:text-sm hover:text-blue-200 transition-colors duration-300 flex items-center">
            <FaEnvelope className="mr-1 sm:mr-2" />
            mail: gargumesh463@gmail.com
          </div>
        )}
        <MobileMenu
          isMobileView={isMobileView}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          isCategoriesOpen={isCategoriesOpen}
          setIsCategoriesOpen={setIsCategoriesOpen}
        />
        <LanguageSelector />
        {isMobileView && <AuthButton />}
      </div>

      {/* Main navbar content */}
      <div className="mx-auto flex justify-between items-center py-3 sm:py-2 px-4 sm:px-6 w-full max-w-[1800px]">
        {/* Left side (Logo + Category) */}
        <div className="flex items-center space-x-2 xl:space-x-4">
          <Logo />
          <CategoryDropdown isMobileView={isMobileView} />
        </div>

        {/* Right side (Search + Nav Links) */}
        <div className="flex items-center space-x-2 xl:space-x-4">
          {/* Search Container - now full width on mobile */}
          <div className={`relative ${isMobileView ? 'w-full' : ''}`}>
            <SearchBar
              isMobileView={isMobileView}
              onSearch={handleSearch}
              onClear={clearSearch}
            />

            {/* Centered Search Results Dropdown - different positioning for mobile */}
            {searchQuery.length >= 2 && (
              <div className={`
                absolute
                ${isMobileView ?
                  'left-100 right-0 mx-auto w-[95vw] max-w-md' :
                  'left-1/2 transform -translate-x-1/2 w-full max-w-md'
                }
                mt-2 bg-white rounded-md shadow-lg z-50 border border-gray-200
              `}>
                {/* ... (keep existing dropdown content) */}
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="animate-pulse flex justify-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    </div>
                    <p className="mt-2">Searching...</p>
                  </div>
                ) : searchError ? (
                  <div className="p-4 text-red-500 text-center">{searchError}</div>
                ) : searchResults.length > 0 ? (
                  <div className="py-1 max-h-96 overflow-y-auto">
                    {searchResults.map((result) => (
                      <div key={result.id} className="hover:bg-gray-100 border-b border-gray-100 px-4 py-3">
                        <a href={result.url} className="block">
                          <div className="flex flex-col">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-blue-800">{result.title}</h4>
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {result.category}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {result.content.substring(0, 100)}...
                            </p>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-gray-500 text-center">
                    No results found for "<span className="font-medium">{searchQuery}</span>"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Nav Links (desktop only) */}
          {!isMobileView && (
            <nav className="flex space-x-2 xl:space-x-8">
              <NavLinks />
              <AuthButton />
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
