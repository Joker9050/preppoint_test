'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiBell, FiMail, FiSmartphone, FiMonitor, FiArrowLeft, FiClock } from 'react-icons/fi';

interface NotificationSetting {
  key: string;
  label: string;
  description: string;
  email: boolean;
  push: boolean;
  inApp: boolean;
  frequency: string;
}

interface NotificationCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  settings: NotificationSetting[];
}

export default function NotificationsPage() {
  const [notificationSettings, setNotificationSettings] = useState({
    // Content Alerts
    newDraftsWaiting: { email: true, push: true, inApp: true, frequency: 'immediate' },
    mcqModerationRequests: { email: false, push: true, inApp: true, frequency: 'daily' },
    jobUpdateApprovals: { email: true, push: false, inApp: true, frequency: 'immediate' },

    // System Alerts
    automationFailures: { email: true, push: true, inApp: true, frequency: 'immediate' },
    securityWarnings: { email: true, push: true, inApp: true, frequency: 'immediate' },
    systemMaintenance: { email: true, push: false, inApp: true, frequency: '24hours' },

    // User Activity
    userReports: { email: false, push: false, inApp: true, frequency: 'realtime' },
    feedbackSubmissions: { email: false, push: false, inApp: true, frequency: 'daily' }
  });

  const [deliverySettings, setDeliverySettings] = useState({
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '07:00',
      exception: 'critical'
    },
    emailDigest: {
      enabled: true,
      time: '09:00',
      content: 'summary'
    },
    pushSounds: {
      enabled: false,
      sound: 'default'
    }
  });

  const updateNotificationSetting = (key: string, field: string, value: any) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: {
        ...prev[key as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const updateDeliverySetting = (category: string, field: string, value: any) => {
    setDeliverySettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const notificationCategories: NotificationCategory[] = [
    {
      title: 'Content Alerts',
      description: 'Content-related notifications',
      icon: <FiMail className="text-blue-600" />,
      settings: [
        {
          key: 'newDraftsWaiting',
          label: 'New Drafts Waiting',
          description: 'When new content drafts need approval',
          ...notificationSettings.newDraftsWaiting
        },
        {
          key: 'mcqModerationRequests',
          label: 'MCQ Moderation Requests',
          description: 'Questions requiring content review',
          ...notificationSettings.mcqModerationRequests
        },
        {
          key: 'jobUpdateApprovals',
          label: 'Job Update Approvals',
          description: 'Job posting changes needing approval',
          ...notificationSettings.jobUpdateApprovals
        }
      ]
    },
    {
      title: 'System Alerts',
      description: 'Platform & security notifications',
      icon: <FiMonitor className="text-red-600" />,
      settings: [
        {
          key: 'automationFailures',
          label: 'Automation Failures',
          description: 'When automated processes fail',
          ...notificationSettings.automationFailures
        },
        {
          key: 'securityWarnings',
          label: 'Security Warnings',
          description: 'Security-related alerts and warnings',
          ...notificationSettings.securityWarnings
        },
        {
          key: 'systemMaintenance',
          label: 'System Maintenance',
          description: 'Scheduled maintenance notifications',
          ...notificationSettings.systemMaintenance
        }
      ]
    },
    {
      title: 'User Activity',
      description: 'User-related notifications',
      icon: <FiSmartphone className="text-green-600" />,
      settings: [
        {
          key: 'userReports',
          label: 'User Reports',
          description: 'User-submitted reports and issues',
          ...notificationSettings.userReports
        },
        {
          key: 'feedbackSubmissions',
          label: 'Feedback Submissions',
          description: 'User feedback and suggestions',
          ...notificationSettings.feedbackSubmissions
        }
      ]
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* PAGE HEADER */}
      <div className="mb-8">
        <Link
          href="/admin/profile"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <FiArrowLeft className="mr-2" />
          Back to Profile
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
        <p className="text-gray-600">Control what alerts you receive</p>
      </div>

      <div className="space-y-8">
        {/* NOTIFICATION CATEGORIES */}
        {notificationCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white rounded-xl border p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
                {category.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>

            <div className="space-y-6">
              {category.settings.map((setting, settingIndex) => (
                <div key={settingIndex} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{setting.label}</h3>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                    </div>
                    <div className="flex items-center space-x-4 ml-4">
                      <div className="flex items-center space-x-2">
                        <FiMail className="text-gray-400" size={16} />
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={setting.email}
                            onChange={(e) => updateNotificationSetting(setting.key, 'email', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiSmartphone className="text-gray-400" size={16} />
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={setting.push}
                            onChange={(e) => updateNotificationSetting(setting.key, 'push', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiMonitor className="text-gray-400" size={16} />
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={setting.inApp}
                            onChange={(e) => updateNotificationSetting(setting.key, 'inApp', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Frequency:</span>
                    <select
                      value={setting.frequency}
                      onChange={(e) => updateNotificationSetting(setting.key, 'frequency', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="immediate">Immediate</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="realtime">Real-time</option>
                      <option value="24hours">24 hours before</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* DELIVERY SETTINGS */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mr-4">
              <FiBell className="text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Delivery Settings</h2>
              <p className="text-gray-600">Configure how and when you receive notifications</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* QUIET HOURS */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">Quiet Hours</h3>
                  <p className="text-sm text-gray-500">Pause notifications during specified hours</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deliverySettings.quietHours.enabled}
                    onChange={(e) => updateDeliverySetting('quietHours', 'enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {deliverySettings.quietHours.enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <input
                      type="time"
                      value={deliverySettings.quietHours.start}
                      onChange={(e) => updateDeliverySetting('quietHours', 'start', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <input
                      type="time"
                      value={deliverySettings.quietHours.end}
                      onChange={(e) => updateDeliverySetting('quietHours', 'end', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* EMAIL DIGEST */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">Email Digest</h3>
                  <p className="text-sm text-gray-500">Daily summary of non-critical notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deliverySettings.emailDigest.enabled}
                    onChange={(e) => updateDeliverySetting('emailDigest', 'enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {deliverySettings.emailDigest.enabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
                  <input
                    type="time"
                    value={deliverySettings.emailDigest.time}
                    onChange={(e) => updateDeliverySetting('emailDigest', 'time', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            {/* PUSH NOTIFICATION SOUNDS */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">Push Notification Sounds</h3>
                  <p className="text-sm text-gray-500">Play sound for push notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deliverySettings.pushSounds.enabled}
                    onChange={(e) => updateDeliverySetting('pushSounds', 'enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {deliverySettings.pushSounds.enabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sound</label>
                  <select
                    value={deliverySettings.pushSounds.sound}
                    onChange={(e) => updateDeliverySetting('pushSounds', 'sound', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="default">Default</option>
                    <option value="bell">Bell</option>
                    <option value="chime">Chime</option>
                    <option value="notification">Notification</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl">
            Save Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
}
