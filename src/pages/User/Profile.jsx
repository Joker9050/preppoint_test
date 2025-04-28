import React from "react";

const Profile = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-md">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.avatar}
          alt="User avatar"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />

        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="mt-2 text-sm text-gray-500">Member since {user.joined}</p>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      <div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Enrolled Courses</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          {user.courses.length > 0 ? (
            user.courses.map((course, index) => (
              <li key={index}>
                <span className="font-medium">{course.title}</span> – {course.progress}% complete
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">No courses enrolled yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
