import React, { useState } from 'react';
import LabHeader from './LabHeader';
import TaskChecklist from './TaskChecklist';
import HintPanel from './HintPanel';
import FlagInput from './FlagInput';
import CompletionModal from './CompletionModal';

// Workspaces
import NmapTerminalLab from '../NmapTerminalLab';
import PacketInspectorLab from '../PacketInspectorLab';
import XssSandbox from './XssSandbox';

export default function LabEngine({ lab, onBack, onCompleteLab }) {
  const [tasks, setTasks] = useState(lab.tasks || []);
  const [unlockedHints, setUnlockedHints] = useState([]);
  const [userXPBonus, setUserXPBonus] = useState(lab.xp);
  const [isSolved, setIsSolved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const handleUnlockHint = (tier, xpCost) => {
    if (!unlockedHints.includes(tier)) {
      setUnlockedHints([...unlockedHints, tier]);
      setUserXPBonus(prev => Math.max(20, prev - xpCost));
    }
  };

  const handleSubmitFlag = (submittedFlag) => {
    if (submittedFlag.toLowerCase() === lab.flag.toLowerCase()) {
      setIsSolved(true);
      setTasks(tasks.map(t => ({ ...t, completed: true })));
      setIsModalOpen(true);
      if (onCompleteLab) onCompleteLab(lab.id);
      return { success: true };
    }
    return { success: false };
  };

  const completedTasksCount = tasks.filter(t => t.completed).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
      {/* Top Header */}
      <LabHeader
        lab={lab}
        completedTasksCount={completedTasksCount}
        totalTasksCount={tasks.length}
        onBack={onBack}
      />

      {/* Main 70% / 30% Split Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', flex: 1, alignItems: 'start' }}>
        {/* 70% MAIN WORKSPACE AREA */}
        <div style={{ flex: 1 }}>
          {lab.type === 'terminal' && (
            <NmapTerminalLab onCompleteTerminalLab={() => {}} />
          )}

          {lab.type === 'packet' && (
            <PacketInspectorLab solvedLabs={[]} onSolveLab={() => {}} />
          )}

          {lab.type === 'browser' && (
            <XssSandbox />
          )}

          {lab.type === 'crypto' && (
            <div className="cyber-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#00f3ff', marginBottom: '0.75rem' }}>
                Base64 & Hash Inspector Engine
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Target Encoded Payload: <code style={{ color: '#00ff66', background: '#050811', padding: '0.3rem 0.6rem', borderRadius: '4px' }}>Q0ZGX05FVF9QUk9UXzIwMjY=</code>
              </p>

              <div style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.3)', padding: '1rem', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: '#00ff66' }}>
                Decoded Output: CTF_NET_PROT_2026
              </div>
            </div>
          )}
        </div>

        {/* 30% INSTRUCTIONS & TASKS SIDEBAR */}
        <div className="cyber-card" style={{ padding: '1.25rem', background: '#090e1a' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '0.75rem' }}>
            Lab Overview
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            {lab.overview}
          </p>

          {/* Task Checklist */}
          <TaskChecklist
            tasks={tasks}
            onToggleTask={handleToggleTask}
          />

          {/* 3-Tier Hint System */}
          <HintPanel
            hints={lab.hints || []}
            unlockedHints={unlockedHints}
            onUnlockHint={handleUnlockHint}
          />

          {/* Flag Submission Input */}
          <FlagInput
            onSubmitFlag={handleSubmitFlag}
            isSolved={isSolved}
          />
        </div>
      </div>

      {/* Completion Celebration Modal */}
      <CompletionModal
        isOpen={isModalOpen}
        lab={lab}
        xpEarned={userXPBonus}
        timeSpent={lab.estimatedTime}
        skills={lab.skillsLearned || []}
        onNextLab={onBack}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
