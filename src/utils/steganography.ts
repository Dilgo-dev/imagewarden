import { keyManager } from './keyManager';
import CryptoJS from 'crypto-js';

/**
 * Utility for hiding and extracting data from images using steganography
 * with encryption provided by the KeyManager
 */
export class Steganography {
  /**
   * Encrypts and hides text data within an image
   * @param imageData - The original image data (as a File or Blob)
   * @param secretText - The secret text to hide in the image
   * @param encryptionLevel - The encryption strength ('standard' or 'enhanced')
   * @returns Promise with the new image with hidden data
   */
  static async hideData(
    imageData: File,
    secretText: string,
    encryptionLevel: 'standard' | 'enhanced' = 'standard'
  ): Promise<Blob> {
    try {
      // 1. Get the encryption key from KeyManager
      const key = await keyManager.getKey();
      if (!key) {
        throw new Error('Encryption key not found');
      }

      // 2. Encrypt the secret text
      const encryptedText = this.encryptText(secretText, key, encryptionLevel);

      // 3. Hide the encrypted text in the image
      return await this.embedInImage(imageData, encryptedText, encryptionLevel);
    } catch (error) {
      console.error('Error hiding data in image:', error);
      throw error;
    }
  }

  /**
   * Extracts and decrypts hidden data from an image
   * @param imageData - The image potentially containing hidden data
   * @returns Promise with the extracted secret text
   */
  static async extractData(imageData: File): Promise<string> {
    try {
      // 1. Get the encryption key from KeyManager
      const key = await keyManager.getKey();
      if (!key) {
        throw new Error('Encryption key not found');
      }

      // 2. Extract the encrypted data from the image
      const encryptedData = await this.extractFromImage(imageData);
      
      // 3. Decrypt the extracted data
      return this.decryptText(encryptedData, key);
    } catch (error) {
      console.error('Error extracting data from image:', error);
      throw error;
    }
  }

  /**
   * Encrypts text with the provided key
   */
  private static encryptText(
    text: string, 
    key: string, 
    level: 'standard' | 'enhanced'
  ): string {
    // Create a salt for added security
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    
    // Generate a key from the master key using PBKDF2
    // Enhanced uses more iterations for stronger security
    const keySize = 256 / 32;
    const iterations = level === 'enhanced' ? 10000 : 1000;
    const derivedKey = CryptoJS.PBKDF2(key, salt, {
      keySize,
      iterations
    });
    
    // Generate a random IV
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    
    // Encrypt the text
    const encrypted = CryptoJS.AES.encrypt(text, derivedKey, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    
    // Combine the salt, iv, and encrypted message into a single string
    const encryptedMessage = salt.toString() + 
                           iv.toString() + 
                           encrypted.toString();
    
    return encryptedMessage;
  }

  /**
   * Decrypts text with the provided key
   */
  private static decryptText(encryptedText: string, key: string): string {
    try {
      // Extract salt, iv, and ciphertext
      const salt = CryptoJS.enc.Hex.parse(encryptedText.substr(0, 32));
      const iv = CryptoJS.enc.Hex.parse(encryptedText.substr(32, 32));
      const encrypted = encryptedText.substring(64);
      
      // Generate key from password using PBKDF2
      const keySize = 256 / 32;
      const iterations = 1000;
      const derivedKey = CryptoJS.PBKDF2(key, salt, {
        keySize,
        iterations
      });
      
      // Decrypt
      const decrypted = CryptoJS.AES.decrypt(encrypted, derivedKey, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
      });
      
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Unable to decrypt data. Incorrect encryption key or the image does not contain valid hidden data.');
    }
  }

  /**
   * Embeds encrypted text into an image using LSB steganography
   */
  private static async embedInImage(
    imageFile: File, 
    encryptedText: string,
    level: 'standard' | 'enhanced'
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          try {
            // Create a canvas to manipulate the image
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              throw new Error('Could not create canvas context');
            }
            
            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0);
            
            // Get the image data for manipulation
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            
            // Convert the encrypted text to binary
            const binaryData = this.textToBinary(encryptedText);
            
            // Check if the image is large enough to hold the data
            const maxBits = pixels.length * (level === 'enhanced' ? 2 : 1);
            if (binaryData.length > maxBits) {
              throw new Error('The image is too small to hide this data. Please use a larger image.');
            }
            
            // Store the length of the data first (32 bits for length)
            const dataLengthBinary = binaryData.length.toString(2).padStart(32, '0');
            
            // Embed the length
            for (let i = 0; i < 32; i++) {
              // Each color channel holds 1 bit in standard mode
              // or 2 bits in enhanced mode
              if (level === 'enhanced') {
                // Modify 2 least significant bits of each byte
                pixels[i] = (pixels[i] & 0xFC) | parseInt(dataLengthBinary.substr(i * 2, 2), 2);
              } else {
                // Modify only the least significant bit
                pixels[i] = (pixels[i] & 0xFE) | parseInt(dataLengthBinary.charAt(i), 2);
              }
            }
            
            // Embed the data
            const dataOffset = 32; // Start after the length
            for (let i = 0; i < binaryData.length; i++) {
              const pixelIndex = dataOffset + i;
              
              if (level === 'enhanced') {
                // In enhanced mode, we can embed 2 bits per byte
                const bitPair = binaryData.substr(i * 2, 2).padEnd(2, '0');
                pixels[pixelIndex] = (pixels[pixelIndex] & 0xFC) | parseInt(bitPair, 2);
                i++; // Skip the next bit as we've already used it
              } else {
                // In standard mode, we embed 1 bit per byte
                pixels[pixelIndex] = (pixels[pixelIndex] & 0xFE) | parseInt(binaryData.charAt(i), 2);
              }
              
              if (pixelIndex >= pixels.length) break;
            }
            
            // Put the modified pixels back into the canvas
            ctx.putImageData(imageData, 0, 0);
            
            // Convert the canvas to a new image file
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to create image blob'));
              }
            }, imageFile.type);
          } catch (error) {
            reject(error);
          }
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        
        img.src = reader.result as string;
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read image file'));
      };
      
      reader.readAsDataURL(imageFile);
    });
  }

  /**
   * Extracts encrypted data from an image
   */
  private static async extractFromImage(imageFile: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          try {
            // Create a canvas to manipulate the image
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              throw new Error('Could not create canvas context');
            }
            
            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0);
            
            // Get the image data
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            
            // First determine if we're using standard or enhanced mode
            // by checking if we can extract a valid length
            let dataLength: number;
            let isEnhanced = false;
            
            // Try standard mode first
            let lengthBinary = '';
            for (let i = 0; i < 32; i++) {
              lengthBinary += (pixels[i] & 0x01).toString();
            }
            dataLength = parseInt(lengthBinary, 2);
            
            // If length seems invalid, try enhanced mode
            if (dataLength <= 0 || dataLength > pixels.length) {
              isEnhanced = true;
              lengthBinary = '';
              for (let i = 0; i < 16; i++) {
                // Extract 2 bits per byte in enhanced mode
                lengthBinary += ((pixels[i] & 0x03).toString(2)).padStart(2, '0');
              }
              dataLength = parseInt(lengthBinary, 2);
              
              // If still invalid, the image probably doesn't contain hidden data
              if (dataLength <= 0 || dataLength > pixels.length * 2) {
                throw new Error('No valid hidden data found in this image');
              }
            }
            
            // Extract the data
            let binaryData = '';
            const dataOffset = 32; // Start after the length
            
            if (isEnhanced) {
              // In enhanced mode, extract 2 bits per byte
              for (let i = 0; i < Math.ceil(dataLength / 2); i++) {
                const pixelIndex = dataOffset + i;
                if (pixelIndex < pixels.length) {
                  const bitPair = (pixels[pixelIndex] & 0x03).toString(2).padStart(2, '0');
                  binaryData += bitPair;
                }
              }
            } else {
              // In standard mode, extract 1 bit per byte
              for (let i = 0; i < dataLength; i++) {
                const pixelIndex = dataOffset + i;
                if (pixelIndex < pixels.length) {
                  binaryData += (pixels[pixelIndex] & 0x01).toString();
                }
              }
            }
            
            // Convert binary to text
            const extractedText = this.binaryToText(binaryData.substring(0, dataLength));
            resolve(extractedText);
          } catch (error) {
            reject(error);
          }
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        
        img.src = reader.result as string;
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read image file'));
      };
      
      reader.readAsDataURL(imageFile);
    });
  }

  /**
   * Converts text to binary string
   */
  private static textToBinary(text: string): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const binary = text.charCodeAt(i).toString(2).padStart(8, '0');
      result += binary;
    }
    return result;
  }

  /**
   * Converts binary string to text
   */
  private static binaryToText(binary: string): string {
    let result = '';
    // Process 8 bits at a time
    for (let i = 0; i < binary.length; i += 8) {
      const byte = binary.substr(i, 8);
      result += String.fromCharCode(parseInt(byte, 2));
    }
    return result;
  }
}

export default Steganography;