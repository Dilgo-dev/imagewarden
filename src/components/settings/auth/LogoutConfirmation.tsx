import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

type LogoutConfirmationProps = {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutConfirmation({ onConfirm, onCancel }: LogoutConfirmationProps) {
  return (
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
              onClick={onConfirm}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Yes, Log Out
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 