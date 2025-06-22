import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBook, FiCalendar, FiAward, FiBarChart2, FiClock, FiHelpCircle, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Navbar from '../../componets/Navbar';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Mock data
        const mockUserData = {
          name: "Alex Johnson",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          points: 1250,
          courses: {
            enrolled: 5,
            completed: 2,
            inProgress: 3
          },
          upcomingAssignments: [
            { 
              id: 1, 
              course: "Mathematics", 
              title: "Algebra Quiz", 
              dueDate: "2023-06-15", 
              status: "pending" 
            },
            { 
              id: 2, 
              course: "History", 
              title: "Ancient Civilizations Essay", 
              dueDate: "2023-06-18", 
              status: "pending" 
            }
          ],
          recentCourses: [
            { 
              id: 1, 
              title: "Advanced Algebra", 
              progress: 65, 
              instructor: "Dr. Smith", 
              lastAccessed: "2 days ago" 
            },
            { 
              id: 2, 
              title: "World History", 
              progress: 42, 
              instructor: "Prof. Johnson", 
              lastAccessed: "1 day ago" 
            },
            { 
              id: 3, 
              title: "Creative Writing", 
              progress: 30, 
              instructor: "Ms. Williams", 
              lastAccessed: "3 days ago" 
            }
          ],
          performanceStats: {
            quizzes: { taken: 12, average: 85 },
            assignments: { submitted: 8, average: 88 },
            participation: 92
          }
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setUserData(mockUserData);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Skeleton */}
            <div className="w-full lg:w-1/4 space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg h-64">
                <Skeleton height={256} />
              </div>
              <div className="bg-white rounded-xl shadow-md p-5 h-48">
                <Skeleton count={5} />
              </div>
              <div className="bg-white rounded-xl shadow-md p-5 h-40">
                <Skeleton count={4} />
              </div>
            </div>
            
            {/* Main Content Skeleton */}
            <div className="w-full lg:w-3/4 space-y-6">
              <div className="bg-white rounded-lg shadow p-6 h-48">
                <Skeleton count={4} />
              </div>
              <div className="bg-white rounded-lg shadow overflow-hidden h-96">
                <Skeleton count={8} />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow">
            <div className="flex items-center">
              <FiAlertCircle className="h-5 w-5 text-red-500 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Error loading dashboard</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!userData) {
    return <div className="flex justify-center items-center h-screen">No data available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Enhanced Sidebar */}
          <div className="w-full lg:w-1/4 space-y-6">
            {/* Profile Card - Enhanced Design */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden"
            >
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
                
                {/* Points with Icon */}
                <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-white">{userData.points.toLocaleString()} Points</span>
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
            </motion.div>

            {/* Quick Progress */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-5"
            >
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
                    <span className="text-gray-600">Quiz Average</span>
                    <span className="font-medium">{userData.performanceStats.quizzes.average}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" 
                      style={{ width: `${userData.performanceStats.quizzes.average}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Participation</span>
                    <span className="font-medium">{userData.performanceStats.participation}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                      style={{ width: `${userData.performanceStats.participation}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-5"
            >
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Actions
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-3 rounded-lg flex flex-col items-center transition-colors"
                >
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-xs font-medium">New Course</span>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 p-3 rounded-lg flex flex-col items-center transition-colors"
                  onClick={() => navigate('/logout')}
                >
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span className="text-xs font-medium">Log Out</span>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-lg flex flex-col items-center transition-colors"
                >
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs font-medium">Calendar</span>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-3 rounded-lg flex flex-col items-center transition-colors"
                >
                  <FiHelpCircle className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">Help</span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:w-3/4 space-y-6">
            {/* Tab Navigation */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-4 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`px-6 py-4 text-sm font-medium ${activeTab === 'courses' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  My Courses
                </button>
                <button
                  onClick={() => setActiveTab('assignments')}
                  className={`px-6 py-4 text-sm font-medium ${activeTab === 'assignments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Assignments
                </button>
                <button
                  onClick={() => setActiveTab('achievements')}
                  className={`px-6 py-4 text-sm font-medium ${activeTab === 'achievements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Achievements
                </button>
              </div>
            </motion.div>

            {activeTab === 'overview' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">Welcome back, {userData.name.split(' ')[0]}! 👋</h2>
                  <p className="text-blue-100 mb-4">Here's what's happening with your learning today.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                      <h3 className="font-bold text-blue-50 mb-1">Courses in Progress</h3>
                      <p className="text-3xl font-bold">{userData.courses.inProgress}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                      <h3 className="font-bold text-blue-50 mb-1">Completed Courses</h3>
                      <p className="text-3xl font-bold">{userData.courses.completed}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                      <h3 className="font-bold text-blue-50 mb-1">Quiz Average</h3>
                      <p className="text-3xl font-bold">{userData.performanceStats.quizzes.average}%</p>
                    </div>
                  </div>
                </div>

                {/* Recent Courses */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-bold flex items-center">
                      <FiBook className="mr-2 text-blue-600" />
                      Recent Courses
                    </h2>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View All
                    </button>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {userData.recentCourses.map(course => (
                      <motion.div 
                        key={course.id}
                        whileHover={{ scale: 1.01 }}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-gray-900">{course.title}</h3>
                          <span className="text-sm text-gray-500">Last accessed: {course.lastAccessed}</span>
                        </div>
                        <div className="mb-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Assignments */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-bold flex items-center">
                      <FiCalendar className="mr-2 text-red-600" />
                      Upcoming Assignments
                    </h2>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View All
                    </button>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {userData.upcomingAssignments.map(assignment => (
                      <div key={assignment.id} className="p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                            <p className="text-sm text-gray-500">{assignment.course}</p>
                          </div>
                          <span className="text-sm font-medium text-gray-600">
                            Due: {formatDate(assignment.dueDate)}
                          </span>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'courses' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h2 className="text-xl font-bold mb-6">My Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userData.recentCourses.map(course => (
                    <motion.div 
                      key={course.id}
                      whileHover={{ y: -5 }}
                      className="border rounded-lg overflow-hidden hover:shadow-lg transition-all"
                    >
                      <div className="h-40 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                        <FiBook className="h-16 w-16 text-white opacity-30" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-1 text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">Instructor: {course.instructor}</p>
                        <div className="mb-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" 
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
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'assignments' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow p-6"
              >
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
                        <motion.tr 
                          key={assignment.id}
                          whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                          className="transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{assignment.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500">{assignment.course}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500">{formatDate(assignment.dueDate)}</div>
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
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'achievements' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h2 className="text-xl font-bold mb-6">Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="border rounded-lg p-4 text-center hover:shadow-md transition-all"
                  >
                    <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiAward className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h3 className="font-bold mb-1">Fast Learner</h3>
                    <p className="text-sm text-gray-600 mb-3">Completed 3 courses in one month</p>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Earned: Jun 5, 2023</span>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="border rounded-lg p-4 text-center hover:shadow-md transition-all"
                  >
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiAward className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-bold mb-1">Quiz Master</h3>
                    <p className="text-sm text-gray-600 mb-3">Scored 90%+ on 5 consecutive quizzes</p>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Earned: May 22, 2023</span>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="border rounded-lg p-4 text-center hover:shadow-md transition-all"
                  >
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiAward className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-bold mb-1">Perfect Attendance</h3>
                    <p className="text-sm text-gray-600 mb-3">Attended all classes for 1 month</p>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Earned: May 15, 2023</span>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="border rounded-lg p-4 text-center hover:shadow-md transition-all"
                  >
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiAward className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold mb-1">Early Bird</h3>
                    <p className="text-sm text-gray-600 mb-3">Submitted 5 assignments early</p>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Earned: Apr 30, 2023</span>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="border rounded-lg p-4 text-center hover:shadow-md transition-all"
                  >
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiAward className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="font-bold mb-1">Discussion Leader</h3>
                    <p className="text-sm text-gray-600 mb-3">Started 10 forum discussions</p>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Earned: Apr 15, 2023</span>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="border rounded-lg p-4 text-center hover:shadow-md transition-all"
                  >
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiAward className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="font-bold mb-1">High Scorer</h3>
                    <p className="text-sm text-gray-600 mb-3">Scored 95%+ on any assignment</p>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Earned: Mar 28, 2023</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;