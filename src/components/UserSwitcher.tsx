import { User } from 'lucide-react';

export type UserRole = 'admin' | 'employee';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export const users: UserProfile[] = [
  {
    name: 'Quyen',
    email: 'quyen@themarketinghouse.vn',
    role: 'admin',
    avatar: 'Q',
  },
  {
    name: 'Uyen',
    email: 'uyen@themarketinghouse.vn',
    role: 'employee',
    avatar: 'U',
  },
];

interface UserSwitcherProps {
  currentUser: UserProfile;
  onUserChange: (user: UserProfile) => void;
  isCollapsed: boolean;
}

export function UserSwitcher({ currentUser, onUserChange, isCollapsed }: UserSwitcherProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 w-full hover:bg-gray-700 p-2 rounded-lg transition-colors ${isCollapsed ? 'justify-center' : ''}`}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 text-white">
          {currentUser.avatar}
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0 text-left">
            <div className="text-sm flex items-center gap-2">
              {currentUser.name}
              <span className="text-xs px-2 py-0.5 bg-orange-500 rounded-full">
                {currentUser.role === 'admin' ? 'Manager' : 'Employee'}
              </span>
            </div>
            <div className="text-xs text-gray-400 truncate">{currentUser.email}</div>
          </div>
        )}
      </button>

      {isOpen && !isCollapsed && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {users.map((user) => (
            <button
              key={user.email}
              onClick={() => {
                onUserChange(user);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 hover:bg-gray-700 transition-colors ${
                currentUser.email === user.email ? 'bg-gray-700' : ''
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm">
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-sm flex items-center gap-2">
                  {user.name}
                  <span className="text-xs px-2 py-0.5 bg-orange-500 rounded-full">
                    {user.role === 'admin' ? 'Manager' : 'Employee'}
                  </span>
                </div>
                <div className="text-xs text-gray-400 truncate">{user.email}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import React from 'react';
