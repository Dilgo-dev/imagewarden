import { Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function SecurityIndicator() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mb-6 p-3 rounded-md bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800"
    >
      <div className="flex items-center">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1], 
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "loop", 
            ease: "easeInOut", 
            times: [0, 0.25, 0.5, 0.75, 1] 
          }}
        >
          <Shield size={18} className="text-indigo-500 dark:text-indigo-400 mr-2" />
        </motion.div>
        <div>
          <h4 className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            Military-Grade Security
          </h4>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
            Your secrets are encrypted with AES-256 before being encoded into the image. Only someone with the original image and this application can decode it.
          </p>
        </div>
      </div>
    </motion.div>
  );
} 