import React, { useState } from 'react';
import { Terminal, Shield, Sparkles, Send, Copy, Check, MapPin, CloudRain, Users, AlertOctagon, RefreshCw } from 'lucide-react';

const API_BASE = "http://127.0.0.1:8000/api";

const PRESET_REPORTS = [
  {
    label: "💥 Accident on ORR Bellandur",
    text: "Serious collision between two vehicles on ORR East 1 near Bellandur ecospace. Multiple lanes blocked, heavy congestion building up, light tow-crane requested."
  },
  {
    label: "🌧️ Flooding at Silk Board",
    text: "Heavy downpour has caused deep waterlogging on Hosur Road near Silk Board. Traffic is completely stalled. Requires immediate road closure and pump coordination."
  },
  {
    label: "🚗 VIP Convoy on Old Madras Road",
    text: "VIP movement expected on Old Madras Road towards indiranagar between 5:30 PM and 6:30 PM. Clear traffic corridors early and keep warning barricades ready."
  },
  {
    label: "📣 Protest Rally at Hebbal",
    text: "Protest march starting on Bellary road near Hebbal / Manyata tech park. Major rally blocking all incoming lanes. Full diversion needed."
  }
];

export default function AICommandAgent() {
  const [reportText, setReportText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressLog, setProgressLog] = useState([]);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [demoMode, setDemoMode] = useState(true);

  const runProgressSimulation = async () => {
    const logs = demoMode ? [
      "🔍 [Demo Mode] Initializing ASTRAM offline Pipeline...",
      "🧠 [Demo Mode] Mapped mock NLP incident entities...",
      "🌐 [Demo Mode] Mapped mock coordinates & corridor names...",
      "🌤️ Querying real-time weather from Open-Meteo service...",
      "⚡ Injecting weather modifiers and running XGBoost clearance predictor...",
      "🚓 Calculating inverse-distance station police allocations...",
      "🚧 Mapping nearest tactical spillover junctions...",
      "📋 Compiling mock tactical diversion instructions...",
      "✍️ Drafting mock radio dispatch orders..."
    ] : [
      "🔍 Initializing ASTRAM Agentic Pipeline...",
      "🧠 Performing Natural Language parsing and entity extraction...",
      "🌐 Geolocating incident coordinates & corridor mappings...",
      "🌤️ Querying real-time weather from Open-Meteo service...",
      "⚡ Injecting weather modifiers and running XGBoost clearance predictor...",
      "🚓 Calculating inverse-distance station police allocations...",
      "🚧 Mapping nearest tactical spillover junctions...",
      "📋 Compiling step-by-step diversion instructions...",
      "✍️ Drafting official Command Dispatch Order briefing..."
    ];

    setProgressLog([]);
    for (let i = 0; i < logs.length; i++) {
      await new Promise(r => setTimeout(r, 220));
      setProgressLog(prev => [...prev, logs[i]]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reportText.trim()) return;

    setIsProcessing(true);
    setResult(null);

    // Run terminal logs simulation
    await runProgressSimulation();

    try {
      const res = await fetch(`${API_BASE}/agent/command?testing=${demoMode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text_report: reportText })
      });

      if (!res.ok) throw new Error("Failed to process command agent request");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setProgressLog(prev => [...prev, "❌ Error processing request. Check backend logs."]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyBriefing = () => {
    if (!result?.dispatch_briefing) return;
    navigator.clipboard.writeText(result.dispatch_briefing);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCause = (cause) => {
    return String(cause || '').replace(/_/g, ' ').toUpperCase();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="panel" style={{ marginBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
          <Sparkles color="#6366f1" size={24} />
          <h2 className="panel-title" style={{ fontSize: '1.4rem' }}>AI Tactical Command Agent</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '800px' }}>
          Deploy ASTRAM's Agentic interface to ingest raw, unstructured notifications (social media feeds, citizen tips, field reports).
          The agent parses coordinates, analyzes local weather impact, runs predict models, and drafts tactical radio dispatch briefs.
        </p>
      </div>

      <div className="grid-2">
        {/* Left Side: Input & Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="panel" style={{ height: 'fit-content' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: '#a5b4fc' }}>Ingest Unstructured Log</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <textarea
                  rows={4}
                  className="form-control"
                  placeholder="Paste unstructured incident report description (e.g. coordinates, location landmarks, road closure signs)..."
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  disabled={isProcessing}
                  style={{ resize: 'none', fontSize: '0.95rem', background: 'rgba(10,12,22,0.7)' }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                  PRESETS FOR DEMO:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {PRESET_REPORTS.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setReportText(preset.text)}
                      disabled={isProcessing}
                      style={{
                        padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(99,102,241,0.2)',
                        background: 'rgba(30,41,59,0.3)', color: '#e2e8f0', fontSize: '11px',
                        cursor: 'pointer', transition: 'all 0.2s'
                      }}
                      onMouseOver={e => e.target.style.borderColor = '#6366f1'}
                      onMouseOut={e => e.target.style.borderColor = 'rgba(99,102,241,0.2)'}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                <input
                  type="checkbox"
                  id="demoMode"
                  checked={demoMode}
                  onChange={(e) => setDemoMode(e.target.checked)}
                  disabled={isProcessing}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <label htmlFor="demoMode" style={{ fontSize: '12px', color: '#c7d2fe', cursor: 'pointer', fontWeight: '500' }}>
                  Demo Mode (Offline / Mock Gemini responses to bypass API rate limits)
                </label>
              </div>

              <button type="submit" className="btn-primary" disabled={isProcessing || !reportText.trim()}>
                {isProcessing ? (
                  <>
                    <RefreshCw className="animate-spin" size={16} style={{ animation: 'spin 1.5s linear infinite' }} />
                    Analyzing Intelligence...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Run Agent Command
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Terminal Console */}
          {(isProcessing || progressLog.length > 0) && (
            <div className="panel" style={{ background: '#070a13', borderColor: '#1e293b', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.75rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.5rem' }}>
                <Terminal size={14} color="#10b981" />
                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#10b981', fontWeight: '700', letterSpacing: '0.5px' }}>
                  AGENT CONSOLE WORKSPACE
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '180px', overflowY: 'auto' }}>
                {progressLog.map((log, idx) => (
                  <div key={idx} style={{ fontFamily: 'monospace', fontSize: '11px', color: '#94a3b8' }}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Results */}
        <div>
          {result ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Target & Weather Info Row */}
              <div className="panel" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <span className="badge badge-high" style={{ marginBottom: '6px' }}>
                      {formatCause(result.parsed_parameters.cause)}
                    </span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#fff' }}>
                      {result.parsed_parameters.corridor} Corridor
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      <MapPin size={12} />
                      <span>{Number(result.parsed_parameters.latitude).toFixed(4)}, {Number(result.parsed_parameters.longitude).toFixed(4)}</span>
                      <span style={{ margin: '0 4px' }}>·</span>
                      <span>Hour {result.parsed_parameters.hour}:00</span>
                    </div>
                  </div>

                  {result.prediction.weather && (
                    <div style={{
                      background: result.prediction.weather.is_raining ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${result.prediction.weather.is_raining ? 'rgba(59,130,246,0.3)' : 'var(--border-color)'}`,
                      borderRadius: '8px', padding: '8px 12px', minWidth: '120px', display: 'flex', alignItems: 'center', gap: '8px'
                    }}>
                      <CloudRain color={result.prediction.weather.is_raining ? '#3b82f6' : '#94a3b8'} size={24} />
                      <div>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Live Weather</div>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#fff' }}>{result.prediction.weather.description}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{result.prediction.weather.temperature}°C</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Resource Requirements & Dispatch Order */}
              <div className="panel" style={{ padding: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#a5b4fc', marginBottom: '0.75rem' }}>Resource Recommendations</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
                  <div style={{
                    background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.2)',
                    borderRadius: '8px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px'
                  }}>
                    <Users color="#6366f1" size={20} />
                    <div>
                      <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Total Constables</div>
                      <div style={{ fontSize: '16px', fontWeight: '800' }}>{result.prediction.resources.manpower.total_officers} Officers</div>
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)',
                    borderRadius: '8px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px'
                  }}>
                    <AlertOctagon color="#f59e0b" size={20} />
                    <div>
                      <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Road Closures</div>
                      <div style={{ fontSize: '16px', fontWeight: '800' }}>{result.prediction.resources.barricades} Barricades</div>
                    </div>
                  </div>
                </div>

                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Station Deployment Dispatch</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {result.prediction.resources.station_allocations.map((alloc, idx) => (
                    <div key={idx} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      background: 'rgba(255,255,255,0.02)', padding: '6px 12px', borderRadius: '6px',
                      border: '1px solid rgba(255,255,255,0.04)'
                    }}>
                      <span style={{ fontSize: '11px', fontWeight: '600', color: '#e2e8f0', textTransform: 'capitalize' }}>{alloc.station} Station</span>
                      <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>{alloc.officers} Officers dispatch</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diversion Directives */}
              <div className="panel" style={{ padding: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#a5b4fc', marginBottom: '0.5rem' }}>Tactical Diversion Plan</h4>
                <p style={{ fontSize: '12px', color: '#e2e8f0', marginBottom: '0.75rem', fontWeight: '600', lineSpacing: '1.4' }}>
                  💡 {result.prediction.diversion_plan?.summary || "No summary provided."}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {Array.isArray(result.prediction.diversion_plan?.steps) && result.prediction.diversion_plan.steps.map((step, idx) => (
                    <div key={idx} style={{
                      fontSize: '11px', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)',
                      padding: '6px 10px', borderRadius: '6px', borderLeft: '3px solid #6366f1'
                    }}>
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Dispatch Memo */}
              <div className="panel" style={{ padding: '1.25rem', borderColor: '#10b981' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Shield size={14} color="#10b981" />
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#10b981' }}>ASTRAM COMMAND CENTER RADIO LOG</span>
                  </div>
                  <button
                    onClick={handleCopyBriefing}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '4px', background: 'transparent',
                      border: 'none', cursor: 'pointer', color: '#10b981', fontSize: '11px', fontWeight: '600'
                    }}
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? 'Copied!' : 'Copy Memo'}
                  </button>
                </div>
                <textarea
                  readOnly
                  rows={10}
                  className="form-control"
                  style={{
                    fontFamily: 'monospace', fontSize: '11px', resize: 'none',
                    lineHeight: '1.4', background: '#05070c', color: '#a7f3d0'
                  }}
                  value={result.dispatch_briefing}
                />
              </div>
            </div>
          ) : (
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px', textAlign: 'center' }}>
              <Terminal size={40} color="var(--text-secondary)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Command Intelligence Awaiting Input</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', maxWidth: '300px' }}>
                Enter or select a raw incident report log on the left to process tactical dispatch parameters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
