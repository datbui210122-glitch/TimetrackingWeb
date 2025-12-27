import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Download, Calendar, TrendingUp, Clock, CheckCircle, X, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export function Reporting() {
  const [showExportModal, setShowExportModal] = useState(false);

  const weeklyData = [
    { day: 'Mon', hours: 7.5 },
    { day: 'Tue', hours: 8.2 },
    { day: 'Wed', hours: 6.5 },
    { day: 'Thu', hours: 8.0 },
    { day: 'Fri', hours: 7.8 },
    { day: 'Sat', hours: 3.0 },
    { day: 'Sun', hours: 0 },
  ];

  const projectDistribution = [
    { name: 'Write & Pen', hours: 45, color: '#f97316' },
    { name: 'Design System', hours: 32, color: '#3b82f6' },
    { name: 'Website Redesign', hours: 28, color: '#a855f7' },
    { name: 'Mobile App', hours: 20, color: '#22c55e' },
  ];

  const monthlyTrend = [
    { month: 'Jul', hours: 142 },
    { month: 'Aug', hours: 156 },
    { month: 'Sep', hours: 148 },
    { month: 'Oct', hours: 168 },
    { month: 'Nov', hours: 178 },
    { month: 'Dec', hours: 95 },
  ];

  const stats = [
    { label: 'Total Hours This Month', value: '95.5h', change: '+12%', trend: 'up', icon: Clock, color: 'orange' },
    { label: 'Average Daily Hours', value: '6.8h', change: '+5%', trend: 'up', icon: TrendingUp, color: 'blue' },
    { label: 'Active Projects', value: '4', change: '+1', trend: 'up', icon: Calendar, color: 'purple' },
    { label: 'Tasks Completed', value: '23', change: '+8', trend: 'up', icon: CheckCircle, color: 'green' },
  ];

  const topProjects = [
    { name: 'Write & Pen', hours: 45, budget: 60, progress: 75 },
    { name: 'Design System', hours: 32, budget: 50, progress: 64 },
    { name: 'Website Redesign', hours: 28, budget: 40, progress: 70 },
    { name: 'Mobile App', hours: 20, budget: 80, progress: 25 },
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case 'orange':
        return 'bg-orange-100 text-orange-500';
      case 'blue':
        return 'bg-blue-100 text-blue-500';
      case 'purple':
        return 'bg-purple-100 text-purple-500';
      case 'green':
        return 'bg-green-100 text-green-500';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2">Reporting & Analytics</h1>
          <p className="text-gray-600">Track your productivity and project insights</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-5 h-5" />
            Last 30 Days
          </button>
          <button 
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClass(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h2>{stat.value}</h2>
                <div className="flex items-center gap-1 text-green-500 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="mb-6">Weekly Time Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="hours" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="mb-6">Project Time Distribution</h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${percent !== undefined ? (percent * 100).toFixed(0) : 'N/A'}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="hours"
                >
                  {projectDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="mb-6">Monthly Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="hours" 
                stroke="#f97316" 
                strokeWidth={3}
                dot={{ fill: '#f97316', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="mb-6">Top Projects by Hours</h2>
          <div className="space-y-4">
            {topProjects.map((project, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: projectDistribution[index]?.color }}></div>
                    <span className="text-sm">{project.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{project.hours}h / {project.budget}h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all"
                    style={{ 
                      width: `${project.progress}%`,
                      backgroundColor: projectDistribution[index]?.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Export Report Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="mb-1">Export Report - December 2024</h2>
                <p className="text-sm text-gray-600">Time Tracking Report for The Marketing House - Vietnam</p>
              </div>
              <button 
                onClick={() => setShowExportModal(false)}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Report Summary */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
                <h3 className="mb-4 text-orange-900">Report Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-orange-700 mb-1">Total Hours This Month</p>
                    <p className="text-orange-900">95.5 hours</p>
                  </div>
                  <div>
                    <p className="text-sm text-orange-700 mb-1">Tasks Completed</p>
                    <p className="text-orange-900">23 tasks</p>
                  </div>
                  <div>
                    <p className="text-sm text-orange-700 mb-1">Active Projects</p>
                    <p className="text-orange-900">4 projects</p>
                  </div>
                  <div>
                    <p className="text-sm text-orange-700 mb-1">Average Daily</p>
                    <p className="text-orange-900">6.8 hours</p>
                  </div>
                </div>
              </div>

              {/* Project Breakdown */}
              <div>
                <h3 className="mb-3">Project Time Breakdown</h3>
                <div className="space-y-3">
                  {topProjects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: projectDistribution[index]?.color }}
                        ></div>
                        <span className="text-sm">{project.name}</span>
                      </div>
                      <span className="text-sm">{project.hours} hours</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Sheet Link */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="mb-3 text-blue-900">Access Full Report</h3>
                <p className="text-sm text-blue-700 mb-4">
                  View and download the complete time tracking report in Google Sheets with detailed breakdowns, charts, and analytics.
                </p>
                <a
                  href="https://docs.google.com/spreadsheets/d/1JRJqef3u-I25iHRz00732mZZ_5XxrL896cJfoAIeHas/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Open in Google Sheets
                </a>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs text-gray-500 text-center">
                  The Marketing House - Vietnam | DREAM.THINK.DO | Generated on Dec 24, 2024
                </p>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}