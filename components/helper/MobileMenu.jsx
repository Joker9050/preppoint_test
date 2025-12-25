 // src/components/MobileMenu.jsx
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import NavLinks from "./NavLinks";

const MobileMenu = ({ isMobileView, mobileMenuOpen, setMobileMenuOpen, isCategoriesOpen, setIsCategoriesOpen }) => {
  const mobileMenuRef = useRef(null);
  const categoriesMenuRef = useRef(null);
  const hamburgerButtonRef = useRef(null);
  const categoriesButtonRef = useRef(null);

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

  // Handle clicks/touches outside the mobile menu to close it (ignore clicks on the toggle buttons)
  useEffect(() => {
    const isEventInside = (event) => {
      // Support composedPath for shadow DOM and touch events
      const path = event.composedPath ? event.composedPath() : (event.path || []);
      if (!Array.isArray(path) || path.length === 0) {
        // Fallback to checking the event.target
        const t = event.target;
        return (
          (mobileMenuRef.current && mobileMenuRef.current.contains(t)) ||
          (categoriesMenuRef.current && categoriesMenuRef.current.contains(t)) ||
          (hamburgerButtonRef.current && hamburgerButtonRef.current.contains(t)) ||
          (categoriesButtonRef.current && categoriesButtonRef.current.contains(t))
        );
      }

      return (
        mobileMenuRef.current && path.includes(mobileMenuRef.current) ||
        categoriesMenuRef.current && path.includes(categoriesMenuRef.current) ||
        hamburgerButtonRef.current && path.includes(hamburgerButtonRef.current) ||
        categoriesButtonRef.current && path.includes(categoriesButtonRef.current)
      );
    };

    const handlePointerDown = (event) => {
      if (!isEventInside(event)) {
        setMobileMenuOpen(false);
        setIsCategoriesOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      // Close menus on Escape
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setIsCategoriesOpen(false);
      }
    };

    // Use pointer events (mousedown / touchstart) so we close immediately and avoid race conditions
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // When menus open, move focus into the menu for better accessibility
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      mobileMenuRef.current.focus();
    } else if (isCategoriesOpen && categoriesMenuRef.current) {
      categoriesMenuRef.current.focus();
    }
  }, [mobileMenuOpen, isCategoriesOpen]);

  return (
    isMobileView && (
      <div className="flex items-center gap-2 z-[120]">
        {/* Hamburger Menu Button */}
        <button
          ref={hamburgerButtonRef}
          className="text-gray-100 focus:outline-none z-[70] pointer-events-auto"
          onClick={() => toggleMobileMenu()}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen ? "true" : "false"}
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
          ref={categoriesButtonRef}
          onClick={() => toggleCategories()}
          className="flex items-center justify-between px-4 py-2 text-gray-100 rounded-md focus:outline-none z-[70] pointer-events-auto"
          aria-label={isCategoriesOpen ? "Close categories" : "Open categories"}
          aria-expanded={isCategoriesOpen ? "true" : "false"}
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

        {/* Overlay (transparent background when menu or categories open) */}
        {(mobileMenuOpen || isCategoriesOpen) && typeof document !== "undefined"
          ? createPortal(
              <div
                className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[40] transition-opacity duration-200 pointer-events-auto"
                onClick={(e) => {
                  // Only close if the overlay itself was clicked (not a child)
                  if (e.target === e.currentTarget) {
                    setMobileMenuOpen(false);
                    setIsCategoriesOpen(false);
                  }
                }}
                aria-hidden="true"
                role="presentation"
                data-testid="mobile-menu-backdrop"
              />,
              document.body
            )
          : null}

        {/* Categories Dropdown */}
        {isCategoriesOpen && typeof document !== "undefined"
          ? createPortal(
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="fixed top-[3rem] left-0 right-0 bg-white bg-opacity-100 shadow-lg w-full z-[60] ring-1 ring-gray-100 pointer-events-auto"
                ref={categoriesMenuRef}
                role="menu"
                tabIndex={-1}
                aria-label="Categories"
                data-testid="categories-dropdown"
              >
                <div className="pt-8 pb-4 overflow-auto max-h-[calc(100vh-32px)] w-full">
                  {Object.entries(categories).map(([key, category]) => (
                    <Link
                      key={key}
                      href="/categories"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 flex justify-between bg-white"
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
                    href="/categories"
                    className="block px-4 py-3 text-blue-600 hover:bg-gray-100 flex items-center justify-between border-t border-gray-200 bg-white"
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
              </motion.div>,
              document.body
            )
          : null} 

        {/* Main Mobile Menu */}
        {mobileMenuOpen && typeof document !== "undefined"
          ? createPortal(
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="fixed top-[3rem] left-0 right-0 bg-white bg-opacity-100 shadow-lg w-full z-[60] ring-1 ring-gray-100 pointer-events-auto"
                ref={mobileMenuRef}
                role="dialog"
                tabIndex={-1}
                aria-label="Mobile menu"
                data-testid="mobile-main-menu"
              >
                <div className="pt-8 px-4 pb-6 w-full bg-white overflow-auto max-h-[calc(100vh-32px)]">
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
              </motion.div>,
              document.body
            )
          : null}
      </div>
    )
  );
};

export default MobileMenu;