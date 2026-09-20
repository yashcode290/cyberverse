import React, { useState } from 'react';
import { Terminal, Database, Code, FileText } from 'lucide-react';
import { SimulatedTerminal } from '../features/terminal/SimulatedTerminal';
import { SqliLab } from '../features/web-security/SqliLab';
import { XssLab } from '../features/web-security/XssLab';
import { LogAnalyzerLab } from '../features/blue-team/LogAnalyzerLab';
import { Badge } from '../components/common/Badge';

export const PlaygroundPage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'terminal' | 'sqli' | 'xss' | 'log'>('terminal');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <Badge variant="cyan" mono>Cyber Playground</Badge>
        <h1 className="text-3xl font-extrabold text-white">Unified Security Sandbox Launcher</h1>
        <p className="text-sm text-slate-400">
          Access standalone security sandboxes and simulation utilities instantly.
        </p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTool('terminal')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTool === 'terminal' ? 'bg-cyan-500 text-slate-950' : 'bg-[#121824] text-slate-300 border border-slate-800'
          }`}
        >
          <Terminal className="w-4 h-4" /> Linux CLI Sandbox
        </button>

        <button
          onClick={() => setActiveTool('sqli')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTool === 'sqli' ? 'bg-amber-500 text-slate-950' : 'bg-[#121824] text-slate-300 border border-slate-800'
          }`}
        >
          <Database className="w-4 h-4" /> SQL Injection Playground
        </button>

        <button
          onClick={() => setActiveTool('xss')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTool === 'xss' ? 'bg-emerald-500 text-slate-950' : 'bg-[#121824] text-slate-300 border border-slate-800'
          }`}
        >
          <Code className="w-4 h-4" /> XSS Playground
        </button>

        <button
          onClick={() => setActiveTool('log')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTool === 'log' ? 'bg-purple-500 text-slate-950' : 'bg-[#121824] text-slate-300 border border-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" /> Log Analyzer
        </button>
      </div>

      {activeTool === 'terminal' && <SimulatedTerminal />}
      {activeTool === 'sqli' && <SqliLab />}
      {activeTool === 'xss' && <XssLab />}
      {activeTool === 'log' && <LogAnalyzerLab />}
    </div>
  );
};
