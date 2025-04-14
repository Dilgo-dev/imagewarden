export interface KeyManagerOptions {
  storageKey?: string;
  keyLength?: number;
}

export class KeyManager {
  private storageKey: string;
  private keyLength: number;
  
  constructor(options: KeyManagerOptions = {}) {
    this.storageKey = options.storageKey || 'imagewarden-encryption-key';
    this.keyLength = options.keyLength || 32;
  }
  
  /**
   * Generate a new random encryption key
   */
  generateKey(): string {
    const array = new Uint8Array(this.keyLength);
    window.crypto.getRandomValues(array);
    return Array.from(array)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
  
  /**
   * Save the encryption key to secure storage
   */
  async saveKey(key: string): Promise<void> {
    try {
      localStorage.setItem(this.storageKey, key);
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to save encryption key:', error);
      return Promise.reject(error);
    }
  }
  
  /**
   * Retrieve the encryption key from secure storage
   */
  async getKey(): Promise<string | null> {
    try {
      return localStorage.getItem(this.storageKey);
    } catch (error) {
      console.error('Failed to retrieve encryption key:', error);
      return null;
    }
  }
  
  /**
   * Check if a key already exists
   */
  async keyExists(): Promise<boolean> {
    const key = await this.getKey();
    return key !== null;
  }
}

export const keyManager = new KeyManager();