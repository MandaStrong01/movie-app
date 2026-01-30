import { ArrowLeft, ArrowRight, FileText, Shield } from 'lucide-react';
import { useState } from 'react';
import Footer from '../components/Footer';
import QuickAccess from '../components/QuickAccess';

interface PageProps {
  onNavigate: (page: number) => void;
}

export default function Page18({ onNavigate }: PageProps) {
  const [agreed, setAgreed] = useState(false);

  const handleAccept = () => {
    if (agreed) {
      onNavigate(19);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-4xl w-full mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => onNavigate(17)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg font-bold transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-sm font-bold uppercase tracking-wider">TERMS OF SERVICE & DISCLAIMER</h1>
            <button
              onClick={handleAccept}
              disabled={!agreed}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-bold transition-all"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-purple-600/20 backdrop-blur-sm rounded-2xl border border-purple-500/40 p-8 mb-6">
            <div className="flex justify-center mb-4">
              <FileText className="w-16 h-16 text-purple-400" />
            </div>
            <h2 className="text-3xl font-black text-center mb-2">Legal Agreement</h2>
            <p className="text-center text-white/70">Please read carefully before using MandaStrong Studio</p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-bold text-purple-300">Terms of Use</h3>
            </div>
            <div className="space-y-3 text-sm text-white/90 leading-relaxed">
              <p>Welcome to MandaStrong Studio. By accessing and using this application, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.</p>

              <p><span className="text-purple-300 font-semibold">1. Acceptance of Terms:</span> By creating an account or using MandaStrong Studio, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.</p>

              <p><span className="text-purple-300 font-semibold">2. License Grant:</span> We grant you a limited, non-exclusive, non-transferable, revocable license to use MandaStrong Studio for personal or commercial video creation purposes in accordance with these terms.</p>

              <p><span className="text-purple-300 font-semibold">3. User Responsibilities:</span> You are responsible for maintaining the security of your account and for all activities that occur under your account. You agree not to use the service for any unlawful purpose.</p>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-bold text-purple-300">Privacy Policy</h3>
            </div>
            <div className="space-y-3 text-sm text-white/90 leading-relaxed">
              <p><span className="text-purple-300 font-semibold">Data Collection:</span> We collect information you provide directly to us, including your name, email address, and any content you create or upload to the platform. We use this information to provide, maintain, and improve our services.</p>

              <p><span className="text-purple-300 font-semibold">Data Security:</span> We implement appropriate and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            </div>
          </div>

          <div className="bg-purple-600/20 backdrop-blur-sm rounded-2xl border border-purple-500/40 p-6 mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-5 h-5 mt-0.5 accent-purple-600 cursor-pointer flex-shrink-0"
              />
              <span className="text-sm font-semibold text-white">
                I have read and agree to the Terms of Service and Privacy Policy
              </span>
            </label>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => onNavigate(17)}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-8 py-3 rounded-lg transition-all"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              disabled={!agreed}
              className="bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-lg transition-all"
            >
              Accept & Continue
            </button>
          </div>
        </div>
      </div>
      <QuickAccess onNavigate={onNavigate} />
      <Footer />
    </div>
  );
}
