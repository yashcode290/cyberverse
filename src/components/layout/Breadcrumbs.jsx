import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ currentRoute, onNavigate }) {
  const routeNames = {
    '/': 'Home',
    '/dashboard': 'Dashboard',
    '/learn': 'Modules & Lessons',
    '/roadmap': 'Career Roadmap',
    '/paths': 'Learning Paths',
    '/labs': 'Practical Labs',
    '/challenges': 'CTF Challenges',
    '/missions': 'Guided Missions',
    '/projects': 'Mini-Projects',
    '/playground': 'Cyber Playground',
    '/tools': 'Security Tools',
    '/resources': 'Resources & Cheat Sheets',
    '/community': 'Community Study Room',
    '/leaderboard': 'Student Leaderboard',
    '/profile': 'Student Profile',
    '/settings': 'Account Settings',
    '/admin': 'Admin Panel',
    '/login': 'Login',
    '/signup': 'Sign Up'
  };

  const currentLabel = routeNames[currentRoute] || 'Page';

  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
      <button
        onClick={() => onNavigate('/')}
        style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0 }}
      >
        <Home size={14} /> CyberVerse
      </button>
      <ChevronRight size={14} color="#334155" />
      <span style={{ color: '#00f3ff', fontWeight: 600 }}>{currentLabel}</span>
    </nav>
  );
}
