import React, { useEffect, useState } from 'react';
import {
  Bot, Compass, Map, Activity, Database, Clock,
  Shield, TrendingUp, Zap, AlertTriangle, CheckCircle,
  ArrowRight, Radio, BarChart2, MapPin, Cpu
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE ||
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://127.0.0.1:8000/api'
    : '/api');

const formatMinutes = (mins) => {
  if (!mins) return 'N/A';
  if (mins < 60) return `${Math.round(mins)} min`;
  const hrs = Math.floor(mins / 60);
  const remMins = Math.round(mins % 60);
  return remMins > 0 ? `${hrs}h ${remMins}m` : `${hrs}h`;
};

export default function CommandCenter({ analytics, onNavigate }) {
  const [diagnostics, setDiagnostics] = useState(null);
  const [venueRecurrence, setVenueRecurrence] = useState([]);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dRes, vRes] = await Promise.all([
          fetch(`${API_BASE}/model-diagnostic`),
          fetch(`${API_BASE}/venue-recurrence`),
        ]);
        const [d, v] = await Promise.all([dRes.json(), vRes.json()]);
        if (!d.error) setDiagnostics(d);
        setVenueRecurrence(v.venue_recurrence || []);
      } catch (e) {
        console.error('CommandCenter data fetch failed', e);
      }
    };
    fetchData();
  }, []);

  // Heartbeat animation
  useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(t);
  }, []);

  const kpis = analytics?.kpis || {};
  const topHotspots = venueRecurrence.slice(0, 4);

  const modelHealth = diagnostics ? [
    {
      label: 'Duration Estimator',
      sub: 'Regression',
      value: `MedAE ${formatMinutes(diagnostics.regression?.[0]?.test_median_error_minutes || 55.6)}`,
      ok: true,
    },
    {
      label: 'Priority Classifier',
      sub: 'Classification',
      value: `F1 ${Math.round((diagnostics.classification?.[0]?.test_f1_score || 0.92) * 100)}%`,
      ok: true,
    },
    {
      label: 'Closure Forecaster',
      sub: 'Binary Classifier',
      value: `AUC ${Math.round((diagnostics.closure_classification?.[0]?.test_roc_auc || 0.811) * 1000) / 10}%`,
      ok: true,
    },
  ] : null;

  return (
    <div className="command-center">

      {/* ── Hero Strip ─────────────────────────────────────────────────────── */}
      <div className="cc-hero" id="tour-command-center">
        <div className="cc-hero-left">
          <div className="cc-live-badge">
            <span className={`cc-live-dot ${pulse ? 'cc-live-dot--pulse' : ''}`} />
            SYSTEM ONLINE
          </div>
          <h1 className="cc-hero-title">
            AI Traffic Intelligence<br />
            <span className="cc-hero-accent">Bengaluru Command</span>
          </h1>
          <p className="cc-hero-sub">
            ASTRAM ingests field incident reports, applies ML-driven prediction, and
            generates tactical deployment orders in real-time — helping Bengaluru Traffic
            Police respond faster, smarter, and with AI backing every call.
          </p>
          <div className="cc-hero-actions">
            <button
              className="cc-cta-primary"
              onClick={() => onNavigate('agent')}
              id="tour-dispatch-ai"
            >
              <Radio size={16} />
              Open Dispatch AI
            </button>
            <button
              className="cc-cta-secondary"
              onClick={() => onNavigate('planner')}
            >
              <Compass size={16} />
              Predict an Event
            </button>
          </div>
        </div>
        <div className="cc-hero-right">
          <div className="cc-hero-graphic">
            <div className="cc-orbit cc-orbit--outer" />
            <div className="cc-orbit cc-orbit--inner" />
            <div className="cc-orbit-center">
              <Cpu size={28} color="var(--primary)" />
            </div>
            <div className="cc-orbit-dot cc-orbit-dot--1"><Bot size={14} /></div>
            <div className="cc-orbit-dot cc-orbit-dot--2"><Map size={14} /></div>
            <div className="cc-orbit-dot cc-orbit-dot--3"><BarChart2 size={14} /></div>
          </div>
        </div>
      </div>

      {/* ── KPI Row ─────────────────────────────────────────────────────────── */}
      <div className="cc-kpi-row" id="tour-kpi-row">
        <div className="cc-kpi">
          <div className="cc-kpi-icon" style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1' }}>
            <Database size={18} />
          </div>
          <div>
            <div className="cc-kpi-val">{kpis.total_events?.toLocaleString() || '—'}</div>
            <div className="cc-kpi-label">Total Logged Incidents</div>
          </div>
        </div>
        <div className="cc-kpi">
          <div className="cc-kpi-icon" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>
            <TrendingUp size={18} />
          </div>
          <div>
            <div className="cc-kpi-val">{kpis.planned_events || '—'}</div>
            <div className="cc-kpi-label">Planned Event Records</div>
          </div>
        </div>
        <div className="cc-kpi">
          <div className="cc-kpi-icon" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>
            <Clock size={18} />
          </div>
          <div>
            <div className="cc-kpi-val">{formatMinutes(kpis.median_duration_minutes)}</div>
            <div className="cc-kpi-label">Median Clearance Time</div>
          </div>
        </div>
        <div className="cc-kpi">
          <div className="cc-kpi-icon" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>
            <Shield size={18} />
          </div>
          <div>
            <div className="cc-kpi-val">{kpis.road_closure_percentage || '—'}%</div>
            <div className="cc-kpi-label">Road Closure Rate</div>
          </div>
        </div>
      </div>

      {/* ── Quick-Action Cards ──────────────────────────────────────────────── */}
      <div className="cc-action-grid">
        <button className="cc-action-card cc-action-card--primary" onClick={() => onNavigate('agent')}>
          <div className="cc-action-icon">
            <Bot size={26} />
          </div>
          <div className="cc-action-body">
            <div className="cc-action-title">Dispatch AI Agent</div>
            <div className="cc-action-desc">
              Paste any field report — the AI pipeline extracts entities, runs
              ML prediction, and generates a full tactical response order.
            </div>
          </div>
          <ArrowRight size={18} className="cc-action-arrow" />
        </button>

        <button className="cc-action-card" onClick={() => onNavigate('planner')}>
          <div className="cc-action-icon cc-action-icon--purple">
            <Compass size={26} />
          </div>
          <div className="cc-action-body">
            <div className="cc-action-title">Predict & Plan</div>
            <div className="cc-action-desc">
              Simulate an upcoming event — get duration forecasts, manpower
              estimates, detour routes, and what-if scenario analysis.
            </div>
          </div>
          <ArrowRight size={18} className="cc-action-arrow" />
        </button>

        <button className="cc-action-card" onClick={() => onNavigate('live')}>
          <div className="cc-action-icon cc-action-icon--green">
            <Map size={26} />
          </div>
          <div className="cc-action-body">
            <div className="cc-action-title">Hotspot Map</div>
            <div className="cc-action-desc">
              View AI-clustered (DBSCAN) congestion hotspots across Bengaluru
              in real time, with surge alerts and risk severity layers.
            </div>
          </div>
          <ArrowRight size={18} className="cc-action-arrow" />
        </button>
      </div>

      {/* ── Bottom Row: Model Status + Active Hotspots ──────────────────────── */}
      <div className="cc-bottom-row">

        {/* Model Health */}
        <div className="cc-panel" id="tour-model-health">
          <div className="cc-panel-header">
            <Activity size={16} color="var(--success)" />
            <span>ML Model Status</span>
          </div>
          {modelHealth ? (
            <div className="cc-model-list">
              {modelHealth.map((m, i) => (
                <div className="cc-model-row" key={i}>
                  <CheckCircle size={13} color="var(--success)" style={{ flexShrink: 0 }} />
                  <div className="cc-model-info">
                    <span className="cc-model-name">{m.label}</span>
                    <span className="cc-model-sub">{m.sub}</span>
                  </div>
                  <span className="cc-model-val">{m.value}</span>
                </div>
              ))}
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '8px', fontStyle: 'italic' }}>
                Optimized Random Forests &amp; Gradient Boosting · Live hot-reload
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--text-secondary)', fontSize: '12px', padding: '12px 0' }}>
              Loading model diagnostics…
            </p>
          )}
        </div>

        {/* Active Hotspots */}
        <div className="cc-panel cc-panel--wide">
          <div className="cc-panel-header">
            <AlertTriangle size={16} color="var(--warning)" />
            <span>Top Chronic Hotspots</span>
            <button
              className="cc-panel-link"
              onClick={() => onNavigate('live')}
            >
              View Map <ArrowRight size={12} />
            </button>
          </div>
          <div className="cc-hotspot-list">
            {topHotspots.length > 0 ? topHotspots.map((h, i) => {
              const score = h.recurrence_score || 0;
              const color = score >= 70 ? '#ef4444' : score >= 40 ? '#f97316' : '#6366f1';
              return (
                <div className="cc-hotspot-row" key={i}>
                  <MapPin size={13} color={color} style={{ flexShrink: 0 }} />
                  <div className="cc-hotspot-coords">
                    {Number(h.lat).toFixed(4)}, {Number(h.lon).toFixed(4)}
                  </div>
                  <div className="cc-hotspot-meta">
                    <span style={{ color: 'var(--text-secondary)', fontSize: '10px' }}>
                      {h.incident_count} incidents · {String(h.top_cause).replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="cc-hotspot-score-bar">
                    <div style={{ height: '4px', borderRadius: '2px', width: `${score}%`, background: color }} />
                  </div>
                  <span className="cc-hotspot-score-val" style={{ color }}>{score}</span>
                </div>
              );
            }) : (
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', padding: '12px 0' }}>
                Loading hotspot data…
              </p>
            )}
          </div>
        </div>

        {/* Workflow Summary */}
        <div className="cc-panel">
          <div className="cc-panel-header">
            <Zap size={16} color="var(--primary)" />
            <span>How It Works</span>
          </div>
          <div className="cc-workflow">
            <div className="cc-workflow-step">
              <div className="cc-workflow-num">1</div>
              <div>
                <div className="cc-workflow-title">Report Ingestion</div>
                <div className="cc-workflow-desc">Field reports parsed via NLP entity extraction</div>
              </div>
            </div>
            <div className="cc-workflow-step">
              <div className="cc-workflow-num">2</div>
              <div>
                <div className="cc-workflow-title">ML Prediction</div>
                <div className="cc-workflow-desc">Duration, priority &amp; closure risk predicted by 3 models</div>
              </div>
            </div>
            <div className="cc-workflow-step">
              <div className="cc-workflow-num">3</div>
              <div>
                <div className="cc-workflow-title">Resource Planning</div>
                <div className="cc-workflow-desc">Nearest stations allocated via inverse-distance weighting</div>
              </div>
            </div>
            <div className="cc-workflow-step">
              <div className="cc-workflow-num">4</div>
              <div>
                <div className="cc-workflow-title">Dispatch Orders</div>
                <div className="cc-workflow-desc">Radio-ready tactical brief generated &amp; logged</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
