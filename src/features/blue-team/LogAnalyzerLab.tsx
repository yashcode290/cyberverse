import React, { useState } from 'react';
import { FileText, Search, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';


interface LogEntry {
  id: string;
  timestamp: string;
  ip: string;
  method: 'GET' | 'POST';
  uri: string;
  status: number;
  userAgent: string;
  suspicious?: boolean;
}

const MOCK_LOGS: LogEntry[] = [
  { id: 'l1', timestamp: '2026-08-14 12:00:10', ip: '192.168.1.50', method: 'GET', uri: '/index.html', status: 200, userAgent: 'Mozilla/5.0 Chrome' },
  { id: 'l2', timestamp: '2026-08-14 12:01:05', ip: '192.168.1.105', method: 'POST', uri: '/login', status: 401, userAgent: 'Python-urllib/3.9', suspicious: true },
  { id: 'l3', timestamp: '2026-08-14 12:01:06', ip: '192.168.1.105', method: 'POST', uri: '/login', status: 401, userAgent: 'Python-urllib/3.9', suspicious: true },
  { id: 'l4', timestamp: '2026-08-14 12:01:07', ip: '192.168.1.105', method: 'POST', uri: '/login', status: 401, userAgent: 'Python-urllib/3.9', suspicious: true },
  { id: 'l5', timestamp: '2026-08-14 12:01:08', ip: '192.168.1.105', method: 'POST', uri: '/login', status: 401, userAgent: 'Python-urllib/3.9', suspicious: true },
  { id: 'l6', timestamp: '2026-08-14 12:02:15', ip: '10.0.0.12', method: 'GET', uri: '/api/v1/products', status: 200, userAgent: 'Mozilla/5.0 Firefox' },
  { id: 'l7', timestamp: '2026-08-14 12:03:00', ip: '192.168.1.105', method: 'GET', uri: '/admin/users?query=UNION+SELECT+username,password+FROM+users', status: 500, userAgent: 'sqlmap/1.6', suspicious: true }
];

export const LogAnalyzerLab: React.FC<{
  onFlagSubmit?: (flag: string) => void;
}> = ({ onFlagSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [flagInput, setFlagInput] = useState('');
  const [flagResult, setFlagResult] = useState<string | null>(null);

  const filteredLogs = MOCK_LOGS.filter((log) => {
    const matchesSearch =
      log.ip.includes(searchQuery) ||
      log.uri.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userAgent.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === '401' && log.status === 401) ||
      (statusFilter === '500' && log.status === 500) ||
      (statusFilter === 'SUSPICIOUS' && log.suspicious);

    return matchesSearch && matchesStatus;
  });

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = flagInput.trim();
    if (clean === 'CYBER{192.168.1.105_brut3_f0rc3}' || clean === 'CYBER{un10n_53l3ct_3xf1ltr4t10n}') {
      setFlagResult('FLAG VERIFIED! +220 XP Awarded to Blue Team Profile.');
      if (onFlagSubmit) onFlagSubmit(clean);
    } else {
      setFlagResult('Incorrect flag format. Inspect failed login IPs and SQL injection URIs.');
    }
  };

  return (
    <div className="bg-[#121824] border border-slate-800 rounded-xl overflow-hidden shadow-2xl space-y-4 p-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Blue Team Log Analyzer & SIEM Sandbox</h3>
            <p className="text-xs text-slate-400">Triage access.log entries to discover attack IP addresses</p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search IP, URI, Agent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
          >
            <option value="ALL">All Status Codes</option>
            <option value="401">401 Unauthorized</option>
            <option value="500">500 Server Error</option>
            <option value="SUSPICIOUS">Suspicious Only</option>
          </select>
        </div>
      </div>

      {/* Log Table Stream */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
        <table className="w-full text-left font-mono text-xs text-slate-300">
          <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-3">Timestamp</th>
              <th className="p-3">Attacker IP</th>
              <th className="p-3">Method</th>
              <th className="p-3">Requested URI</th>
              <th className="p-3">Status</th>
              <th className="p-3">User-Agent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredLogs.map((log) => (
              <tr key={log.id} className={`hover:bg-slate-900/50 ${log.suspicious ? 'bg-amber-500/5' : ''}`}>
                <td className="p-3 text-slate-500">{log.timestamp}</td>
                <td className={`p-3 font-bold ${log.suspicious ? 'text-amber-400' : 'text-slate-300'}`}>
                  {log.ip}
                </td>
                <td className="p-3">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] ${log.method === 'POST' ? 'bg-purple-500/20 text-purple-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
                    {log.method}
                  </span>
                </td>
                <td className="p-3 text-cyan-300 max-w-xs truncate">{log.uri}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${log.status === 200 ? 'bg-emerald-500/20 text-emerald-400' : log.status === 401 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
                    {log.status}
                  </span>
                </td>
                <td className="p-3 text-slate-500 text-[11px] max-w-xs truncate">{log.userAgent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Flag Submission Bar */}
      <form onSubmit={handleFlagSubmit} className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-md">
          <input
            type="text"
            placeholder="Submit flag format CYBER{192.168.1.105_brut3_f0rc3}"
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-cyan-300 focus:border-cyan-400 focus:outline-none"
          />
          <Button type="submit" variant="primary" size="sm" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
            Verify
          </Button>
        </div>

        {flagResult && (
          <span className="text-xs font-mono text-emerald-400 font-bold">
            {flagResult}
          </span>
        )}
      </form>

    </div>
  );
};
