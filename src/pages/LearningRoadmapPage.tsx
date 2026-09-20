import React, { useState } from 'react';
import { ROADMAP_LEVELS } from '../data/roadmapData';

import type { RoadmapLevelNode } from '../data/roadmapData';
import { PageHeader } from '../components/common/PageHeader';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, Shield, Globe, Lock, CheckCircle2, 
  HelpCircle, Cpu, Target, Code, Network, Search, Cloud, Trophy
} from 'lucide-react';

import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const LearningRoadmapPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [selectedPath, setSelectedPath] = useState<string>('All');
  const [activeModalNode, setActiveModalNode] = useState<RoadmapLevelNode | null>(null);
  const navigate = useNavigate();

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return Cpu;
      case 'Network': return Network;
      case 'Code': return Code;
      case 'Shield': return Shield;
      case 'Globe': return Globe;
      case 'Lock': return Lock;
      case 'Target': return Target;
      case 'ShieldCheck': return Shield;
      case 'Search': return Search;
      case 'Cloud': return Cloud;
      case 'Trophy': return Trophy;
      default: return Terminal;
    }
  };

  const filteredLevels = ROADMAP_LEVELS.filter((node) => {
    const matchesDifficulty = selectedFilter === 'All' || node.difficulty === selectedFilter;
    const matchesPath = selectedPath === 'All' || node.category === selectedPath;
    return matchesDifficulty && matchesPath;
  });

  const pathCards = [
    { name: 'Foundations', count: 3, icon: Terminal, color: 'text-cyan-400' },
    { name: 'Core Security', count: 2, icon: Shield, color: 'text-emerald-400' },
    { name: 'Web Security', count: 1, icon: Globe, color: 'text-amber-400' },
    { name: 'Offensive Security', count: 1, icon: Target, color: 'text-red-400' },
    { name: 'Defensive Security', count: 1, icon: Shield, color: 'text-purple-400' },
    { name: 'Forensics', count: 1, icon: Search, color: 'text-cyan-300' },
    { name: 'Cloud Security', count: 1, icon: Cloud, color: 'text-cyan-400' }
  ];

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <PageHeader
        categoryTag="Curriculum Architecture"
        title="CyberVerse Interactive 10-Level Roadmap"
        description="Progress systematically from computer & networking fundamentals to advanced web security, SIEM log triage, and CTF missions."
      />

      {/* Path Filter Cards */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
          Career Track Focus
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <button
            onClick={() => setSelectedPath('All')}
            className={`p-3 rounded-xl border text-center transition-all font-mono text-xs font-bold ${
              selectedPath === 'All'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'bg-[#121824] border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            All Tracks
          </button>
          {pathCards.map((p, i) => {
            const Icon = p.icon;
            const isSelected = selectedPath === p.name;
            return (
              <button
                key={i}
                onClick={() => setSelectedPath(p.name)}
                className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-md'
                    : 'bg-[#121824] border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${p.color}`} />
                  <span className="text-[10px] font-mono text-slate-400">{p.count} Lvl</span>
                </div>
                <span className="text-xs font-bold block truncate">{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty Filters */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-slate-400 mr-2">Filter Difficulty:</span>
        {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
          <button
            key={diff}
            onClick={() => setSelectedFilter(diff)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
              selectedFilter === diff
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>


      {/* VERTICAL CONNECTED ROADMAP PIPELINE */}
      <div className="relative max-w-4xl mx-auto space-y-8 pt-4">
        
        {/* Central Connecting Pipeline Line */}
        <div className="absolute left-6 sm:left-8 top-10 bottom-10 w-1 bg-gradient-to-b from-cyan-500 via-emerald-400 to-purple-500 pointer-events-none rounded-full" />

        {filteredLevels.map((node) => {
          const NodeIcon = getIconComponent(node.iconName);
          const isCompleted = node.status === 'Completed';
          const isInProgress = node.status === 'In Progress';
          const isAvailable = node.status === 'Available';
          const isLocked = node.status === 'Locked';

          return (
            <div
              key={node.id}
              className="relative pl-16 sm:pl-20 group"
            >
              {/* Node Circular Badge Connector */}
              <div
                className={`absolute left-0 top-3 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 flex items-center justify-center transition-all z-10 ${
                  isCompleted
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-lg shadow-emerald-500/20'
                    : isInProgress
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 ring-4 ring-cyan-500/20 shadow-lg shadow-cyan-500/30 animate-pulse'
                    : isAvailable
                    ? 'bg-slate-900 border-cyan-500/60 text-cyan-400 hover:border-cyan-400'
                    : 'bg-slate-950 border-slate-800 text-slate-600'
                }`}
              >
                {isLocked ? <Lock className="w-5 h-5" /> : <NodeIcon className="w-6 h-6" />}
              </div>

              {/* Node Card Container */}
              <div
                onClick={() => setActiveModalNode(node)}
                className={`p-6 rounded-3xl border cursor-pointer transition-all space-y-4 ${
                  isInProgress
                    ? 'bg-gradient-to-br from-[#121824] via-[#1A2234] to-[#121824] border-cyan-500/60 shadow-2xl'
                    : isCompleted
                    ? 'bg-[#121824] border-emerald-500/40 hover:border-emerald-400'
                    : isAvailable
                    ? 'bg-[#121824] border-slate-800 hover:border-cyan-500/50'
                    : 'bg-[#0E131D] border-slate-800/80 opacity-75'
                }`}
              >
                
                {/* Level Title & Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-extrabold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                      LEVEL {node.level}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {node.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={node.difficulty === 'Beginner' ? 'green' : node.difficulty === 'Intermediate' ? 'purple' : 'red'} mono size="sm">
                      {node.difficulty}
                    </Badge>
                    <Badge variant={isCompleted ? 'green' : isInProgress ? 'cyan' : isAvailable ? 'amber' : 'slate'} mono size="sm">
                      {node.status}
                    </Badge>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {node.description}
                </p>

                {/* Practical Split & Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Est. Time</span>
                    <span className="text-slate-200 font-bold">{node.estimatedHours} Hours</span>
                  </div>

                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Ratio Split</span>
                    <span className="text-cyan-400 font-bold">{node.theoryPercent}% Theory / {node.practicalPercent}% Lab</span>
                  </div>

                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Labs Count</span>
                    <span className="text-emerald-400 font-bold">{node.labsCount} Labs</span>
                  </div>

                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Projects</span>
                    <span className="text-purple-400 font-bold">{node.projectsCount} Projects</span>
                  </div>
                </div>

                {/* Action Trigger Footer */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {node.topics.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button className="text-xs font-mono font-bold text-cyan-400 group-hover:underline flex items-center gap-1 shrink-0">
                    {isCompleted ? 'Review Module' : isInProgress ? 'Continue Module' : isAvailable ? 'Start Level' : 'View Requirements'} →
                  </button>
                </div>

              </div>
            </div>
          );
        })}

      </div>


      {/* EDUCATIONAL SECTION: WHY THIS ORDER? */}
      <div className="bg-gradient-to-r from-[#121824] via-slate-900 to-[#121824] p-8 sm:p-10 rounded-3xl border border-cyan-500/30 max-w-4xl mx-auto space-y-4 shadow-2xl">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl font-extrabold text-white">Why This Progression Order?</h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Cybersecurity is not an isolated subject. You cannot secure or audit a web server without first understanding how <span className="text-cyan-400 font-semibold font-mono">Linux operating systems</span> manage processes, how <span className="text-emerald-400 font-semibold font-mono">TCP/IP network protocols</span> route packets, and how <span className="text-amber-400 font-semibold font-mono">programming languages</span> handle memory buffers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-bold">1. OS & Networking</span>
            <p className="text-slate-400 text-[11px]">Underpins all host systems, cloud instances, and socket flows.</p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold">2. Code & Scripting</span>
            <p className="text-slate-400 text-[11px]">Enables security automation, script writing, and payload analysis.</p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-amber-400 font-bold">3. Security Auditing</span>
            <p className="text-slate-400 text-[11px]">Applies defensive remediation and security engineering.</p>
          </div>
        </div>
      </div>


      {/* NODE DETAIL MODAL */}
      {activeModalNode && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">LEVEL {activeModalNode.level} Overview</span>
              <button
                onClick={() => setActiveModalNode(null)}
                className="text-xs font-mono px-2 py-1 bg-slate-900 hover:bg-slate-800 rounded text-slate-400"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">{activeModalNode.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{activeModalNode.description}</p>
            </div>

            <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
              <span className="text-cyan-400 font-bold block">Topics Covered:</span>
              <ul className="space-y-1 text-slate-300">
                {activeModalNode.topics.map((t, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  setActiveModalNode(null);
                  navigate('/labs');
                }}
              >
                Launch Level Labs
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
