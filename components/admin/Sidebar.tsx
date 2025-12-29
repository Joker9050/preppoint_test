'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiHome,
  FiBook,
  FiFileText,
  FiBriefcase,
  FiUsers,
  FiSettings,
  FiBarChart2,
  FiCpu,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { MdOutlineNotifications } from 'react-icons/md';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <FiHome />,
      path: '/admin',
      subItems: [
        { title: 'Overview', path: '/admin' },
        { title: 'Analytics', path: '/admin/analytics' },
      ]
    },
    {
      title: 'Content Management',
      icon: <FiBook />,
      subItems: [
        { title: 'Subjects', path: '/admin/content/subjects' },
        { title: 'MCQs', path: '/admin/content/mcqs', badge: '9,842' },
        { title: 'PYQs', path: '/admin/content/pyqs' },
        { title: 'Mock Tests', path: '/admin/content/mock-tests' },
        { title: 'Job Updates', path: '/admin/content/jobs', badge: '342' },
      ]
    },
    {
      title: 'Automation',
      icon: <FiCpu />,
      subItems: [
        { title: 'Scraper Logs', path: '/admin/automation/logs' },
        { title: 'Draft Queue', path: '/admin/automation/drafts', badge: '47' },
        { title: 'Change Detection', path: '/admin/automation/changes' },
      ]
    },
    {
      title: 'Users',
      icon: <FiUsers />,
      subItems: [
        { title: 'User List', path: '/admin/users', badge: '12,543' },
        { title: 'Roles & Permissions', path: '/admin/users/roles' },
      ]
    },
    {
      title: 'Settings',
      icon: <FiSettings />,
      subItems: [
        { title: 'General', path: '/admin/settings' },
        { title: 'SEO', path: '/admin/settings/seo' },
        { title: 'Integrations', path: '/admin/settings/integrations' },
        { title: 'Security', path: '/admin/settings/security' },
      ]
    }
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200
      transition-all duration-300 flex flex-col
      ${isOpen ? 'w-64' : 'w-20'}
    `}>
      {/* Logo */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <FiBook className="text-white text-xl" />
            </div>
            {isOpen && (
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-800">PrepPoint</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? (
              <FiChevronLeft className="text-gray-500" />
            ) : (
              <FiChevronRight className="text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-2">
            {isOpen && item.title && (
              <h3 className="px-4 text-xs uppercase font-semibold text-gray-400 mb-2">
                {item.title}
              </h3>
            )}
            {item.subItems?.map((subItem, subIndex) => {
              const isActive = pathname === subItem.path;
              return (
                <Link
                  key={subIndex}
                  href={subItem.path}
                  className={`
                    flex items-center px-4 py-3 text-sm transition-colors
                    ${isActive
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <span className={`${isOpen ? 'mr-3' : 'mx-auto'}`}>
                    {subIndex === 0 && React.cloneElement(item.icon, {
                      className: isActive ? 'text-blue-600' : 'text-gray-500'
                    })}
                  </span>
                  {isOpen && (
                    <>
                      <span className="flex-1">{subItem.title}</span>
                      {subItem.badge && (
                        <span className={`
                          px-2 py-1 text-xs rounded-full
                          ${isActive
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                          }
                        `}>
                          {subItem.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <FiUsers className="text-blue-600" />
          </div>
          {isOpen && (
            <>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <FiSettings />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
