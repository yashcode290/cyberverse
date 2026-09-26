import React, { useState } from 'react';
import PageHeader from '../layout/PageHeader';
import { BookOpen, FileText, Download, X, Copy, Check, Terminal, ExternalLink, Shield } from 'lucide-react';

export default function ResourcesPage({ onNavigate }) {
  const [activeModal, setActiveModal] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const cheatSheets = [
    {
      id: 'linux-cli',
      title: 'Linux Bash CLI Cheatsheet',
      category: 'Linux Admin',
      desc: 'Essential Linux file manipulation, permission bits, grep string searches, and process auditing commands.',
      commands: [
        { cmd: 'ls -la /etc', desc: 'List all directory contents including hidden dotfiles and permission bits' },
        { cmd: 'grep -rnw "/var/log" -e "password"', desc: 'Recursively search log files for specific unencrypted credential strings' },
        { cmd: 'chmod 755 /usr/local/bin/agent', desc: 'Set read, write, execute bits for owner, and read/execute for group/others' },
        { cmd: 'ps aux | grep "sshd"', desc: 'Inspect active running system processes and filter for SSH daemon threads' }
      ]
    },
    {
      id: 'wireshark-filters',
      title: 'Wireshark Filter Reference Guide',
      category: 'Network Forensics',
      desc: 'Display filter syntax for unencrypted HTTP payloads, TCP SYN 3-way handshakes, DNS queries, and ARP packets.',
      commands: [
        { cmd: 'http.request.method == "POST"', desc: 'Filter packet stream for HTTP POST requests carrying web form payloads' },
        { cmd: 'tcp.flags.syn == 1 && tcp.flags.ack == 0', desc: 'Isolate TCP SYN packet requests to detect host port scanning activity' },
        { cmd: 'ip.addr == 192.168.1.50', desc: 'Filter for all inbound and outbound IP traffic involving a specific target IP' },
        { cmd: 'dns.flags.response == 0', desc: 'Inspect outgoing DNS query resolution lookup frames' }
      ]
    },
    {
      id: 'owasp-top10',
      title: 'OWASP Top 10 Vulnerability Guide',
      category: 'Web Security',
      desc: 'Detailed breakdown of SQL Injection, Cross-Site Scripting (XSS), IDOR, CSRF, and broken access controls.',
      commands: [
        { cmd: "admin' OR '1'='1", desc: 'Classic SQL Injection boolean bypass payload testing string concatenation' },
        { cmd: '<script>alert(document.cookie)</script>', desc: 'Basic Reflected XSS test payload verifying DOM HTML sanitization' },
        { cmd: 'SELECT * FROM users WHERE id = $1', desc: 'Safe parameterized SQL query defense protecting against SQL Injection' },
        { cmd: 'Set-Cookie: session=xyz; Secure; HttpOnly; SameSite=Strict', desc: 'Hardened HTTP response cookie security attributes' }
      ]
    },
    {
      id: 'nmap-scan',
      title: 'Nmap Port Scanning Reference',
      category: 'Reconnaissance',
      desc: 'SYN stealth scans (-sS), service version fingerprinting (-sV), OS detection (-O), and NSE script execution.',
      commands: [
        { cmd: 'nmap -sS -p 1-1000 192.168.1.1', desc: 'Execute SYN stealth scan against the 1,000 most common TCP ports' },
        { cmd: 'nmap -sV -O 192.168.1.50', desc: 'Audit remote service versions and fingerprint target operating system' },
        { cmd: 'nmap --script vuln 192.168.1.50', desc: 'Run Nmap Script Engine (NSE) vulnerability scanner suite against target' },
        { cmd: 'nmap -p 80,443 -sC 192.168.1.0/24', desc: 'Scan local subnet range for active web servers and default scripts' }
      ]
    }
  ];

  const handleCopyCmd = (cmdText, idx) => {
    navigator.clipboard.writeText(cmdText);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div>
      <PageHeader
        title="Interactive Security Resources & Cheat Sheets"
        description="Click any study card to open the interactive command inspector, copyable code snippets, and live practice sandboxes."
        badgeText="STUDY RESOURCES"
        badgeColor="badge-cyan"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {cheatSheets.map((item) => (
          <div key={item.id} className="cyber-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setActiveModal(item)}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge badge-purple">{item.category}</span>
                <span style={{ fontSize: '0.75rem', color: '#00f3ff', fontFamily: 'var(--font-mono)' }}>{item.commands.length} Rules</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText size={18} color="#00f3ff" /> {item.title}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5 }}>{item.desc}</p>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); setActiveModal(item); }}
              className="btn-cyber-primary"
              style={{ marginTop: '1.25rem', width: '100%', justifyContent: 'center' }}
            >
              <Terminal size={16} /> Open Interactive Reference
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Study Inspector Modal */}
      {activeModal && (
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
                <span className="badge badge-purple" style={{ marginBottom: '0.35rem' }}>{activeModal.category}</span>
                <h3 style={{ fontSize: '1.4rem', color: '#ffffff', fontWeight: 800 }}>{activeModal.title}</h3>
              </div>
              <button onClick={() => setActiveModal(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.25rem' }}>
                <X size={24} />
              </button>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {activeModal.desc}
            </p>

            <div style={{ fontSize: '0.85rem', color: '#00f3ff', fontWeight: 700, fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
              [+] KEY COMMAND SYNTAX & SYNTAX BREAKDOWN:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
              {activeModal.commands.map((c, idx) => (
                <div key={idx} style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.2)', padding: '0.85rem 1rem', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <code style={{ color: '#00ff66', fontFamily: 'var(--font-mono)', fontSize: '0.88rem', fontWeight: 700 }}>
                      {c.cmd}
                    </code>
                    <button
                      onClick={() => handleCopyCmd(c.cmd, idx)}
                      className="btn-cyber-ghost"
                      style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                    >
                      {copiedIndex === idx ? <Check size={14} color="#00ff66" /> : <Copy size={14} />} {copiedIndex === idx ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.4 }}>
                    {c.desc}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'flex-end', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}>
              <button
                onClick={() => { setActiveModal(null); if (onNavigate) onNavigate('/labs'); }}
                className="btn-cyber-primary"
                style={{ padding: '0.65rem 1.25rem' }}
              >
                <Terminal size={16} /> Practice in Live Sandbox Lab
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="btn-cyber-ghost"
                style={{ padding: '0.65rem 1.25rem' }}
              >
                Close Reference
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
