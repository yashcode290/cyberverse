import React, { useState } from 'react';
import { Terminal, Database, Code, FileText, CheckCircle2, Award } from 'lucide-react';

import { SimulatedTerminal } from '../features/terminal/SimulatedTerminal';
import { SqliLab } from '../features/web-security/SqliLab';
import { XssLab } from '../features/web-security/XssLab';
import { LogAnalyzerLab } from '../features/blue-team/LogAnalyzerLab';
import { useUserProgress } from '../hooks/useUserProgress';
import { Badge } from '../components/common/Badge';

export const LabViewerPage: React.FC = () => {
  const [activeLab, setActiveLab] = useState<'terminal' | 'sqli' | 'xss' | 'log'>('terminal');
  const { completeLab, profile } = useUserProgress();
  const [notification, setNotification] = useState<string | null>(null);

  const handleFlagAward = (flag: string) => {
    completeLab(`lab-${activeLab}`, 150);
    setNotification(`XP AWARDED! Flag ${flag} verified successfully.`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="green" mono>Educational Sandbox</Badge>
            <span className="text-xs text-slate-500 font-mono">100% Client-Side Isolated Target</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Interactive Practical Labs</h1>
          <p className="text-sm text-slate-400">
            Execute commands, test SQL injection payloads, observe DOM reflection, and analyze log streams.
          </p>
        </div>

        {/* XP Summary Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Completed Labs: {profile.completedLabs.length}</span>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-xl text-xs font-mono text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {notification}
        </div>
      )}

      {/* Lab Selector Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveLab('terminal')}
          className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
            activeLab === 'terminal'
              ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-lg shadow-cyan-500/10'
              : 'bg-[#121824] border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Terminal className="w-6 h-6" />
          <span className="text-xs font-mono font-bold">Linux Terminal CLI</span>
        </button>

        <button
          onClick={() => setActiveLab('sqli')}
          className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
            activeLab === 'sqli'
              ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-lg shadow-amber-500/10'
              : 'bg-[#121824] border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Database className="w-6 h-6" />
          <span className="text-xs font-mono font-bold">SQL Injection Lab</span>
        </button>

        <button
          onClick={() => setActiveLab('xss')}
          className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
            activeLab === 'xss'
              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/10'
              : 'bg-[#121824] border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Code className="w-6 h-6" />
          <span className="text-xs font-mono font-bold">XSS Playground</span>
        </button>

        <button
          onClick={() => setActiveLab('log')}
          className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
            activeLab === 'log'
              ? 'bg-purple-500/10 border-purple-500 text-purple-400 shadow-lg shadow-purple-500/10'
              : 'bg-[#121824] border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-6 h-6" />
          <span className="text-xs font-mono font-bold">SIEM Log Triage</span>
        </button>
      </div>

      {/* Active Lab Display */}
      {activeLab === 'terminal' && <SimulatedTerminal onFlagSubmit={handleFlagAward} />}
      {activeLab === 'sqli' && <SqliLab onFlagSubmit={handleFlagAward} />}
      {activeLab === 'xss' && <XssLab onFlagSubmit={handleFlagAward} />}
      {activeLab === 'log' && <LogAnalyzerLab onFlagSubmit={handleFlagAward} />}

    </div>
  );
};
