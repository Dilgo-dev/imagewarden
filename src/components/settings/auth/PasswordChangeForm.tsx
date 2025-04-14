import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { authManager } from '../../../utils/authManager';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

type PasswordChangeFormProps = {
  onCancel: () => void;
  onResult: (success: boolean, message: string) => void;
}

export default function PasswordChangeForm({ onCancel, onResult }: PasswordChangeFormProps) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPasswords(!showPasswords);
  };
  
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!oldPassword || !newPassword || !confirmPassword) {
      onResult(false, 'All fields are required');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      onResult(false, 'New passwords do not match');
      return;
    }
    
    const validation = authManager.validatePassword(newPassword);
    if (!validation.isValid) {
      onResult(false, validation.message);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const isAuthenticated = await authManager.authenticate(oldPassword);
      if (!isAuthenticated) {
        onResult(false, 'Current password is incorrect');
        setIsSubmitting(false);
        return;
      }
      
      const success = await authManager.setPassword(newPassword);
      if (success) {
        onResult(true, 'Password changed successfully');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        onResult(false, 'Failed to change password');
      }
    } catch (err) {
      onResult(false, err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
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
          
          {newPassword && <PasswordStrengthIndicator password={newPassword} />}
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
            onClick={onCancel}
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
  );
} 