import { useState, useEffect } from 'react';
import './styles.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'projectAssignment':
        navigate('/project-assignment');
        break;
      case 'progressTracking':
        navigate('/progress-tracking');
        break;
      case 'scoringSystem':
        navigate('/score-system');
        break;
      case 'profile':
        navigate('/profile');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const routeToTab = {
      '/dashboard': 'dashboard',
      '/project-assignment': 'projectAssignment',
      '/progress-tracking': 'progressTracking',
      '/score-system': 'scoringSystem',
      '/profile': 'profile',
    };
    if (routeToTab[location.pathname]) {
      setActiveTab(routeToTab[location.pathname]);
    }
  }, [location.pathname]);

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="navbar bg-gray-800 text-white shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto flex justify-between items-center p-6">
          <div className="flex items-center">
            <a className="text-2xl font-semibold hover:text-indigo-100 transition duration-300">
              Ionots
            </a>
          </div>
          <div className="flex items-center space-x-8">
            <a
              className={`text-white px-5 py-3 rounded-lg transition duration-300 ${
                activeTab === 'dashboard' ? 'bg-indigo-500' : 'bg-sky-500 hover:bg-sky-700'
              }`}
              onClick={() => handleTabClick('dashboard')}
            >
              Dashboard
            </a>
            <a
              className={`text-white px-5 py-3 rounded-lg transition duration-300 ${
                activeTab === 'projectAssignment' ? 'bg-indigo-500' : 'bg-sky-500 hover:bg-sky-700'
              }`}
              onClick={() => handleTabClick('projectAssignment')}
            >
              Recommended Projects
            </a>
            <a
              className={`text-white px-5 py-3 rounded-lg transition duration-300 ${
                activeTab === 'progressTracking' ? 'bg-indigo-500' : 'bg-sky-500 hover:bg-sky-700'
              }`}
              onClick={() => handleTabClick('progressTracking')}
            >
              Assigned Projects
            </a>
            <a
              className={`text-white px-5 py-3 rounded-lg transition duration-300 ${
                activeTab === 'scoringSystem' ? 'bg-indigo-500' : 'bg-sky-500 hover:bg-sky-700'
              }`}
              onClick={() => handleTabClick('scoringSystem')}
            >
              Scoring System
            </a>
            <a
              className={`text-white px-5 py-3 rounded-lg transition duration-300 ${
                activeTab === 'profile' ? 'bg-indigo-500' : 'bg-sky-500 hover:bg-sky-700'
              }`}
              onClick={() => handleTabClick('profile')}
            >
              Profile
            </a>
          </div>
        </nav>
      </header>

      {/* Render Children */}
      <main className="flex-grow mt-10 p-6 max-w-7xl mx-auto">
      {location.pathname === '/dashboard' ? (
  <div className="welcome-container text-center">
    <h1 className="welcome-title">Welcome to Ionots!</h1>
    <p className="welcome-description">
      Manage your project assignments, track your progress, and evaluate your performance all in one place.
    </p>
  </div>
) : (
  children
)}
      </main>

      <footer className="footer bg-gray-800 text-white p-4 text-center mt-auto">
        <p>&copy; {currentYear} Ionots. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
