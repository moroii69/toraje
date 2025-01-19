import React from 'react';
import { FileUp, Download, Lock, Clock, Shield, RefreshCw } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">how it works</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-emerald-500">process overview</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Step
              icon={<FileUp className="w-8 h-8" />}
              title="1. upload"
              description="upload your file through our secure interface. we support files up to 20MB."
            />
            <Step
              icon={<Lock className="w-8 h-8" />}
              title="2. get code"
              description="receive a unique 6-digit code to share with your recipient."
            />
            <Step
              icon={<Download className="w-8 h-8" />}
              title="3. retrieve"
              description="recipients enter the code to download the file securely."
            />
          </div>
        </section>

        <section className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h2 className="text-2xl font-semibold mb-6 text-emerald-500">security features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Feature
              icon={<Shield className="w-6 h-6 text-emerald-500" />}
              title="secure storage"
              description="files are stored with encryption and can only be accessed with the correct code."
            />
            <Feature
              icon={<Clock className="w-6 h-6 text-emerald-500" />}
              title="auto-deletion"
              description="files are automatically deleted after 69 minutes for enhanced privacy."
            />
            <Feature
              icon={<RefreshCw className="w-6 h-6 text-emerald-500" />}
              title="one-time access"
              description="each code can only be used once to download the file."
            />
            <Feature
              icon={<Lock className="w-6 h-6 text-emerald-500" />}
              title="no registration"
              description="no account required. Share files instantly with maximum privacy."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-emerald-500">faq</h2>
          <div className="space-y-4">
            <FaqItem
              question="how long are files stored?"
              answer="files are automatically deleted after 69 minutes from the upload time. this ensures your data remains private and secure."
            />
            <FaqItem
              question="what happens after a file expires?"
              answer="after 69 minutes, the file and its associated code are permanently deleted from our servers. the code will no longer work for retrieving the file."
            />
            <FaqItem
              question="is there a file size limit?"
              answer="yes, the maximum file size is 20MB per upload. This limit helps ensure fast upload and download speeds."
            />
            <FaqItem
              question="how secure is the file sharing?"
              answer="files are stored securely and can only be accessed with the correct 6-digit code. all data is automatically deleted after the expiration time."
            />
          </div>
        </section>
      </div>
    </div>
  );
};

const Step = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
    <div className="mb-4 text-emerald-500">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-zinc-400 text-sm">{description}</p>
  </div>
);

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-zinc-400">{description}</p>
    </div>
  </div>
);

const FaqItem = ({ question, answer }: { question: string; answer: string }) => (
  <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
    <h3 className="font-semibold mb-2">{question}</h3>
    <p className="text-sm text-zinc-400">{answer}</p>
  </div>
);

export default HowItWorks;