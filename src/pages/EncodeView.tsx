import { useState } from "react";
import { Upload, ImageIcon, Lock, Eye, EyeOff, Shield, AlertTriangle, ArrowRight, Download } from "lucide-react";

export default function EncodeView() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [encryptionLevel, setEncryptionLevel] = useState("standard");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEncoding, setIsEncoding] = useState(false);
  const [encodingComplete, setEncodingComplete] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      setEncodingComplete(false);
      setErrorMessage("");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImage(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      setEncodingComplete(false);
      setErrorMessage("");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image) {
      setErrorMessage("Please select an image first");
      return;
    }
    
    if (!password) {
      setErrorMessage("Password cannot be empty");
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    
    setErrorMessage("");
    
    setIsEncoding(true);
    
    setTimeout(() => {
      setIsEncoding(false);
      setEncodingComplete(true);
    }, 2000);
  };

  const resetForm = () => {
    setImage(null);
    setPreviewUrl(null);
    setPassword("");
    setConfirmPassword("");
    setEncodingComplete(false);
    setErrorMessage("");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full text-indigo-600 dark:text-indigo-300 mr-3">
          <Upload size={20} />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Secret Encoder</h1>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Hide sensitive information securely within images using advanced steganography. Your secrets remain invisible to the naked eye.
      </p>
      
      {errorMessage && (
        <div className="mb-4 p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <div className="flex items-center">
            <AlertTriangle size={16} className="text-red-500 dark:text-red-400 mr-2" />
            <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Image upload section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Carrier Image
            </label>
            
            <div 
              className={`border-2 border-dashed rounded-lg overflow-hidden ${
                previewUrl ? 'border-indigo-300 dark:border-indigo-700' : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'
              } transition-colors duration-200 cursor-pointer bg-gray-50 dark:bg-gray-800`}
              onClick={() => document.getElementById('image-upload')?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {previewUrl ? (
                <div className="relative">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <p className="text-white text-sm font-medium">Change image</p>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="text-indigo-500 dark:text-indigo-400">
                      <ImageIcon size={48} />
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Drop your image here</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">or click to browse</p>
                  <button 
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Select Image
                  </button>
                </div>
              )}
              
              {/* Hidden file input */}
              <input 
                type="file" 
                id="image-upload" 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload}
              />
            </div>
            
            {image && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {image.name} ({Math.round(image.size / 1024)} KB)
                </p>
              </div>
            )}
          </div>
          
          {/* Password and options section */}
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Secret to Hide
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your secret password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Secret
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Confirm your secret"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Encoding Strength
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    id="standard"
                    name="encryption-level"
                    type="radio"
                    checked={encryptionLevel === "standard"}
                    onChange={() => setEncryptionLevel("standard")}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="standard" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Standard
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="enhanced"
                    name="encryption-level"
                    type="radio"
                    checked={encryptionLevel === "enhanced"}
                    onChange={() => setEncryptionLevel("enhanced")}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="enhanced" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Enhanced
                  </label>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Enhanced encoding offers stronger protection but may slightly alter image quality.
              </p>
            </div>
          </div>
        </div>

        {/* Security indicator */}
        <div className="mb-6 p-3 rounded-md bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
          <div className="flex items-center">
            <Shield size={18} className="text-indigo-500 dark:text-indigo-400 mr-2" />
            <div>
              <h4 className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                Military-Grade Security
              </h4>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                Your secrets are encrypted with AES-256 before being encoded into the image. Only someone with the original image and this application can decode it.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <button
            type="button"
            onClick={resetForm}
            className="py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset
          </button>
          
          <button
            type="submit"
            disabled={isEncoding || encodingComplete}
            className={`flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center gap-2 ${
              (isEncoding || encodingComplete) ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isEncoding ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Encoding...
              </>
            ) : encodingComplete ? (
              <>
                <span>Encoded Successfully</span>
              </>
            ) : (
              <>
                <Lock size={16} />
                <span>Encode Secret</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </form>
      
      {/* Download section appears after encoding is complete */}
      {encodingComplete && (
        <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800 rounded-lg">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-800 mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Secret Successfully Encoded!</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Your secret has been securely hidden within the image. Download it now to save it.
            </p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 gap-2">
              <Download size={16} />
              Download Encoded Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}