import React from 'react';
import { FileUp, Download, Lock, Clock, Shield, RefreshCw } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium mb-8 text-white">How it works</h1>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-medium mb-6 text-emerald-400">Process overview</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Step
              icon={<FileUp className="w-6 h-6" />}
              title="1. Upload"
              description="Upload your file through our secure interface. We support files up to 20MB."
            />
            <Step
              icon={<Lock className="w-6 h-6" />}
              title="2. Get code"
              description="Receive a unique 6-digit code to share with your recipient."
            />
            <Step
              icon={<Download className="w-6 h-6" />}
              title="3. Retrieve"
              description="Recipients enter the code to download the file securely."
            />
          </div>
        </section>

        <section className="bg-black rounded-md p-6 border border-gray-800">
          <h2 className="text-xl font-medium mb-6 text-emerald-400">Security features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Feature
              icon={<Shield className="w-5 h-5 text-emerald-400" />}
              title="Secure storage"
              description="Files are stored with encryption and can only be accessed with the correct code."
            />
            <Feature
              icon={<Clock className="w-5 h-5 text-emerald-400" />}
              title="Auto-deletion"
              description="Files are automatically deleted after 69 minutes for enhanced privacy."
            />
            <Feature
              icon={<RefreshCw className="w-5 h-5 text-emerald-400" />}
              title="One-time access"
              description="Each code can only be used once to download the file."
            />
            <Feature
              icon={<Lock className="w-5 h-5 text-emerald-400" />}
              title="No registration"
              description="No account required. Share files instantly with maximum privacy."
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-6 text-emerald-400">FAQ</h2>
          <div className="space-y-3">
            <FaqItem
              question="How long are files stored?"
              answer="Files are automatically deleted after 69 minutes from the upload time. This ensures your data remains private and secure."
            />
            <FaqItem
              question="What happens after a file expires?"
              answer="After 69 minutes, the file and its associated code are permanently deleted from our servers. The code will no longer work for retrieving the file."
            />
            <FaqItem
              question="Is there a file size limit?"
              answer="Yes, the maximum file size is 20MB per upload. This limit helps ensure fast upload and download speeds."
            />
            <FaqItem
              question="How secure is the file sharing?"
              answer="Files are stored securely and can only be accessed with the correct 6-digit code. All data is automatically deleted after the expiration time."
            />
          </div>
        </section>
      </div>
    </div>
  );
};

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ icon, title, description }) => (
  <div className="bg-gray-900 bg-opacity-40 rounded-md p-4 border border-gray-800">
    <div className="mb-3 text-emerald-400">{icon}</div>
    <h3 className="text-base font-medium mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="flex gap-3">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h3 className="text-sm font-medium mb-1">{title}</h3>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  </div>
);

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => (
  <div className="bg-gray-900 bg-opacity-40 rounded p-4 border border-gray-800">
    <h3 className="text-sm font-medium mb-2">{question}</h3>
    <p className="text-xs text-gray-400">{answer}</p>
  </div>
);

export default HowItWorks;