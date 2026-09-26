import React, { useState } from 'react';
import PageHeader from '../layout/PageHeader';
import EncryptionSandbox from '../labs/EncryptionSandbox';
import { 
  Key, ShieldCheck, Search, Copy, Check, Info, AlertTriangle, 
  Terminal, Lock, Unlock, Eye, RefreshCw, Cpu, Code, Radio, Shield 
} from 'lucide-react';

export default function ToolsPage() {
  const [activeToolTab, setActiveToolTab] = useState('generator');

  // Password Generator State
  const [passLength, setPassLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('C7#kL9$mP2!vQ8@x');
  const [copiedPass, setCopiedPass] = useState(false);

  // Password Checker State
  const [checkPasswordInput, setCheckPasswordInput] = useState('P@ssword123');

  // URL Phishing Checker State
  const [urlInput, setUrlInput] = useState('http://login-cyberverse-update.security-verify-net.com/auth');

  // Generate Password Helper
  const handleGeneratePassword = () => {
    let charset = '';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz0123456789';

    let pass = '';
    const array = new Uint32Array(passLength);
    crypto.getRandomValues(array);
    for (let i = 0; i < passLength; i++) {
      pass += charset[array[i] % charset.length];
    }
    setGeneratedPassword(pass);
  };

  const handleCopyPass = () => {
    navigator.clipboard.writeText(generatedPassword);
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2000);
  };

  // Password Strength Calculation Helper
  const calcPasswordMetrics = (pass) => {
    let poolSize = 0;
    if (/[a-z]/.test(pass)) poolSize += 26;
    if (/[A-Z]/.test(pass)) poolSize += 26;
    if (/[0-9]/.test(pass)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(pass)) poolSize += 32;

    if (poolSize === 0) poolSize = 26;

    const entropyBits = Math.round(pass.length * Math.log2(poolSize));
    let strengthLabel = 'Weak';
    let strengthColor = '#ff3366';
    let crackTime = 'Instant (under 1 second)';

    if (entropyBits > 80) {
      strengthLabel = 'Ultra-Secure';
      strengthColor = '#00ff66';
      crackTime = '4.2 Trillion Years';
    } else if (entropyBits > 60) {
      strengthLabel = 'Strong';
      strengthColor = '#00f3ff';
      crackTime = '120 Years';
    } else if (entropyBits > 40) {
      strengthLabel = 'Medium';
      strengthColor = '#ffd166';
      crackTime = '3 Days';
    }

    return { poolSize, entropyBits, strengthLabel, strengthColor, crackTime };
  };

  // Advanced URL Phishing Threat Detection Engine
  const calcUrlPhishing = (urlStr) => {
    if (!urlStr || !urlStr.trim()) {
      return {
        indicators: ['Please enter a URL string to inspect.'],
        riskLevel: 'ENTER TARGET URL',
        riskColor: '#94a3b8',
        score: 0
      };
    }

    const indicators = [];
    let score = 0;
    const cleanUrl = urlStr.trim();

    try {
      const hasProtocol = cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://');
      const fullUrlStr = hasProtocol ? cleanUrl : 'http://' + cleanUrl;
      const parsed = new URL(fullUrlStr);
      const host = parsed.hostname.toLowerCase();

      // 1. Missing HTTPS Protocol Check
      if (!hasProtocol || parsed.protocol === 'http:') {
        indicators.push('Missing HTTPS TLS Encryption (Transmits credentials in unencrypted plaintext)');
        score += 25;
      }

      // 2. Credential Obfuscation Check (@ Symbol)
      if (cleanUrl.includes('@')) {
        indicators.push('Credential Obfuscation Detected (@ symbol forces browser to treat prefix as basic auth)');
        score += 35;
      }

      // 3. Raw IP Hostname Check
      if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(host)) {
        indicators.push('Uses Raw IP Address Hostname instead of Registered Domain Name');
        score += 30;
      }

      // 4. Excessive Subdomain Layering
      const domainParts = host.split('.');
      if (domainParts.length > 3) {
        indicators.push(`Excessive Subdomain Obfuscation (${domainParts.length - 2} subdomain layers detected)`);
        score += 25;
      }

      // 5. High-Risk Suspicious TLDs
      const suspiciousTLDs = ['.xyz', '.top', '.tk', '.ml', '.ga', '.cf', '.gq', '.zip', '.club', '.work', '.site', '.online', '.biz', '.info', '.cc'];
      const matchedTLD = suspiciousTLDs.find(tld => host.endsWith(tld));
      if (matchedTLD) {
        indicators.push(`High-Risk Top-Level Domain Extension (${matchedTLD} commonly abused in phishing spam)`);
        score += 30;
      }

      // 6. Multiple Hyphens in Hostname (Domain Spoofing)
      const hyphenCount = (host.match(/-/g) || []).length;
      if (hyphenCount >= 2) {
        indicators.push(`Excessive Domain Hyphenation (${hyphenCount} hyphens used to mimic legitimate brands)`);
        score += 20;
      }

      // 7. High-Target Phishing Keywords in Subdomain or Hostname
      const targetKeywords = ['login', 'verify', 'account', 'banking', 'secure', 'update', 'signin', 'auth', 'support', 'wallet', 'paypal', 'google', 'microsoft', 'apple', 'amazon', 'facebook', 'meta', 'netflix', 'security'];
      const foundKeywords = targetKeywords.filter(kw => host.includes(kw));
      if (foundKeywords.length > 0) {
        indicators.push(`Contains High-Target Brand/Phishing Keyword: [${foundKeywords.join(', ')}]`);
        score += 25;
      }

      // 8. Typosquatting / Character Substitution (Leetspeak: 0, 1, 3, 5, @)
      if (/[0135]/.test(host) && (host.includes('g00gle') || host.includes('paypa1') || host.includes('micros0ft') || host.includes('cyb3r'))) {
        indicators.push('Typosquatting Character Substitution (Replaces letters with lookalike numbers)');
        score += 35;
      }

      // 9. Non-Standard Web Ports
      if (parsed.port && !['80', '443'].includes(parsed.port)) {
        indicators.push(`Non-Standard Web Port Connection (Port :${parsed.port})`);
        score += 15;
      }

      // Calculate Final Risk Classification
      let riskLevel = 'SAFE / LOW RISK';
      let riskColor = '#00ff66';

      if (score >= 60) {
        riskLevel = `HIGH CRITICAL PHISHING RISK (${score}% THREAT SCORE)`;
        riskColor = '#ff3366';
      } else if (score >= 25) {
        riskLevel = `SUSPICIOUS POTENTIAL PHISHING (${score}% THREAT SCORE)`;
        riskColor = '#ffd166';
      } else if (score > 0) {
        riskLevel = `MINOR ANOMALIES DETECTED (${score}% THREAT SCORE)`;
        riskColor = '#00f3ff';
      }

      return { indicators, riskLevel, riskColor, score };
    } catch (e) {
      return {
        indicators: ['Invalid URL Syntax: String cannot be parsed as a valid web address.'],
        riskLevel: 'INVALID URL SYNTAX',
        riskColor: '#ff3366',
        score: 100
      };
    }
  };

  const passMetrics = calcPasswordMetrics(checkPasswordInput);
  const urlMetrics = calcUrlPhishing(urlInput);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <PageHeader
        title="Security Tools Suite & Interactive Inspectors"
        description="Password Generator, Password Strength Evaluator, URL Phishing Inspector, and Encryption Engine with side-by-side educational explanations."
        badgeText="SECURITY TOOLS SUITE"
        badgeColor="badge-cyan"
      />

      {/* Tool Navigation Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveToolTab('generator')}
          className={activeToolTab === 'generator' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <Key size={16} /> Secure Password Generator
        </button>
        <button
          onClick={() => setActiveToolTab('checker')}
          className={activeToolTab === 'checker' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <ShieldCheck size={16} /> Password Strength Checker
        </button>
        <button
          onClick={() => setActiveToolTab('url')}
          className={activeToolTab === 'url' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <Search size={16} /> URL Phishing Inspector
        </button>
        <button
          onClick={() => setActiveToolTab('wifi')}
          className={activeToolTab === 'wifi' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <Radio size={16} /> Wi-Fi WPA2/WPA3 Simulator
        </button>
        <button
          onClick={() => setActiveToolTab('crypto')}
          className={activeToolTab === 'crypto' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <Code size={16} /> Real Encryption Engine
        </button>
      </div>

      {/* 1. PASSWORD GENERATOR TOOL WITH SIDE-BY-SIDE EDUCATIONAL EXPLANATION */}
      {activeToolTab === 'generator' && (
        <div className="grid-2col-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* TOOL PANEL */}
          <div className="cyber-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#00f3ff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Key size={20} /> Cryptographic Password Generator
            </h3>

            {/* Generated Output */}
            <div style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.3)', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Generated Secure String:</span>
                <button onClick={handleCopyPass} className="btn-cyber-ghost" style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}>
                  {copiedPass ? <Check size={14} color="#00ff66" /> : <Copy size={14} />} {copiedPass ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div style={{ color: '#00ff66', fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 700, wordBreak: 'break-all' }}>
                {generatedPassword}
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                  Password Length ({passLength} Characters):
                </label>
                <input
                  type="range"
                  min="8"
                  max="64"
                  value={passLength}
                  onChange={(e) => setPassLength(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#00f3ff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} /> Uppercase (A-Z)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={includeLower} onChange={(e) => setIncludeLower(e.target.checked)} /> Lowercase (a-z)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} /> Numbers (0-9)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} /> Special Symbols (!@#$)
                </label>
              </div>
            </div>

            <button onClick={handleGeneratePassword} className="btn-cyber-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <RefreshCw size={16} /> Generate New Password
            </button>
          </div>

          {/* SIDE-BY-SIDE EDUCATIONAL EXPLANATION */}
          <div className="cyber-card cyber-card-glow-cyan" style={{ borderLeft: '4px solid #00f3ff', padding: '1.75rem' }}>
            <h4 style={{ fontSize: '1.05rem', color: '#00f3ff', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Info size={18} /> How Password Generation Works
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Password strength relies mathematically on <strong>Character Space Pool ($R$)</strong> and <strong>Length ($L$)</strong>:
            </p>
            <div style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.25)', padding: '0.85rem', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.83rem', color: '#00ff66', marginBottom: '1rem' }}>
              Entropy Bits Formula: E = L × log₂(R)
            </div>
            <ul style={{ paddingLeft: '1.25rem', color: '#94a3b8', fontSize: '0.83rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>Pseudo-Random RNG:</strong> Uses browser <code style={{ color: '#00f3ff' }}>crypto.getRandomValues()</code> for uniform randomness.</li>
              <li><strong>Length Dominance:</strong> Increasing password length by 4 characters expands search complexity exponentially more than adding special symbols to a short password.</li>
            </ul>
          </div>
        </div>
      )}

      {/* 2. PASSWORD STRENGTH CHECKER WITH SIDE-BY-SIDE EXPLANATION */}
      {activeToolTab === 'checker' && (
        <div className="grid-2col-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* TOOL PANEL */}
          <div className="cyber-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#00ff66', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} color="#00ff66" /> Password Strength & Entropy Evaluator
            </h3>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                Test Password String:
              </label>
              <input
                type="text"
                value={checkPasswordInput}
                onChange={(e) => setCheckPasswordInput(e.target.value)}
                style={{ background: '#050811', border: '1px solid rgba(0, 255, 102, 0.3)', color: '#ffffff', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', padding: '0.65rem', borderRadius: '8px', width: '100%', outline: 'none' }}
              />
            </div>

            {/* Metrics Display */}
            <div style={{ background: '#050811', border: `1px solid ${passMetrics.strengthColor}`, padding: '1rem', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Strength Rating:</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: passMetrics.strengthColor, fontFamily: 'var(--font-mono)' }}>
                  {passMetrics.strengthLabel} ({passMetrics.entropyBits} Bits)
                </span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#cbd5e1', fontFamily: 'var(--font-mono)' }}>
                Estimated Brute-Force Crack Time: <strong style={{ color: passMetrics.strengthColor }}>{passMetrics.crackTime}</strong>
              </div>
            </div>
          </div>

          {/* SIDE-BY-SIDE EXPLANATION */}
          <div className="cyber-card cyber-card-glow-green" style={{ borderLeft: '4px solid #00ff66', padding: '1.75rem' }}>
            <h4 style={{ fontSize: '1.05rem', color: '#00ff66', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Info size={18} /> How Password Cracking Tools Work
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Attackers use automated tools (such as <strong>Hashcat</strong> and <strong>John the Ripper</strong>) to execute dictionary and brute-force attacks:
            </p>
            <ul style={{ paddingLeft: '1.25rem', color: '#94a3b8', fontSize: '0.83rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>Dictionary Attacks:</strong> Test millions of common words and known leaked password lists (e.g. `rockyou.txt`).</li>
              <li><strong>Salting Protection:</strong> Adding random salt strings (`SHA-256(Password + Salt)`) prevents pre-computed rainbow table lookups.</li>
            </ul>
          </div>
        </div>
      )}

      {/* 3. URL PHISHING INSPECTOR WITH SIDE-BY-SIDE EXPLANATION */}
      {activeToolTab === 'url' && (
        <div className="grid-2col-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* TOOL PANEL */}
          <div className="cyber-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#ffd166', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Search size={20} color="#ffd166" /> URL Phishing Safety Inspector
            </h3>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                Test Target URL string:
              </label>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="e.g. http://paypal-security-update.com/login"
                style={{ background: '#050811', border: '1px solid rgba(255, 209, 102, 0.4)', color: '#ffffff', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', padding: '0.65rem', borderRadius: '8px', width: '100%', outline: 'none' }}
              />
            </div>

            {/* Quick Presets for Student Testing */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.35rem' }}>Test Sample Phishing URLs:</div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <button onClick={() => setUrlInput('http://login-cyberverse-update.security-verify-net.com/auth')} className="btn-cyber-ghost" style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem' }}>
                  Phishing Subdomains
                </button>
                <button onClick={() => setUrlInput('http://192.168.1.105:8080/bank/login')} className="btn-cyber-ghost" style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem' }}>
                  Raw IP & Port
                </button>
                <button onClick={() => setUrlInput('https://google.com@attacker-controlled.xyz/login')} className="btn-cyber-ghost" style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem' }}>
                  Credential Obfuscation (@)
                </button>
                <button onClick={() => setUrlInput('https://cyberverse.edu')} className="btn-cyber-ghost" style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem', color: '#00ff66', borderColor: 'rgba(0, 255, 102, 0.3)' }}>
                  Safe HTTPS Site
                </button>
              </div>
            </div>

            {/* Metrics & Risk Meter */}
            <div style={{ background: '#050811', border: `1px solid ${urlMetrics.riskColor}`, padding: '1.1rem', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: urlMetrics.riskColor, fontFamily: 'var(--font-mono)' }}>
                  {urlMetrics.riskLevel}
                </div>
                <div style={{ fontSize: '0.8rem', color: urlMetrics.riskColor, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {urlMetrics.score}% Threat Level
                </div>
              </div>

              {/* Progress Bar Score Visualizer */}
              <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.85rem' }}>
                <div style={{ width: `${Math.min(100, Math.max(5, urlMetrics.score))}%`, height: '100%', background: urlMetrics.riskColor, transition: 'width 0.3s ease' }} />
              </div>

              {urlMetrics.indicators.length > 0 ? (
                <ul style={{ paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {urlMetrics.indicators.map((ind, idx) => (
                    <li key={idx} style={{ color: urlMetrics.score >= 50 ? '#ff3366' : '#ffd166' }}>{ind}</li>
                  ))}
                </ul>
              ) : (
                <div style={{ color: '#00ff66', fontSize: '0.82rem' }}>✅ No immediate high-risk domain anomalies detected in URL string.</div>
              )}
            </div>
          </div>

          {/* SIDE-BY-SIDE EXPLANATION */}
          <div className="cyber-card" style={{ borderLeft: '4px solid #ffd166', padding: '1.75rem' }}>
            <h4 style={{ fontSize: '1.05rem', color: '#ffd166', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Info size={18} /> How Phishing Domain Spoofing Works
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Phishing attackers register deceptive domains designed to trick users into revealing login credentials:
            </p>
            <ul style={{ paddingLeft: '1.25rem', color: '#94a3b8', fontSize: '0.83rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>Typosquatting:</strong> Registering slight misspellings (e.g., `cyb3rverse.com` vs `cyberverse.com`).</li>
              <li><strong>Subdomain Spoofing:</strong> Placing legitimate brand names in subdomains (e.g., `cyberverse.com.attacker-controlled.net`).</li>
              <li><strong>Credential Obfuscation:</strong> Using `@` symbols (`http://google.com@attacker.com`) to hide destination hosts.</li>
              <li><strong>Missing TLS/HTTPS:</strong> Unencrypted HTTP connections vulnerable to credential interception.</li>
            </ul>
          </div>
        </div>
      )}

      {/* 4. SIMULATED WI-FI WPA2/WPA3 HANDSHAKE MODULE */}
      {activeToolTab === 'wifi' && (
        <div className="grid-2col-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="cyber-card" style={{ padding: '1.75rem' }}>
            <span className="badge badge-purple" style={{ marginBottom: '0.35rem' }}>SIMULATED EDUCATIONAL MODULE</span>
            <h3 style={{ fontSize: '1.25rem', color: '#c879ff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Radio size={20} color="#c879ff" /> WPA2 4-Way Handshake & WPA3 SAE Mechanics
            </h3>

            <div style={{ background: '#050811', border: '1px solid rgba(200, 121, 255, 0.3)', padding: '1rem', borderRadius: '8px', fontSize: '0.83rem', fontFamily: 'var(--font-mono)' }}>
              <div style={{ color: '#c879ff', fontWeight: 700, marginBottom: '0.4rem' }}>[+] 4-WAY HANDSHAKE STREAM (Static Mock Data):</div>
              <div style={{ color: '#cbd5e1' }}>Msg 1: Access Point → Client (ANonce)</div>
              <div style={{ color: '#cbd5e1' }}>Msg 2: Client → Access Point (SNonce + MIC)</div>
              <div style={{ color: '#cbd5e1' }}>Msg 3: Access Point → Client (GTK + MIC)</div>
              <div style={{ color: '#00ff66', marginTop: '0.4rem' }}>Msg 4: Client → Access Point (ACK Connection Established)</div>
            </div>
          </div>

          <div className="cyber-card" style={{ borderLeft: '4px solid #c879ff', padding: '1.75rem' }}>
            <h4 style={{ fontSize: '1.05rem', color: '#c879ff', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Info size={18} /> Theoretical Wi-Fi Security & Defenses
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              WPA2 Pre-Shared Key (PSK) handshakes are vulnerable to offline dictionary attacks if weak passphrases are used.
            </p>
            <ul style={{ paddingLeft: '1.25rem', color: '#94a3b8', fontSize: '0.83rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>WPA3 SAE Defense:</strong> Simultaneous Authentication of Equals (SAE) prevents offline dictionary attacks.</li>
              <li><strong>Defensive Best Practice:</strong> Enforce 16+ character passphrases or WPA3-Enterprise 802.1X EAP authentication.</li>
            </ul>
          </div>
        </div>
      )}

      {/* 5. REAL ENCRYPTION ENGINE */}
      {activeToolTab === 'crypto' && <EncryptionSandbox />}
    </div>
  );
}
