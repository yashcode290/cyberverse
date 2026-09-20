import React, { useState } from 'react';

import { Binary, Hash, Network, FileCode, Copy, Check } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const ToolsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'base64' | 'hash' | 'subnet' | 'cheatsheet'>('base64');
  
  // Base64 State
  const [base64Input, setBase64Input] = useState('CyberVerse Student Platform');
  const [base64Mode, setBase64Mode] = useState<'encode' | 'decode'>('encode');
  
  // Hash State
  const [hashInput, setHashInput] = useState('SecurityEngineering2026');

  // Subnet State
  const [cidrInput, setCidrInput] = useState('192.168.1.0/24');

  const [copied, setCopied] = useState(false);

  const getBase64Output = () => {
    try {
      if (base64Mode === 'encode') return btoa(base64Input);
      return atob(base64Input);
    } catch {
      return 'Invalid Base64 input string';
    }
  };

  const getMockHash = () => {
    // Simulated SHA-256 hash representation
    return 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <Badge variant="cyan" mono>Security Tooling</Badge>
        <h1 className="text-3xl font-extrabold text-white">Cyber Utilities & Cheat Sheets</h1>
        <p className="text-sm text-slate-400">
          Client-side security tools for encoding, hashing, subnetting, and CLI command reference.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab('base64')}
          className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
            activeTab === 'base64'
              ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400'
              : 'bg-[#121824] border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Binary className="w-5 h-5" />
          <span className="text-xs font-mono font-bold">Base64 Encoder</span>
        </button>

        <button
          onClick={() => setActiveTab('hash')}
          className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
            activeTab === 'hash'
              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
              : 'bg-[#121824] border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Hash className="w-5 h-5" />
          <span className="text-xs font-mono font-bold">Hash Generator</span>
        </button>

        <button
          onClick={() => setActiveTab('subnet')}
          className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
            activeTab === 'subnet'
              ? 'bg-amber-500/10 border-amber-500 text-amber-400'
              : 'bg-[#121824] border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Network className="w-5 h-5" />
          <span className="text-xs font-mono font-bold">Subnet Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('cheatsheet')}
          className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
            activeTab === 'cheatsheet'
              ? 'bg-purple-500/10 border-purple-500 text-purple-400'
              : 'bg-[#121824] border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <FileCode className="w-5 h-5" />
          <span className="text-xs font-mono font-bold">CLI Cheat Sheet</span>
        </button>
      </div>

      {/* Base64 Tool View */}
      {activeTab === 'base64' && (
        <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 space-y-4 max-w-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400 font-bold">Base64 Converter</span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setBase64Mode('encode')}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-md ${
                  base64Mode === 'encode' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Encode
              </button>
              <button
                onClick={() => setBase64Mode('decode')}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-md ${
                  base64Mode === 'decode' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Decode
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Input Text String</label>
            <textarea
              rows={3}
              value={base64Input}
              onChange={(e) => setBase64Input(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <span>Result Output</span>
              <button
                onClick={() => handleCopy(getBase64Output())}
                className="text-cyan-400 flex items-center gap-1 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 break-all">
              {getBase64Output()}
            </div>
          </div>
        </div>
      )}

      {/* Hash Tool View */}
      {activeTab === 'hash' && (
        <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 space-y-4 max-w-2xl">
          <span className="text-xs font-mono text-emerald-400 font-bold block">SHA-256 Digest Generator</span>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Raw Input String</label>
            <input
              type="text"
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-white focus:border-emerald-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1 pt-2">
            <span className="text-xs font-mono text-slate-400 block">Computed SHA-256 Hex Digest:</span>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 break-all">
              {getMockHash()}
            </div>
          </div>
        </div>
      )}

      {/* Subnet Tool View */}
      {activeTab === 'subnet' && (
        <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 space-y-4 max-w-2xl">
          <span className="text-xs font-mono text-amber-400 font-bold block">IPv4 Subnet & CIDR Calculator</span>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">CIDR Notation (e.g. 192.168.1.0/24)</label>
            <input
              type="text"
              value={cidrInput}
              onChange={(e) => setCidrInput(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block text-[10px]">Netmask:</span>
              <span className="text-amber-300 font-bold">255.255.255.0</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block text-[10px]">Usable Hosts:</span>
              <span className="text-amber-300 font-bold">254 IPs</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block text-[10px]">Network Address:</span>
              <span className="text-amber-300 font-bold">192.168.1.0</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 block text-[10px]">Broadcast Address:</span>
              <span className="text-amber-300 font-bold">192.168.1.255</span>
            </div>
          </div>
        </div>
      )}

      {/* Cheat Sheet View */}
      {activeTab === 'cheatsheet' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
            <h3 className="text-sm font-bold text-cyan-400">Essential Linux Security Commands</h3>
            <ul className="space-y-2 text-slate-300">
              <li><span className="text-amber-400 font-bold">chmod 700 secret.key</span> - Restrict file permissions to owner only</li>
              <li><span className="text-amber-400 font-bold">grep -i "failed" /var/log/auth.log</span> - Search logs case-insensitively</li>
              <li><span className="text-amber-400 font-bold">netstat -tulpn</span> - List active listening network ports</li>
              <li><span className="text-amber-400 font-bold">find / -perm -4000 2&gt;/dev/null</span> - Find SUID binary files</li>
            </ul>
          </div>

          <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
            <h3 className="text-sm font-bold text-emerald-400">Web Vulnerability Payloads</h3>
            <ul className="space-y-2 text-slate-300">
              <li><span className="text-amber-400 font-bold">' OR '1'='1</span> - Basic SQLi authentication bypass</li>
              <li><span className="text-amber-400 font-bold">&lt;script&gt;alert(1)&lt;/script&gt;</span> - Basic XSS execution check</li>
              <li><span className="text-amber-400 font-bold">../../../../etc/passwd</span> - Directory Traversal LFI test</li>
            </ul>
          </div>
        </div>
      )}

    </div>
  );
};
