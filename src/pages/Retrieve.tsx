import { get, ref, set } from 'firebase/database';
import { AlertCircle, Download } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { db } from '../firebase';

const Retrieve = () => {
  const [retrieveCode, setRetrieveCode] = useState('');
  const [isRetrieving, setIsRetrieving] = useState(false);

  const retrieveFile = async () => {
    if (!retrieveCode) return;

    setIsRetrieving(true);
    try {
      const snapshot = await get(ref(db, `files/${retrieveCode.toUpperCase()}`));

      if (!snapshot.exists()) {
        toast.error('The code is invalid or has expired.');
        return;
      }

      const fileData = snapshot.val();

      if (Date.now() > fileData.expiresAt) {
        toast.error('this code has expired');
        await set(ref(db, `files/${retrieveCode.toUpperCase()}`), null);
        return;
      }

      const link = document.createElement('a');
      link.href = fileData.data;
      link.download = fileData.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('file retrieved successfully!');
    } catch (error) {
      console.error('error retrieving file:', error);
      toast.error('failed to retrieve file');
    } finally {
      setIsRetrieving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium mb-8 text-white">Retrieve file</h1>

      <div className="bg-gray-900 bg-opacity-40 rounded-md border border-gray-800 p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-xs font-medium text-gray-400 mb-1">
              Enter your 6-digit code
            </label>
            <input
              id="code"
              type="text"
              placeholder="Enter 6-digit code"
              value={retrieveCode}
              onChange={(e) => setRetrieveCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-2.5 text-lg font-mono bg-black border border-gray-700 rounded
                focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 outline-none
                tracking-wider text-center uppercase text-white"
              maxLength={6}
            />
          </div>

          <button
            onClick={retrieveFile}
            disabled={retrieveCode.length !== 6 || isRetrieving}
            className={`w-full py-3 px-4 rounded font-medium text-black transition-all
              flex items-center justify-center gap-2
              ${retrieveCode.length === 6 && !isRetrieving
                ? 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700'
                : 'bg-gray-700 cursor-not-allowed'}`}
          >
            {isRetrieving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                <span>Retrieving...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Retrieve File</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-6 p-4 bg-black rounded border border-gray-800">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-xs text-gray-300">
                Files are automatically deleted after 69 minutes for security.
                Make sure to download your file before it expires!
              </p>
              <p className="text-xs text-gray-400">
                Enter the 6-digit code you received to download your file.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Retrieve;