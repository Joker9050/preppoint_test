// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import Logo from "./helper/Logo";
import LanguageSelector from "./helper/LanguageSelector";
import AuthButton from "./helper/AuthButton";
import CategoryDropdown from "./helper/CategoryDropdown";
import SearchBar from "./helper/SearchBar";
import NavLinks from "./helper/NavLinks";
import MobileMenu from "./helper/MobileMenu";
import "../assets/css/style.css";

const Navbar = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth <= 1080);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="bg-[#0a63b0] flex justify-between items-center px-2 sm:px-4 py-1 w-full">
        {!isMobileView && (
          <div className="text-white text-xs sm:text-sm hover:text-blue-200 transition-colors duration-300 flex items-center">
            <FaEnvelope className="mr-1 sm:mr-2" />
            mail: prep_point@gmail.com
          </div>
        )}
        <MobileMenu isMobileView={isMobileView} />
        <LanguageSelector />
        {isMobileView && <AuthButton />}
      </div>
      <div className="mx-auto flex justify-between items-center py-3 sm:py-2 px-4 sm:px-6 w-full max-w-[1800px]">
        <div className="flex items-center space-x-2 xl:space-x-4">
          <Logo />
          <CategoryDropdown isMobileView={isMobileView} />
        </div>
        <div className="flex items-center space-x-2 xl:space-x-4">
        <SearchBar isMobileView={isMobileView} />
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