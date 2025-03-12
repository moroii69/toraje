import React from 'react';
import { Link } from 'react-router-dom';
import { FileUp, Download, Shield, Clock } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-white bg-black min-h-screen flex flex-col">
      {/* Header with subtle gradient border bottom */}

      {/* Hero Section */}
      <section className="py-8 md:py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white">
            Secure file sharing.
            <span className="block bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent leading-relaxed pb-1">
              Simplified.
            </span>
          </h1>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl">
            Upload files securely and share with a 6-digit code.
            Auto-deletion after 69 minutes for enhanced privacy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/upload"
              className="flex items-center justify-center px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-medium rounded transition-colors"
            >
              <FileUp className="w-4 h-4 mr-2" />
              Upload a file (one file at a time supported).
            </Link>
            <Link
              to="/retrieve"
              className="flex items-center justify-center px-6 py-2.5 border border-gray-700 hover:bg-gray-800 text-white font-medium rounded transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Retrieve file
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section with subtle card styling */}
      <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Shield className="w-5 h-5 text-emerald-400" />}
          title="Secure sharing"
          description="End-to-end encryption with unique 6-digit access codes"
        />
        <FeatureCard
          icon={<Clock className="w-5 h-5 text-emerald-400" />}
          title="Auto-deletion"
          description="Files automatically deleted after 69 minutes"
        />
        <FeatureCard
          icon={<FileUp className="w-5 h-5 text-emerald-400" />}
          title="Easy upload"
          description="Simple drag-and-drop interface for files up to 20MB"
        />
      </section>

      {/* Minimal Footer */}
      <footer className="mt-auto py-8 text-center">
        <p className="text-sm text-gray-500">
          © Mohammed Ufraan – Because 69 minutes is all the privacy I can afford.
        </p>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="p-6 bg-gray-900 bg-opacity-40 border border-gray-800 rounded-md hover:border-gray-700 transition-colors">
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h3 className="text-base font-medium">{title}</h3>
    </div>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);

export default Home;