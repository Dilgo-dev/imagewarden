# 🔐 ImageWarden Authentication System

## 📋 Overview

The Authentication System introduces secure password protection to the ImageWarden application, requiring users to authenticate before accessing any functionality. This system was designed following GDPR (General Data Protection Regulation) recommendations for secure password policies and implements industry best practices for credential management.

## ✨ Key Features

- **🔒 Secure Master Password Protection**: Requires authentication to access the application
- **🛡️ GDPR-Compliant Password Requirements**: Enforces robust password policies
- **⏱️ Automatic Session Timeout**: Logs out after 30 minutes of inactivity
- **🔄 Password Change Functionality**: Allows users to update their master password
- **🏠 Session Persistence**: Remembers authenticated state across app restarts
- **🔐 Secure Password Storage**: Uses PBKDF2 with salt for secure password hashing

## 📊 Password Requirements

The system enforces the following password requirements, following GDPR recommendations:

- **📏 Minimum Length**: At least 12 characters
- **🔠 Character Variety**:
  - At least one uppercase letter (A-Z)
  - At least one lowercase letter (a-z)
  - At least one digit (0-9)
  - At least one special character (non-alphanumeric)
- **📈 Password Strength Meter**: Visual feedback on password strength

## 🔧 Technical Implementation

### Password Hashing and Security

The authentication system uses industry-standard security practices:

1. **🧂 Salting**: Each password is stored with a unique salt
2. **🔐 PBKDF2**: Uses PBKDF2 (Password-Based Key Derivation Function 2) with 10,000 iterations
3. **🔑 Secure Storage**: Password hashes are stored in encrypted local storage (Electron) or localStorage (web dev environment)

### Authentication Flow

1. **👤 First-Time Setup**:
   - On first launch, user creates a master password
   - Password is validated against GDPR-compliant requirements
   - Hashed password is securely stored

2. **🔑 Authentication**:
   - User enters password to unlock the application
   - Input is hashed and compared to stored hash
   - Success grants access to the application

3. **⏱️ Session Management**:
   - Session is maintained during active use
   - Application logs out after 30 minutes of inactivity
   - Session state is preserved across application restarts

4. **🔄 Password Change**:
   - User can change password from Settings
   - Current password must be verified before setting new password
   - New password must meet all security requirements

## 💻 Components Overview

### 1. AuthManager Utility

Core utility class that handles all authentication logic:

- `validatePassword()`: Ensures password meets security requirements
- `setPassword()`: Securely hashes and stores a new password
- `authenticate()`: Verifies a provided password
- `hasPassword()`: Checks if a password is already set

### 2. User Interface Components

- `AuthView`: Main authentication container that handles login/register switching
- `LoginForm`: Form for returning users to enter their password
- `PasswordCreationForm`: Form for first-time setup with strength indicators
- `AuthenticationPanel`: Settings panel for password changes and logout

### 3. Secure Storage

For Electron builds:
- Passwords are double-encrypted with application master key
- Stored in secure user data directory

For development/web builds:
- Uses localStorage with appropriate security measures

## 🔒 Security Considerations

- **🔑 No Plain-Text Storage**: Passwords are never stored in plain text
- **🛡️ Strong Hashing**: PBKDF2 with 10,000 iterations for brute-force resistance
- **📤 Auto-Logout**: Automatic session termination for idle sessions
- **🙈 Password Masking**: Passwords are masked by default with toggle option

## 🚀 Future Enhancements

Potential security improvements for future versions:

- **👆 Biometric Authentication**: Add fingerprint/face recognition support for desktop platforms
- **🔔 Device Notifications**: Alert user when login occurs from a new device
- **📱 Two-Factor Authentication**: Implement 2FA for additional security
- **🔒 Master Key Encryption**: Use master password to encrypt all other application data
- **⏱️ Configurable Timeout**: Allow users to customize auto-logout timing

## 📚 Usage Examples

### Setting Up a Master Password

When first launching the application, users are prompted to create a master password:

1. Password must be at least 12 characters long
2. Must include uppercase, lowercase, number, and special character
3. Visual strength meter provides feedback
4. Password confirmation ensures correct input

### Changing the Master Password

From the Settings screen:

1. Click "Change Password" in the Authentication panel
2. Enter current password for verification
3. Enter and confirm new password
4. Password strength meter ensures robust security
5. New password is stored securely after validation

### Session Management

- Sessions persist across application restarts until manually logged out
- After 30 minutes of inactivity, user is automatically logged out
- User activity (mouse movement, keystrokes, clicks) resets the timeout timer