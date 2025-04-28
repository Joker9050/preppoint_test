// src/components/SearchBar.jsx
import React, { useState } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ isMobileView }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      {isMobileView ? (
        <>
          <button
            className="text-gray-700 p-2 focus:outline-none"
            onClick={() => setIsFocused(!isFocused)}
          >
            <Search size={20} />
          </button>
          {isFocused && (
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
        </>
      ) : (
        <div className="flex items-center justify-center">
          <div className="relative">
            <div
              className={`flex cursor-pointer items-center gap-2 border-l-4 border-r-4 border-[#0a63b0] rounded-full px-2 transition-all duration-300 ease-in-out ${
                isFocused
                  ? "w-[190px] lg:w-[230px] xl:w-[400px] p-2 shadow-md"
                  : "w-[170px] xl:w-[290px] p-2 shadow-md"
              }`}
            >
              <Search className="text-blue-900 cursor-pointer flex hover:text-blue-700 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search your favourite Mcqs..."
                className="w-full cursor-pointer outline-none bg-transparent animate-fadeIn text-sm md:text-base"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;