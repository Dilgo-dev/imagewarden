import CryptoJS from 'crypto-js';

export type AuthManagerOptions = {
  storageKey?: string;
}

/**
 * Manages user authentication and password validation
 */
export class AuthManager {
  private storageKey: string;
  
  constructor(options: AuthManagerOptions = {}) {
    this.storageKey = options.storageKey || 'imagewarden-auth';
  }
  
  /**
   * Validates that the password meets security requirements
   * @param password The password to validate
   * @returns An object containing validity status and any error message
   */
  validatePassword(password: string): { isValid: boolean; message: string } {
    if (password.length < 12) {
      return { 
        isValid: false, 
        message: 'Password must be at least 12 characters long' 
      };
    }
    
    if (!/[A-Z]/.test(password)) {
      return { 
        isValid: false, 
        message: 'Password must contain at least one uppercase letter' 
      };
    }
    
    if (!/[a-z]/.test(password)) {
      return { 
        isValid: false, 
        message: 'Password must contain at least one lowercase letter' 
      };
    }
    
    if (!/[0-9]/.test(password)) {
      return { 
        isValid: false, 
        message: 'Password must contain at least one number' 
      };
    }
    
    if (!/[^A-Za-z0-9]/.test(password)) {
      return { 
        isValid: false, 
        message: 'Password must contain at least one special character' 
      };
    }
    
    return { isValid: true, message: '' };
  }
  
  /**
   * Creates a secure hash of the password for storage
   * @param password The password to hash
   * @returns The hashed password
   */
  private hashPassword(password: string): string {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    
    const iterations = 10000;
    const keySize = 256 / 32;
    const hashedPassword = CryptoJS.PBKDF2(password, salt, {
      keySize,
      iterations
    });
    
    return salt.toString() + ':' + hashedPassword.toString();
  }
  
  /**
   * Verifies a password against the stored hash
   * @param password The password to verify
   * @param hashedPassword The stored password hash
   * @returns True if the password matches, false otherwise
   */
  private verifyPassword(password: string, hashedPassword: string): boolean {
    try {
      const parts = hashedPassword.split(':');
      if (parts.length !== 2) {
        return false;
      }
      
      const salt = CryptoJS.enc.Hex.parse(parts[0]);
      const originalHash = parts[1];
      
      const iterations = 10000;
      const keySize = 256 / 32;
      const hash = CryptoJS.PBKDF2(password, salt, {
        keySize,
        iterations
      }).toString();
      
      return hash === originalHash;
    } catch (error) {
      console.error('Password verification error:', error);
      return false;
    }
  }
  
  /**
   * Sets up a new password for the application
   * @param password The password to set
   * @returns Promise that resolves when the password is saved
   */
  async setPassword(password: string): Promise<boolean> {
    try {
      const validation = this.validatePassword(password);
      if (!validation.isValid) {
        throw new Error(validation.message);
      }
      
      const hashedPassword = this.hashPassword(password);
      
      // For web/development environment
      if (typeof window !== 'undefined' && !window.ipcRenderer) {
        localStorage.setItem(this.storageKey, hashedPassword);
        return true;
      }
      
      // For Electron environment
      if (typeof window !== 'undefined' && window.ipcRenderer) {
        return await window.ipcRenderer.invoke('save-auth', {
          storageKey: this.storageKey,
          hashedPassword
        });
      }
      
      return false;
    } catch (error) {
      console.error('Error setting password:', error);
      return false;
    }
  }
  
  /**
   * Verifies the provided password against the stored one
   * @param password The password to verify
   * @returns Promise that resolves with true if authentication succeeded
   */
  async authenticate(password: string): Promise<boolean> {
    try {
      let storedHash: string | null = null;
      
      // For web/development environment
      if (typeof window !== 'undefined' && !window.ipcRenderer) {
        storedHash = localStorage.getItem(this.storageKey);
      }
      
      // For Electron environment
      if (typeof window !== 'undefined' && window.ipcRenderer) {
        storedHash = await window.ipcRenderer.invoke('get-auth', {
          storageKey: this.storageKey
        });
      }
      
      if (!storedHash) {
        return false;
      }
      
      return this.verifyPassword(password, storedHash);
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }
  
  /**
   * Checks if a password has been set up
   * @returns Promise that resolves with true if a password exists
   */
  async hasPassword(): Promise<boolean> {
    try {

      // For web/development environment
      if (typeof window !== 'undefined' && !window.ipcRenderer) {
        const storedHash = localStorage.getItem(this.storageKey);
        return !!storedHash;
      }

      // For Electron environment
      if (typeof window !== 'undefined' && window.ipcRenderer) {
        return await window.ipcRenderer.invoke('has-auth', {
          storageKey: this.storageKey
        });
      }
      
      return false;
    } catch (error) {
      console.error('Error checking password existence:', error);
      return false;
    }
  }
}

export const authManager = new AuthManager();