import { useState, useRef } from "react";
import { Download, Eye, EyeOff, ImageIcon, Clipboard, Check } from "lucide-react";
import { Steganography } from "../utils/steganography";

export default function DecodeView() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [decodedPassword, setDecodedPassword] = useState("");
  const [isDecoding, setIsDecoding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setError(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const clickFileInput = () => {
    fileInputRef.current?.click();
  };

  const decodeImage = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setIsDecoding(true);
    setError(null);

    try {
      // Use the Steganography utility to extract the hidden password
      const extracted = await Steganography.extractData(selectedImage);
      setDecodedPassword(extracted);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to decode image");
    } finally {
      setIsDecoding(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const copyToClipboard = () => {
    if (decodedPassword) {
      navigator.clipboard.writeText(decodedPassword)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          setError("Failed to copy to clipboard");
        });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full text-indigo-600 dark:text-indigo-300 mr-3">
          <Download size={20} />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Decode Password</h1>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Extract a hidden password from an encoded image. Upload your encoded image to reveal the secret.
      </p>
      
      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}
      
      {/* Image upload area */}
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
      
      {/* Decode button */}
      <button 
        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isDecoding || !selectedImage ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center gap-2 transition-colors`}
        onClick={decodeImage}
        disabled={isDecoding || !selectedImage}
      >
        {isDecoding ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Decoding...</span>
          </>
        ) : (
          <>
            <Download size={16} />
            <span>Reveal Hidden Password</span>
          </>
        )}
      </button>
      
      {/* Password result area */}
      <div className={`mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 ${decodedPassword ? 'border-green-200 dark:border-green-800' : ''}`}>
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Recovered Password
        </div>
        
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            readOnly
            value={decodedPassword}
            className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Password will appear here"
          />
          
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button 
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={togglePasswordVisibility}
              disabled={!decodedPassword}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        
        {decodedPassword && (
          <div className="mt-3">
            <button
              onClick={copyToClipboard}
              className="w-full flex justify-center items-center py-2 px-3 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              {copied ? (
                <>
                  <Check size={16} className="mr-2 text-green-500" />
                  <span>Copied to clipboard!</span>
                </>
              ) : (
                <>
                  <Clipboard size={16} className="mr-2" />
                  <span>Copy to clipboard</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}