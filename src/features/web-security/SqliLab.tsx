import React, { useState } from 'react';
import { Database, ShieldAlert, ShieldCheck, Code, Unlock, Lock } from 'lucide-react';

import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const SqliLab: React.FC<{
  onFlagSubmit?: (flag: string) => void;
}> = ({ onFlagSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureMode, setIsSecureMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'interactive' | 'code'>('interactive');
  const [authStatus, setAuthStatus] = useState<{ authenticated: boolean; user?: string; msg: string; flag?: string } | null>(null);

  const generatedQuery = isSecureMode
    ? `SELECT id, username, role FROM users WHERE username = $1 AND password = $2;\n-- Parameters: [$1 = "${username}", $2 = "${password}"]`
    : `SELECT id, username, role FROM users WHERE username = '${username}' AND password = '${password}';`;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSecureMode) {
      // Secure prepared statement logic: treats inputs as literal strings
      if (username === 'admin' && password === 'CyberSecure2026!') {
        setAuthStatus({ authenticated: true, user: 'admin', msg: 'Authenticated safely via Prepared Statement!' });
      } else {
        setAuthStatus({ authenticated: false, msg: 'Authentication failed. Payload treated strictly as literal string input.' });
      }
    } else {
      // Vulnerable dynamic string evaluation simulation
      const lower = username.toLowerCase();
      if (lower.includes("' or '1'='1") || lower.includes("' or 1=1") || lower.includes("admin' --")) {
        const flag = 'CYBER{sq1i_byp4ss_4uth_5ucc3ss}';
        setAuthStatus({
          authenticated: true,
          user: 'admin (Super User)',
          msg: "VULNERABILITY EXPLOITED! '1'='1 evaluated to TRUE. Password clause bypassed!",
          flag
        });
        if (onFlagSubmit) onFlagSubmit(flag);
      } else if (username === 'admin' && password === 'CyberSecure2026!') {
        setAuthStatus({ authenticated: true, user: 'admin', msg: 'Standard Login Success' });
      } else {
        setAuthStatus({ authenticated: false, msg: 'Invalid credentials. Try injecting an SQL payload like \' OR \'1\'=\'1' });
      }
    }
  };

  return (
    <div className="bg-[#121824] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      
      {/* Header Bar */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              SQL Injection Lab & Defense Simulator
            </h3>
            <p className="text-xs text-slate-400">Target: Simulated Safe Login Portal • No real DB connection</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'interactive' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Interactive Lab
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'code' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Defensive Code Fix
          </button>
        </div>
      </div>

      {activeTab === 'interactive' ? (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side: Login Form */}
          <div className="space-y-5">
            <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <span className="text-xs font-mono text-slate-300 font-semibold">Database Security Mode:</span>
              <button
                onClick={() => {
                  setIsSecureMode(!isSecureMode);
                  setAuthStatus(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold transition-all ${
                  isSecureMode
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-red-500/20 text-red-400 border border-red-500/40'
                }`}
              >
                {isSecureMode ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                {isSecureMode ? 'Prepared Statement (Secure)' : 'Unescaped Concatenation (Vulnerable)'}
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Login Sandbox</span>
                <Badge variant={isSecureMode ? 'green' : 'amber'} mono size="sm">
                  {isSecureMode ? 'Protected' : 'Vulnerable Target'}
                </Badge>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username (e.g. admin)"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Payload Quick Injectors */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-mono text-slate-400 block">Quick Payload Presets:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setUsername("' OR '1'='1");
                      setPassword("anything");
                    }}
                    className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 hover:border-amber-400 text-amber-300 transition-colors"
                  >
                    ' OR '1'='1
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUsername("admin' --");
                      setPassword("anything");
                    }}
                    className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 hover:border-amber-400 text-amber-300 transition-colors"
                  >
                    admin' --
                  </button>
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full mt-2">
                Attempt Authentication
              </Button>
            </form>
          </div>

          {/* Right Side: Real-time Query Visualizer & Auth Status */}
          <div className="space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold block">
                Backend Query Execution Visualizer
              </span>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 min-h-[140px] flex flex-col justify-between">
                <div>
                  <span className="text-slate-500 block mb-1">-- Executing on SQL Database Engine:</span>
                  <pre className="text-amber-300 whitespace-pre-wrap leading-relaxed">{generatedQuery}</pre>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Engine Evaluation:</span>
                  <span className={isSecureMode ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {isSecureMode ? 'Parameterized (Safe)' : 'Dynamic String Parse'}
                  </span>
                </div>
              </div>
            </div>

            {/* Auth Result Box */}
            {authStatus && (
              <div className={`p-4 rounded-xl border ${authStatus.authenticated ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-red-500/10 border-red-500/40 text-red-300'}`}>
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  {authStatus.authenticated ? <Unlock className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-red-400" />}
                  {authStatus.authenticated ? `Access Granted (${authStatus.user})` : 'Access Denied'}
                </div>
                <p className="text-xs">{authStatus.msg}</p>

                {authStatus.flag && (
                  <div className="mt-3 pt-3 border-t border-emerald-500/30 flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-300">Flag Extracted:</span>
                    <span className="text-cyan-300 font-bold bg-slate-900 px-2 py-1 rounded border border-cyan-500/30">
                      {authStatus.flag}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      ) : (
        /* Defensive Code Fix Tab */
        <div className="p-6 space-y-6">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-cyan-400" /> Remediation: Parameterized Queries
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              SQL Injection is prevented by separating user data from SQL syntax instructions. When using prepared statements, the database engine compiles the query structure first, treating positional arguments ($1, $2) strictly as literal text data strings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {/* Vulnerable Code */}
            <div className="space-y-2">
              <span className="text-red-400 font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> VULNERABLE CODE (Dynamic String)
              </span>
              <div className="bg-slate-950 p-4 rounded-xl border border-red-500/30 text-slate-300 overflow-x-auto">
                <pre>{`// DANGEROUS: Dynamic String Concatenation
const username = req.body.username;
const password = req.body.password;

// Input containing quotes alters the SQL command structure!
const query = "SELECT * FROM users WHERE name = '" 
              + username + "' AND pass = '" + password + "'";

const result = await db.query(query);`}</pre>
              </div>
            </div>

            {/* Secure Code */}
            <div className="space-y-2">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> SECURE CODE (Prepared Statement)
              </span>
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 text-slate-300 overflow-x-auto">
                <pre>{`// SECURE: Positional Prepared Statements
const username = req.body.username;
const password = req.body.password;

// Database treats parameters strictly as literal string values
const query = "SELECT * FROM users WHERE name = $1 AND pass = $2";

const result = await db.query(query, [username, password]);`}</pre>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
