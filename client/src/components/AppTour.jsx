import React, { useEffect, useState, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Compass, Bot, Map, BarChart2, LayoutDashboard } from 'lucide-react';

const TOUR_KEY = 'astram_toured_v2';
const PAD = 14;

// `tab` = which app tab to navigate to before showing this step (null = stay on current)
const STEPS = [
  {
    id: 'welcome',
    tab: 'command',     // always start from Command Center
    target: null,       // centre-screen modal
    icon: <LayoutDashboard size={26} color="#3b82f6" />,
    title: 'Welcome to ASTRAM',
    body: "ASTRAM is Bengaluru's AI-powered traffic obstruction and event intelligence platform. It helps traffic police respond faster using ML prediction, tactical deployment orders, and real-time hotspot mapping.",
    tip: 'This tour takes ~60 seconds. You can skip at any time or re-open it with the ? button.',
  },
  {
    id: 'command',
    tab: null,
    target: 'tour-command-center',
    icon: <LayoutDashboard size={26} color="#3b82f6" />,
    title: 'Command Center',
    body: 'Your dashboard home. See live KPI metrics, system health, top chronic hotspots, and quick-access cards to every major feature.',
    tip: 'The KPIs update whenever you upload new incident data from the Model Health tab.',
  },
  {
    id: 'agent',
    tab: null,
    target: 'tab-agent',    // always-visible nav button in header
    icon: <Bot size={26} color="#8b5cf6" />,
    title: 'Dispatch AI Agent',
    body: "Paste any field incident report in plain English. ASTRAM's pipeline parses it, fetches real-time weather, runs the ML models, and produces a full tactical response with radio dispatch orders.",
    tip: 'Try the preset report buttons to see a live demo without the backend.',
  },
  {
    id: 'planner',
    tab: null,
    target: 'tab-planner',  // always-visible nav button
    icon: <Compass size={26} color="#10b981" />,
    title: 'Predict & Plan',
    body: 'Simulate the impact of an upcoming or unplanned event. Set location, cause, hour and day — get duration forecasts, manpower estimates, detour routes, and what-if scenario analysis.',
    tip: 'Drag the map marker to set the exact incident location.',
  },
  {
    id: 'live',
    tab: null,
    target: 'tab-live',     // always-visible nav button
    icon: <Map size={26} color="#f59e0b" />,
    title: 'Hotspot Map',
    body: 'Visualizes AI-clustered (DBSCAN) congestion zones across Bengaluru. Critical clusters pulse in red, high-risk in orange, moderate in indigo. The sidebar shows real-time surge alerts.',
    tip: 'Click any cluster circle on the map for incident count and risk score.',
  },
  {
    id: 'analytics',
    tab: null,
    target: 'tab-analytics', // always-visible nav button
    icon: <BarChart2 size={26} color="#6366f1" />,
    title: 'Analytics',
    body: 'Deep-dive into historical data with three focused views: Overview for distributions, Trends for seasonal & hourly heatmaps, and Model Health for diagnostics, XAI feature weights, and retraining.',
    tip: 'Upload new CSV event data in Model Health → Retrain to improve predictions.',
  },
];

export default function AppTour({ forceOpen, onClose, onNavigate }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [spotRect, setSpotRect] = useState(null);
  const [tipPos, setTipPos] = useState({ top: 0, left: 0, placement: 'center' });
  const [posReady, setPosReady] = useState(false);
  const tooltipRef = useRef(null);
  const rafRef = useRef(null);

  // Show on first visit, or when forceOpen toggles
  useEffect(() => {
    const done = localStorage.getItem(TOUR_KEY);
    if (!done || forceOpen) {
      // Eagerly switch to command tab before anything else so DOM elements exist
      if (onNavigate) onNavigate('command');
      setStep(0);
      setVisible(true);
    }
  }, [forceOpen]); // eslint-disable-line

  const currentStep = STEPS[step];

  // Navigate to required tab when step changes
  useEffect(() => {
    if (!visible) return;
    if (currentStep.tab && onNavigate) {
      onNavigate(currentStep.tab);
    }
  }, [step, visible]); // eslint-disable-line

  // Compute spotlight + tooltip position (runs after DOM settles)
  const computePositions = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (!currentStep.target) {
        setSpotRect(null);
        setTipPos({ top: 0, left: 0, placement: 'center' });
        setPosReady(true);
        return;
      }

      const el = document.getElementById(currentStep.target);
      if (!el) {
        setSpotRect(null);
        setTipPos({ top: 0, left: 0, placement: 'center' });
        setPosReady(true);
        return;
      }

      const r = el.getBoundingClientRect();
      const spot = {
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
      };
      setSpotRect(spot);

      // Choose tooltip placement
      const spaceBelow = window.innerHeight - r.bottom;
      const placement = spaceBelow >= 260 ? 'below' : 'above';

      const tipW = 360;
      const rawLeft = r.left + r.width / 2 - tipW / 2;
      const left = Math.max(12, Math.min(rawLeft, window.innerWidth - tipW - 12));

      const top = placement === 'below'
        ? r.bottom + PAD + 10
        : r.top - PAD - 260; // approximate tooltip height

      setTipPos({ top, left, placement });
      setPosReady(true);
    });
  }, [currentStep]);

  // Recompute on step/visibility change — 200ms delay gives tab/DOM time to render
  useEffect(() => {
    if (!visible) return;
    setPosReady(false);
    const t = setTimeout(computePositions, 200);
    window.addEventListener('resize', computePositions);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', computePositions);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [step, visible, computePositions]);

  const finishTour = () => {
    localStorage.setItem(TOUR_KEY, '1');
    setVisible(false);
    if (onClose) onClose();
  };

  const goTo = (idx) => {
    setPosReady(false);
    setStep(idx);
  };

  const next = () => step < STEPS.length - 1 ? goTo(step + 1) : finishTour();
  const prev = () => step > 0 && goTo(step - 1);

  if (!visible) return null;

  const isCenter = !currentStep.target || tipPos.placement === 'center';

  return (
    <>
      {/* ── Backdrop / Spotlight ─────────────────────────────── */}
      <div className="tour-backdrop">
        {spotRect ? (
          <svg
            style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10000 }}
          >
            <defs>
              <mask id="tour-mask">
                <rect width="100%" height="100%" fill="white" />
                <rect
                  x={spotRect.left - PAD}
                  y={spotRect.top - PAD}
                  width={spotRect.width + PAD * 2}
                  height={spotRect.height + PAD * 2}
                  rx="10"
                  fill="black"
                  style={{ transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)' }}
                />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="rgba(0,0,0,0.70)" mask="url(#tour-mask)" />
            {/* Highlight ring */}
            <rect
              x={spotRect.left - PAD}
              y={spotRect.top - PAD}
              width={spotRect.width + PAD * 2}
              height={spotRect.height + PAD * 2}
              rx="10"
              fill="none"
              stroke="rgba(59,130,246,0.8)"
              strokeWidth="2"
              style={{ transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)' }}
            />
          </svg>
        ) : (
          <div className="tour-full-overlay" />
        )}
      </div>

      {/* ── Tooltip Card ─────────────────────────────────────── */}
      <div
        ref={tooltipRef}
        className={`tour-tooltip ${isCenter ? 'tour-tooltip--center' : ''}`}
        style={isCenter ? {} : {
          position: 'fixed',
          top: tipPos.top,
          left: tipPos.left,
          zIndex: 10001,
          // smooth slide between positions
          transition: 'top 0.3s cubic-bezier(0.16,1,0.3,1), left 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.2s',
          opacity: 1,
        }}
      >
        {/* Header */}
        <div className="tour-tooltip-header">
          <div className="tour-tooltip-icon">{currentStep.icon}</div>
          <div style={{ flex: 1 }}>
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
              onClick={() => goTo(i)}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="tour-nav">
          <button className="tour-btn tour-btn--ghost" onClick={finishTour}>Skip</button>
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
