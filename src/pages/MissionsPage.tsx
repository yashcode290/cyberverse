import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

import { Badge } from '../components/common/Badge';

export const MissionsPage: React.FC = () => {
  const missions = [
    {
      id: 'op-shield',
      title: 'Operation Cyber-Shield: Server Intrusion Triage',
      difficulty: 'Beginner',
      xpReward: 300,
      status: 'Available',
      description: 'Investigate compromised web server logs, discover unauthorized SSH logins, and formulate firewall block rules.',
      objectives: ['Filter auth.log for 401 failures', 'Locate attacker IP', 'Write iptables rule']
    },
    {
      id: 'op-gateway',
      title: 'Operation Gateway: Vulnerable Auth Bypass',
      difficulty: 'Intermediate',
      xpReward: 400,
      status: 'Available',
      description: 'Audit an internal login microservice, exploit dynamic query strings safely, and implement positional prepared statements.',
      objectives: ['Bypass admin login', 'Extract database flag', 'Apply Node.js prepared query']
    }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        categoryTag="Scenario Ops"
        title="Story-Driven Cyber Missions"
        description="Multi-stage security operations simulating real-world incident triage, threat hunting, and defensive remediation."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {missions.map((mis) => (
          <div key={mis.id} className="bg-[#121824] p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="cyan" mono size="sm">{mis.difficulty}</Badge>
                <span className="text-xs font-mono text-emerald-400 font-bold">+{mis.xpReward} XP</span>
              </div>

              <h3 className="text-lg font-bold text-white">{mis.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{mis.description}</p>

              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-mono text-slate-400 block font-semibold">Mission Objectives:</span>
                {mis.objectives.map((obj, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-bold">Status: {mis.status}</span>
              <Link to="/labs">
                <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5">
                  Launch Mission <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
