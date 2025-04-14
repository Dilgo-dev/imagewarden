import { useState } from 'react';
import { Lock, Eye, EyeOff, Check, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { authManager } from '../../utils/authManager';

type PasswordCreationFormProps = {
  onSuccess: () => void;
}

export default function PasswordCreationForm({ onSuccess }: PasswordCreationFormProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const hasMinLength = password.length >= 12;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  
  const passwordStrength = [
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecial
  ].filter(Boolean).length;
  
  const getStrengthLabel = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength < 3) return 'Weak';
    if (passwordStrength < 5) return 'Medium';
    return 'Strong';
  };
  
  const getStrengthColor = () => {
    if (passwordStrength < 3) return 'bg-red-500';
    if (passwordStrength < 5) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const validation = authManager.validatePassword(password);
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await authManager.setPassword(password);
      if (success) {
        onSuccess();
      } else {
        setError('Failed to save password. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full"
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
          <Lock className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Create a Master Password
      </h2>
      
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
        This password will be used to access ImageWarden. Make sure it's secure and memorable.
      </p>
      
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-sm text-red-600 dark:text-red-400 flex items-center"
        >
          <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Master Password
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white py-3 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your master password"
                autoComplete="new-password"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            {/* Password strength indicator */}
            {password && (
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Password strength:</span>
                  <span className={`text-xs font-medium ${
                    passwordStrength < 3 ? 'text-red-500' : 
                    passwordStrength < 5 ? 'text-yellow-500' : 
                    'text-green-500'
                  }`}>
                    {getStrengthLabel()}
                  </span>
                </div>
                <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getStrengthColor()}`} 
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                
                <ul className="mt-3 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <li className="flex items-center">
                    <span className={`mr-2 ${hasMinLength ? 'text-green-500' : 'text-gray-400'}`}>
                      {hasMinLength ? <Check size={12} /> : '•'}
                    </span>
                    At least 12 characters
                  </li>
                  <li className="flex items-center">
                    <span className={`mr-2 ${hasUppercase ? 'text-green-500' : 'text-gray-400'}`}>
                      {hasUppercase ? <Check size={12} /> : '•'}
                    </span>
                    At least one uppercase letter
                  </li>
                  <li className="flex items-center">
                    <span className={`mr-2 ${hasLowercase ? 'text-green-500' : 'text-gray-400'}`}>
                      {hasLowercase ? <Check size={12} /> : '•'}
                    </span>
                    At least one lowercase letter
                  </li>
                  <li className="flex items-center">
                    <span className={`mr-2 ${hasNumber ? 'text-green-500' : 'text-gray-400'}`}>
                      {hasNumber ? <Check size={12} /> : '•'}
                    </span>
                    At least one number
                  </li>
                  <li className="flex items-center">
                    <span className={`mr-2 ${hasSpecial ? 'text-green-500' : 'text-gray-400'}`}>
                      {hasSpecial ? <Check size={12} /> : '•'}
                    </span>
                    At least one special character
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white py-3 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
            
            {password && confirmPassword && (
              <div className="mt-1 flex items-center">
                {password === confirmPassword ? (
                  <span className="text-xs text-green-500 flex items-center">
                    <Check size={12} className="mr-1" />
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
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white ${
                isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex justify-center items-center`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Password...
                </>
              ) : (
                'Create Password'
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}