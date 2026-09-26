import React, { useState } from 'react';
import LessonSidebar from './learning/LessonSidebar';
import LessonHeader from './learning/LessonHeader';
import TheoryBlock from './learning/TheoryBlock';
import LabCard from './learning/LabCard';
import DefensePanel from './learning/DefensePanel';
import PacketInspectorLab from './PacketInspectorLab';
import { modulesData } from '../data/modulesData';
import { CheckCircle2, ArrowRight, BookOpen, Award, Terminal } from 'lucide-react';

export default function CourseViewer({ completedCourses, onCompleteCourse, onLaunchLab }) {
  const [selectedModuleId, setSelectedModuleId] = useState(modulesData[0].id);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [completedItemIds, setCompletedItemIds] = useState([]);
  const [showLiveLab, setShowLiveLab] = useState(false);

  const activeModule = modulesData.find(m => m.id === selectedModuleId) || modulesData[0];
  const activeItem = activeModule.items[activeItemIndex] || activeModule.items[0];

  const handleNextItem = () => {
    if (!completedItemIds.includes(activeItem.id)) {
      setCompletedItemIds([...completedItemIds, activeItem.id]);
    }

    if (activeItemIndex + 1 < activeModule.items.length) {
      setActiveItemIndex(prev => prev + 1);
    } else {
      onCompleteCourse(activeModule.id);
    }
  };

  const progressPercent = Math.round((completedItemIds.filter(id => activeModule.items.some(i => i.id === id)).length / activeModule.items.length) * 100);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 240px', gap: '1.5rem', alignItems: 'start' }}>
      {/* 1. LEFT SIDEBAR: Module Tree Navigation */}
      <LessonSidebar
        module={activeModule}
        activeItemIndex={activeItemIndex}
        onSelectItem={(idx) => { setActiveItemIndex(idx); setShowLiveLab(false); }}
        completedItems={completedItemIds}
      />

      {/* 2. MAIN CENTER AREA: Lesson Content & Practical Flow */}
      <div>
        <LessonHeader
          item={activeItem}
          category={activeModule.category}
          difficulty={activeModule.difficulty}
        />

        {/* Render Based on Item Type */}
        {showLiveLab ? (
          <div>
            <button onClick={() => setShowLiveLab(false)} className="btn-cyber-ghost" style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>
              ← Return to Module Lesson
            </button>
            <PacketInspectorLab solvedLabs={[]} onSolveLab={() => {}} />
          </div>
        ) : (
          <>
            {activeItem.type === 'theory' && (
              <TheoryBlock
                content={activeItem.content || ''}
                takeaways={activeItem.takeaways || []}
              />
            )}

            {activeItem.type === 'lab' && (
              <LabCard
                labTitle={activeItem.labTitle || activeItem.title}
                category={activeModule.category}
                difficulty={activeModule.difficulty}
                time={activeItem.duration}
                xp={activeItem.xp}
                objectives={activeItem.objectives || []}
                onStartLab={() => setShowLiveLab(true)}
              />
            )}

            {/* Defense Panel where applicable */}
            {activeItem.whatHappened && (
              <DefensePanel
                whatHappened={activeItem.whatHappened}
                whyVulnerable={activeItem.whyVulnerable}
                howToFix={activeItem.howToFix}
                fixCode={activeItem.fixCode}
              />
            )}

            {/* Next Lesson / Completion Action */}
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handleNextItem} className="btn-cyber-primary" style={{ padding: '0.75rem 1.5rem' }}>
                {activeItemIndex + 1 < activeModule.items.length ? (
                  <>Complete & Next Lesson <ArrowRight size={18} /></>
                ) : (
                  <>Complete Module (+100 XP) <CheckCircle2 size={18} color="#00ff66" /></>
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* 3. RIGHT SIDE PANEL: Progress & XP Stats */}
      <div className="cyber-card" style={{ padding: '1.25rem', background: '#090e1a' }}>
        <h4 style={{ fontSize: '0.9rem', color: '#00f3ff', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Module Progress
        </h4>

        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00ff66', fontFamily: 'var(--font-mono)', marginBottom: '0.35rem' }}>
          {progressPercent}%
        </div>

        <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.25rem' }}>
          <div style={{ height: '100%', width: `${progressPercent}%`, background: 'linear-gradient(90deg, #00f3ff, #00ff66)' }} />
        </div>

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem', fontSize: '0.8rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div>Category: <strong style={{ color: '#ffffff' }}>{activeModule.category}</strong></div>
          <div>Level: <strong style={{ color: '#00f3ff' }}>{activeModule.difficulty}</strong></div>
          <div>Total XP: <strong style={{ color: '#00ff66' }}>+{activeItem.xp || 50} XP</strong></div>
        </div>
      </div>
    </div>
  );
}
