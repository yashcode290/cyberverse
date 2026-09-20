import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { Terminal, Database, Code, FileText, ArrowRight } from 'lucide-react';

import { Badge } from '../components/common/Badge';

export const ModulesPage: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'ALL' | 'Beginner' | 'Intermediate' | 'Advanced'>('ALL');

  const mockModules = [
    {
      id: 'linux-cli-101',
      title: 'Linux Navigation & Shell Mastery',
      category: 'Foundations',
      difficulty: 'Beginner',
      estimatedHours: 2.5,
      xpReward: 150,
      icon: Terminal,
      shortDescription: 'Navigate directory trees, inspect file permissions, pipe stdout, and search auth logs.'
    },
    {
      id: 'sqli-deep-dive',
      title: 'SQL Injection: Exploitation & Defense',
      category: 'Web Security',
      difficulty: 'Beginner',
      estimatedHours: 3,
      xpReward: 250,
      icon: Database,
      shortDescription: 'Inject dynamic quotes into dynamic queries and refactor using prepared statements.'
    },
    {
      id: 'xss-playground-module',
      title: 'Cross-Site Scripting (XSS) & Output Encoding',
      category: 'Web Security',
      difficulty: 'Beginner',
      estimatedHours: 2.5,
      xpReward: 200,
      icon: Code,
      shortDescription: 'Test reflected & DOM XSS payloads and apply HTML entity output escaping.'
    },
    {
      id: 'log-analysis-101',
      title: 'Security Log Investigation & SIEM Triage',
      category: 'Blue Team',
      difficulty: 'Intermediate',
      estimatedHours: 3,
      xpReward: 220,
      icon: FileText,
      shortDescription: 'Audit web access logs to identify brute-force attacker IPs and unauthorized file access.'
    }
  ];

  const filteredModules = mockModules.filter(
    m => selectedDifficulty === 'ALL' || m.difficulty === selectedDifficulty
  );

  return (
    <div className="space-y-8">
      <PageHeader
        categoryTag="Module Index"
        title="Interactive Cyber Modules"
        description="Filter topic modules featuring 20% theory, visual flowcharts, sandbox practice, and defensive code fixes."
      />

      {/* Difficulty Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['ALL', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
          <button
            key={diff}
            onClick={() => setSelectedDifficulty(diff)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
              selectedDifficulty === diff
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredModules.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.id} className="bg-[#121824] p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge variant={m.difficulty === 'Beginner' ? 'green' : 'purple'} mono size="sm">
                    {m.difficulty}
                  </Badge>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{m.category}</span>
                  <h3 className="text-base font-bold text-white">{m.title}</h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{m.shortDescription}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs">
                <span className="text-slate-400">{m.estimatedHours} Hours • +{m.xpReward} XP</span>
                <Link to="/labs" className="inline-flex items-center gap-1 text-cyan-400 font-bold hover:underline">
                  Launch Module <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
