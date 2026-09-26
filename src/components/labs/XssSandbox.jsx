import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, Code, Eye, RefreshCw } from 'lucide-react';

export default function XssSandbox() {
  const [payloadInput, setPayloadInput] = useState("<script>alert('XSS_Vulnerability_Triggered')</script>");

  const escapeHtml = (str) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  return (
    <div className="cyber-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span className="badge badge-red" style={{ marginBottom: '0.35rem' }}>Web Security Sandbox</span>
          <h3 style={{ fontSize: '1.35rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle color="#ff3366" size={22} /> Cross-Site Scripting (XSS) Playground
          </h3>
        </div>
        <span className="badge badge-green">Educational Safe Sandbox</span>
      </div>

      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Cross-Site Scripting occurs when web applications insert untrusted user input directly into the DOM without sanitization or HTML entity encoding.
      </p>

      {/* Input Field */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.4rem' }}>
          Test XSS Payload Input:
        </label>
        <input
          type="text"
          value={payloadInput}
          onChange={(e) => setPayloadInput(e.target.value)}
          style={{
            background: '#050811',
            border: '1px solid rgba(255, 51, 102, 0.4)',
            color: '#ff3366',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            padding: '0.65rem 0.85rem',
            borderRadius: '8px',
            width: '100%',
            outline: 'none'
          }}
        />
      </div>

      {/* Side-by-Side Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Vulnerable Unsanitized DOM Rendering */}
        <div style={{ background: 'rgba(255, 51, 102, 0.08)', border: '1px solid rgba(255, 51, 102, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
          <div style={{ color: '#ff3366', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <AlertTriangle size={16} /> VULNERABLE DOM INNERHTML
          </div>
          <div style={{
            background: '#050811',
            border: '1px solid rgba(255, 51, 102, 0.3)',
            padding: '0.85rem',
            borderRadius: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            color: '#ff3366',
            minHeight: '80px',
            wordBreak: 'break-all'
          }}>
            {payloadInput}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.75rem' }}>
            ⚠️ Executing raw input inside element innerHTML allows malicious script tags to execute JavaScript in the victim session context.
          </div>
        </div>

        {/* Safe Sanitized HTML Entity Encoded Rendering */}
        <div style={{ background: 'rgba(0, 255, 102, 0.08)', border: '1px solid rgba(0, 255, 102, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
          <div style={{ color: '#00ff66', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={16} /> SAFE HTML ENTITY ESCAPED
          </div>
          <div style={{
            background: '#050811',
            border: '1px solid rgba(0, 255, 102, 0.3)',
            padding: '0.85rem',
            borderRadius: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            color: '#00ff66',
            minHeight: '80px',
            wordBreak: 'break-all'
          }}>
            {escapeHtml(payloadInput)}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.75rem' }}>
            ✅ HTML entity escaping converts angle brackets to entity codes, forcing the browser to render text harmlessly.
          </div>
        </div>
      </div>
    </div>
  );
}
