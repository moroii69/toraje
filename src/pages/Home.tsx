import React from 'react';
import { Link } from 'react-router-dom';
import { FileUp, Download, Shield, Clock } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <section className="text-center py-8 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-500 to-blue-500 text-transparent bg-clip-text">
          secure file sharing made simple
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
          upload files securely and share them with a unique 6-digit code. 
          files are automatically deleted after 69 minutes for enhanced privacy.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/upload"
            className="flex items-center justify-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-lg transition-colors"
          >
            <FileUp className="w-5 h-5 mr-2" />
            upload file
          </Link>
          <Link
            to="/retrieve"
            className="flex items-center justify-center px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            retrieve file
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 py-8 md:py-16">
        <FeatureCard
          icon={<Shield className="w-8 h-8 text-emerald-500" />}
          title="secure sharing"
          description="files are encrypted and can only be accessed with the unique 6-digit code."
        />
        <FeatureCard
          icon={<Clock className="w-8 h-8 text-emerald-500" />}
          title="auto-deletion"
          description="files are automatically deleted after 69 minutes for enhanced privacy."
        />
        <FeatureCard
          icon={<FileUp className="w-8 h-8 text-emerald-500" />}
          title="easy upload"
          description="simple drag-and-drop interface for quick file uploads up to 20MB."
        />
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-zinc-400">{description}</p>
  </div>
);

export default Home;