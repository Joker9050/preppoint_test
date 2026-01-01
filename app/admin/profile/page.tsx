'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  FiUser, FiLock, FiBell, FiMoon, FiActivity,
  FiLogOut, FiSettings, FiChevronDown, FiCheck,
  FiMail, FiPhone, FiBriefcase, FiShield,
  FiEye, FiEyeOff, FiDownload, FiUpload,
  FiSun, FiMonitor, FiLayout, FiType,
  FiFilter, FiCalendar, FiSearch, FiRefreshCw
} from 'react-icons/fi';

export default function ProfilePage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const adminInfo = {
    name: 'Admin User',
    email: 'admin@preppoint.com',
    role: 'Super Admin',
    photo: null,
    notifications: 3
  };

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: <FiUser />, color: 'blue' },
    { id: 'password', label: 'Change Password', icon: <FiLock />, color: 'green' },
    { id: 'notifications', label: 'Notifications', icon: <FiBell />, color: 'purple', badge: 3 },
    { id: 'appearance', label: 'Appearance', icon: <FiMoon />, color: 'orange' },
    { id: 'activity', label: 'Activity Log', icon: <FiActivity />, color: 'indigo' },
  ];

  return (
    <>
      {/* PROFILE DROPDOWN IN HEADER */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
            <FiUser className="text-white" />
          </div>
          <div className="text-left hidden md:block">
            <div className="font-medium text-gray-900">{adminInfo.name}</div>
            <div className="text-xs text-gray-500">{adminInfo.role}</div>
          </div>
          <FiChevronDown className={`text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* DROPDOWN MENU */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
            {/* HEADER */}
            <div className="px-4 py-3 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <FiUser className="text-white text-lg" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{adminInfo.name}</div>
                  <div className="text-sm text-gray-500">{adminInfo.email}</div>
                </div>
              </div>
            </div>

            {/* MENU ITEMS */}
            <div className="py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/admin/profile/${item.id}`}
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-lg bg-${item.color}-100 flex items-center justify-center mr-3`}>
                      <span className={`text-${item.color}-600`}>{item.icon}</span>
                    </div>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}

              {/* DIVIDER */}
              <div className="border-t my-2"></div>

              {/* LOGOUT */}
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  // Logout logic here
                }}
                className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3">
                  <FiLogOut className="text-red-600" />
                </div>
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* PROFILE PAGES CONTENT */}
      {activePage === 'profile' && (
        <div className="p-6 max-w-6xl mx-auto">
          {/* PAGE HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN - PROFILE INFO */}
            <div className="lg:col-span-2 space-y-8">
              {/* PROFILE PHOTO */}
              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <FiUser className="mr-3 text-blue-600" />
                  Profile Photo
                </h2>
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <FiUser className="text-white text-3xl" />
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                      <FiUpload size={16} />
                    </button>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-3">Upload a professional profile photo</p>
                    <div className="space-x-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                        Upload New
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* BASIC INFORMATION */}
              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <FiUser className="mr-3 text-blue-600" />
                  Basic Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={adminInfo.name}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center">
                      <input
                        type="email"
                        defaultValue={adminInfo.email}
                        disabled
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      />
                      <button className="ml-3 px-4 py-3 text-blue-600 border border-blue-200 rounded-lg">
                        Request Change
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Contact support to change primary email</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="flex items-center">
                      <FiPhone className="text-gray-400 mr-3" />
                      <input
                        type="tel"
                        defaultValue="+91 98765 43210"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* PROFESSIONAL DETAILS */}
              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <FiBriefcase className="mr-3 text-blue-600" />
                  Professional Details
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Role
                    </label>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <span className="font-bold text-blue-800">{adminInfo.role}</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        Highest privileges
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                      <option>Content Management</option>
                      <option>Automation</option>
                      <option>User Support</option>
                      <option>Technical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Designation
                    </label>
                    <input
                      type="text"
                      defaultValue="Content Lead"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - PREFERENCES */}
            <div className="space-y-8">
              {/* QUICK ACTIONS */}
              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
                <div className="space-y-4">
                  <Link
                    href="/admin/profile/password"
                    className="flex items-center w-full p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                      <FiLock className="text-green-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Change Password</div>
                      <div className="text-sm text-gray-500">Update security credentials</div>
                    </div>
                  </Link>
                  <button className="flex items-center w-full p-4 border border-gray-200 rounded-lg hover:border-blue-300">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                      <FiMail className="text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Update Email</div>
                      <div className="text-sm text-gray-500">Request email change</div>
                    </div>
                  </button>
                  <button className="flex items-center w-full p-4 border border-gray-200 rounded-lg hover:border-blue-300">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-4">
                      <FiDownload className="text-purple-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Download My Data</div>
                      <div className="text-sm text-gray-500">Export personal data</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* PROFILE VISIBILITY */}
              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-xl font-bold mb-6">Profile Visibility</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Show online status</div>
                      <div className="text-sm text-gray-500">Other admins see when you're active</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Display last active</div>
                      <div className="text-sm text-gray-500">Show when you were last online</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* SAVE BUTTON */}
              <button className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl">
                Save All Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
