import React from 'react';
import { Clock, Zap, BookOpen } from 'lucide-react';

export default function LessonHeader({ item, category, difficulty }) {
  return (
    <div className="cyber-card" style={{
      marginBottom: '1.5rem',
      background: 'linear-gradient(135deg, rgba(14, 21, 38, 0.95) 0%, rgba(19, 31, 56, 0.95) 100%)',
      borderLeft: '4px solid #00f3ff'
    }}>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
        <span className="badge badge-cyan">{category}</span>
        <span className="badge badge-purple">{difficulty}</span>
        <span className="badge badge-amber" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Clock size={12} /> {item.duration || '15 mins'}
        </span>
        <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Zap size={12} /> +{item.xp || 50} XP
        </span>
      </div>

      <h2 style={{ fontSize: '1.65rem', color: '#ffffff', marginBottom: '0.35rem' }}>
        {item.title}
      </h2>
      {item.summary && (
        <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.5 }}>
          {item.summary}
        </p>
      )}
    </div>
  );
}
