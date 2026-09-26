import React from 'react';
import { Terminal, Clock, Zap, ArrowLeft } from 'lucide-react';

export default function LabHeader({ lab, completedTasksCount, totalTasksCount, onBack }) {
  const percent = Math.round((completedTasksCount / totalTasksCount) * 100);

  return (
    <div className="cyber-card" style={{
      marginBottom: '1.25rem',
      background: 'linear-gradient(135deg, rgba(14, 21, 38, 0.95) 0%, rgba(19, 31, 56, 0.95) 100%)',
      borderLeft: '4px solid #00ff66',
      padding: '1.25rem 1.5rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            className="btn-cyber-ghost"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
          >
            <ArrowLeft size={16} /> Exit Lab
          </button>
          <div>
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <span className="badge badge-green">PRACTICE LAB</span>
              <span className="badge badge-purple">{lab.category}</span>
              <span className="badge badge-cyan">{lab.difficulty}</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', color: '#ffffff' }}>{lab.title}</h2>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>PROGRESS</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#00ff66', fontFamily: 'var(--font-mono)' }}>
              {completedTasksCount} / {totalTasksCount} ({percent}%)
            </div>
          </div>

          <span className="badge badge-amber" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
            +{lab.xp} XP
          </span>
        </div>
      </div>
    </div>
  );
}
