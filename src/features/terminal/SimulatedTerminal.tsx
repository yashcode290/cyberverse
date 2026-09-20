import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CheckCircle2, Flag, RotateCcw } from 'lucide-react';

import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

interface FileNode {
  name: string;
  type: 'file' | 'dir';
  content?: string;
  hidden?: boolean;
}

const INITIAL_FS: Record<string, FileNode[]> = {
  '/home/student': [
    { name: 'readme.txt', type: 'file', content: 'Welcome to CyberVerse Linux Sandbox!\nExplore directories with ls, read files with cat, and search logs with grep.' },
    { name: '.secret_vault', type: 'file', hidden: true, content: 'SYSTEM FLAG: CYBER{l1nux_c1i_n4v1g4t0r}' },
    { name: 'projects', type: 'dir' }
  ],
  '/var/log': [
    { name: 'auth.log', type: 'file', content: `2026-08-14 12:00:01 INFO sshd[1042]: Server listening on port 22
2026-08-14 12:05:12 WARNING sshd[1080]: Failed password for invalid user admin from 192.168.1.105 port 44820
2026-08-14 12:05:14 WARNING sshd[1080]: Failed password for invalid user root from 192.168.1.105 port 44822
2026-08-14 12:10:00 CRITICAL auth[1105]: Security Breach Detected: CYBER{gr3p_log_f1lt3r_m4st3r}
2026-08-14 12:15:30 INFO cron[1200]: Routine cleanup job finished` }
  ]
};

export const SimulatedTerminal: React.FC<{
  onFlagSubmit?: (flag: string) => void;
}> = ({ onFlagSubmit }) => {
  const [currentPath, setCurrentPath] = useState('/home/student');
  const [inputCommand, setInputCommand] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: string | React.ReactNode; isError?: boolean }>>([
    {
      command: 'system-init',
      output: (
        <div className="text-cyan-400 space-y-1">
          <p className="font-bold">CyberVerse Linux CLI Sandbox v2.4 (Simulated Target)</p>
          <p className="text-slate-400 text-xs">Type <span className="text-amber-400">help</span> to list available commands. Find hidden flags in system files.</p>
        </div>
      )
    }
  ]);

  const [flagInput, setFlagInput] = useState('');
  const [flagFeedback, setFlagFeedback] = useState<{ text: string; success: boolean } | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = inputCommand.trim();
    if (!raw) return;

    const parts = raw.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output: string | React.ReactNode = '';
    let isError = false;

    if (cmd === 'clear') {
      setHistory([]);
      setInputCommand('');
      return;
    }

    if (cmd === 'help') {
      output = (
        <div className="text-xs space-y-1 text-slate-300">
          <p className="text-cyan-400 font-bold">Supported Linux Sandbox Commands:</p>
          <p><span className="text-amber-400 font-mono">ls [-la]</span> - List directory contents (use -la to show hidden files)</p>
          <p><span className="text-amber-400 font-mono">cd &lt;dir&gt;</span> - Change directory (/home/student, /var/log)</p>
          <p><span className="text-amber-400 font-mono">cat &lt;file&gt;</span> - Print file content</p>
          <p><span className="text-amber-400 font-mono">grep &lt;pattern&gt; &lt;file&gt;</span> - Search pattern in file</p>
          <p><span className="text-amber-400 font-mono">pwd</span> - Print current working directory</p>
          <p><span className="text-amber-400 font-mono">whoami</span> - Display current shell user identity</p>
          <p><span className="text-amber-400 font-mono">clear</span> - Clear terminal buffer</p>
        </div>
      );
    } else if (cmd === 'pwd') {
      output = currentPath;
    } else if (cmd === 'whoami') {
      output = 'student@cyberverse-target';
    } else if (cmd === 'ls') {
      const showHidden = args.includes('-la') || args.includes('-a');
      const files = INITIAL_FS[currentPath] || [];
      const visibleFiles = files.filter(f => showHidden || !f.hidden);
      output = (
        <div className="flex flex-wrap gap-4 font-mono text-xs">
          {visibleFiles.map((f, i) => (
            <span key={i} className={f.type === 'dir' ? 'text-cyan-400 font-bold' : f.hidden ? 'text-amber-400 font-semibold' : 'text-slate-200'}>
              {f.name}{f.type === 'dir' ? '/' : ''}
            </span>
          ))}
        </div>
      );
    } else if (cmd === 'cd') {
      const target = args[0];
      if (!target || target === '~' || target === '/home/student') {
        setCurrentPath('/home/student');
        output = '';
      } else if (target === '/var/log') {
        setCurrentPath('/var/log');
        output = '';
      } else {
        output = `cd: ${target}: No such directory in sandbox`;
        isError = true;
      }
    } else if (cmd === 'cat') {
      const fileName = args[0];
      const files = INITIAL_FS[currentPath] || [];
      const file = files.find(f => f.name === fileName);

      if (!fileName) {
        output = 'cat: missing file operand';
        isError = true;
      } else if (!file) {
        output = `cat: ${fileName}: No such file or directory`;
        isError = true;
      } else if (file.type === 'dir') {
        output = `cat: ${fileName}: Is a directory`;
        isError = true;
      } else {
        output = file.content || '';
      }
    } else if (cmd === 'grep') {
      const pattern = args[0];
      const fileName = args[1];
      const files = INITIAL_FS[currentPath] || [];
      const file = files.find(f => f.name === fileName);

      if (!pattern || !fileName) {
        output = 'grep syntax error: usage: grep <pattern> <filename>';
        isError = true;
      } else if (!file || !file.content) {
        output = `grep: ${fileName}: File not found`;
        isError = true;
      } else {
        const lines = file.content.split('\n');
        const matched = lines.filter(l => l.toLowerCase().includes(pattern.toLowerCase()));
        if (matched.length === 0) {
          output = `No lines matching pattern "${pattern}" found in ${fileName}`;
        } else {
          output = matched.join('\n');
        }
      }
    } else {
      output = `Command not recognized: '${cmd}'. Type 'help' for available CLI commands.`;
      isError = true;
    }

    setHistory(prev => [...prev, { command: raw, output, isError }]);
    setInputCommand('');
  };

  const handleFlagVerification = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanFlag = flagInput.trim();
    if (!cleanFlag) return;

    if (cleanFlag === 'CYBER{l1nux_c1i_n4v1g4t0r}' || cleanFlag === 'CYBER{gr3p_log_f1lt3r_m4st3r}') {
      setFlagFeedback({ text: 'FLAG VERIFIED! +150 XP Awarded to your profile.', success: true });
      if (onFlagSubmit) onFlagSubmit(cleanFlag);
    } else {
      setFlagFeedback({ text: 'Incorrect Flag Format or Invalid Secret Key. Try again!', success: false });
    }
  };

  return (
    <div className="bg-[#090D14] border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[520px]">
      
      {/* Terminal Header Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-3">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <TerminalIcon className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-semibold text-slate-200">bash — student@cyberverse-sandbox</span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="green" mono size="sm">Isolated Target</Badge>
          <button
            onClick={() => {
              setHistory([]);
              setCurrentPath('/home/student');
            }}
            className="p-1 text-slate-400 hover:text-cyan-400 rounded hover:bg-slate-800"
            title="Reset Terminal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output Display Screen */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3 leading-relaxed">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            {item.command !== 'system-init' && (
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-emerald-400 font-semibold">student@cyberverse</span>
                <span>:</span>
                <span className="text-cyan-400">{currentPath}</span>
                <span className="text-slate-200">$ {item.command}</span>
              </div>
            )}
            <div className={item.isError ? 'text-red-400' : 'text-slate-200 whitespace-pre-wrap'}>
              {item.output}
            </div>
          </div>
        ))}

        {/* Live Command Prompt */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-semibold shrink-0">student@cyberverse</span>
          <span className="text-slate-500">:</span>
          <span className="text-cyan-400 shrink-0">{currentPath}</span>
          <span className="text-slate-200">$</span>
          <input
            type="text"
            value={inputCommand}
            onChange={(e) => setInputCommand(e.target.value)}
            className="w-full bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-600"
            placeholder="Type command (e.g. ls -la, cat readme.txt, help)..."
            autoFocus
          />
        </form>
        <div ref={bottomRef} />
      </div>

      {/* Flag Submission Footer Bar */}
      <div className="bg-[#121824] border-t border-slate-800 p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <form onSubmit={handleFlagVerification} className="flex items-center gap-2 w-full sm:w-auto flex-1">
          <div className="relative flex-1 max-w-md">
            <Flag className="w-4 h-4 text-cyan-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Submit extracted flag CYBER{...}"
              value={flagInput}
              onChange={(e) => setFlagInput(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-cyan-300 focus:border-cyan-400 focus:outline-none"
            />
          </div>
          <Button type="submit" variant="primary" size="sm" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
            Submit Flag
          </Button>
        </form>

        {flagFeedback && (
          <span className={`text-xs font-mono font-semibold ${flagFeedback.success ? 'text-emerald-400' : 'text-red-400'}`}>
            {flagFeedback.text}
          </span>
        )}
      </div>

    </div>
  );
};
