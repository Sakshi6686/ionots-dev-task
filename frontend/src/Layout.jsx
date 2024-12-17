import { useState } from 'react';
import './styles.css'; 
import ProjectAssignment from './components/ProjectAssignment';
import ProgressTracking from './components/ProgressTracking';
import ScoringSystem from './components/ScoringSystem';
import Profile from './components/Profile';

const Layout = () => {
  const [activeTab, setActiveTab] = useState('projectAssignment');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

   
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen">
 
      <header className="navbar bg-gray-800 text-white shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto flex justify-between items-center p-6">
          <div className="flex items-center">
            <a  className="text-2xl font-semibold hover:text-indigo-100 transition duration-300">
              Ionots
            </a>
          </div>
          <div className="flex items-center space-x-8">
            <a
              href="#"
              className={`text-white bg-sky-500 hover:bg-sky-700 hover:text-white px-5 py-3 rounded-lg transition duration-300 ${activeTab === 'projectAssignment' ? 'bg-indigo-500' : ''}`}
              onClick={() => handleTabClick('projectAssignment')}
            >
              Project Assignment
            </a>
            <a
              href="#"
              className={`text-white bg-sky-500 hover:bg-sky-700 hover:text-white px-5 py-3 rounded-lg transition duration-300 ${activeTab === 'progressTracking' ? 'bg-indigo-500' : ''}`}
              onClick={() => handleTabClick('progressTracking')}
            >
              Progress Tracking
            </a>
            <a
              href="#"
              className={`text-white bg-sky-500 hover:bg-sky-700 hover:text-white px-5 py-3 rounded-lg transition duration-300 ${activeTab === 'scoringSystem' ? 'bg-indigo-500' : ''}`}
              onClick={() => handleTabClick('scoringSystem')}
            >
              Scoring System
            </a>
            <a
              href="#"
              className={`text-white bg-sky-500 hover:bg-sky-700 hover:text-white px-5 py-3 rounded-lg transition duration-300 ${activeTab === 'profile' ? 'bg-indigo-500' : ''}`}
              onClick={() => handleTabClick('profile')}
            >
              Profile
            </a>
          </div>
        </nav>
      </header>

 
      <main className="flex-grow mt-10 p-6 max-w-7xl mx-auto">
        {activeTab === 'projectAssignment' && <ProjectAssignment />}
        {activeTab === 'progressTracking' && <ProgressTracking />}
        {activeTab === 'scoringSystem' && <ScoringSystem />}
        {activeTab === 'profile' && <Profile />}
      </main>

      
      <footer className="footer bg-gray-800 text-white p-4 text-center mt-auto">
        <p>&copy; {currentYear} Ionots. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;