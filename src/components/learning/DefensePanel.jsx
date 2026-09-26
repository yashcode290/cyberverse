import React from 'react';
import { ShieldCheck, AlertTriangle, Code, CheckCircle2 } from 'lucide-react';

export default function DefensePanel({ whatHappened, whyVulnerable, howToFix, fixCode }) {
  return (
    <div className="cyber-card" style={{ padding: '2rem', borderLeft: '4px solid #00f3ff', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: '#00f3ff' }}>
        <ShieldCheck size={24} />
        <h3 style={{ fontSize: '1.35rem', color: '#ffffff' }}>Defensive Security & Remediation</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* 1. What Happened? */}
        <div style={{ background: 'rgba(255, 51, 102, 0.08)', border: '1px solid rgba(255, 51, 102, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
          <h4 style={{ color: '#ff3366', fontSize: '0.95rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <AlertTriangle size={16} /> 1. What Happened?
          </h4>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5 }}>
            {whatHappened}
          </p>
        </div>

        {/* 2. Why Was It Vulnerable? */}
        <div style={{ background: 'rgba(255, 209, 102, 0.08)', border: '1px solid rgba(255, 209, 102, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
          <h4 style={{ color: '#ffd166', fontSize: '0.95rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <AlertTriangle size={16} /> 2. Why Was It Vulnerable?
          </h4>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5 }}>
            {whyVulnerable}
          </p>
        </div>

        {/* 3. How Do You Fix It? */}
        <div style={{ background: 'rgba(0, 255, 102, 0.08)', border: '1px solid rgba(0, 255, 102, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
          <h4 style={{ color: '#00ff66', fontSize: '0.95rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={16} /> 3. How Do You Fix It?
          </h4>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: fixCode ? '0.75rem' : 0 }}>
            {howToFix}
          </p>

          {fixCode && (
            <pre style={{
              background: '#050811',
              border: '1px solid rgba(0, 255, 102, 0.3)',
              padding: '0.85rem',
              borderRadius: '6px',
              color: '#00ff66',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              overflowX: 'auto'
            }}>
              <code>{fixCode}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
