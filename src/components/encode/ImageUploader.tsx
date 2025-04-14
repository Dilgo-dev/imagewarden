import { ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploaderProps {
  image: File | null;
  previewUrl: string | null;
  onImageUpload: (file: File) => void;
}

export default function ImageUploader({ image, previewUrl, onImageUpload }: ImageUploaderProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Carrier Image
      </label>
      
      <motion.div 
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`border-2 border-dashed rounded-lg overflow-hidden ${
          previewUrl ? 'border-indigo-300 dark:border-indigo-700' : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'
        } transition-colors duration-200 cursor-pointer bg-gray-50 dark:bg-gray-800`}
        onClick={() => document.getElementById('image-upload')?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <AnimatePresence mode="wait">
          {previewUrl ? (
            <motion.div 
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <motion.img 
                initial={{ scale: 1.1, filter: "blur(10px)" }}
                animate={{ scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.4 }}
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                <p className="text-white text-sm font-medium">Change image</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 text-center"
            >
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="mb-4 flex justify-center"
              >
                <div className="text-indigo-500 dark:text-indigo-400">
                  <ImageIcon size={48} />
                </div>
              </motion.div>
              <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Drop your image here</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">or click to browse</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Select Image
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Hidden file input */}
        <input 
          type="file" 
          id="image-upload" 
          className="hidden" 
          accept="image/*" 
          onChange={handleImageUpload}
        />
      </motion.div>
      
      <AnimatePresence>
        {image && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {image.name} ({Math.round(image.size / 1024)} KB)
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 