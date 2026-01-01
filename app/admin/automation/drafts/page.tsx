'use client';

import { useState } from 'react';
import { FiClock, FiAlertTriangle, FiCheckSquare, FiGrid, FiList, FiSearch, FiFilter, FiRefreshCw, FiEye, FiCheck, FiX, FiDownload, FiEdit, FiInfo, FiTrendingUp, FiCalendar } from 'react-icons/fi';

export default function AutomationDraftsPage() {
  const [selectedDrafts, setSelectedDrafts] = useState<string[]>([]);
  const [activeDraft, setActiveDraft] = useState<any>(null);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table');
  const [bulkAction, setBulkAction] = useState<string | null>(null);

  const draftQueue = {
    total: 47,
    critical: 28,
    waitingTime: "12 minutes",
    todayPublished: 24
  };

  const draftTypes = [
    { type: 'Job Notification', count: 28, icon: '💼', color: 'blue' },
    { type: 'Result Update', count: 12, icon: '📊', color: 'green' },
    { type: 'Admit Card', count: 5, icon: '🎫', color: 'purple' },
    { type: 'Exam Date', count: 2, icon: '📅', color: 'orange' }
  ];

  const draftList = [
    {
      id: 'DRAFT-001',
      title: 'SSC CGL 2024 Notification Released',
      type: 'Job Notification',
      source: 'ssc.nic.in',
      detected: '14:30',
      status: 'New',
      priority: 'critical',
      waitTime: '18 min',
      changes: ['+2,500 vacancies', 'Extended dates']
    },
    // Add more drafts as needed
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* WAR ROOM HEADER */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-600 flex items-center justify-center">
                <FiClock className="text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">DRAFT REVIEW CONTROL ROOM</h1>
                <p className="text-blue-200 mt-2">Automation meets human judgment. Every piece gets your approval.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-blue-800/50 rounded-lg px-4 py-3">
                <div className="text-sm text-blue-300">Drafts Waiting</div>
                <div className="text-2xl font-bold">{draftQueue.total}</div>
              </div>
              <div className="bg-red-800/50 rounded-lg px-4 py-3">
                <div className="text-sm text-red-300">Critical Priority</div>
                <div className="text-2xl font-bold">{draftQueue.critical}</div>
              </div>
              <div className="bg-green-800/50 rounded-lg px-4 py-3">
                <div className="text-sm text-green-300">Avg. Review Time</div>
                <div className="text-2xl font-bold">{draftQueue.waitingTime}</div>
              </div>
              <div className="bg-purple-800/50 rounded-lg px-4 py-3">
                <div className="text-sm text-purple-300">Today Published</div>
                <div className="text-2xl font-bold">{draftQueue.todayPublished}</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-5xl font-bold">94%</div>
                <div className="text-sm text-blue-300">Auto-Accuracy</div>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-48 h-3 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-green-600" style={{ width: '94%' }}></div>
                  </div>
                  <span className="ml-3 text-green-400">↑ 3% this week</span>
                </div>
                <button className="w-full mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg">
                  <FiAlertTriangle className="inline mr-2" />
                  EMERGENCY REVIEW NEEDED
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DRAFT TYPE FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {draftTypes.map((item) => (
          <button
            key={item.type}
            onClick={() => setFilter(item.type.toLowerCase())}
            className={`p-4 rounded-xl border-2 transition-all ${
              filter === item.type.toLowerCase()
                ? item.color === 'blue' ? 'border-blue-500 bg-blue-50' :
                  item.color === 'green' ? 'border-green-500 bg-green-50' :
                  item.color === 'purple' ? 'border-purple-500 bg-purple-50' :
                  'border-orange-500 bg-orange-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-semibold">{item.type}</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{item.count}</div>
                <div className="text-sm text-gray-500">waiting</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* BULK ACTION BAR */}
      {selectedDrafts.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center space-x-4">
              <FiCheckSquare className="text-2xl text-yellow-700" />
              <div>
                <h3 className="font-bold text-yellow-800">{selectedDrafts.length} drafts selected</h3>
                <p className="text-yellow-700 text-sm">Choose action for all selected</p>
              </div>
              <button
                onClick={() => setSelectedDrafts([])}
                className="text-sm text-yellow-700 hover:text-yellow-900"
              >
                Clear selection
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={bulkAction || ''}
                onChange={(e) => setBulkAction(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Choose bulk action...</option>
                <option value="approve">✅ Approve & Publish Selected</option>
                <option value="reject">❌ Reject Selected</option>
                <option value="assign">👥 Assign to Team Member</option>
                <option value="export">📤 Export as Report</option>
              </select>

              {bulkAction && (
                <button className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg">
                  Execute {bulkAction}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MAIN DRAFT QUEUE */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
        {/* TOOLBAR */}
        <div className="p-6 border-b">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
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
              </div>

              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search drafts..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <select className="border border-gray-300 rounded-lg px-3 py-2">
                <option>Sort by: Priority</option>
                <option>Sort by: Oldest First</option>
                <option>Sort by: Type</option>
              </select>

              <button className="px-4 py-2 border border-gray-300 rounded-lg">
                <FiFilter />
              </button>

              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                <FiRefreshCw className="inline mr-2" />
                Refresh Queue
              </button>
            </div>
          </div>
        </div>

        {/* DRAFT TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title & Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Source</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Detected</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Wait Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {draftList.map((draft) => (
                <tr
                  key={draft.id}
                  className={`hover:bg-gray-50 cursor-pointer ${
                    draft.priority === 'critical' ? 'bg-red-50' : ''
                  }`}
                  onClick={() => setActiveDraft(draft)}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{draft.type === 'Job Notification' ? '💼' : '📊'}</span>
                      <div>
                        <div className="font-medium text-gray-900">{draft.title}</div>
                        <div className="text-sm text-gray-500">{draft.type}</div>
                      </div>
                    </div>
                    {draft.changes && draft.changes.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {draft.changes.map((change, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {change}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{draft.source}</div>
                    <div className="text-sm text-gray-500">Auto-detected</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{draft.detected}</div>
                    <div className="text-sm text-gray-500">Today</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      draft.priority === 'critical' ? 'bg-red-100 text-red-800' :
                      draft.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {draft.priority === 'critical' ? 'CRITICAL' : draft.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{draft.waitTime}</div>
                    {draft.priority === 'critical' && (
                      <div className="text-xs text-red-600">⚠️ Needs review NOW</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="Preview"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDraft(draft);
                        }}
                      >
                        <FiEye />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                        title="Approve"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiCheck />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        title="Reject"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiX />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-6 border-t">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing 1-10 of 47 drafts
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg">
                Previous
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">
                1
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg">
                2
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg">
                3
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DRAFT INSPECTION MODAL */}
      {activeDraft && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            {/* MODAL HEADER */}
            <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                    <FiEye className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Draft Inspection Station</h2>
                    <p className="text-gray-600">Review before publishing</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setActiveDraft(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            </div>

            {/* SPLIT VIEW CONTENT */}
            <div className="flex flex-col lg:flex-row h-[70vh]">
              {/* LEFT PANEL - EXTRACTED DATA */}
              <div className="lg:w-1/2 border-r overflow-y-auto p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center">
                  <FiDownload className="mr-3 text-blue-600" />
                  EXTRACTED RAW DATA
                </h3>

                <div className="space-y-6">
                  {/* SOURCE INFO */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold mb-3">Source Intelligence</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">URL:</span>
                        <a href="#" className="text-blue-600 hover:underline truncate">
                          https://ssc.nic.in/notification/2024/cgl
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Detected:</span>
                        <span className="font-medium">14:30:22 (2 minutes after publish)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Confidence Score:</span>
                        <span className="font-bold text-green-600">98%</span>
                      </div>
                    </div>
                  </div>

                  {/* EXTRACTED FIELDS */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold mb-3">Auto-Extracted Fields</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Organization:</span>
                        <span className="font-medium">Staff Selection Commission (SSC)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Post:</span>
                        <span className="font-medium">Combined Graduate Level</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vacancies:</span>
                        <span className="font-bold text-blue-600">17,500</span>
                      </div>
                    </div>
                  </div>

                  {/* CHANGES DETECTED */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <FiAlertTriangle className="mr-2 text-yellow-600" />
                      Changes Detected
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FiTrendingUp className="text-green-600 mr-2" />
                        <span>Vacancy increased from 15,000 to 17,500</span>
                      </div>
                      <div className="flex items-center">
                        <FiCalendar className="text-blue-600 mr-2" />
                        <span>Last date extended by 15 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL - EDIT & PUBLISH */}
              <div className="lg:w-1/2 overflow-y-auto p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center">
                  <FiEdit className="mr-3 text-green-600" />
                  EDIT & POLISH
                </h3>

                <div className="space-y-6">
                  {/* SEO FIELDS */}
                  <div>
                    <label className="block font-semibold mb-2">
                      Title (Google will show this)
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      defaultValue="SSC CGL 2024 Notification Released | 17,500 Vacancies"
                      placeholder="Make it click-worthy, under 60 chars"
                    />
                    <div className="text-sm text-gray-500 mt-2">
                      <FiInfo className="inline mr-1" />
                      65 characters (optimal: 55-60)
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">
                      Meta Description
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      defaultValue="SSC CGL 2024 notification is out. 17,500 vacancies for Graduate Level posts. Apply online from 20 Jan to 15 Feb 2024."
                      placeholder="Compelling summary, under 160 chars"
                    />
                  </div>

                  {/* QUICK ACTIONS */}
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 bg-green-50 border border-green-200 rounded-xl text-left hover:border-green-300">
                      <FiCheck className="text-green-600 mb-2" />
                      <div className="font-semibold">Approve as is</div>
                      <div className="text-sm text-gray-600">Fast track</div>
                    </button>
                    <button className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-left hover:border-blue-300">
                      <FiEdit className="text-blue-600 mb-2" />
                      <div className="font-semibold">Edit & Improve</div>
                      <div className="text-sm text-gray-600">Polish first</div>
                    </button>
                  </div>

                  {/* PUBLISH OPTIONS */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold mb-3">Publish Options</h4>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="radio" name="publish" className="mr-3" defaultChecked />
                        <div>
                          <div className="font-medium">Publish Now</div>
                          <div className="text-sm text-gray-600">Go live immediately</div>
                        </div>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="publish" className="mr-3" />
                        <div>
                          <div className="font-medium">Schedule for tomorrow 10:00 AM</div>
                          <div className="text-sm text-gray-600">Peak traffic time</div>
                        </div>
                      </label>
                    </div>

                    <div className="mt-6 flex space-x-3">
                      <button className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl">
                        <FiCheck className="inline mr-2" />
                        APPROVE & PUBLISH
                      </button>
                      <button className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl">
                        <FiX className="inline mr-2" />
                        REJECT DRAFT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUICK STATS BAR */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
        <h3 className="text-xl font-bold mb-6">REVIEW PERFORMANCE</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Today Reviewed', value: '24', change: '+4', color: 'green' },
            { label: 'Avg. Review Time', value: '12 min', change: '-2 min', color: 'blue' },
            { label: 'Auto-Accuracy', value: '94%', change: '+3%', color: 'purple' },
            { label: 'Rejection Rate', value: '8%', change: '-2%', color: 'yellow' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 border rounded-xl">
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
              <div className={`text-sm font-semibold mt-2 ${
                stat.color === 'green' ? 'text-green-600' :
                stat.color === 'blue' ? 'text-blue-600' :
                stat.color === 'purple' ? 'text-purple-600' :
                'text-yellow-600'
              }`}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
