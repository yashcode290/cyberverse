import React from 'react';
import { dbService } from '../../services/dbService';
import { Search, Zap, LogOut, ShieldAlert, Menu } from 'lucide-react';

export default function TopBar({ currentUser, onNavigate, onLogout, onToggleMobileNav }) {
  const user = currentUser || dbService.getCurrentUser();
  const isAdmin = user && user.role === 'Admin';

  return (
    <div style={{
      height: '64px',
      background: isAdmin ? '#120722' : '#090e1a',
      borderBottom: `1px solid ${isAdmin ? 'rgba(200, 121, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'all 0.2s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Mobile Hamburger Menu Toggle Button */}
        <button
          onClick={onToggleMobileNav}
          className="btn-cyber-ghost mobile-only"
          style={{ padding: '0.4rem 0.55rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title="Open Navigation Menu"
        >
          <Menu size={20} color={isAdmin ? '#c879ff' : '#00f3ff'} />
        </button>

        {/* Search Bar */}
        <div style={{ position: 'relative', width: '240px' }} className="desktop-only">
          <Search size={16} color="#64748b" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search modules, labs, tools, cheat sheets..."
            style={{
              background: '#050811',
              border: `1px solid ${isAdmin ? 'rgba(200, 121, 255, 0.3)' : 'rgba(0, 243, 255, 0.2)'}`,
              color: '#ffffff',
              fontSize: '0.83rem',
              padding: '0.45rem 0.75rem 0.45rem 2.25rem',
              borderRadius: '20px',
              width: '100%',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Right User Telemetry & Auth Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Role Badge */}
        <span className={isAdmin ? 'badge badge-purple' : 'badge badge-cyan'} style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}>
          {isAdmin ? '🛡️ ADMIN CONSOLE' : '⚡ STUDENT PORTAL'}
        </span>

        {/* XP Badge */}
        {!isAdmin && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(0, 255, 102, 0.1)', border: '1px solid rgba(0, 255, 102, 0.3)', padding: '0.3rem 0.7rem', borderRadius: '20px' }}>
            <Zap size={14} color="#00ff66" />
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#00ff66', fontFamily: 'var(--font-mono)' }}>
              {user.xp || 650} XP
            </span>
          </div>
        )}

        {/* Admin Navigation Button */}
        {isAdmin && (
          <button
            onClick={() => onNavigate('/admin')}
            className="btn-cyber-purple"
            style={{ fontSize: '0.78rem', padding: '0.35rem 0.85rem', background: 'linear-gradient(135deg, #c879ff 0%, #9d4edd 100%)', color: '#ffffff' }}
          >
            <ShieldAlert size={14} /> Admin Dashboard
          </button>
        )}

        {/* User Handle & Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderLeft: '1px solid rgba(255, 255, 255, 0.1)', paddingLeft: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>{user.name}</div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{user.email}</div>
          </div>

          <button
            onClick={onLogout}
            className="btn-cyber-ghost"
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.55rem', color: '#ff3366' }}
            title="Log Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
