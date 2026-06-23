import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Activity } from 'lucide-react';

export default function CorrelationGrid({ correlationData }) {
  const [hoveredCorrelation, setHoveredCorrelation] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  if (!correlationData) return null;

  const getCorrelationColor = (val) => {
    if (val === 1) return 'rgba(59, 130, 246, 0.9)'; // Diagonal
    if (val > 0) return `rgba(59, 130, 246, ${val * 0.85})`; // Positive correlation (Blue)
    if (val < 0) return `rgba(239, 68, 68, ${Math.abs(val) * 0.85})`; // Negative correlation (Red)
    return 'rgba(148, 163, 184, 0.15)';
  };

  return (
    <div className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 className="panel-title" style={{ marginBottom: '0.5rem' }}>Feature Correlation Matrix (Hidden Traffic Relationships)</h2>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        This matrix displays calculated relationships between variables. Hover over cells to inspect hidden traffic congestion drivers.
        <span style={{ color: 'var(--primary)', marginLeft: '1rem', fontWeight: 'bold' }}>Blue = Positive Correlation</span>, 
        <span style={{ color: 'var(--danger)', marginLeft: '1rem', fontWeight: 'bold' }}>Red = Negative Correlation</span>.
      </p>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* Interactive Matrix */}
        <div style={{
          display: 'grid', 
          gridTemplateColumns: `repeat(${correlationData.labels.length}, 1fr)`,
          gap: '2px',
          background: 'var(--terminal-bg)',
          padding: '4px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          width: '100%',
          aspectRatio: '1/1',
          maxWidth: '100%',
          maxHeight: '100%',
          margin: '0 auto'
        }}>
          {correlationData.matrix.map((row, rIdx) => 
            row.map((val, cIdx) => (
              <div 
                key={`${rIdx}-${cIdx}`}
                style={{
                  background: getCorrelationColor(val),
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.1s ease',
                  boxShadow: hoveredCorrelation && hoveredCorrelation.row === rIdx && hoveredCorrelation.col === cIdx ? 'inset 0 0 0 2px var(--text-primary)' : 'none'
                }}
                onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                onMouseEnter={() => setHoveredCorrelation({
                  row: rIdx,
                  col: cIdx,
                  val: val,
                  labelA: correlationData.labels[rIdx],
                  labelB: correlationData.labels[cIdx]
                })}
                onMouseLeave={() => setHoveredCorrelation(null)}
              />
            ))
          )}
        </div>

        {hoveredCorrelation && createPortal(
          <div style={{
            position: 'fixed',
            left: mousePos.x + 15,
            top: mousePos.y + 15,
            transform: `translate(
              ${mousePos.x + 350 > window.innerWidth ? 'calc(-100% - 30px)' : '0px'},
              ${mousePos.y + 350 > window.innerHeight ? 'calc(-100% - 30px)' : '0px'}
            )`,
            zIndex: 999999,
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'var(--card-bg)',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
            pointerEvents: 'none'
          }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Correlation Analyzer</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.25rem', wordBreak: 'break-word' }}>{hoveredCorrelation.labelA}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>vs.</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem', wordBreak: 'break-word' }}>{hoveredCorrelation.labelB}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{
                fontSize: '2rem', 
                fontWeight: '800', 
                color: hoveredCorrelation.val > 0 ? 'var(--primary)' : hoveredCorrelation.val < 0 ? 'var(--danger)' : 'var(--text-primary)'
              }}>{hoveredCorrelation.val.toFixed(3)}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>(Pearson r)</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: '1.4' }}>
              {hoveredCorrelation.val > 0.4 ? "Strong positive relationship. An increase in one variable strongly correlates with an increase in the other." :
               hoveredCorrelation.val > 0.15 ? "Moderate positive relationship." :
               hoveredCorrelation.val < -0.4 ? "Strong negative relationship. An increase in one variable strongly correlates with a decrease in the other." :
               hoveredCorrelation.val < -0.15 ? "Moderate negative relationship." :
               "Weak or negligible correlation."}
            </p>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
}
