import React from 'react';

export default function PageHeader({ title, description, badgeText, badgeColor = 'badge-cyan', actions }) {
  return (
    <div className="cyber-card" style={{
      marginBottom: '1.75rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      background: 'linear-gradient(135deg, rgba(14, 21, 38, 0.95) 0%, rgba(19, 31, 56, 0.95) 100%)',
      borderLeft: '4px solid #00f3ff'
    }}>
      <div>
        {badgeText && (
          <span className={`badge ${badgeColor}`} style={{ marginBottom: '0.4rem' }}>
            {badgeText}
          </span>
        )}
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>
          {title}
        </h1>
        {description && (
          <p style={{ color: '#94a3b8', fontSize: '0.92rem', maxWidth: '700px', lineHeight: 1.5 }}>
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {actions}
        </div>
      )}
    </div>
  );
}
