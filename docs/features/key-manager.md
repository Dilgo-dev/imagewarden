# 🔐 ImageWarden Key Manager Feature Documentation

## 📋 Overview

The Key Manager branch introduces a robust encryption key management system to ImageWarden, allowing users to securely encrypt their sensitive information before hiding it in images. This feature ensures that even if someone extracts hidden data from images, they cannot read the actual content without the correct encryption key.

## ✨ New Features

- **🔑 Key Generation**: Automatic secure random key generation
- **📋 Key Management UI**: User-friendly interface for viewing and managing encryption keys
- **🔄 Key Rotation**: Ability to regenerate keys as needed
- **✏️ Custom Keys**: Support for user-defined custom encryption keys
- **📦 Secure Storage**: Keys are securely stored in the application
- **📋 Clipboard Support**: One-click copy of keys for backup purposes

## 🏗️ Architecture

The Key Manager implementation consists of three main components:

### 1. ⚙️ Key Manager Utility (`src/utils/keyManager.ts`)

The core utility class that handles key generation, storage, and retrieval:

```typescript
export class KeyManager {
  private storageKey: string;
  private keyLength: number;
  
  // Creates a Key Manager with optional configuration
  constructor(options: KeyManagerOptions = {}) {
    this.storageKey = options.storageKey || 'imagewarden-encryption-key';
    this.keyLength = options.keyLength || 32; // 256 bits
  }
  
  // Generates a cryptographically secure random key
  generateKey(): string { ... }
  
  // Saves an encryption key to storage
  async saveKey(key: string): Promise<void> { ... }
  
  // Retrieves the encryption key from storage
  async getKey(): Promise<string | null> { ... }
  
  // Checks if a key already exists
  async keyExists(): Promise<boolean> { ... }
}
```

### 2. 🖥️ User Interface (`src/components/settings/KeyManagementPanel.tsx`)

A React component that provides a user-friendly interface for key management:

- Displays the current encryption key
- Allows copying the key to clipboard
- Provides button to generate a new random key
- Supports entering a custom encryption key
- Shows validation and error messages

### 3. 🔒 Secure Storage Implementation (`electron/main.ts`)

For the desktop application, encryption keys are securely stored using:

- Double-encryption with a master key
- Storage in the app's secure user data directory
- IPC communication between the UI and secure storage

## 🔄 How It Works

### Key Generation

1. The system uses the Web Crypto API (`window.crypto.getRandomValues()`) to generate cryptographically secure random keys
2. Default key length is 32 bytes (256 bits) for strong security
3. Keys are represented as hexadecimal strings for convenient display and storage

### Key Storage Flow

1. When a key is saved via `keyManager.saveKey()`:
   - In the web app: Stored in localStorage (browser)
   - In the desktop app: Encrypted with the app's master key and saved to the file system

2. The Electron app implements additional security:
   - A master encryption key is generated for the app installation
   - User keys are encrypted using AES-256-CBC before being written to disk
   - Encrypted keys are stored in the app's secure storage directory

### User Experience

1. On first launch, a random key is automatically generated
2. Users can view their current key in the Settings screen
3. The key can be:
   - Copied to clipboard for backup (with visual confirmation)
   - Regenerated when needed (with warning about losing access to previously encrypted data)
   - Replaced with a custom key (with minimum length validation)

4. Error handling provides clear feedback for any issues

## 🚨 Security Considerations

- Keys must be at least 16 characters long for custom keys
- The application warns users about the importance of backing up their keys
- Users are informed that losing a key means losing access to data encrypted with that key
- The UI includes security notices about proper key management

## 🔮 Future Improvements

Potential enhancements for the Key Manager feature:

- Key export/import functionality
- Multiple named keys for different use cases
- Password-based encryption for additional protection
- Cloud backup options for keys (with appropriate security)
