import { motion } from 'framer-motion';
import { AlertTriangle, Check } from 'lucide-react';

type StatusMessageProps = {
  error: string | null;
  success: string | null;
}

export default function StatusMessage({ error, success }: StatusMessageProps) {
  if (!error && !success) return null;
  
  return (
    <>
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
    </>
  );
} 