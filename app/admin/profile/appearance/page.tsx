'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiSun, FiMoon, FiMonitor, FiLayout, FiType, FiArrowLeft } from 'react-icons/fi';

export default function AppearancePage() {
  const [theme, setTheme] = useState('light');
  const [density, setDensity] = useState('comfortable');
  const [fontSize, setFontSize] = useState('medium');
  const [accentColor, setAccentColor] = useState('blue');
  const [keyboardShortcuts, setKeyboardShortcuts] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const themeOptions = [
    {
      id: 'light',
      label: 'Light',
      description: 'Bright and clean interface',
      icon: <FiSun className="text-yellow-600" />,
      preview: 'bg-white border-gray-200'
    },
    {
      id: 'dark',
      label: 'Dark',
      description: 'Easy on the eyes in low light',
      icon: <FiMoon className="text-blue-600" />,
      preview: 'bg-gray-900 border-gray-700'
    },
    {
      id: 'auto',
      label: 'Auto',
      description: 'Follows your system preference',
      icon: <FiMonitor className="text-purple-600" />,
      preview: 'bg-gradient-to-r from-white to-gray-100 border-gray-200'
    }
  ];

  const densityOptions = [
    {
      id: 'comfortable',
      label: 'Comfortable',
      description: 'More spacing and padding',
      icon: <FiLayout className="text-green-600" />
    },
    {
      id: 'compact',
      label: 'Compact',
      description: 'Less spacing, more content',
      icon: <FiLayout className="text-orange-600" />
    }
  ];

  const fontSizeOptions = [
    {
      id: 'small',
      label: 'Small',
      description: 'Compact text size'
    },
    {
      id: 'medium',
      label: 'Medium',
      description: 'Balanced readability'
    },
    {
      id: 'large',
      label: 'Large',
      description: 'Enhanced readability'
    }
  ];

  const accentColors = [
    { id: 'blue', color: '#3B82F6', bg: 'bg-blue-500' },
    { id: 'green', color: '#10B981', bg: 'bg-green-500' },
    { id: 'purple', color: '#8B5CF6', bg: 'bg-purple-500' },
    { id: 'red', color: '#EF4444', bg: 'bg-red-500' }
  ];

  const resetToDefaults = () => {
    setTheme('light');
    setDensity('comfortable');
    setFontSize('medium');
    setAccentColor('blue');
    setKeyboardShortcuts(true);
    setReducedMotion(false);
  };

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Appearance</h1>
        <p className="text-gray-600">Customize how the admin panel looks and feels</p>
      </div>

      <div className="space-y-8">
        {/* THEME SELECTION */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <FiSun className="mr-3 text-yellow-600" />
            Theme
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themeOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setTheme(option.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  theme === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                    {option.icon}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                </div>
                <div className={`w-full h-12 rounded border ${option.preview} flex items-center justify-center`}>
                  <div className="text-xs text-gray-600">Preview</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LAYOUT DENSITY */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <FiLayout className="mr-3 text-green-600" />
            Layout Density
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {densityOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setDensity(option.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  density === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                    {option.icon}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FONT SIZE */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <FiType className="mr-3 text-blue-600" />
            Font Size
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fontSizeOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setFontSize(option.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  fontSize === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="font-medium text-gray-900 mb-2">{option.label}</div>
                  <div className="text-sm text-gray-500 mb-3">{option.description}</div>
                  <div className={`text-${option.id === 'small' ? 'sm' : option.id === 'large' ? 'lg' : 'base'} font-medium text-gray-900`}>
                    Sample Text
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACCENT COLOR */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-bold mb-6">Accent Color</h2>
          <div className="grid grid-cols-4 gap-4">
            {accentColors.map((color) => (
              <div
                key={color.id}
                onClick={() => setAccentColor(color.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  accentColor === color.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className={`w-8 h-8 rounded-full ${color.bg} mx-auto mb-2`}></div>
                  <div className="font-medium text-gray-900 capitalize">{color.id}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACCESSIBILITY */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-bold mb-6">Accessibility</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Keyboard Shortcuts</div>
                <div className="text-sm text-gray-500">Enable keyboard navigation shortcuts</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={keyboardShortcuts}
                  onChange={(e) => setKeyboardShortcuts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Reduced Motion</div>
                <div className="text-sm text-gray-500">Minimize animations and transitions</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={(e) => setReducedMotion(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between">
          <button
            onClick={resetToDefaults}
            className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
          >
            Reset to Defaults
          </button>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl">
            Save Appearance Settings
          </button>
        </div>
      </div>
    </div>
  );
}
