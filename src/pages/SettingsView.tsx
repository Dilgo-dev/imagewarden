import { Settings } from "lucide-react";
import KeyManagementPanel from "../components/settings/KeyManagementPanel";
import AuthenticationPanel from "../components/settings/AuthenticationPanel";

type SettingsViewProps = {
  onLogout: () => void;
}

export default function SettingsView ({ onLogout }: SettingsViewProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full text-indigo-600 dark:text-indigo-300 mr-3">
          <Settings size={20} />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Settings</h1>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Theme Preferences
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
                <p>Choose your preferred theme for the application.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-5 space-y-4">
            <div className="flex items-center">
              <input
                id="theme-light"
                name="theme"
                type="radio"
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label htmlFor="theme-light" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Light Theme <span className="text-gray-400">☀️</span>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="theme-dark"
                name="theme"
                type="radio"
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label htmlFor="theme-dark" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Dark Theme <span className="text-gray-400">🌙</span>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="theme-system"
                name="theme"
                type="radio"
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label htmlFor="theme-system" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                System Default <span className="text-gray-400">💻</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <KeyManagementPanel />

      <AuthenticationPanel onLogout={onLogout} />
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-6">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Security Settings
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
            <p>Configure application security options.</p>
          </div>
          
          <div className="mt-5">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="encryption-level"
                  name="encryption-level"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="encryption-level" className="font-medium text-gray-700 dark:text-gray-300">
                  Enhanced Encryption <span className="text-gray-400">🔒</span>
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Use stronger encryption (AES-256) for better security but slower processing.
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="auto-clear"
                    name="auto-clear"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="auto-clear" className="font-medium text-gray-700 dark:text-gray-300">
                    Auto-Clear Clipboard <span className="text-gray-400">✂️</span>
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    Automatically clear clipboard after 30 seconds when copying passwords.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save Settings
        </button>
      </div>
    </div>
  );
}