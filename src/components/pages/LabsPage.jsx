import React, { useState, useEffect } from 'react';
import PageHeader from '../layout/PageHeader';
import LabEngine from '../labs/LabEngine';
import LinuxFileHuntLab from '../labs/LinuxFileHuntLab';
import { labsData } from '../../data/labsData';
import { Terminal, Search, ArrowRight, CheckCircle2, Play, Zap } from 'lucide-react';

export default function LabsPage({ solvedLabs = [], onSolveLab }) {
  const [activeLabId, setActiveLabId] = useState(null);

  // Sync hash routing e.g. /#/labs/linux-file-hunt
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('/labs/linux-file-hunt')) {
      setActiveLabId('linux-file-hunt');
    }
  }, []);

  const activeLab = labsData.find(l => l.id === activeLabId);

  if (activeLabId === 'linux-file-hunt') {
    return (
      <LinuxFileHuntLab
        onBack={() => setActiveLabId(null)}
        onCompleteLab={(id) => onSolveLab && onSolveLab(id)}
      />
    );
  }

  if (activeLab) {
    return (
      <LabEngine
        lab={activeLab}
        onBack={() => setActiveLabId(null)}
        onCompleteLab={(id) => onSolveLab && onSolveLab(id)}
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Practical Security Sandboxes & Labs"
        description="All exercises run against 100% isolated educational targets and simulated telemetry."
        badgeText="PRACTICAL LAB ENGINE"
        badgeColor="badge-green"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {labsData.map((lab) => {
          const isPassed = solvedLabs.includes(lab.id);
          return (
            <div key={lab.id} className="cyber-card" style={{ borderLeft: `4px solid ${isPassed ? '#00ff66' : '#00f3ff'}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span className="badge badge-purple">{lab.category}</span>
                  <span className="badge badge-cyan">{lab.difficulty}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Terminal size={20} color="#00ff66" /> {lab.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {lab.overview}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.8rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                  <span>{lab.estimatedTime}</span>
                  <span style={{ color: '#00ff66', fontWeight: 700 }}>+{lab.xp} XP</span>
                </div>

                <button
                  onClick={() => setActiveLabId(lab.id)}
                  className={isPassed ? 'btn-cyber-outline' : 'btn-cyber-green'}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {isPassed ? <><CheckCircle2 size={16} color="#00ff66" /> Revisit Lab</> : <><Play size={16} fill="#050811" /> Launch Lab</>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
