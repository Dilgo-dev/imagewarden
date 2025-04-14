import { Check } from 'lucide-react';

type PasswordStrengthIndicatorProps = {
  password: string;
}

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  if (!password) return null;
  
  const hasMinLength = password.length >= 12;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  
  const passwordStrength = [
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecial
  ].filter(Boolean).length;
  
  return (
    <div className="mt-1">
      <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${
            passwordStrength < 3 ? 'bg-red-500' : 
            passwordStrength < 5 ? 'bg-yellow-500' : 
            'bg-green-500'
          }`} 
          style={{ width: `${(passwordStrength / 5) * 100}%` }}
        ></div>
      </div>
      
      <ul className="mt-2 space-y-1 text-xs text-gray-500 dark:text-gray-400">
        <li className="flex items-center">
          <span className={`mr-1 ${hasMinLength ? 'text-green-500' : 'text-gray-400'}`}>
            {hasMinLength ? <Check size={10} /> : '•'}
          </span>
          12+ characters
        </li>
        <li className="flex items-center">
          <span className={`mr-1 ${hasUppercase ? 'text-green-500' : 'text-gray-400'}`}>
            {hasUppercase ? <Check size={10} /> : '•'}
          </span>
          Uppercase
        </li>
        <li className="flex items-center">
          <span className={`mr-1 ${hasLowercase ? 'text-green-500' : 'text-gray-400'}`}>
            {hasLowercase ? <Check size={10} /> : '•'}
          </span>
          Lowercase
        </li>
        <li className="flex items-center">
          <span className={`mr-1 ${hasNumber ? 'text-green-500' : 'text-gray-400'}`}>
            {hasNumber ? <Check size={10} /> : '•'}
          </span>
          Number
        </li>
        <li className="flex items-center">
          <span className={`mr-1 ${hasSpecial ? 'text-green-500' : 'text-gray-400'}`}>
            {hasSpecial ? <Check size={10} /> : '•'}
          </span>
          Special character
        </li>
      </ul>
    </div>
  );
} 