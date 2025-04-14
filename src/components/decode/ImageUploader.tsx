import { useRef } from "react";
import { ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  selectedImage: File | null;
  previewUrl: string | null;
  onImageSelect: (file: File) => void;
}

export default function ImageUploader({ selectedImage, previewUrl, onImageSelect }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const clickFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-6">
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleImageSelect}
        accept="image/*"
        className="hidden"
      />
      
      <div 
        className={`border-2 border-dashed ${selectedImage ? 'border-indigo-300 dark:border-indigo-700' : 'border-gray-300 dark:border-gray-600'} rounded-lg p-6 text-center hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors duration-200 cursor-pointer bg-gray-50 dark:bg-gray-800`}
        onClick={clickFileInput}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {previewUrl ? (
          <div>
            <div className="mb-4">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-40 mx-auto object-contain rounded-md"
              />
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              {selectedImage?.name} <span className="text-gray-500 dark:text-gray-400 text-sm">({Math.round((selectedImage?.size || 0) / 1024)} KB)</span>
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Click to change image</p>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex justify-center">
              <ImageIcon size={48} className="text-indigo-500 dark:text-indigo-400" />
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Drop your encoded image here</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">or click to browse</p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Select Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 