import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TermIcon, Play, HelpCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function NmapTerminalLab({ onCompleteTerminalLab }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { text: 'NetSec Bash v5.2.15(1)-release (x86_64-pc-linux-gnu)', type: 'sys' },
    { text: 'Type "help" to list available network tools and Nmap flags.', type: 'sys' },
    { text: 'Target Server IP: 192.168.1.50 (Vulnerable Web Server)', type: 'info' }
  ]);
  const [labSolved, setLabSolved] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    // Add user command line
    const newHistory = [...history, { text: `root@sec-lab:~# ${cmd}`, type: 'cmd' }];

    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (lowerCmd === 'help') {
      newHistory.push({
        text: `AVAILABLE NETWORK COMMANDS:
  nmap -sS <ip>           : Fast TCP SYN Stealth Scan
  nmap -sV <ip>           : Detect service versions on target
  nmap --script vuln <ip> : Run Nmap vulnerability scripts
  ping <host>             : Send ICMP echo requests
  nslookup <domain>       : Query DNS name servers
  traceroute <host>       : Trace packet routing hops
  arp -a                  : Display local ARP cache table
  clear                   : Clear terminal screen`,
        type: 'output'
      });
    } else if (lowerCmd.startsWith('nmap -ss') || lowerCmd === 'nmap 192.168.1.50') {
      newHistory.push({
        text: `Starting Nmap 7.94 ( https://nmap.org )
Initiating SYN Stealth Scan at 15:24...
Scanning 192.168.1.50 [1000 ports]
Discovered open port 22/tcp on 192.168.1.50
Discovered open port 80/tcp on 192.168.1.50
Discovered open port 3306/tcp on 192.168.1.50

PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
3306/tcp open  mysql

Nmap done: 1 IP address (1 host up) scanned in 1.42 seconds.`,
        type: 'success'
      });

      if (!labSolved) {
        setLabSolved(true);
        onCompleteTerminalLab();
      }
    } else if (lowerCmd.includes('nmap -sv')) {
      newHistory.push({
        text: `Starting Nmap Service Detection...
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.2p1 Ubuntu
80/tcp   open  http    Apache httpd 2.4.41 ((Ubuntu))
3306/tcp open  mysql   MySQL 5.7.33-0ubuntu0.18.04.1

Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel`,
        type: 'success'
      });
    } else if (lowerCmd.includes('--script vuln')) {
      newHistory.push({
        text: `Pre-scanning script results:
| http-vuln-cve2017-5638:
|   VULNERABLE: Apache Remote Code Execution
|_  CVE: CVE-2017-5638 State: VULNERABLE
| mysql-empty-password:
|_  MySQL root account has no password set! [CRITICAL]`,
        type: 'warning'
      });
    } else if (lowerCmd.startsWith('ping')) {
      newHistory.push({
        text: `PING 192.168.1.50 (192.168.1.50) 56(84) bytes of data.
64 bytes from 192.168.1.50: icmp_seq=1 ttl=64 time=0.84 ms
64 bytes from 192.168.1.50: icmp_seq=2 ttl=64 time=0.91 ms
64 bytes from 192.168.1.50: icmp_seq=3 ttl=64 time=0.78 ms
--- 192.168.1.50 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms`,
        type: 'output'
      });
    } else if (lowerCmd === 'arp -a') {
      newHistory.push({
        text: `Interface: 192.168.1.105 --- 0x2
  Internet Address      Physical Address      Type
  192.168.1.1           00-aa-bb-cc-dd-ee     dynamic (Gateway)
  192.168.1.50          00-11-22-33-44-55     dynamic (Server)`,
        type: 'output'
      });
    } else if (lowerCmd.startsWith('nslookup')) {
      newHistory.push({
        text: `Server:		8.8.8.8
Address:	8.8.8.8#53

Non-authoritative answer:
Name:	target.sec-academy.local
Address: 192.168.1.50`,
        type: 'output'
      });
    } else {
      newHistory.push({
        text: `bash: ${cmd}: command not found. Type "help" for valid network tools.`,
        type: 'error'
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="cyber-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-green">Linux Terminal</span>
            <span className="badge badge-cyan">Nmap Scanner</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TermIcon color="#00ff66" /> Nmap & Network Terminal Shell
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Type `nmap -sS 192.168.1.50` or `help` to scan the target server for open ports and vulnerabilities.
          </p>
        </div>

        {labSolved && (
          <div style={{
            background: 'rgba(0, 255, 102, 0.15)',
            border: '1px solid #00ff66',
            color: '#00ff66',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <CheckCircle2 size={16} /> Nmap Scan Task Completed (+100 XP)
          </div>
        )}
      </div>

      {/* Terminal Window */}
      <div className="terminal-window">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-dots">
            <div className="terminal-dot dot-red" />
            <div className="terminal-dot dot-yellow" />
            <div className="terminal-dot dot-green" />
          </div>
          <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>root@sec-lab: ~ (bash)</div>
          <button
            onClick={() => setHistory([])}
            style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}
            title="Clear terminal"
          >
            Clear
          </button>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body">
          {history.map((item, index) => {
            let itemColor = '#00ff66';
            if (item.type === 'sys') itemColor = '#00f3ff';
            if (item.type === 'cmd') itemColor = '#ffffff';
            if (item.type === 'warning') itemColor = '#ffd166';
            if (item.type === 'error') itemColor = '#ff3366';

            return (
              <pre key={index} style={{ color: itemColor, whiteSpace: 'pre-wrap', margin: '0.25rem 0' }}>
                {item.text}
              </pre>
            );
          })}

          {/* Interactive Prompt Form */}
          <form onSubmit={handleCommandSubmit} style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
            <span style={{ color: '#00f3ff', marginRight: '0.5rem', fontWeight: 700 }}>root@sec-lab:~#</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="nmap -sS 192.168.1.50"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.88rem',
                outline: 'none',
                width: '100%'
              }}
              autoFocus
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
