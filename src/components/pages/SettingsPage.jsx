import React, { useState } from 'react';
import PageHeader from '../layout/PageHeader';
import { Settings, Shield, Save, Check } from 'lucide-react';

export default function SettingsPage() {
  const [handle, setHandle] = useState('CyberDefender');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <PageHeader
        title="Student Account Settings"
        description="Manage your learning preferences, profile handle, and security tokens."
        badgeText="PREFERENCES"
        badgeColor="badge-cyan"
      />

      <div className="cyber-card" style={{ maxWidth: '600px', padding: '2rem' }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.4rem' }}>
              Student Profile Handle:
            </label>
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              style={{
                background: '#050811',
                border: '1px solid rgba(0, 243, 255, 0.3)',
                color: '#ffffff',
                fontSize: '0.9rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                width: '100%',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.4rem' }}>
              Theme Accent Mode:
            </label>
            <select style={{
              background: '#050811',
              border: '1px solid rgba(0, 243, 255, 0.3)',
              color: '#00f3ff',
              fontSize: '0.9rem',
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              width: '100%',
              outline: 'none'
            }}>
              <option value="cyber">Cyberpunk Obsidian & Electric Cyan (Default)</option>
              <option value="matrix">Matrix Green & Dark Charcoal</option>
              <option value="dark-monokai">Dark Monokai Technical</option>
            </select>
          </div>

          <button type="submit" className="btn-cyber-primary" style={{ padding: '0.7rem', justifyContent: 'center', marginTop: '0.5rem' }}>
            {saved ? <Check size={18} color="#00ff66" /> : <Save size={18} />}
            {saved ? 'Preferences Saved!' : 'Save Settings'}
          </button>
        </form>
      </div>
    </div>
  );
}
