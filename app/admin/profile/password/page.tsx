'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiShield, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';

export default function ChangePasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5;
    return Math.min(strength, 100);
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const getStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* PAGE HEADER */}
      <div className="mb-8">
        <Link
          href="/admin/profile"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <FiArrowLeft className="mr-2" />
          Back to Profile
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Change Password</h1>
        <p className="text-gray-600">Update your security credentials</p>
      </div>

      <div className="bg-white rounded-xl border p-8">
        {/* SECURITY STATUS */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <FiShield className="mr-3 text-green-600" />
              Security Status
            </h2>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold">
              STRONG
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">45</div>
              <div className="text-sm text-gray-500">Days since last change</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">2FA</div>
              <div className="text-sm text-gray-500">Enabled</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-gray-500">Failed attempts</div>
            </div>
          </div>
        </div>

        {/* PASSWORD FORM */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => handleNewPasswordChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <div className="mt-3">
              <div className="flex items-center mb-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getStrengthColor()} transition-all duration-300`}
                    style={{ width: `${passwordStrength}%` }}
                  ></div>
                </div>
                <span className={`ml-3 text-sm font-medium ${
                  passwordStrength < 25 ? 'text-red-600' :
                  passwordStrength < 50 ? 'text-orange-600' :
                  passwordStrength < 75 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {getStrengthText()}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Requirements: 12+ characters, uppercase, lowercase, number, special character
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Re-enter new password"
            />
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
            )}
            {confirmPassword && newPassword === confirmPassword && newPassword && (
              <p className="text-sm text-green-600 mt-1 flex items-center">
                <FiShield className="mr-1" />
                Passwords match
              </p>
            )}
          </div>

          {/* TWO-FACTOR AUTHENTICATION */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold flex items-center">
                  <FiShield className="mr-2 text-blue-600" />
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-500">Extra layer of security</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Enabled
              </span>
            </div>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50">
                View Backup Codes
              </button>
              <button className="w-full px-4 py-3 border border-red-300 text-red-600 rounded-lg text-left hover:bg-red-50">
                Disable 2FA
              </button>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex space-x-4 pt-6">
            <button
              className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword || passwordStrength < 50}
            >
              Update Password
            </button>
            <Link
              href="/admin/profile"
              className="px-6 py-4 border border-gray-300 rounded-xl hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
