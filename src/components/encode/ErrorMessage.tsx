import { AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div 
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
        >
          <div className="flex items-center">
            <motion.div 
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <AlertTriangle size={16} className="text-red-500 dark:text-red-400 mr-2" />
            </motion.div>
            <p className="text-sm text-red-600 dark:text-red-400">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 