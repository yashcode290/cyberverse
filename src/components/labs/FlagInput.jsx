import React, { useState } from 'react';
import { Key, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function FlagInput({ onSubmitFlag, isSolved }) {
  const [inputVal, setInputVal] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const res = onSubmitFlag(inputVal.trim());
    if (res.success) {
      setStatus({ success: true, msg: 'Correct flag verified! (+100 XP)' });
    } else {
      setStatus({ success: false, msg: 'Incorrect flag format or value. Inspect hints!' });
    }
  };

  return (
    <div style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.25)', padding: '1rem', borderRadius: '8px' }}>
      <h4 style={{ fontSize: '0.85rem', color: '#00f3ff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Key size={16} /> Submit Task Flag:
      </h4>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="CyberVerse{flag_here}"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={isSolved}
          style={{
            background: '#090e1a',
            border: '1px solid rgba(0, 243, 255, 0.3)',
            color: '#00ff66',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            padding: '0.55rem 0.75rem',
            borderRadius: '6px',
            outline: 'none'
          }}
        />

        <button
          type="submit"
          disabled={isSolved}
          className="btn-cyber-primary"
          style={{ padding: '0.55rem', justifyContent: 'center', fontSize: '0.85rem' }}
        >
          Validate Flag <ArrowRight size={16} />
        </button>
      </form>

      {status && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', fontWeight: 600, color: status.success ? '#00ff66' : '#ff3366' }}>
          {status.msg}
        </div>
      )}
    </div>
  );
}
