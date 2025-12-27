import { Home, LayoutDashboard, FolderKanban, CheckSquare, BarChart3, Bell, Settings, LogOut, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import logoImage from 'figma:asset/fb674debde1ec59c0ec8423261caa02295d019ca.png';
import { UserProfile, UserSwitcher } from './UserSwitcher';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: any) => void;
  onLogout: () => void;
  currentUser: UserProfile;
  onUserChange: (user: UserProfile) => void;
}

export function Sidebar({ currentPage, onNavigate, onLogout, currentUser, onUserChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'reporting', label: 'Reporting', icon: BarChart3 },
  ];

  return (
    <div className={`bg-[#1a1d29] text-white flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Logo" className="w-10 h-10 rounded-lg" />
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {!isCollapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#252836] text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      )}

      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
              {!isCollapsed && item.id === 'notifications' && (
                <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">5</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-gray-700 p-3 space-y-1">
        <button 
          onClick={() => onNavigate('notifications')}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
            currentPage === 'notifications'
              ? 'bg-orange-500 text-white'
              : 'text-gray-400 hover:bg-gray-700 hover:text-white'
          } ${isCollapsed ? 'justify-center' : ''}`}
        >
          <Bell className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Notifications</span>}
          {!isCollapsed && (
            <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">5</span>
          )}
        </button>
        <button 
          onClick={() => onNavigate('settings')}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
            currentPage === 'settings'
              ? 'bg-orange-500 text-white'
              : 'text-gray-400 hover:bg-gray-700 hover:text-white'
          } ${isCollapsed ? 'justify-center' : ''}`}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </button>
      </div>

      <div className="border-t border-gray-700 p-3">
        <UserSwitcher 
          currentUser={currentUser}
          onUserChange={onUserChange}
          isCollapsed={isCollapsed}
        />
        <button 
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-gray-700 transition-colors mt-2 ${isCollapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}