import { Download } from "lucide-react";

export default function Header() {
  return (
    <>
      <section className="flex items-center mb-6">
        <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full text-indigo-600 dark:text-indigo-300 mr-3">
          <Download size={20} />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Decode Password</h1>
      </section>
      
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Extract a hidden password from an encoded image. Upload your encoded image to reveal the secret.
      </p>
    </>
  );
} 