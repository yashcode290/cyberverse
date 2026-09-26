import React, { useState } from 'react';
import PageHeader from '../layout/PageHeader';
import { 
  Compass, CheckCircle2, ArrowRight, Lock, Shield, Cpu, Terminal, 
  Code, Key, Activity, HardDrive, Network, HelpCircle, Layers, Info, Filter 
} from 'lucide-react';

export default function RoadmapPage({ onNavigate }) {
  const [filterDifficulty, setFilterDifficulty] = useState('ALL');

  const roadmapLevels = [
    {
      level: 0,
      title: 'Computer Fundamentals',
      icon: Cpu,
      difficulty: 'Beginner',
      time: '8 Hours',
      theory: '20%',
      practical: '80%',
      labsCount: 3,
      projectsCount: 0,
      status: 'Completed',
      description: 'Master hardware architecture, memory management, bitwise operations, binary/hex notation, and operating system kernels.'
    },
    {
      level: 1,
      title: 'Networking, Linux & Windows Internals',
      icon: Network,
      difficulty: 'Beginner',
      time: '16 Hours',
      theory: '20%',
      practical: '80%',
      labsCount: 5,
      projectsCount: 1,
      status: 'Completed',
      description: 'Learn the OSI 7-Layer model, TCP/IP stack, IP addressing, subnetting, Linux Bash CLI, and Windows Process architecture.'
    },
    {
      level: 2,
      title: 'Programming for Security (Python, JS, Bash)',
      icon: Code,
      difficulty: 'Beginner',
      time: '14 Hours',
      theory: '15%',
      practical: '85%',
      labsCount: 4,
      projectsCount: 1,
      status: 'In Progress',
      description: 'Automate security tasks using Python, parse network sockets, manipulate web DOMs with JavaScript, and write Bash shell scripts.'
    },
    {
      level: 3,
      title: 'Cybersecurity Fundamentals',
      icon: Shield,
      difficulty: 'Beginner',
      time: '10 Hours',
      theory: '30%',
      practical: '70%',
      labsCount: 3,
      projectsCount: 0,
      status: 'Available',
      description: 'Understand the CIA Triad (Confidentiality, Integrity, Availability), AAA framework, threat landscapes, and defense-in-depth.'
    },
    {
      level: 4,
      title: 'Web Application Security & OWASP',
      icon: Lock,
      difficulty: 'Intermediate',
      time: '20 Hours',
      theory: '20%',
      practical: '80%',
      labsCount: 6,
      projectsCount: 1,
      status: 'Available',
      description: 'Master HTTP/HTTPS protocol headers, Cookies, JWTs, SQL Injection, Cross-Site Scripting (XSS), CSRF, IDOR, and SSRF.'
    },
    {
      level: 5,
      title: 'Applied Cryptography & PKI',
      icon: Key,
      difficulty: 'Intermediate',
      time: '12 Hours',
      theory: '25%',
      practical: '75%',
      labsCount: 4,
      projectsCount: 1,
      status: 'Available',
      description: 'Symmetric AES encryption, Asymmetric RSA/ECC key pairs, SHA-256 hashing, TLS/SSL certificates, and Public Key Infrastructure.'
    },
    {
      level: 6,
      title: 'Ethical Hacking & Reconnaissance',
      icon: Terminal,
      difficulty: 'Intermediate',
      time: '18 Hours',
      theory: '20%',
      practical: '80%',
      labsCount: 5,
      projectsCount: 1,
      status: 'Locked',
      description: 'Passive & active reconnaissance, Nmap port scanning strategies, service banner fingerprinting, and vulnerability auditing.'
    },
    {
      level: 7,
      title: 'Blue Team Defense & SIEM Operations',
      icon: Activity,
      difficulty: 'Intermediate',
      time: '20 Hours',
      theory: '20%',
      practical: '80%',
      labsCount: 6,
      projectsCount: 1,
      status: 'Locked',
      description: 'Security logging architecture, stateful firewall rules, IDS/IPS rules, SIEM log analysis, and incident response playbooks.'
    },
    {
      level: 8,
      title: 'Digital Forensics & Incident Investigation',
      icon: HardDrive,
      difficulty: 'Advanced',
      time: '16 Hours',
      theory: '20%',
      practical: '80%',
      labsCount: 4,
      projectsCount: 1,
      status: 'Locked',
      description: 'File metadata analysis, Wireshark PCAP packet forensics, cryptographic hash baselines, and memory artifact analysis.'
    },
    {
      level: 9,
      title: 'Cloud Security & IAM Infrastructure',
      icon: Layers,
      difficulty: 'Advanced',
      time: '14 Hours',
      theory: '20%',
      practical: '80%',
      labsCount: 3,
      projectsCount: 1,
      status: 'Locked',
      description: 'Cloud Identity & Access Management (IAM), S3 bucket security, Virtual Private Cloud (VPC) isolation, and configuration hardening.'
    },
    {
      level: 10,
      title: 'CTF Challenges & Portfolio Security Projects',
      icon: HelpCircle,
      difficulty: 'Advanced',
      time: '25 Hours',
      theory: '10%',
      practical: '90%',
      labsCount: 8,
      projectsCount: 2,
      status: 'Locked',
      description: 'Solve multi-stage CTF flags and build end-to-end portfolio projects: Secure Login API, Integrity Monitor, and SIEM Dashboard.'
    }
  ];

  const filteredLevels = roadmapLevels.filter(lvl => {
    if (filterDifficulty === 'ALL') return true;
    return lvl.difficulty.toUpperCase() === filterDifficulty;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Header */}
      <PageHeader
        title="Interactive Cybersecurity Learning Roadmap"
        description="Progress systematically from Level 0 (Computer Fundamentals) to Level 10 (CTF & Portfolio Projects)."
        badgeText="INTERACTIVE ROADMAP"
        badgeColor="badge-cyan"
        actions={
          <button onClick={() => onNavigate('/paths')} className="btn-cyber-primary">
            Explore Learning Paths <ArrowRight size={16} />
          </button>
        }
      />

      {/* WHY THIS ORDER EDUCATIONAL CALLOUT */}
      <div className="cyber-card cyber-card-glow-cyan" style={{
        background: 'linear-gradient(135deg, rgba(14, 21, 38, 0.95) 0%, rgba(19, 31, 56, 0.95) 100%)',
        borderLeft: '4px solid #00f3ff',
        padding: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#00f3ff', fontWeight: 700 }}>
          <Info size={20} /> Why This Specific Order?
        </div>
        <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6 }}>
          Computer networking, operating systems (Linux/Windows), and programming form the mandatory foundation for cybersecurity. 
          Without understanding how data packets travel across networks or how operating system kernels execute instructions, 
          it is impossible to effectively defend systems, audit vulnerabilities, or conduct digital forensics.
        </p>
      </div>

      {/* DIFFICULTY FILTERS & QUICK PATH CARDS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} color="#64748b" />
          <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>Filter Difficulty:</span>
          {['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map(diff => (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              className={filterDifficulty === diff ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
            >
              {diff}
            </button>
          ))}
        </div>

        <div style={{ fontSize: '0.82rem', color: '#00ff66', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
          {filteredLevels.length} Roadmap Levels Displayed
        </div>
      </div>

      {/* VERTICAL CONNECTED ROADMAP TIMELINE */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1.75rem', paddingLeft: '1rem' }}>
        {/* Vertical Connecting Line */}
        <div style={{
          position: 'absolute',
          left: '28px',
          top: '30px',
          bottom: '30px',
          width: '3px',
          background: 'linear-gradient(to bottom, #00ff66, #00f3ff 50%, rgba(255,255,255,0.1))',
          zIndex: 0
        }} />

        {filteredLevels.map((lvl) => {
          const IconComponent = lvl.icon;

          let statusBadgeClass = 'badge-cyan';
          let statusText = lvl.status;
          let borderAccent = 'rgba(0, 243, 255, 0.3)';

          if (lvl.status === 'Completed') {
            statusBadgeClass = 'badge-green';
            borderAccent = '#00ff66';
          } else if (lvl.status === 'In Progress') {
            statusBadgeClass = 'badge-cyan';
            borderAccent = '#00f3ff';
          } else if (lvl.status === 'Available') {
            statusBadgeClass = 'badge-amber';
            borderAccent = '#ffd166';
          } else if (lvl.status === 'Locked') {
            statusBadgeClass = 'badge-red';
            statusText = 'Locked (Requires Level Prerequisite)';
            borderAccent = 'rgba(255, 255, 255, 0.1)';
          }

          return (
            <div
              key={lvl.level}
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'grid',
                gridTemplateColumns: '40px 1fr',
                gap: '1.25rem',
                alignItems: 'flex-start'
              }}
            >
              {/* Timeline Level Badge Indicator */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: lvl.status === 'Completed' ? '#00ff66' : lvl.status === 'In Progress' ? '#00f3ff' : '#0e1526',
                border: `2px solid ${borderAccent}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem',
                color: lvl.status === 'Completed' || lvl.status === 'In Progress' ? '#070a12' : '#94a3b8',
                boxShadow: lvl.status === 'In Progress' ? '0 0 15px rgba(0, 243, 255, 0.5)' : 'none',
                fontFamily: 'var(--font-mono)'
              }}>
                {lvl.level}
              </div>

              {/* Module Level Content Card */}
              <div
                onClick={() => lvl.status !== 'Locked' && onNavigate('/learn')}
                className="cyber-card"
                style={{
                  cursor: lvl.status === 'Locked' ? 'not-allowed' : 'pointer',
                  borderLeft: `4px solid ${borderAccent}`,
                  opacity: lvl.status === 'Locked' ? 0.75 : 1,
                  padding: '1.75rem'
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{ background: 'rgba(0, 243, 255, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                      <IconComponent size={22} color={lvl.status === 'Completed' ? '#00ff66' : '#00f3ff'} />
                    </div>
                    <div>
                      <span className="badge badge-purple" style={{ fontSize: '0.7rem', marginRight: '0.5rem' }}>
                        LEVEL {lvl.level}
                      </span>
                      <span className={`badge ${statusBadgeClass}`} style={{ fontSize: '0.7rem' }}>
                        {statusText}
                      </span>
                    </div>
                  </div>

                  <span className="badge badge-cyan">{lvl.difficulty}</span>
                </div>

                <h3 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '0.4rem' }}>
                  {lvl.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {lvl.description}
                </p>

                {/* Telemetry Breakdown */}
                <div style={{
                  display: 'flex',
                  gap: '1.5rem',
                  flexWrap: 'wrap',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '1rem',
                  fontSize: '0.8rem',
                  color: '#cbd5e1',
                  fontFamily: 'var(--font-mono)'
                }}>
                  <div><strong style={{ color: '#00f3ff' }}>Estimated Time:</strong> {lvl.time}</div>
                  <div><strong style={{ color: '#00ff66' }}>Structure:</strong> {lvl.theory} Theory / {lvl.practical} Practical</div>
                  <div><strong style={{ color: '#c879ff' }}>Practical Labs:</strong> {lvl.labsCount} Labs</div>
                  <div><strong style={{ color: '#ffd166' }}>Projects:</strong> {lvl.projectsCount} Project</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
