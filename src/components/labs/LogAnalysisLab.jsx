import React, { useState } from 'react';
import { Activity, ShieldAlert, Search, Filter, CheckCircle2, AlertTriangle, Terminal } from 'lucide-react';

export default function LogAnalysisLab() {
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const logs = [
    {
      id: 1,
      timestamp: '2026-09-01T14:52:10.104Z',
      sourceIp: '192.168.1.105',
      type: 'HTTP',
      status: 200,
      severity: 'INFO',
      message: 'GET /index.html HTTP/1.1 User-Agent: Mozilla/5.0',
      category: 'NORMAL'
    },
    {
      id: 2,
      timestamp: '2026-09-01T14:52:12.440Z',
      sourceIp: '10.0.4.15',
      type: 'SSH',
      status: 401,
      severity: 'CRITICAL',
      message: 'Failed password for root from 10.0.4.15 port 42810 ssh2 [SSH BRUTE FORCE ATTEMPT #1]',
      category: 'BRUTE_FORCE'
    },
    {
      id: 3,
      timestamp: '2026-09-01T14:52:12.890Z',
      sourceIp: '10.0.4.15',
      type: 'SSH',
      status: 401,
      severity: 'CRITICAL',
      message: 'Failed password for root from 10.0.4.15 port 42812 ssh2 [SSH BRUTE FORCE ATTEMPT #2]',
      category: 'BRUTE_FORCE'
    },
    {
      id: 4,
      timestamp: '2026-09-01T14:52:15.012Z',
      sourceIp: '198.51.100.44',
      type: 'HTTP',
      status: 404,
      severity: 'WARNING',
      message: 'GET /admin/config.php.bak HTTP/1.1 [PATH SCANNING / ENUMERATION]',
      category: 'ENUMERATION'
    },
    {
      id: 5,
      timestamp: '2026-09-01T14:52:18.990Z',
      sourceIp: '203.0.113.88',
      type: 'HTTP',
      status: 500,
      severity: 'CRITICAL',
      message: 'GET /login.php?user=admin%27%20OR%201=1-- HTTP/1.1 [SQL INJECTION DETECTED]',
      category: 'SQLI'
    }
  ];

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filterType === 'ALL' || log.category === filterType;
    const matchesSearch = log.sourceIp.includes(searchTerm) || log.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="cyber-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-amber">SIEM Analytics</span>
            <span className="badge badge-purple">Blue Team Log Inspector</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity color="#ffd166" /> SIEM Log Threat Analyzer
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Parse server logs, detect automated brute-force attacks, and identify malicious payload indicators.
          </p>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilterType('ALL')}
            className={filterType === 'ALL' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
          >
            All Logs ({logs.length})
          </button>
          <button
            onClick={() => setFilterType('BRUTE_FORCE')}
            className={filterType === 'BRUTE_FORCE' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
          >
            SSH Brute Force
          </button>
          <button
            onClick={() => setFilterType('SQLI')}
            className={filterType === 'SQLI' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
          >
            SQLi Probes
          </button>
        </div>
      </div>

      {/* Log Terminal Window */}
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-dots">
            <div className="terminal-dot dot-red" />
            <div className="terminal-dot dot-yellow" />
            <div className="terminal-dot dot-green" />
          </div>
          <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>siem-telemetry-feed.log</div>
        </div>

        <div className="terminal-body" style={{ height: '360px' }}>
          {filteredLogs.map(log => {
            let sevColor = '#00ff66';
            if (log.severity === 'WARNING') sevColor = '#ffd166';
            if (log.severity === 'CRITICAL') sevColor = '#ff3366';

            return (
              <div key={log.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', padding: '0.65rem 0', fontFamily: 'var(--font-mono)', fontSize: '0.83rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <span style={{ color: '#64748b' }}>[{log.timestamp}]</span>
                  <span style={{ color: '#00f3ff' }}>IP: {log.sourceIp}</span>
                  <span style={{ background: `${sevColor}20`, color: sevColor, padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.75rem' }}>
                    {log.severity}
                  </span>
                </div>
                <div style={{ color: log.severity === 'CRITICAL' ? '#ff3366' : '#cbd5e1' }}>
                  {log.message}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
