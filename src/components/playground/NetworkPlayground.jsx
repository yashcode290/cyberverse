import React, { useState } from 'react';
import PageHeader from '../layout/PageHeader';
import { 
  Network, Cpu, HardDrive, ShieldCheck, Server, Radio, Play, 
  Search, Filter, CheckCircle2, AlertTriangle, ArrowRight, HelpCircle, Info, RefreshCw 
} from 'lucide-react';

export default function NetworkPlayground() {
  const [selectedDevice, setSelectedDevice] = useState('computer');
  const [selectedPacket, setSelectedPacket] = useState(1);
  const [protocolFilter, setProtocolFilter] = useState('ALL');

  // Packet simulation controls
  const [pktSource, setPktSource] = useState('192.168.1.105');
  const [pktDest, setPktDest] = useState('10.0.4.15');
  const [pktProtocol, setPktProtocol] = useState('HTTP');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animProgress, setAnimProgress] = useState(0);

  // Challenge Answers
  const [challengeAns, setChallengeAns] = useState({});
  const [challengeResult, setChallengeResult] = useState({});

  const devices = {
    computer: {
      name: 'Computer (Client)',
      icon: Cpu,
      ip: '192.168.1.105',
      mac: '00:11:22:33:44:55',
      os: 'CyberVerse Linux 2026',
      services: ['DHCP Client', 'DNS Resolver', 'Web Browser']
    },
    switch: {
      name: 'Managed Ethernet Switch',
      icon: Radio,
      ip: '192.168.1.2 (Management)',
      mac: '00:aa:bb:cc:dd:ee',
      os: 'Cisco IOS Simulated',
      services: ['VLAN 1 Default', 'FastEthernet 0/1 - 0/24', 'MAC Table Learning']
    },
    router: {
      name: 'Core Gateway Router',
      icon: Network,
      ip: '192.168.1.1 (Internal) / 10.0.0.1 (External)',
      mac: '00:c0:ca:11:22:33',
      os: 'RouterOS v7.1',
      services: ['NAT Translation', 'IPv4 Routing Engine', 'DHCP Server']
    },
    firewall: {
      name: 'Next-Gen Perimeter Firewall',
      icon: ShieldCheck,
      ip: '10.0.0.2',
      mac: '00:c0:ca:44:55:66',
      os: 'CyberShield OS',
      services: ['ALLOW TCP 80, 443', 'ALLOW UDP 53', 'BLOCK TCP 23 (Telnet)']
    },
    server: {
      name: 'Web Application Server',
      icon: Server,
      ip: '10.0.4.15',
      mac: '00:50:56:ea:21:01',
      os: 'Ubuntu Server 22.04 LTS',
      services: ['Port 22 (SSH)', 'Port 80 (HTTP)', 'Port 443 (HTTPS)', 'Port 3306 (MySQL)']
    }
  };

  const [packets, setPackets] = useState([
    {
      id: 1,
      time: '0.000000',
      source: '192.168.1.105',
      destination: '8.8.8.8',
      protocol: 'DNS',
      srcPort: 54102,
      dstPort: 53,
      info: 'Standard query 0x1a2b A target-server.local',
      status: 'ALLOW',
      payload: 'DNS Query: What is IP for target-server.local?'
    },
    {
      id: 2,
      time: '0.012430',
      source: '8.8.8.8',
      destination: '192.168.1.105',
      protocol: 'DNS',
      srcPort: 53,
      dstPort: 54102,
      info: 'Standard query response 0x1a2b A 10.0.4.15',
      status: 'ALLOW',
      payload: 'DNS Response: target-server.local is at 10.0.4.15'
    },
    {
      id: 3,
      time: '0.045120',
      source: '192.168.1.105',
      destination: '10.0.4.15',
      protocol: 'TCP',
      srcPort: 54210,
      dstPort: 80,
      info: '54210 → 80 [SYN] Seq=0 Win=64240 Len=0',
      status: 'ALLOW',
      payload: 'TCP 3-Way Handshake SYN Segment'
    },
    {
      id: 4,
      time: '0.089400',
      source: '192.168.1.105',
      destination: '10.0.4.15',
      protocol: 'HTTP',
      srcPort: 54210,
      dstPort: 80,
      info: 'POST /login.php HTTP/1.1 (application/x-www-form-urlencoded)',
      status: 'ALLOW',
      payload: 'username=admin_sec&password=SuperSecret2026!'
    },
    {
      id: 5,
      time: '0.120000',
      source: '192.168.1.105',
      destination: '10.0.4.15',
      protocol: 'TCP',
      srcPort: 54212,
      dstPort: 23,
      info: '54212 → 23 [SYN] Seq=0 Win=64240',
      status: 'DROPPED BY FIREWALL',
      payload: 'Telnet Connection Blocked by Perimeter Firewall Rule #12'
    }
  ]);

  const handleSendPacket = () => {
    setIsAnimating(true);
    setAnimProgress(0);

    const interval = setInterval(() => {
      setAnimProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnimating(false);

          // Add generated packet to table
          const newPkt = {
            id: packets.length + 1,
            time: (Math.random() * 2).toFixed(6),
            source: pktSource,
            destination: pktDest,
            protocol: pktProtocol,
            srcPort: Math.floor(50000 + Math.random() * 10000),
            dstPort: pktProtocol === 'HTTP' ? 80 : pktProtocol === 'HTTPS' ? 443 : pktProtocol === 'DNS' ? 53 : 8080,
            info: `${pktProtocol} Request → ${pktDest}`,
            status: pktProtocol === 'TELNET' ? 'DROPPED BY FIREWALL' : 'ALLOW',
            payload: `Simulated ${pktProtocol} Data Payload Stream`
          };

          setPackets(prevPkts => [...prevPkts, newPkt]);
          setSelectedPacket(newPkt.id);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const filteredPackets = packets.filter(p => {
    if (protocolFilter === 'ALL') return true;
    return p.protocol === protocolFilter;
  });

  const activeDeviceObj = devices[selectedDevice] || devices.computer;
  const activePacketObj = packets.find(p => p.id === selectedPacket) || packets[0];

  const handleSolveChallenge = (id, correct) => {
    const val = (challengeAns[id] || '').trim();
    if (val.toLowerCase() === correct.toLowerCase()) {
      setChallengeResult({ ...challengeResult, [id]: { success: true, msg: 'Correct answer!' } });
    } else {
      setChallengeResult({ ...challengeResult, [id]: { success: false, msg: 'Incorrect. Check hints!' } });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <PageHeader
        title="Interactive Network Topology & Packet Simulator"
        description="Visualize network data flows through switches, routers, and firewalls with live animated packet captures."
        badgeText="EDUCATIONAL NETWORK SIMULATOR"
        badgeColor="badge-green"
      />

      {/* 1. TOPOLOGY GRAPH & ANIMATION */}
      <div className="cyber-card cyber-card-glow-cyan" style={{ padding: '2rem', background: '#090e1a', position: 'relative' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#00f3ff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Network size={20} /> Live Network Topology Graph
        </h3>

        {/* Nodes Container */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', padding: '1.5rem 0' }}>
          {/* Animated Connecting Line */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '5%',
            right: '5%',
            height: '3px',
            background: 'linear-gradient(90deg, #00f3ff, #00ff66 50%, #9d4edd)',
            zIndex: 0,
            transform: 'translateY(-50%)'
          }} />

          {/* Animated Traveling Packet Dot */}
          {isAnimating && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: `${5 + (animProgress * 0.9)}%`,
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: '#00ff66',
              boxShadow: '0 0 15px #00ff66, 0 0 30px #00ff66',
              zIndex: 10,
              transform: 'translate(-50%, -50%)',
              transition: 'left 0.3s linear'
            }} />
          )}

          {/* Topology Node Buttons */}
          {Object.keys(devices).map((key) => {
            const dev = devices[key];
            const DevIcon = dev.icon;
            const isSelected = selectedDevice === key;

            return (
              <button
                key={key}
                onClick={() => setSelectedDevice(key)}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  background: isSelected ? 'rgba(0, 243, 255, 0.2)' : '#0e1526',
                  border: isSelected ? '2px solid #00f3ff' : '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: isSelected ? '0 0 20px rgba(0, 243, 255, 0.3)' : 'none',
                  borderRadius: '14px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minWidth: '130px'
                }}
              >
                <DevIcon size={26} color={isSelected ? '#00f3ff' : '#94a3b8'} />
                <span style={{ fontSize: '0.85rem', fontWeight: isSelected ? 700 : 500, color: isSelected ? '#ffffff' : '#cbd5e1' }}>
                  {dev.name.split(' ')[0]}
                </span>
                <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                  {dev.ip.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. DEVICE INSPECTOR & PACKET GENERATOR GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
          {/* DEVICE INSPECTOR PANEL */}
          <div style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.2)', padding: '1.25rem', borderRadius: '10px' }}>
            <h4 style={{ fontSize: '0.95rem', color: '#00f3ff', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              ▸ DEVICE INSPECTOR: {activeDeviceObj.name}
            </h4>
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontFamily: 'var(--font-mono)' }}>
              <div><span style={{ color: '#64748b' }}>IP Address:</span> {activeDeviceObj.ip}</div>
              <div><span style={{ color: '#64748b' }}>MAC Address:</span> {activeDeviceObj.mac}</div>
              <div><span style={{ color: '#64748b' }}>OS Version:</span> {activeDeviceObj.os}</div>
              <div style={{ marginTop: '0.5rem' }}>
                <span style={{ color: '#00ff66' }}>Active Services & Rules:</span>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem', color: '#94a3b8' }}>
                  {activeDeviceObj.services.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* PACKET GENERATOR FORM */}
          <div style={{ background: '#050811', border: '1px solid rgba(0, 255, 102, 0.2)', padding: '1.25rem', borderRadius: '10px' }}>
            <h4 style={{ fontSize: '0.95rem', color: '#00ff66', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              ▸ PACKET GENERATOR (SEND INTERACTION)
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Protocol:</label>
                <select
                  value={pktProtocol}
                  onChange={(e) => setPktProtocol(e.target.value)}
                  style={{ background: '#090e1a', border: '1px solid rgba(0, 243, 255, 0.3)', color: '#00f3ff', padding: '0.45rem', borderRadius: '6px', width: '100%', fontSize: '0.85rem' }}
                >
                  <option value="HTTP">HTTP (Port 80)</option>
                  <option value="HTTPS">HTTPS (Port 443)</option>
                  <option value="DNS">DNS Query (Port 53)</option>
                  <option value="TCP">TCP SYN (Port 80)</option>
                  <option value="ICMP">ICMP Echo Ping</option>
                  <option value="TELNET">Telnet (Port 23 - Blocked)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Destination IP:</label>
                <select
                  value={pktDest}
                  onChange={(e) => setPktDest(e.target.value)}
                  style={{ background: '#090e1a', border: '1px solid rgba(0, 243, 255, 0.3)', color: '#ffffff', padding: '0.45rem', borderRadius: '6px', width: '100%', fontSize: '0.85rem' }}
                >
                  <option value="10.0.4.15">10.0.4.15 (Web Server)</option>
                  <option value="8.8.8.8">8.8.8.8 (DNS Resolver)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSendPacket}
              disabled={isAnimating}
              className="btn-cyber-green"
              style={{ width: '100%', justifyContent: 'center', padding: '0.6rem' }}
            >
              <Play size={16} fill="#050811" /> {isAnimating ? 'Transmitting Packet...' : 'Send Packet Stream'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. SIMPLIFIED EDUCATIONAL WIRESHARK PACKET TABLE */}
      <div style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.2)', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ background: '#090e1a', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: '#ffffff', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
            SIMULATED WIRESHARK PACKET CAPTURE STREAM
          </span>

          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {['ALL', 'TCP', 'UDP', 'DNS', 'HTTP', 'HTTPS', 'ICMP'].map(proto => (
              <button
                key={proto}
                onClick={() => setProtocolFilter(proto)}
                style={{
                  background: protocolFilter === proto ? 'rgba(0, 243, 255, 0.2)' : 'transparent',
                  border: protocolFilter === proto ? '1px solid #00f3ff' : '1px solid transparent',
                  color: protocolFilter === proto ? '#00f3ff' : '#64748b',
                  fontSize: '0.72rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {proto}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
            <thead>
              <tr style={{ background: '#0d1526', color: '#64748b', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <th style={{ padding: '0.65rem 1rem' }}>No.</th>
                <th style={{ padding: '0.65rem 1rem' }}>Time</th>
                <th style={{ padding: '0.65rem 1rem' }}>Source</th>
                <th style={{ padding: '0.65rem 1rem' }}>Destination</th>
                <th style={{ padding: '0.65rem 1rem' }}>Protocol</th>
                <th style={{ padding: '0.65rem 1rem' }}>Info</th>
              </tr>
            </thead>
            <tbody>
              {filteredPackets.map((p) => {
                const isSelected = p.id === selectedPacket;
                let protoColor = '#00f3ff';
                if (p.protocol === 'HTTP') protoColor = '#00ff66';
                if (p.protocol === 'DNS') protoColor = '#9d4edd';

                return (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedPacket(p.id)}
                    style={{
                      background: isSelected ? 'rgba(0, 243, 255, 0.15)' : 'transparent',
                      color: isSelected ? '#ffffff' : '#cbd5e1',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      cursor: 'pointer'
                    }}
                  >
                    <td style={{ padding: '0.6rem 1rem', color: isSelected ? '#00f3ff' : '#64748b' }}>{p.id}</td>
                    <td style={{ padding: '0.6rem 1rem' }}>{p.time}</td>
                    <td style={{ padding: '0.6rem 1rem' }}>{p.source}</td>
                    <td style={{ padding: '0.6rem 1rem' }}>{p.destination}</td>
                    <td style={{ padding: '0.6rem 1rem' }}>
                      <span style={{ background: `${protoColor}20`, color: protoColor, padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>
                        {p.protocol}
                      </span>
                    </td>
                    <td style={{ padding: '0.6rem 1rem', color: p.status.includes('DROPPED') ? '#ff3366' : 'inherit' }}>
                      {p.info}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. PACKET HEADER INSPECTOR & WHAT IS HAPPENING PANEL */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* PACKET HEADER INSPECTOR */}
        <div className="cyber-card">
          <h4 style={{ fontSize: '0.95rem', color: '#00f3ff', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            ▸ PACKET #{activePacketObj.id} INSPECTOR
          </h4>
          <div style={{ fontSize: '0.83rem', fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: '#cbd5e1' }}>
            <div><span style={{ color: '#64748b' }}>Source Address:</span> {activePacketObj.source}:{activePacketObj.srcPort}</div>
            <div><span style={{ color: '#64748b' }}>Destination Address:</span> {activePacketObj.destination}:{activePacketObj.dstPort}</div>
            <div><span style={{ color: '#64748b' }}>Protocol:</span> {activePacketObj.protocol}</div>
            <div><span style={{ color: '#64748b' }}>Status:</span> <span style={{ color: activePacketObj.status.includes('DROPPED') ? '#ff3366' : '#00ff66' }}>{activePacketObj.status}</span></div>
            <div style={{ background: '#050811', border: '1px solid rgba(0, 255, 102, 0.2)', padding: '0.75rem', borderRadius: '6px', color: '#00ff66', marginTop: '0.5rem' }}>
              Payload: {activePacketObj.payload}
            </div>
          </div>
        </div>

        {/* WHAT IS HAPPENING EDUCATIONAL EXPLANATION */}
        <div className="cyber-card cyber-card-glow-cyan" style={{ borderLeft: '4px solid #00f3ff' }}>
          <h4 style={{ fontSize: '0.95rem', color: '#00f3ff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Info size={18} /> What Is Happening?
          </h4>
          <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            When a packet is transmitted from <strong>192.168.1.105</strong> to <strong>10.0.4.15</strong>:
          </p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', fontSize: '0.83rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <li><strong>Layer 2 (Data Link):</strong> Switch forwards frames based on MAC address tables.</li>
            <li><strong>Layer 3 (Network):</strong> Router rewrites headers using NAT and routes to subnet 10.0.4.0/24.</li>
            <li><strong>Layer 4 (Transport):</strong> Firewall inspects destination ports (e.g. blocking Telnet on port 23).</li>
            <li><strong>Layer 7 (Application):</strong> Web Server parses HTTP POST credentials or TLS handshake.</li>
          </ul>
        </div>
      </div>

      {/* 5. INTERACTIVE NETWORK CHALLENGES */}
      <div className="cyber-card">
        <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HelpCircle color="#ffd166" size={20} /> Network Analysis Challenges
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {/* Challenge 1 */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1rem', borderRadius: '8px' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '0.35rem' }}>Challenge 1</span>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
              What is the IP address of the Web Server?
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="e.g. 10.0.4.15"
                value={challengeAns['c1'] || ''}
                onChange={(e) => setChallengeAns({ ...challengeAns, c1: e.target.value })}
                style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.3)', color: '#00ff66', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', padding: '0.4rem', borderRadius: '4px', flex: 1 }}
              />
              <button onClick={() => handleSolveChallenge('c1', '10.0.4.15')} className="btn-cyber-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}>
                Check
              </button>
            </div>
            {challengeResult['c1'] && (
              <div style={{ fontSize: '0.75rem', color: challengeResult['c1'].success ? '#00ff66' : '#ff3366', marginTop: '0.35rem' }}>
                {challengeResult['c1'].msg}
              </div>
            )}
          </div>

          {/* Challenge 2 */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1rem', borderRadius: '8px' }}>
            <span className="badge badge-green" style={{ marginBottom: '0.35rem' }}>Challenge 2</span>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
              Which destination port is used for HTTPS encryption?
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="e.g. 443"
                value={challengeAns['c2'] || ''}
                onChange={(e) => setChallengeAns({ ...challengeAns, c2: e.target.value })}
                style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.3)', color: '#00ff66', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', padding: '0.4rem', borderRadius: '4px', flex: 1 }}
              />
              <button onClick={() => handleSolveChallenge('c2', '443')} className="btn-cyber-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}>
                Check
              </button>
            </div>
            {challengeResult['c2'] && (
              <div style={{ fontSize: '0.75rem', color: challengeResult['c2'].success ? '#00ff66' : '#ff3366', marginTop: '0.35rem' }}>
                {challengeResult['c2'].msg}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
