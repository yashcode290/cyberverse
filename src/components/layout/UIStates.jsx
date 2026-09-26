import React from 'react';
import { AlertTriangle, RefreshCw, FolderSearch, ShieldAlert } from 'lucide-react';

export function EmptyState({ title = 'No Content Found', description = 'There are no items to display in this category yet.', onReset }) {
  return (
    <div className="cyber-card" style={{ textAlign: 'center', padding: '3.5rem 2rem', maxWidth: '600px', margin: '2rem auto' }}>
      <FolderSearch size={48} color="#64748b" style={{ margin: '0 auto 1rem auto' }} />
      <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#ffffff' }}>{title}</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        {description}
      </p>
      {onReset && (
        <button onClick={onReset} className="btn-cyber-outline" style={{ fontSize: '0.85rem' }}>
          <RefreshCw size={16} /> Reset Filters
        </button>
      )}
    </div>
  );
}

export function LoadingState({ message = 'Loading CyberVerse Sandbox Data...' }) {
  return (
    <div className="cyber-card" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '500px', margin: '3rem auto' }}>
      <RefreshCw size={36} color="#00f3ff" className="animate-pulse-slow" style={{ margin: '0 auto 1rem auto' }} />
      <h4 style={{ fontSize: '1.1rem', color: '#00f3ff', fontFamily: 'var(--font-mono)' }}>{message}</h4>
      <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.5rem' }}>Initializing simulated environment...</p>
    </div>
  );
}

export function ErrorState({ title = 'Sandbox Connection Error', message = 'Failed to load isolated sandbox telemetry.', onRetry }) {
  return (
    <div className="cyber-card" style={{ textAlign: 'center', padding: '3.5rem 2rem', maxWidth: '600px', margin: '2rem auto', borderLeft: '4px solid #ff3366' }}>
      <ShieldAlert size={48} color="#ff3366" style={{ margin: '0 auto 1rem auto' }} />
      <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#ff3366' }}>{title}</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        {message}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-cyber-primary" style={{ background: 'linear-gradient(135deg, #ff3366 0%, #b3003b 100%)' }}>
          <RefreshCw size={16} /> Retry Connection
        </button>
      )}
    </div>
  );
}
