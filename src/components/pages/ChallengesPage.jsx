import React, { useState } from 'react';
import PageHeader from '../layout/PageHeader';
import CtfPlatform from '../challenges/CtfPlatform';
import NetworkQuiz from '../NetworkQuiz';
import { HelpCircle, Award, Flag } from 'lucide-react';

export default function ChallengesPage({ onAddXP }) {
  const [activeTab, setActiveTab] = useState('ctf');

  return (
    <div>
      <PageHeader
        title="CTF Flag Challenges & Security Quizzes"
        description="Submit flags (`CyberVerse{...}`), unlock hints, and test your knowledge against simulated challenges."
        badgeText="PRACTICAL CTF PLATFORM"
        badgeColor="badge-purple"
      />

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('ctf')}
          className={activeTab === 'ctf' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <Flag size={16} /> CTF Flag Challenges
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={activeTab === 'quiz' ? 'btn-cyber-primary' : 'btn-cyber-ghost'}
          style={{ fontSize: '0.85rem' }}
        >
          <Award size={16} /> Network Security Quiz
        </button>
      </div>

      {activeTab === 'ctf' && (
        <CtfPlatform onAddXP={onAddXP} />
      )}

      {activeTab === 'quiz' && (
        <NetworkQuiz solvedQuiz={[]} onSolveQuiz={() => onAddXP && onAddXP(100)} />
      )}
    </div>
  );
}
