'use client';

import { useState } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiChevronRight, FiChevronDown } from 'react-icons/fi';

interface Topic {
  id: string;
  title: string;
  subtopics: Subtopic[];
  status: 'Active' | 'Hidden';
  order: number;
}

interface Subtopic {
  id: string;
  title: string;
  status: 'Active' | 'Hidden';
  order: number;
}

export default function SubjectsManagement() {
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const [topics] = useState<Topic[]>([
    {
      id: '1',
      title: 'JavaScript',
      status: 'Active',
      order: 1,
      subtopics: [
        { id: '1-1', title: 'Basics', status: 'Active', order: 1 },
        { id: '1-2', title: 'Functions', status: 'Active', order: 2 },
        { id: '1-3', title: 'Objects', status: 'Active', order: 3 },
      ]
    },
    {
      id: '2',
      title: 'Python',
      status: 'Active',
      order: 2,
      subtopics: [
        { id: '2-1', title: 'Data Types', status: 'Active', order: 1 },
        { id: '2-2', title: 'Control Flow', status: 'Active', order: 2 },
      ]
    }
  ]);

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subjects & Topics Management</h1>
          <p className="text-gray-600 mt-2">Organize your content hierarchy</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <FiPlus className="mr-2" />
          Add Subject
        </button>
      </div>

      {/* Tree View */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Content Hierarchy</h2>
          <p className="text-gray-600 mt-1">Drag and drop to reorder, click to expand/collapse</p>
        </div>

        <div className="p-6">
          <div className="space-y-2">
            {topics.map((topic) => (
              <div key={topic.id} className="border border-gray-200 rounded-lg">
                {/* Topic Row */}
                <div
                  className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleTopic(topic.id)}
                >
                  <div className="flex items-center space-x-3">
                    {expandedTopics.has(topic.id) ? (
                      <FiChevronDown className="text-gray-500" />
                    ) : (
                      <FiChevronRight className="text-gray-500" />
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900">{topic.title}</h3>
                      <p className="text-sm text-gray-500">
                        {topic.subtopics.length} subtopics • Order: {topic.order}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      topic.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {topic.status}
                    </span>

                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600">
                        <FiEdit size={16} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtopics */}
                {expandedTopics.has(topic.id) && (
                  <div className="border-t border-gray-100">
                    {topic.subtopics.map((subtopic) => (
                      <div
                        key={subtopic.id}
                        className="flex items-center justify-between p-4 pl-12 bg-gray-50 hover:bg-gray-100"
                      >
                        <div>
                          <h4 className="font-medium text-gray-800">{subtopic.title}</h4>
                          <p className="text-sm text-gray-500">Order: {subtopic.order}</p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 text-xs rounded-full ${
                            subtopic.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {subtopic.status}
                          </span>

                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-600 hover:text-blue-600">
                              <FiEdit size={16} />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-red-600">
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add Subtopic Button */}
                    <div className="p-4 pl-12 border-t border-gray-100">
                      <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                        <FiPlus size={16} />
                        <span>Add Subtopic</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Subjects</p>
              <p className="text-2xl font-bold text-gray-900">{topics.length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold">S</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Topics</p>
              <p className="text-2xl font-bold text-gray-900">
                {topics.reduce((acc, topic) => acc + topic.subtopics.length, 0)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <span className="text-green-600 font-bold">T</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Items</p>
              <p className="text-2xl font-bold text-gray-900">
                {topics.filter(t => t.status === 'Active').length +
                 topics.reduce((acc, topic) => acc + topic.subtopics.filter(st => st.status === 'Active').length, 0)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 font-bold">A</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
