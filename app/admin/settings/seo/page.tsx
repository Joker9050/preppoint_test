'use client';

import { useState } from 'react';
import {
  FiTarget,
  FiActivity,
  FiFileText,
  FiSend,
  FiLink2,
  FiGlobe,
  FiCode,
  FiTrendingUp,
  FiServer,
  FiUsers,
  FiCheck,
  FiAlertCircle,
  FiZap,
  FiCheckCircle,
  FiAlertTriangle,
  FiEye,
  FiRefreshCw
} from 'react-icons/fi';

export default function SEOCommandCenter() {
  const [activeMission, setActiveMission] = useState('dashboard');
  const [seoAlerts, setSeoAlerts] = useState([]);
  const [rankingData, setRankingData] = useState({});

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* MISSION CONTROL HEADER */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center">
                <FiTarget className="text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">SEO COMMAND CENTER</h1>
                <p className="text-blue-200 mt-2">Command how Google sees PrepPoint. Dominate search results.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-blue-800/50 rounded-lg px-4 py-3">
                <div className="text-sm text-blue-300">Total Indexed</div>
                <div className="text-2xl font-bold">4,250 Pages</div>
              </div>
              <div className="bg-green-800/50 rounded-lg px-4 py-3">
                <div className="text-sm text-green-300">Top 3 Rankings</div>
                <div className="text-2xl font-bold">156 Keywords</div>
              </div>
              <div className="bg-purple-800/50 rounded-lg px-4 py-3">
                <div className="text-sm text-purple-300">Monthly Traffic</div>
                <div className="text-2xl font-bold">45K+ Clicks</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-5xl font-bold">87</div>
                <div className="text-sm text-blue-300">SEO Score</div>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-48 h-3 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-green-600" style={{ width: '87%' }}></div>
                  </div>
                  <span className="ml-3 text-green-400">↑ 12% this month</span>
                </div>
                <button className="w-full mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg">
                  <FiAlertTriangle className="inline mr-2" />
                  EMERGENCY AUDIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BATTLEFIELD TABS */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
        <div className="flex overflow-x-auto border-b">
          {[
            { id: 'dashboard', label: 'Command Dashboard', icon: <FiActivity /> },
            { id: 'templates', label: 'War Room Templates', icon: <FiFileText /> },
            { id: 'sitemap', label: 'Sitemap Deployment', icon: <FiSend /> },
            { id: 'urls', label: 'URL Warfare', icon: <FiLink2 /> },
            { id: 'google', label: 'Google Console', icon: <FiGlobe /> },
            { id: 'schema', label: 'Schema Weapons', icon: <FiCode /> },
            { id: 'campaigns', label: 'Battle Plans', icon: <FiTarget /> },
            { id: 'competitors', label: 'Enemy Intel', icon: <FiEye /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMission(tab.id)}
              className={`flex items-center px-8 py-4 border-b-2 font-semibold whitespace-nowrap ${
                activeMission === tab.id
                  ? 'border-red-600 text-red-600 bg-red-50'
                  : 'border-transparent text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-3">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* COMMAND DASHBOARD */}
        {activeMission === 'dashboard' && (
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* LIVE RANKINGS */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center">
                    <FiTrendingUp className="mr-3 text-green-600" />
                    LIVE RANKING BATTLEFIELD
                  </h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                    15 Keywords in TOP 3
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    { keyword: 'SSC CGL previous year paper', rank: 3, change: '↑2', traffic: '12,400/mo', importance: 'CRITICAL' },
                    { keyword: 'Banking exam preparation online free', rank: 5, change: '↑1', traffic: '8,200/mo', importance: 'HIGH' },
                    { keyword: 'UPSC MCQ questions with answers', rank: 8, change: '↓1', traffic: '6,500/mo', importance: 'HIGH' },
                    { keyword: 'Government job notification 2024', rank: 12, change: '↑3', traffic: '15,000/mo', importance: 'CRITICAL' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 border">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              item.importance === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                              item.importance === 'HIGH' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {item.importance}
                            </span>
                            <span className="font-medium">{item.keyword}</span>
                          </div>
                          <div className="text-sm text-gray-600 mt-2">Traffic: {item.traffic}</div>
                        </div>

                        <div className="text-center">
                          <div className="text-3xl font-bold">{item.rank}</div>
                          <div className={`text-sm font-semibold ${
                            item.change.startsWith('↑') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {item.change}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* GOOGLE CRAWL HEALTH */}
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <FiServer className="mr-3 text-blue-600" />
                  GOOGLEBOT HEALTH
                </h3>

                <div className="space-y-6">
                  {[
                    { metric: 'Indexed Pages', value: '4,250/4,500', status: 'optimal', color: 'green' },
                    { metric: 'Crawl Budget Used', value: '78%', status: 'good', color: 'green' },
                    { metric: 'Last Googlebot Visit', value: '2 hours ago', status: 'active', color: 'blue' },
                    { metric: 'Crawl Errors', value: '12', status: 'warning', color: 'yellow' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white border rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{item.metric}</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold bg-${item.color}-100 text-${item.color}-800`}>
                          {item.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-2xl font-bold">{item.value}</div>
                      {item.metric === 'Crawl Errors' && (
                        <button className="mt-3 text-sm text-red-600 font-semibold hover:text-red-800">
                          <FiAlertCircle className="inline mr-1" />
                          FIX NOW
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* COMPETITOR WAR ROOM */}
            <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <FiUsers className="mr-3 text-red-600" />
                ENEMY TERRITORY - COMPETITOR ANALYSIS
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: 'SarkariResult.com',
                    strength: 'Job speed: 5 minutes after notification',
                    weakness: 'Poor study material quality',
                    ourAdvantage: 'Better MCQs + Same job speed',
                    threatLevel: 'HIGH'
                  },
                  {
                    name: 'Byju\'s',
                    strength: 'Massive budget, brand recognition',
                    weakness: 'Expensive, not focused on govt jobs',
                    ourAdvantage: 'Free + Govt job focused',
                    threatLevel: 'MEDIUM'
                  },
                  {
                    name: 'Testbook',
                    strength: 'Good mock test platform',
                    weakness: 'Slow job updates',
                    ourAdvantage: 'Faster job notifications',
                    threatLevel: 'MEDIUM'
                  }
                ].map((competitor, index) => (
                  <div key={index} className="bg-white border border-red-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-lg">{competitor.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        competitor.threatLevel === 'HIGH' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {competitor.threatLevel} THREAT
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Enemy Strength</div>
                        <div className="font-medium">{competitor.strength}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Their Weakness</div>
                        <div className="font-medium">{competitor.weakness}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Our Attack Plan</div>
                        <div className="font-medium text-green-700">{competitor.ourAdvantage}</div>
                      </div>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg">
                      <FiTarget className="inline mr-2" />
                      DEPLOY COUNTER-ATTACK
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WAR ROOM TEMPLATES */}
        {activeMission === 'templates' && (
          <div className="p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">SEO WAR ROOM TEMPLATES</h3>
              <p className="text-gray-600">Every page is a soldier. Equip them with perfect SEO weapons.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                {
                  type: 'JOB NOTIFICATIONS',
                  mission: 'DOMINATE Government Job Search',
                  template: {
                    title: '{Post} {Year} Recruitment Notification | {Organization} | Apply Online',
                    meta: '{Organization} {Post} {Year}: {Vacancy} vacancies. Eligibility: {AgeLimit}, {Qualification}. Last Date: {LastDate}.',
                    schema: 'JobPosting'
                  },
                  targets: [
                    'Rank #1 for {Organization} {Post}',
                    'Appear in Google Jobs',
                    '10,000+ applications per notification'
                  ]
                },
                {
                  type: 'MCQ PAGES',
                  mission: 'OWN "Exam MCQ" Searches',
                  template: {
                    title: '{Count} {Topic} MCQ Questions with Answers {Year} | {Subject}',
                    meta: 'Practice {Count} {Topic} MCQ questions for {ExamList}. Includes explanations, solutions.',
                    schema: 'QAPage'
                  },
                  targets: [
                    'Featured snippet for answers',
                    '80%+ click-through rate',
                    'Backlinks from coaching sites'
                  ]
                }
              ].map((template, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="px-4 py-2 bg-blue-600 text-white font-bold rounded-full">
                        {template.type}
                      </span>
                      <h4 className="text-xl font-bold mt-3">{template.mission}</h4>
                    </div>
                    <FiTarget className="text-3xl text-blue-600" />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">TITLE TEMPLATE</div>
                      <div className="bg-white border-2 border-blue-300 rounded-xl p-4 font-mono">
                        {template.template.title}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">META DESCRIPTION</div>
                      <div className="bg-white border-2 border-blue-300 rounded-xl p-4 font-mono">
                        {template.template.meta}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">DEPLOYMENT TARGETS</div>
                      <div className="space-y-2">
                        {template.targets.map((target, i) => (
                          <div key={i} className="flex items-center">
                            <FiCheck className="text-green-600 mr-3" />
                            <span>{target}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl">
                      <FiZap className="inline mr-2" />
                      DEPLOY THIS TEMPLATE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SITEMAP DEPLOYMENT */}
        {activeMission === 'sitemap' && (
          <div className="p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">SITEMAP DEPLOYMENT SYSTEM</h3>
              <p className="text-gray-600">Flood Google with perfectly structured content. Control the crawl.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {[
                {
                  name: 'URGENT_SITEMAP.xml',
                  priority: 'CRITICAL',
                  content: 'New job notifications',
                  frequency: 'Every 15 minutes',
                  urls: '850',
                  action: 'DEPLOY NOW'
                },
                {
                  name: 'DAILY_SITEMAP.xml',
                  priority: 'HIGH',
                  content: 'MCQs, Mock Tests',
                  frequency: 'Daily 3 AM',
                  urls: '3,200',
                  action: 'SCHEDULE'
                },
                {
                  name: 'BULK_SITEMAP.xml',
                  priority: 'NORMAL',
                  content: 'Archive content',
                  frequency: 'Weekly',
                  urls: '450',
                  action: 'MONITOR'
                }
              ].map((sitemap, index) => (
                <div key={index} className={`border-2 rounded-2xl p-6 ${
                  sitemap.priority === 'CRITICAL' ? 'border-red-300 bg-red-50' :
                  sitemap.priority === 'HIGH' ? 'border-yellow-300 bg-yellow-50' :
                  'border-blue-300 bg-blue-50'
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-mono font-bold text-lg">{sitemap.name}</div>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        sitemap.priority === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                        sitemap.priority === 'HIGH' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {sitemap.priority} PRIORITY
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{sitemap.urls}</div>
                      <div className="text-sm text-gray-600">URLs</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <div className="text-sm text-gray-600">Content</div>
                      <div className="font-medium">{sitemap.content}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Frequency</div>
                      <div className="font-medium">{sitemap.frequency}</div>
                    </div>
                  </div>

                  <button className={`w-full px-4 py-3 font-bold rounded-xl ${
                    sitemap.priority === 'CRITICAL' ? 'bg-red-600 hover:bg-red-700 text-white' :
                    sitemap.priority === 'HIGH' ? 'bg-yellow-600 hover:bg-yellow-700 text-white' :
                    'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}>
                    <FiSend className="inline mr-2" />
                    {sitemap.action}
                  </button>
                </div>
              ))}
            </div>

            {/* EMERGENCY DEPLOYMENT */}
            <div className="bg-gradient-to-r from-red-900 to-orange-900 text-white rounded-2xl p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-bold mb-3">EMERGENCY DEPLOYMENT</h4>
                  <p>New job notification detected. Deploy to Google NOW.</p>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-80">Time since notification</div>
                  <div className="text-4xl font-bold">00:47</div>
                  <div className="text-sm">minutes:seconds</div>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button className="flex-1 px-6 py-4 bg-green-600 hover:bg-green-700 font-bold rounded-xl">
                  <FiCheckCircle className="inline mr-3" />
                  DEPLOY TO GOOGLE NOW
                </button>
                <button className="flex-1 px-6 py-4 bg-white text-red-900 hover:bg-gray-100 font-bold rounded-xl">
                  <FiAlertTriangle className="inline mr-3" />
                  EMERGENCY AUDIT FIRST
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* QUICK COMMANDS */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
        <h3 className="text-xl font-bold mb-6">QUICK COMMANDS</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-red-50 border-2 border-red-200 rounded-xl hover:border-red-300">
            <div className="text-red-600 font-bold mb-2">FORCE CRAWL</div>
            <div className="text-sm text-gray-600">Make Google crawl now</div>
          </button>
          <button className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl hover:border-blue-300">
            <div className="text-blue-600 font-bold mb-2">INDEX CHECK</div>
            <div className="text-sm text-gray-600">Check 100 URLs</div>
          </button>
          <button className="p-4 bg-green-50 border-2 border-green-200 rounded-xl hover:border-green-300">
            <div className="text-green-600 font-bold mb-2">SPEED TEST</div>
            <div className="text-sm text-gray-600">Core Web Vitals</div>
          </button>
          <button className="p-4 bg-purple-50 border-2 border-purple-200 rounded-xl hover:border-purple-300">
            <div className="text-purple-600 font-bold mb-2">COMPETITOR SPY</div>
            <div className="text-sm text-gray-600">Analyze enemy</div>
          </button>
        </div>
      </div>
    </div>
  );
}
