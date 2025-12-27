import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { Projects } from './components/Projects';
import { Tasks } from './components/Tasks';
import { Reporting } from './components/Reporting';
import { Home } from './components/Home';
import { Settings } from './components/Settings';
import { Notifications } from './components/Notifications';
import { Sidebar } from './components/Sidebar';
import { UserProfile, users } from './components/UserSwitcher';

type Page = 'login' | 'home' | 'dashboard' | 'projects' | 'tasks' | 'reporting' | 'settings' | 'notifications';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile>(users[0]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const handleUserChange = (user: UserProfile) => {
    setCurrentUser(user);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home currentUser={currentUser} />;
      case 'dashboard':
        return <Dashboard currentUser={currentUser} />;
      case 'projects':
        return <Projects currentUser={currentUser} />;
      case 'tasks':
        return <Tasks currentUser={currentUser} />;
      case 'reporting':
        return <Reporting />;
      case 'settings':
        return <Settings currentUser={currentUser} />;
      case 'notifications':
        return <Notifications currentUser={currentUser} />;
      default:
        return <Home currentUser={currentUser} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        onLogout={handleLogout}
        currentUser={currentUser}
        onUserChange={handleUserChange}
      />
      <main className="flex-1 overflow-auto">
        {renderPage()}
      </main>
    </div>
  );
}
