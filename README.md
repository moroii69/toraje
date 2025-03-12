# Toraje

A lightweight, secure file-sharing web application that allows users to exchange files privately and temporarily through encrypted channels.

## Overview

Toraje is a React-based web application that enables users to share files securely with a simple, ephemeral approach:

1. **Upload** - Share a file (up to 20MB)
2. **Share** - Get a 6-digit access code
3. **Download** - Recipient uses the code to access the file
4. **Auto-Expire** - Files automatically delete after 69 minutes

All files are protected with AES-256 encryption and are accessible only with the unique access code.

## Features

- **End-to-End Encryption**: Files are encrypted using AES-256 before storage
- **No Registration Required**: Share files instantly without account creation
- **Ephemeral Storage**: All files automatically delete after 69 minutes
- **Privacy-Focused**: No tracking, no logs, no persistent data
- **Intuitive Interface**: Simple drag-and-drop file uploads
- **Mobile Responsive**: Works seamlessly across devices
- **Lightweight**: Fast loading and minimal dependencies

## Technology Stack

- **Frontend**: React.js with Vite
- **UI Framework**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Firebase Realtime Database
- **Encryption**: CryptoJS (AES-256)
- **File Handling**: Browser File API, Uint8Array
- **Notifications**: React Hot Toast

## Installation

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Firebase account

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/Toraje.git
cd Toraje
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the project root with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_MASTER_KEY=your_master_encryption_key
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Build for production:

```bash
npm run build
# or
yarn build
```

## Firebase Configuration

### Database Rules

For proper security, configure your Firebase Realtime Database rules:

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

## Security Architecture

Toraje implements a multi-layered security approach:

1. **Client-Side Encryption**: Files are encrypted in the browser before transmission
2. **Dual-Key System**: Each file gets a unique encryption key, which is itself encrypted
3. **Temporary Storage**: Files exist only for 69 minutes maximum
4. **One-Time Access**: Files are deleted after successful download
5. **No Server Processing**: Files are processed entirely in the client browser

### Encryption Process

1. Generate random 16-byte key: `CryptoJS.lib.WordArray.random(16)`
2. Encrypt file with AES-256: `CryptoJS.AES.encrypt(fileData, randomKey)`
3. Encrypt the random key with master key: `CryptoJS.AES.encrypt(randomKey, MASTER_KEY)`
4. Store encrypted data and encrypted key in Firebase

### Decryption Process

1. Retrieve encrypted data and encrypted key
2. Decrypt the random key: `CryptoJS.AES.decrypt(encryptedKey, MASTER_KEY)`
3. Decrypt the file: `CryptoJS.AES.decrypt(encryptedData, decryptedKey)`
4. Convert to downloadable file format

## Usage

### Sending a File

1. Visit the application URL
2. Drag and drop a file (up to 20MB) onto the upload area
3. Wait for encryption and upload to complete
4. Copy the 6-digit access code
5. Share the code with your recipient along with the application URL

### Receiving a File

1. Visit the application URL
2. Enter the 6-digit access code in the download section
3. Wait for decryption to complete
4. The file will automatically download to your device
5. The file is immediately deleted from storage after download

## Component Structure

The application is organized into the following main components:

- `App.jsx`: Main application container
- `FileUpload.jsx`: Handles file selection and upload
- `FileDownload.jsx`: Manages code entry and file retrieval
- `HowItWorks.jsx`: Detailed explanation of the file sharing process
- `Navbar.jsx`: Application navigation
- `Footer.jsx`: Application footer with links

## Limitations

- **File Size**: Maximum file size is 20MB
- **Expiration**: Files expire after 69 minutes
- **Single Use**: Each file can be downloaded only once
- **Browser Support**: Requires modern browsers with File API support

## Roadmap

- [ ] Multiple file uploads
- [ ] Email notifications
- [ ] Password protection (optional)
- [ ] Extended expiration options
- [ ] File preview for common formats
- [ ] Progressive Web App support
- [ ] Custom branding options

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [CryptoJS](https://github.com/brix/crypto-js)
- [Lucide React](https://lucide.dev/)
- [React Dropzone](https://react-dropzone.js.org/)
- [React Hot Toast](https://react-hot-toast.com/)