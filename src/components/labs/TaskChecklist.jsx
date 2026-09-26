import React from 'react';
import { CheckCircle2, Circle, ArrowRight, Terminal } from 'lucide-react';

export default function TaskChecklist({ tasks, onToggleTask }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h4 style={{ fontSize: '0.9rem', color: '#00f3ff', marginBottom: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Terminal size={18} /> Step-by-Step Lab Tasks:
      </h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {tasks.map((task, idx) => {
          const stepNum = idx + 1;
          return (
            <div
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              style={{
                background: task.completed ? 'rgba(0, 255, 102, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: task.completed ? '1px solid rgba(0, 255, 102, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {/* Header Step Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span className={task.completed ? 'badge badge-green' : 'badge badge-cyan'} style={{ fontSize: '0.7rem' }}>
                  STEP {stepNum}
                </span>

                {task.completed ? (
                  <span style={{ color: '#00ff66', fontWeight: 700, fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <CheckCircle2 size={16} /> Completed
                  </span>
                ) : (
                  <span style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Circle size={14} /> Pending
                  </span>
                )}
              </div>

              {/* Task Text */}
              <div style={{ color: task.completed ? '#00ff66' : '#ffffff', fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                {task.text}
              </div>

              {/* Action Hint / Command Guide */}
              {task.actionGuide && (
                <div style={{ fontSize: '0.78rem', color: task.completed ? '#94a3b8' : '#00f3ff', fontFamily: 'var(--font-mono)', background: '#050811', padding: '0.35rem 0.6rem', borderRadius: '4px', marginTop: '0.35rem' }}>
                  💡 {task.actionGuide}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
