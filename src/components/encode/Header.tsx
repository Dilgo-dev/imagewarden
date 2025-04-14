import { Upload } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <>
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex items-center mb-6"
      >
        <motion.div 
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full text-indigo-600 dark:text-indigo-300 mr-3"
        >
          <Upload size={20} />
        </motion.div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Secret Encoder</h1>
      </motion.div>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-gray-600 dark:text-gray-300 mb-8"
      >
        Hide sensitive information securely within images using advanced steganography. Your secrets remain invisible to the naked eye.
      </motion.p>
    </>
  );
} 