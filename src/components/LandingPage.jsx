import React, { useState } from 'react';
import { 
  Shield, Terminal, Search, ArrowRight, CheckCircle2, BookOpen, Layers, 
  Code, Cpu, Lock, AlertTriangle, Users, Key, Activity, 
  Menu, X, ExternalLink, HardDrive, Network
} from 'lucide-react';

export default function LandingPage({ onNavigate, onLogin, onGetStarted }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNav = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else if (path === '/login' && onLogin) {
      onLogin();
    } else if (path === '/signup' && onGetStarted) {
      onGetStarted();
    }
  };

  const learningPaths = [
    {
      id: 'foundations',
      title: 'Foundations',
      icon: Cpu,
      description: 'Master Computer Fundamentals, Networking, Linux shell, Windows internals, and core programming.',
      modules: 12,
      difficulty: 'Beginner',
      badge: 'badge-cyan'
    },
    {
      id: 'web-sec',
      title: 'Web Security',
      icon: Lock,
      description: 'Understand HTTP, Cookies, JWTs, SQL Injection, XSS, CSRF, IDOR, and secure web architectures.',
      modules: 16,
      difficulty: 'Intermediate',
      badge: 'badge-green'
    },
    {
      id: 'ethical-hacking',
      title: 'Ethical Hacking',
      icon: Terminal,
      description: 'Learn Reconnaissance, Nmap Scanning, Enumeration, Vulnerability Assessment, and Exploitation principles.',
      modules: 14,
      difficulty: 'Intermediate',
      badge: 'badge-purple'
    },
    {
      id: 'blue-team',
      title: 'Blue Team Defense',
      icon: Shield,
      description: 'Master Security Logging, Firewalls, IDS/IPS, SIEM log monitoring, Incident Response, and Threat Hunting.',
      modules: 15,
      difficulty: 'Intermediate',
      badge: 'badge-amber'
    },
    {
      id: 'forensics',
      title: 'Digital Forensics',
      icon: HardDrive,
      description: 'Investigate File Metadata, Cryptographic Hashing, Timeline Analysis, and PCAP Packet Forensics.',
      modules: 10,
      difficulty: 'Advanced',
      badge: 'badge-cyan'
    },
    {
      id: 'cloud-sec',
      title: 'Cloud Security',
      icon: Network,
      description: 'Explore Cloud IAM, S3 Bucket Security, Isolated Virtual Networks, and Configuration Hardening.',
      modules: 8,
      difficulty: 'Advanced',
      badge: 'badge-purple'
    }
  ];

  const practicalLabs = [
    {
      id: 'linux-terminal',
      title: 'Linux Bash Terminal',
      icon: Terminal,
      category: 'System Administration',
      description: 'Simulated interactive Linux environment. Execute real bash commands, inspect permissions, and navigate target file trees.',
      target: 'Isolated Linux Sandbox'
    },
    {
      id: 'wireshark-lab',
      title: 'Network Wireshark Lab',
      icon: Search,
      category: 'Traffic Analysis',
      description: 'Inspect live PCAP frame streams, analyze TCP 3-way handshakes, and find unencrypted HTTP credentials.',
      target: 'Captured PCAP Forensics'
    },
    {
      id: 'sqli-sandbox',
      title: 'SQL Injection Sandbox',
      icon: Code,
      category: 'Web Security',
      description: 'Demonstrate vulnerable SQL string concatenations vs safe parameterized queries in a mock login system.',
      target: 'Simulated Web App'
    },
    {
      id: 'xss-lab',
      title: 'XSS Payload Playground',
      icon: AlertTriangle,
      category: 'Web Security',
      description: 'Test DOM & Reflected Cross-Site Scripting payloads safely and observe HTML entity escaping sanitization.',
      target: 'Isolated DOM Sandbox'
    },
    {
      id: 'crypto-lab',
      title: 'Cryptography Cracker',
      icon: Key,
      category: 'Security Math',
      description: 'Interactive Caesar, Base64, MD5, and SHA-256 hash encoder/decoder with brute-force challenge solver.',
      target: 'Local Crypto Engine'
    },
    {
      id: 'log-analysis',
      title: 'SIEM Log Analyzer',
      icon: Activity,
      category: 'Blue Team Defense',
      description: 'Parse Apache & Auth logs to spot brute-force SSH attacks, SQLi indicators, and unauthorized access.',
      target: 'Mock Telemetry Stream'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
      {/* 1. NAVIGATION BAR */}
      <header style={{
        background: 'rgba(7, 10, 18, 0.95)',
        borderBottom: '1px solid rgba(0, 243, 255, 0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(16px)'
      }}>
        <div style={{
          maxWidth: '1350px',
          margin: '0 auto',
          padding: '0.9rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          {/* Logo */}
          <div 
            onClick={() => handleNav('/')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #00f3ff 0%, #00ff66 100%)',
              padding: '0.5rem',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0, 243, 255, 0.4)'
            }}>
              <Shield size={24} color="#070a12" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>
                Cyber<span style={{ color: '#00f3ff' }}>Verse</span>
              </h1>
              <p style={{ fontSize: '0.68rem', color: '#00ff66', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                LEARN • PRACTICE • BUILD • DEFEND
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="desktop-only" style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <button onClick={() => handleNav('/')} style={{ background: 'transparent', border: 'none', color: '#ffffff', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Home</button>
            <button onClick={() => handleNav('/learn')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer' }}>Learn</button>
            <button onClick={() => handleNav('/labs')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer' }}>Labs</button>
            <button onClick={() => handleNav('/challenges')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer' }}>Challenges</button>
            <button onClick={() => handleNav('/projects')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer' }}>Projects</button>
            <button onClick={() => handleNav('/resources')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer' }}>Resources</button>
          </nav>

          {/* Right Action Bar & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div className="desktop-only" style={{ display: 'flex', gap: '0.85rem' }}>
              <button onClick={() => handleNav('/login')} className="btn-cyber-ghost" style={{ fontSize: '0.85rem' }}>
                Login
              </button>
              <button onClick={() => handleNav('/signup')} className="btn-cyber-green" style={{ fontSize: '0.85rem', padding: '0.5rem 1.1rem' }}>
                Get Started
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-cyber-ghost mobile-only"
              style={{ padding: '0.45rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} color="#ff3366" /> : <Menu size={24} color="#00f3ff" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer for Landing Page */}
        {mobileMenuOpen && (
          <div style={{
            background: '#090e1a',
            borderBottom: '1px solid rgba(0, 243, 255, 0.3)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }} className="mobile-only">
            <button onClick={() => { handleNav('/'); setMobileMenuOpen(false); }} style={{ background: 'transparent', border: 'none', color: '#00f3ff', fontWeight: 700, textAlign: 'left', fontSize: '1rem', cursor: 'pointer' }}>🏠 Home</button>
            <button onClick={() => { handleNav('/learn'); setMobileMenuOpen(false); }} style={{ background: 'transparent', border: 'none', color: '#cbd5e1', fontWeight: 600, textAlign: 'left', fontSize: '0.95rem', cursor: 'pointer' }}>📚 Learn Modules</button>
            <button onClick={() => { handleNav('/labs'); setMobileMenuOpen(false); }} style={{ background: 'transparent', border: 'none', color: '#cbd5e1', fontWeight: 600, textAlign: 'left', fontSize: '0.95rem', cursor: 'pointer' }}>💻 Practical Labs</button>
            <button onClick={() => { handleNav('/challenges'); setMobileMenuOpen(false); }} style={{ background: 'transparent', border: 'none', color: '#cbd5e1', fontWeight: 600, textAlign: 'left', fontSize: '0.95rem', cursor: 'pointer' }}>🚩 CTF Challenges</button>
            <button onClick={() => { handleNav('/projects'); setMobileMenuOpen(false); }} style={{ background: 'transparent', border: 'none', color: '#cbd5e1', fontWeight: 600, textAlign: 'left', fontSize: '0.95rem', cursor: 'pointer' }}>🛠️ Security Projects</button>
            <button onClick={() => { handleNav('/resources'); setMobileMenuOpen(false); }} style={{ background: 'transparent', border: 'none', color: '#cbd5e1', fontWeight: 600, textAlign: 'left', fontSize: '0.95rem', cursor: 'pointer' }}>📄 Resources & Tools</button>
            
            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <button onClick={() => { handleNav('/login'); setMobileMenuOpen(false); }} className="btn-cyber-ghost" style={{ flex: 1, justifyContent: 'center' }}>
                Login
              </button>
              <button onClick={() => { handleNav('/signup'); setMobileMenuOpen(false); }} className="btn-cyber-green" style={{ flex: 1, justifyContent: 'center' }}>
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="grid-2col-responsive" style={{
        padding: '3rem 1.5rem',
        maxWidth: '1350px',
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: '2.5rem',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <span className="badge badge-green">100% Free & Open Student Platform</span>
            <span className="badge badge-cyan">Isolated Educational Sandboxes</span>
          </div>

          <h1 style={{
            fontSize: '3.25rem',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '1.25rem',
            letterSpacing: '-0.03em'
          }}>
            Cybersecurity is <br />
            <span style={{
              background: 'linear-gradient(135deg, #00f3ff 0%, #00ff66 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              learned by doing.
            </span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: '#94a3b8',
            lineHeight: 1.65,
            marginBottom: '2rem',
            maxWidth: '560px'
          }}>
            Learn cybersecurity concepts, practice in safe interactive labs, solve challenges, and build real defensive security projects.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={() => handleNav('/signup')} className="btn-cyber-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
              Start Learning <ArrowRight size={18} />
            </button>
            <button onClick={() => handleNav('/labs')} className="btn-cyber-ghost" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem', color: '#ffffff', borderColor: 'rgba(0, 243, 255, 0.3)' }}>
              <Terminal size={18} /> Explore Labs
            </button>
          </div>

          <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', color: '#64748b', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
            <div><strong style={{ color: '#00ff66', fontSize: '1.1rem' }}>80%</strong> Practical Labs</div>
            <div><strong style={{ color: '#00f3ff', fontSize: '1.1rem' }}>0$</strong> Free Always</div>
            <div><strong style={{ color: '#c879ff', fontSize: '1.1rem' }}>100%</strong> Safe Targets</div>
          </div>
        </div>

        {/* Hero Interactive Terminal Widget */}
        <div className="terminal-window" style={{ boxShadow: '0 0 40px rgba(0, 243, 255, 0.15)' }}>
          <div className="terminal-header">
            <div className="terminal-dots">
              <div className="terminal-dot dot-red" />
              <div className="terminal-dot dot-yellow" />
              <div className="terminal-dot dot-green" />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
              cyberverse-sandbox: ~/demo-lab
            </div>
          </div>
          <div style={{ padding: '1.5rem', fontSize: '0.85rem', lineHeight: 1.6 }}>
            <div style={{ color: '#64748b', marginBottom: '0.5rem' }}># CyberVerse Educational Terminal Simulator v2.4</div>
            <div style={{ color: '#00f3ff', fontWeight: 700, marginBottom: '0.75rem' }}>
              student@cyberverse:~$ <span style={{ color: '#ffffff' }}>nmap -sS 192.168.1.50</span>
            </div>
            <div style={{ color: '#94a3b8', marginBottom: '0.25rem' }}>Starting Nmap SYN Stealth Scan ...</div>
            <div style={{ color: '#00ff66' }}>Discovered open port 22/tcp (SSH)</div>
            <div style={{ color: '#00ff66' }}>Discovered open port 80/tcp (HTTP)</div>
            <div style={{ color: '#00ff66' }}>Discovered open port 443/tcp (HTTPS)</div>
            
            <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: '#090e1a', borderRadius: '6px', border: '1px solid rgba(0, 243, 255, 0.2)' }}>
              <div style={{ color: '#00f3ff', fontWeight: 700, fontSize: '0.8rem' }}>
                [+] Lab Objective: Identify open services and inspect traffic streams.
              </div>
              <div style={{ color: '#00ff66', fontSize: '0.78rem', marginTop: '0.25rem' }}>
                [+] Status: READY FOR PRACTICE
              </div>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Interactive Wireshark & Nmap Sandbox</span>
              <button onClick={() => handleNav('/labs/linux-file-hunt')} className="btn-cyber-primary" style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}>
                Try Live Lab
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LEARNING PATHS SECTION */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: '1350px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>STRUCTURED CURRICULUM</span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#ffffff' }}>Practical Learning Paths</h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.5rem' }}>Progress systematically from fundamentals to advanced cybersecurity specializations.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {learningPaths.map((path) => {
            const Icon = path.icon;
            return (
              <div key={path.id} className="cyber-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => handleNav('/paths')}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ background: 'rgba(0, 243, 255, 0.1)', padding: '0.65rem', borderRadius: '10px' }}>
                      <Icon size={24} color="#00f3ff" />
                    </div>
                    <span className={`badge ${path.badge}`}>{path.difficulty}</span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '0.5rem' }}>{path.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>{path.description}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>{path.modules} Modules</span>
                  <button onClick={(e) => { e.stopPropagation(); handleNav('/paths'); }} className="btn-cyber-ghost" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
                    Explore Path <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. PRACTICAL LABS INTERACTIVE GRID */}
      <section style={{ padding: '0 1.5rem 5rem 1.5rem', maxWidth: '1350px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>100% HANDS-ON PRACTICE</span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#ffffff' }}>Interactive Practical Sandboxes</h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.5rem' }}>Click any practical lab sandbox to launch live terminal environments, Wireshark frame parsers, and crypto engines.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {practicalLabs.map((lab) => {
            const Icon = lab.icon;
            return (
              <div key={lab.id} className="cyber-card cyber-card-glow-cyan" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => handleNav('/labs')}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ background: 'rgba(0, 255, 102, 0.1)', padding: '0.65rem', borderRadius: '10px' }}>
                      <Icon size={24} color="#00ff66" />
                    </div>
                    <span className="badge badge-purple">{lab.category}</span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.5rem' }}>{lab.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>{lab.description}</p>
                </div>

                <div>
                  <div style={{ fontSize: '0.78rem', color: '#00f3ff', fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}>
                    Target: {lab.target}
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); handleNav('/labs'); }} className="btn-cyber-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <Terminal size={16} /> Launch Interactive Lab
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
