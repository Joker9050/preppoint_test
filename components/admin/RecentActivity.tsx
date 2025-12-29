export default function RecentActivity() {
  const activities = [
    {
      action: 'MCQ Published',
      item: 'Binary Search Algorithm',
      user: 'Admin',
      time: '2 minutes ago',
      type: 'publish'
    },
    {
      action: 'Job Update Added',
      item: 'SSC CGL 2024 Notification',
      user: 'Scraper Bot',
      time: '15 minutes ago',
      type: 'add'
    },
    {
      action: 'User Registered',
      item: 'john.doe@example.com',
      user: 'System',
      time: '1 hour ago',
      type: 'user'
    },
    {
      action: 'MCQ Edited',
      item: 'Array Methods in JavaScript',
      user: 'Admin',
      time: '2 hours ago',
      type: 'edit'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-blue-600">
                {activity.user.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span> {activity.action.toLowerCase()}{' '}
                <span className="font-medium text-gray-700">{activity.item}</span>
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
