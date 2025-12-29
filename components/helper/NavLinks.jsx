// src/components/NavLinks.jsx
import React from "react";
import { FaBook, FaGraduationCap, FaCertificate, FaQuestion } from "react-icons/fa";

const NavLinks = () => {
  const navLinks = [
    { id: 1, icon: <FaBook />, label: "Library", href: "/library" },
    { id: 2, icon: <FaGraduationCap />, label: "Courses", href: "/" },
    { id: 4, icon: <FaCertificate />, label: "PrepContributor", href: "/" },
  ];

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        {navLinks.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              className="group relative flex items-center space-x-2 px-2 py-2 text-gray-700 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#0a63b0]"
              aria-label={`Navigate to ${link.label}`}
            >
              <span
                className="text-gray-600 group-hover:text-[#0a63b0] transition-colors duration-300 text-lg"
                aria-hidden="true"
              >
                {link.icon}
              </span>
              <span className="font-medium group-hover:text-[#0a63b0] transition-colors duration-300 text-lg">
                {link.label}
              </span>
              <span className="absolute bottom-0 left-0 h-0.5 bg-[#0a63b0] w-0 group-hover:w-full transition-all duration-300 origin-left"></span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;