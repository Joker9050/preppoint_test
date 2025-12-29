'use client';

import { useState } from 'react';
import { FiEdit, FiTrash2, FiEye, FiPlus, FiFilter } from 'react-icons/fi';

interface Job {
  id: string;
  title: string;
  organization: string;
  type: 'Government' | 'Private' | 'IT';
  status: 'Active' | 'Expired' | 'Draft';
  lastUpdated: string;
  applications?: number;
  views?: number;
}

export default function JobsManagement() {
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    status: '',
  });

  const [jobs] = useState<Job[]>([
    {
      id: '1',
      title: 'SSC CGL 2024 - Combined Graduate Level Exam',
      organization: 'Staff Selection Commission',
      type: 'Government',
      status: 'Active',
      lastUpdated: '2024-01-15',
      applications: 15420,
      views: 45230
    },
    {
      id: '2',
      title: 'Software Engineer - React Developer',
      organization: 'TechCorp Solutions',
      type: 'IT',
      status: 'Active',
      lastUpdated: '2024-01-14',
      applications: 89,
      views: 1250
    },
    {
      id: '3',
      title: 'Bank PO Recruitment 2024',
      organization: 'State Bank of India',
      type: 'Government',
      status: 'Expired',
      lastUpdated: '2024-01-10',
      applications: 25600,
      views: 67890
    }
  ]);

  const statusColors = {
    Active: 'bg-green-100 text-green-800',
    Expired: 'bg-red-100 text-red-800',
    Draft: 'bg-yellow-100 text-yellow-800',
  };

  const typeColors = {
    Government: 'bg-blue-100 text-blue-800',
    Private: 'bg-purple-100 text-purple-800',
    IT: 'bg-indigo-100 text-indigo-800',
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Updates Management</h1>
          <p className="text-gray-600 mt-2">Manage government and private job notifications</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <FiPlus className="mr-2" />
          Add Job Update
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
          <button className="text-sm text-gray-500 hover:text-gray-700">Clear All</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Types</option>
              <option value="government">Government</option>
              <option value="private">Private</option>
              <option value="it">IT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
            <input
              type="text"
              placeholder="Search organizations..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Job Updates</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{jobs.length} jobs found</span>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                <FiFilter className="mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                        {job.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        Updated {job.lastUpdated}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{job.organization}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${typeColors[job.type]}`}>
                      {job.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[job.status]}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div>{job.views?.toLocaleString()} views</div>
                      <div className="text-gray-500">{job.applications?.toLocaleString()} applications</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FiEye size={18} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FiEdit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{' '}
              <span className="font-medium">3</span> results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white border border-blue-600 rounded-md text-sm">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
