import { Download } from "lucide-react";
import { motion } from "framer-motion";

interface SuccessMessageProps {
  onDownload: () => void;
}

export default function SuccessMessage({ onDownload }: SuccessMessageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: 30, height: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
      className="mt-8 p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800 rounded-lg"
    >
      <div className="text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ 
            scale: { delay: 0.3, duration: 0.4, type: "spring", stiffness: 300, damping: 10 }, 
            rotate: { delay: 0.7, duration: 0.5 }
          }}
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-800 mb-4"
        >
          <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="text-lg font-medium text-gray-900 dark:text-white mb-1"
        >
          Secret Successfully Encoded!
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="text-sm text-gray-600 dark:text-gray-300 mb-4"
        >
          Your secret has been securely hidden within the image. Download it now to save it.
        </motion.p>
        <motion.button 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onDownload}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 gap-2"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
          >
            <Download size={16} />
          </motion.div>
          Download Encoded Image
        </motion.button>
      </div>
    </motion.div>
  );
}