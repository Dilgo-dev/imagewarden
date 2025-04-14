import { Lock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ActionButtonsProps {
  isEncoding: boolean;
  encodingComplete: boolean;
  onReset: () => void;
}

export default function ActionButtons({ isEncoding, encodingComplete, onReset }: ActionButtonsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="flex flex-col sm:flex-row sm:justify-between gap-3"
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={onReset}
        className="py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Reset
      </motion.button>
      
      <motion.button
        whileHover={!isEncoding && !encodingComplete ? { scale: 1.03 } : {}}
        whileTap={!isEncoding && !encodingComplete ? { scale: 0.97 } : {}}
        type="submit"
        disabled={isEncoding || encodingComplete}
        className={`flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center gap-2 ${
          (isEncoding || encodingComplete) ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        <AnimatePresence mode="wait">
          {isEncoding ? (
            <motion.div
              key="encoding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Encoding...</span>
            </motion.div>
          ) : encodingComplete ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span>Encoded Successfully</span>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Lock size={16} />
              <span>Encode Secret</span>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
              >
                <ArrowRight size={16} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
} 