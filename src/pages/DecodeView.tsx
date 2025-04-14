import { Download, ImageIcon } from "lucide-react";

export default function DecodeView () {
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
      
      <div className="mb-8">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors duration-200 cursor-pointer bg-gray-50 dark:bg-gray-800">
          <div className="mb-4 flex justify-center">
            <div className="text-indigo-500 dark:text-indigo-400">
              <ImageIcon size={48} />
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Drop your encoded image here</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">or click to browse</p>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Select Image
          </button>
        </div>
      </div>
      
      <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center gap-2">
        <Download size={16} />
        <span>Reveal Hidden Password</span>
      </button>
      
      <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Recovered Password
        </div>
        <div className="relative">
          <input
            type="password"
            readOnly
            className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Password will appear here"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button className="text-gray-400 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}