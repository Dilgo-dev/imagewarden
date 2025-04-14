import { Info, Lock } from "lucide-react";

export default function AboutView () {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full text-indigo-600 dark:text-indigo-300 mr-3">
          <Info size={20} />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">About ImageWarden</h1>
      </div>
      
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4">
          <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-white">
            <Lock size={36} />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          ImageWarden v1.0.0
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Secure Password Hiding in Images
        </p>
      </div>
      
      <div className="prose prose-indigo dark:prose-invert max-w-none dark:text-white">
        <p>
          ImageWarden is a desktop application that allows you to securely hide passwords within images using steganography. This technique embeds your sensitive data into the pixels of an image in a way that's invisible to the human eye.
        </p>
        
        <p>
          Your passwords are encrypted before being encoded into the image, ensuring that only someone with the original image and access to ImageWarden can retrieve the hidden information.
        </p>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg my-6">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
            Key Features 🌟
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>Secure password encoding in images</li>
            <li>AES-256 encryption for strong security</li>
            <li>Support for multiple image formats</li>
            <li>Light and dark mode interface</li>
            <li>Open-source and privacy-focused</li>
            <li>No internet connection required</li>
          </ul>
        </div>
        
        <p>
          ImageWarden was created to provide a simple yet secure way to store and transport passwords. By hiding your passwords in plain sight, you add an extra layer of security to your sensitive information.
        </p>
        
        <div className="mt-8">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
            Credits & Acknowledgements
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Developed with 💙 by <a href="https://github.com/Dilgo-dev" className="text-indigo-600 dark:text-indigo-400 hover:underline">Dilgo-dev</a><br />
            Icons by Lucide React<br />
            Built with Electron, React, and TypeScript
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2025 ImageWarden. All rights reserved.
        </p>
      </div>
    </div>
  );
}