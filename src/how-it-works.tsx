{/*  this page has to implemented in the future */}




import {
  Clock,
  Database,
  Download,
  FileText,
  Key,
  Lock,
  RefreshCw,
  Share2,
  Shield,
  Upload
} from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100 p-4 sm:p-8 transition-all duration-500">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              How It Works
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            Understanding the secure file sharing process
          </p>
        </div>

        {/* Process Flow Section */}
        <div className="space-y-16">
          {/* Upload Process */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-gray-800">
              <Upload className="w-6 h-6 text-blue-600" />
              Upload Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1: File Selection */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">1. File Selection</h3>
                <p className="text-sm text-gray-600 text-center">
                  User selects or drags a file into the upload area. File is validated for size and type.
                </p>
              </div>

              {/* Step 2: Encryption */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Lock className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">2. Encryption</h3>
                <p className="text-sm text-gray-600 text-center">
                  File is converted to base64 and encrypted for secure storage. A unique 6-digit code is generated.
                </p>
              </div>

              {/* Step 3: Storage */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Database className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">3. Storage</h3>
                <p className="text-sm text-gray-600 text-center">
                  Encrypted file is stored in Firebase with metadata and expiration timer.
                </p>
              </div>
            </div>

            {/* Technical Flow Visualization */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Live Process Visualization
                </div>
                <div className="h-2 flex-1 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-progress" />
                </div>
                <div className="text-sm text-gray-600">
                  Processing...
                </div>
              </div>
            </div>
          </div>

          {/* Retrieval Process */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-gray-800">
              <Download className="w-6 h-6 text-purple-600" />
              Retrieval Process
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1: Code Entry */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Key className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">1. Code Entry</h3>
                <p className="text-sm text-gray-600 text-center">
                  User enters the 6-digit code. System validates code and checks expiration.
                </p>
              </div>

              {/* Step 2: Decryption */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">2. Decryption</h3>
                <p className="text-sm text-gray-600 text-center">
                  File is retrieved from storage and decrypted for download.
                </p>
              </div>

              {/* Step 3: Download */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Share2 className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">3. Download</h3>
                <p className="text-sm text-gray-600 text-center">
                  Decrypted file is securely delivered to the user's device.
                </p>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-gray-800">
              <Shield className="w-6 h-6 text-green-600" />
              Security Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Auto-Deletion */}
              <div className="flex items-start gap-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Automatic Deletion</h3>
                  <p className="text-sm text-gray-600">
                    Files are automatically deleted after 69 minutes for enhanced security. 
                    A countdown timer helps users track remaining time.
                  </p>
                </div>
              </div>

              {/* Encryption */}
              <div className="flex items-start gap-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Lock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">End-to-End Encryption</h3>
                  <p className="text-sm text-gray-600">
                    Files are encrypted during upload and decrypted only upon valid code entry. 
                    The encryption key is never stored.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Storage Lifecycle */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-gray-800">
              <RefreshCw className="w-6 h-6 text-orange-600" />
              File Lifecycle
            </h2>

            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-200 via-red-200 to-rose-200 -translate-y-1/2" />
              <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
                {['Upload', 'Storage', 'Retrieval', 'Deletion'].map((stage, index) => (
                  <div key={stage} className="bg-white rounded-xl p-6 text-center shadow-lg">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-orange-600 font-semibold">{index + 1}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{stage}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>All operations are performed client-side for maximum security</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;