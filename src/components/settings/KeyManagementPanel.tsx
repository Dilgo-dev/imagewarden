import React, { useState, useEffect } from 'react';
import { Key, Copy, RefreshCw, Check, AlertTriangle } from 'lucide-react';
import { keyManager } from '../../utils/keyManager';
import { motion, AnimatePresence } from 'framer-motion';

export default function KeyManagementPanel() {
  const [encryptionKey, setEncryptionKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [customKey, setCustomKey] = useState('');
  const [showCustomKeyInput, setShowCustomKeyInput] = useState(false);
  const [keyError, setKeyError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadKey = async () => {
      try {
        setIsLoading(true);
        const existingKey = await keyManager.getKey();
        
        if (existingKey) {
          setEncryptionKey(existingKey);
        } else {
          const newKey = keyManager.generateKey();
          await keyManager.saveKey(newKey);
          setEncryptionKey(newKey);
        }
      } catch (error) {
        console.error('Error loading encryption key:', error);
        setKeyError('Failed to load encryption key');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadKey();
  }, []);
  
  const copyKeyToClipboard = () => {
    navigator.clipboard.writeText(encryptionKey)
      .then(() => {
        setCopiedToClipboard(true);
        setTimeout(() => setCopiedToClipboard(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy key to clipboard:', err);
        setKeyError('Failed to copy key to clipboard');
      });
  };
  
  const regenerateKey = async () => {
    try {
      setIsLoading(true);
      const newKey = keyManager.generateKey();
      await keyManager.saveKey(newKey);
      setEncryptionKey(newKey);
      setKeyError(null);
    } catch (error) {
      console.error('Error generating new key:', error);
      setKeyError('Failed to generate new key');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCustomKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomKey(e.target.value);
  };
  
  const saveCustomKey = async () => {
    if (!customKey || customKey.length < 16) {
      setKeyError('Key must be at least 16 characters long');
      return;
    }
    
    try {
      setIsLoading(true);
      await keyManager.saveKey(customKey);
      setEncryptionKey(customKey);
      setShowCustomKeyInput(false);
      setCustomKey('');
      setKeyError(null);
    } catch (error) {
      console.error('Error saving custom key:', error);
      setKeyError('Failed to save custom key');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-6">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white flex items-center">
              <Key size={18} className="mr-2 text-indigo-500 dark:text-indigo-400" />
              Encryption Key Management
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
              <p>This key is used to encrypt your secrets before hiding them in images.</p>
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {keyError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-600 dark:text-red-400 flex items-center"
            >
              <AlertTriangle size={14} className="mr-2" />
              {keyError}
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="mt-5">
          <div className="relative">
            <input
              type="text"
              readOnly
              value={isLoading ? 'Loading...' : encryptionKey}
              className="block w-full pr-10 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono py-2"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                onClick={copyKeyToClipboard}
                disabled={isLoading}
                className="text-gray-400 hover:text-gray-500 focus:outline-none disabled:opacity-50"
                aria-label="Copy key to clipboard"
              >
                {copiedToClipboard ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={regenerateKey}
              disabled={isLoading}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <RefreshCw size={16} className="mr-2" />
              Generate New Key
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCustomKeyInput(!showCustomKeyInput)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Key size={16} className="mr-2" />
              {showCustomKeyInput ? 'Cancel' : 'Use Custom Key'}
            </motion.button>
          </div>
          
          <AnimatePresence>
            {showCustomKeyInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={customKey}
                    onChange={handleCustomKeyChange}
                    placeholder="Enter custom encryption key..."
                    className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={saveCustomKey}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Key
                  </motion.button>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Custom key must be at least 16 characters long. Use a strong, unique key that you can remember or store securely.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-3 rounded-md border border-gray-200 dark:border-gray-700">
            <p className="font-medium mb-1">⚠️ Important Security Notice</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Keep this key secure - it's required to decode your hidden passwords.</li>
              <li>If you lose this key, you won't be able to recover passwords from previously encoded images.</li>
              <li>Consider saving a backup of this key in a secure location.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}