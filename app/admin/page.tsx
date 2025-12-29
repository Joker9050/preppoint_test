'use client';

import { useState } from 'react';
import KpiCards from '@/components/admin/KpiCards';
import QuickActions from '@/components/admin/QuickActions';
import ChartsSection from '@/components/admin/ChartsSection';
import RecentActivity from '@/components/admin/RecentActivity';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Monitor your platform performance and manage content efficiently</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <KpiCards />

      {/* Quick Actions */}
      <QuickActions />

      {/* Charts Section */}
      <ChartsSection timeRange={timeRange} />

      {/* Recent Activity & Draft Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />

        {/* Draft Queue */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Draft Queue</h3>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
              47 pending review
            </span>
          </div>

          <div className="space-y-4">
            {[
              { type: 'MCQ', count: 28, source: 'Auto-scraped' },
              { type: 'Job Update', count: 12, source: 'Manual Entry' },
              { type: 'PYQ', count: 7, source: 'Auto-scraped' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.type}</p>
                  <p className="text-sm text-gray-500">{item.source}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{item.count} items</p>
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                    Review →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors">
            + Add New Content Manually
          </button>
        </div>
      </div>

      {/* Future AI Features Placeholder */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI-Powered Features (Coming Soon)</h3>
            <p className="text-gray-600 mt-2">Enhance your content creation with AI assistance</p>
          </div>
          <span className="px-4 py-2 bg-blue-600 text-white text-sm rounded-full">
            Beta
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
              <span className="text-blue-600 font-bold">AI</span>
            </div>
            <h4 className="font-medium text-gray-900">MCQ Generator</h4>
            <p className="text-sm text-gray-500 mt-1">Generate MCQs from topics automatically</p>
          </div>

          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-3">
              <span className="text-green-600 font-bold">AI</span>
            </div>
            <h4 className="font-medium text-gray-900">Job Summarizer</h4>
            <p className="text-sm text-gray-500 mt-1">Automatically summarize job notifications</p>
          </div>

          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
              <span className="text-purple-600 font-bold">AI</span>
            </div>
            <h4 className="font-medium text-gray-900">Content Analyzer</h4>
            <p className="text-sm text-gray-500 mt-1">Analyze content quality and relevance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
