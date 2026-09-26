import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, Key, AlertTriangle, ArrowRight, Award } from 'lucide-react';

export default function CtfPlatform({ onAddXP }) {
  const [solvedChallenges, setSolvedChallenges] = useState([]);
  const [flagInputs, setFlagInputs] = useState({});
  const [feedback, setFeedback] = useState({});
  const [hintsVisible, setHintsVisible] = useState({});

  const challenges = [
    {
      id: 'ctf-1',
      title: 'Plaintext Password Hunter',
      category: 'Packet Forensics',
      points: 100,
      flag: 'CyberVerse{SuperSecret2026!}',
      desc: 'Inspect Frame 4 of the unencrypted HTTP login POST stream to uncover the cleartext password flag.',
      hint: 'Look for `password=` in the raw HTTP Form payload stream.'
    },
    {
      id: 'ctf-2',
      title: 'Rogue Gateway MAC Inspector',
      category: 'Network Security',
      points: 100,
      flag: 'CyberVerse{00:c0:ca:99:88:77}',
      desc: 'Analyze gratuitous ARP replies on the ethernet segment to identify the MAC address of the MITM node.',
      hint: 'Check Frame 3 for unsolicited gratuitous ARP replies.'
    },
    {
      id: 'ctf-3',
      title: 'DNS Tunneling Base64 Secret',
      category: 'Cryptography',
      points: 150,
      flag: 'CyberVerse{CTF_NET_PROT_2026}',
      desc: 'Decode the base64 query prefix hidden in Frame 2 DNS TXT records (`Q0ZGX05FVF9QUk9UXzIwMjY=`).',
      hint: 'Decode base64 string `Q0ZGX05FVF9QUk9UXzIwMjY=`.'
    }
  ];

  const handleFlagSubmit = (challenge) => {
    const userVal = (flagInputs[challenge.id] || '').trim();
    if (!userVal) return;

    if (userVal.toLowerCase() === challenge.flag.toLowerCase()) {
      if (!solvedChallenges.includes(challenge.id)) {
        setSolvedChallenges([...solvedChallenges, challenge.id]);
        onAddXP(challenge.points);
      }
      setFeedback({ ...feedback, [challenge.id]: { success: true, msg: `Correct! Flag validated (+${challenge.points} XP)` } });
    } else {
      setFeedback({ ...feedback, [challenge.id]: { success: false, msg: 'Incorrect flag format. Double check hints!' } });
    }
  };

  const toggleHint = (id) => {
    setHintsVisible({ ...hintsVisible, [id]: !hintsVisible[id] });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {challenges.map((c) => {
        const isSolved = solvedChallenges.includes(c.id);
        const fb = feedback[c.id];

        return (
          <div key={c.id} className="cyber-card" style={{ borderLeft: `4px solid ${isSolved ? '#00ff66' : '#00f3ff'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span className="badge badge-purple" style={{ marginBottom: '0.35rem' }}>{c.category}</span>
                <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>{c.title}</h3>
              </div>
              <span className="badge badge-green">+{c.points} XP</span>
            </div>

            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.5 }}>
              {c.desc}
            </p>

            {/* Hint Box */}
            {hintsVisible[c.id] && (
              <div style={{ background: 'rgba(255, 209, 102, 0.1)', border: '1px solid rgba(255, 209, 102, 0.3)', padding: '0.65rem 0.85rem', borderRadius: '6px', fontSize: '0.82rem', color: '#ffd166', marginBottom: '1rem' }}>
                💡 <strong>Hint:</strong> {c.hint}
              </div>
            )}

            {/* Input & Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="CyberVerse{flag_here}"
                value={flagInputs[c.id] || ''}
                onChange={(e) => setFlagInputs({ ...flagInputs, [c.id]: e.target.value })}
                disabled={isSolved}
                style={{
                  background: '#050811',
                  border: '1px solid rgba(0, 243, 255, 0.3)',
                  color: '#00ff66',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  padding: '0.55rem 0.85rem',
                  borderRadius: '6px',
                  minWidth: '280px',
                  outline: 'none'
                }}
              />

              <button
                onClick={() => handleFlagSubmit(c)}
                disabled={isSolved}
                className="btn-cyber-primary"
                style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
              >
                Submit Flag
              </button>

              <button
                onClick={() => toggleHint(c.id)}
                className="btn-cyber-ghost"
                style={{ fontSize: '0.8rem', padding: '0.55rem 0.85rem' }}
              >
                {hintsVisible[c.id] ? 'Hide Hint' : 'Show Hint'}
              </button>
            </div>

            {fb && (
              <div style={{ marginTop: '0.85rem', fontSize: '0.85rem', fontWeight: 600, color: fb.success ? '#00ff66' : '#ff3366' }}>
                {fb.msg}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
