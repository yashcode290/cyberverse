import React from 'react';
import { Award, Shield, CheckCircle2, Printer, X } from 'lucide-react';

export default function CertificateModal({ isOpen, onClose, userXP }) {
  if (!isOpen) return null;

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const certId = `NSA-NETSEC-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(5, 8, 17, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1.5rem'
    }}>
      <div style={{
        background: '#0a0f1d',
        border: '2px solid #00f3ff',
        boxShadow: '0 0 50px rgba(0, 243, 255, 0.25)',
        borderRadius: '16px',
        maxWidth: '750px',
        width: '100%',
        padding: '2.5rem',
        position: 'relative',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer'
          }}
        >
          <X size={24} />
        </button>

        {/* Certificate Header */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Shield size={36} color="#00f3ff" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>NETSEC ACADEMY</h2>
        </div>

        <div style={{ fontSize: '0.85rem', color: '#00ff66', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 700 }}>
          CERTIFICATE OF ACADEMIC COMPLETION
        </div>

        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>This certifies that</p>

        <h1 style={{
          fontSize: '2.25rem',
          margin: '0.5rem 0 1rem 0',
          color: '#ffffff',
          fontFamily: 'var(--font-sans)',
          background: 'linear-gradient(135deg, #ffffff 0%, #00f3ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Network Security Student
        </h1>

        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', maxWidth: '550px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
          has successfully demonstrated proficiency in <strong>TCP/IP Protocol Stack Architecture</strong>, <strong>Wireshark Packet Forensics Inspection</strong>, and <strong>Nmap Port Scanning Security Operations</strong>.
        </p>

        {/* Certificate Details Footer */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '1.5rem',
          marginTop: '1.5rem',
          fontSize: '0.8rem',
          color: '#94a3b8'
        }}>
          <div>
            <div style={{ color: '#64748b', textTransform: 'uppercase', fontSize: '0.7rem' }}>ISSUE DATE</div>
            <div style={{ color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>{today}</div>
          </div>

          <div>
            <div style={{ color: '#64748b', textTransform: 'uppercase', fontSize: '0.7rem' }}>EARNED SCORE</div>
            <div style={{ color: '#00ff66', fontWeight: 700, marginTop: '2px' }}>{userXP} XP (VERIFIED)</div>
          </div>

          <div>
            <div style={{ color: '#64748b', textTransform: 'uppercase', fontSize: '0.7rem' }}>CERTIFICATE ID</div>
            <div style={{ color: '#00f3ff', fontFamily: 'var(--font-mono)', fontWeight: 600, marginTop: '2px' }}>{certId}</div>
          </div>
        </div>

        {/* Print / Close Actions */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button onClick={handlePrint} className="btn-cyber-primary">
            <Printer size={18} /> Print / Save PDF
          </button>
          <button onClick={onClose} className="btn-cyber-ghost">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
