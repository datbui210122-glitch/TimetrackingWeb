import { Clock, Calendar, TrendingUp, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { UserProfile } from './UserSwitcher';
import { FloatingTimer } from './FloatingTimer';

interface HomeProps {
  currentUser: UserProfile;
}

export function Home({ currentUser }: HomeProps) {
  const [selectedTask, setSelectedTask] = useState<string>('');
  const [isTracking, setIsTracking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showFloatingTimer, setShowFloatingTimer] = useState(false);

  const tasks = [
    { id: '1', name: 'Create brand identity', project: 'Write & Pen' },
    { id: '2', name: 'Social media posting', project: 'Write & Pen' },
    { id: '3', name: 'Client presentation', project: 'Design System' },
    { id: '4', name: 'Website homepage redesign', project: 'Website Redesign' },
  ];

  const handleStart = () => {
    if (selectedTask) {
      setIsTracking(true);
      setShowFloatingTimer(true);
    }
  };

  const handlePause = () => {
    setIsTracking(false);
  };

  const handleEnd = () => {
    setIsTracking(false);
    setShowFloatingTimer(false);
    setCurrentTime(0);
    setSelectedTask('');
  };

  const todayTasks = [
    { id: 1, name: 'Create brand', project: 'Write & Pen', status: 'in-progress', priority: 'high' },
    { id: 2, name: 'Posting', project: 'Write & Pen', status: 'not-yet', priority: 'medium', description: 'Need to finish in several periods' },
    { id: 3, name: 'Call-up', project: 'Write & Pen', status: 'not-yet', priority: 'low', description: 'Adjust & rearrange' },
  ];

  const recentActivity = [
    { id: 1, action: 'Logged 2h on', project: 'Design System', time: '10 min' },
    { id: 2, action: 'Logged 2h on', project: 'Marketing Campaign', time: '1 hour', description: 'Updated project status and several goals' },
    { id: 3, action: 'Logged 3h on', project: 'Website Redesign', time: '2 hours' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">In progress</span>;
      case 'not-yet':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Not yet</span>;
      default:
        return null;
    }
  };

  React.useEffect(() => {
    let interval: any;
    if (isTracking) {
      interval = setInterval(() => {
        setCurrentTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const selectedTaskObj = tasks.find(t => t.id === selectedTask);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2">WELCOME BACK, {currentUser.name.toUpperCase()}</h1>
        <p className="text-gray-600">Here's your activity overview for today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Today's Hours</p>
              <h3>3h 25m</h3>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '42%' }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">42% of daily goal (8h)</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">This Week</p>
              <h3>18h 45m</h3>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62%' }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">62% of weekly goal (30h)</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Productivity</p>
              <h3>+12%</h3>
            </div>
          </div>
          <p className="text-sm text-gray-600">Compared to last week</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="mb-4">Quick Task Tracking</h2>
        <div className="flex gap-4">
          <select
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select a task to track</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.name} - {task.project}
              </option>
            ))}
          </select>
          <button
            onClick={handleStart}
            disabled={!selectedTask || isTracking}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Start Tracking
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="mb-6">Today's Tasks</h2>
          <div className="space-y-4">
            {todayTasks.map((task) => (
              <div key={task.id} className="border-l-4 border-orange-500 bg-gray-50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="mb-1">{task.name}</h4>
                    <p className="text-gray-600 text-sm">{task.project}</p>
                    {task.description && (
                      <p className="text-gray-500 text-sm mt-1">{task.description}</p>
                    )}
                  </div>
                  {getStatusBadge(task.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-gray-900">{activity.action}</p>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{activity.project}</p>
                  {activity.description && (
                    <p className="text-gray-500 text-sm mt-1">{activity.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showFloatingTimer && selectedTaskObj && (
        <FloatingTimer
          taskName={selectedTaskObj.name}
          isTracking={isTracking}
          onStart={handleStart}
          onPause={handlePause}
          onEnd={handleEnd}
          elapsedTime={currentTime}
        />
      )}
    </div>
  );
}

import React from 'react';
