'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  FiPlus,
  FiDownload,
  FiUpload,
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
  FiMenu,
  FiChevronDown,
  FiChevronUp,
  FiEdit,
  FiEye,
  FiTrash2,
  FiCopy,
  FiRefreshCw,
  FiCheckCircle,
  FiTag,
  FiZap,
  FiSettings,
  FiMoreVertical,
  FiCheckSquare,
  FiSquare,
  FiArrowUp,
  FiArrowDown,
  FiX,
  FiFileText,
  FiImage,
  FiCode
} from 'react-icons/fi';
import { mcqs, MCQ } from '@/data/mcqs';
import { topics } from '@/data/topics';

// Extended MCQ type for admin management
interface AdminMCQ extends MCQ {
  status: 'published' | 'draft' | 'under_review' | 'archived';
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  type: 'text_only' | 'image_based' | 'code_snippet' | 'multiple_correct' | 'true_false';
  language: 'english' | 'hindi';
  marks: number;
  tags: string[];
  attempts: number;
  accuracy: number;
  avgTime: string;
  lastUsed: string;
  createdBy: string;
  createdAt: string;
  lastModified: string;
  version: number;
  hasImage: boolean;
  hasCode: boolean;
  hasExplanation: boolean;
}

// Mock data with admin fields - expanded to simulate 10,000+ MCQs
const generateMockAdminMCQs = (): AdminMCQ[] => {
  const mockData: AdminMCQ[] = [];

  // Generate more comprehensive mock data with deterministic values
  for (let i = 1; i <= 9842; i++) {
    const baseMCQ = mcqs[i % mcqs.length];
    const statusOptions: ('published' | 'draft' | 'under_review' | 'archived')[] =
      ['published', 'draft', 'under_review', 'archived'];
    const difficultyOptions: ('easy' | 'medium' | 'hard' | 'mixed')[] =
      ['easy', 'medium', 'hard', 'mixed'];
    const typeOptions: ('text_only' | 'image_based' | 'code_snippet' | 'multiple_correct' | 'true_false')[] =
      ['text_only', 'image_based', 'code_snippet', 'multiple_correct', 'true_false'];

    // Use deterministic calculations based on index to avoid hydration mismatches
    const seed = i * 31; // Simple seed multiplier
    const attempts = Math.floor((seed % 1900) + 100); // Deterministic range 100-2000
    const accuracy = Math.floor((seed % 40) + 60); // Deterministic range 60-100
    const avgTime = `${Math.floor((seed % 60) + 30)}s`; // Deterministic range 30-90s
    const daysAgo = Math.floor(seed % 30) + 1;
    const lastUsed = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const createdDaysAgo = Math.floor(seed % 365) + 1;
    const createdAt = new Date(Date.now() - createdDaysAgo * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const modifiedDaysAgo = Math.floor(seed % 30) + 1;
    const lastModified = new Date(Date.now() - modifiedDaysAgo * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const version = Math.floor(seed % 3) + 1;

    mockData.push({
      ...baseMCQ,
      id: i,
      status: statusOptions[i % 4],
      difficulty: difficultyOptions[i % 4],
      type: typeOptions[i % 5],
      language: 'english',
      marks: 1,
      tags: [
        ['javascript', 'variables', 'programming'][i % 3],
        ['algorithms', 'data-structures', 'logic'][i % 3],
        ['frontend', 'backend', 'fullstack'][i % 3]
      ].slice(0, Math.floor(seed % 3) + 1),
      attempts: attempts,
      accuracy: accuracy,
      avgTime: avgTime,
      lastUsed: lastUsed,
      createdBy: `Admin${(i % 5) + 1}`,
      createdAt: createdAt,
      lastModified: lastModified,
      version: version,
      hasImage: i % 7 === 0,
      hasCode: i % 5 === 0,
      hasExplanation: true
    });
  }

  return mockData;
};

const mockAdminMCQs = generateMockAdminMCQs();

// Filter components
function FilterChip({ label, count, selected, onClick, color = 'blue' }: {
  label: string;
  count?: number;
  selected: boolean;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm border transition-colors ${
        selected
          ? `bg-${color}-100 border-${color}-300 text-${color}-800`
          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
      }`}
    >
      {label}
      {count !== undefined && (
        <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
          selected ? `bg-${color}-200` : 'bg-gray-100'
        }`}>
          {count}
        </span>
      )}
    </button>
  );
}

function SubjectTreeSelect({ selectedSubjects, onChange }: {
  selectedSubjects: string[];
  onChange: (subjects: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left flex items-center justify-between"
      >
        <span className="text-sm">
          {selectedSubjects.length > 0
            ? `${selectedSubjects.length} selected`
            : 'Select subjects...'
          }
        </span>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {topics.map((topic) => (
            <div key={topic.id} className="p-2 hover:bg-gray-50">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSubjects.includes(topic.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onChange([...selectedSubjects, topic.id]);
                    } else {
                      onChange(selectedSubjects.filter(s => s !== topic.id));
                    }
                  }}
                  className="rounded"
                />
                <span className="text-sm">{topic.title}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusFilter({ selectedStatuses, onChange }: {
  selectedStatuses: string[];
  onChange: (statuses: string[]) => void;
}) {
  const statuses = [
    { label: 'Published', value: 'published', count: 7423, color: 'green' },
    { label: 'Draft', value: 'draft', count: 1245, color: 'gray' },
    { label: 'Under Review', value: 'under_review', count: 450, color: 'yellow' },
    { label: 'Archived', value: 'archived', count: 1174, color: 'purple' }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <FilterChip
          key={status.value}
          label={status.label}
          count={status.count}
          selected={selectedStatuses.includes(status.value)}
          onClick={() => {
            if (selectedStatuses.includes(status.value)) {
              onChange(selectedStatuses.filter(s => s !== status.value));
            } else {
              onChange([...selectedStatuses, status.value]);
            }
          }}
          color={status.color}
        />
      ))}
    </div>
  );
}

// View components
function MCQTableView({ mcqs, selected, onSelect, onSort, sortField, sortDirection }: {
  mcqs: AdminMCQ[];
  selected: string[];
  onSelect: (ids: string[]) => void;
  onSort: (field: string) => void;
  sortField: string;
  sortDirection: 'asc' | 'desc';
}) {
  const handleSelectAll = () => {
    if (selected.length === mcqs.length) {
      onSelect([]);
    } else {
      onSelect(mcqs.map(mcq => mcq.id.toString()));
    }
  };

  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      onSelect(selected.filter(s => s !== id));
    } else {
      onSelect([...selected, id]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      case 'mixed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={handleSelectAll}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {selected.length === mcqs.length && mcqs.length > 0 ? (
                    <FiCheckSquare className="w-4 h-4" />
                  ) : (
                    <FiSquare className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('id')}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  <span>ID</span>
                  {sortField === 'id' && (
                    sortDirection === 'asc' ? <FiArrowUp className="w-3 h-3" /> : <FiArrowDown className="w-3 h-3" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('question')}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  <span>Question</span>
                  {sortField === 'question' && (
                    sortDirection === 'asc' ? <FiArrowUp className="w-3 h-3" /> : <FiArrowDown className="w-3 h-3" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Subject</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Difficulty</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Attempts</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Accuracy</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mcqs.map((mcq) => (
              <tr key={mcq.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleSelect(mcq.id.toString())}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {selected.includes(mcq.id.toString()) ? (
                      <FiCheckSquare className="w-4 h-4" />
                    ) : (
                      <FiSquare className="w-4 h-4" />
                    )}
                  </button>
                </td>
                <td className="px-4 py-3 text-sm font-mono text-gray-900">
                  MCQ-{mcq.id.toString().padStart(4, '0')}
                </td>
                <td className="px-4 py-3">
                  <div className="max-w-xs">
                    <p className="text-sm text-gray-900 truncate">
                      {mcq.question}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      {mcq.hasCode && <FiCode className="w-3 h-3 text-blue-500" />}
                      {mcq.hasImage && <FiImage className="w-3 h-3 text-green-500" />}
                      {mcq.hasExplanation && <FiFileText className="w-3 h-3 text-purple-500" />}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {topics.find(t => t.id === mcq.topicId)?.title || 'Unknown'}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(mcq.difficulty)}`}>
                    {mcq.difficulty.charAt(0).toUpperCase() + mcq.difficulty.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(mcq.status)}`}>
                    {mcq.status.replace('_', ' ').charAt(0).toUpperCase() + mcq.status.replace('_', ' ').slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {mcq.attempts.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {mcq.accuracy}%
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-blue-600" title="Preview">
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600" title="Edit">
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-purple-600" title="Duplicate">
                      <FiCopy className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600" title="Delete">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MCQCardView({ mcqs, selected, onSelect }: {
  mcqs: AdminMCQ[];
  selected: string[];
  onSelect: (ids: string[]) => void;
}) {
  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      onSelect(selected.filter(s => s !== id));
    } else {
      onSelect([...selected, id]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'under_review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      case 'mixed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mcqs.map((mcq) => (
        <div key={mcq.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <button
              onClick={() => handleSelect(mcq.id.toString())}
              className="text-gray-400 hover:text-blue-600"
            >
              {selected.includes(mcq.id.toString()) ? (
                <FiCheckSquare className="w-5 h-5" />
              ) : (
                <FiSquare className="w-5 h-5" />
              )}
            </button>
            <div className="flex space-x-2">
              <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(mcq.difficulty)}`}>
                {mcq.difficulty.charAt(0).toUpperCase() + mcq.difficulty.slice(1)}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(mcq.status)}`}>
                {mcq.status.replace('_', ' ').charAt(0).toUpperCase() + mcq.status.replace('_', ' ').slice(1)}
              </span>
            </div>
          </div>

          <div className="mb-3">
            <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
              {mcq.question}
            </h4>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>ID: MCQ-{mcq.id.toString().padStart(4, '0')}</span>
              <span>{mcq.attempts} attempts</span>
              <span>{mcq.accuracy}% accuracy</span>
            </div>
          </div>

          <div className="mb-3">
            <div className="text-sm text-gray-600 mb-1">Options:</div>
            <div className="space-y-1">
              {Object.entries(mcq.options).map(([key, value]) => (
                <div key={key} className={`text-xs p-1 rounded ${
                  key === mcq.correct ? 'bg-green-50 text-green-800' : 'text-gray-600'
                }`}>
                  {key}. {value}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {mcq.hasCode && <FiCode className="w-4 h-4 text-blue-500" />}
              {mcq.hasImage && <FiImage className="w-4 h-4 text-green-500" />}
              {mcq.hasExplanation && <FiFileText className="w-4 h-4 text-purple-500" />}
              <span className="text-xs text-gray-500">
                {topics.find(t => t.id === mcq.topicId)?.title || 'Unknown'}
              </span>
            </div>
            <div className="flex space-x-1">
              <button className="p-1 text-gray-400 hover:text-blue-600" title="Preview">
                <FiEye className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-green-600" title="Edit">
                <FiEdit className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-red-600" title="Delete">
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MCQCompactView({ mcqs, selected, onSelect }: {
  mcqs: AdminMCQ[];
  selected: string[];
  onSelect: (ids: string[]) => void;
}) {
  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      onSelect(selected.filter(s => s !== id));
    } else {
      onSelect([...selected, id]);
    }
  };

  return (
    <div className="space-y-2">
      {mcqs.map((mcq) => (
        <div key={mcq.id} className="bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleSelect(mcq.id.toString())}
              className="text-gray-400 hover:text-blue-600"
            >
              {selected.includes(mcq.id.toString()) ? (
                <FiCheckSquare className="w-4 h-4" />
              ) : (
                <FiSquare className="w-4 h-4" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-mono text-gray-600">
                  MCQ-{mcq.id.toString().padStart(4, '0')}
                </span>
                <span className={`px-1.5 py-0.5 text-xs rounded ${
                  mcq.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  mcq.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  mcq.difficulty === 'hard' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {mcq.difficulty.charAt(0).toUpperCase()}
                </span>
                <span className={`px-1.5 py-0.5 text-xs rounded ${
                  mcq.status === 'published' ? 'bg-green-100 text-green-800' :
                  mcq.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                  mcq.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {mcq.status === 'published' ? 'P' :
                   mcq.status === 'draft' ? 'D' :
                   mcq.status === 'under_review' ? 'R' : 'A'}
                </span>
              </div>
              <p className="text-sm text-gray-900 truncate">{mcq.question}</p>
            </div>

            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>{mcq.attempts} att.</span>
              <span>{mcq.accuracy}% acc.</span>
              <span>{topics.find(t => t.id === mcq.topicId)?.title || 'Unknown'}</span>
            </div>

            <div className="flex space-x-1">
              <button className="p-1 text-gray-400 hover:text-blue-600" title="Preview">
                <FiEye className="w-3 h-3" />
              </button>
              <button className="p-1 text-gray-400 hover:text-green-600" title="Edit">
                <FiEdit className="w-3 h-3" />
              </button>
              <button className="p-1 text-gray-400 hover:text-red-600" title="Delete">
                <FiTrash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// AI Assistant Panel Component
function AIAssistantPanel() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
          <p className="text-gray-600">Enhance your MCQ management with AI</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
          Beta
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-4 bg-white rounded-lg border border-gray-200 text-left hover:border-blue-300 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
            <FiCheckCircle className="text-blue-600" />
          </div>
          <h4 className="font-medium">Quality Check</h4>
          <p className="text-sm text-gray-500 mt-1">Validate 100+ MCQs for errors</p>
        </button>

        <button className="p-4 bg-white rounded-lg border border-gray-200 text-left hover:border-blue-300 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-3">
            <FiTag className="text-green-600" />
          </div>
          <h4 className="font-medium">Auto-Tagging</h4>
          <p className="text-sm text-gray-500 mt-1">Tag 500+ untagged questions</p>
        </button>

        <button className="p-4 bg-white rounded-lg border border-gray-200 text-left hover:border-blue-300 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
            <FiPlus className="text-purple-600" />
          </div>
          <h4 className="font-medium">Generate MCQs</h4>
          <p className="text-sm text-gray-500 mt-1">Create new MCQs from topics</p>
        </button>
      </div>
    </div>
  );
}

// Pagination Component
function Pagination({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const getVisiblePages = () => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (let i: number = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex justify-between items-center">
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Previous
        </button>

        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`px-3 py-2 border rounded-lg ${
              page === currentPage
                ? 'bg-blue-600 text-white border-blue-600'
                : page === '...'
                ? 'border-gray-300 cursor-default'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function MCQManagementPage() {
  const [viewMode, setViewMode] = useState<'table' | 'card' | 'compact'>('table');
  const [selectedMCQs, setSelectedMCQs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [sortField, setSortField] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter MCQs based on current filters
  const filteredMCQs = useMemo(() => {
    return mockAdminMCQs.filter((mcq) => {
      // Search filter
      if (searchQuery && !mcq.question.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Subject filter
      if (selectedSubjects.length > 0 && !selectedSubjects.includes(mcq.topicId)) {
        return false;
      }

      // Status filter
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(mcq.status)) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulties.length > 0 && !selectedDifficulties.includes(mcq.difficulty)) {
        return false;
      }

      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(mcq.type)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedSubjects, selectedStatuses, selectedDifficulties, selectedTypes]);

  // Sort filtered MCQs
  const sortedMCQs = useMemo(() => {
    return [...filteredMCQs].sort((a, b) => {
      let aVal = a[sortField as keyof AdminMCQ];
      let bVal = b[sortField as keyof AdminMCQ];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });
  }, [filteredMCQs, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedMCQs.length / itemsPerPage);
  const paginatedMCQs = sortedMCQs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedSubjects([]);
    setSelectedStatuses([]);
    setSelectedDifficulties([]);
    setSelectedTypes([]);
    setCurrentPage(1);
  };

  const publishedCount = mockAdminMCQs.filter(mcq => mcq.status === 'published').length;
  const draftCount = mockAdminMCQs.filter(mcq => mcq.status === 'draft').length;
  const totalCount = mockAdminMCQs.length;

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">MCQ Management</h1>
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Published: {publishedCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Draft: {draftCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Total: {totalCount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/admin/content/mcqs/create">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition-colors">
              <FiPlus className="mr-2" />
              Add New MCQ
            </button>
          </Link>

          <div className="relative">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center transition-colors">
              <FiDownload className="mr-2" />
              Import/Export
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filter Panel */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear All Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Hierarchy
            </label>
            <SubjectTreeSelect
              selectedSubjects={selectedSubjects}
              onChange={setSelectedSubjects}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Easy', value: 'easy', count: 3450, color: 'green' },
                { label: 'Medium', value: 'medium', count: 4230, color: 'yellow' },
                { label: 'Hard', value: 'hard', count: 1562, color: 'red' },
                { label: 'Mixed', value: 'mixed', count: 600, color: 'blue' }
              ].map((level) => (
                <FilterChip
                  key={level.value}
                  label={level.label}
                  count={level.count}
                  selected={selectedDifficulties.includes(level.value)}
                  onClick={() => {
                    if (selectedDifficulties.includes(level.value)) {
                      setSelectedDifficulties(selectedDifficulties.filter(d => d !== level.value));
                    } else {
                      setSelectedDifficulties([...selectedDifficulties, level.value]);
                    }
                  }}
                  color={level.color}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <StatusFilter
              selectedStatuses={selectedStatuses}
              onChange={setSelectedStatuses}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="mt-6">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="text-sm text-gray-600 flex items-center hover:text-gray-800"
          >
            {showAdvancedFilters ? <FiChevronUp className="mr-2" /> : <FiChevronDown className="mr-2" />}
            {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Type
                </label>
                <div className="space-y-2">
                  {[
                    { label: 'Text Only', value: 'text_only', count: 6123 },
                    { label: 'Image Based', value: 'image_based', count: 2145 },
                    { label: 'Code Snippet', value: 'code_snippet', count: 987 },
                    { label: 'Multiple Correct', value: 'multiple_correct', count: 456 },
                    { label: 'True/False', value: 'true_false', count: 231 }
                  ].map((type) => (
                    <label key={type.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTypes([...selectedTypes, type.value]);
                          } else {
                            setSelectedTypes(selectedTypes.filter(t => t !== type.value));
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{type.label}</span>
                      <span className="text-xs text-gray-500">({type.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">English</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Hindi</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Filters
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Has Explanation</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Has Image</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Has Code Block</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions Bar */}
      {selectedMCQs.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="font-medium">
                {selectedMCQs.length} MCQ{selectedMCQs.length !== 1 ? 's' : ''} selected
              </span>
              <button
                onClick={() => setSelectedMCQs([])}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear selection
              </button>
            </div>

            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50">
                Change Status
              </button>

              <button className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50">
                Bulk Edit
              </button>

              <button className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50">
                Export Selected
              </button>

              <button className="px-3 py-1 bg-red-50 border border-red-200 text-red-700 rounded text-sm hover:bg-red-100">
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Controls & Results */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-2 ${viewMode === 'table' ? 'bg-gray-100' : ''} hover:bg-gray-50`}
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`px-3 py-2 ${viewMode === 'card' ? 'bg-gray-100' : ''} hover:bg-gray-50`}
            >
              <FiList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`px-3 py-2 ${viewMode === 'compact' ? 'bg-gray-100' : ''} hover:bg-gray-50`}
            >
              <FiMenu className="w-4 h-4" />
            </button>
          </div>

          <span className="text-gray-600">
            Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredMCQs.length)} of {filteredMCQs.length.toLocaleString()} MCQs
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
            <option value={200}>200 per page</option>
          </select>

          <button
            onClick={() => {
              // Refresh logic would go here
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FiRefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'table' ? (
        <MCQTableView
          mcqs={paginatedMCQs}
          selected={selectedMCQs}
          onSelect={setSelectedMCQs}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
        />
      ) : viewMode === 'card' ? (
        <MCQCardView
          mcqs={paginatedMCQs}
          selected={selectedMCQs}
          onSelect={setSelectedMCQs}
        />
      ) : (
        <MCQCompactView
          mcqs={paginatedMCQs}
          selected={selectedMCQs}
          onSelect={setSelectedMCQs}
        />
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* AI Assistant Panel */}
      <AIAssistantPanel />
    </div>
  );
}
