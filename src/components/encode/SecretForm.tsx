import { Eye, EyeOff } from "lucide-react";

interface SecretFormProps {
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  encryptionLevel: string;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onTogglePasswordVisibility: () => void;
  onEncryptionLevelChange: (value: string) => void;
}

export default function SecretForm({
  password,
  confirmPassword,
  showPassword,
  encryptionLevel,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePasswordVisibility,
  onEncryptionLevelChange
}: SecretFormProps) {
  return (
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
            onChange={(e) => onPasswordChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your secret password"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={onTogglePasswordVisibility}
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
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
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
              onChange={() => onEncryptionLevelChange("standard")}
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
              onChange={() => onEncryptionLevelChange("enhanced")}
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
  );
} 