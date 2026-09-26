import React from 'react';
import { dbService } from '../../services/dbService';
import { 
  Shield, LayoutDashboard, Compass, BookOpen, Terminal, HelpCircle, 
  Code, Activity, Wrench, Trophy, User, Settings, 
  Database, ShieldAlert, Layers, LogOut 
} from 'lucide-react';

export default function Sidebar({ currentPath, onNavigate, currentUser, onLogout }) {
  const user = currentUser || dbService.getCurrentUser();
  const isAdmin = user && user.role === 'Admin';

  const handleLogoClick = () => {
    if (!user) {
      onNavigate('/');
    } else if (isAdmin) {
      onNavigate('/admin');
    } else {
      onNavigate('/dashboard');
    }
  };

  const studentSections = [
    {
      title: 'OVERVIEW',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'LEARN',
      items: [
        { path: '/roadmap', label: 'Roadmap', icon: Compass },
        { path: '/paths', label: 'Learning Paths', icon: Layers },
        { path: '/learn', label: 'Modules & Lessons', icon: BookOpen }
      ]
    },
    {
      title: 'PRACTICE',
      items: [
        { path: '/labs', label: 'Practical Labs', icon: Terminal },
        { path: '/challenges', label: 'CTF Platform', icon: HelpCircle },
        { path: '/playground', label: 'Sandbox Playground', icon: Activity }
      ]
    },
    {
      title: 'BUILD & RESOURCES',
      items: [
        { path: '/projects', label: 'Security Projects', icon: Code },
        { path: '/tools', label: 'Tools & Cheat Sheets', icon: Wrench },
        { path: '/leaderboard', label: 'Leaderboard', icon: Trophy }
      ]
    }
  ];

  const adminSections = [
    {
      title: 'ADMIN CONSOLE',
      items: [
        { path: '/admin', label: 'Admin Overview', icon: LayoutDashboard },
        { path: '/admin', label: 'User Accounts DB', icon: Database }
      ]
    },
    {
      title: 'CONTENT & LABS',
      items: [
        { path: '/labs', label: 'Practical Lab Manager', icon: Terminal },
        { path: '/learn', label: 'Curriculum Manager', icon: BookOpen },
        { path: '/challenges', label: 'CTF Manager', icon: HelpCircle }
      ]
    },
    {
      title: 'SECURITY & SYSTEM',
      items: [
        { path: '/playground', label: 'Telemetry Inspector', icon: Activity },
        { path: '/settings', label: 'Platform Settings', icon: Settings }
      ]
    }
  ];

  const activeSections = isAdmin ? adminSections : studentSections;

  return (
    <aside className="desktop-only" style={{
      width: '260px',
      background: isAdmin ? '#120924' : '#090e1a',
      borderRight: `1px solid ${isAdmin ? 'rgba(200, 121, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)'}`,
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      zIndex: 90,
      transition: 'all 0.2s ease'
    }}>
      {/* Brand Header - Clicking Logo routes to Dashboard or Admin Console */}
      <div
        onClick={handleLogoClick}
        style={{
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          borderBottom: `1px solid ${isAdmin ? 'rgba(200, 121, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)'}`,
          cursor: 'pointer'
        }}
        title={isAdmin ? 'Click logo for Admin Console' : 'Click logo for Student Dashboard'}
      >
        <div style={{
          background: isAdmin ? 'rgba(200, 121, 255, 0.15)' : 'rgba(0, 243, 255, 0.15)',
          padding: '0.5rem',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {isAdmin ? <ShieldAlert size={22} color="#c879ff" /> : <Shield size={22} color="#00f3ff" />}
        </div>
        <div>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Cyber<span style={{ color: isAdmin ? '#c879ff' : '#00f3ff' }}>Verse</span>
          </h1>
          <div style={{ fontSize: '0.68rem', color: isAdmin ? '#c879ff' : '#00ff66', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
            {isAdmin ? 'ADMIN CONTROL CENTER' : 'LEARN. PRACTICE. DEFEND.'}
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0.85rem' }}>
        {activeSections.map((section, idx) => (
          <div key={idx} style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: isAdmin ? '#c879ff' : '#64748b', padding: '0 0.65rem 0.4rem 0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {section.title}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;

                let activeBg = 'rgba(0, 243, 255, 0.12)';
                let activeColor = '#00f3ff';
                let activeBorder = '#00f3ff';

                if (isAdmin) {
                  activeBg = 'rgba(200, 121, 255, 0.18)';
                  activeColor = '#c879ff';
                  activeBorder = '#c879ff';
                }

                return (
                  <button
                    key={item.label}
                    onClick={() => onNavigate(item.path)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.6rem 0.75rem',
                      borderRadius: '8px',
                      background: isActive ? activeBg : 'transparent',
                      color: isActive ? activeColor : '#cbd5e1',
                      borderLeft: isActive ? `3px solid ${activeBorder}` : '3px solid transparent',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.85rem',
                      width: '100%',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Icon size={18} color={isActive ? activeColor : '#64748b'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer User Badge & Logout */}
      <div style={{
        padding: '1rem 1.25rem',
        borderTop: `1px solid ${isAdmin ? 'rgba(200, 121, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)'}`,
        background: isAdmin ? '#0a0414' : '#050811',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{ background: isAdmin ? 'rgba(200, 121, 255, 0.2)' : 'rgba(0, 243, 255, 0.2)', width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={16} color={isAdmin ? '#c879ff' : '#00f3ff'} />
          </div>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>{user.name}</div>
            <div style={{ fontSize: '0.7rem', color: isAdmin ? '#c879ff' : '#00ff66', fontWeight: 600 }}>
              Role: {user.role}
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="btn-cyber-ghost"
          style={{ padding: '0.35rem 0.5rem', fontSize: '0.75rem', color: '#ff3366' }}
          title="Sign Out of CyberVerse"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
