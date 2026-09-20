import React from 'react';
import { useUserProgress } from '../hooks/useUserProgress';
import { Award } from 'lucide-react';

import { Badge } from '../components/common/Badge';

export const ProfilePage: React.FC = () => {
  const { profile } = useUserProgress();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Profile Header */}
      <div className="bg-[#121824] p-8 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={profile.avatarUrl}
            alt={profile.displayName}
            className="w-20 h-20 rounded-2xl border-2 border-cyan-400 object-cover shadow-xl"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">{profile.displayName}</h1>
              <Badge variant="cyan" mono>Level {profile.level}</Badge>
            </div>
            <p className="text-xs font-mono text-slate-400">@{profile.username} • Joined {profile.joinDate}</p>
            <p className="text-xs text-emerald-400 font-mono font-semibold pt-1">
              Global Rank #{profile.rank} • {profile.xp} XP Accumulated
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono">
            <span className="text-xs text-slate-500 block">Streak</span>
            <span className="text-lg font-bold text-amber-400">⚡ {profile.streakDays} Days</span>
          </div>
          <div className="px-4 py-2 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono">
            <span className="text-xs text-slate-500 block">Labs Solved</span>
            <span className="text-lg font-bold text-cyan-400">{profile.completedLabs.length}</span>
          </div>
        </div>
      </div>

      {/* Achievements Showcase */}
      <div className="bg-[#121824] p-8 rounded-2xl border border-slate-800 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-400" /> Unlocked Achievements ({profile.achievements.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profile.achievements.map((ach) => (
            <div key={ach.id} className="p-4 bg-slate-950 rounded-xl border border-purple-500/30 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">{ach.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{ach.description}</p>
                <span className="text-[10px] font-mono text-purple-400 block pt-1">Unlocked {ach.unlockedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
