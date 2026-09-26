import React from 'react';
import PageHeader from '../layout/PageHeader';
import { Users, MessageSquare, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function CommunityPage() {
  const discussions = [
    { author: 'Alex Explorer', role: 'Student', topic: 'How to decode Base64 in CTF Flag Challenge 3?', replies: 4, tag: 'Cryptography' },
    { author: 'SOC Analyst Pro', role: 'Mentor', topic: 'Tips for analyzing SSH brute-force logs in SIEM Analyzer', replies: 8, tag: 'Blue Team' },
    { author: 'Elena Cyber', role: 'Student', topic: 'Understanding TCP 3-Way Handshake SYN-ACK flags', replies: 6, tag: 'Networking' }
  ];

  return (
    <div>
      <PageHeader
        title="CyberVerse Student Study Community"
        description="Collaborate with fellow students, ask questions, share CTF writeups, and discuss practical labs."
        badgeText="STUDENT COMMUNITY"
        badgeColor="badge-green"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
        {discussions.map((d, idx) => (
          <div key={idx} className="cyber-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <span className="badge badge-cyan">{d.tag}</span>
                <span className="badge badge-purple">{d.role}</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.2rem' }}>{d.topic}</h3>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Posted by {d.author}</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00ff66', fontWeight: 600, fontSize: '0.85rem' }}>
              <MessageSquare size={16} /> {d.replies} Replies
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
