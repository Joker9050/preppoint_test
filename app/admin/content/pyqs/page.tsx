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
  FiCalendar,
  FiMenu,
  FiChevronDown,
  FiChevronUp,
  FiEdit,
  FiEye,
  FiTrash2,
  FiCopy,
  FiRefreshCw,
  FiSettings,
  FiMoreVertical,
  FiCheckSquare,
  FiSquare,
  FiArrowUp,
  FiArrowDown,
  FiX,
  FiFileText,
  FiImage,
  FiCode,
  FiClock,
  FiBarChart2,
  FiTag,
  FiZap,
  FiTrendingUp
} from 'react-icons/fi';

// Mock PYQ data structure
interface PYQPaper {
  id: string;
  exam: {
    name: string;
    category: string;
    level: string;
    logo: string;
  };
  paper: {
    year: number;
    type: string;
    shift: string;
    date: string;
    duration: string;
    marks: number;
  };
  content: {
    totalQuestions: number;
    subjects: string[];
    questionTypes: {
      mcq: number;
      matching: number;
      assertionReason: number;
    };
    hasAnswerKey: boolean;
    hasSolutions: boolean;
    hasExplanations: boolean;
  };
  stats: {
    views: number;
    downloads: number;
    avgScore: string;
    difficulty: string;
    completionRate: number;
  };
  metadata: {
    uploadedBy: string;
    uploadedDate: string;
    lastUpdated: string;
    source: string;
    language: string[];
    fileSize: string;
    format: string;
  };
  status: 'published' | 'draft' | 'processing' | 'archived';
}

// Generate mock PYQ data
const generateMockPYQs = (): PYQPaper[] => {
  const exams = [
    { name: 'UPSC Civil Services', category: 'Government', level: 'National' },
    { name: 'SSC CGL', category: 'Government', level: 'National' },
    { name: 'IBPS PO', category: 'Banking', level: 'National' },
    { name: 'GATE', category: 'Engineering', level: 'National' },
    { name: 'CAT', category: 'Management', level: 'National' },
    { name: 'MPSC', category: 'State', level: 'Maharashtra' },
    { name: 'UPPSC', category: 'State', level: 'Uttar Pradesh' }
  ];

  const papers: PYQPaper[] = [];

  for (let i = 1; i <= 1450; i++) {
    const exam = exams[i % exams.length];
    const year = 2024 - (i % 15);
    const paperTypes = ['Prelims', 'Mains', 'Interview', 'Combined'];
    const shifts = ['General Studies Paper 1', 'General Studies Paper 2', 'CSAT', 'Optional Subject'];

    papers.push({
      id: `PYQ-${exam.name.replace(/\s+/g, '')}-${year}-${String(i).padStart(4, '0')}`,
      exam: {
        name: exam.name,
        category: exam.category,
        level: exam.level,
        logo: `${exam.name.toLowerCase().replace(/\s+/g, '-')}-logo.png`
      },
      paper: {
        year,
        type: paperTypes[i % paperTypes.length],
        shift: shifts[i % shifts.length],
        date: `${year}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        duration: '2 hours',
        marks: 200
      },
      content: {
        totalQuestions: Math.floor(Math.random() * 100) + 50,
        subjects: ['History', 'Geography', 'Polity', 'Economy', 'Science', 'Mathematics'].slice(0, Math.floor(Math.random() * 4) + 2),
        questionTypes: {
          mcq: Math.floor(Math.random() * 80) + 20,
          matching: Math.floor(Math.random() * 10),
          assertionReason: Math.floor(Math.random() * 10)
        },
        hasAnswerKey: Math.random() > 0.2,
        hasSolutions: Math.random() > 0.3,
        hasExplanations: Math.random() > 0.4
      },
      stats: {
        views: Math.floor(Math.random() * 50000) + 1000,
        downloads: Math.floor(Math.random() * 15000) + 500,
        avgScore: `${Math.floor(Math.random() * 40) + 40}%`,
        difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
        completionRate: Math.floor(Math.random() * 40) + 60
      },
      metadata: {
        uploadedBy: `Admin${Math.floor(Math.random() * 5) + 1}`,
        uploadedDate: `${year}-01-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        lastUpdated: `${year}-01-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        source: 'Official Website',
        language: ['English', 'Hindi'],
        fileSize: `${(Math.random() * 4 + 1).toFixed(1)} MB`,
        format: 'PDF + Interactive'
      },
      status: ['published', 'draft', 'processing', 'archived'][Math.floor(Math.random() * 4)] as any
    });
  }

  return papers;
};

const mockPYQs = generateMockPYQs();

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

function ExamCategoryFilter({ selectedCategories, onChange }: {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}) {
  const categories = [
    { name: 'Government', children: ['SSC', 'Banking', 'UPSC', 'Railway', 'Defense'], count: 850 },
    { name: 'Engineering', children: ['GATE', 'ESE', 'SSC JE'], count: 320 },
    { name: 'State Level', children: ['MPSC', 'UPPSC', 'BPSC', 'WBPSC'], count: 670 },
    { name: 'Other', children: ['CAT', 'SAT', 'CLAT'], count: 110 }
  ];

  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <div key={category.name}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-sm">{category.name}</span>
            <span className="text-xs text-gray-500">{category.count}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {category.children.map((exam) => (
              <FilterChip
                key={exam}
                label={exam}
                selected={selectedCategories.includes(exam)}
                onClick={() => {
                  if (selectedCategories.includes(exam)) {
                    onChange(selectedCategories.filter(c => c !== exam));
                  } else {
                    onChange([...selectedCategories, exam]);
                  }
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function YearRangeSlider({ yearRange, onChange }: {
  yearRange: [number, number];
  onChange: (range: [number, number]) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-600">
        <span>2010</span>
        <span>2024</span>
      </div>
      <input
        type="range"
        min={2010}
        max={2024}
        value={yearRange[0]}
        onChange={(e) => onChange([parseInt(e.target.value), yearRange[1]])}
        className="w-full"
      />
      <input
        type="range"
        min={2010}
        max={2024}
        value={yearRange[1]}
        onChange={(e) => onChange([yearRange[0], parseInt(e.target.value)])}
        className="w-full"
      />
      <div className="flex justify-between text-sm">
        <span>{yearRange[0]}</span>
        <span>{yearRange[1]}</span>
      </div>
    </div>
  );
}

function StatusFilter({ selectedStatuses, onChange }: {
  selectedStatuses: string[];
  onChange: (statuses: string[]) => void;
}) {
  const statuses = [
    { label: 'Published', value: 'published', count: 1230, color: 'green' },
    { label: 'Draft', value: 'draft', count: 120, color: 'yellow' },
    { label: 'Processing', value: 'processing', count: 85, color: 'blue' },
    { label: 'Archived', value: 'archived', count: 15, color: 'gray' }
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
function PYQTableView({ papers, selected, onSelect, onSort, sortField, sortDirection }: {
  papers: PYQPaper[];
  selected: string[];
  onSelect: (ids: string[]) => void;
  onSort: (field: string) => void;
  sortField: string;
  sortDirection: 'asc' | 'desc';
}) {
  const handleSelectAll = () => {
    if (selected.length === papers.length) {
      onSelect([]);
    } else {
      onSelect(papers.map(p => p.id));
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
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-purple-100 text-purple-800';
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
                  {selected.length === papers.length && papers.length > 0 ? (
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
                  <span>Paper ID</span>
                  {sortField === 'id' && (
                    sortDirection === 'asc' ? <FiArrowUp className="w-3 h-3" /> : <FiArrowDown className="w-3 h-3" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Exam</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Year</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Questions</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Views</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {papers.map((paper) => (
              <tr key={paper.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleSelect(paper.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {selected.includes(paper.id) ? (
                      <FiCheckSquare className="w-4 h-4" />
                    ) : (
                      <FiSquare className="w-4 h-4" />
                    )}
                  </button>
                </td>
                <td className="px-4 py-3 text-sm font-mono text-gray-900">
                  {paper.id}
                </td>
                <td className="px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{paper.exam.name}</div>
                    <div className="text-xs text-gray-500">{paper.exam.category}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {paper.paper.year}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {paper.paper.type}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {paper.content.totalQuestions}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(paper.status)}`}>
                    {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {paper.stats.views.toLocaleString()}
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

function PYQCardView({ papers, selected, onSelect }: {
  papers: PYQPaper[];
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
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'archived': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {papers.map((paper) => (
        <div key={paper.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <button
              onClick={() => handleSelect(paper.id)}
              className="text-gray-400 hover:text-blue-600"
            >
              {selected.includes(paper.id) ? (
                <FiCheckSquare className="w-5 h-5" />
              ) : (
                <FiSquare className="w-5 h-5" />
              )}
            </button>
            <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(paper.status)}`}>
              {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
            </span>
          </div>

          <div className="mb-3">
            <h4 className="font-medium text-gray-900 mb-1">{paper.exam.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{paper.paper.year} - {paper.paper.type}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{paper.content.totalQuestions} questions</span>
              <span>{paper.stats.views.toLocaleString()} views</span>
            </div>
          </div>

          <div className="mb-3">
            <div className="text-sm text-gray-600 mb-1">Subjects:</div>
            <div className="flex flex-wrap gap-1">
              {paper.content.subjects.slice(0, 3).map((subject) => (
                <span key={subject} className="px-2 py-1 bg-gray-100 text-xs rounded">
                  {subject}
                </span>
              ))}
              {paper.content.subjects.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                  +{paper.content.subjects.length - 3}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {paper.content.hasAnswerKey && <FiFileText className="w-4 h-4 text-green-500" />}
              {paper.content.hasSolutions && <FiCode className="w-4 h-4 text-blue-500" />}
              {paper.content.hasExplanations && <FiTag className="w-4 h-4 text-purple-500" />}
              <span className="text-xs text-gray-500">{paper.metadata.fileSize}</span>
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

function PYQTimelineView({ papers }: { papers: PYQPaper[] }) {
  const papersByYear = papers.reduce((acc, paper) => {
    if (!acc[paper.paper.year]) {
      acc[paper.paper.year] = [];
    }
    acc[paper.paper.year].push(paper);
    return acc;
  }, {} as Record<number, PYQPaper[]>);

  const sortedYears = Object.keys(papersByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="space-y-8">
      {sortedYears.map((year) => (
        <div key={year} className="relative">
          <div className="flex items-center mb-4">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <h3 className="ml-4 text-lg font-semibold">{year}</h3>
            <span className="ml-2 text-sm text-gray-500">({papersByYear[parseInt(year)].length} papers)</span>
          </div>
          <div className="ml-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {papersByYear[parseInt(year)].map((paper) => (
              <div key={paper.id} className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium">{paper.exam.name}</span>
                  <span className={`px-1.5 py-0.5 text-xs rounded ${
                    paper.status === 'published' ? 'bg-green-100 text-green-800' :
                    paper.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                    paper.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {paper.status.charAt(0).toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{paper.paper.type} - {paper.content.totalQuestions} questions</p>
                <p className="text-xs text-gray-500 mt-1">{paper.stats.views.toLocaleString()} views</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Processing Queue Component
function ProcessingQueue() {
  const queueItems = [
    { status: 'Pending OCR', count: 15, color: 'yellow' },
    { status: 'Needs Review', count: 8, color: 'orange' },
    { status: 'Answer Key Pending', count: 12, color: 'blue' },
    { status: 'Ready for Publishing', count: 23, color: 'green' }
  ];

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <FiClock className="mr-2 text-yellow-600" />
          Processing Queue
        </h3>
        <button className="text-sm text-blue-600">Process All</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {queueItems.map((item) => (
          <div key={item.status} className="bg-white rounded-lg border p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className={`w-3 h-3 rounded-full mb-2 bg-${item.color}-500`}></div>
                <h4 className="font-medium">{item.status}</h4>
                <p className="text-2xl font-bold mt-2">{item.count}</p>
              </div>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Syllabus Coverage Component
function SyllabusCoverage() {
  const coverageData = [
    { topic: 'Ancient History', coverage: 95, papers: 45 },
    { topic: 'Medieval History', coverage: 88, papers: 38 },
    { topic: 'Modern History', coverage: 92, papers: 42 },
    { topic: 'Indian Polity', coverage: 98, papers: 40 }
  ];

  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold">Syllabus Coverage</h3>
          <p className="text-gray-600">Track topic coverage across exams</p>
        </div>
        <button className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg">
          View Detailed Report
        </button>
      </div>

      <div className="space-y-4">
        {coverageData.map((item) => (
          <div key={item.topic} className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">{item.topic}</span>
              <span className="text-sm text-gray-600">{item.coverage}% coverage</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${item.coverage}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-500">
              {item.papers} papers
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// AI Assistant Component
function AIAssistantPanel() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">AI-Powered PYQ Assistant</h3>
          <p className="text-gray-600">Enhance your PYQ collection with AI</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
          New
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="p-4 bg-white rounded-lg border border-gray-200 text-left hover:border-blue-300 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
            <FiSearch className="text-blue-600" />
          </div>
          <h4 className="font-medium">Find Gaps</h4>
          <p className="text-sm text-gray-500 mt-1">Identify missing years/papers</p>
        </button>

        <button className="p-4 bg-white rounded-lg border border-gray-200 text-left hover:border-blue-300 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-3">
            <FiTag className="text-green-600" />
          </div>
          <h4 className="font-medium">Auto-Categorize</h4>
          <p className="text-sm text-gray-500 mt-1">Tag questions by topic automatically</p>
        </button>

        <button className="p-4 bg-white rounded-lg border border-gray-200 text-left hover:border-blue-300 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
            <FiTrendingUp className="text-purple-600" />
          </div>
          <h4 className="font-medium">Trend Analysis</h4>
          <p className="text-sm text-gray-500 mt-1">Analyze question patterns</p>
        </button>

        <button className="p-4 bg-white rounded-lg border border-gray-200 text-left hover:border-blue-300 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-3">
            <FiPlus className="text-orange-600" />
          </div>
          <h4 className="font-medium">Generate Practice</h4>
          <p className="text-sm text-gray-500 mt-1">Create custom practice sets</p>
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
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
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

export default function PYQsManagementPage() {
  const [viewMode, setViewMode] = useState<'table' | 'card' | 'timeline'>('table');
  const [selectedPapers, setSelectedPapers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExamCategories, setSelectedExamCategories] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([2020, 2024]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPaperTypes, setSelectedPaperTypes] = useState<string[]>([]);
  const [selectedQuestionFormats, setSelectedQuestionFormats] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [sortField, setSortField] = useState<string>('paper.year');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter PYQs based on current filters
  const filteredPapers = useMemo(() => {
    return mockPYQs.filter((paper) => {
      // Search filter
      if (searchQuery && !paper.exam.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !paper.paper.type.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Exam category filter
      if (selectedExamCategories.length > 0 && !selectedExamCategories.includes(paper.exam.name)) {
        return false;
      }

      // Year range filter
      if (paper.paper.year < yearRange[0] || paper.paper.year > yearRange[1]) {
        return false;
      }

      // Status filter
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(paper.status)) {
        return false;
      }

      // Paper type filter
      if (selectedPaperTypes.length > 0 && !selectedPaperTypes.includes(paper.paper.type)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedExamCategories, yearRange, selectedStatuses, selectedPaperTypes]);

  // Sort filtered papers
  const sortedPapers = useMemo(() => {
    return [...filteredPapers].sort((a, b) => {
      let aVal: any, bVal: any;

      if (sortField === 'paper.year') {
        aVal = a.paper.year;
        bVal = b.paper.year;
      } else if (sortField === 'exam.name') {
        aVal = a.exam.name;
        bVal = b.exam.name;
      } else if (sortField === 'stats.views') {
        aVal = a.stats.views;
        bVal = b.stats.views;
      } else {
        aVal = a[sortField as keyof PYQPaper];
        bVal = b[sortField as keyof PYQPaper];
      }

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
  }, [filteredPapers, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedPapers.length / itemsPerPage);
  const paginatedPapers = sortedPapers.slice(
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
    setSelectedExamCategories([]);
    setYearRange([2020, 2024]);
    setSelectedStatuses([]);
    setSelectedPaperTypes([]);
    setSelectedQuestionFormats([]);
    setCurrentPage(1);
  };

  const publishedCount = mockPYQs.filter(p => p.status === 'published').length;
  const draftCount = mockPYQs.filter(p => p.status === 'draft').length;
  const processingCount = mockPYQs.filter(p => p.status === 'processing').length;
  const totalCount = mockPYQs.length;

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Previous Year Questions</h1>
          <p className="text-gray-600 mt-2">Manage question papers from past exams</p>
          <div className="flex flex-wrap gap-4 mt-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">1,450 papers</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">25+ exams</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm">45,620+ questions</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center">
            <FiUpload className="mr-2" />
            Upload PYQ
          </button>

          <div className="relative">
            <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center">
              <FiSettings className="mr-2" />
              Bulk Actions
            </button>
          </div>

          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center">
            <FiBarChart2 className="mr-2" />
            Analytics
          </button>
        </div>
      </div>

      {/* Exam Category Tabs */}
      <div className="bg-white rounded-xl border p-4">
        <div className="flex space-x-1 overflow-x-auto">
          {['All Exams', 'SSC', 'Banking', 'UPSC', 'Railway', 'Defense', 'State PSCs', 'Engineering'].map((exam) => (
            <button
              key={exam}
              onClick={() => {
                if (exam === 'All Exams') {
                  setSelectedExamCategories([]);
                } else {
                  setSelectedExamCategories([exam]);
                }
              }}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                (exam === 'All Exams' && selectedExamCategories.length === 0) ||
                selectedExamCategories.includes(exam)
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {exam}
              {exam !== 'All Exams' && (
                <span className="ml-2 text-xs opacity-80">
                  {exam === 'SSC' && '320'}
                  {exam === 'Banking' && '280'}
                  {exam === 'UPSC' && '180'}
                  {exam === 'Railway' && '95'}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Year Range Filter */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="font-semibold mb-4">Year Range</h3>
          <YearRangeSlider
            yearRange={yearRange}
            onChange={setYearRange}
          />
        </div>

        {/* Paper Type Filter */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="font-semibold mb-4">Paper Type</h3>
          <div className="space-y-2">
            {['Prelims', 'Mains', 'Interview', 'Combined', 'Shift-wise'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedPaperTypes.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPaperTypes([...selectedPaperTypes, type]);
                    } else {
                      setSelectedPaperTypes(selectedPaperTypes.filter(t => t !== type));
                    }
                  }}
                  className="mr-2 rounded"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="font-semibold mb-4">Status</h3>
          <StatusFilter
            selectedStatuses={selectedStatuses}
            onChange={setSelectedStatuses}
          />
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <h3 className="font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Questions per Paper</span>
                <span className="font-semibold">78</span>
              </div>
              <div className="h-2 bg-blue-100 rounded-full mt-1">
                <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Complete Years Coverage</span>
                <span className="font-semibold">85%</span>
              </div>
              <div className="h-2 bg-green-100 rounded-full mt-1">
                <div className="h-full w-[85%] bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">With Solutions</span>
                <span className="font-semibold">92%</span>
              </div>
              <div className="h-2 bg-purple-100 rounded-full mt-1">
                <div className="h-full w-[92%] bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Queue */}
      <ProcessingQueue />

      {/* PYQ Papers Grid */}
      <div className="bg-white rounded-xl border">
        {/* Toolbar */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 ${viewMode === 'table' ? 'bg-gray-100' : ''}`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode('card')}
                  className={`p-2 ${viewMode === 'card' ? 'bg-gray-100' : ''}`}
                >
                  <FiList />
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`p-2 ${viewMode === 'timeline' ? 'bg-gray-100' : ''}`}
                >
                  <FiCalendar />
                </button>
              </div>

              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search PYQ papers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <select className="border border-gray-300 rounded-lg px-3 py-2">
                <option>Sort by: Year (Newest)</option>
                <option>Sort by: Year (Oldest)</option>
                <option>Sort by: Most Viewed</option>
                <option>Sort by: Exam</option>
              </select>

              <button className="p-2 border border-gray-300 rounded-lg">
                <FiFilter />
              </button>
            </div>
          </div>
        </div>

        {/* Papers Content */}
        <div className="p-6">
          {viewMode === 'table' ? (
            <PYQTableView
              papers={paginatedPapers}
              selected={selectedPapers}
              onSelect={setSelectedPapers}
              onSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
            />
          ) : viewMode === 'card' ? (
            <PYQCardView
              papers={paginatedPapers}
              selected={selectedPapers}
              onSelect={setSelectedPapers}
            />
          ) : (
            <PYQTimelineView papers={paginatedPapers} />
          )}
        </div>

        {/* Pagination */}
        <div className="p-6 border-t">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Syllabus Coverage */}
      <SyllabusCoverage />

      {/* AI Assistant */}
      <AIAssistantPanel />
    </div>
  );
}
