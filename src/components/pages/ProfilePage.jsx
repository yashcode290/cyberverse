import React from 'react';
import PageHeader from '../layout/PageHeader';
import { User, Award, Shield, Flame, CheckCircle2, Printer } from 'lucide-react';

export default function ProfilePage({ userXP, userStreak, onOpenCertificate }) {
  const level = Math.floor(userXP / 200) + 1;

  const badges = [
    { name: 'Packet Forensics Specialist', icon: Shield, desc: 'Solved Wireshark PCAP inspection labs' },
    { name: 'Nmap Stealth Scanner', icon: Flame, desc: 'Executed SYN scans in simulated Linux bash terminal' },
    { name: 'Network Foundations Certified', icon: Award, desc: 'Mastered OSI 7-Layer and TCP/IP protocol stack' }
  ];

  return (
    <div>
      <PageHeader
        title="Student Profile & Achievements"
        description="Your verified practical cybersecurity progress, badges earned, and downloadable certificate."
        badgeText="STUDENT PROFILE"
        badgeColor="badge-cyan"
        actions={
          <button onClick={onOpenCertificate} className="btn-cyber-primary">
            <Award size={18} /> View Academic Certificate
          </button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem' }}>
        {/* Profile Card */}
        <div className="cyber-card cyber-card-glow-cyan" style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #00f3ff, #9d4edd)',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto',
            fontSize: '2rem',
            fontWeight: 800,
            color: '#070a12'
          }}>
            CD
          </div>
          <h2 style={{ fontSize: '1.4rem', color: '#ffffff' }}>Cyber Defender</h2>
          <p style={{ color: '#00f3ff', fontSize: '0.85rem', fontWeight: 600, marginTop: '0.2rem' }}>
            Level {level} Student Engineer
          </p>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', marginTop: '1.5rem', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-around' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#00ff66', fontFamily: 'var(--font-mono)' }}>{userXP}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>TOTAL XP</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ff9d00', fontFamily: 'var(--font-mono)' }}>{userStreak}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>DAY STREAK</div>
            </div>
          </div>
        </div>

        {/* Badges Gallery */}
        <div className="cyber-card">
          <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '1.25rem' }}>
            Earned Achievements & Badges
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {badges.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div key={idx} style={{ background: 'rgba(0, 243, 255, 0.06)', border: '1px solid rgba(0, 243, 255, 0.2)', padding: '1rem', borderRadius: '10px' }}>
                  <Icon size={24} color="#00f3ff" style={{ marginBottom: '0.5rem' }} />
                  <h4 style={{ fontSize: '0.95rem', color: '#ffffff', marginBottom: '0.25rem' }}>{b.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
