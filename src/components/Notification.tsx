import { Bell, CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { UserProfile } from './UserSwitcher';

interface NotificationsProps {
  currentUser: UserProfile;
}

export function Notifications({ currentUser }: NotificationsProps) {
  const isAdmin = currentUser.role === 'admin';

  const notifications = [
    {
      id: 1,
      type: 'task',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      title: 'New task assigned: Client presentation',
      message: 'Admin assigned you a new task for FPT Digital Solutions project',
      time: '5 min ago',
      read: false,
    },
    {
      id: 2,
      type: 'alert',
      icon: AlertCircle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      title: 'Task deadline approaching',
      message: 'Social media posting is due tomorrow',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      type: 'info',
      icon: Info,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      title: isAdmin ? 'Team productivity report ready' : 'Weekly productivity report ready',
      message: isAdmin ? 'View team performance metrics for last week' : 'Your weekly summary is now available',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 4,
      type: 'task',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      title: 'Task completed',
      message: 'You completed "Website homepage redesign" before deadline',
      time: '1 day ago',
      read: true,
    },
    {
      id: 5,
      type: 'alert',
      icon: AlertCircle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      title: 'Time estimate exceeded',
      message: 'Email campaign setup took 2.5h more than estimated',
      time: '2 days ago',
      read: true,
    },
  ];

  const adminNotifications = [
    {
      id: 6,
      type: 'info',
      icon: Info,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      title: 'New employee onboarded',
      message: 'Mai joined the team and needs project assignment',
      time: '3 hours ago',
      read: false,
    },
    {
      id: 7,
      type: 'alert',
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      title: 'Project budget alert',
      message: 'VinGroup Marketing project at 85% budget utilization',
      time: '5 hours ago',
      read: false,
    },
  ];

  const allNotifications = isAdmin ? [...notifications, ...adminNotifications] : notifications;
  const unreadCount = allNotifications.filter(n => !n.read).length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2">Notifications</h1>
        <p className="text-gray-600">Stay updated with your tasks and team activities</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2>All Notifications</h2>
            <span className="text-sm text-gray-600">{unreadCount} unread</span>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm">
              All
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
              Unread ({unreadCount})
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
              Tasks
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
              Alerts
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
          {allNotifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div
                key={notif.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-blue-50/30' : ''}`}
              >
                <div className="flex gap-4">
                  <div className={`w-10 h-10 ${notif.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${notif.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className={`${!notif.read ? '' : 'text-gray-600'}`}>
                        {notif.title}
                      </h4>
                      {!notif.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                    <span className="text-xs text-gray-400">{notif.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
