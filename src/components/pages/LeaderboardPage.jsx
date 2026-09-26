import React from 'react';
import PageHeader from '../layout/PageHeader';
import { Award, Flame, CheckCircle2, Shield } from 'lucide-react';

export default function LeaderboardPage({ userXP }) {
  const leaderboard = [
    { rank: 1, name: 'CyberAlex (You)', xp: userXP, level: Math.floor(userXP / 200) + 1, streak: '3 days', badge: 'Wireshark Specialist' },
    { rank: 2, name: 'NetNinja_99', xp: 680, level: 4, streak: '7 days', badge: 'Nmap Master' },
    { rank: 3, name: 'SecuritySam', xp: 540, level: 3, streak: '5 days', badge: 'SQLi Defender' },
    { rank: 4, name: 'EthicalElena', xp: 420, level: 3, streak: '2 days', badge: 'Crypto Cracker' },
    { rank: 5, name: 'BlueTeamBen', xp: 350, level: 2, streak: '4 days', badge: 'SIEM Analyst' }
  ];

  return (
    <div>
      <PageHeader
        title="Student Community Leaderboard"
        description="Top cybersecurity learners ranked by verified XP, completed labs, and daily study streaks."
        badgeText="GLOBAL RANKINGS"
        badgeColor="badge-amber"
      />

      <div className="cyber-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#090e1a', color: '#64748b', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <th style={{ padding: '0.85rem 1.25rem' }}>Rank</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Student Handle</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Level</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Earned XP</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Active Streak</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Specialization</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((u) => (
                <tr
                  key={u.rank}
                  style={{
                    background: u.rank === 1 ? 'rgba(0, 243, 255, 0.1)' : 'transparent',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)'
                  }}
                >
                  <td style={{ padding: '0.85rem 1.25rem', fontWeight: 800, color: u.rank === 1 ? '#00f3ff' : '#64748b' }}>
                    #{u.rank}
                  </td>
                  <td style={{ padding: '0.85rem 1.25rem', fontWeight: 700, color: u.rank === 1 ? '#00ff66' : '#ffffff' }}>
                    {u.name}
                  </td>
                  <td style={{ padding: '0.85rem 1.25rem', color: '#cbd5e1' }}>Lvl {u.level}</td>
                  <td style={{ padding: '0.85rem 1.25rem', fontWeight: 800, color: '#00ff66', fontFamily: 'var(--font-mono)' }}>
                    {u.xp} XP
                  </td>
                  <td style={{ padding: '0.85rem 1.25rem', color: '#ff9d00', fontWeight: 600 }}>🔥 {u.streak}</td>
                  <td style={{ padding: '0.85rem 1.25rem' }}>
                    <span className="badge badge-purple">{u.badge}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
