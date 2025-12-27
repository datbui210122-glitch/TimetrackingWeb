import { Bell, Mail, Clock, CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useState } from 'react';
import { UserProfile } from './UserSwitcher';

interface SettingsProps {
  currentUser: UserProfile;
}

export function Settings({ currentUser }: SettingsProps) {
  const [showDailyNotif, setShowDailyNotif] = useState(true);
  const isAdmin = currentUser.role === 'admin';

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and notification preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="mb-4">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Name</label>
              <input
                type="text"
                value={currentUser.name}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <input
                type="email"
                value={currentUser.email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Role</label>
              <input
                type="text"
                value={currentUser.role === 'admin' ? 'Manager' : 'Employee'}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-white mb-1">Daily Email Reminders</h2>
              <p className="text-white/80 text-sm">Automated notifications at 8:00 AM every working day</p>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-start gap-3 mb-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm mb-1">Daily task summary</p>
                <p className="text-xs text-white/70">Get your assigned tasks for the day</p>
              </div>
            </div>
            <div className="flex items-start gap-3 mb-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm mb-1">Deadline reminders</p>
                <p className="text-xs text-white/70">Tasks due today or approaching</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm mb-1">Time tracking reminder</p>
                <p className="text-xs text-white/70">Don't forget to log your work hours</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-white/60 mt-4">
            Emails sent to: {currentUser.email}
          </p>
        </div>
      </div>

      {showDailyNotif && (
        <div className="fixed bottom-6 right-6 bg-white border-2 border-blue-500 rounded-xl shadow-2xl p-6 max-w-sm z-50">
          <button
            onClick={() => setShowDailyNotif(false)}
            className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
          
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Bell className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="mb-1">Good morning, {currentUser.name}!</h3>
              <p className="text-sm text-gray-600">Here's your daily update</p>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-gray-700">3 tasks due today</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-gray-700">2 new tasks assigned</span>
            </div>
            {isAdmin && (
              <div className="flex items-center gap-2 text-sm">
                <Info className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700">Team at 102% productivity</span>
              </div>
            )}
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
            Start Tracking Time
          </button>
        </div>
      )}
    </div>
  );
}