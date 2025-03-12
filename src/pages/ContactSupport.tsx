import React, { useState } from 'react';
import { Mail, AlertCircle, Github, Book, Copy as CopyIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactSupport = () => {
  const [copySuccess, setCopySuccess] = useState(false);

  const emailFormat = `Subject: Bug Report - [Brief Issue Description]

Hey Ufraan,

I encountered an issue while using the file-sharing platform. Below are the details:

- Description: [Describe the problem in detail]
- Steps to Reproduce:
  1. [Step 1]
  2. [Step 2]
  3. [Step 3]
- Error Messages: [Copy-paste any error messages]
- Additional Info: [e.g., browser, device, file type]
- Any screenshots or attachments
- [Optional] Suggestions or feedback
- [Optional] Priority level (Low/Medium/High)
- Security Concerns: [Mention any security risks]
Thank you for your assistance!

Best regards,
[Your Name]`;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(emailFormat)
      .then(() => {
        setCopySuccess(true);
        toast.success('Copied to clipboard!', {
          duration: 2000,
          position: 'top-right',
        });
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
        toast.error('Failed to copy. Please try again.', {
          duration: 2000,
          position: 'top-right',
        });
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black text-white"
      style={{ transition: 'background 0.5s ease' }}
    >
      <div
        className="max-w-4xl w-full px-4 py-8 animate-fade-in opacity-0"
        style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Message */}
          <div className="space-y-6">
            <Mail className="w-12 h-12 mx-auto text-slate-300 animate-pulse-slow" />
            <h1 className="text-xl font-medium text-center text-slate-200">Contact Support</h1>
            <p className="text-sm text-center text-slate-400">
              Report bugs or issues by emailing{' '}
              <a
                href="mailto:kurosen930@gmail.com?subject=Bug%20Report%20or%20Support%20Request"
                className="text-emerald-400 hover:text-emerald-300 underline animate-hover-scale"
              >
                kurosen930@gmail.com
              </a>
              .
            </p>
            <div className="text-left text-xs text-slate-500 flex items-start gap-2 animate-slide-up">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-slate-400">What to Include</p>
                <p className="mt-1">
                  Include a description, steps to reproduce, and error messages. Check our{' '}
                  <a
                    href="https://example.com/docs"
                    className="text-emerald-400 hover:text-emerald-300 underline animate-hover-scale"
                  >
                    documentation
                  </a>{' '}
                  for more help.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Suggested Format */}
          <div className="space-y-4 animate-slide-right opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-400">Suggested Email Format</p>
              <button
                onClick={handleCopy}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-xs animate-hover-scale"
              >
                <CopyIcon className="w-4 h-4" />
                {copySuccess ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="bg-gray-900 bg-opacity-50 rounded-md p-3 text-slate-300 text-xs font-mono whitespace-pre-wrap animate-fade-in-slow">
              {emailFormat}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// Animation Keyframes (inlined for simplicity)
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fade-in-slow {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slide-right {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  @keyframes hover-scale {
    from { transform: scale(1); }
    to { transform: scale(1.05); }
  }
  @keyframes hover-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }
  .animate-fade-in-slow {
    animation: fade-in-slow 0.6s ease-out;
  }
  .animate-slide-up {
    animation: slide-up 0.5s ease-out;
  }
  .animate-slide-right {
    animation: slide-right 0.6s ease-out;
  }
  .animate-pulse-slow {
    animation: pulse-slow 2s infinite ease-in-out;
  }
  .animate-hover-scale {
    animation: hover-scale 0.3s ease-out forwards;
  }
  .animate-hover-scale:hover {
    animation: hover-scale 0.3s ease-out reverse;
  }
  .animate-hover-float:hover {
    animation: hover-float 0.8s ease-in-out infinite;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default ContactSupport;