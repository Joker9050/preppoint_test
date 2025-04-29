import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBook, FiCalendar, FiAward, FiBarChart2, FiClock, FiHelpCircle } from 'react-icons/fi';
import Navbar from '../../componets/Navbar';
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Mock data - replace with API calls in a real application
  useEffect(() => {
    const mockUserData = {
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      points: 1250,
      level: "Intermediate",
      courses: {
        enrolled: 5,
        completed: 2,
        inProgress: 3
      },
      upcomingAssignments: [
        { id: 1, course: "Mathematics", title: "Algebra Quiz", dueDate: "2023-06-15", status: "pending" },
        { id: 2, course: "History", title: "Ancient Civilizations Essay", dueDate: "2023-06-18", status: "pending" }
      ],
      recentCourses: [
        { id: 1, title: "Advanced Algebra", progress: 65, instructor: "Dr. Smith", lastAccessed: "2 days ago" },
        { id: 2, title: "World History", progress: 42, instructor: "Prof. Johnson", lastAccessed: "1 day ago" },
        { id: 3, title: "Creative Writing", progress: 30, instructor: "Ms. Williams", lastAccessed: "3 days ago" }
      ],
      performanceStats: {
        quizzes: { taken: 12, average: 85 },
        assignments: { submitted: 8, average: 88 },
        participation: 92
      }
    };
    setUserData(mockUserData);
  }, []);

  if (!userData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
       <Navbar/>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Enhanced Sidebar */}
          <div className="w-full lg:w-1/4">
            {/* Profile Card - Enhanced Design */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden mb-6">
              <div className="p-6 text-center">
                {/* Avatar with Ring */}
                <div className="relative mx-auto mb-4">
                  <div className="absolute -inset-1 rounded-full bg-white/30 blur-sm"></div>
                  <img 
                    className="relative h-20 w-20 rounded-full border-4 border-white mx-auto"
                    src={userData.avatar} 
                    alt="User avatar" 
                  />
                </div>
                
                {/* User Info */}
                <h2 className="text-xl font-bold text-white mb-1">{userData.name}</h2>
                <p className="text-blue-100 mb-4">{userData.level} Learner</p>
                
                {/* Points with Icon */}
                <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-white">{userData.points} Points</span>
                </div>
              </div>
              
              {/* Stats Bar */}
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-white font-bold text-lg">{userData.courses.enrolled}</div>
                    <div className="text-blue-100 text-xs uppercase tracking-wider">Courses</div>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">{userData.courses.completed}</div>
                    <div className="text-blue-100 text-xs uppercase tracking-wider">Completed</div>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">{userData.performanceStats.quizzes.average}%</div>
                    <div className="text-blue-100 text-xs uppercase tracking-wider">Avg Score</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Progress */}
            <div className="bg-white rounded-xl shadow-md p-5 mb-6">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Learning Progress
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Course Completion</span>
                    <span className="font-medium">{(userData.courses.completed / userData.courses.enrolled * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" 
                      style={{ width: `${(userData.courses.completed / userData.courses.enrolled) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Weekly Goal</span>
                    <span className="font-medium">4/6 hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" 
                      style={{ width: `67%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Activity Streak</span>
                    <span className="font-medium">7 days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                      style={{ width: `100%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Actions
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-3 rounded-lg flex flex-col items-center transition-colors">
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-xs font-medium">New Course</span>
                </button>
                
                <button className="bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-lg flex flex-col items-center transition-colors">
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-xs font-medium">Assignments</span>
                </button>
                
                <button className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-3 rounded-lg flex flex-col items-center transition-colors">
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs font-medium">Schedule</span>
                </button>
                
                <button className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 p-3 rounded-lg flex flex-col items-center transition-colors">
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span className="text-xs font-medium">Log Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:w-3/4">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold mb-2">Welcome back, {userData.name.split(' ')[0]}!</h2>
                  <p className="text-gray-600 mb-4">Here's what's happening with your learning today.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-bold text-blue-800 mb-1">Courses in Progress</h3>
                      <p className="text-2xl font-bold">{userData.courses.inProgress}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-bold text-green-800 mb-1">Completed Courses</h3>
                      <p className="text-2xl font-bold">{userData.courses.completed}</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="font-bold text-yellow-800 mb-1">Learning Points</h3>
                      <p className="text-2xl font-bold">{userData.points}</p>
                    </div>
                  </div>
                </div>

                {/* Upcoming Assignments */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold flex items-center">
                      <FiCalendar className="mr-2" />
                      Upcoming Assignments
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {userData.upcomingAssignments.map(assignment => (
                      <div key={assignment.id} className="p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{assignment.title}</h3>
                            <p className="text-sm text-gray-500">{assignment.course}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-500">Due {assignment.dueDate}</p>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="p-4 text-center">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        View All Assignments
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Courses */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold flex items-center">
                      <FiBook className="mr-2" />
                      Recent Courses
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {userData.recentCourses.map(course => (
                      <div key={course.id} className="p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{course.title}</h3>
                          <span className="text-sm text-gray-500">Last accessed: {course.lastAccessed}</span>
                        </div>
                        <div className="mb-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                      </div>
                    ))}
                    <div className="p-4 text-center">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        View All Courses
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-6">My Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userData.recentCourses.map(course => (
                    <div key={course.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-40 bg-blue-100"></div>
                      <div className="p-4">
                        <h3 className="font-bold mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">Instructor: {course.instructor}</p>
                        <div className="mb-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-sm text-gray-500">Last accessed: {course.lastAccessed}</span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'assignments' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-6">Assignments</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Assignment
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Due Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userData.upcomingAssignments.map(assignment => (
                        <tr key={assignment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium">{assignment.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500">{assignment.course}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500">{assignment.dueDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              {assignment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            <button className="text-green-600 hover:text-green-900">Submit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-6">Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Example achievement cards */}
                  <div className="border rounded-lg p-4 text-center">
                    <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiAward className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h3 className="font-bold mb-1">Fast Learner</h3>
                    <p className="text-sm text-gray-600 mb-3">Completed 3 courses in one month</p>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Earned: Jun 5, 2023</span>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiAward className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-bold mb-1">Quiz Master</h3>
                    <p className="text-sm text-gray-600 mb-3">Scored 90%+ on 5 consecutive quizzes</p>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Earned: May 22, 2023</span>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiAward className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-bold mb-1">Perfect Attendance</h3>
                    <p className="text-sm text-gray-600 mb-3">Attended all classes for 1 month</p>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Earned: May 15, 2023</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;