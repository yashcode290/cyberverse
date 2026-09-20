import React, { useState } from 'react';
import { CHALLENGES_DATA } from '../data/challengesData';
import { Flag, CheckCircle2, HelpCircle } from 'lucide-react';

import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useUserProgress } from '../hooks/useUserProgress';

export const ChallengesPage: React.FC = () => {
  const { profile, solveChallenge } = useUserProgress();
  const [selectedChallenge, setSelectedChallenge] = useState<typeof CHALLENGES_DATA[0] | null>(null);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChallenge) return;

    if (flagInput.trim() === selectedChallenge.flag) {
      solveChallenge(selectedChallenge.id, selectedChallenge.xpReward);
      setFeedback(`SUCCESS! Flag Verified. +${selectedChallenge.xpReward} XP awarded.`);
    } else {
      setFeedback('Invalid flag format or incorrect value. Check scenario hints.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <Badge variant="cyan" mono>CTF Matrix</Badge>
        <h1 className="text-3xl font-extrabold text-white">Jeopardy CTF Challenges</h1>
        <p className="text-sm text-slate-400">
          Extract hidden flags from educational targets and earn XP to rank up on the student leaderboard.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Challenge Matrix List */}
        <div className="lg:col-span-2 space-y-4">
          {CHALLENGES_DATA.map((ch) => {
            const isSolved = profile.completedChallenges.includes(ch.id);

            return (
              <div
                key={ch.id}
                onClick={() => {
                  setSelectedChallenge(ch);
                  setFlagInput('');
                  setFeedback(null);
                  setShowHint(false);
                }}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                  selectedChallenge?.id === ch.id
                    ? 'bg-[#1A2234] border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                    : 'bg-[#121824] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{ch.title}</span>
                    <Badge variant={ch.difficulty === 'Beginner' ? 'green' : 'purple'} mono size="sm">
                      {ch.difficulty}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400">{ch.description}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono text-cyan-400 font-bold">+{ch.xpReward} XP</span>
                  {isSolved ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Flag className="w-5 h-5 text-slate-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Challenge Detail & Flag Submit Panel */}
        <div>
          {selectedChallenge ? (
            <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 space-y-5 sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-cyan-400 uppercase font-bold">{selectedChallenge.category}</span>
                <Badge variant="green" mono size="sm">+{selectedChallenge.xpReward} XP</Badge>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{selectedChallenge.title}</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedChallenge.scenario}</p>
              </div>

              {/* Hint Toggle */}
              <div className="space-y-2">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:underline"
                >
                  <HelpCircle className="w-3.5 h-3.5" /> {showHint ? 'Hide Hint' : 'Reveal Scenario Hint'}
                </button>
                {showHint && (
                  <p className="text-xs font-mono bg-slate-950 p-3 rounded-lg border border-slate-800 text-amber-300">
                    {selectedChallenge.hint}
                  </p>
                )}
              </div>

              {/* Flag Submission Form */}
              <form onSubmit={handleFlagSubmit} className="space-y-3 pt-2 border-t border-slate-800">
                <label className="block text-xs font-semibold text-slate-300">Enter Flag Key</label>
                <div className="relative">
                  <Flag className="w-4 h-4 text-cyan-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="CYBER{...}"
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-cyan-300 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <Button type="submit" variant="primary" className="w-full" size="sm">
                  Verify Flag
                </Button>
              </form>

              {feedback && (
                <div className={`p-3 rounded-lg text-xs font-mono ${feedback.includes('SUCCESS') ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/10 text-red-300 border border-red-500/30'}`}>
                  {feedback}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#121824] p-8 rounded-2xl border border-slate-800 text-center text-slate-500 text-xs font-mono">
              Select a challenge from the CTF matrix to begin flag verification.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
