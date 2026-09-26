import React, { useState, useEffect } from 'react';
import PageHeader from '../layout/PageHeader';
import NmapTerminalLab from '../NmapTerminalLab';
import XssSandbox from '../labs/XssSandbox';
import LogAnalysisLab from '../labs/LogAnalysisLab';
import NetworkPlayground from '../playground/NetworkPlayground';
import CryptoPlayground from '../playground/CryptoPlayground';
import { Terminal, Code, AlertTriangle, Activity, Network, Key } from 'lucide-react';

export default function PlaygroundPage({ onCompleteTerminalLab }) {
  const [activeTab, setActiveTab] = useState('network');

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('/playground/cryptography')) {
      setActiveTab('crypto');
    } else if (hash.includes('/playground/network')) {
      setActiveTab('network');
    }
  }, []);

  // SQLi visualizer state
  const [usernameInput, setUsernameInput] = useState("admin' OR '1'='1");
  const [vulnerableQuery, setVulnerableQuery] = useState("SELECT * FROM users WHERE username = 'admin' OR '1'='1' AND password = ''");
  const [safeQuery, setSafeQuery] = useState("SELECT * FROM users WHERE username = ? AND password = ? [Parameters: ('admin', '')]");

  const handleQueryChange = (val) => {
    setUsernameInput(val);
    setVulnerableQuery(`SELECT * FROM users WHERE username = '${val}' AND password = ''`);
    setSafeQuery(`SELECT * FROM users WHERE username = ? AND password = ? [Parameters: (${JSON.stringify(val)}, '')]`);
  };

  return (
    <div>
      <PageHeader
        title="Cyber Security Sandbox Playground"
        description="Isolated educational sandboxes: Network topology simulator, Cryptography & Hashing playground, Linux shell, SQLi visualizer, XSS playground, and SIEM analyzer."
        badgeText="EDUCATIONAL SANDBOX"
        badgeColor="badge-green"
      />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('network')}
          className={activeTab === 'network' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <Network size={16} /> Network Simulator
        </button>
        <button
          onClick={() => setActiveTab('crypto')}
          className={activeTab === 'crypto' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <Key size={16} /> Cryptography Sandbox
        </button>
        <button
          onClick={() => setActiveTab('terminal')}
          className={activeTab === 'terminal' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <Terminal size={16} /> Linux Nmap Shell
        </button>
        <button
          onClick={() => setActiveTab('sqli')}
          className={activeTab === 'sqli' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <Code size={16} /> SQL Injection Sandbox
        </button>
        <button
          onClick={() => setActiveTab('xss')}
          className={activeTab === 'xss' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <AlertTriangle size={16} /> XSS Playground
        </button>
        <button
          onClick={() => setActiveTab('siem')}
          className={activeTab === 'siem' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <Activity size={16} /> SIEM Log Analyzer
        </button>
      </div>

      {activeTab === 'network' && <NetworkPlayground />}
      {activeTab === 'crypto' && <CryptoPlayground />}

      {activeTab === 'terminal' && (
        <NmapTerminalLab onCompleteTerminalLab={onCompleteTerminalLab} />
      )}

      {activeTab === 'sqli' && (
        <div className="cyber-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#00f3ff' }}>
            Interactive SQL Injection Sandbox
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Type payloads into the target input field below to visualize how unescaped string concatenation alters SQL logic versus safe parameterized queries.
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.4rem' }}>
              Test Username Payload Input:
            </label>
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => handleQueryChange(e.target.value)}
              style={{
                background: '#050811',
                border: '1px solid rgba(0, 243, 255, 0.3)',
                color: '#00ff66',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                width: '100%',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(255, 51, 102, 0.08)', border: '1px solid rgba(255, 51, 102, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
              <div style={{ color: '#ff3366', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertTriangle size={16} /> VULNERABLE SQL QUERY (Concatenation)
              </div>
              <pre style={{ color: '#ff3366', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {vulnerableQuery}
              </pre>
            </div>

            <div style={{ background: 'rgba(0, 255, 102, 0.08)', border: '1px solid rgba(0, 255, 102, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
              <div style={{ color: '#00ff66', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={16} /> SAFE PARAMETERIZED QUERY (Prepared Statement)
              </div>
              <pre style={{ color: '#00ff66', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {safeQuery}
              </pre>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'xss' && <XssSandbox />}
      {activeTab === 'siem' && <LogAnalysisLab />}
    </div>
  );
}
