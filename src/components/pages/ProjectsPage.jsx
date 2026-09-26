import React from 'react';
import PageHeader from '../layout/PageHeader';
import { Code, ArrowRight, Terminal, Shield, CheckCircle2 } from 'lucide-react';

export default function ProjectsPage({ onNavigate }) {
  const projects = [
    {
      title: 'Secure Authentication & Session Portal',
      category: 'Web Security',
      difficulty: 'Intermediate',
      desc: 'Build a secure Node.js login API with bcrypt password hashing, HTTP-only JWT cookies, rate limiting, and CSRF token defense.',
      skills: ['Node.js', 'JWT', 'Bcrypt', 'OWASP Top 10']
    },
    {
      title: 'System File Integrity Monitor',
      category: 'Digital Forensics',
      difficulty: 'Beginner',
      desc: 'Develop a CLI utility computing baseline SHA-256 cryptographic hashes for critical system files to detect unauthorized file tampering.',
      skills: ['Python', 'SHA-256', 'CLI', 'Integrity']
    },
    {
      title: 'Network Packet Sniffer & Header Parser',
      category: 'Network Security',
      difficulty: 'Intermediate',
      desc: 'Construct a raw socket packet inspector parsing Ethernet headers, IPv4/v6 fields, TCP/UDP ports, and ICMP echo flags.',
      skills: ['TypeScript', 'Wireshark', 'Sockets', 'TCP/IP']
    },
    {
      title: 'SIEM Threat Analysis Dashboard',
      category: 'Blue Team Defense',
      desc: 'Create a log visualization dashboard processing Apache access logs, detecting brute-force SSH attacks, and alerting on SQLi parameters.',
      skills: ['React', 'SIEM', 'Log Analytics', 'Alerting']
    }
  ];

  return (
    <div>
      <PageHeader
        title="Defensive Security Mini-Projects"
        description="Don't just finish lessons. Build portfolio-ready defensive security tools from scratch."
        badgeText="PORTFOLIO PROJECTS"
        badgeColor="badge-green"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {projects.map((p, idx) => (
          <div key={idx} className="cyber-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-cyan">{p.category}</span>
                <span className="badge badge-purple">{p.difficulty}</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>{p.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>{p.desc}</p>
            </div>

            <div>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {p.skills.map((s, sIdx) => (
                  <span key={sIdx} style={{ background: 'rgba(0, 243, 255, 0.08)', border: '1px solid rgba(0, 243, 255, 0.2)', color: '#00f3ff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                    #{s}
                  </span>
                ))}
              </div>
              <button onClick={() => onNavigate('/playground')} className="btn-cyber-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
                Build Project <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
