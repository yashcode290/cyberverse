import React, { useState } from 'react';
import { HelpCircle, Lock, Unlock, AlertTriangle } from 'lucide-react';

export default function HintPanel({ hints = [], unlockedHints = [], onUnlockHint }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <h4 style={{ fontSize: '0.88rem', color: '#ffd166', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        3-Tier Hint Guidance System:
      </h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {hints.map((h) => {
          const isUnlocked = unlockedHints.includes(h.tier);

          return (
            <div
              key={h.tier}
              style={{
                background: isUnlocked ? 'rgba(255, 209, 102, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                border: isUnlocked ? '1px solid rgba(255, 209, 102, 0.3)' : '1px solid rgba(255, 255, 255, 0.06)',
                padding: '0.75rem',
                borderRadius: '6px',
                fontSize: '0.82rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isUnlocked ? '0.35rem' : 0 }}>
                <span style={{ color: '#ffd166', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {isUnlocked ? <Unlock size={14} /> : <Lock size={14} />} Tier {h.tier} Hint
                </span>

                {!isUnlocked && (
                  <button
                    onClick={() => onUnlockHint(h.tier, h.xpCost)}
                    className="btn-cyber-ghost"
                    style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem' }}
                  >
                    Unlock (-{h.xpCost} XP)
                  </button>
                )}
              </div>

              {isUnlocked && (
                <p style={{ color: '#e2e8f0', lineHeight: 1.4 }}>
                  💡 {h.text}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
