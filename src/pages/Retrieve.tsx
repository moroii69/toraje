import { get, ref } from 'firebase/database';
import { AlertCircle, Download } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { db } from '../firebase';
import CryptoJS from 'crypto-js';

// Access the master key from environment variables (temporary for client-side; move to server in prod)
const MASTER_KEY = import.meta.env.VITE_MASTER_KEY;

if (!MASTER_KEY) {
  throw new Error('VITE_MASTER_KEY is not defined in the environment variables. Please configure your environment.');
}

const Retrieve = () => {
  const [retrieveCode, setRetrieveCode] = useState('');
  const [isRetrieving, setIsRetrieving] = useState(false);

  // Validate the retrieve code format (6 characters, alphanumeric)
  const isValidCode = (code: string) => /^[A-Za-z0-9]{6}$/.test(code);

  const retrieveFile = async () => {
    if (!retrieveCode || retrieveCode.length !== 6) {
      toast.error('Please enter a 6-digit code.');
      return;
    }

    const code = retrieveCode.toUpperCase();
    if (!isValidCode(code)) {
      toast.error('Invalid code format. Use 6 alphanumeric characters (e.g., Q9042Y).');
      return;
    }

    setIsRetrieving(true);
    try {
      // Fetch file data from Firebase
      const snapshot = await get(ref(db, `files/${code}`));
      if (!snapshot.exists()) {
        toast.error('The code is invalid or the file has expired.');
        return;
      }

      const fileData = snapshot.val();

      // Check expiration
      if (Date.now() > fileData.expiresAt) {
        toast.error('This file has expired and is no longer available.');
        await set(ref(db, `files/${code}`), null); // Clean up expired data
        return;
      }

      // Decrypt the encryption key
      const decryptedKeyBytes = CryptoJS.AES.decrypt(fileData.encryptedKey, MASTER_KEY);
      const encryptionKey = decryptedKeyBytes.toString(CryptoJS.enc.Utf8);

      if (!encryptionKey) {
        toast.error('Unable to decrypt the file. Please contact the uploader.');
        return;
      }

      // Decrypt the file data
      const decryptedBytes = CryptoJS.AES.decrypt(fileData.data, encryptionKey);
      let decryptedBase64 = decryptedBytes.toString(CryptoJS.enc.Utf8);

      // Fallback to Base64 if Utf8 fails (for binary data)
      if (!decryptedBase64 || decryptedBase64.length === 0) {
        decryptedBase64 = decryptedBytes.toString(CryptoJS.enc.Base64);
      }

      if (!decryptedBase64 || decryptedBase64.length === 0) {
        toast.error('Decryption failed. The file may be corrupted.');
        return;
      }

      // Remove the 'data:[type];base64,' prefix
      const prefixMatch = decryptedBase64.match(/^data:[\w\/\-\+]+;base64,/i);
      let base64Data = decryptedBase64;
      if (prefixMatch && prefixMatch[0]) {
        base64Data = decryptedBase64.substring(prefixMatch[0].length);
      }

      // Clean the Base64 string
      let cleanBase64 = base64Data.replace(/\0/g, '').replace(/\s/g, '');
      while (cleanBase64.length % 4 !== 0) {
        cleanBase64 += '='; // Pad with '=' if necessary
      }

      // Validate Base64 string
      if (!/^[A-Za-z0-9+/=]+$/.test(cleanBase64)) {
        toast.error('Decryption failed: Invalid file data.');
        return;
      }

      // Convert Base64 to binary and create a Blob
      const byteCharacters = atob(cleanBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Create Blob with the correct file type
      const blob = new Blob([byteArray], { type: fileData.fileType });
      const url = URL.createObjectURL(blob);

      // Trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = fileData.fileName || 'downloaded-file';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up

      toast.success('File retrieved successfully!');
    } catch (error) {
      console.error('Retrieve Error:', error);
      if (error instanceof Error) {
        if (error.message.includes('network')) {
          toast.error('Network error. Please check your connection and try again.');
        } else {
          toast.error('An error occurred while retrieving the file. Please try again later.');
        }
      } else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsRetrieving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-medium mb-8 text-white">Retrieve File</h1>

      <div className="bg-gray-900/40 rounded-xl border border-gray-800 p-8 backdrop-blur-sm">
        <div className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-400 mb-2">
              Enter Your 6-Digit Code
            </label>
            <input
              id="code"
              type="text"
              placeholder="Enter 6-digit code (e.g., Q9042Y)"
              value={retrieveCode}
              onChange={(e) => setRetrieveCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 text-xl font-mono bg-black/60 border border-gray-700 rounded-lg
                focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none
                tracking-wider text-center uppercase text-white transition-all duration-300"
              maxLength={6}
              disabled={isRetrieving}
            />
          </div>

          <button
            onClick={retrieveFile}
            disabled={retrieveCode.length !== 6 || isRetrieving}
            className={`w-full py-3.5 px-4 rounded-lg font-medium text-black transition-all duration-300
              flex items-center justify-center gap-2
              ${retrieveCode.length === 6 && !isRetrieving
                ? 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700'
                : 'bg-gray-700/80 cursor-not-allowed'}`}
          >
            {isRetrieving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                <span>Retrieving...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Retrieve File</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-8 p-6 bg-black/60 rounded-lg border border-gray-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-3">
              <p className="text-sm text-gray-300">
                Files are automatically deleted after 69 minutes for security.
                Make sure to download your file before it expires!
              </p>
              <p className="text-sm text-gray-400">
                Enter the 6-digit code you received to download your file.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Retrieve;