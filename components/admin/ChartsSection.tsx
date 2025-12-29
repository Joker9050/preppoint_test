'use client';

interface ChartsSectionProps {
  timeRange: string;
}

export default function ChartsSection({ timeRange }: ChartsSectionProps) {
  // Mock data for charts
  const mcqData = [
    { subject: 'Computer Science', count: 1250, percentage: 35 },
    { subject: 'Mathematics', count: 890, percentage: 25 },
    { subject: 'Government Exams', count: 650, percentage: 18 },
    { subject: 'English', count: 420, percentage: 12 },
    { subject: 'Others', count: 340, percentage: 10 }
  ];

  const userGrowthData = [
    { month: 'Jan', users: 1200 },
    { month: 'Feb', users: 1350 },
    { month: 'Mar', users: 1580 },
    { month: 'Apr', users: 1720 },
    { month: 'May', users: 1890 },
    { month: 'Jun', users: 2100 },
    { month: 'Jul', users: 2350 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* MCQ Usage by Subject */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">MCQ Usage by Subject</h3>
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
          </select>
        </div>

        <div className="space-y-4">
          {mcqData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium text-gray-700">{item.subject}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Growth Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
            <option>Last 7 months</option>
            <option>Last 12 months</option>
            <option>Last 30 days</option>
          </select>
        </div>

        <div className="space-y-4">
          {userGrowthData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 w-12">{item.month}</span>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${(item.users / 2500) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm text-gray-600 w-16 text-right">{item.users.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total growth this period:</span>
            <span className="font-semibold text-green-600">+95.8%</span>
          </div>
        </div>
      </div>

      {/* Job Traffic */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Job Update Traffic</h3>
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
          </select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Government Jobs</p>
              <p className="text-sm text-gray-600">SSC, Banking, Railway</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-600">45.2K</p>
              <p className="text-xs text-gray-500">views</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">IT Jobs</p>
              <p className="text-sm text-gray-600">Tech companies</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">28.7K</p>
              <p className="text-xs text-gray-500">views</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Private Sector</p>
              <p className="text-sm text-gray-600">Corporate jobs</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-purple-600">18.9K</p>
              <p className="text-xs text-gray-500">views</p>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Platform Performance</h3>
          <span className="text-sm text-gray-500">Real-time metrics</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">98.5%</p>
            <p className="text-sm text-gray-600">Uptime</p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">1.2s</p>
            <p className="text-sm text-gray-600">Avg Response</p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">2.4K</p>
            <p className="text-sm text-gray-600">Active Sessions</p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">99.2%</p>
            <p className="text-sm text-gray-600">User Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
}
