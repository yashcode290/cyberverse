import React, { useState } from 'react';
import { portFlashcards } from '../data/portFlashcards';
import { Layers, RotateCw, ArrowLeft, ArrowRight, ShieldAlert, CheckCircle2, Search } from 'lucide-react';

export default function PortFlashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredPorts, setMasteredPorts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCards = portFlashcards.filter(card => 
    card.port.includes(searchTerm) || 
    card.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCard = filteredCards[currentIndex] || filteredCards[0] || portFlashcards[0];
  const isMastered = masteredPorts.includes(activeCard.id);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const toggleMastered = (id) => {
    if (masteredPorts.includes(id)) {
      setMasteredPorts(masteredPorts.filter(pId => pId !== id));
    } else {
      setMasteredPorts([...masteredPorts, id]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div className="cyber-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-purple">Memory Deck</span>
            <span className="badge badge-amber">Network Ports</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers color="#9d4edd" /> Port & Protocol Master Cards
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Click the card to flip and test your port number memory!
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={16} color="#64748b" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search port / protocol..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            style={{
              background: '#050811',
              border: '1px solid rgba(157, 78, 221, 0.3)',
              color: '#ffffff',
              fontSize: '0.85rem',
              padding: '0.5rem 0.85rem 0.5rem 2.2rem',
              borderRadius: '8px',
              outline: 'none',
              width: '200px'
            }}
          />
        </div>
      </div>

      {/* Progress & Deck Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
        <div>Card {currentIndex + 1} of {filteredCards.length}</div>
        <div style={{ color: '#00ff66', fontWeight: 600 }}>
          {masteredPorts.length} of {portFlashcards.length} Ports Mastered
        </div>
      </div>

      {/* 3D Flashcard Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          perspective: '1000px',
          cursor: 'pointer',
          minHeight: '340px'
        }}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          height: '340px',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}>
          {/* FRONT OF CARD */}
          <div className="cyber-card cyber-card-glow-cyan" style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '2rem',
            background: 'linear-gradient(135deg, #0e1526 0%, #152038 100%)'
          }}>
            <span className="badge badge-cyan" style={{ marginBottom: '1rem' }}>
              PORT NUMBER
            </span>
            <div style={{ fontSize: '4.5rem', fontWeight: 800, color: '#00f3ff', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
              {activeCard.port}
            </div>
            <h3 style={{ fontSize: '1.6rem', marginTop: '0.75rem', color: '#ffffff' }}>
              {activeCard.protocol}
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.35rem' }}>
              {activeCard.name}
            </p>
            <div style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: '#00f3ff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <RotateCw size={14} /> Click card to flip details
            </div>
          </div>

          {/* BACK OF CARD */}
          <div className="cyber-card" style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.75rem',
            background: 'linear-gradient(135deg, #111c33 0%, #0c1424 100%)',
            border: '1px solid rgba(157, 78, 221, 0.4)'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-purple">{activeCard.layer}</span>
                <span style={{ fontSize: '0.8rem', color: '#00ff66', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  Transport: {activeCard.transport}
                </span>
              </div>

              <h4 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                {activeCard.protocol} (Port {activeCard.port})
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.5', marginBottom: '1rem' }}>
                {activeCard.description}
              </p>

              {/* Vulnerability Note */}
              <div style={{ background: 'rgba(255, 51, 102, 0.1)', border: '1px solid rgba(255, 51, 102, 0.3)', padding: '0.65rem 0.85rem', borderRadius: '6px', fontSize: '0.8rem', color: '#ff3366' }}>
                <strong>Vulnerability Note:</strong> {activeCard.vulnerabilityNote}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.75rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#ffd166', fontStyle: 'italic' }}>
                💡 Memory Trick: {activeCard.mnemonic}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastered(activeCard.id);
                }}
                style={{
                  background: isMastered ? 'rgba(0, 255, 102, 0.2)' : 'transparent',
                  border: `1px solid ${isMastered ? '#00ff66' : 'rgba(255, 255, 255, 0.2)'}`,
                  color: isMastered ? '#00ff66' : '#94a3b8',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <CheckCircle2 size={14} /> {isMastered ? 'Mastered' : 'Mark Mastered'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
        <button onClick={handlePrev} className="btn-cyber-outline" style={{ padding: '0.6rem 1.25rem' }}>
          <ArrowLeft size={18} /> Previous Card
        </button>
        <button onClick={handleNext} className="btn-cyber-primary" style={{ padding: '0.6rem 1.25rem' }}>
          Next Card <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
