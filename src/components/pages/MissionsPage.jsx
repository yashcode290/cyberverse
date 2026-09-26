import React from 'react';
import PageHeader from '../layout/PageHeader';
import { Target, ShieldAlert, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

export default function MissionsPage({ onNavigate }) {
  const missions = [
    {
      id: 'm1',
      title: 'Operation Rogue Gateway (ARP Spoofing Mitigation)',
      reward: '250 XP',
      difficulty: 'Intermediate',
      target: 'Simulated Local Ethernet Subnet',
      objective: 'Detect gratuitous ARP replies, trace the malicious MAC address, and generate static ARP inspection table rules.',
      status: 'Available'
    },
    {
      id: 'm2',
      title: 'Operation Plaintext Leak (HTTP Auth Forensics)',
      reward: '200 XP',
      difficulty: 'Easy',
      target: 'Captured PCAP Stream #104',
      objective: 'Inspect raw HTTP POST payloads, extract unencrypted session cookies, and enforce TLS HTTPS certificate redirect.',
      status: 'Available'
    },
    {
      id: 'm3',
      title: 'Operation Port Recon (Nmap Service Audit)',
      reward: '300 XP',
      difficulty: 'Intermediate',
      target: '192.168.1.50 Target Host',
      objective: 'Execute SYN stealth scan, fingerprint vulnerable Apache/MySQL versions, and patch exposed ports.',
      status: 'Available'
    }
  ];

  return (
    <div>
      <PageHeader
        title="Guided Security Operations Missions"
        description="Scenario-driven incident response and defensive security missions."
        badgeText="DEFENSIVE MISSIONS"
        badgeColor="badge-purple"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {missions.map((m) => (
          <div key={m.id} className="cyber-card cyber-card-glow-cyan" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', padding: '1.75rem' }}>
            <div style={{ maxWidth: '750px' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="badge badge-purple">{m.difficulty}</span>
                <span className="badge badge-green">Reward: {m.reward}</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.4rem', color: '#ffffff' }}>{m.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                {m.objective}
              </p>
              <div style={{ fontSize: '0.8rem', color: '#00f3ff', fontFamily: 'var(--font-mono)' }}>
                Target: {m.target}
              </div>
            </div>

            <button onClick={() => onNavigate('/labs')} className="btn-cyber-primary" style={{ padding: '0.75rem 1.35rem' }}>
              Start Mission <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
