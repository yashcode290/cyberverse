import React from 'react';
import { Award, CheckCircle2, ArrowRight, Zap, Clock, ShieldCheck } from 'lucide-react';

export default function CompletionModal({ isOpen, lab, xpEarned, timeSpent, skills = [], onNextLab, onClose }) {
  if (!isOpen || !lab) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(5, 8, 17, 0.88)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1.5rem'
    }}>
      <div className="cyber-card cyber-card-glow-green" style={{
        maxWidth: '560px',
        width: '100%',
        padding: '2.5rem',
        textAlign: 'center',
        background: '#0a0f1d'
      }}>
        <Award size={54} color="#00ff66" style={{ margin: '0 auto 1rem auto' }} />

        <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>LAB COMPLETED!</span>
        <h2 style={{ fontSize: '1.85rem', color: '#ffffff', marginBottom: '0.35rem' }}>
          {lab.title}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Outstanding work! You successfully completed all lab tasks and validated the target flag.
        </p>

        {/* Telemetry Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          background: 'rgba(0, 255, 102, 0.08)',
          border: '1px solid rgba(0, 255, 102, 0.25)',
          padding: '1.25rem',
          borderRadius: '10px',
          marginBottom: '1.5rem'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>EARNED XP</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#00ff66', fontFamily: 'var(--font-mono)' }}>
              +{xpEarned} XP
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>TIME SPENT</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#00f3ff', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
              {timeSpent}
            </div>
          </div>
        </div>

        {/* Skills Learned */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <div style={{ fontSize: '0.8rem', color: '#00f3ff', fontWeight: 700, marginBottom: '0.4rem' }}>
              SKILLS LEARNED:
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {skills.map((s, idx) => (
                <span key={idx} className="badge badge-purple">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={onNextLab} className="btn-cyber-green" style={{ padding: '0.75rem 1.5rem' }}>
            Next Recommended Lab <ArrowRight size={18} />
          </button>
          <button onClick={onClose} className="btn-cyber-ghost">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
