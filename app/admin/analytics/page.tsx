'use client';

import { useState, useEffect } from 'react';
import {
  FiTrendingUp,
  FiTrendingDown,
  FiUsers,
  FiFileText,
  FiBriefcase,
  FiClock,
  FiTarget,
  FiBarChart,
  FiDownload,
  FiRefreshCw,
  FiCalendar,
  FiFilter,
  FiEye,
  FiMousePointer,
  FiSmartphone,
  FiMonitor,
  FiTablet,
  FiGlobe,
  FiSearch,
  FiZap,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
  FiActivity
} from 'react-icons/fi';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  comparison?: string;
  insight?: string;
  target?: string;
  icon?: React.ReactNode;
}

function KPICard({ title, value, change, trend, comparison, insight, target, icon }: KPICardProps) {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  const trendIcons = {
    up: <FiTrendingUp className="w-4 h-4" />,
    down: <FiTrendingDown className="w-4 h-4" />,
    neutral: <FiBarChart className="w-4 h-4" />
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {icon && <div className="text-blue-600">{icon}</div>}
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        </div>
        <div className={`flex items-center space-x-1 ${trendColors[trend]}`}>
          {trendIcons[trend]}
          <span className="text-sm font-semibold">{change}</span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {comparison && <p className="text-xs text-gray-500">{comparison}</p>}
        {insight && <p className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">{insight}</p>}
        {target && <p className="text-xs text-green-600">Target: {target}</p>}
      </div>
    </div>
  );
}

function DateRangePicker() {
  return (
    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" suppressHydrationWarning>
      <option value="today">Today</option>
      <option value="7d">Last 7 Days</option>
      <option value="30d">Last 30 Days</option>
      <option value="90d">Last 90 Days</option>
      <option value="custom">Custom Range</option>
    </select>
  );
}

function ComparisonToggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        enabled
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
      suppressHydrationWarning
    >
      Compare Period
    </button>
  );
}

function ExportDropdown() {
  return (
    <div className="relative">
      <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center" suppressHydrationWarning>
        <FiDownload className="mr-2" />
        Export
      </button>
    </div>
  );
}

function SegmentSelector() {
  return (
    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" suppressHydrationWarning>
      <option value="all">All Users</option>
      <option value="new">New Users</option>
      <option value="returning">Returning Users</option>
      <option value="premium">Premium Users</option>
      <option value="mobile">Mobile Users</option>
    </select>
  );
}

function UserGrowthChart() {
  // Placeholder for chart component
  return (
    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <FiBarChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">User Growth Chart</p>
        <p className="text-xs text-gray-400">Interactive chart would be rendered here</p>
      </div>
    </div>
  );
}

function TrafficSourcesChart() {
  const sources = [
    { name: 'Organic Search', percentage: 45, users: 45230, color: 'bg-blue-500' },
    { name: 'Direct', percentage: 25, users: 25100, color: 'bg-green-500' },
    { name: 'Social Media', percentage: 15, users: 15200, color: 'bg-purple-500' },
    { name: 'Referral', percentage: 10, users: 10050, color: 'bg-yellow-500' },
    { name: 'Email Campaign', percentage: 5, users: 5100, color: 'bg-red-500' }
  ];

  return (
    <div className="space-y-4">
      {sources.map((source, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
            <span className="text-sm font-medium">{source.name}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{source.percentage}%</span>
            <span className="text-sm text-gray-500">{source.users.toLocaleString()} users</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function TrafficTable() {
  const trafficData = [
    { source: 'Organic Search', bounceRate: '32%', sessionDuration: '7m', pagesPerSession: '3.2' },
    { source: 'Direct', bounceRate: '28%', sessionDuration: '9m', pagesPerSession: '4.1' },
    { source: 'Social Media', bounceRate: '42%', sessionDuration: '5m', pagesPerSession: '2.8' },
    { source: 'Referral', bounceRate: '38%', sessionDuration: '6m', pagesPerSession: '3.5' },
    { source: 'Email Campaign', bounceRate: '22%', sessionDuration: '10m', pagesPerSession: '5.2' }
  ];

  return (
    <div className="mt-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 font-medium text-gray-700">Source</th>
            <th className="text-left py-2 font-medium text-gray-700">Bounce Rate</th>
            <th className="text-left py-2 font-medium text-gray-700">Avg. Session</th>
            <th className="text-left py-2 font-medium text-gray-700">Pages/Session</th>
          </tr>
        </thead>
        <tbody>
          {trafficData.map((row, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="py-2">{row.source}</td>
              <td className="py-2">{row.bounceRate}</td>
              <td className="py-2">{row.sessionDuration}</td>
              <td className="py-2">{row.pagesPerSession}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SubjectPerformanceChart() {
  const subjects = [
    { name: 'Computer Science', attempts: 45230, successRate: 72 },
    { name: 'Mathematics', attempts: 38450, successRate: 68 },
    { name: 'Reasoning', attempts: 32100, successRate: 65 },
    { name: 'English', attempts: 28900, successRate: 71 },
    { name: 'General Knowledge', attempts: 25600, successRate: 69 }
  ];

  return (
    <div className="space-y-4">
      {subjects.map((subject, index) => (
        <div key={index} className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">{subject.name}</p>
            <p className="text-xs text-gray-500">{subject.attempts.toLocaleString()} attempts</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${subject.successRate}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{subject.successRate}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function DifficultyAnalysis() {
  const difficulties = [
    { level: 'Easy', count: 4230, avgScore: 85 },
    { level: 'Medium', count: 3450, avgScore: 62 },
    { level: 'Hard', count: 1200, avgScore: 42 }
  ];

  return (
    <div className="mt-6">
      <h4 className="font-medium mb-4">Difficulty Level Analysis</h4>
      <div className="space-y-3">
        {difficulties.map((diff, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm">{diff.level}</span>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-500">{diff.count} questions</span>
              <span className="text-sm font-medium">{diff.avgScore}% avg</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeviceBreakdownChart() {
  const devices = [
    { type: 'Mobile', percentage: 65, icon: <FiSmartphone />, color: 'bg-green-500' },
    { type: 'Desktop', percentage: 30, icon: <FiMonitor />, color: 'bg-blue-500' },
    { type: 'Tablet', percentage: 5, icon: <FiTablet />, color: 'bg-purple-500' }
  ];

  return (
    <div className="space-y-4">
      {devices.map((device, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-gray-600">{device.icon}</div>
            <span className="text-sm font-medium">{device.type}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${device.color}`}
                style={{ width: `${device.percentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{device.percentage}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function BrowserStats() {
  const browsers = [
    { name: 'Chrome', percentage: 68 },
    { name: 'Safari', percentage: 18 },
    { name: 'Firefox', percentage: 8 },
    { name: 'Edge', percentage: 4 },
    { name: 'Others', percentage: 2 }
  ];

  return (
    <div className="mt-6">
      <h4 className="font-medium mb-4">Browser Statistics</h4>
      <div className="space-y-2">
        {browsers.map((browser, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>{browser.name}</span>
            <span className="font-medium">{browser.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GeoMap() {
  return (
    <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <FiGlobe className="w-12 h-12 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">Geographic Map</p>
        <p className="text-xs text-gray-400">Interactive map would be rendered here</p>
      </div>
    </div>
  );
}

function TopCitiesTable() {
  const cities = [
    { name: 'Mumbai', users: 15420, percentage: 12.3 },
    { name: 'Delhi', users: 12890, percentage: 10.3 },
    { name: 'Bangalore', users: 11200, percentage: 8.9 },
    { name: 'Chennai', users: 9800, percentage: 7.8 },
    { name: 'Kolkata', users: 8650, percentage: 6.9 }
  ];

  return (
    <div className="mt-4">
      <h4 className="font-medium mb-3">Top Cities</h4>
      <div className="space-y-2">
        {cities.map((city, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>{city.name}</span>
            <div className="text-right">
              <span className="font-medium">{city.users.toLocaleString()}</span>
              <span className="text-gray-500 ml-2">({city.percentage}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RetentionChart() {
  return (
    <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <FiActivity className="w-12 h-12 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">Retention Analysis Chart</p>
        <p className="text-xs text-gray-400">Cohort analysis chart would be rendered here</p>
      </div>
    </div>
  );
}

function CohortAnalysisTable() {
  const cohorts = [
    { period: 'Week 1', retention: 68, trend: 'improving' },
    { period: 'Week 4', retention: 42, trend: 'stable' },
    { period: 'Week 12', retention: 28, trend: 'stable' },
    { period: 'Month 6', retention: 18, trend: 'declining' }
  ];

  return (
    <div className="mt-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 font-medium text-gray-700">Cohort</th>
            <th className="text-left py-2 font-medium text-gray-700">Retention</th>
            <th className="text-left py-2 font-medium text-gray-700">Trend</th>
          </tr>
        </thead>
        <tbody>
          {cohorts.map((cohort, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="py-2">{cohort.period}</td>
              <td className="py-2 font-medium">{cohort.retention}%</td>
              <td className="py-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  cohort.trend === 'improving' ? 'bg-green-100 text-green-800' :
                  cohort.trend === 'stable' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {cohort.trend}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LiveActivityFeed() {
  const activities = [
    { action: 'MCQ Attempt', user: 'User123', time: '2 min ago', type: 'engagement' },
    { action: 'Job Application', user: 'PrepStudent', time: '5 min ago', type: 'conversion' },
    { action: 'Mock Test Started', user: 'ExamPrep2024', time: '8 min ago', type: 'engagement' },
    { action: 'Profile Updated', user: 'CareerSeeker', time: '12 min ago', type: 'activity' },
    { action: 'New Registration', user: 'FreshUser', time: '15 min ago', type: 'acquisition' }
  ];

  return (
    <div className="space-y-3">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center space-x-3 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <div className="flex-1">
            <p className="font-medium">{activity.action}</p>
            <p className="text-gray-500">{activity.user}</p>
          </div>
          <span className="text-xs text-gray-400">{activity.time}</span>
        </div>
      ))}
    </div>
  );
}

function InsightsGrid() {
  const insights = [
    {
      type: 'performance',
      message: 'Mobile bounce rate increased by 15%',
      severity: 'warning',
      suggestion: 'Check mobile page load times',
      icon: <FiAlertTriangle className="text-yellow-500" />
    },
    {
      type: 'opportunity',
      message: 'MCQ completion rate peaks at 8-10 PM',
      severity: 'info',
      suggestion: 'Schedule notifications for evening',
      icon: <FiZap className="text-blue-500" />
    },
    {
      type: 'anomaly',
      message: 'Unusual drop in SSC category traffic',
      severity: 'alert',
      suggestion: 'Check for technical issues',
      icon: <FiAlertTriangle className="text-red-500" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {insights.map((insight, index) => (
        <div key={index} className="bg-white rounded-lg border p-4">
          <div className="flex items-start space-x-3">
            <div className="mt-1">{insight.icon}</div>
            <div className="flex-1">
              <p className="font-medium text-sm">{insight.message}</p>
              <p className="text-xs text-gray-600 mt-1">{insight.suggestion}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const [refreshInterval, setRefreshInterval] = useState('30s');

  const kpiCards = [
    {
      title: "Total Active Users",
      value: "12,543",
      change: "+8.2%",
      trend: "up" as const,
      comparison: "vs. last 30 days",
      icon: <FiUsers />
    },
    {
      title: "MCQ Attempts",
      value: "342,891",
      change: "+15.3%",
      trend: "up" as const,
      icon: <FiFileText />
    },
    {
      title: "Job Views",
      value: "89,432",
      change: "-2.1%",
      trend: "down" as const,
      insight: "Weekend dip detected",
      icon: <FiBriefcase />
    },
    {
      title: "Avg. Session Duration",
      value: "8m 42s",
      change: "+12%",
      trend: "up" as const,
      icon: <FiClock />
    },
    {
      title: "Bounce Rate",
      value: "34%",
      change: "-5%",
      trend: "up" as const,
      icon: <FiMousePointer />
    },
    {
      title: "Conversion Rate",
      value: "4.2%",
      change: "+0.8%",
      trend: "up" as const,
      target: "5%",
      icon: <FiTarget />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights into platform performance</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <DateRangePicker />
          <ComparisonToggle />
          <ExportDropdown />
          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            suppressHydrationWarning
          >
            <option value="15s">Auto-refresh: 15s</option>
            <option value="30s">Auto-refresh: 30s</option>
            <option value="1m">Auto-refresh: 1m</option>
            <option value="5m">Auto-refresh: 5m</option>
            <option value="off">Auto-refresh: Off</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center" suppressHydrationWarning>
            <FiRefreshCw className="mr-2" />
            Refresh Data
          </button>
        </div>
      </div>

      {/* KPI Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiCards.map((card, index) => (
          <KPICard key={index} {...card} />
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">User Growth & Engagement</h3>
            <SegmentSelector />
          </div>
          <UserGrowthChart />
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Traffic Sources</h3>
          <TrafficSourcesChart />
          <TrafficTable />
        </div>

        {/* Content Performance */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Content Performance</h3>
          <div className="space-y-6">
            <SubjectPerformanceChart />
            <DifficultyAnalysis />
          </div>
        </div>

        {/* Device & Platform Analytics */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Device & Platform Analytics</h3>
          <DeviceBreakdownChart />
          <BrowserStats />
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Geographic Distribution</h3>
          <GeoMap />
          <TopCitiesTable />
        </div>
      </div>

      {/* Detailed Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Retention Analysis */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">User Retention Analysis</h3>
          <RetentionChart />
          <CohortAnalysisTable />
        </div>

        {/* Real-time Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Real-time Activity</h3>
          <LiveActivityFeed />
        </div>
      </div>

      {/* Automated Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Automated Insights</h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            AI-Powered
          </span>
        </div>
        <InsightsGrid />
      </div>

      {/* Data Export & Schedule */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Data Management</h3>
            <p className="text-gray-600 mt-1">Export reports or schedule automatic delivery</p>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700" suppressHydrationWarning>
            Schedule Report
          </button>
        </div>
      </div>
    </div>
  );
}
