import { HelpCircle } from "lucide-react";

export default function HelpView() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full text-indigo-600 dark:text-indigo-300 mr-3">
          <HelpCircle size={20} />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Help & Documentation</h1>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-6">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            How to Use ImageWarden
          </h3>
          
          <div className="mt-4 space-y-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                  1
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-base font-medium text-gray-900 dark:text-white">
                  Encoding a Password 🔒
                </h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Select an image, enter your password, and click "Encode". The application will hide your password within the image, creating a new encoded image.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                  2
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-base font-medium text-gray-900 dark:text-white">
                  Saving Your Encoded Image 💾
                </h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  After encoding, save the new image to your desired location. The image will look nearly identical to the original, but contains your hidden password.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                  3
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-base font-medium text-gray-900 dark:text-white">
                  Decoding a Password 🔓
                </h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  To retrieve your password, open the "Decode" tab, upload the encoded image, and click "Reveal". The hidden password will be displayed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-6">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h3>
          
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-base font-medium text-gray-900 dark:text-white">
                Is my password secure? 🛡️
              </h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Yes! ImageWarden uses steganography and encryption to hide your password within the image. The password is not visible to the human eye.
              </p>
            </div>
            
            <div>
              <h4 className="text-base font-medium text-gray-900 dark:text-white">
                Will the image quality degrade? 🖼️
              </h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                The changes to the image are minimal and typically not noticeable. There might be very slight differences from the original image.
              </p>
            </div>
            
            <div>
              <h4 className="text-base font-medium text-gray-900 dark:text-white">
                What image formats are supported? 📁
              </h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                ImageWarden supports PNG, JPG, and BMP formats. For best results, PNG is recommended as it is lossless.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Still have questions? Contact support at <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">support@imagewarden.com</a>
        </p>
      </div>
    </div>
  );
}