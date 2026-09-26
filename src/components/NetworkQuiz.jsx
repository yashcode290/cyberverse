import React, { useState } from 'react';
import { networkQuiz } from '../data/networkQuiz';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCw, Award } from 'lucide-react';

export default function NetworkQuiz({ onAddXP }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = networkQuiz[currentIndex];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
      onAddXP(30);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < networkQuiz.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const totalXP = score * 30;
    return (
      <div className="cyber-card cyber-card-glow-cyan" style={{ textAlign: 'center', padding: '3rem 2rem', maxWidth: '650px', margin: '0 auto' }}>
        <Award size={54} color="#00ff66" style={{ margin: '0 auto 1rem auto' }} />
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Quiz Completed!</h2>
        <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '1.5rem' }}>
          You scored <strong style={{ color: '#00f3ff' }}>{score}</strong> out of <strong>{networkQuiz.length}</strong> questions correctly.
        </p>

        <div style={{
          background: 'rgba(0, 255, 102, 0.1)',
          border: '1px solid rgba(0, 255, 102, 0.3)',
          padding: '1.25rem',
          borderRadius: '12px',
          margin: '0 auto 2rem auto',
          maxWidth: '300px'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Earned Quiz XP</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00ff66', fontFamily: 'var(--font-mono)' }}>
            +{totalXP} XP
          </div>
        </div>

        <button onClick={handleRestart} className="btn-cyber-primary">
          <RotateCw size={18} /> Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Quiz Header */}
      <div className="cyber-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge badge-amber" style={{ marginBottom: '0.35rem' }}>Self Assessment</span>
          <h2 style={{ fontSize: '1.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HelpCircle color="#ffd166" /> Network Security Quiz Engine
          </h2>
        </div>
        <div style={{ fontSize: '0.9rem', color: '#00f3ff', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
          Question {currentIndex + 1} / {networkQuiz.length}
        </div>
      </div>

      {/* Question Card */}
      <div className="cyber-card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '1.5rem', lineHeight: '1.5' }}>
          {currentQ.question}
        </h3>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {currentQ.options.map((opt, idx) => {
            let btnStyle = {
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#cbd5e1'
            };

            if (isAnswered) {
              if (idx === currentQ.correctIndex) {
                btnStyle = {
                  background: 'rgba(0, 255, 102, 0.15)',
                  border: '1px solid #00ff66',
                  color: '#00ff66'
                };
              } else if (idx === selectedOption) {
                btnStyle = {
                  background: 'rgba(255, 51, 102, 0.15)',
                  border: '1px solid #ff3366',
                  color: '#ff3366'
                };
              }
            } else if (selectedOption === idx) {
              btnStyle = {
                background: 'rgba(0, 243, 255, 0.15)',
                border: '1px solid #00f3ff',
                color: '#ffffff'
              };
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                style={{
                  ...btnStyle,
                  padding: '1rem 1.25rem',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  textAlign: 'left',
                  cursor: isAnswered ? 'default' : 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontWeight: 500
                }}
              >
                <span>{opt}</span>
                {isAnswered && idx === currentQ.correctIndex && <CheckCircle2 size={18} color="#00ff66" />}
                {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && <XCircle size={18} color="#ff3366" />}
              </button>
            );
          })}
        </div>

        {/* Explanation Box */}
        {isAnswered && (
          <div style={{
            background: 'rgba(0, 243, 255, 0.08)',
            border: '1px solid rgba(0, 243, 255, 0.25)',
            padding: '1rem 1.25rem',
            borderRadius: '8px',
            color: '#e2e8f0',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem'
          }}>
            <strong style={{ color: '#00f3ff' }}>Explanation: </strong> {currentQ.explanation}
          </div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleNext} className="btn-cyber-primary">
              Next Question <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
