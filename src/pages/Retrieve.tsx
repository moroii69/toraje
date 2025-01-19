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
        toast.error('invalid or expired code');
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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">retrieve file</h1>
      
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-zinc-400 mb-1">
              enter your 6-digit code
            </label>
            <input
              id="code"
              type="text"
              placeholder="enter 6-digit code"
              value={retrieveCode}
              onChange={(e) => setRetrieveCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 text-lg font-mono bg-black border border-zinc-700 rounded-lg 
                focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none 
                tracking-wider text-center uppercase text-white"
              maxLength={6}
            />
          </div>
          
          <button
            onClick={retrieveFile}
            disabled={retrieveCode.length !== 6 || isRetrieving}
            className={`w-full py-4 px-6 rounded-lg font-medium text-black transition-all transform
              flex items-center justify-center gap-2
              ${retrieveCode.length === 6 && !isRetrieving
                ? 'bg-emerald-500 hover:bg-emerald-600 hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-zinc-700 cursor-not-allowed'}`}
          >
            {isRetrieving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                retrieving...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                retrieve File
              </>
            )}
          </button>
        </div>

        <div className="mt-6 p-4 bg-zinc-800 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-sm text-zinc-300">
                files are automatically deleted after 69 minutes for security.
                make sure to download your file before it expires!
              </p>
              <p className="text-sm text-zinc-400">
                enter the 6-digit code you received to download your file.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Retrieve;