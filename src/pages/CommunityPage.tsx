import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { MessageSquare, ThumbsUp, PlusCircle } from 'lucide-react';

import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const CommunityPage: React.FC = () => {
  const discussions = [
    {
      id: 'd1',
      title: 'How to reliably sanitize user input against Reflected DOM XSS in React?',
      author: 'alex_defender',
      category: 'Web Security',
      replies: 8,
      likes: 24,
      time: '2 hours ago'
    },
    {
      id: 'd2',
      title: 'Tips for solving "The Unquoted Shell" CTF challenge without root access',
      author: 'sophia_blue',
      category: 'Linux CLI',
      replies: 12,
      likes: 45,
      time: '5 hours ago'
    },
    {
      id: 'd3',
      title: 'Building a Python File Integrity Checker - Hash algorithm choice: SHA-256 vs SHA-512',
      author: 'vance_sec',
      category: 'Python Security',
      replies: 5,
      likes: 18,
      time: '1 day ago'
    }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        categoryTag="Student Forum"
        title="CyberVerse Community & Writeups"
        description="Ask questions, share lab writeups, discuss security research, and collaborate on defensive projects."
        actions={
          <Button variant="primary" size="sm" icon={<PlusCircle className="w-4 h-4" />}>
            New Discussion
          </Button>
        }
      />

      <div className="space-y-4">
        {discussions.map((d) => (
          <div key={d.id} className="bg-[#121824] p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant="cyan" mono size="sm">{d.category}</Badge>
                <span className="text-xs text-slate-500 font-mono">Posted by @{d.author} • {d.time}</span>
              </div>
              <h3 className="text-base font-bold text-white hover:text-cyan-400 cursor-pointer transition-colors">
                {d.title}
              </h3>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 shrink-0">
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> {d.replies} Replies
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-3.5 h-3.5 text-amber-400" /> {d.likes}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
