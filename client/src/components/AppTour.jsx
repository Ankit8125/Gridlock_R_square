import React, { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Compass, Bot, Map, BarChart2, BookOpen, LayoutDashboard } from 'lucide-react';

const TOUR_KEY = 'astram_toured_v2';

const STEPS = [
  {
    id: 'welcome',
    target: null, // centre-screen modal, no spotlight
    icon: <LayoutDashboard size={28} color="#3b82f6" />,
    title: 'Welcome to ASTRAM',
    body: 'ASTRAM is Bengaluru\'s AI-powered traffic obstruction and event intelligence platform. It helps traffic police respond faster using ML prediction, tactical deployment orders, and real-time hotspot mapping.',
    tip: 'This tour takes ~60 seconds. You can skip at any time or re-open it with the ? button.',
  },
  {
    id: 'command',
    target: 'tour-command-center',
    icon: <LayoutDashboard size={28} color="#3b82f6" />,
    title: 'Command Center',
    body: 'Your dashboard home. See live KPI metrics, system health, top chronic hotspots, and quick-access cards to every major feature. Always start here.',
    tip: 'The KPIs update whenever you upload new incident data.',
  },
  {
    id: 'agent',
    target: 'tour-dispatch-ai',
    icon: <Bot size={28} color="#8b5cf6" />,
    title: 'Dispatch AI Agent',
    body: 'Paste any field incident report in plain English. ASTRAM\'s agentic pipeline parses it, fetches real-time weather, runs the ML models, and produces a complete tactical response with radio dispatch orders.',
    tip: 'Try the preset report buttons to see a live demo without the backend.',
  },
  {
    id: 'planner',
    target: 'tab-planner',
    icon: <Compass size={28} color="#10b981" />,
    title: 'Predict & Plan',
    body: 'Simulate the impact of an upcoming or unplanned event before it happens. Set location, cause, hour, and day — get duration forecasts, manpower estimates, detour routes, and what-if scenario analysis.',
    tip: 'Drag the map marker to set the exact incident location.',
  },
  {
    id: 'live',
    target: 'tab-live',
    icon: <Map size={28} color="#f59e0b" />,
    title: 'Hotspot Map',
    body: 'Visualizes AI-clustered (DBSCAN) congestion zones across Bengaluru. Critical clusters pulse in red, high-risk in orange, moderate in indigo. The sidebar shows real-time surge alerts.',
    tip: 'Click any cluster circle on the map for incident count and risk score.',
  },
  {
    id: 'analytics',
    target: 'tab-analytics',
    icon: <BarChart2 size={28} color="#6366f1" />,
    title: 'Analytics',
    body: 'Deep-dive into historical data. Use the three internal tabs: Overview for incident distributions, Trends for seasonal and hourly heatmaps, and Model Health for diagnostics, XAI feature weights, and model retraining.',
    tip: 'You can upload new CSV event data in Model Health → Retrain section to improve predictions.',
  },
];

function getElementRect(id) {
  const el = document.getElementById(id);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height,
  };
}

const PAD = 16;

export default function AppTour({ forceOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [spotRect, setSpotRect] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0, placement: 'bottom' });

  // Decide whether to show on mount
  useEffect(() => {
    const done = localStorage.getItem(TOUR_KEY);
    if (!done || forceOpen) {
      setVisible(true);
      setStep(0);
    }
  }, [forceOpen]);

  const currentStep = STEPS[step];

  // Recompute spotlight + tooltip whenever step changes
  const computePositions = useCallback(() => {
    if (!currentStep.target) {
      setSpotRect(null);
      setTooltipPos({ top: '50%', left: '50%', placement: 'center' });
      return;
    }

    const rect = getElementRect(currentStep.target);
    if (!rect) {
      setSpotRect(null);
      setTooltipPos({ top: '50%', left: '50%', placement: 'center' });
      return;
    }

    setSpotRect(rect);

    // Figure out where to place the tooltip card
    const vp = window.innerHeight;
    const spaceBelow = vp - (rect.top - window.scrollY) - rect.height;
    const placement = spaceBelow > 240 ? 'bottom' : 'top';

    const tipLeft = Math.max(12, Math.min(
      rect.left + rect.width / 2 - 180,
      window.innerWidth - 380
    ));

    const tipTop = placement === 'bottom'
      ? rect.top + rect.height + PAD
      : rect.top - PAD - 240;

    setTooltipPos({ top: tipTop, left: tipLeft, placement });
  }, [currentStep]);

  useEffect(() => {
    if (!visible) return;
    // Small delay to allow DOM transitions to finish
    const t = setTimeout(computePositions, 80);
    window.addEventListener('resize', computePositions);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', computePositions);
    };
  }, [visible, step, computePositions]);

  // Scroll element into view when step changes
  useEffect(() => {
    if (!visible || !currentStep.target) return;
    const el = document.getElementById(currentStep.target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [step, visible, currentStep.target]);

  const finishTour = () => {
    localStorage.setItem(TOUR_KEY, '1');
    setVisible(false);
    if (onClose) onClose();
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else finishTour();
  };

  const prev = () => {
    if (step > 0) setStep(s => s - 1);
  };

  if (!visible) return null;

  const isCenter = tooltipPos.placement === 'center';

  return (
    <>
      {/* Backdrop overlay — SVG cut-out spotlight */}
      <div className="tour-backdrop" onClick={(e) => e.stopPropagation()}>
        {spotRect ? (
          <svg
            className="tour-svg"
            width="100%"
            height="100%"
            style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}
          >
            <defs>
              <mask id="tour-mask">
                <rect width="100%" height="100%" fill="white" />
                <rect
                  x={spotRect.left - window.scrollX - PAD}
                  y={spotRect.top - window.scrollY - PAD}
                  width={spotRect.width + PAD * 2}
                  height={spotRect.height + PAD * 2}
                  rx="12"
                  fill="black"
                />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="rgba(0,0,0,0.72)"
              mask="url(#tour-mask)"
            />
            {/* Highlight ring */}
            <rect
              x={spotRect.left - window.scrollX - PAD}
              y={spotRect.top - window.scrollY - PAD}
              width={spotRect.width + PAD * 2}
              height={spotRect.height + PAD * 2}
              rx="12"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              opacity="0.8"
            />
          </svg>
        ) : (
          <div className="tour-full-overlay" />
        )}
      </div>

      {/* Tooltip Card */}
      <div
        className={`tour-tooltip ${isCenter ? 'tour-tooltip--center' : ''}`}
        style={isCenter ? {} : {
          position: 'fixed',
          top: tooltipPos.top - window.scrollY,
          left: tooltipPos.left,
          zIndex: 10001,
        }}
      >
        {/* Header */}
        <div className="tour-tooltip-header">
          <div className="tour-tooltip-icon">{currentStep.icon}</div>
          <div>
            <div className="tour-step-count">Step {step + 1} of {STEPS.length}</div>
            <div className="tour-tooltip-title">{currentStep.title}</div>
          </div>
          <button className="tour-close" onClick={finishTour} title="Skip tour">
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <p className="tour-tooltip-body">{currentStep.body}</p>

        {/* Tip */}
        {currentStep.tip && (
          <div className="tour-tip">
            <span className="tour-tip-label">💡 Tip:</span> {currentStep.tip}
          </div>
        )}

        {/* Progress dots */}
        <div className="tour-dots">
          {STEPS.map((_, i) => (
            <button
              key={i}
              className={`tour-dot ${i === step ? 'tour-dot--active' : ''}`}
              onClick={() => setStep(i)}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="tour-nav">
          <button className="tour-btn tour-btn--ghost" onClick={finishTour}>
            Skip
          </button>
          <div style={{ display: 'flex', gap: '8px' }}>
            {step > 0 && (
              <button className="tour-btn tour-btn--secondary" onClick={prev}>
                <ChevronLeft size={14} /> Back
              </button>
            )}
            <button className="tour-btn tour-btn--primary" onClick={next}>
              {step === STEPS.length - 1 ? 'Get Started' : 'Next'} <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
