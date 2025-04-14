import { useState } from 'react';
import { LogOut, Key, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import StatusMessage from './auth/StatusMessage';
import PasswordChangeForm from './auth/PasswordChangeForm';
import LogoutConfirmation from './auth/LogoutConfirmation';
import SecurityNote from './auth/SecurityNote';

type AuthenticationPanelProps = {
  onLogout: () => void;
}

export default function AuthenticationPanel({ onLogout }: AuthenticationPanelProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const handleLogoutClick = () => {
    setShowConfirmation(true);
    setShowPasswordChange(false);
  };
  
  const handleConfirmLogout = () => {
    onLogout();
    setShowConfirmation(false);
  };
  
  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };
  
  const togglePasswordChange = () => {
    setShowPasswordChange(!showPasswordChange);
    setShowConfirmation(false);
    setError(null);
    setSuccess(null);
  };
  
  const handlePasswordChangeResult = (success: boolean, message: string) => {
    if (success) {
      setSuccess(message);
      setError(null);
    } else {
      setError(message);
      setSuccess(null);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-6">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white flex items-center">
              <Key size={18} className="mr-2 text-indigo-500 dark:text-indigo-400" />
              Authentication
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
              <p>Manage your application access settings.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-5">
          <StatusMessage error={error} success={success} />
          
          {showPasswordChange && (
            <PasswordChangeForm 
              onCancel={togglePasswordChange}
              onResult={handlePasswordChangeResult}
            />
          )}
          
          {showConfirmation ? (
            <LogoutConfirmation
              onConfirm={handleConfirmLogout}
              onCancel={handleCancelLogout}
            />
          ) : (
            <div className="flex flex-wrap gap-3">
              {!showPasswordChange && (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleLogoutClick}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LogOut size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                  Log Out
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={togglePasswordChange}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <RefreshCw size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                {showPasswordChange ? 'Cancel' : 'Change Password'}
              </motion.button>
            </div>
          )}
          
          <SecurityNote />
        </div>
      </div>
    </div>
  );
}