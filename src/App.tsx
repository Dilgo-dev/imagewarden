import { useState, useEffect } from 'react';
import { 
  Moon, 
  Sun, 
  Lock, 
  Upload, 
  Download, 
  Settings, 
  Info,
  HelpCircle
} from 'lucide-react';
import EncodeView from './pages/EncodeView';
import DecodeView from './pages/DecodeView';
import SettingsView from './pages/SettingsView';
import HelpView from './pages/HelpView';
import AboutView from './pages/AboutView';
import AuthView from './pages/AuthView';

const SESSION_KEY = 'imagewarden-session';
const THEME_KEY = 'imagewarden-theme';

const HomePage = () => {
  // Init dark mode from localStorage or system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return savedTheme !== null ? savedTheme === 'dark' : prefersDark;
  });
  
  const [activeTab, setActiveTab] = useState('encode');
  
  // Init auth state from session storage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const session = localStorage.getItem(SESSION_KEY);
    return session === 'true';
  });
  
  // Toggle dark mode and save preference
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem(THEME_KEY, newDarkMode ? 'dark' : 'light');
  };
  
  // Apply dark mode to the body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);
  
  useEffect(() => {
    if (!isAuthenticated) return;
    
    let inactivityTimer: number;
    const INACTIVITY_TIMEOUT = 30 * 60 * 1000;

    const resetTimer = () => {
      window.clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => {
        // Auto logout after inactivity
        setIsAuthenticated(false);
        localStorage.setItem(SESSION_KEY, 'false');
      }, INACTIVITY_TIMEOUT);
    };
    
    const handleUserActivity = () => {
      resetTimer();
    };
    
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keypress', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);
    
    // Init timer
    resetTimer();
    
    return () => {
      window.clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keypress', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
    };
  }, [isAuthenticated]);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    localStorage.setItem(SESSION_KEY, 'true');
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(SESSION_KEY, 'false');
  };
  
  if (!isAuthenticated) {
    return <AuthView onAuthenticated={handleAuthenticated} />;
  }
  
  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className="w-16 bg-gray-100 dark:bg-gray-800 flex flex-col items-center py-6 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="mb-8">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
            <Lock size={20} />
          </div>
        </div>
        
        <div className="flex-1 flex flex-col gap-6">
          <button 
            onClick={() => setActiveTab('encode')}
            className={`p-2 rounded-lg ${activeTab === 'encode' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'} transition-colors duration-200`}
          >
            <Upload size={20} />
          </button>
          
          <button 
            onClick={() => setActiveTab('decode')}
            className={`p-2 rounded-lg ${activeTab === 'decode' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'} transition-colors duration-200`}
          >
            <Download size={20} />
          </button>
          
          <button 
            onClick={() => setActiveTab('settings')}
            className={`p-2 rounded-lg ${activeTab === 'settings' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'} transition-colors duration-200`}
          >
            <Settings size={20} />
          </button>
        </div>
        
        <div className="mt-auto flex flex-col gap-4">
          <button 
            onClick={() => setActiveTab('help')}
            className={`p-2 rounded-lg ${activeTab === 'help' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'} transition-colors duration-200`}
          >
            <HelpCircle size={20} />
          </button>
          
          <button 
            onClick={() => setActiveTab('about')}
            className={`p-2 rounded-lg ${activeTab === 'about' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'} transition-colors duration-200`}
          >
            <Info size={20} />
          </button>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Title bar */}
        <div className="h-12 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 justify-between transition-colors duration-300">
          <div className="flex items-center gap-2">
            <div className="text-indigo-600 dark:text-indigo-400">
              <Lock size={16} />
            </div>
            <span className="font-medium text-gray-800 dark:text-gray-200">ImageWarden</span>
          </div>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            v1.0.0
          </div>
        </div>
        
        {/* Content area */}
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === 'encode' && (
            <EncodeView />
          )}
          
          {activeTab === 'decode' && (
            <DecodeView />
          )}
          
          {activeTab === 'settings' && (
            <SettingsView onLogout={handleLogout} />
          )}
          
          {activeTab === 'help' && (
            <HelpView />
          )}
          
          {activeTab === 'about' && (
            <AboutView />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;