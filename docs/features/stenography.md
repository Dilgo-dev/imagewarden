# 🔐 Steganography Utility Documentation

## 📋 Overview

The `Steganography` class provides functionality to securely hide sensitive information within images using steganography techniques combined with encryption. This utility integrates with the `KeyManager` to encrypt data before embedding it into an image, providing dual-layer security for your hidden information.

## 🔑 Key Features

- **🔒 End-to-End Encryption**: All sensitive data is encrypted using AES-256 before being hidden
- **📊 LSB Steganography**: Uses Least Significant Bit (LSB) technique to hide data invisibly
- **🛡️ Multiple Security Levels**: Choose between standard and enhanced protection modes
- **🧪 Salt-Based Key Derivation**: Uses PBKDF2 for secure key derivation with random salt
- **🔄 Seamless Integration**: Works with the application's KeyManager for consistent encryption

## 📚 API Reference

### 📥 Hiding Data in Images

```typescript
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
): Promise<Blob>
```

### 📤 Extracting Data from Images

```typescript
/**
 * Extracts and decrypts hidden data from an image
 * @param imageData - The image potentially containing hidden data
 * @returns Promise with the extracted secret text
 */
static async extractData(imageData: File): Promise<string>
```

## 🔧 How It Works

### 🔐 Encryption Process

1. **🗝️ Key Retrieval**: Gets the encryption key from the KeyManager
2. **🧂 Salt Generation**: Creates a random salt for additional security
3. **🔑 Key Derivation**: Uses PBKDF2 to derive a secure key from the master key and salt
4. **🔀 IV Generation**: Generates a random Initialization Vector for AES-CBC encryption
5. **🔒 Encryption**: Encrypts the data using AES-256 in CBC mode with PKCS7 padding

### 📷 Embedding Process (Standard Mode)

1. **🖼️ Image Loading**: Loads the image onto a canvas for pixel manipulation
2. **🔢 Binary Conversion**: Converts encrypted data to binary format
3. **📏 Size Validation**: Ensures the image has enough capacity to hold the data
4. **📋 Length Embedding**: First embeds the data length (32 bits) for later extraction
5. **🧩 Data Embedding**: Modifies the least significant bit (LSB) of each pixel to store data
6. **💾 Image Creation**: Generates a new image file with the embedded data

### 📷 Embedding Process (Enhanced Mode)

Similar to standard mode, but uses 2 least significant bits per byte to store data, providing:
- **⚡ Increased Capacity**: Can store twice as much data in the same image size
- **🛡️ Better Security**: Data pattern is less detectable than single-bit modifications
- **🔄 Trade-off**: Slight potential for visual differences in high-contrast areas

### 🔍 Extraction Process

1. **🖼️ Image Loading**: Loads the encoded image onto a canvas
2. **🔎 Mode Detection**: Automatically detects whether standard or enhanced mode was used
3. **📏 Length Extraction**: Extracts the embedded data length first
4. **🔢 Data Extraction**: Extracts the binary data from LSBs according to detected mode
5. **🧬 Binary Conversion**: Converts the binary data back to text format
6. **🔓 Decryption**: Uses the KeyManager's key to decrypt the extracted data

## ⚙️ Security Features

### 🛡️ Standard Mode vs. Enhanced Mode

| Feature | Standard Mode | Enhanced Mode |
|---------|---------------|--------------|
| **🧩 Bits per byte** | 1 bit (LSB only) | 2 bits (2 LSBs) |
| **💾 Data capacity** | 1/8 of image size | 1/4 of image size |
| **👁️ Visual impact** | Practically invisible | Minimal, may be noticeable in high-contrast areas |
| **🛡️ Security level** | Good | Better |
| **🚀 Processing speed** | Faster | Slightly slower |
| **🔐 Encryption iterations** | 1,000 | 10,000 |

### 🔒 Encryption Details

- **🔑 Algorithm**: AES-256-CBC with PKCS7 padding
- **🧂 Salt**: Random 128-bit salt unique for each encryption
- **🔀 IV**: Random 128-bit initialization vector
- **🧬 Key Derivation**: PBKDF2 with configurable iterations (1,000 or 10,000)
- **🧮 Format**: `salt + iv + ciphertext` in hexadecimal format

## 🚨 Error Handling

The utility implements comprehensive error handling for various scenarios:

- **🔑 Missing Key**: Throws error if no encryption key is available
- **📏 Image Too Small**: Validates image capacity before attempting to embed data
- **📖 Invalid Data**: Detects when an image doesn't contain valid hidden data
- **🔓 Decryption Failure**: Handles incorrect keys or corrupted data appropriately

## 🚀 Usage Examples

### Hiding Data in an Image

```typescript
import Steganography from "../utils/steganography";

// Assume we have a File object from a file input
const imageFile: File = /* from file input */;
const secretText = "My super secret password";

try {
  // Hide the secret in the image with enhanced security
  const encodedImage = await Steganography.hideData(
    imageFile,
    secretText,
    "enhanced"
  );
  
  // Create a download link for the new image
  const url = URL.createObjectURL(encodedImage);
  const a = document.createElement("a");
  a.href = url;
  a.download = `encoded_${imageFile.name}`;
  a.click();
  URL.revokeObjectURL(url);
} catch (error) {
  console.error("Error hiding data:", error);
}
```

### Extracting Data from an Image

```typescript
import Steganography from "../utils/steganography";

// Assume we have a File object from a file input
const encodedImageFile: File = /* from file input */;

try {
  // Extract the hidden secret from the image
  const extractedText = await Steganography.extractData(encodedImageFile);
  
  // Use the extracted text
  console.log("Extracted secret:", extractedText);
} catch (error) {
  console.error("Error extracting data:", error);
}
```

## 🔮 Technical Implementation Details

### 🧩 Least Significant Bit (LSB) Steganography

The LSB technique works by replacing the least significant bits of pixel data with bits from the secret message. Since the least significant bit has the smallest impact on the color value, changes are typically imperceptible to the human eye.

In standard mode, we modify only the least significant bit of each byte:
```
Original pixel byte: 10101100
Modified pixel byte: 10101101 (changed last bit to 1)
Visual difference: 1/255 change in intensity
```

In enhanced mode, we modify the two least significant bits:
```
Original pixel byte: 10101100
Modified pixel byte: 10101110 (changed last two bits to 10)
Visual difference: 2/255 change in intensity
```

### 🏗️ Data Structure

The data is embedded in this order:
1. **📏 Length header**: 32-bit integer indicating data size (in bits)
2. **📦 Encrypted data**: The actual encrypted message

This structure allows for reliable extraction even without knowing the original data size.

## ⚠️ Limitations

- **📦 Size Constraints**: The amount of data you can hide depends on the image size
- **🖼️ Format Sensitivity**: Some image formats (like JPEG) may compress and destroy hidden data
- **🔍 Not for Extreme Security**: While secure for normal use, it's not designed for military-grade applications

## 🔧 Best Practices

- **🖼️ Use PNG or BMP formats** for lossless storage of hidden data
- **📏 Keep secrets relatively small** compared to the image size
- **🔑 Keep your encryption key secure** as it's essential for data recovery
- **📱 Use enhanced mode** for more sensitive information
- **🔄 Verify** extracted data after important operations

## 🔮 Future Improvements

- **📊 Progressive encoding** to distribute data more evenly across the image
- **📝 Metadata cleaning** to remove image metadata that might reveal steganography usage
- **🧪 Multiple carrier formats** beyond images (audio, video)
- **🔀 Multiple encoding algorithms** for added security through obscurity