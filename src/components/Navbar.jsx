import React from 'react';
import { Shield, Flame, Award, BookOpen, Search, Terminal, Layers, HelpCircle, Users, Award as CertIcon, Home } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, userXP, userStreak, onOpenCertificate }) {
  const level = Math.floor(userXP / 200) + 1;
  const xpInCurrentLevel = userXP % 200;
  const progressPercent = (xpInCurrentLevel / 200) * 100;

  const navItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'courses', label: 'Learning Paths', icon: BookOpen },
    { id: 'wireshark', label: 'Wireshark Lab', icon: Search },
    { id: 'terminal', label: 'Nmap Terminal', icon: Terminal },
    { id: 'flashcards', label: 'Port Cards', icon: Layers },
    { id: 'quiz', label: 'Quiz Engine', icon: HelpCircle },
    { id: 'studyroom', label: 'Study Room', icon: Users },
  ];

  return (
    <header style={{
      background: 'rgba(7, 10, 18, 0.95)',
      borderBottom: '1px solid rgba(0, 243, 255, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(16px)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('landing')} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #00f3ff 0%, #00ff66 100%)',
            padding: '0.5rem',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0, 243, 255, 0.4)'
          }}>
            <Shield size={24} color="#070a12" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '800', lineHeight: 1.1 }}>
              Cyber<span style={{ color: '#00f3ff' }}>Verse</span>
            </h1>
            <p style={{ fontSize: '0.68rem', color: '#00ff66', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              LEARN • PRACTICE • BUILD • DEFEND
            </p>
          </div>
        </div>

        {/* Nav Tabs */}
        <nav style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  background: isActive ? 'rgba(0, 243, 255, 0.15)' : 'transparent',
                  color: isActive ? '#00f3ff' : '#94a3b8',
                  border: isActive ? '1px solid rgba(0, 243, 255, 0.4)' : '1px solid transparent',
                  padding: '0.5rem 0.85rem',
                  borderRadius: '8px',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User Stats & Certificate */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Streak Counter */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(255, 150, 0, 0.12)',
            border: '1px solid rgba(255, 150, 0, 0.3)',
            padding: '0.35rem 0.65rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#ff9d00'
          }}>
            <Flame size={16} fill="#ff9d00" />
            <span>{userStreak} Day Streak</span>
          </div>

          {/* Level & XP */}
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: '110px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#f1f5f9' }}>
              <span style={{ color: '#00ff66' }}>Lvl {level}</span>
              <span style={{ color: '#00f3ff' }}>{userXP} XP</span>
            </div>
            <div style={{
              height: '6px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              overflow: 'hidden',
              marginTop: '4px'
            }}>
              <div style={{
                height: '100%',
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, #00f3ff, #00ff66)',
                transition: 'width 0.4s ease'
              }} />
            </div>
          </div>

          {/* Certificate Button */}
          <button
            onClick={onOpenCertificate}
            style={{
              background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.3), rgba(0, 243, 255, 0.3))',
              border: '1px solid rgba(157, 78, 221, 0.5)',
              color: '#fff',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 0 10px rgba(157, 78, 221, 0.2)'
            }}
          >
            <CertIcon size={15} color="#00f3ff" />
            Cert
          </button>
        </div>
      </div>
    </header>
  );
}
