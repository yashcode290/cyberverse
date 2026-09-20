import React from 'react';
import { Trophy, Medal } from 'lucide-react';

import { Badge } from '../components/common/Badge';
import { useUserProgress } from '../hooks/useUserProgress';

interface LeaderboardUser {
  rank: number;
  displayName: string;
  username: string;
  level: number;
  xp: number;
  completedLabs: number;
  streakDays: number;
  avatarUrl: string;
  isCurrentUser?: boolean;
}

export const LeaderboardPage: React.FC = () => {
  const { profile } = useUserProgress();

  const mockLeaders: LeaderboardUser[] = [
    { rank: 1, displayName: 'Elena Rostova', username: 'cyber_elena', level: 12, xp: 4850, completedLabs: 24, streakDays: 18, avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
    { rank: 2, displayName: 'Marcus Vance', username: 'vance_sec', level: 10, xp: 3900, completedLabs: 19, streakDays: 14, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
    { rank: 3, displayName: 'Sophia Chen', username: 'sophia_blue', level: 9, xp: 3450, completedLabs: 17, streakDays: 12, avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80' },
    { rank: 4, displayName: 'David Kim', username: 'dkim_ctf', level: 7, xp: 2800, completedLabs: 14, streakDays: 9, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
    { rank: 14, displayName: profile.displayName, username: profile.username, level: profile.level, xp: profile.xp, completedLabs: profile.completedLabs.length, streakDays: profile.streakDays, avatarUrl: profile.avatarUrl, isCurrentUser: true }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <Badge variant="cyan" mono>Global Rankings</Badge>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Trophy className="w-8 h-8 text-amber-400" /> Student Leaderboard
        </h1>
        <p className="text-sm text-slate-400">
          Rankings are calculated based on verified XP earned from interactive labs and CTF flag submissions.
        </p>
      </div>

      <div className="bg-[#121824] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <table className="w-full text-left font-mono text-xs text-slate-300">
          <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-4">Rank</th>
              <th className="p-4">Student Defender</th>
              <th className="p-4">Level</th>
              <th className="p-4">Total XP</th>
              <th className="p-4">Labs Solved</th>
              <th className="p-4">Streak</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {mockLeaders.map((u) => (
              <tr
                key={u.rank}
                className={`hover:bg-slate-900/50 ${u.isCurrentUser ? 'bg-cyan-500/10 border-l-4 border-cyan-400' : ''}`}
              >
                <td className="p-4 font-bold">
                  {u.rank === 1 ? (
                    <span className="text-amber-400 flex items-center gap-1 font-extrabold"><Medal className="w-4 h-4" /> #1</span>
                  ) : u.rank === 2 ? (
                    <span className="text-slate-300 flex items-center gap-1 font-bold"><Medal className="w-4 h-4 text-slate-400" /> #2</span>
                  ) : u.rank === 3 ? (
                    <span className="text-amber-600 flex items-center gap-1 font-bold"><Medal className="w-4 h-4 text-amber-600" /> #3</span>
                  ) : (
                    <span>#{u.rank}</span>
                  )}
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={u.avatarUrl} alt={u.displayName} className="w-8 h-8 rounded-full border border-slate-700 object-cover" />
                    <div>
                      <span className="text-sm font-bold text-white block">{u.displayName}</span>
                      <span className="text-[11px] text-slate-500">@{u.username}</span>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <Badge variant="cyan" mono size="sm">Lvl {u.level}</Badge>
                </td>

                <td className="p-4 font-bold text-cyan-400">{u.xp} XP</td>
                <td className="p-4">{u.completedLabs} Labs</td>
                <td className="p-4 text-amber-400 font-bold">⚡ {u.streakDays}d</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
