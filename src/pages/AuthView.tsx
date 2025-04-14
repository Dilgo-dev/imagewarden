import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PasswordCreationForm from '../components/auth/PasswordCreationForm';
import LoginForm from '../components/auth/LoginForm';
import { authManager } from '../utils/authManager';

type AuthViewProps = {
  onAuthenticated: () => void;
}

export default function AuthView({ onAuthenticated }: AuthViewProps) {
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkPasswordStatus = async () => {
      try {
        const exists = await authManager.hasPassword();
        setHasPassword(exists);
      } catch (error) {
        console.error('Error checking password status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkPasswordStatus();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 mx-auto text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4">
            <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ImageWarden
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Secure Password Hiding in Images
          </p>
        </div>
        
        {hasPassword ? (
          <LoginForm onSuccess={onAuthenticated} />
        ) : (
          <PasswordCreationForm onSuccess={onAuthenticated} />
        )}
      </div>
      
      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} ImageWarden. All rights reserved.
      </p>
    </motion.div>
  );
}