import React from 'react';
import { 
  Shield, X, Compass, BookOpen, Layers, Terminal, HelpCircle, Target, 
  Code, Wrench, FileText, Users, Award, User, Settings, Lock 
} from 'lucide-react';

export default function MobileNav({ isOpen, onClose, currentPath, currentRoute, onNavigate }) {
  if (!isOpen) return null;

  const activePath = currentPath || currentRoute;

  const sections = [
    {
      title: 'OVERVIEW',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: Shield }
      ]
    },
    {
      title: 'LEARN',
      items: [
        { path: '/roadmap', label: 'Career Roadmap', icon: Compass },
        { path: '/paths', label: 'Learning Paths', icon: Layers },
        { path: '/learn', label: 'Modules & Lessons', icon: BookOpen }
      ]
    },
    {
      title: 'PRACTICE',
      items: [
        { path: '/labs', label: 'Practical Labs', icon: Terminal },
        { path: '/challenges', label: 'CTF Challenges', icon: HelpCircle },
        { path: '/missions', label: 'Security Missions', icon: Target },
        { path: '/playground', label: 'Cyber Playground', icon: Lock }
      ]
    },
    {
      title: 'BUILD',
      items: [
        { path: '/projects', label: 'Mini-Projects', icon: Code }
      ]
    },
    {
      title: 'RESOURCES',
      items: [
        { path: '/resources', label: 'Resources & Cards', icon: FileText },
        { path: '/tools', label: 'Security Tools', icon: Wrench }
      ]
    },
    {
      title: 'COMMUNITY',
      items: [
        { path: '/community', label: 'Study Room', icon: Users },
        { path: '/leaderboard', label: 'Leaderboard', icon: Award }
      ]
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex'
    }}>
      {/* Backdrop Overlay */}
      <div 
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(5, 8, 17, 0.8)',
          backdropFilter: 'blur(8px)'
        }} 
      />

      {/* Sliding Drawer */}
      <div style={{
        position: 'relative',
        width: '280px',
        maxWidth: '85vw',
        background: '#090e1a',
        borderRight: '1px solid rgba(0, 243, 255, 0.3)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.25rem 1rem',
        zIndex: 1001,
        overflowY: 'auto'
      }}>
        {/* Drawer Header */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Shield size={22} color="#00f3ff" />
              <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>Cyber<span style={{ color: '#00f3ff' }}>Verse</span></span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close Mobile Menu"
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.25rem' }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {sections.map((section, sIdx) => (
              <div key={sIdx}>
                <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.1em', marginBottom: '0.4rem', paddingLeft: '0.5rem' }}>
                  {section.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentRoute === item.path;
                    return (
                      <button
                        key={item.path}
                        onClick={() => { onNavigate(item.path); onClose(); }}
                        style={{
                          background: isActive ? 'rgba(0, 243, 255, 0.15)' : 'transparent',
                          color: isActive ? '#00f3ff' : '#cbd5e1',
                          border: isActive ? '1px solid rgba(0, 243, 255, 0.3)' : '1px solid transparent',
                          padding: '0.6rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.88rem',
                          fontWeight: isActive ? 700 : 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem',
                          width: '100%',
                          textAlign: 'left'
                        }}
                      >
                        <Icon size={18} color={isActive ? '#00f3ff' : '#64748b'} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drawer Footer */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '1.5rem' }}>
          <button
            onClick={() => { onNavigate('/profile'); onClose(); }}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', fontWeight: 600 }}
          >
            <User size={18} /> Student Profile
          </button>
          <button
            onClick={() => { onNavigate('/settings'); onClose(); }}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', fontWeight: 600 }}
          >
            <Settings size={18} /> Settings
          </button>
        </div>
      </div>
    </div>
  );
}
