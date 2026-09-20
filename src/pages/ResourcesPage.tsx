import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { ExternalLink } from 'lucide-react';

import { Badge } from '../components/common/Badge';

export const ResourcesPage: React.FC = () => {
  const resources = [
    {
      title: 'Linux Command Line Security Reference',
      type: 'Cheat Sheet',
      category: 'Linux',
      description: 'Quick reference guide covering file permissions (chmod/chown), SUID binary auditing, log filtering with grep, and network port inspection (ss/netstat).'
    },
    {
      title: 'OWASP Top 10 Defensive Remediation Guide',
      type: 'Guide',
      category: 'Web Security',
      description: 'Comprehensive breakdown of SQL Injection, XSS, CSRF, IDOR, and SSRF vulnerabilities with side-by-side Node.js & Python secure code snippets.'
    },
    {
      title: 'Blue Team SIEM Log Parsing Cheat Sheet',
      type: 'Cheat Sheet',
      category: 'Blue Team',
      description: 'Regex patterns and HTTP status code reference guide for parsing Apache/Nginx access.log and Linux auth.log streams.'
    }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        categoryTag="Documentation & Guides"
        title="Student Security Resources"
        description="Curated cheat sheets, vulnerability guides, command-line references, and defensive coding standards."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((res, i) => (
          <div key={i} className="bg-[#121824] p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between hover:border-cyan-500/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="cyan" mono size="sm">{res.type}</Badge>
                <span className="text-[10px] font-mono text-slate-400">{res.category}</span>
              </div>
              <h3 className="text-base font-bold text-white leading-tight">{res.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{res.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between font-mono text-xs text-cyan-400 font-semibold cursor-pointer hover:underline">
              <span>Read Reference</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
