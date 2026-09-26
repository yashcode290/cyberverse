import React, { useState, useEffect } from 'react';
import { Users, Play, Pause, RotateCw, BookOpen, Save, Award, CheckCircle2 } from 'lucide-react';

export default function StudyRoom({ userXP }) {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [notes, setNotes] = useState(
    `# My Network Security Study Notes\n- TCP Handshake: SYN -> SYN-ACK -> ACK\n- Nmap Stealth Scan: nmap -sS <IP>\n- Common Port: HTTPS on 443 (TCP)`
  );
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(prev => prev - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSaveNotes = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const leaderboard = [
    { rank: 1, name: 'CyberAlex (You)', xp: userXP, status: 'Studying Wireshark' },
    { rank: 2, name: 'NetNinja_99', xp: 680, status: 'In Nmap Terminal' },
    { rank: 3, name: 'SecuritySam', xp: 540, status: 'Port Flashcards' },
    { rank: 4, name: 'EthicalElena', xp: 420, status: 'Taking Network Quiz' }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
      {/* Left Column: Pomodoro & Study Notes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Pomodoro Timer Card */}
        <div className="cyber-card cyber-card-glow-cyan" style={{
          background: 'linear-gradient(135deg, #0e1526 0%, #152038 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          padding: '1.75rem'
        }}>
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>Focus Mode</span>
            <h3 style={{ fontSize: '1.3rem' }}>Pomodoro Study Timer</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>25-minute deep focus block for packet analysis and networking lessons.</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#00f3ff', fontFamily: 'var(--font-mono)' }}>
              {formatTime(seconds)}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setIsActive(!isActive)}
                className="btn-cyber-primary"
                style={{ padding: '0.65rem' }}
              >
                {isActive ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button
                onClick={() => { setIsActive(false); setSeconds(25 * 60); }}
                className="btn-cyber-ghost"
                style={{ padding: '0.65rem' }}
              >
                <RotateCw size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Study Notebook */}
        <div className="cyber-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen color="#00ff66" size={20} /> Cybersecurity Study Notebook
            </h3>
            <button onClick={handleSaveNotes} className="btn-cyber-outline" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
              {savedStatus ? <CheckCircle2 size={14} color="#00ff66" /> : <Save size={14} />}
              {savedStatus ? 'Saved!' : 'Save Notes'}
            </button>
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={12}
            style={{
              background: '#050811',
              border: '1px solid rgba(0, 243, 255, 0.2)',
              borderRadius: '8px',
              color: '#00ff66',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              padding: '1rem',
              outline: 'none',
              lineHeight: 1.6,
              resize: 'vertical'
            }}
          />
        </div>
      </div>

      {/* Right Column: Leaderboard */}
      <div className="cyber-card">
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users color="#9d4edd" size={20} /> Study Group Leaderboard
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {leaderboard.map((user) => (
            <div
              key={user.rank}
              style={{
                background: user.rank === 1 ? 'rgba(0, 243, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                border: user.rank === 1 ? '1px solid rgba(0, 243, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                padding: '0.85rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: user.rank === 1 ? '#00f3ff' : '#64748b',
                  width: '20px'
                }}>
                  #{user.rank}
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {user.status}
                  </div>
                </div>
              </div>

              <div style={{ fontWeight: 800, color: '#00ff66', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                {user.xp} XP
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
