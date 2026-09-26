import React, { useState } from 'react';
import { packetCaptures } from '../data/packetCaptures';
import { Search, AlertTriangle, CheckCircle2, ChevronRight, HelpCircle, Terminal, RefreshCw, Zap } from 'lucide-react';

export default function PacketInspectorLab({ solvedLabs, onSolveLab }) {
  const [selectedCaptureId, setSelectedCaptureId] = useState(packetCaptures[0].id);
  const [selectedPacketId, setSelectedPacketId] = useState(1);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  const capture = packetCaptures.find(c => c.id === selectedCaptureId) || packetCaptures[0];
  const activePacket = capture.packets.find(p => p.id === selectedPacketId) || capture.packets[0];
  const isSolved = solvedLabs.includes(capture.id);

  const handleCaptureChange = (id) => {
    setSelectedCaptureId(id);
    setSelectedPacketId(1);
    setUserAnswer('');
    setFeedback(null);
  };

  const handleCheckAnswer = (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    if (userAnswer.trim().toLowerCase() === capture.correctAnswer.toLowerCase()) {
      setFeedback({ success: true, message: 'Bingo! Correct answer identified in packet payload. (+100 XP Earned!)' });
      onSolveLab(capture.id);
    } else {
      setFeedback({ success: false, message: 'Incorrect flag or value. Inspect the packet payload details carefully!' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Bar */}
      <div className="cyber-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-cyan">Wireshark Lab</span>
            <span className="badge badge-purple">PCAP Forensics</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Search color="#00f3ff" /> Wireshark Packet Forensics Sandbox
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Click packet rows to inspect headers, follow streams, and uncover network security anomalies.
          </p>
        </div>

        {/* Capture Selector Dropdown */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {packetCaptures.map(c => {
            const isCurrent = c.id === selectedCaptureId;
            const isPassed = solvedLabs.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => handleCaptureChange(c.id)}
                style={{
                  background: isCurrent ? 'rgba(0, 243, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: isCurrent ? '1px solid #00f3ff' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: isCurrent ? '#00f3ff' : '#94a3b8',
                  padding: '0.5rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                {isPassed && <CheckCircle2 size={14} color="#00ff66" />}
                {c.title.split(' ')[0]} {c.title.split(' ')[1]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Challenge Task Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(14, 21, 38, 0.95), rgba(19, 31, 56, 0.95))',
        border: '1px solid rgba(0, 243, 255, 0.3)',
        borderRadius: '12px',
        padding: '1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ fontSize: '0.85rem', color: '#00f3ff', fontWeight: 700, marginBottom: '0.2rem' }}>
            LAB TASK: {capture.title}
          </div>
          <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '0.2rem' }}>
            {capture.challengeQuestion}
          </h4>
          <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
            💡 Hint: {capture.hint}
          </p>
        </div>

        {/* Challenge Input Form */}
        <form onSubmit={handleCheckAnswer} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Enter flag / password..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={isSolved}
            style={{
              background: '#050811',
              border: '1px solid rgba(0, 243, 255, 0.3)',
              color: '#00ff66',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              padding: '0.55rem 0.85rem',
              borderRadius: '6px',
              minWidth: '220px',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={isSolved}
            className="btn-cyber-primary"
            style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
          >
            Submit Answer
          </button>
        </form>
      </div>

      {feedback && (
        <div style={{
          background: feedback.success ? 'rgba(0, 255, 102, 0.12)' : 'rgba(255, 51, 102, 0.12)',
          border: `1px solid ${feedback.success ? '#00ff66' : '#ff3366'}`,
          color: feedback.success ? '#00ff66' : '#ff3366',
          padding: '0.75rem 1.25rem',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '0.85rem'
        }}>
          {feedback.message}
        </div>
      )}

      {/* Wireshark Packet Capture Table */}
      <div style={{
        background: '#050811',
        border: '1px solid rgba(0, 243, 255, 0.2)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{
          background: '#090e1a',
          padding: '0.65rem 1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-mono)',
          color: '#94a3b8',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>PACKET STREAM LIST (Wireshark GUI)</span>
          <span>Filter: <code style={{ color: '#00f3ff' }}>all_packets</code></span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
            <thead>
              <tr style={{ background: '#0d1526', color: '#64748b', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <th style={{ padding: '0.65rem 1rem' }}>No.</th>
                <th style={{ padding: '0.65rem 1rem' }}>Time</th>
                <th style={{ padding: '0.65rem 1rem' }}>Source</th>
                <th style={{ padding: '0.65rem 1rem' }}>Destination</th>
                <th style={{ padding: '0.65rem 1rem' }}>Protocol</th>
                <th style={{ padding: '0.65rem 1rem' }}>Length</th>
                <th style={{ padding: '0.65rem 1rem' }}>Info</th>
              </tr>
            </thead>
            <tbody>
              {capture.packets.map((packet) => {
                const isSelected = packet.id === selectedPacketId;
                let protoColor = '#00f3ff';
                if (packet.protocol === 'HTTP') protoColor = '#00ff66';
                if (packet.protocol === 'ARP') protoColor = '#ffd166';
                if (packet.protocol === 'DNS') protoColor = '#9d4edd';

                return (
                  <tr
                    key={packet.id}
                    onClick={() => setSelectedPacketId(packet.id)}
                    style={{
                      background: isSelected ? 'rgba(0, 243, 255, 0.2)' : 'transparent',
                      color: isSelected ? '#ffffff' : '#cbd5e1',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <td style={{ padding: '0.6rem 1rem', color: isSelected ? '#00f3ff' : '#64748b' }}>{packet.id}</td>
                    <td style={{ padding: '0.6rem 1rem' }}>{packet.time}</td>
                    <td style={{ padding: '0.6rem 1rem' }}>{packet.source}</td>
                    <td style={{ padding: '0.6rem 1rem' }}>{packet.destination}</td>
                    <td style={{ padding: '0.6rem 1rem' }}>
                      <span style={{
                        background: `${protoColor}20`,
                        color: protoColor,
                        padding: '0.15rem 0.4rem',
                        borderRadius: '4px',
                        fontWeight: 700
                      }}>
                        {packet.protocol}
                      </span>
                    </td>
                    <td style={{ padding: '0.6rem 1rem' }}>{packet.length}</td>
                    <td style={{ padding: '0.6rem 1rem', color: packet.info.includes('MALICIOUS') || packet.info.includes('ANOMALY') ? '#ff3366' : 'inherit' }}>
                      {packet.info}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Packet Header & Payload Inspector View */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {/* Packet Header Tree */}
        <div className="cyber-card">
          <h4 style={{ fontSize: '0.95rem', color: '#00f3ff', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            ▸ PACKET #{activePacket.id} HEADER DETAILS
          </h4>
          <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#cbd5e1' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.5rem', borderRadius: '6px' }}>
              <span style={{ color: '#64748b' }}>[Frame]:</span> {activePacket.details.frame}
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.5rem', borderRadius: '6px' }}>
              <span style={{ color: '#64748b' }}>[Ethernet II]:</span> {activePacket.details.ethernet}
            </div>
            {activePacket.details.ip && (
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.5rem', borderRadius: '6px' }}>
                <span style={{ color: '#64748b' }}>[IPv4 Header]:</span> {activePacket.details.ip}
              </div>
            )}
            {activePacket.details.tcp && (
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.5rem', borderRadius: '6px' }}>
                <span style={{ color: '#64748b' }}>[TCP Segment]:</span> {activePacket.details.tcp}
              </div>
            )}
            {activePacket.details.arp && (
              <div style={{ background: 'rgba(255, 209, 102, 0.1)', border: '1px solid rgba(255, 209, 102, 0.3)', padding: '0.5rem', borderRadius: '6px', color: '#ffd166' }}>
                <span>[ARP Header]:</span> {activePacket.details.arp}
              </div>
            )}
            {activePacket.details.dns && (
              <div style={{ background: 'rgba(157, 78, 221, 0.1)', border: '1px solid rgba(157, 78, 221, 0.3)', padding: '0.5rem', borderRadius: '6px', color: '#c879ff' }}>
                <span>[DNS Record]:</span> {activePacket.details.dns}
              </div>
            )}
          </div>
        </div>

        {/* Data Payload Hex/ASCII View */}
        <div className="cyber-card" style={{ background: '#050811' }}>
          <h4 style={{ fontSize: '0.95rem', color: '#00ff66', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            ▸ DATA PAYLOAD INSPECTOR (ASCII STREAM)
          </h4>
          <div style={{
            background: '#090e1a',
            border: '1px solid rgba(0, 255, 102, 0.2)',
            padding: '1rem',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: '#00ff66',
            minHeight: '160px',
            wordBreak: 'break-all',
            lineHeight: 1.6
          }}>
            {activePacket.details.payload || activePacket.details.http || 'No raw payload data present in header segment.'}
          </div>
        </div>
      </div>
    </div>
  );
}
