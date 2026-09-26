import React from 'react';
import { Terminal, Clock, Zap, ArrowRight, Play } from 'lucide-react';

export default function LabCard({ labTitle, category, difficulty, time, xp, objectives = [], onStartLab }) {
  return (
    <div className="cyber-card cyber-card-glow-green" style={{
      padding: '2rem',
      background: 'linear-gradient(135deg, rgba(14, 21, 38, 0.95) 0%, rgba(19, 31, 56, 0.95) 100%)',
      borderLeft: '4px solid #00ff66',
      marginBottom: '1.5rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span className="badge badge-green" style={{ marginBottom: '0.35rem' }}>PRACTICE LAB</span>
          <h3 style={{ fontSize: '1.4rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Terminal color="#00ff66" size={22} /> {labTitle}
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span className="badge badge-purple">{difficulty}</span>
          <span className="badge badge-amber">{time}</span>
          <span className="badge badge-green">+{xp} XP</span>
        </div>
      </div>

      {objectives.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.88rem', color: '#00f3ff', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Lab Objectives:
          </h4>
          <ul style={{ paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {objectives.map((obj, idx) => (
              <li key={idx}>{obj}</li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={onStartLab} className="btn-cyber-green" style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}>
        <Play size={18} fill="#050811" /> Start Interactive Lab
      </button>
    </div>
  );
}
