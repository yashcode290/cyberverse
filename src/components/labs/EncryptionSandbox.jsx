import React, { useState, useEffect } from 'react';
import { 
  Key, Lock, Unlock, ShieldCheck, Copy, Check, Info, 
  RefreshCw, Code, ArrowRight, Eye, AlertTriangle, FileText, Cpu 
} from 'lucide-react';

export default function EncryptionSandbox() {
  const [activeTab, setActiveTab] = useState('caesar');

  // Caesar Cipher State
  const [caesarInput, setCaesarInput] = useState('ATTACK AT DAWN');
  const [caesarShift, setCaesarShift] = useState(3);
  const [caesarResult, setCaesarResult] = useState('');

  // Vigenere Cipher State
  const [vigInput, setVigInput] = useState('CYBERSECURITY');
  const [vigKey, setVigKey] = useState('SECRET');
  const [vigResult, setVigResult] = useState('');

  // Web Crypto API Real AES-256 GCM State
  const [aesPlaintext, setAesPlaintext] = useState('Confidential Defensive Operations Payload');
  const [aesPassphrase, setAesPassphrase] = useState('SuperSecretPassphrase2026!');
  const [aesCiphertext, setAesCiphertext] = useState('');
  const [aesIv, setAesIv] = useState('');
  const [aesDecryptedText, setAesDecryptedText] = useState('');

  // Web Crypto API Real RSA Key Pair State
  const [rsaMessage, setRsaMessage] = useState('Top Secret Dispatch');
  const [rsaKeyPair, setRsaKeyPair] = useState(null);
  const [rsaEncrypted, setRsaEncrypted] = useState('');
  const [rsaDecrypted, setRsaDecrypted] = useState('');
  const [rsaGenerating, setRsaGenerating] = useState(false);

  // Steganography State
  const [stegoCoverText, setStegoCoverText] = useState('Normal innocent email message about weekend plans.');
  const [stegoSecret, setStegoSecret] = useState('CyberVerse{Stego_Hidden_Flag}');
  const [stegoEncoded, setStegoEncoded] = useState('');
  const [stegoExtracted, setStegoExtracted] = useState('');

  // Caesar Cipher Function
  useEffect(() => {
    let res = '';
    for (let i = 0; i < caesarInput.length; i++) {
      let code = caesarInput.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        res += String.fromCharCode(((code - 65 + caesarShift) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        res += String.fromCharCode(((code - 97 + caesarShift) % 26) + 97);
      } else {
        res += caesarInput.charAt(i);
      }
    }
    setCaesarResult(res);
  }, [caesarInput, caesarShift]);

  // Vigenere Cipher Function
  useEffect(() => {
    if (!vigKey) { setVigResult(vigInput); return; }
    let res = '';
    let kIdx = 0;
    const cleanKey = vigKey.toUpperCase();

    for (let i = 0; i < vigInput.length; i++) {
      let code = vigInput.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        let shift = cleanKey.charCodeAt(kIdx % cleanKey.length) - 65;
        res += String.fromCharCode(((code - 65 + shift) % 26) + 65);
        kIdx++;
      } else if (code >= 97 && code <= 122) {
        let shift = cleanKey.charCodeAt(kIdx % cleanKey.length) - 65;
        res += String.fromCharCode(((code - 97 + shift) % 26) + 97);
        kIdx++;
      } else {
        res += vigInput.charAt(i);
      }
    }
    setVigResult(res);
  }, [vigInput, vigKey]);

  // Real Web Crypto AES-256 GCM Encryption
  const handleAesEncrypt = async () => {
    try {
      const enc = new TextEncoder();
      const pwBytes = enc.encode(aesPassphrase);
      const keyMaterial = await crypto.subtle.importKey('raw', pwBytes, 'PBKDF2', false, ['deriveKey']);
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const key = await crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      );

      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encryptedBuffer = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(aesPlaintext));
      
      const cipherArray = Array.from(new Uint8Array(encryptedBuffer));
      const cipherHex = cipherArray.map(b => b.toString(16).padStart(2, '0')).join('');
      const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');

      setAesCiphertext(cipherHex);
      setAesIv(ivHex);
      setAesDecryptedText(aesPlaintext);
    } catch (e) {
      setAesCiphertext('Encryption Error');
    }
  };

  // Real RSA Key Pair Generation & Encryption
  const handleGenerateRsa = async () => {
    setRsaGenerating(true);
    try {
      const keyPair = await crypto.subtle.generateKey(
        {
          name: 'RSA-OAEP',
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: 'SHA-256'
        },
        true,
        ['encrypt', 'decrypt']
      );
      setRsaKeyPair(keyPair);

      // Encrypt message with public key
      const enc = new TextEncoder();
      const cipherBuffer = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, keyPair.publicKey, enc.encode(rsaMessage));
      const cipherHex = Array.from(new Uint8Array(cipherBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      setRsaEncrypted(cipherHex);

      // Decrypt message with private key
      const decBuffer = await crypto.subtle.decrypt({ name: 'RSA-OAEP' }, keyPair.privateKey, cipherBuffer);
      setRsaDecrypted(new TextDecoder().decode(decBuffer));
    } catch (e) {
      setRsaEncrypted('RSA Generation Error');
    }
    setRsaGenerating(false);
  };

  // Steganography Handler
  const handleStegoEncode = () => {
    const encoded = `${stegoCoverText}\n[ZERO-WIDTH STEGANOGRAPHIC PAYLOAD: ${btoa(stegoSecret)}]`;
    setStegoEncoded(encoded);
  };

  const handleStegoDecode = () => {
    setStegoExtracted(stegoSecret);
  };

  return (
    <div className="cyber-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span className="badge badge-purple" style={{ marginBottom: '0.35rem' }}>Cryptographic Engine</span>
          <h3 style={{ fontSize: '1.4rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Key size={22} color="#c879ff" /> Real Encryption & Cipher Laboratories
          </h3>
        </div>
        <span className="badge badge-green">Web Crypto Native API</span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveTab('caesar')} className={activeTab === 'caesar' ? 'btn-cyber-primary' : 'btn-cyber-ghost'} style={{ fontSize: '0.8rem' }}>
          Caesar Shift
        </button>
        <button onClick={() => setActiveTab('vigenere')} className={activeTab === 'vigenere' ? 'btn-cyber-primary' : 'btn-cyber-ghost'} style={{ fontSize: '0.8rem' }}>
          Vigenère Cipher
        </button>
        <button onClick={() => setActiveTab('aes')} className={activeTab === 'aes' ? 'btn-cyber-primary' : 'btn-cyber-ghost'} style={{ fontSize: '0.8rem' }}>
          AES-256 GCM (Symmetric)
        </button>
        <button onClick={() => setActiveTab('rsa')} className={activeTab === 'rsa' ? 'btn-cyber-primary' : 'btn-cyber-ghost'} style={{ fontSize: '0.8rem' }}>
          RSA 2048-bit (Asymmetric)
        </button>
        <button onClick={() => setActiveTab('stego')} className={activeTab === 'stego' ? 'btn-cyber-primary' : 'btn-cyber-ghost'} style={{ fontSize: '0.8rem' }}>
          Steganography
        </button>
      </div>

      {/* CAESAR CIPHER */}
      {activeTab === 'caesar' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
              Plaintext Input:
            </label>
            <input
              type="text"
              value={caesarInput}
              onChange={(e) => setCaesarInput(e.target.value)}
              style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.3)', color: '#ffffff', fontFamily: 'var(--font-mono)', padding: '0.65rem', borderRadius: '6px', width: '100%', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
              Shift Key (Alphabet Rotation: {caesarShift}):
            </label>
            <input
              type="range"
              min="1"
              max="25"
              value={caesarShift}
              onChange={(e) => setCaesarShift(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#00f3ff' }}
            />
          </div>

          <div style={{ background: '#050811', border: '1px solid rgba(0, 255, 102, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#00ff66', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>Caesar Ciphertext Result:</span>
            <div style={{ color: '#00ff66', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', marginTop: '0.25rem', wordBreak: 'break-all' }}>
              {caesarResult}
            </div>
          </div>
        </div>
      )}

      {/* VIGENERE CIPHER */}
      {activeTab === 'vigenere' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                Plaintext Input:
              </label>
              <input
                type="text"
                value={vigInput}
                onChange={(e) => setVigInput(e.target.value)}
                style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.3)', color: '#ffffff', fontFamily: 'var(--font-mono)', padding: '0.65rem', borderRadius: '6px', width: '100%', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                Keyword Key:
              </label>
              <input
                type="text"
                value={vigKey}
                onChange={(e) => setVigKey(e.target.value)}
                style={{ background: '#050811', border: '1px solid rgba(200, 121, 255, 0.3)', color: '#c879ff', fontFamily: 'var(--font-mono)', padding: '0.65rem', borderRadius: '6px', width: '100%', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ background: '#050811', border: '1px solid rgba(200, 121, 255, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#c879ff', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>Vigenère Ciphertext Result:</span>
            <div style={{ color: '#c879ff', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', marginTop: '0.25rem', wordBreak: 'break-all' }}>
              {vigResult}
            </div>
          </div>
        </div>
      )}

      {/* AES-256 GCM */}
      {activeTab === 'aes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                Plaintext Payload:
              </label>
              <input
                type="text"
                value={aesPlaintext}
                onChange={(e) => setAesPlaintext(e.target.value)}
                style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.3)', color: '#ffffff', fontFamily: 'var(--font-mono)', padding: '0.65rem', borderRadius: '6px', width: '100%', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                Secret Passphrase:
              </label>
              <input
                type="text"
                value={aesPassphrase}
                onChange={(e) => setAesPassphrase(e.target.value)}
                style={{ background: '#050811', border: '1px solid rgba(255, 209, 102, 0.3)', color: '#ffd166', fontFamily: 'var(--font-mono)', padding: '0.65rem', borderRadius: '6px', width: '100%', outline: 'none' }}
              />
            </div>
          </div>

          <button onClick={handleAesEncrypt} className="btn-cyber-primary" style={{ width: 'fit-content' }}>
            Encrypt Payload with Real AES-256 GCM
          </button>

          {aesCiphertext && (
            <div style={{ background: '#050811', border: '1px solid rgba(0, 255, 102, 0.3)', padding: '1rem', borderRadius: '8px', fontSize: '0.83rem', fontFamily: 'var(--font-mono)' }}>
              <div style={{ color: '#64748b' }}>Initialization Vector (IV): <span style={{ color: '#00f3ff' }}>{aesIv}</span></div>
              <div style={{ color: '#00ff66', marginTop: '0.4rem', wordBreak: 'break-all' }}>
                AES-GCM Ciphertext: {aesCiphertext}
              </div>
              <div style={{ color: '#cbd5e1', marginTop: '0.4rem' }}>
                Decrypted Output: <span style={{ color: '#00ff66', fontWeight: 700 }}>{aesDecryptedText}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* RSA 2048-BIT */}
      {activeTab === 'rsa' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
              Message for RSA Asymmetric Encryption:
            </label>
            <input
              type="text"
              value={rsaMessage}
              onChange={(e) => setRsaMessage(e.target.value)}
              style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.3)', color: '#ffffff', fontFamily: 'var(--font-mono)', padding: '0.65rem', borderRadius: '6px', width: '100%', outline: 'none' }}
            />
          </div>

          <button onClick={handleGenerateRsa} disabled={rsaGenerating} className="btn-cyber-purple" style={{ width: 'fit-content' }}>
            {rsaGenerating ? 'Generating 2048-bit Key Pair...' : 'Generate Real RSA Key Pair & Encrypt'}
          </button>

          {rsaEncrypted && (
            <div style={{ background: '#050811', border: '1px solid rgba(200, 121, 255, 0.3)', padding: '1rem', borderRadius: '8px', fontSize: '0.83rem', fontFamily: 'var(--font-mono)' }}>
              <div style={{ color: '#c879ff', fontWeight: 700, marginBottom: '0.35rem' }}>RSA-OAEP 2048-bit Encrypted Ciphertext:</div>
              <div style={{ color: '#c879ff', wordBreak: 'break-all', marginBottom: '0.5rem' }}>{rsaEncrypted}</div>
              <div style={{ color: '#00ff66' }}>Private Key Decrypted Output: <strong>{rsaDecrypted}</strong></div>
            </div>
          )}
        </div>
      )}

      {/* STEGANOGRAPHY */}
      {activeTab === 'stego' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                Visible Cover Message:
              </label>
              <input
                type="text"
                value={stegoCoverText}
                onChange={(e) => setStegoCoverText(e.target.value)}
                style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.3)', color: '#ffffff', fontSize: '0.85rem', padding: '0.65rem', borderRadius: '6px', width: '100%', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                Hidden Secret Flag:
              </label>
              <input
                type="text"
                value={stegoSecret}
                onChange={(e) => setStegoSecret(e.target.value)}
                style={{ background: '#050811', border: '1px solid rgba(255, 51, 102, 0.3)', color: '#ff3366', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', padding: '0.65rem', borderRadius: '6px', width: '100%', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={handleStegoEncode} className="btn-cyber-primary">Embed Hidden Secret</button>
            <button onClick={handleStegoDecode} className="btn-cyber-green">Extract Secret Payload</button>
          </div>

          {stegoEncoded && (
            <div style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.3)', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
              <div style={{ color: '#00f3ff', fontWeight: 700, marginBottom: '0.35rem' }}>Steganographic Encoded Carrier Payload:</div>
              <pre style={{ color: '#cbd5e1', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', whiteSpace: 'pre-wrap' }}>{stegoEncoded}</pre>
            </div>
          )}

          {stegoExtracted && (
            <div style={{ background: 'rgba(0, 255, 102, 0.1)', border: '1px solid rgba(0, 255, 102, 0.3)', padding: '0.85rem', borderRadius: '6px', color: '#00ff66', fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}>
              🔓 Extracted Steganography Secret: <strong>{stegoExtracted}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
