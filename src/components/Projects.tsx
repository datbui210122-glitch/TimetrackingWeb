import { Plus, MoreVertical, Clock, Users, Calendar, Edit, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { UserProfile } from './UserSwitcher';

interface ProjectsProps {
  currentUser: UserProfile;
}

export function Projects({ currentUser }: ProjectsProps) {
  const [showNewProject, setShowNewProject] = useState(false);
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null);
  const isAdmin = currentUser.role === 'admin';

  // Mock data - In real app, this would filter based on currentUser
  const allProjects = [
    {
      id: 1,
      name: 'VinGroup Marketing',
      client: 'VinGroup',
      totalHours: 124.5,
      thisWeek: 12.5,
      budget: 200,
      color: 'bg-red-500',
      members: ['Quyen', 'Uyen', 'Minh'],
      memberCount: 3,
      deadline: '2025-12-15',
      status: 'active',
      logo: 'figma:asset/7348bf70746461807e4ee30f05d146dfa1975e6f.png',
    },
    {
      id: 2,
      name: 'Viettel Campaign',
      client: 'Viettel',
      totalHours: 89.0,
      thisWeek: 18.0,
      budget: 150,
      color: 'bg-blue-500',
      members: ['Uyen', 'Lan', 'Hung'],
      memberCount: 3,
      deadline: '2025-12-30',
      status: 'active',
      logo: 'figma:asset/1f7d3f9262e8551e153e3bf363be57b533dd60c6.png',
    },
    {
      id: 3,
      name: 'FPT Digital Solutions',
      client: 'FPT Corporation',
      totalHours: 156.5,
      thisWeek: 8.5,
      budget: 300,
      color: 'bg-orange-500',
      members: ['Quyen', 'Minh', 'Thao', 'Nam'],
      memberCount: 4,
      deadline: '2026-01-20',
      status: 'active',
      logo: 'figma:asset/7348bf70746461807e4ee30f05d146dfa1975e6f.png',
    },
    {
      id: 4,
      name: 'Masan Consumer',
      client: 'Masan Group',
      totalHours: 45.0,
      thisWeek: 15.0,
      budget: 250,
      color: 'bg-green-500',
      members: ['Uyen', 'Linh', 'Duc', 'Mai', 'Anh', 'Tuan'],
      memberCount: 6,
      deadline: '2026-02-15',
      status: 'active',
      logo: 'figma:asset/d243e01381b108a08f6b06495cd0ae1bb424e668.png',
    },
    {
      id: 5,
      name: 'Techcombank Rebranding',
      client: 'Techcombank',
      totalHours: 78.0,
      thisWeek: 10.0,
      budget: 180,
      color: 'bg-purple-500',
      members: ['Quyen', 'Hung'],
      memberCount: 2,
      deadline: '2025-12-25',
      status: 'active',
      logo: 'figma:asset/1f7d3f9262e8551e153e3bf363be57b533dd60c6.png',
    },
  ];

  // Filter projects based on user role
  const projects = isAdmin 
    ? allProjects 
    : allProjects.filter(p => p.members.includes(currentUser.name));

  // Calculate team workload for admin
  const employeeWorkload = isAdmin ? [
    { name: 'Quyen', projects: 3, hours: 45, projectNames: ['VinGroup Marketing', 'FPT Digital Solutions', 'Techcombank Rebranding'] },
    { name: 'Uyen', projects: 3, hours: 42, projectNames: ['VinGroup Marketing', 'Viettel Campaign', 'Masan Consumer'] },
    { name: 'Minh', projects: 2, hours: 35, projectNames: ['VinGroup Marketing', 'FPT Digital Solutions'] },
    { name: 'Lan', projects: 1, hours: 18, projectNames: ['Viettel Campaign'] },
    { name: 'Hung', projects: 2, hours: 28, projectNames: ['Viettel Campaign', 'Techcombank Rebranding'] },
    { name: 'Thao', projects: 1, hours: 20, projectNames: ['FPT Digital Solutions'] },
    { name: 'Nam', projects: 1, hours: 22, projectNames: ['FPT Digital Solutions'] },
    { name: 'Linh', projects: 1, hours: 15, projectNames: ['Masan Consumer'] },
    { name: 'Duc', projects: 1, hours: 15, projectNames: ['Masan Consumer'] },
    { name: 'Mai', projects: 1, hours: 12, projectNames: ['Masan Consumer'] },
  ] : [];

  // Categorize employees by workload
  const busyEmployees = employeeWorkload.filter(emp => emp.projects >= 3 || emp.hours >= 40);
  const moderateEmployees = employeeWorkload.filter(emp => (emp.projects === 2 || (emp.hours > 20 && emp.hours < 40)) && emp.projects < 3 && emp.hours < 40);
  const availableEmployees = employeeWorkload.filter(emp => emp.projects <= 1 && emp.hours <= 20);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2">Projects</h1>
          <p className="text-gray-600">
            {isAdmin ? 'Manage and track all company projects' : 'Your assigned projects'}
          </p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => setShowNewProject(true)}
            className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        )}
      </div>

      {isAdmin && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="mb-1">Team Workload Overview</h2>
              <p className="text-sm text-gray-600">Quickly identify team availability for project assignments</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">{availableEmployees.length} Available</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">{moderateEmployees.length} Moderate</span>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full">{busyEmployees.length} Busy</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AVAILABLE Column */}
            <div className="bg-green-50 rounded-xl border-2 border-green-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-green-700">Available</h3>
                <span className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">
                  {availableEmployees.length}
                </span>
              </div>
              <p className="text-xs text-green-700 mb-4">Ready for new assignments</p>
              
              <div className="space-y-3">
                {availableEmployees.map((emp) => (
                  <div key={emp.name} className="bg-white rounded-lg border border-green-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white">
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm">{emp.name}</h4>
                          <p className="text-xs text-gray-500">{emp.hours}h / 40h per week</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setExpandedEmployee(expandedEmployee === emp.name ? null : emp.name)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {expandedEmployee === emp.name ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">{emp.projects} project{emp.projects !== 1 ? 's' : ''}</span>
                        <span className="text-green-600">{Math.round((emp.hours / 40) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min((emp.hours / 40) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {expandedEmployee === emp.name && (
                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-2">Current projects:</p>
                        {emp.projectNames.map((project, idx) => (
                          <div key={idx} className="text-xs text-gray-700 py-1 px-2 bg-gray-50 rounded mb-1">
                            • {project}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* MODERATE Column */}
            <div className="bg-orange-50 rounded-xl border-2 border-orange-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-orange-700">Moderate</h3>
                <span className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm">
                  {moderateEmployees.length}
                </span>
              </div>
              <p className="text-xs text-orange-700 mb-4">Can take light tasks if needed</p>
              
              <div className="space-y-3">
                {moderateEmployees.map((emp) => (
                  <div key={emp.name} className="bg-white rounded-lg border border-orange-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white">
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm">{emp.name}</h4>
                          <p className="text-xs text-gray-500">{emp.hours}h / 40h per week</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setExpandedEmployee(expandedEmployee === emp.name ? null : emp.name)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {expandedEmployee === emp.name ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">{emp.projects} project{emp.projects !== 1 ? 's' : ''}</span>
                        <span className="text-orange-600">{Math.round((emp.hours / 40) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min((emp.hours / 40) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {expandedEmployee === emp.name && (
                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-2">Current projects:</p>
                        {emp.projectNames.map((project, idx) => (
                          <div key={idx} className="text-xs text-gray-700 py-1 px-2 bg-gray-50 rounded mb-1">
                            • {project}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* BUSY Column */}
            <div className="bg-red-50 rounded-xl border-2 border-red-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-red-700">Busy</h3>
                <span className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-sm">
                  {busyEmployees.length}
                </span>
              </div>
              <p className="text-xs text-red-700 mb-4">At capacity - avoid new assignments</p>
              
              <div className="space-y-3">
                {busyEmployees.map((emp) => (
                  <div key={emp.name} className="bg-white rounded-lg border border-red-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center text-white">
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm">{emp.name}</h4>
                          <p className="text-xs text-gray-500">{emp.hours}h / 40h per week</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setExpandedEmployee(expandedEmployee === emp.name ? null : emp.name)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {expandedEmployee === emp.name ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">{emp.projects} project{emp.projects !== 1 ? 's' : ''}</span>
                        <span className="text-red-600">{Math.round((emp.hours / 40) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min((emp.hours / 40) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {expandedEmployee === emp.name && (
                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-2">Current projects:</p>
                        {emp.projectNames.map((project, idx) => (
                          <div key={idx} className="text-xs text-gray-700 py-1 px-2 bg-gray-50 rounded mb-1">
                            • {project}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">i</span>
              </div>
              <div>
                <p className="text-sm text-blue-900 mb-1">Workload Calculation Logic:</p>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>• <span className="font-medium">Available:</span> ≤ 1 project AND ≤ 20h/week - Ready for assignments</p>
                  <p>• <span className="font-medium">Moderate:</span> 2 projects OR 21-39h/week - Can handle light tasks</p>
                  <p>• <span className="font-medium">Busy:</span> ≥ 3 projects OR ≥ 40h/week - At full capacity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 mb-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <img 
                  src={project.logo}
                  alt={project.client}
                  className="w-12 h-12 rounded-lg object-contain bg-white p-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3>{project.name}</h3>
                    {isAdmin && (
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{project.client}</p>
                </div>
              </div>
              {isAdmin && (
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                  <Clock className="w-4 h-4" />
                  Total Hours
                </div>
                <p className="text-gray-900">{project.totalHours}h</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                  <Clock className="w-4 h-4" />
                  This Week
                </div>
                <p className="text-gray-900">{project.thisWeek}h</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                  <Users className="w-4 h-4" />
                  Team Members
                </div>
                <p className="text-gray-900">{project.memberCount}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                  <Calendar className="w-4 h-4" />
                  Deadline
                </div>
                <p className="text-gray-900">{new Date(project.deadline).toLocaleDateString()}</p>
              </div>
            </div>

            {isAdmin && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Team:</p>
                <div className="flex gap-2 flex-wrap">
                  {project.members.map((member, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Budget Progress</span>
                  <span className="text-gray-900">{project.totalHours}h / {project.budget}h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${project.color} h-2 rounded-full transition-all`}
                    style={{ width: `${Math.min((project.totalHours / project.budget) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <span className="ml-4 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                Active
              </span>
            </div>
          </div>
        ))}
      </div>

      {showNewProject && isAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="mb-6">Create New Project</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Project Name</label>
                <input
                  type="text"
                  placeholder="Enter project name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Client</label>
                <input
                  type="text"
                  placeholder="Enter client name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Budget (hours)</label>
                <input
                  type="number"
                  placeholder="200"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Assign Members</label>
                <select 
                  multiple 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {employeeWorkload.map((emp) => (
                    <option key={emp.name} value={emp.name}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Deadline</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewProject(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}