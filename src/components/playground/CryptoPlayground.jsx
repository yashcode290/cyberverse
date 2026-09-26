import React, { useState, useEffect } from 'react';
import PageHeader from '../layout/PageHeader';
import { 
  Key, Lock, Unlock, FileCheck, Copy, Check, Info, ShieldCheck, 
  RefreshCw, Code, ArrowRight, HelpCircle, AlertTriangle 
} from 'lucide-react';

export default function CryptoPlayground() {
  const [activeTab, setActiveTab] = useState('hashing');

  // Encoding State
  const [encodeInput, setEncodeInput] = useState('CyberVerse{Crypto_Flag_2026}');
  const [base64Result, setBase64Result] = useState('');
  const [copiedEncode, setCopiedEncode] = useState(false);

  // Hashing State (Real Web Crypto API)
  const [hashInput, setHashInput] = useState('CyberVerse Student Practical Training 2026');
  const [sha256Hash, setSha256Hash] = useState('');
  const [sha512Hash, setSha512Hash] = useState('');

  // File Integrity Checker Mini-Project State
  const [fileContent, setFileContent] = useState('server_admin=root\nallow_ssh=true\nport=22\nauth_mode=key');
  const [fileHash, setFileHash] = useState('');

  // Symmetric / Asymmetric State
  const [symSecretKey, setSymSecretKey] = useState('CyberSecretKey2026');
  const [symEncrypted, setSymEncrypted] = useState(false);

  // Digital Signature State
  const [sigMessage, setSigMessage] = useState('Authorize Transfer of $5,000 to Account #1042');
  const [isSigned, setIsSigned] = useState(false);
  const [isTampered, setIsTampered] = useState(false);

  // Challenge Answers State
  const [ans, setAns] = useState({});
  const [results, setResults] = useState({});

  // Web Crypto API Real Hashing Helper
  const computeHash = async (str, algo) => {
    try {
      const buffer = new TextEncoder().encode(str);
      const hashBuffer = await crypto.subtle.digest(algo, buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      return 'Crypto API not supported';
    }
  };

  useEffect(() => {
    // Base64
    try {
      setBase64Result(btoa(encodeInput));
    } catch (e) {
      setBase64Result('Invalid Base64 input');
    }
  }, [encodeInput]);

  useEffect(() => {
    // Real Hashing
    computeHash(hashInput, 'SHA-256').then(setSha256Hash);
    computeHash(hashInput, 'SHA-512').then(setSha512Hash);
  }, [hashInput]);

  useEffect(() => {
    // File Integrity Hashing
    computeHash(fileContent, 'SHA-256').then(setFileHash);
  }, [fileContent]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedEncode(true);
    setTimeout(() => setCopiedEncode(false), 2000);
  };

  const handleCheckChallenge = (id, correct) => {
    const val = (ans[id] || '').trim();
    if (val.toLowerCase() === correct.toLowerCase()) {
      setResults({ ...results, [id]: { success: true, msg: 'Correct answer!' } });
    } else {
      setResults({ ...results, [id]: { success: false, msg: 'Incorrect. Check hints!' } });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <PageHeader
        title="Interactive Cryptography & Hashing Playground"
        description="Learn Hashing, Base64 Encoding, Symmetric/Asymmetric Ciphers, and Digital Signatures with real Web Crypto API digests."
        badgeText="EDUCATIONAL CRYPTO SANDBOX"
        badgeColor="badge-purple"
      />

      {/* Navigation Section Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('hashing')}
          className={activeTab === 'hashing' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <Key size={16} /> Hashing (SHA-256)
        </button>
        <button
          onClick={() => setActiveTab('encoding')}
          className={activeTab === 'encoding' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <Code size={16} /> Encoding (Base64)
        </button>
        <button
          onClick={() => setActiveTab('symmetric')}
          className={activeTab === 'symmetric' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <Lock size={16} /> Symmetric (AES)
        </button>
        <button
          onClick={() => setActiveTab('asymmetric')}
          className={activeTab === 'asymmetric' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <Unlock size={16} /> Asymmetric (RSA/ECC)
        </button>
        <button
          onClick={() => setActiveTab('signature')}
          className={activeTab === 'signature' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <ShieldCheck size={16} /> Digital Signatures
        </button>
        <button
          onClick={() => setActiveTab('integrity')}
          className={activeTab === 'integrity' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <FileCheck size={16} /> File Integrity Project
        </button>
      </div>

      {/* 1. HASHING SECTION (REAL WEB CRYPTO API) */}
      {activeTab === 'hashing' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="cyber-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#00f3ff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Key color="#00f3ff" size={20} /> Cryptographic Hashing Engine (SHA-256 / SHA-512)
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Enter any string to compute real-time 256-bit and 512-bit cryptographic hash digests locally in your browser.
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.4rem' }}>
                Text Input for Hashing:
              </label>
              <textarea
                rows={3}
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                style={{
                  background: '#050811',
                  border: '1px solid rgba(0, 243, 255, 0.3)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  width: '100%',
                  outline: 'none'
                }}
              />
            </div>

            {/* Generated Hashes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* SHA-256 */}
              <div style={{ background: 'rgba(0, 255, 102, 0.08)', border: '1px solid rgba(0, 255, 102, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
                <div style={{ color: '#00ff66', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                  SHA-256 DIGEST (256 bits / 64 hex characters):
                </div>
                <div style={{ background: '#050811', border: '1px solid rgba(0, 255, 102, 0.3)', padding: '0.75rem', borderRadius: '6px', color: '#00ff66', fontFamily: 'var(--font-mono)', fontSize: '0.83rem', wordBreak: 'break-all' }}>
                  {sha256Hash}
                </div>
              </div>

              {/* SHA-512 */}
              <div style={{ background: 'rgba(157, 78, 221, 0.08)', border: '1px solid rgba(157, 78, 221, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
                <div style={{ color: '#c879ff', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                  SHA-512 DIGEST (512 bits / 128 hex characters):
                </div>
                <div style={{ background: '#050811', border: '1px solid rgba(157, 78, 221, 0.3)', padding: '0.75rem', borderRadius: '6px', color: '#c879ff', fontFamily: 'var(--font-mono)', fontSize: '0.83rem', wordBreak: 'break-all' }}>
                  {sha512Hash}
                </div>
              </div>
            </div>
          </div>

          {/* EDUCATIONAL EXPLANATION */}
          <div className="cyber-card cyber-card-glow-cyan" style={{ borderLeft: '4px solid #00f3ff' }}>
            <h4 style={{ fontSize: '1rem', color: '#00f3ff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Info size={18} /> Important Concept: Hashing is NOT Encryption!
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Unlike encryption, <strong>hashing is a one-way mathematical function</strong>. It converts data of any size into a fixed-length fingerprint. You cannot "decrypt" a hash back to its original plaintext; it can only be verified by hashing input again and comparing.
            </p>
          </div>
        </div>
      )}

      {/* 2. ENCODING SECTION (BASE64) */}
      {activeTab === 'encoding' && (
        <div className="cyber-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#00ff66', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Code color="#00ff66" size={20} /> Base64 Data Encoding
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Base64 converts binary data into 64 printable ASCII characters for safe web transmission. Base64 is NOT encryption!
          </p>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.4rem' }}>
              Input Text:
            </label>
            <input
              type="text"
              value={encodeInput}
              onChange={(e) => setEncodeInput(e.target.value)}
              style={{ background: '#050811', border: '1px solid rgba(0, 255, 102, 0.3)', color: '#ffffff', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', padding: '0.65rem 0.85rem', borderRadius: '8px', width: '100%', outline: 'none' }}
            />
          </div>

          <div style={{ background: '#050811', border: '1px solid rgba(0, 255, 102, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#00ff66', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>Base64 Result:</span>
              <button onClick={() => handleCopy(base64Result)} className="btn-cyber-ghost" style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}>
                {copiedEncode ? <Check size={14} color="#00ff66" /> : <Copy size={14} />} {copiedEncode ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div style={{ color: '#00ff66', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', wordBreak: 'break-all' }}>
              {base64Result}
            </div>
          </div>
        </div>
      )}

      {/* 3. SYMMETRIC ENCRYPTION (AES) */}
      {activeTab === 'symmetric' && (
        <div className="cyber-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#ffd166', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock color="#ffd166" size={20} /> Symmetric Key Encryption (AES-256)
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Symmetric encryption uses <strong>one shared secret key</strong> to both encrypt plaintext and decrypt ciphertext.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ background: '#050811', border: '1px solid rgba(255, 209, 102, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.85rem', color: '#ffd166', fontWeight: 700, marginBottom: '0.5rem' }}>
                1. Shared Secret Key:
              </div>
              <input
                type="text"
                value={symSecretKey}
                onChange={(e) => setSymSecretKey(e.target.value)}
                style={{ background: '#090e1a', border: '1px solid rgba(255, 209, 102, 0.3)', color: '#ffffff', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', padding: '0.5rem', borderRadius: '6px', width: '100%', outline: 'none' }}
              />

              <button
                onClick={() => setSymEncrypted(!symEncrypted)}
                className="btn-cyber-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', background: 'linear-gradient(135deg, #ffd166 0%, #d4a300 100%)', color: '#050811', fontWeight: 700 }}
              >
                {symEncrypted ? 'Decrypt with Secret Key' : 'Encrypt with Secret Key'}
              </button>
            </div>

            <div style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.85rem', color: '#00f3ff', fontWeight: 700, marginBottom: '0.5rem' }}>
                2. Output Data State:
              </div>
              <div style={{ color: symEncrypted ? '#ff3366' : '#00ff66', fontFamily: 'var(--font-mono)', fontSize: '0.88rem', wordBreak: 'break-all', minHeight: '80px', background: '#090e1a', padding: '0.75rem', borderRadius: '6px' }}>
                {symEncrypted ? 'U2FsdGVkX19k9F8+aBv... (AES Ciphertext)' : 'Plaintext: Secret Confidential Data Stream'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. ASYMMETRIC ENCRYPTION (RSA/ECC) */}
      {activeTab === 'asymmetric' && (
        <div className="cyber-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#c879ff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Unlock color="#c879ff" size={20} /> Asymmetric Public/Private Key Pairs (RSA / ECC)
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Asymmetric cryptography uses a mathematically linked key pair: a <strong>Public Key</strong> (shared freely to encrypt) and a <strong>Private Key</strong> (kept secret to decrypt).
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', textAlign: 'center' }}>
            <div style={{ background: 'rgba(0, 243, 255, 0.08)', border: '1px solid rgba(0, 243, 255, 0.3)', padding: '1.5rem', borderRadius: '12px' }}>
              <Key size={32} color="#00f3ff" style={{ margin: '0 auto 0.5rem auto' }} />
              <h4 style={{ fontSize: '1.1rem', color: '#00f3ff', marginBottom: '0.35rem' }}>Sender (Alice) Uses Bob's Public Key</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Encrypts message for Bob. Anyone can see the Public Key, but only Bob can decrypt.</p>
            </div>

            <div style={{ background: 'rgba(157, 78, 221, 0.08)', border: '1px solid rgba(157, 78, 221, 0.3)', padding: '1.5rem', borderRadius: '12px' }}>
              <Lock size={32} color="#c879ff" style={{ margin: '0 auto 0.5rem auto' }} />
              <h4 style={{ fontSize: '1.1rem', color: '#c879ff', marginBottom: '0.35rem' }}>Receiver (Bob) Uses His Private Key</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Decrypts the ciphertext. Private key is never shared over the network!</p>
            </div>
          </div>
        </div>
      )}

      {/* 5. DIGITAL SIGNATURES */}
      {activeTab === 'signature' && (
        <div className="cyber-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#00ff66', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck color="#00ff66" size={20} /> Digital Signature Verification Pipeline
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Digital signatures provide <strong>Authenticity</strong>, <strong>Integrity</strong>, and <strong>Non-Repudiation</strong> by signing a message hash with the sender's Private Key.
          </p>

          <div style={{ background: '#050811', border: '1px solid rgba(0, 255, 102, 0.3)', padding: '1.25rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#00ff66', fontWeight: 700 }}>1. Message Payload:</span>
              <button
                onClick={() => setIsTampered(!isTampered)}
                className="btn-cyber-ghost"
                style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem', color: isTampered ? '#ff3366' : '#94a3b8' }}
              >
                {isTampered ? 'Revert Tamper' : 'Simulate Attacker Tampering'}
              </button>
            </div>
            <div style={{ color: isTampered ? '#ff3366' : '#ffffff', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', padding: '0.5rem', background: '#090e1a', borderRadius: '6px' }}>
              {isTampered ? 'Authorize Transfer of $500,000 to Account #6666 [TAMPERED]' : sigMessage}
            </div>
          </div>

          <div style={{
            background: isTampered ? 'rgba(255, 51, 102, 0.12)' : 'rgba(0, 255, 102, 0.12)',
            border: `1px solid ${isTampered ? '#ff3366' : '#00ff66'}`,
            padding: '1rem 1.25rem',
            borderRadius: '10px',
            color: isTampered ? '#ff3366' : '#00ff66',
            fontWeight: 700,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {isTampered ? (
              <><AlertTriangle size={20} /> SIGNATURE VERIFICATION FAILED: Message content altered after signing!</>
            ) : (
              <><ShieldCheck size={20} /> SIGNATURE VERIFIED VALID: Message authenticity and integrity confirmed.</>
            )}
          </div>
        </div>
      )}

      {/* 6. FILE INTEGRITY CHECKER MINI-PROJECT */}
      {activeTab === 'integrity' && (
        <div className="cyber-card cyber-card-glow-cyan" style={{ padding: '2rem' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>MINI-PROJECT</span>
          <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileCheck color="#00f3ff" size={22} /> File Integrity Checker (Avalanche Effect)
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Edit the simulated configuration file below. Notice how modifying even a single character changes the entire 64-character SHA-256 hash!
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.4rem' }}>
                Simulated File Content (system_config.ini):
              </label>
              <textarea
                rows={6}
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                style={{
                  background: '#050811',
                  border: '1px solid rgba(0, 243, 255, 0.3)',
                  color: '#00ff66',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  width: '100%',
                  outline: 'none',
                  lineHeight: 1.5
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: '#00f3ff', fontWeight: 700, marginBottom: '0.4rem', fontFamily: 'var(--font-mono)' }}>
                Computed File SHA-256 Hash Baseline:
              </div>
              <div style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.4)', padding: '1rem', borderRadius: '8px', color: '#00f3ff', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', wordBreak: 'break-all' }}>
                {fileHash}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.75rem' }}>
                💡 <strong>Avalanche Effect:</strong> Security hash algorithms ensure any minor input change drastically alters output bits.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CRYPTOGRAPHY CHALLENGES */}
      <div className="cyber-card">
        <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HelpCircle color="#ffd166" size={20} /> Cryptography Challenges
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {/* Challenge 1 */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1rem', borderRadius: '8px' }}>
            <span className="badge badge-purple" style={{ marginBottom: '0.35rem' }}>Challenge 1</span>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
              Decode base64 string `Q0ZGX05FVF9QUk9UXzIwMjY=`
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Decoded string..."
                value={ans['c1'] || ''}
                onChange={(e) => setAns({ ...ans, c1: e.target.value })}
                style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.3)', color: '#00ff66', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', padding: '0.4rem', borderRadius: '4px', flex: 1 }}
              />
              <button onClick={() => handleCheckChallenge('c1', 'CTF_NET_PROT_2026')} className="btn-cyber-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}>
                Check
              </button>
            </div>
            {results['c1'] && (
              <div style={{ fontSize: '0.75rem', color: results['c1'].success ? '#00ff66' : '#ff3366', marginTop: '0.35rem' }}>
                {results['c1'].msg}
              </div>
            )}
          </div>

          {/* Challenge 2 */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1rem', borderRadius: '8px' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '0.35rem' }}>Challenge 2</span>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
              How many hex characters are in a SHA-256 hash string?
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="e.g. 64"
                value={ans['c2'] || ''}
                onChange={(e) => setAns({ ...ans, c2: e.target.value })}
                style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.3)', color: '#00ff66', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', padding: '0.4rem', borderRadius: '4px', flex: 1 }}
              />
              <button onClick={() => handleCheckChallenge('c2', '64')} className="btn-cyber-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}>
                Check
              </button>
            </div>
            {results['c2'] && (
              <div style={{ fontSize: '0.75rem', color: results['c2'].success ? '#00ff66' : '#ff3366', marginTop: '0.35rem' }}>
                {results['c2'].msg}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
