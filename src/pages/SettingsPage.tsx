import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Terminal, Shield, Save, CheckCircle2 } from 'lucide-react';

import { Button } from '../components/common/Button';

export const SettingsPage: React.FC = () => {
  const [terminalFont, setTerminalFont] = useState('JetBrains Mono');
  const [autoClearTerminal, setAutoClearTerminal] = useState(true);
  const [savedNotification, setSavedNotification] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        categoryTag="Preferences"
        title="Student Workspace Settings"
        description="Customize your simulated CLI terminal, accessibility focus indicators, and account notifications."
      />

      <form onSubmit={handleSave} className="bg-[#121824] p-6 rounded-2xl border border-slate-800 space-y-6 max-w-2xl">
        
        {/* Terminal Preferences */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Terminal className="w-4 h-4 text-cyan-400" /> Linux Terminal Sandbox Settings
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Terminal Monospace Font</label>
              <select
                value={terminalFont}
                onChange={(e) => setTerminalFont(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-cyan-300 focus:border-cyan-400 focus:outline-none"
              >
                <option value="JetBrains Mono">JetBrains Mono (Recommended)</option>
                <option value="Fira Code">Fira Code</option>
                <option value="Monaco">Monaco / Consolas</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-300">Auto-Clear Terminal History on Reset</span>
              <input
                type="checkbox"
                checked={autoClearTerminal}
                onChange={(e) => setAutoClearTerminal(e.target.checked)}
                className="w-4 h-4 rounded accent-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Security & Notifications */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Shield className="w-4 h-4 text-emerald-400" /> Learning Streaks & Telemetry
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300">Daily Learning Streak Reminders</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-cyan-500" />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <Button type="submit" variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
            Save Preferences
          </Button>

          {savedNotification && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Preferences saved!
            </span>
          )}
        </div>

      </form>
    </div>
  );
};
