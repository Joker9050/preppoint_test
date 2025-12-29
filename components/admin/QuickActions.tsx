'use client';

import { FiEdit, FiBriefcase, FiFileText, FiPlay } from 'react-icons/fi';

export default function QuickActions() {
  const actions = [
    {
      title: 'Add MCQ',
      description: 'Create a new multiple choice question',
      icon: <FiEdit className="text-blue-600" />,
      color: 'bg-blue-50 border-blue-200',
      action: () => console.log('Add MCQ')
    },
    {
      title: 'Add Job Update',
      description: 'Post a new job notification',
      icon: <FiBriefcase className="text-green-600" />,
      color: 'bg-green-50 border-green-200',
      action: () => console.log('Add Job')
    },
    {
      title: 'Review Drafts',
      description: 'Check auto-scraped content',
      icon: <FiFileText className="text-yellow-600" />,
      color: 'bg-yellow-50 border-yellow-200',
      action: () => console.log('Review Drafts')
    },
    {
      title: 'Create Mock Test',
      description: 'Generate a practice test',
      icon: <FiPlay className="text-purple-600" />,
      color: 'bg-purple-50 border-purple-200',
      action: () => console.log('Create Mock Test')
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        <span className="text-sm text-gray-500">Frequently used</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`p-4 rounded-lg border-2 ${action.color} hover:shadow-md transition-all duration-200 text-left group`}
          >
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              {action.icon}
            </div>
            <h3 className="font-medium text-gray-900 mb-1">{action.title}</h3>
            <p className="text-sm text-gray-600">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
