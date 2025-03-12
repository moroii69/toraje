import React from 'react';
import { FileUp, Download, Lock, Clock, AlertCircle, Shield } from 'lucide-react';
import NavSidebar from './NavSidebar'; // Import the sidebar

const HowItWorks = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 bg-black text-gray-200">
    <NavSidebar />

    {/* Part 1: Summary */}
    <section id="summary" className="mb-16">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">How It Works</h1>
      <p className="text-gray-200 mb-8">A quick overview of my secure file-sharing process — simple, private, and ephemeral.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: <FileUp className="w-8 h-8 text-emerald-500" />,
            title: 'Upload',
            desc: 'Upload your file (up to 20MB) with end-to-end encryption.'
          },
          {
            icon: <Lock className="w-8 h-8 text-emerald-500" />,
            title: 'Get Code',
            desc: 'Receive a unique 6-digit code to share with your recipient.'
          },
          {
            icon: <Download className="w-8 h-8 text-emerald-500" />,
            title: 'Download',
            desc: 'Recipient uses the code to securely download the file.'
          },
        ].map(({ icon, title, desc }, idx) => (
          <div key={idx} className="bg-emerald-900 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-black p-3 rounded-full shadow-sm">
                {icon}
              </div>
            </div>
            <h2 className="text-xl font-semibold text-center mb-2 text-emerald-400">{title}</h2>
            <p className="text-gray-200 text-center">{desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Part 2: Detailed Explanation */}
    <section className="prose prose-emerald max-w-none">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400 border-b border-emerald-800 pb-4">Detailed File-Sharing Process</h1>
      <p className="text-gray-200 mb-8">
        A comprehensive explanation of my file-sharing system's architecture, security protocols, and workflow — from encryption to expiration.
      </p>

      <div id="file-upload" className=" bg-black border border-gray-700 rounded-lg shadow-sm mb-10">
        <h2 className="text-2xl font-semibold p-6 text-emerald-400 border-b border-gray-700 bg-black">
          <div className="flex items-center gap-3">
            <FileUp className="w-6 h-6 text-emerald-500" />
            <span>1. File Upload</span>
          </div>
        </h2>
        <div className="p-6">
          <p className="mb-4 text-gray-300">
            The process begins when a user uploads a file through the intuitive interface, built with{' '}
            <a href="https://react-dropzone.js.org" className="text-emerald-400 font-medium hover:underline">
              react-dropzone
            </a>
            . This supports files up to 20MB, including:
          </p>

          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4 text-gray-200">
            <li className="flex items-center gap-2"><span className="bg-emerald-100 rounded-full w-2 h-2"></span> Images (JPG, PNG, GIF)</li>
            <li className="flex items-center gap-2"><span className="bg-emerald-100 rounded-full w-2 h-2"></span> Documents (PDF, DOCX)</li>
            <li className="flex items-center gap-2"><span className="bg-emerald-100 rounded-full w-2 h-2"></span> Spreadsheets (XLSX, CSV)</li>
            <li className="flex items-center gap-2"><span className="bg-emerald-100 rounded-full w-2 h-2"></span> Presentations (PPTX)</li>
            <li className="flex items-center gap-2"><span className="bg-emerald-100 rounded-full w-2 h-2"></span> HTML files</li>
            <li className="flex items-center gap-2"><span className="bg-emerald-100 rounded-full w-2 h-2"></span> Text files (TXT, MD)</li>
          </ul>

          <p className="mb-4 text-gray-300">
            The{' '}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" className="text-emerald-400 font-medium hover:underline">
              FileReader API
            </a>{' '}
            converts the file into a Base64-encoded string, prefixed with <code className="bg-gray-700 px-1 py-0.5 rounded text-emerald-400">data:[mime-type];base64,</code>. For example, a PNG becomes{' '}
            <code className="bg-gray-700 px-1 py-0.5 rounded text-emerald-400">data:image/png;base64,iVBORw0KGgo...</code>
          </p>

          <div className="bg-amber-900 border-l-4 border-amber-600 p-4 rounded-r-md">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-amber-300 text-sm">
                If the file exceeds the 20MB limit, an error notification appears via{' '}
                <a href="https://react-hot-toast.com" className="text-amber-400 underline">
                  react-hot-toast
                </a>{' '}
                and the upload process is halted.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="encryption" className="bg-black border border-gray-700 rounded-lg shadow-sm mb-10">
        <h2 className="text-2xl font-semibold p-6 text-emerald-400 border-b border-gray-700 bg-black">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-emerald-500" />
            <span>2. Encryption and Storage</span>
          </div>
        </h2>
        <div className="p-6">
          <p className="mb-4 text-gray-300">
            Security is my highest priority. My multi-layered encryption process ensures your data remains protected:
          </p>

          <ol className="list-decimal pl-5 mb-4 space-y-3 text-gray-300">
            <li>
              I generate a cryptographically secure random 16-byte encryption key using{' '}
              <a href="https://cryptojs.gitbook.io/docs" className="text-emerald-400 font-medium hover:underline">
                CryptoJS
              </a>{' '}
              (<code className="bg-gray-700 px-1 py-0.5 rounded text-emerald-400">CryptoJS.lib.WordArray.random(16)</code>).
            </li>
            <li>
              The Base64 data is encrypted with AES-256 via{' '}
              <code className="bg-gray-700 px-1 py-0.5 rounded text-emerald-400">CryptoJS.AES.encrypt</code>.
            </li>
            <li>
              The encryption key itself is then encrypted with a master key (stored in{' '}
              <code className="bg-gray-700 px-1 py-0.5 rounded text-emerald-400">import.meta.env.VITE_MASTER_KEY</code>).
            </li>
          </ol>

          <p className="mb-4 text-gray-300">
            A unique 6-digit alphanumeric code (e.g., <code className="bg-gray-700 px-1 py-0.5 rounded text-emerald-400">Q9042Y</code>) is generated, and all encrypted data is stored in{' '}
            <a href="https://firebase.google.com/docs/database" className="text-emerald-400 font-medium hover:underline">
              Firebase Realtime Database
            </a>
            , along with essential metadata.
          </p>

          <div className="bg-black p-4 rounded-md text-sm mb-4">
            <p className="font-medium mb-2 text-gray-300">Database entry structure:</p>
            <pre className="bg-black p-4 rounded-md text-emerald-200 overflow-x-auto">
              {JSON.stringify(
                {
                  data: "U2FsdGVkX1+Mj5bJxH5a8yF9...", // Encrypted base64 string
                  encryptedKey: "U2FsdGVkX19YtEX7y+EJw...", // Key encrypted with master key
                  fileType: "image/png",
                  fileName: "project-screenshot.png",
                  fileSize: 35226, // Size in bytes
                  expiresAt: 1683721245813, // Timestamp (69 minutes from upload)
                  uploadedAt: 1683717045813, // Timestamp of upload
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </div>

      <div id="security" className="bg-black border border-gray-700 rounded-lg shadow-sm mb-10">
        <h2 className="text-2xl font-semibold p-6 text-emerald-400 border-b border-gray-700 bg-black">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-emerald-500" />
            <span>3. Security Measures</span>
          </div>
        </h2>
        <div className="p-6">
          <p className="mb-4 text-gray-300">
            The security architecture implements multiple layers of protection to safeguard your data:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div className="border border-gray-700 rounded-md p-4 bg-black">
              <h3 className="font-semibold text-emerald-400 mb-2">Double-Layer Encryption</h3>
              <p className="text-gray-200 text-sm">
                Files are secured with two encryption layers: first with a random key, then that key is encrypted with a master key. This ensures that even if the database is compromised, the data remains unreadable without the master key.
              </p>
            </div>

            <div className="border border-gray-700 rounded-md p-4 bg-black">
              <h3 className="font-semibold text-emerald-400 mb-2">Time-Limited Availability</h3>
              <p className="text-gray-200 text-sm">
                The 69-minute expiration timestamp (<code className="bg-gray-700 px-1 py-0.5 rounded text-emerald-400">expiresAt</code>) triggers automatic deletion, enforced during retrieval attempts or via a scheduled cleanup process in my React components.
              </p>
            </div>

            <div className="border border-gray-700 rounded-md p-4 bg-black">
              <h3 className="font-semibold text-emerald-400 mb-2">Firebase Security Rules</h3>
              <p className="text-gray-200 text-sm">
                Custom Firebase Security Rules (configured in a separate file) restrict database access to authorized operations, preventing unauthorized data access or manipulation.
              </p>
            </div>

            <div className="border border-gray-700 rounded-md p-4 bg-black">
              <h3 className="font-semibold text-emerald-400 mb-2">No Persistent Storage</h3>
              <p className="text-gray-200 text-sm">
                Files exist only for the minimum time needed for sharing. After download or expiration, all data is permanently deleted from my systems, leaving no digital footprint.
              </p>
            </div>
          </div>

          <div className="bg-emerald-900 border-l-4 border-emerald-600 p-4 rounded-r-md">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <p className="text-emerald-400 text-sm">
                My encryption uses industry-standard AES-256, the same encryption standard used by governments and financial institutions worldwide to protect sensitive data.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="retrieval" className="bg-black border border-gray-700 rounded-lg shadow-sm mb-10">
        <h2 className="text-2xl font-semibold p-6 text-emerald-400 border-b border-gray-700 bg-black">
          <div className="flex items-center gap-3">
            <Download className="w-6 h-6 text-emerald-500" />
            <span>4. File Retrieval</span>
          </div>
        </h2>
        <div className="p-6">
          <p className="mb-4 text-gray-300">
            The recipient accesses the file through a streamlined process:
          </p>

          <ol className="list-decimal pl-5 mb-4 space-y-3 text-gray-300">
            <li>
              The recipient enters the 6-digit code on the retrieval page.
            </li>
            <li>
              The code is validated using a regex pattern (<code className="bg-gray-700 px-1 py-0.5 rounded text-emerald-400">/^[A-Za-z0-9]{6}$/</code>) before querying Firebase.
            </li>
            <li>
              If the code is valid, it checks if the file has expired. Expired files are automatically deleted, and the user is notified via{' '}
              <a href="https://react-hot-toast.com" className="text-emerald-400 font-medium hover:underline">
                react-hot-toast
              </a>.
            </li>
            <li>
              For valid, non-expired files, i:
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-200">
                <li>Decrypt the encrypted key using the master key</li>
                <li>Use the decrypted key to decrypt the file data</li>
                <li>Convert the Base64 data to a Blob using <code className="bg-gray-700 px-1 py-0.5 rounded text-emerald-400">atob</code> and <code className="bg-gray-700 px-1 py-0.5 rounded text-emerald-400">Uint8Array</code></li>
                <li>Create a temporary URL with <code className="bg-gray-700 px-1 py-0.5 rounded text-emerald-400">URL.createObjectURL</code></li>
                <li>Trigger the download with the original filename</li>
              </ul>
            </li>
            <li>
              After download, i clean up by revoking the temporary URL with{' '}
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL" className="text-emerald-400 font-medium hover:underline">
                URL.revokeObjectURL
              </a>
              .
            </li>
          </ol>

          <div className="bg-blue-900 border-l-4 border-blue-600 p-4 rounded-r-md">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-blue-300 text-sm">
                For security, files can only be downloaded once. After download, the entry is immediately removed from my database, preventing subsequent access attempts with the same code.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="cleanup" className="bg-black border border-gray-700 rounded-lg shadow-sm mb-10">
        <h2 className="text-2xl font-semibold p-6 text-emerald-400 border-b border-gray-700 bg-black">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-emerald-500" />
            <span>5. Post-Download Cleanup</span>
          </div>
        </h2>
        <div className="p-6">
          <p className="mb-4 text-gray-300">
            My ephemeral file-sharing system ensures no data persists longer than necessary:
          </p>

          <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-300">
            <li>
              After successful download, the database entry is immediately removed using Firebase's <code className="bg-gray-700 px-1 py-0.5 rounded text-emerald-400">remove()</code> method.
            </li>
            <li>
              If a file expires before download (69 minutes after upload), my cleanup process automatically purges it from the database.
            </li>
            <li>
              The client-side master key (used for decryption) is stored in memory only for the duration of the download process.
            </li>
            <li>
              No file logs or metadata are retained after the file is deleted, ensuring complete privacy.
            </li>
          </ul>

          <div className="bg-gray-700 p-4 rounded-md mb-4">
            <h3 className="font-semibold text-gray-300 mb-2">Technical Considerations</h3>
            <p className="text-gray-200 text-sm">
              For files up to 20MB, my Base64 and in-memory processing approach is efficient and secure. For larger files or higher-volume applications, i recommend implementing{' '}
              <a href="https://firebase.google.com/docs/storage" className="text-emerald-400 font-medium hover:underline">
                Firebase Storage
              </a>{' '}
              with custom security rules and server-side processing.
            </p>
          </div>
        </div>
      </div>

    </section>
  </div>
);

export default HowItWorks;