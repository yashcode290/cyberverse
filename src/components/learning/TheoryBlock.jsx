import React from 'react';
import { BookOpen, Info, CheckCircle2 } from 'lucide-react';

export default function TheoryBlock({ content, takeaways = [] }) {
  return (
    <div className="cyber-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Formatted Paragraphs */}
      <div style={{ lineHeight: '1.7', color: '#e2e8f0', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} style={{
                fontSize: '1.25rem',
                color: '#00f3ff',
                marginTop: '0.75rem',
                borderLeft: '3px solid #00f3ff',
                paddingLeft: '0.65rem'
              }}>
                {paragraph.replace('### ', '')}
              </h3>
            );
          }

          if (paragraph.startsWith('```')) {
            const codeLines = paragraph.replace(/```\w*/g, '').trim();
            return (
              <pre key={idx} style={{
                background: '#050811',
                border: '1px solid rgba(0, 243, 255, 0.2)',
                padding: '1rem',
                borderRadius: '8px',
                color: '#00ff66',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                overflowX: 'auto'
              }}>
                <code>{codeLines}</code>
              </pre>
            );
          }

          return <p key={idx}>{paragraph}</p>;
        })}
      </div>

      {/* Key Takeaways Callout Box */}
      {takeaways.length > 0 && (
        <div style={{
          background: 'rgba(0, 255, 102, 0.06)',
          border: '1px solid rgba(0, 255, 102, 0.25)',
          borderRadius: '10px',
          padding: '1.25rem',
          marginTop: '1rem'
        }}>
          <h4 style={{ color: '#00ff66', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1rem' }}>
            <CheckCircle2 size={18} /> Core Concept Key Takeaways
          </h4>
          <ul style={{ paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {takeaways.map((t, tIdx) => (
              <li key={tIdx}>{t}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
