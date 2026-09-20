import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { SectionHeader } from '../components/common/SectionHeader';
import { Link } from 'react-router-dom';
import { BookOpen, Map, Compass, Terminal, Database, ArrowRight } from 'lucide-react';

import { Badge } from '../components/common/Badge';

export const LearnOverviewPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        categoryTag="Learning Hub"
        title="Cyberverse Learning Center"
        description="Select structured learning paths, inspect interactive module flowcharts, or launch interactive command-line sandboxes."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Map className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Roadmaps</h3>
          <p className="text-xs text-slate-400">Structured career tracks with prerequisites and skill trees.</p>
          <Link to="/roadmap" className="inline-flex items-center gap-1 text-xs font-mono font-bold text-cyan-400 hover:underline">
            View Roadmaps <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Learning Paths</h3>
          <p className="text-xs text-slate-400">Deep-dive tracks covering Linux, Web Security, and Blue Team defense.</p>
          <Link to="/paths" className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 hover:underline">
            Explore Paths <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Module Catalog</h3>
          <p className="text-xs text-slate-400">Individual topic modules w/ visual diagrams and code fixes.</p>
          <Link to="/modules" className="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-400 hover:underline">
            Browse Modules <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* Featured Core Modules Section */}
      <div className="space-y-4">
        <SectionHeader title="Core Hands-On Topics" badge="Practical Engine" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#121824] p-5 rounded-xl border border-slate-800 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Terminal className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">Linux CLI Navigation & Log Filtering</h4>
                <Badge variant="green" mono size="sm">Beginner</Badge>
              </div>
              <p className="text-xs text-slate-400">Master ls, cd, cat, grep, and file permissions in a virtual target terminal.</p>
            </div>
          </div>

          <div className="bg-[#121824] p-5 rounded-xl border border-slate-800 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">SQL Injection & Prepared Statements</h4>
                <Badge variant="amber" mono size="sm">Beginner</Badge>
              </div>
              <p className="text-xs text-slate-400">Bypass dynamic string queries and implement positional parameterization.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
