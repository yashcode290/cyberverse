import React from 'react';
import { BookOpen, Terminal, HelpCircle, Code, Award, CheckCircle2, ChevronRight, Lock } from 'lucide-react';

export default function LessonSidebar({ module, activeItemIndex, onSelectItem, completedItems = [] }) {
  const typeIcons = {
    theory: BookOpen,
    interactive: BookOpen,
    lab: Terminal,
    challenge: HelpCircle,
    project: Code,
    quiz: Award
  };

  return (
    <div className="cyber-card" style={{ padding: '1rem', background: '#090e1a' }}>
      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.85rem', marginBottom: '1rem' }}>
        <span className="badge badge-purple" style={{ marginBottom: '0.35rem' }}>{module.category}</span>
        <h3 style={{ fontSize: '1.1rem', color: '#ffffff', lineHeight: 1.3 }}>{module.title}</h3>
        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.35rem', fontFamily: 'var(--font-mono)' }}>
          {module.difficulty} • {module.estimatedTime}
        </div>
      </div>

      {/* Module Tree Outline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {module.items.map((item, idx) => {
          const Icon = typeIcons[item.type] || BookOpen;
          const isActive = idx === activeItemIndex;
          const isCompleted = completedItems.includes(item.id);

          return (
            <button
              key={item.id}
              onClick={() => onSelectItem(idx)}
              style={{
                background: isActive ? 'rgba(0, 243, 255, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                color: isActive ? '#00f3ff' : isCompleted ? '#00ff66' : '#cbd5e1',
                border: isActive ? '1px solid rgba(0, 243, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
                padding: '0.65rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Icon size={16} color={isActive ? '#00f3ff' : isCompleted ? '#00ff66' : '#64748b'} />
                <span>{item.title}</span>
              </div>

              {isCompleted ? (
                <CheckCircle2 size={16} color="#00ff66" />
              ) : isActive ? (
                <ChevronRight size={16} color="#00f3ff" />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
