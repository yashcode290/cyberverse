import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Server, CheckCircle2 } from 'lucide-react';

import { Badge } from '../components/common/Badge';

export const AdminPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        categoryTag="Admin Command Center"
        title="Platform Operational Telemetry"
        description="Monitor active student lab sandboxes, target system health metrics, CTF flag submission volumes, and system logs."
      />

      {/* Health Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono">
        <div className="bg-[#121824] p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 block">Target Cluster Health</span>
          <span className="text-xl font-bold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> 100% Operational
          </span>
        </div>

        <div className="bg-[#121824] p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 block">Active Student Sandboxes</span>
          <span className="text-xl font-bold text-cyan-400">142 Container Sessions</span>
        </div>

        <div className="bg-[#121824] p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 block">CTF Flag Submissions Today</span>
          <span className="text-xl font-bold text-amber-400">1,240 Verified</span>
        </div>

        <div className="bg-[#121824] p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 block">Sandbox Memory Usage</span>
          <span className="text-xl font-bold text-purple-400">1.2 GB / 16 GB</span>
        </div>
      </div>

      {/* Target Environments Status Table */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl space-y-3 p-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Server className="w-4 h-4 text-cyan-400" /> Educational Target Environments Status
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Target Name</th>
                <th className="p-3">Target Type</th>
                <th className="p-3">Uptime</th>
                <th className="p-3">Isolation Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="p-3 font-bold text-white">cyberverse-linux-sandbox-v2</td>
                <td className="p-3">Simulated Linux CLI</td>
                <td className="p-3 text-emerald-400 font-bold">99.9% Uptime</td>
                <td className="p-3"><Badge variant="green" mono size="sm">Client Memory Isolated</Badge></td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">cyberverse-sqli-target-v1</td>
                <td className="p-3">Web Security Auth Portal</td>
                <td className="p-3 text-emerald-400 font-bold">100% Uptime</td>
                <td className="p-3"><Badge variant="green" mono size="sm">Client Memory Isolated</Badge></td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">cyberverse-siem-log-analyzer</td>
                <td className="p-3">Blue Team SIEM Target</td>
                <td className="p-3 text-emerald-400 font-bold">100% Uptime</td>
                <td className="p-3"><Badge variant="green" mono size="sm">Client Memory Isolated</Badge></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
