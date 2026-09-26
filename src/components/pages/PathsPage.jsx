import React, { useState } from 'react';
import PageHeader from '../layout/PageHeader';
import { Layers, ArrowRight, Cpu, Lock, Terminal, Shield, HardDrive, Network, X, BookOpen, CheckCircle2, Play } from 'lucide-react';

export default function PathsPage({ onNavigate }) {
  const [activePathModal, setActivePathModal] = useState(null);

  const paths = [
    {
      id: 'foundations',
      title: 'Computer & OS Foundations',
      icon: Cpu,
      modules: 12,
      diff: 'Beginner',
      badge: 'badge-cyan',
      desc: 'Master Computer Architecture, Linux Kernel Commands, Windows System Internals, and TCP/IP Fundamentals.',
      curriculum: [
        { title: 'Module 1: Binary, Hexadecimal & Operating System Internals', time: '45 mins' },
        { title: 'Module 2: Linux CLI Navigation, File Permissions & Grep', time: '60 mins' },
        { title: 'Module 3: TCP/IP Stack, Subnetting & Port Mechanics', time: '50 mins' },
        { title: 'Module 4: Process Management & Administrative Telemetry', time: '40 mins' }
      ],
      skills: ['Linux Shell', 'File Permissions', 'TCP/IP', 'Sysinternals']
    },
    {
      id: 'web-sec',
      title: 'Web Application Security',
      icon: Lock,
      modules: 16,
      diff: 'Intermediate',
      badge: 'badge-green',
      desc: 'Learn HTTP/S mechanics, OWASP Top 10 vulnerabilities, SQL Injection parameterization, and XSS sanitization.',
      curriculum: [
        { title: 'Module 1: HTTP Request/Response Headers, Cookies & Sessions', time: '40 mins' },
        { title: 'Module 2: SQL Injection Logic Bypass & Parameterized Queries', time: '60 mins' },
        { title: 'Module 3: Reflected & Stored Cross-Site Scripting (XSS)', time: '55 mins' },
        { title: 'Module 4: Insecure Direct Object References (IDOR) & CSRF', time: '50 mins' }
      ],
      skills: ['OWASP Top 10', 'SQLi Defense', 'DOM Sanitization', 'JWT Security']
    },
    {
      id: 'ethical-hacking',
      title: 'Ethical Hacking & Reconnaissance',
      icon: Terminal,
      modules: 14,
      diff: 'Intermediate',
      badge: 'badge-purple',
      desc: 'Discover Nmap host scanning, service version auditing, passive DNS reconnaissance, and vulnerability scripts.',
      curriculum: [
        { title: 'Module 1: Passive OSINT Reconnaissance & DNS Footprinting', time: '45 mins' },
        { title: 'Module 2: Active Nmap Port Scanning & Service Fingerprinting', time: '60 mins' },
        { title: 'Module 3: Vulnerability Scanning & Exploit Verification', time: '65 mins' },
        { title: 'Module 4: Defensive Remediation & Hardening Reports', time: '40 mins' }
      ],
      skills: ['OSINT Recon', 'Nmap SYN Scan', 'Service Auditing', 'Vulnerability Assessment']
    },
    {
      id: 'blue-team',
      title: 'Blue Team & SIEM Monitoring',
      icon: Shield,
      modules: 15,
      diff: 'Intermediate',
      badge: 'badge-amber',
      desc: 'Configure firewall rules, inspect Apache/Auth access logs, detect SYN flood anomalies, and investigate threats.',
      curriculum: [
        { title: 'Module 1: Security Logging Architecture & Log Parsers', time: '50 mins' },
        { title: 'Module 2: Apache & SSH Brute-Force Log Forensics', time: '60 mins' },
        { title: 'Module 3: IDS/IPS Rule Signatures & Firewall Policies', time: '55 mins' },
        { title: 'Module 4: Incident Response & Threat Hunting Workflows', time: '45 mins' }
      ],
      skills: ['SIEM Log Analytics', 'Firewall Rules', 'Incident Response', 'Threat Hunting']
    },
    {
      id: 'forensics',
      title: 'Digital Forensics & PCAP Analysis',
      icon: HardDrive,
      modules: 10,
      diff: 'Advanced',
      badge: 'badge-cyan',
      desc: 'Analyze raw PCAP packet streams, inspect cryptographic hash integrity, and investigate system memory images.',
      curriculum: [
        { title: 'Module 1: Wireshark Packet Inspection & Display Filters', time: '50 mins' },
        { title: 'Module 2: Plaintext HTTP Payload & Credentials Extraction', time: '45 mins' },
        { title: 'Module 3: Cryptographic Hash Verification (MD5/SHA-256)', time: '40 mins' },
        { title: 'Module 4: Disk & Memory Forensics Timeline Analysis', time: '60 mins' }
      ],
      skills: ['Wireshark PCAP', 'Packet Forensics', 'Hash Verification', 'Timeline Analysis']
    },
    {
      id: 'cloud-sec',
      title: 'Cloud Infrastructure Security',
      icon: Network,
      modules: 8,
      diff: 'Advanced',
      badge: 'badge-purple',
      desc: 'Harden S3 bucket permissions, configure AWS/GCP IAM roles, and secure isolated virtual private networks.',
      curriculum: [
        { title: 'Module 1: Cloud IAM Roles & Least-Privilege Policies', time: '45 mins' },
        { title: 'Module 2: Public Bucket Exposure & Access Control Auditing', time: '50 mins' },
        { title: 'Module 3: Isolated VPC Virtual Networks & Security Groups', time: '55 mins' },
        { title: 'Module 4: Cloud Telemetry & Automated Configuration Compliance', time: '40 mins' }
      ],
      skills: ['Cloud IAM', 'S3 Security', 'VPC Isolation', 'Compliance Auditing']
    }
  ];

  return (
    <div>
      <PageHeader
        title="Interactive Learning Paths Curriculum"
        description="Structured, practical-first specializations. Click any path to view syllabus modules and launch lessons."
        badgeText="CURRICULUM"
        badgeColor="badge-green"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {paths.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.id} className="cyber-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setActivePathModal(p)}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ background: 'rgba(0, 243, 255, 0.1)', padding: '0.65rem', borderRadius: '10px' }}>
                    <Icon size={24} color="#00f3ff" />
                  </div>
                  <span className={`badge ${p.badge}`}>{p.diff}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>{p.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>{p.desc}</p>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>{p.modules} Modules</span>
                <button
                  onClick={(e) => { e.stopPropagation(); setActivePathModal(p); }}
                  className="btn-cyber-primary"
                  style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
                >
                  Explore Path <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Path Syllabus Modal */}
      {activePathModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 8, 17, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem'
        }}>
          <div className="cyber-card" style={{ maxWidth: '680px', width: '100%', padding: '2rem', background: '#0e1526', border: '1px solid rgba(0, 243, 255, 0.3)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.75rem' }}>
              <div>
                <span className={`badge ${activePathModal.badge}`} style={{ marginBottom: '0.35rem' }}>{activePathModal.diff} Specialization</span>
                <h3 style={{ fontSize: '1.4rem', color: '#ffffff', fontWeight: 800 }}>{activePathModal.title}</h3>
              </div>
              <button onClick={() => setActivePathModal(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.25rem' }}>
                <X size={24} />
              </button>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {activePathModal.desc}
            </p>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {activePathModal.skills.map((s, idx) => (
                <span key={idx} className="badge badge-cyan">✓ {s}</span>
              ))}
            </div>

            <div style={{ fontSize: '0.85rem', color: '#00ff66', fontWeight: 700, fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
              [+] CURRICULUM SYLLABUS MODULES ({activePathModal.modules} Total Lessons):
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
              {activePathModal.curriculum.map((m, idx) => (
                <div key={idx} style={{ background: '#050811', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '0.75rem 1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BookOpen size={16} color="#00f3ff" /> {m.title}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>{m.time}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'flex-end', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}>
              <button
                onClick={() => { setActivePathModal(null); if (onNavigate) onNavigate('/learn'); }}
                className="btn-cyber-green"
                style={{ padding: '0.65rem 1.25rem' }}
              >
                <Play size={16} fill="#050811" /> Enroll & Start Module 1
              </button>
              <button
                onClick={() => setActivePathModal(null)}
                className="btn-cyber-ghost"
                style={{ padding: '0.65rem 1.25rem' }}
              >
                Close Syllabus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
