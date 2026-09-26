import React from 'react';
import { 
  Shield, Search, Terminal, ArrowRight, 
  Zap, Compass, Award, BookOpen, Code, 
  Check, Play, Flame, Sparkles, HelpCircle 
} from 'lucide-react';

export default function Dashboard({ onNavigate, userXP = 650, completedLabsCount = 2 }) {
  const level = Math.floor((userXP || 650) / 200) + 1;

  const handleNav = (target) => {
    if (!onNavigate) return;
    if (target === 'courses' || target === 'learn') onNavigate('/learn');
    else if (target === 'wireshark' || target === 'labs') onNavigate('/labs');
    else if (target === 'paths') onNavigate('/paths');
    else if (target === 'terminal' || target === 'playground') onNavigate('/playground');
    else if (target === 'quiz' || target === 'challenges') onNavigate('/challenges');
    else if (target.startsWith('/')) onNavigate(target);
    else onNavigate('/' + target);
  };

  // Path progress metrics
  const pathProgress = [
    { title: 'Foundations', percent: 85, completed: '10/12 Modules', color: '#00ff66' },
    { title: 'Networking & Traffic', percent: 60, completed: '6/10 Modules', color: '#00f3ff' },
    { title: 'Linux Terminal', percent: 75, completed: '9/12 Modules', color: '#00ff66' },
    { title: 'Web Application Security', percent: 40, completed: '6/16 Modules', color: '#c879ff' },
    { title: 'Cryptography', percent: 50, completed: '4/8 Modules', color: '#ffd166' },
    { title: 'Blue Team Defense', percent: 30, completed: '4/15 Modules', color: '#ff3366' }
  ];

  // 7-day streak calendar status
  const streakDays = [
    { day: 'Mon', active: true },
    { day: 'Tue', active: true },
    { day: 'Wed', active: true },
    { day: 'Thu', active: true, today: true },
    { day: 'Fri', active: false },
    { day: 'Sat', active: false },
    { day: 'Sun', active: false }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 1. DASHBOARD HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-green">Learning Command Center</span>
            <span className="badge badge-cyan">Active Session</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Welcome back, <span style={{ color: '#00f3ff' }}>Cyber Explorer</span>.
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '0.2rem' }}>
            Continue learning, practice your skills in safe sandboxes, and complete today's mission.
          </p>
        </div>

        {/* Quick Curriculum Launcher */}
        <button 
          onClick={() => handleNav('/learn')} 
          className="btn-cyber-primary" 
          style={{ fontSize: '0.85rem' }}
        >
          <Compass size={16} /> View Curriculum
        </button>
      </div>

      {/* 2. TOP COMMAND STATS BAR */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        {/* Current Level */}
        <div className="cyber-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>CURRENT LEVEL</span>
            <Shield size={18} color="#00f3ff" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00f3ff', fontFamily: 'var(--font-mono)' }}>
            Level {level}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
            Student Explorer Rank
          </div>
        </div>

        {/* Total XP */}
        <div className="cyber-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>TOTAL XP</span>
            <Zap size={18} color="#00ff66" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00ff66', fontFamily: 'var(--font-mono)' }}>
            {userXP} XP
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
            +{userXP - 500} XP Earned This Week
          </div>
        </div>

        {/* Labs Completed */}
        <div className="cyber-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>LABS COMPLETED</span>
            <Terminal size={18} color="#c879ff" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c879ff', fontFamily: 'var(--font-mono)' }}>
            {completedLabsCount} Labs
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
            100% Safe Educational Targets
          </div>
        </div>
      </div>

      {/* 3. CONTINUE LEARNING HERO CARD */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '1.5rem' }}>
        {/* CONTINUE LEARNING CARD */}
        <div className="cyber-card" style={{ borderLeft: '4px solid #00f3ff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span className="badge badge-cyan">CONTINUE MODULE</span>
              <span style={{ fontSize: '0.8rem', color: '#00f3ff', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>60% COMPLETED</span>
            </div>

            <h2 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '0.35rem' }}>
              Networking Fundamentals & Traffic Analysis
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Next Lesson: <strong>Lesson 4 — Inspecting TCP 3-Way Handshake SYN & ACK Flags</strong>
            </p>

            <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.25rem' }}>
              <div style={{ height: '100%', width: '60%', background: 'linear-gradient(90deg, #00f3ff, #00ff66)' }} />
            </div>
          </div>

          <button 
            onClick={() => handleNav('/learn')} 
            className="btn-cyber-primary" 
            style={{ padding: '0.75rem 1.5rem', width: 'fit-content' }}
          >
            Continue Module <ArrowRight size={18} />
          </button>
        </div>

        {/* TODAY'S MISSION CARD */}
        <div className="cyber-card" style={{ borderLeft: '4px solid #00ff66', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span className="badge badge-green">TODAY'S FEATURED MISSION</span>
              <span className="badge badge-amber">+100 XP</span>
            </div>

            <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.35rem' }}>
              Linux File Hunt
            </h3>

            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Navigate simulated Linux terminal to discover hidden incident report files and extract secret flags.
            </p>
          </div>

          <button 
            onClick={() => handleNav('/labs/linux-file-hunt')} 
            className="btn-cyber-green"
            style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
          >
            Start Mission <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* 4. LEARNING PROGRESS BY PATH */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem' }}>
        <div className="cyber-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Compass color="#00f3ff" size={20} /> Learning Progress By Path
            </h3>
            <button onClick={() => handleNav('/paths')} style={{ background: 'transparent', border: 'none', color: '#00f3ff', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
              View All Paths →
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {pathProgress.map((p, idx) => (
              <div key={idx} style={{ background: 'rgba(5, 8, 17, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1rem', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                  <span>{p.title}</span>
                  <span style={{ color: p.color, fontFamily: 'var(--font-mono)' }}>{p.percent}%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                  <div style={{ height: '100%', width: `${p.percent}%`, background: p.color }} />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.completed}</div>
              </div>
            ))}
          </div>
        </div>

        {/* DAILY STREAK CALENDAR & ACHIEVEMENTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="cyber-card" style={{ borderLeft: '4px solid #ffd166' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#ffd166', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Flame fill="#ffd166" size={18} /> Daily Study Streak
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#ffffff', fontWeight: 700 }}>3 Days 🔥</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.4rem', textAlign: 'center' }}>
              {streakDays.map((d, dIdx) => (
                <div key={dIdx} style={{
                  background: d.active ? 'rgba(255, 209, 102, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: d.today ? '2px solid #ffd166' : '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '8px',
                  padding: '0.65rem 0.2rem'
                }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.2rem' }}>{d.day}</div>
                  {d.active ? (
                    <Check size={16} color="#ffd166" style={{ margin: '0 auto' }} />
                  ) : (
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', margin: '2px auto' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="cyber-card">
            <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Award color="#c879ff" size={18} /> Earned Badges
            </h3>
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <span className="badge badge-cyan">Packet Specialist</span>
              <span className="badge badge-green">Nmap Scanner</span>
              <span className="badge badge-purple">Linux Explorer</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. QUICK ACTIONS GRID */}
      <div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap color="#00f3ff" size={20} /> Quick Sandboxes & Practice
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <button onClick={() => handleNav('/labs')} className="btn-cyber-ghost" style={{ justifyContent: 'center', padding: '0.85rem' }}>
            <Terminal size={18} /> Practical Labs
          </button>

          <button onClick={() => handleNav('/playground')} className="btn-cyber-ghost" style={{ justifyContent: 'center', padding: '0.85rem' }}>
            <Zap size={18} /> Sandbox Playground
          </button>

          <button onClick={() => handleNav('/challenges')} className="btn-cyber-ghost" style={{ justifyContent: 'center', padding: '0.85rem' }}>
            <HelpCircle size={18} /> CTF Platform
          </button>

          <button onClick={() => handleNav('/tools')} className="btn-cyber-ghost" style={{ justifyContent: 'center', padding: '0.85rem' }}>
            <Code size={18} /> Security Tools
          </button>
        </div>
      </div>
    </div>
  );
}
