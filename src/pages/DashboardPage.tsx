import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, Award, Terminal, ArrowRight, Target, Play, 
  CheckCircle2, Compass, Cpu, Layers, Sparkles, BookOpen, Clock
} from 'lucide-react';

import { useUserProgress } from '../hooks/useUserProgress';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const DashboardPage: React.FC = () => {
  const { profile } = useUserProgress();
  const navigate = useNavigate();

  const xpProgressPercent = Math.min(100, Math.floor((profile.xp / profile.xpToNextLevel) * 100));

  const pathProgressList = [
    { name: 'Foundations', percent: 85, color: 'from-cyan-500 to-cyan-400' },
    { name: 'Networking', percent: 65, color: 'from-emerald-500 to-emerald-400' },
    { name: 'Linux CLI', percent: 90, color: 'from-teal-500 to-cyan-400' },
    { name: 'Web Security', percent: 40, color: 'from-amber-500 to-amber-400' },
    { name: 'Cryptography', percent: 25, color: 'from-purple-500 to-purple-400' },
    { name: 'Blue Team Defense', percent: 30, color: 'from-cyan-600 to-emerald-500' }
  ];

  const recentLabs = [
    { id: '1', name: 'Linux Navigation & Shell Mastery', category: 'Linux', difficulty: 'Beginner', xp: 150, completed: true },
    { id: '2', name: 'SQL Injection Authentication Bypass', category: 'Web Security', difficulty: 'Beginner', xp: 200, completed: true },
    { id: '3', name: 'Reflected DOM XSS Playground', category: 'Web Security', difficulty: 'Beginner', xp: 180, completed: true },
    { id: '4', name: 'SIEM Web Access Log Triage', category: 'Blue Team', difficulty: 'Intermediate', xp: 220, completed: true }
  ];

  const upcomingLabs = [
    { id: 'u1', name: 'Parameterized Queries & Prepared Statements', category: 'Web Security', difficulty: 'Beginner', estimated: '20 min', xp: 200 },
    { id: 'u2', name: 'SSH Brute-Force Log Investigation', category: 'Blue Team', difficulty: 'Intermediate', estimated: '25 min', xp: 220 }
  ];

  const weekDays = [
    { day: 'Mon', active: true },
    { day: 'Tue', active: true },
    { day: 'Wed', active: true },
    { day: 'Thu', active: true, today: true },
    { day: 'Fri', active: false },
    { day: 'Sat', active: false },
    { day: 'Sun', active: false }
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. COMMAND CENTER HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#121824] via-[#1A2234] to-[#121824] p-6 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <Badge variant="cyan" mono size="sm">Command Center</Badge>
            <span className="text-xs text-slate-400 font-mono">@{profile.username}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, Cyber Explorer.
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Continue learning, practice your skills, and complete today's mission.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <Link to="/profile">
            <img
              src={profile.avatarUrl}
              alt={profile.displayName}
              className="w-12 h-12 rounded-2xl border-2 border-cyan-400 object-cover shadow-lg hover:scale-105 transition-transform"
            />
          </Link>
        </div>
      </div>


      {/* 2. TOP STATS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        {/* Current Level */}
        <div className="bg-[#121824] p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-1 hover:border-cyan-500/40 transition-all">
          <span className="text-xs font-mono text-slate-400 block">Current Level</span>
          <span className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-mono">Lvl {profile.level}</span>
          <span className="text-[10px] text-slate-500 font-mono block">Defender Rank #{profile.rank}</span>
        </div>

        {/* XP Progress */}
        <div className="bg-[#121824] p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-1 hover:border-cyan-500/40 transition-all">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>XP Accumulated</span>
          </div>
          <span className="text-xl sm:text-2xl font-extrabold text-white font-mono">{profile.xp} XP</span>
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${xpProgressPercent}%` }} />
          </div>
        </div>

        {/* Learning Streak */}
        <div className="bg-[#121824] p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-1 hover:border-amber-500/40 transition-all">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>Learning Streak</span>
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <span className="text-xl sm:text-2xl font-extrabold text-amber-400 font-mono">{profile.streakDays} Days</span>
          <span className="text-[10px] text-slate-500 font-mono block">Active Daily Defender</span>
        </div>

        {/* Labs Completed */}
        <div className="bg-[#121824] p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-1 hover:border-emerald-500/40 transition-all">
          <span className="text-xs font-mono text-slate-400 block">Labs Completed</span>
          <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">4 Labs</span>
          <span className="text-[10px] text-slate-500 font-mono block">100% Target Verified</span>
        </div>

        {/* Projects Completed */}
        <div className="col-span-2 md:col-span-1 bg-[#121824] p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-1 hover:border-purple-500/40 transition-all">
          <span className="text-xs font-mono text-slate-400 block">Projects Built</span>
          <span className="text-xl sm:text-2xl font-extrabold text-purple-400 font-mono">1 Project</span>
          <span className="text-[10px] text-slate-500 font-mono block">FIM Integrity Monitor</span>
        </div>

      </div>


      {/* 3. QUICK ACTIONS BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => navigate('/labs')}
          className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 shrink-0"
        >
          <Terminal className="w-4 h-4" /> Practice Lab
        </button>

        <button
          onClick={() => navigate('/roadmap')}
          className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 shrink-0"
        >
          <BookOpen className="w-4 h-4" /> Continue Learning
        </button>

        <button
          onClick={() => navigate('/challenges')}
          className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 shrink-0"
        >
          <Target className="w-4 h-4" /> Daily Challenge
        </button>

        <button
          onClick={() => navigate('/playground')}
          className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 shrink-0"
        >
          <Cpu className="w-4 h-4" /> Cyber Playground
        </button>

        <button
          onClick={() => navigate('/projects')}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 shrink-0"
        >
          <Layers className="w-4 h-4" /> Browse Projects
        </button>
      </div>


      {/* 4. MAIN LAYOUT GRID: CONTINUE LEARNING & TODAY'S MISSION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2-Columns: Continue Learning & Path Progress */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Large Primary Card: CONTINUE LEARNING */}
          <div className="bg-[#121824] p-6 sm:p-8 rounded-3xl border border-cyan-500/40 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold flex items-center gap-2">
                <Compass className="w-4 h-4" /> Active Track: Networking Fundamentals
              </span>
              <Badge variant="cyan" mono size="sm">65% Completed</Badge>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                Current Module
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                TCP/IP, Packet Inspection & HTTP Protocols
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Next Up: <span className="text-cyan-300 font-semibold font-mono">Lesson 3 • Decoding HTTP Headers & Status Codes</span>
              </p>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Track Completion</span>
                <span className="text-cyan-400 font-bold">Module 4 of 6</span>
              </div>
              <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Link to="/labs">
                <Button variant="primary" size="md" icon={<Play className="w-4 h-4 fill-current" />}>
                  Continue Learning
                </Button>
              </Link>

              <Link to="/roadmap" className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1">
                View Full Roadmap Track →
              </Link>
            </div>
          </div>


          {/* LEARNING PROGRESS BY PATH */}
          <div className="bg-[#121824] p-6 rounded-3xl border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" /> Learning Progress by Path
              </h3>
              <span className="text-xs font-mono text-slate-400">6 Active Tracks</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pathProgressList.map((p, idx) => (
                <div key={idx} className="space-y-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-200 font-semibold">{p.name}</span>
                    <span className="text-cyan-400 font-bold">{p.percent}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${p.color} rounded-full`} style={{ width: `${p.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* RECENT LABS & UPCOMING */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Recent Completed Labs */}
            <div className="bg-[#121824] p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Terminal className="w-4 h-4 text-emerald-400" /> Recent Completed Labs
              </h3>

              <div className="space-y-3">
                {recentLabs.map((lab) => (
                  <div key={lab.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{lab.name}</span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">+{lab.xp} XP</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <span>{lab.category}</span>
                      <span>•</span>
                      <span className="text-cyan-400">{lab.difficulty}</span>
                      <span className="ml-auto text-emerald-400 font-bold flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Solved
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Recommended Labs */}
            <div className="bg-[#121824] p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Clock className="w-4 h-4 text-cyan-400" /> Upcoming Recommended Labs
              </h3>

              <div className="space-y-3">
                {upcomingLabs.map((lab) => (
                  <div key={lab.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{lab.name}</span>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">+{lab.xp} XP</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>{lab.category} • Est. {lab.estimated}</span>
                      <Link to="/labs" className="text-cyan-400 font-bold hover:underline">
                        Start →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>


        {/* Right Column: TODAY'S MISSION, DAILY STREAK & ACHIEVEMENTS */}
        <div className="space-y-8">
          
          {/* TODAY'S MISSION CARD */}
          <div className="bg-gradient-to-br from-slate-900 via-[#121824] to-slate-900 p-6 rounded-3xl border border-amber-500/40 shadow-xl space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4" /> Today's Mission
              </span>
              <Badge variant="amber" mono size="sm">+100 XP</Badge>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Packet Detective</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Analyze the simulated packet capture log and identify the suspicious HTTP request payload.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
              <span>Difficulty: <span className="text-emerald-400 font-bold">Beginner</span></span>
              <span>Target: Packet-04</span>
            </div>

            <Link to="/challenges">
              <Button variant="secondary" size="sm" className="w-full mt-2" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                Start Mission
              </Button>
            </Link>
          </div>


          {/* VISUAL DAILY STREAK TRACKER */}
          <div className="bg-[#121824] p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" /> Daily Streak Calendar
              </h3>
              <span className="text-xs font-mono text-amber-400 font-bold">4 Days Active</span>
            </div>

            <div className="grid grid-cols-7 gap-2 font-mono text-center">
              {weekDays.map((w, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    w.active
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  } ${w.today ? 'ring-2 ring-amber-400' : ''}`}
                >
                  <span className="text-[10px] uppercase font-bold">{w.day}</span>
                  <div className={`w-3 h-3 rounded-full ${w.active ? 'bg-amber-400 shadow-md shadow-amber-400/50' : 'bg-slate-800'}`} />
                </div>
              ))}
            </div>
          </div>


          {/* ADAPTIVE LEARNING RECOMMENDATION */}
          <div className="bg-[#121824] p-6 rounded-3xl border border-purple-500/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Learning Recommendation
            </div>
            <h4 className="text-sm font-bold text-white">Parameterized SQL Prepared Queries</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your SQL Injection lab results, master positional parameters ($1, $2) to defend node applications.
            </p>
            <Link to="/labs" className="inline-flex items-center gap-1 text-xs font-mono text-purple-400 font-bold hover:underline pt-1">
              Start Recommended Topic →
            </Link>
          </div>


          {/* ACHIEVEMENTS SHOWCASE */}
          <div className="bg-[#121824] p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Award className="w-4 h-4 text-purple-400" /> Recent Badges ({profile.achievements.length})
            </h3>

            <div className="space-y-3">
              {profile.achievements.map((ach) => (
                <div key={ach.id} className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{ach.title}</h4>
                    <p className="text-[10px] text-slate-400 leading-tight">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
