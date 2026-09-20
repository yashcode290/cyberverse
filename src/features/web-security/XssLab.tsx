import React, { useState } from 'react';
import { Code, ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { Button } from '../../components/common/Button';


export const XssLab: React.FC<{
  onFlagSubmit?: (flag: string) => void;
}> = ({ onFlagSubmit }) => {
  const [userInput, setUserInput] = useState('');
  const [sanitizeOutput, setSanitizeOutput] = useState(false);
  const [xssTriggered, setXssTriggered] = useState(false);
  const [flag, setFlag] = useState<string | null>(null);

  const handleTestInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    if (!sanitizeOutput && userInput.toLowerCase().includes('<script>')) {
      setXssTriggered(true);
      const extractedFlag = 'CYBER{xss_script_3x3cut10n_d0m}';
      setFlag(extractedFlag);
      if (onFlagSubmit) onFlagSubmit(extractedFlag);
    } else {
      setXssTriggered(false);
    }
  };

  return (
    <div className="bg-[#121824] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Cross-Site Scripting (XSS) Playground</h3>
            <p className="text-xs text-slate-400">Reflected DOM Sandbox • Safe Client-Side Execution Test</p>
          </div>
        </div>

        <button
          onClick={() => {
            setSanitizeOutput(!sanitizeOutput);
            setXssTriggered(false);
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold transition-all ${
            sanitizeOutput
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              : 'bg-red-500/20 text-red-400 border border-red-500/40'
          }`}
        >
          {sanitizeOutput ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
          {sanitizeOutput ? 'HTML Entity Encoding (Secure)' : 'Raw InnerHTML (Vulnerable)'}
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Input Form */}
        <div className="space-y-4">
          <form onSubmit={handleTestInput} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-semibold">
              User Search Input
            </span>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Search Query</label>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter query or payload (e.g. <script>alert(1)</script>)"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setUserInput('<script>alert("XSS")</script>')}
                className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-cyan-300 transition-colors"
              >
                Inject &lt;script&gt; Payload
              </button>

              <Button type="submit" variant="primary" size="sm">
                Submit Input
              </Button>
            </div>
          </form>
        </div>

        {/* Right Side: Rendered Output */}
        <div className="space-y-4">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-semibold">
            DOM Rendered Result
          </span>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 min-h-[160px] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-slate-500 block mb-2">Search Results For:</span>
              
              {sanitizeOutput ? (
                /* Escaped Text Output */
                <p className="text-sm font-mono text-slate-200 bg-slate-900 p-3 rounded-lg border border-slate-800">
                  {userInput || 'No search submitted yet.'}
                </p>
              ) : (
                /* Unescaped HTML Output Simulation */
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-sm font-mono text-cyan-300">
                  {userInput || 'No search submitted yet.'}
                </div>
              )}
            </div>

            {/* XSS Trigger Indicator */}
            {xssTriggered && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/40 rounded-lg text-red-300 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <Sparkles className="w-4 h-4 text-red-400" />
                  Client Script Executed! XSS Vulnerability Triggered
                </div>
                <p>The unescaped script tag was evaluated by the client DOM engine.</p>
                {flag && (
                  <div className="pt-2 border-t border-red-500/30 flex items-center justify-between font-mono">
                    <span>Flag Extracted:</span>
                    <span className="text-cyan-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-cyan-500/30">
                      {flag}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
