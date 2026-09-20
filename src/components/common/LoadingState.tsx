import React from 'react';
import { Terminal } from 'lucide-react';

export const LoadingState: React.FC<{ message?: string }> = ({ message = 'Initializing CyberVerse sandbox environment...' }) => {
  return (
    <div className="bg-[#121824] border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4 max-w-md mx-auto my-12">
      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Terminal className="w-6 h-6 animate-pulse" />
        </div>
        <div className="absolute -inset-1 rounded-xl border border-cyan-400/40 animate-ping pointer-events-none" />
      </div>
      <p className="text-xs font-mono text-cyan-300 font-semibold">{message}</p>
    </div>
  );
};
