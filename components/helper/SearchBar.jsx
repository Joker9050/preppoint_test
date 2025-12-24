// src/components/SearchBar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ isMobileView, onSearch }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showClear, setShowClear] = useState(false);
  const timeoutRef = useRef(null);

  // Handle search with debounce
  const handleSearch = (query) => {
    if (onSearch) {
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        onSearch(query);
      }, 300);
    }
  };

  // Update search when query changes
  useEffect(() => {
    handleSearch(searchQuery);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Toggle clear button visibility
  useEffect(() => {
    setShowClear(searchQuery.length > 0);
  }, [searchQuery]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleClear = () => {
    setSearchQuery("");
    if (onSearch) onSearch("");
    if (isMobileView) setIsFocused(false);
  };

  const handleMobileSearchToggle = () => {
    const newFocusState = !isFocused;
    setIsFocused(newFocusState);
    if (!newFocusState) {
      setSearchQuery("");
      if (onSearch) onSearch("");
    }
  };

  return (
    <>
      {isMobileView ? (
        <>
          <button
            className="text-gray-700 p-2 focus:outline-none"
            onClick={handleMobileSearchToggle}
          >
            <Search size={20} />
          </button>
          {isFocused && (
            <div className="fixed inset-0 bg-white z-50 p-4">
              <div className="flex items-center border-b border-gray-300 pb-4">
                <button onClick={handleClear} className="mr-2">
                  <X size={24} />
                </button>
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 outline-none text-lg"
                  autoFocus
                  value={searchQuery}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center">
          <div className="relative">
            <div
              className={`flex items-center gap-2 border-l-4 border-r-4 border-[#0a63b0] rounded-full px-2 transition-all duration-300 ease-in-out ${
                isFocused
                  ? "w-[190px] lg:w-[230px] xl:w-[360px] p-2 shadow-md"
                  : "w-[170px] xl:w-[290px] p-2 shadow-md"
              }`}
            >
              <Search className="text-blue-900 hover:text-blue-700 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search your favourite Mcqs..."
                className="w-full outline-none bg-transparent text-sm md:text-base"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={searchQuery}
                onChange={handleChange}
              />
              {showClear && (
                <button
                  onClick={handleClear}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;