import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileNav from './MobileNav';
import Breadcrumbs from './Breadcrumbs';
import { dbService } from '../../services/dbService';
import { LogOut, AlertTriangle } from 'lucide-react';

export default function AppLayout({ children, currentPath, onNavigate, currentUser, onLogout }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleRequestLogout = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    dbService.logoutUser();
    if (onLogout) onLogout();
    onNavigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080b11' }}>
      {/* Desktop Sidebar */}
      <Sidebar
        currentPath={currentPath}
        onNavigate={onNavigate}
        currentUser={currentUser}
        onLogout={handleRequestLogout}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar
          currentUser={currentUser}
          onNavigate={onNavigate}
          onLogout={handleRequestLogout}
          onToggleMobileNav={() => setMobileNavOpen(true)}
        />

        <main style={{ flex: 1, padding: '1.75rem 2rem', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          <Breadcrumbs currentPath={currentPath} onNavigate={onNavigate} />
          {children}
        </main>
      </div>

      {/* Mobile sliding navigation drawer */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        currentPath={currentPath}
        onNavigate={onNavigate}
        currentUser={currentUser}
      />

      {/* Sign Out Confirmation Modal */}
      {showLogoutConfirm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 8, 17, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem'
        }}>
          <div className="cyber-card" style={{ maxWidth: '420px', width: '100%', padding: '2rem', textAlign: 'center', background: '#0e1526' }}>
            <div style={{ background: 'rgba(255, 51, 102, 0.12)', width: '54px', height: '54px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <LogOut size={28} color="#ff3366" />
            </div>

            <h3 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '0.35rem' }}>
              Confirm Sign Out
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Are you sure you want to log out of your CyberVerse session?
            </p>

            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center' }}>
              <button
                onClick={handleConfirmLogout}
                className="btn-cyber-ghost"
                style={{ padding: '0.65rem 1.25rem', color: '#ff3366', borderColor: 'rgba(255, 51, 102, 0.4)', fontWeight: 700 }}
              >
                Yes, Sign Out
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="btn-cyber-primary"
                style={{ padding: '0.65rem 1.25rem' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
