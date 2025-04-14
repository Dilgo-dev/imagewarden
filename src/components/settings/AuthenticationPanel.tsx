import { useState } from 'react';
import { LogOut, Key, AlertTriangle, RefreshCw, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { authManager } from '../../utils/authManager';

interface AuthenticationPanelProps {
  onLogout: () => void;
}

export default function AuthenticationPanel({ onLogout }: AuthenticationPanelProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const hasMinLength = newPassword.length >= 12;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);
  
  const passwordStrength = [
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecial
  ].filter(Boolean).length;
  
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
    if (!showPasswordChange) {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPasswords(!showPasswords);
  };
  
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    const validation = authManager.validatePassword(newPassword);
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const isAuthenticated = await authManager.authenticate(oldPassword);
      if (!isAuthenticated) {
        setError('Current password is incorrect');
        setIsSubmitting(false);
        return;
      }
      
      const success = await authManager.setPassword(newPassword);
      if (success) {
        setSuccess('Password changed successfully');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError('Failed to change password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsSubmitting(false);
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
          {/* Status messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-sm text-red-600 dark:text-red-400 flex items-center"
            >
              <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
          
          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md text-sm text-green-600 dark:text-green-400 flex items-center"
            >
              <Check size={16} className="mr-2 flex-shrink-0" />
              <span>{success}</span>
            </motion.div>
          )}
          
          {/* Password change form */}
          {showPasswordChange && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700 mb-4"
              onSubmit={handleChangePassword}
            >
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                Change Master Password
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="old-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type={showPasswords ? "text" : "password"}
                      id="old-password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white py-2 px-3 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter current password"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type={showPasswords ? "text" : "password"}
                      id="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white py-2 px-3 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter new password"
                    />
                  </div>
                  
                  {/* Password strength indicator */}
                  {newPassword && (
                    <div className="mt-1">
                      <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            passwordStrength < 3 ? 'bg-red-500' : 
                            passwordStrength < 5 ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`} 
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                      
                      <ul className="mt-2 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                        <li className="flex items-center">
                          <span className={`mr-1 ${hasMinLength ? 'text-green-500' : 'text-gray-400'}`}>
                            {hasMinLength ? <Check size={10} /> : '•'}
                          </span>
                          12+ characters
                        </li>
                        <li className="flex items-center">
                          <span className={`mr-1 ${hasUppercase ? 'text-green-500' : 'text-gray-400'}`}>
                            {hasUppercase ? <Check size={10} /> : '•'}
                          </span>
                          Uppercase
                        </li>
                        <li className="flex items-center">
                          <span className={`mr-1 ${hasLowercase ? 'text-green-500' : 'text-gray-400'}`}>
                            {hasLowercase ? <Check size={10} /> : '•'}
                          </span>
                          Lowercase
                        </li>
                        <li className="flex items-center">
                          <span className={`mr-1 ${hasNumber ? 'text-green-500' : 'text-gray-400'}`}>
                            {hasNumber ? <Check size={10} /> : '•'}
                          </span>
                          Number
                        </li>
                        <li className="flex items-center">
                          <span className={`mr-1 ${hasSpecial ? 'text-green-500' : 'text-gray-400'}`}>
                            {hasSpecial ? <Check size={10} /> : '•'}
                          </span>
                          Special character
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white py-2 px-3 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Confirm new password"
                  />
                  
                  {newPassword && confirmPassword && (
                    <div className="mt-1 flex items-center">
                      {newPassword === confirmPassword ? (
                        <span className="text-xs text-green-500 flex items-center">
                          <Check size={10} className="mr-1" />
                          Passwords match
                        </span>
                      ) : (
                        <span className="text-xs text-red-500">
                          Passwords do not match
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center h-5">
                    <input
                      id="show-passwords"
                      name="show-passwords"
                      type="checkbox"
                      checked={showPasswords}
                      onChange={togglePasswordVisibility}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-2 text-sm">
                    <label htmlFor="show-passwords" className="font-medium text-gray-700 dark:text-gray-300">
                      Show passwords
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={togglePasswordChange}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white ${
                      isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </>
                    ) : (
                      'Change Password'
                    )}
                  </button>
                </div>
              </div>
            </motion.form>
          )}
          
          {/* Logout confirmation */}
          {showConfirmation ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-4"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Confirm Logout</h3>
                  <div className="mt-2 text-sm text-red-700 dark:text-red-200">
                    <p>Are you sure you want to log out? You will need to enter your master password again.</p>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <button
                      type="button"
                      onClick={handleConfirmLogout}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Yes, Log Out
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelLogout}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
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
          
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <strong>Security Note:</strong> For enhanced security, ImageWarden will automatically log you out after 30 minutes of inactivity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}