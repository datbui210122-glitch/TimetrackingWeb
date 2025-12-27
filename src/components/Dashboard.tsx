import { Clock, Calendar, TrendingUp, Users, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { UserProfile } from './UserSwitcher.jsx';

interface DashboardProps {
  currentUser: UserProfile;
}

export function Dashboard({ currentUser }: DashboardProps) {
  const isAdmin = currentUser.role === 'admin';

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

  // Admin view - Team overview
  const teamStats = [
    { name: 'Quyen', productivity: 112, overspent: 8, onTrack: 15 },
    { name: 'Uyen', productivity: 95, overspent: 12, onTrack: 10 },
    { name: 'Minh', productivity: 105, overspent: 5, onTrack: 12 },
    { name: 'Lan', productivity: 88, overspent: 15, onTrack: 8 },
    { name: 'Hung', productivity: 110, overspent: 3, onTrack: 14 },
  ];

  const employeeStats = [
    { label: 'My Productivity', value: '95%', change: '+5%', icon: TrendingUp, color: 'green' },
    { label: 'Tasks Completed', value: '23', change: '+8', icon: CheckCircle2, color: 'blue' },
    { label: 'Productive Tasks', value: '18', change: '+3', icon: CheckCircle2, color: 'green' },
    { label: 'Overspent Tasks', value: '5', change: '-2', icon: AlertTriangle, color: 'orange' },
  ];

  const adminStats = [
    { label: 'Total Team Hours', value: '425h', change: '+12%', icon: Clock, color: 'orange' },
    { label: 'Active Employees', value: '10', change: '0', icon: Users, color: 'blue' },
    { label: 'Team Productivity', value: '102%', change: '+7%', icon: TrendingUp, color: 'green' },
    { label: 'Projects On Track', value: '4/5', change: '+1', icon: CheckCircle2, color: 'purple' },
  ];

  const stats = isAdmin ? adminStats : employeeStats;

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
      <div className="mb-8">
        <h1 className="mb-2">{isAdmin ? 'TEAM DASHBOARD' : 'MY DASHBOARD'}</h1>
        <p className="text-gray-600">
          {isAdmin ? 'Overview of team performance and projects' : 'Your personal performance metrics'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
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
                <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
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
          <h2 className="mb-6">{isAdmin ? 'Team' : 'My'} Weekly Time Distribution</h2>
          <ResponsiveContainer width="100%" height={280}>
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
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={projectDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={90}
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

      {isAdmin && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="mb-6">Team Performance Overview</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">Employee</th>
                  <th className="text-center py-3 px-4">Productivity Score</th>
                  <th className="text-center py-3 px-4">Productive Tasks</th>
                  <th className="text-center py-3 px-4">Overspent Tasks</th>
                  <th className="text-center py-3 px-4">On Track</th>
                </tr>
              </thead>
              <tbody>
                {teamStats.map((member, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm">
                          {member.name.charAt(0)}
                        </div>
                        <span>{member.name}</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        member.productivity >= 100 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {member.productivity}%
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="text-green-600">{member.productivity >= 100 ? Math.floor(member.productivity / 5) : Math.floor(member.productivity / 6)}</span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="text-orange-600">{member.overspent}</span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="text-blue-600">{member.onTrack}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!isAdmin && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="mb-6">My Task Performance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                  <div>
                    <h4 className="text-green-700">Productive Tasks</h4>
                    <p className="text-sm text-green-600">Completed before deadline</p>
                  </div>
                </div>
                <span className="text-2xl text-green-700">18</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-orange-500" />
                  <div>
                    <h4 className="text-orange-700">Overspent Tasks</h4>
                    <p className="text-sm text-orange-600">Exceeded time estimate</p>
                  </div>
                </div>
                <span className="text-2xl text-orange-700">5</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="mb-6">Recent Achievements</h2>
            <div className="space-y-4">
              <div className="flex gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm">Completed "Website Redesign" 2 days early</p>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
              </div>
              <div className="flex gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm">Achieved 110% productivity this week</p>
                  <span className="text-xs text-gray-500">1 week ago</span>
                </div>
              </div>
              <div className="flex gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm">Logged consistent 8+ hours for 5 days</p>
                  <span className="text-xs text-gray-500">1 week ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}