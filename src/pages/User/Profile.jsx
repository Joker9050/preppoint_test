import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../componets/Navbar';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = () => {
      try {
        setLoading(true);

        // Static mock data
        const mockUserData = {
          name: "Alex Johnson",
          email: "alex.johnson@example.com",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          joined: "January 2023",
          points: 1250,
          streaks: 7,
          rank: "Gold Scholar",
          subjects: {
            enrolled: 5,
            completed: 2,
            inProgress: 3
          },
          courses: [
            { title: "Advanced Algebra", progress: 65 },
            { title: "World History", progress: 42 },
            { title: "Creative Writing", progress: 30 }
          ],
          performanceStats: {
            quizzes: { taken: 12, average: 85 },
            assignments: { submitted: 8, average: 88 },
            participation: 92
          }
        };

        // Simulate loading delay
        setTimeout(() => {
          setUserData(mockUserData);
          setLoading(false);
        }, 800);

      } catch (err) {
        setError("Failed to load profile data. Please try again later.");
        console.error("Error loading data:", err);
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <Skeleton height={200} />
            <div className="mt-6">
              <Skeleton count={5} />
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
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading profile</h3>
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
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={userData.avatar}
                alt="User avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold">{userData.name}</h1>
                <p className="text-blue-100">{userData.email}</p>
                <p className="mt-2 text-sm text-blue-200">Member since {userData.joined}</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{userData.points.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Points Earned</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{userData.subjects.completed}</div>
                <div className="text-sm text-gray-600">Subjects Completed</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">{userData.performanceStats.quizzes.average}%</div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
            </div>

            {/* Enrolled Subjects */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Enrolled Subjects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.courses.map((course, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">{course.title}</h4>
                      <span className="text-sm font-medium text-gray-600">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Stats */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Performance Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{userData.performanceStats.quizzes.taken}</div>
                  <div className="text-sm text-gray-600">Quizzes Taken</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{userData.performanceStats.assignments.submitted}</div>
                  <div className="text-sm text-gray-600">Assignments Submitted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{userData.performanceStats.participation}%</div>
                  <div className="text-sm text-gray-600">Participation Rate</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate('/logout')}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
