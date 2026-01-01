'use client';

import { useState } from 'react';
import { FiRefreshCw, FiAlertTriangle, FiCheckSquare, FiGrid, FiList, FiSearch, FiFilter, FiEye, FiCheck, FiX, FiDownload, FiEdit, FiInfo, FiTrendingUp, FiCalendar, FiColumns, FiArrowRight, FiPackage, FiCheckCircle, FiAlertCircle, FiClock } from 'react-icons/fi';

export default function ChangeDetectionPage() {
  const [selectedChanges, setSelectedChanges] = useState<string[]>([]);
  const [activeChange, setActiveChange] = useState<any>(null);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('split');

  const changeStats = {
    total: 42,
    critical: 15,
    avgDetection: "23 minutes",
    accuracy: "96%"
  };

  const changeTypes = [
    { type: 'Date Changes', count: 15, color: 'red', icon: '📅' },
    { type: 'Link Additions', count: 12, color: 'orange', icon: '🔗' },
    { type: 'Content Updates', count: 8, color: 'yellow', icon: '📝' },
    { type: 'Status Changes', count: 7, color: 'blue', icon: '🔄' }
  ];

  const changesList = [
    {
      id: 'CHANGE-001',
      title: 'SSC CGL 2024 Notification',
      changeType: 'Date Extended',
      oldValue: '15 Feb 2024',
      newValue: '01 Mar 2024',
      source: 'ssc.nic.in',
      detected: '16:45',
      impact: 'critical',
      affected: '2,350 users'
    },
    {
      id: 'CHANGE-002',
      title: 'UPSC Prelims 2024',
      changeType: 'Admit Card Link',
      oldValue: 'Not available',
      newValue: 'Download link active',
      source: 'upsc.gov.in',
      detected: '15:20',
      impact: 'high',
      affected: '8,500 users'
    },
    // More changes...
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* WAR ROOM HEADER */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-600 flex items-center justify-center">
                <FiRefreshCw className="text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">CHANGE DETECTION WAR ROOM</h1>
                <p className="text-purple-200 mt-2">Track every external update. Keep PrepPoint always fresh.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-purple-800/50 rounded-lg px-4 py-3">
                <div className="text-sm text-purple-300">Changes Detected</div>
                <div className="text-2xl font-bold">{changeStats.total}</div>
              </div>
              <div className="bg-red-800/50 rounded-lg px-4 py-3">
                <div className="text-sm text-red-300">Critical Changes</div>
                <div className="text-2xl font-bold">{changeStats.critical}</div>
              </div>
              <div className="bg-green-800/50 rounded-lg px-4 py-3">
                <div className="text-sm text-green-300">Avg. Detection</div>
                <div className="text-2xl font-bold">{changeStats.avgDetection}</div>
              </div>
              <div className="bg-blue-800/50 rounded-lg px-4 py-3">
                <div className="text-sm text-blue-300">Accuracy</div>
                <div className="text-2xl font-bold">{changeStats.accuracy}%</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-5xl font-bold">0.4%</div>
                <div className="text-sm text-purple-300">Outdated Content</div>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-48 h-3 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-green-600" style={{ width: '99.6%' }}></div>
                  </div>
                  <span className="ml-3 text-green-400">↓ 0.1% this week</span>
                </div>
                <button className="w-full mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg">
                  <FiAlertTriangle className="inline mr-2" />
                  FORCE RE-CHECK ALL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHANGE TYPE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {changeTypes.map((item) => (
          <button
            key={item.type}
            onClick={() => setFilter(item.type.toLowerCase())}
            className={`p-4 rounded-xl border-2 transition-all ${
              filter === item.type.toLowerCase()
                ? `border-${item.color}-500 bg-${item.color}-50`
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
                <div className="text-sm text-gray-500">detected</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* BULK ACTION BAR */}
      {selectedChanges.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center space-x-4">
              <FiCheckSquare className="text-2xl text-yellow-700" />
              <div>
                <h3 className="font-bold text-yellow-800">{selectedChanges.length} changes selected</h3>
                <p className="text-yellow-700 text-sm">Choose bulk action</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                ✅ Apply All Updates
              </button>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                ❌ Mark All as False
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg">
                📤 Export Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CHANGE DETECTION TABLE */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
        {/* TOOLBAR */}
        <div className="p-6 border-b">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('split')}
                  className={`p-2 ${viewMode === 'split' ? 'bg-gray-100' : ''}`}
                  title="Split View"
                >
                  <FiColumns />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                  title="List View"
                >
                  <FiList />
                </button>
              </div>

              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search changes..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <select className="border border-gray-300 rounded-lg px-3 py-2">
                <option>Sort by: Impact Level</option>
                <option>Sort by: Detection Time</option>
                <option>Sort by: Content Type</option>
              </select>

              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                <FiRefreshCw className="inline mr-2" />
                Run Manual Check
              </button>
            </div>
          </div>
        </div>

        {/* CHANGE TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Content & Change</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Before → After</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Source</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Impact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Detected</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {changesList.map((change) => (
                <tr
                  key={change.id}
                  className={`hover:bg-gray-50 cursor-pointer ${
                    change.impact === 'critical' ? 'bg-red-50' :
                    change.impact === 'high' ? 'bg-orange-50' : ''
                  }`}
                  onClick={() => setActiveChange(change)}
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
                      <span className="text-xl mr-3">
                        {change.changeType === 'Date Extended' ? '📅' :
                         change.changeType === 'Admit Card Link' ? '🔗' : '📝'}
                      </span>
                      <div>
                        <div className="font-medium text-gray-900">{change.title}</div>
                        <div className="text-sm text-gray-500">{change.changeType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <span className="text-red-600 line-through mr-2">{change.oldValue}</span>
                        <FiArrowRight className="text-gray-400 mx-2" />
                        <span className="text-green-600 font-semibold">{change.newValue}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Affects: {change.affected}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{change.source}</div>
                    <div className="text-sm text-gray-500">Official source</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      change.impact === 'critical' ? 'bg-red-100 text-red-800' :
                      change.impact === 'high' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {change.impact.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{change.detected}</div>
                    <div className="text-sm text-gray-500">Today</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                        title="Apply Update"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Apply change logic
                        }}
                      >
                        <FiCheck />
                      </button>
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="Review"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveChange(change);
                        }}
                      >
                        <FiEye />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        title="Ignore"
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
              Showing 1-10 of 42 changes
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

      {/* CHANGE INSPECTION MODAL */}
      {activeChange && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            {/* MODAL HEADER */}
            <div className="p-6 border-b bg-gradient-to-r from-purple-50 to-indigo-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
                    <FiRefreshCw className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Change Inspection Station</h2>
                    <p className="text-gray-600">Review before updating live content</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setActiveChange(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            </div>

            {/* SPLIT VIEW CONTENT */}
            <div className="flex flex-col lg:flex-row h-[70vh]">
              {/* LEFT PANEL - CURRENT ON PREPPOINT */}
              <div className="lg:w-1/2 border-r overflow-y-auto p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center">
                  <FiPackage className="mr-3 text-blue-600" />
                  CURRENT ON PREPPOINT
                </h3>

                <div className="space-y-6">
                  {/* CURRENT CONTENT */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold mb-3">Live Content</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                        <div>
                          <div className="font-medium">Last Date</div>
                          <div className="text-sm text-gray-600">Application deadline</div>
                        </div>
                        <div className="text-lg font-bold text-red-600">15 February 2024</div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                        <div>
                          <div className="font-medium">Apply Link</div>
                          <div className="text-sm text-gray-600">Official application portal</div>
                        </div>
                        <a href="#" className="text-blue-600 hover:underline">ssc.nic.in/apply</a>
                      </div>
                    </div>
                  </div>

                  {/* SEO STATUS */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <FiSearch className="mr-2" />
                      SEO & Metadata Status
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-green-600">
                        <FiCheckCircle className="mr-2" />
                        <span>Schema: JobPosting active</span>
                      </div>
                      <div className="flex items-center text-yellow-600">
                        <FiAlertCircle className="mr-2" />
                        <span>Will show outdated info</span>
                      </div>
                      <div className="flex items-center text-red-600">
                        <FiAlertTriangle className="mr-2" />
                        <span>Google may penalize</span>
                      </div>
                    </div>
                  </div>

                  {/* AFFECTED USERS */}
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <h4 className="font-semibold mb-3">Impact Analysis</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Registered Applicants:</span>
                        <span className="font-bold">2,350</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bookmarked Users:</span>
                        <span className="font-bold">850</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">SEO Ranking Risk:</span>
                        <span className="font-bold text-red-600">HIGH</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL - DETECTED CHANGE */}
              <div className="lg:w-1/2 overflow-y-auto p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center">
                  <FiDownload className="mr-3 text-green-600" />
                  DETECTED CHANGE
                </h3>

                <div className="space-y-6">
                  {/* CHANGE DETAILS */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h4 className="font-semibold mb-3">Source Update</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center">
                          <FiCalendar className="text-green-600 mr-3" />
                          <div>
                            <div className="font-medium">Last Date Extended</div>
                            <div className="text-sm text-gray-600">Official source updated</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-red-50 p-4 rounded-lg text-center">
                          <div className="text-sm text-gray-600">Old Value</div>
                          <div className="text-xl font-bold line-through text-red-600">15 Feb 2024</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg text-center">
                          <div className="text-sm text-gray-600">New Value</div>
                          <div className="text-xl font-bold text-green-600">01 Mar 2024</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SOURCE VERIFICATION */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <h4 className="font-semibold mb-3">Source Verification</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FiCheckCircle className="text-green-600 mr-3" />
                        <div>
                          <div className="font-medium">Official Source</div>
                          <div className="text-sm text-gray-600">ssc.nic.in (verified)</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FiCheckCircle className="text-green-600 mr-3" />
                        <div>
                          <div className="font-medium">Multiple Confirmations</div>
                          <div className="text-sm text-gray-600">3+ news sources reporting</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FiClock className="text-blue-600 mr-3" />
                        <div>
                          <div className="font-medium">Detection Time</div>
                          <div className="text-sm text-gray-600">23 minutes after change</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ACTION PANEL */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">Apply Update</h4>

                    <div className="space-y-4 mb-6">
                      <label className="flex items-center">
                        <input type="radio" name="action" className="mr-3" defaultChecked />
                        <div>
                          <div className="font-medium">Update Immediately</div>
                          <div className="text-sm text-gray-600">Apply change now</div>
                        </div>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="action" className="mr-3" />
                        <div>
                          <div className="font-medium">Edit Before Applying</div>
                          <div className="text-sm text-gray-600">Make adjustments first</div>
                        </div>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="action" className="mr-3" />
                        <div>
                          <div className="font-medium">Mark as False Positive</div>
                          <div className="text-sm text-gray-600">Ignore this change</div>
                        </div>
                      </label>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl">
                        <FiCheck className="inline mr-2" />
                        APPLY UPDATE
                      </button>
                      <button className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl">
                        <FiX className="inline mr-2" />
                        IGNORE CHANGE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SOURCE RELIABILITY PANEL */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
        <h3 className="text-xl font-bold mb-6">SOURCE RELIABILITY SCOREBOARD</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'ssc.nic.in',
              reliability: '98%',
              changes: '15 detected',
              trust: 'A+',
              color: 'green'
            },
            {
              name: 'upsc.gov.in',
              reliability: '99%',
              changes: '8 detected',
              trust: 'A+',
              color: 'green'
            },
            {
              name: 'ibps.in',
              reliability: '95%',
              changes: '12 detected',
              trust: 'A',
              color: 'blue'
            }
          ].map((source, index) => (
            <div key={index} className="border rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-lg">{source.name}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-bold bg-${source.color}-100 text-${source.color}-800`}>
                  {source.trust} TRUST
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600">Reliability Score</div>
                  <div className="flex items-center">
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-${source.color}-500`}
                        style={{ width: source.reliability }}
                      ></div>
                    </div>
                    <span className="ml-3 font-bold">{source.reliability}</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Changes Detected</div>
                    <div className="font-medium">{source.changes}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">False Positive Rate</div>
                    <div className="font-medium text-green-600">2%</div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                View Source History
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
