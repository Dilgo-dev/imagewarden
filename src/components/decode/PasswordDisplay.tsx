import { useState } from "react";
import { Eye, EyeOff, Clipboard, Check } from "lucide-react";

interface PasswordDisplayProps {
  decodedPassword: string;
}

export default function PasswordDisplay({ decodedPassword }: PasswordDisplayProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

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
        .catch((err) => {
          console.error("Failed to copy to clipboard", err);
        });
    }
  };

  return (
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
  );
} 