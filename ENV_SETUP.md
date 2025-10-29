# Environment Variables Setup Guide

This document provides detailed instructions on how to set up the environment variables required for the Toraje project.

## Quick Start

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in the required values in your `.env` file following the instructions below.

## Required Environment Variables

### Firebase Configuration (7 variables)

These variables configure the Firebase Realtime Database connection for storing encrypted file data.

#### Where to Get Firebase Configuration Values:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click on the gear icon ⚙️ next to "Project Overview" → "Project Settings"
4. Scroll down to "Your apps" section
5. If you haven't added a web app, click "Add app" and select the web platform (</> icon)
6. Copy the configuration values from the `firebaseConfig` object

#### Firebase Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_FIREBASE_API_KEY` | Your Firebase project API key | `AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase authentication domain | `your-project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Your Firebase project ID | `your-project-id` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket URL | `your-project.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Cloud Messaging sender ID | `123456789012` |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | `1:123456789012:web:abcdef123456` |
| `VITE_FIREBASE_MEASUREMENT_ID` | Google Analytics measurement ID (optional) | `G-XXXXXXXXXX` |

### Master Encryption Key (1 variable)

This is a critical security variable used for encrypting file encryption keys.

#### `VITE_MASTER_KEY`

**Purpose**: This master key is used to encrypt the individual file encryption keys. Each file gets its own random AES-256 encryption key, which is then encrypted using this master key before storage.

**How to Generate**:

Option 1 - Using Node.js (recommended):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Option 2 - Using OpenSSL:
```bash
openssl rand -hex 32
```

Option 3 - Using online generator (less secure):
Visit a trusted random string generator and create a 64-character hexadecimal string.

**Security Best Practices**:
- Generate a strong, random 64-character hexadecimal string (256 bits)
- **NEVER commit this key to version control**
- Keep this key secret and secure
- Use different keys for development and production environments
- Store production keys in secure environment variable management systems (e.g., Vercel, Netlify, AWS Secrets Manager)
- If compromised, all previously uploaded files will need to be re-encrypted with a new key

**Example**:
```env
VITE_MASTER_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

## Setting Up Your Environment

### Development Environment

1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

2. Fill in all the values:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
   VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   
   # Encryption Master Key
   VITE_MASTER_KEY=your_generated_master_key_here
   ```

3. Verify your setup by running:
   ```bash
   npm run dev
   ```

### Production Environment

For production deployments (Vercel, Netlify, etc.):

1. **Do NOT commit your `.env` file**
2. Add environment variables through your hosting platform's dashboard:

#### Vercel:
- Go to Project Settings → Environment Variables
- Add each variable with its corresponding value
- Set the environment (Production, Preview, Development)

#### Netlify:
- Go to Site Settings → Build & Deploy → Environment
- Click "Edit variables"
- Add each variable with its corresponding value

#### Other Platforms:
- Consult your platform's documentation for environment variable configuration

## Firebase Database Setup

After configuring your environment variables, you need to set up Firebase Realtime Database:

1. Go to Firebase Console → Realtime Database
2. Click "Create Database"
3. Choose a location
4. Start in **test mode** for development (remember to update rules later)
5. Update database rules for production:

```json
{
  "rules": {
    "files": {
      ".read": "auth != null || !data.exists()",
      ".write": "auth != null || !data.exists()",
      "$fileId": {
        ".read": true,
        ".write": true,
        ".validate": "newData.hasChildren(['data', 'encryptedKey', 'fileType', 'fileName', 'fileSize', 'expiresAt']) && newData.child('expiresAt').isNumber() && newData.child('expiresAt').val() < (now + 69 * 60 * 1000) && newData.child('expiresAt').val() > now"
      }
    }
  }
}
```

## Troubleshooting

### Error: "VITE_MASTER_KEY is not defined"
- Make sure you have created a `.env` file in the project root
- Verify that `VITE_MASTER_KEY` is set in your `.env` file
- Restart your development server after adding/modifying environment variables

### Firebase Connection Errors
- Double-check all Firebase configuration values
- Ensure your Firebase project is active and not disabled
- Verify database rules allow read/write access
- Check Firebase console for any quota limits or billing issues

### Files Not Uploading/Downloading
- Verify Firebase Realtime Database is enabled
- Check database rules allow proper access
- Ensure `VITE_MASTER_KEY` is correctly set and matches between upload and download

## Security Notes

⚠️ **Important Security Considerations**:

1. **Never commit `.env` files** - The `.env` file is already in `.gitignore`
2. **Use different keys for different environments** - Development and production should use separate master keys
3. **Rotate keys periodically** - Consider rotating the master key regularly for enhanced security
4. **Monitor Firebase usage** - Set up billing alerts and monitor for unusual activity
5. **⚠️ CRITICAL: Client-side encryption limitation** - The current implementation stores the `VITE_MASTER_KEY` as a client-side environment variable, which means it's exposed in the compiled JavaScript bundle. This is a known architectural limitation - any user can inspect the browser's network requests or JavaScript to retrieve this key. For production use with sensitive data, consider:
   - Moving encryption key management to a secure backend service
   - Implementing additional authentication layers
   - Using Firebase Authentication with security rules
   - Considering this as a convenience tool rather than a high-security solution
6. **Firebase Database Access** - The database rules allow read/write access to file nodes. Ensure you understand the security implications and adjust rules based on your specific security requirements

## Need Help?

If you encounter issues setting up environment variables:

1. Check this guide thoroughly
2. Review the [main README.md](README.md) for general setup instructions
3. Verify all values are correctly formatted (no extra spaces, quotes, etc.)
4. Ensure you've restarted your development server after changes
5. Check the browser console for specific error messages

For Firebase-specific issues, refer to the [Firebase Documentation](https://firebase.google.com/docs).
