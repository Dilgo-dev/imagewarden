import { Upload, ImageIcon, Lock } from "lucide-react";

export default function EncodeView () {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full text-indigo-600 dark:text-indigo-300 mr-3">
          <Upload size={20} />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Encode Password</h1>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Hide your password securely within an image. The password will be encrypted and encoded into the image's data.
      </p>
      
      <div className="mb-8">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors duration-200 cursor-pointer bg-gray-50 dark:bg-gray-800">
          <div className="mb-4 flex justify-center">
            <div className="text-indigo-500 dark:text-indigo-400">
              <ImageIcon size={48} />
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Drop your image here</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">or click to browse</p>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Select Image
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password to Hide
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your secret password"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Lock size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Confirm your password"
          />
        </div>
        
        <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center gap-2">
          <Lock size={16} />
          <span>Encode Password Into Image</span>
        </button>
      </div>
    </div>
  );
}