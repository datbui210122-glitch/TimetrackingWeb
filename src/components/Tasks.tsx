import { Plus, MoreVertical, Clock, Flag, Play, Pause, Square, Edit, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FloatingTimer } from './FloatingTimer';
import { UserProfile } from './UserSwitcher';

interface TasksProps {
  currentUser: UserProfile;
}

export function Tasks({ currentUser }: TasksProps) {
  const [filter, setFilter] = useState('all');
  const [trackingTaskId, setTrackingTaskId] = useState<number | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [accumulatedTime, setAccumulatedTime] = useState(0); // Lưu thời gian đã tích lũy
  const [currentTaskName, setCurrentTaskName] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTimeGoal, setEditTimeGoal] = useState('');

  const isAdmin = currentUser.role === 'admin';

  const initialTasks = [
    {
      id: 1,
      name: 'Create brand identity',
      project: 'VinGroup Marketing',
      description: 'Design logo and brand guidelines',
      priority: 'high',
      status: 'completed',
      timeSpent: 7.5,
      estimatedTime: 8,
      dueDate: '2025-12-05',
      assignee: 'Quyen',
      performance: 'productive',
    },
    {
      id: 2,
      name: 'Social media posting',
      project: 'Viettel Campaign',
      description: 'Schedule posts for the week',
      priority: 'medium',
      status: 'in-progress',
      timeSpent: 2.5,
      estimatedTime: 3,
      dueDate: '2025-12-06',
      assignee: 'Uyen',
      performance: 'on-track',
    },
    {
      id: 3,
      name: 'Client presentation',
      project: 'FPT Digital Solutions',
      description: 'Prepare slides for stakeholder meeting',
      priority: 'high',
      status: 'completed',
      timeSpent: 5.5,
      estimatedTime: 4,
      dueDate: '2025-12-04',
      assignee: 'Quyen',
      performance: 'overspent',
    },
    {
      id: 4,
      name: 'Website homepage redesign',
      project: 'Masan Consumer',
      description: 'Create new hero section and update layout',
      priority: 'medium',
      status: 'completed',
      timeSpent: 10,
      estimatedTime: 12,
      dueDate: '2025-12-01',
      assignee: 'Uyen',
      performance: 'productive',
    },
    {
      id: 5,
      name: 'User research interviews',
      project: 'Techcombank Rebranding',
      description: 'Conduct 5 user interviews',
      priority: 'low',
      status: 'not-started',
      timeSpent: 0,
      estimatedTime: 10,
      dueDate: '2025-12-10',
      assignee: 'Quyen',
      performance: 'on-track',
    },
    {
      id: 6,
      name: 'Email campaign setup',
      project: 'Viettel Campaign',
      description: 'Setup automated email sequences',
      priority: 'medium',
      status: 'completed',
      timeSpent: 8.5,
      estimatedTime: 6,
      dueDate: '2025-12-03',
      assignee: 'Uyen',
      performance: 'overspent',
    },
    {
      id: 7,
      name: 'Market research analysis',
      project: 'VinGroup Marketing',
      description: 'Analyze competitor strategies and market trends',
      priority: 'high',
      status: 'in-progress',
      timeSpent: 1.2,
      estimatedTime: 5,
      dueDate: '2025-12-11',
      assignee: 'Quyen',
      performance: 'on-track',
    },
    {
      id: 8,
      name: 'Content calendar planning',
      project: 'Masan Consumer',
      description: 'Plan social media content for December',
      priority: 'medium',
      status: 'not-started',
      timeSpent: 0,
      estimatedTime: 4,
      dueDate: '2025-12-12',
      assignee: 'Uyen',
      performance: 'on-track',
    },
    {
      id: 9,
      name: 'Video editing for TVC',
      project: 'Viettel Campaign',
      description: 'Edit 30-second commercial video',
      priority: 'high',
      status: 'in-progress',
      timeSpent: 0.5,
      estimatedTime: 8,
      dueDate: '2025-12-13',
      assignee: 'Uyen',
      performance: 'on-track',
    },
    {
      id: 10,
      name: 'Photography session',
      project: 'FPT Digital Solutions',
      description: 'Product photography for new campaign',
      priority: 'medium',
      status: 'not-started',
      timeSpent: 0,
      estimatedTime: 6,
      dueDate: '2025-12-14',
      assignee: 'Quyen',
      performance: 'on-track',
    },
    {
      id: 11,
      name: 'SEO optimization report',
      project: 'Techcombank Rebranding',
      description: 'Analyze and optimize website SEO',
      priority: 'low',
      status: 'not-started',
      timeSpent: 0,
      estimatedTime: 3,
      dueDate: '2025-12-15',
      assignee: 'Uyen',
      performance: 'on-track',
    },
    {
      id: 12,
      name: 'Brand workshop facilitation',
      project: 'VinGroup Marketing',
      description: 'Lead creative workshop with stakeholders',
      priority: 'high',
      status: 'not-started',
      timeSpent: 0,
      estimatedTime: 4,
      dueDate: '2025-12-16',
      assignee: 'Quyen',
      performance: 'on-track',
    },
    {
      id: 13,
      name: 'Copywriting for landing page',
      project: 'Masan Consumer',
      description: 'Write compelling copy for product launch',
      priority: 'medium',
      status: 'in-progress',
      timeSpent: 0.8,
      estimatedTime: 2,
      dueDate: '2025-12-17',
      assignee: 'Uyen',
      performance: 'on-track',
    },
    {
      id: 14,
      name: 'Mobile app UX testing',
      project: 'FPT Digital Solutions',
      description: 'Conduct usability testing sessions',
      priority: 'high',
      status: 'not-started',
      timeSpent: 0,
      estimatedTime: 7,
      dueDate: '2025-12-18',
      assignee: 'Quyen',
      performance: 'on-track',
    },
    {
      id: 15,
      name: 'Newsletter design',
      project: 'Viettel Campaign',
      description: 'Design monthly email newsletter template',
      priority: 'low',
      status: 'not-started',
      timeSpent: 0,
      estimatedTime: 3,
      dueDate: '2025-12-19',
      assignee: 'Uyen',
      performance: 'on-track',
    },
  ];

  const [allTasks, setAllTasks] = useState(initialTasks);

  useEffect(() => {
    let interval: any;
    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const handleStartTracking = (taskId: number, taskName: string) => {
    setTrackingTaskId(taskId);
    setIsTracking(true);
    setCurrentTaskName(taskName);
    // Tiếp tục từ thời gian đã tích lũy
    setElapsedTime(accumulatedTime);
  };

  const handlePauseTracking = () => {
    setIsTracking(false);
    // Lưu thời gian hiện tại vào accumulated
    setAccumulatedTime(elapsedTime);
  };

  const handleCompleted = () => {
    if (trackingTaskId === null) return;
    
    // Chuyển đổi elapsedTime từ giây sang giờ
    const timeSpentInHours = parseFloat((elapsedTime / 3600).toFixed(2));
    
    // Tìm task hiện tại
    const currentTask = allTasks.find(t => t.id === trackingTaskId);
    if (!currentTask) return;
    
    // Tính toán performance: productive nếu timeSpent <= estimatedTime
    const performance = timeSpentInHours <= currentTask.estimatedTime ? 'productive' : 'overspent';
    
    // Cập nhật task
    setAllTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === trackingTaskId 
          ? {
              ...task,
              status: 'completed',
              timeSpent: timeSpentInHours,
              performance: performance
            }
          : task
      )
    );
    
    // Reset tracking states
    setTrackingTaskId(null);
    setIsTracking(false);
    setElapsedTime(0);
    setAccumulatedTime(0);
    setCurrentTaskName('');
  };

  // Filter tasks based on user role and assignee
  const tasks = isAdmin 
    ? allTasks 
    : allTasks.filter(t => t.assignee === currentUser.name);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-orange-500';
      case 'low':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Completed</span>;
      case 'in-progress':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">In Progress</span>;
      case 'not-started':
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Not Started</span>;
      default:
        return null;
    }
  };

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case 'productive':
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Productive
          </span>
        );
      case 'overspent':
        return (
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Overspent
          </span>
        );
      default:
        return null;
    }
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter);

  const productiveTasks = tasks.filter(t => t.performance === 'productive').length;
  const overspentTasks = tasks.filter(t => t.performance === 'overspent').length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2">Tasks</h1>
          <p className="text-gray-600">
            {isAdmin ? 'Manage all tasks and time estimates' : 'Your assigned tasks and time tracking'}
          </p>
        </div>
        {isAdmin && (
          <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
            <Plus className="w-5 h-5" />
            New Task
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Productive Tasks</p>
              <h3>{productiveTasks}</h3>
            </div>
          </div>
          <p className="text-sm text-gray-500">Completed before estimate</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Overspent Tasks</p>
              <h3>{overspentTasks}</h3>
            </div>
          </div>
          <p className="text-sm text-gray-500">Exceeded time estimate</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Tasks</p>
              <h3>{tasks.length}</h3>
            </div>
          </div>
          <p className="text-sm text-gray-500">All assigned tasks</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex gap-2 p-2 border-b border-gray-200">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'in-progress' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilter('not-started')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'not-started' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Not Started
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'completed' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Completed
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3>{task.name}</h3>
                    <Flag className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
                    {isAdmin && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {task.assignee}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      {task.project}
                    </span>
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {task.status === 'completed' && getPerformanceBadge(task.performance)}
                  {getStatusBadge(task.status)}
                  {isAdmin && (
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Time Tracked
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">
                        {task.timeSpent}h / {task.estimatedTime}h
                      </span>
                      {isAdmin && editingTaskId === task.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={editTimeGoal}
                            onChange={(e) => setEditTimeGoal(e.target.value)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder={task.estimatedTime.toString()}
                          />
                          <button
                            onClick={() => {
                              setEditingTaskId(null);
                              setEditTimeGoal('');
                            }}
                            className="text-green-500 hover:text-green-600"
                          >
                            Save
                          </button>
                        </div>
                      ) : isAdmin ? (
                        <button
                          onClick={() => {
                            setEditingTaskId(task.id);
                            setEditTimeGoal(task.estimatedTime.toString());
                          }}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Edit className="w-3 h-3 text-gray-400" />
                        </button>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        task.timeSpent > task.estimatedTime ? 'bg-orange-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min((task.timeSpent / task.estimatedTime) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                {task.status !== 'completed' && (
                  <div className="flex items-center gap-2">
                    {trackingTaskId === task.id ? (
                      <>
                        <button
                          onClick={handlePauseTracking}
                          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          <Pause className="w-4 h-4" />
                          Pause
                        </button>
                        <button
                          onClick={handleCompleted}
                          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Completed
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleStartTracking(task.id, task.name)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        disabled={trackingTaskId !== null && trackingTaskId !== task.id}
                      >
                        <Play className="w-4 h-4" />
                        Start
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {trackingTaskId !== null && (
        <FloatingTimer
          taskName={currentTaskName}
          isTracking={isTracking}
          onStart={() => setIsTracking(true)}
          onPause={handlePauseTracking}
          onEnd={handleCompleted}
          elapsedTime={elapsedTime}
        />
      )}
    </div>
  );
}