import React, { useState } from 'react';
import { Terminal, Shield, Sparkles, Send, Copy, Check, MapPin, CloudRain, Users, AlertOctagon, RefreshCw, Trash2, Clock } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" 
    ? "http://127.0.0.1:8000/api" 
    : "/api");

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

  // Saved Chats State
  const [chatHistory, setChatHistory] = useState(() => {
    try {
      const stored = localStorage.getItem("astram_ai_chat_history");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const runProgressSimulation = async () => {
    const logs = demoMode ? [
      "🔍 [Demo Mode] Initializing ASTRAM offline Pipeline...",
      "🧠 [Demo Mode] Mapped NLP incident entities...",
      "🌐 [Demo Mode] Mapped coordinates & corridor names...",
      "🌤️ Querying real-time weather from Open-Meteo service...",
      "⚡ Running Random Forest / Gradient Boosting clearance predictor...",
      "🚓 Calculating inverse-distance station police allocations...",
      "🚧 Mapping nearest tactical spillover junctions...",
      "📋 Compiling mock tactical diversion instructions...",
      "✍️ Drafting mock radio dispatch orders..."
    ] : [
      "🔍 Initializing ASTRAM Agentic Pipeline...",
      "🧠 Performing Natural Language parsing and entity extraction...",
      "🌐 Geolocating incident coordinates & corridor mappings...",
      "🌤️ Querying real-time weather from Open-Meteo service...",
      "⚡ Running Random Forest / Gradient Boosting clearance predictor...",
      "🚓 Calculating inverse-distance station police allocations...",
      "🚧 Mapping nearest tactical spillover junctions...",
      "📋 Compiling step-by-step diversion instructions...",
      "✍️ Drafting official Command Dispatch Order briefing..."
    ];

    setProgressLog([]);
    for (let i = 0; i < logs.length; i++) {
      await new Promise(r => setTimeout(r, 180));
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

      // Save to chat history
      const newHistoryItem = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString([], { month: 'short', day: 'numeric' }),
        reportText: reportText,
        result: data
      };
      
      setChatHistory(prev => {
        const updated = [newHistoryItem, ...prev].slice(0, 15); // Keep last 15 briefs
        localStorage.setItem("astram_ai_chat_history", JSON.stringify(updated));
        return updated;
      });

    } catch (err) {
      console.error(err);
      setProgressLog(prev => [...prev, "❌ Error processing request. Check backend logs."]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearHistory = () => {
    localStorage.removeItem("astram_ai_chat_history");
    setChatHistory([]);
  };

  const loadHistoryItem = (item) => {
    setReportText(item.reportText);
    setResult(item.result);
    setProgressLog(["📋 Restored briefing from history.", `Time: ${item.date} ${item.timestamp}`]);
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
          <Sparkles color="var(--primary)" size={24} />
          <h2 className="panel-title" style={{ fontSize: '1.4rem' }}>AI Tactical Command Agent</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '800px' }}>
          Deploy ASTRAM's Agentic interface to ingest raw, unstructured notifications (social media feeds, citizen tips, field reports).
          The agent parses coordinates, analyzes local weather impact, runs predict models, and drafts tactical radio dispatch briefs.
        </p>
      </div>

      <div className="grid-2">
        {/* Left Side: Input, Logs, & Chat History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="panel" style={{ height: 'fit-content', marginBottom: 0 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary)' }}>Ingest Unstructured Log</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <textarea
                  rows={4}
                  className="form-control"
                  placeholder="Paste unstructured incident report description (e.g. coordinates, location landmarks, road closure signs)..."
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  disabled={isProcessing}
                  style={{ resize: 'none', fontSize: '0.95rem' }}
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
                        padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-color)',
                        background: 'var(--nav-bg)', color: 'var(--text-primary)', fontSize: '11px',
                        cursor: 'pointer', transition: 'all 0.2s'
                      }}
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
                <label htmlFor="demoMode" style={{ fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: '500' }}>
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
            <div className="panel" style={{ background: 'var(--terminal-bg)', borderColor: 'var(--terminal-border)', padding: '1rem', marginBottom: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <Terminal size={14} color="#10b981" />
                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#10b981', fontWeight: '700', letterSpacing: '0.5px' }}>
                  AGENT CONSOLE WORKSPACE
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '140px', overflowY: 'auto' }}>
                {progressLog.map((log, idx) => (
                  <div key={idx} style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Conversations Sidebar list */}
          <div className="panel" style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={15} color="var(--primary)" />
                AI Analysis History
              </h3>
              {chatHistory.length > 0 && (
                <button 
                  onClick={handleClearHistory} 
                  style={{
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '4px',
                    fontSize: '11px', fontWeight: '600'
                  }}
                >
                  <Trash2 size={12} /> Clear
                </button>
              )}
            </div>

            {chatHistory.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                {chatHistory.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => loadHistoryItem(item)}
                    style={{
                      background: 'var(--nav-bg)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      padding: '8px 10px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseOver={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                    onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '700', color: 'var(--primary)' }}>
                        {formatCause(item.result.parsed_parameters?.cause)}
                      </span>
                      <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                        {item.date} {item.timestamp}
                      </span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.reportText}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-secondary)', fontSize: '11px', textAlign: 'center', padding: '10px 0' }}>
                No past briefs saved.
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Results */}
        <div>
          {isProcessing ? (
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--panel-bg)', borderColor: 'var(--primary)', padding: '1.5rem', minHeight: '400px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '0.5rem' }}>
                <RefreshCw className="animate-spin" size={18} color="var(--primary)" style={{ animation: 'spin 1.5s linear infinite' }} />
                <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary)' }}>ASTRAM AGENT PROCESSING INTEL...</span>
              </div>
              <div style={{ height: '40px', background: 'var(--nav-bg)', borderRadius: '6px', opacity: 0.5, animation: 'pulse 1.5s infinite' }} />
              <div style={{ height: '80px', background: 'var(--nav-bg)', borderRadius: '6px', opacity: 0.5, animation: 'pulse 1.5s infinite' }} />
              <div style={{ height: '120px', background: 'var(--nav-bg)', borderRadius: '6px', opacity: 0.5, animation: 'pulse 1.5s infinite' }} />
              <div style={{ height: '60px', background: 'var(--nav-bg)', borderRadius: '6px', opacity: 0.5, animation: 'pulse 1.5s infinite' }} />
            </div>
          ) : result ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Target & Weather Info Row */}
              <div className="panel" style={{ padding: '1.25rem', marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <span className="badge badge-high" style={{ marginBottom: '6px' }}>
                      {formatCause(result.parsed_parameters.cause)}
                    </span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)' }}>
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
                      background: result.prediction.weather.is_raining ? 'rgba(59,130,246,0.1)' : 'var(--nav-bg)',
                      border: `1px solid ${result.prediction.weather.is_raining ? 'rgba(59,130,246,0.3)' : 'var(--border-color)'}`,
                      borderRadius: '8px', padding: '8px 12px', minWidth: '120px', display: 'flex', alignItems: 'center', gap: '8px'
                    }}>
                      <CloudRain color={result.prediction.weather.is_raining ? '#3b82f6' : 'var(--text-secondary)'} size={24} />
                      <div>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Live Weather</div>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)' }}>{result.prediction.weather.description}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{result.prediction.weather.temperature}°C</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Resource Requirements & Dispatch Order */}
              <div className="panel" style={{ padding: '1.25rem', marginBottom: 0 }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.75rem' }}>Resource Recommendations</h4>
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
                      background: 'var(--nav-bg)', padding: '6px 12px', borderRadius: '6px',
                      border: '1px solid var(--border-color)'
                    }}>
                      <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-primary)', textTransform: 'capitalize' }}>{alloc.station} Station</span>
                      <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>{alloc.officers} Officers dispatch</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diversion Directives */}
              <div className="panel" style={{ padding: '1.25rem', marginBottom: 0 }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>Tactical Diversion Plan</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-primary)', marginBottom: '0.75rem', fontWeight: '600', lineHeight: '1.4' }}>
                  💡 {result.prediction.diversion_plan?.summary || "No summary provided."}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {Array.isArray(result.prediction.diversion_plan?.steps) && result.prediction.diversion_plan.steps.map((step, idx) => (
                    <div key={idx} style={{
                      fontSize: '11px', color: 'var(--text-secondary)', background: 'var(--nav-bg)',
                      padding: '6px 10px', borderRadius: '6px', borderLeft: '3px solid #6366f1'
                    }}>
                      {typeof step === 'object' && step !== null 
                        ? `${step.junction ? `[${step.junction}] ` : ''}${step.instruction || step.step || JSON.stringify(step)}` 
                        : step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Dispatch Memo */}
              <div className="panel" style={{ padding: '1.25rem', borderColor: '#10b981', marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Shield size={14} color="#10b981" />
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#10b981' }}>ASTRAM COMMAND CENTER BRIEFING LOG</span>
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
                    lineHeight: '1.4', background: 'var(--console-bg)', color: 'var(--console-text)'
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
