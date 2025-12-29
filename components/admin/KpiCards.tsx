import { FiUsers, FiFileText, FiBriefcase, FiTrendingUp } from 'react-icons/fi';

export default function KpiCards() {
  const kpiData = [
    {
      title: 'Total Users',
      value: '12,543',
      change: '+12.5%',
      changeType: 'positive',
      icon: <FiUsers className="text-blue-600" />,
      description: 'Active registered users'
    },
    {
      title: 'Total MCQs',
      value: '9,842',
      change: '+8.2%',
      changeType: 'positive',
      icon: <FiFileText className="text-green-600" />,
      description: 'Questions in database'
    },
    {
      title: 'Active Jobs',
      value: '342',
      change: '+15.3%',
      changeType: 'positive',
      icon: <FiBriefcase className="text-purple-600" />,
      description: 'Current job postings'
    },
    {
      title: 'Daily Visits',
      value: '2,847',
      change: '+5.7%',
      changeType: 'positive',
      icon: <FiTrendingUp className="text-orange-600" />,
      description: 'Unique visitors today'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => (
        <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{kpi.value}</p>
              <p className="text-xs text-gray-500 mt-1">{kpi.description}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
              {kpi.icon}
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium ${
              kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {kpi.change}
            </span>
            <span className="text-sm text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
