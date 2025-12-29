import React, { useState, useRef } from "react";
import { useAuth } from "../../lib/AuthContext";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-transparent hover:border-blue-500 transition duration-300 focus:ring-4 overflow-hidden"
            aria-expanded={isOpen}
            aria-controls="dropdownAvatar"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-full h-full object-cover"
              src="/profile.png"
              alt="User photo"
            />
          </button>
          {isOpen && (
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
      ) : (
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
      )}
    </div>
  );
};

export default AuthButton;
