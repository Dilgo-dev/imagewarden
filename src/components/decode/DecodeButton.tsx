import { Download } from "lucide-react";

interface DecodeButtonProps {
  isDecoding: boolean;
  hasImage: boolean;
  onDecode: () => void;
}

export default function DecodeButton({ isDecoding, hasImage, onDecode }: DecodeButtonProps) {
  return (
    <button 
      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isDecoding || !hasImage ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center gap-2 transition-colors`}
      onClick={onDecode}
      disabled={isDecoding || !hasImage}
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
  );
} 