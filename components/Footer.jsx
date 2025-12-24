import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Logo and About */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src="/logo.png"
                alt="PrepPoint Logo"
                className="w-40 h-auto"
              />
            </div>
            <p className="text-gray-300 mb-4">
              PrepPoint is your trusted companion for smart MCQ preparation — offering structured MCQs, PYQs, and practice sets across IT subjects, government exams, and academic streams. Learn smarter. Practice deeper. Succeed faster.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-blue-600 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</a></li>
              <li><Link href="/contact#contact-section" className="text-gray-300 hover:text-blue-400 transition-colors">Contact Us</Link></li>
              {/* <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Practice Tests</a></li> */}
              {/* <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Blog</a></li> */}
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Policies</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-blue-600 pb-2">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Information Technology</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Government Exams</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Banking Exams</a></li>
              {/* <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Programming</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Interview Prep</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Skill Development</a></li> */}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-blue-600 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MdEmail className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-300">gargumesh463@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MdPhone className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-300">+919050818446</span>
              </li>
              {/* <li className="flex items-start">
                <MdLocationOn className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-300">123 Education St, Learning City, 10101</span>
              </li> */}
            </ul>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} PrepPoint. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
