import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Bot, Compass, Map, BarChart2, BookOpen, Sun, Moon, RefreshCw, AlertOctagon, HelpCircle, Bell, X } from 'lucide-react';
import CommandCenter from './components/CommandCenter';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ForecastPlanner from './components/ForecastPlanner';
import LiveMap from './components/LiveMap';
import FeedbackLog from './components/FeedbackLog';
import AICommandAgent from './components/AICommandAgent';
import AppTour from './components/AppTour';
import './App.css';

const API_BASE = import.meta.env.VITE_API_BASE || 
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" 
    ? "http://127.0.0.1:8000/api" 
    : "/api");

function App() {
  const [activeTab, setActiveTab] = useState('command');
  const [analytics, setAnalytics] = useState(null);
  const [junctions, setJunctions] = useState([]);
  const [correlationData, setCorrelationData] = useState(null);
  const [isLoadingGlobal, setIsLoadingGlobal] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [tourOpen, setTourOpen] = useState(false);

  // Surge alert notification state
  const [surgeAlerts, setSurgeAlerts] = useState([]);
  const [bellOpen, setBellOpen] = useState(false);
  const [hasNewAlerts, setHasNewAlerts] = useState(false);
  const bellRef = useRef(null);

  // Close bell dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setBellOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Poll surge alerts every 60 seconds globally
  useEffect(() => {
    const fetchSurge = async () => {
      try {
        const res = await fetch(`${API_BASE}/surge-alerts`);
        if (res.ok) {
          const data = await res.json();
          const alerts = data.surge_alerts || [];
          if (alerts.length > 0) {
            setSurgeAlerts(alerts);
            setHasNewAlerts(true);
          } else {
            setSurgeAlerts([]);
            setHasNewAlerts(false);
          }
        }
      } catch (e) { /* silent fail */ }
    };
    fetchSurge();
    const interval = setInterval(fetchSurge, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleBellClick = () => {
    setBellOpen(o => !o);
    setHasNewAlerts(false);
  };

  // Theme State
  const [lightMode, setLightMode] = useState(() => {
    return localStorage.getItem('astram_theme') === 'light';
  });

  useEffect(() => {
    if (lightMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('astram_theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('astram_theme', 'dark');
    }
  }, [lightMode]);

  // Load and refresh global data
  const refreshGlobalData = async () => {
    setIsLoadingGlobal(true);
    try {
      const [aRes, jRes, cRes] = await Promise.all([
        fetch(`${API_BASE}/analytics`),
        fetch(`${API_BASE}/junctions`),
        fetch(`${API_BASE}/correlation`)
      ]);
      
      if (!aRes.ok || !jRes.ok || !cRes.ok) {
        throw new Error("One or more server requests failed.");
      }
      
      const [aData, jData, cData] = await Promise.all([
        aRes.json(),
        jRes.json(),
        cRes.json()
      ]);
      
      setAnalytics(aData);
      setJunctions(jData.junctions || []);
      setCorrelationData(cData);
      setErrorMsg(null);
    } catch (e) {
      console.error("Failed to load initial data", e);
      setErrorMsg("Failed to connect to ASTRAM API. Please make sure the FastAPI server.py is running on localhost:8000.");
    } finally {
      setIsLoadingGlobal(false);
    }
  };

  useEffect(() => {
    refreshGlobalData();
  }, []);

  if (isLoadingGlobal && !analytics) {
    return (
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="brand-logo" style={{ display: 'inline-block', marginBottom: '1.5rem', fontSize: '2rem', padding: '0.75rem 1.5rem' }}>ASTRAM</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Loading Event Intelligence...</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>Calibrating traffic modeling systems &amp; loading Bengaluru GIS data</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--nav-bg)', padding: '8px 16px', borderRadius: '30px', border: '1px solid var(--border-color)' }}>
            <RefreshCw className="animate-spin" size={14} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
            <span style={{ fontSize: '12px', fontFamily: 'monospace', color: 'var(--primary)' }}>Connecting to backend server...</span>
          </div>
        </div>
      </div>
    );
  }

  if (errorMsg && !analytics) {
    return (
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '450px' }}>
          <div className="brand-logo" style={{ display: 'inline-block', marginBottom: '1.5rem', fontSize: '2rem', padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }}>ASTRAM</div>
          <AlertOctagon size={48} color="#ef4444" style={{ margin: '0 auto 1.5rem auto' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.75rem', color: '#f87171' }}>Platform Connection Failure</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.5' }}>
            {errorMsg}
          </p>
          <button onClick={refreshGlobalData} className="btn-primary" style={{ display: 'inline-flex', width: 'auto', padding: '10px 24px', margin: '0 auto' }}>
            <RefreshCw size={14} /> Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'command',   label: 'Command Center', icon: <LayoutDashboard size={16} /> },
    { id: 'agent',     label: 'Dispatch AI',    icon: <Bot size={16} />,             domId: 'tab-agent' },
    { id: 'planner',   label: 'Predict & Plan', icon: <Compass size={16} />,         domId: 'tab-planner' },
    { id: 'live',      label: 'Hotspot Map',    icon: <Map size={16} />,              domId: 'tab-live' },
    { id: 'analytics', label: 'Analytics',      icon: <BarChart2 size={16} />,        domId: 'tab-analytics' },
    { id: 'learning',  label: 'Post-Event Log', icon: <BookOpen size={16} />,         domId: 'tab-learning' },
  ];

  return (
    <div className="app-container">
      {/* Walkthrough */}
      <AppTour forceOpen={tourOpen} onClose={() => setTourOpen(false)} onNavigate={setActiveTab} />

      {/* Header Navbar */}
      <header className="app-header">
        <div className="brand-section">
          <div className="brand-logo">ASTRAM</div>
          <div className="brand-title">
            <h1>Obstruction &amp; Event Intelligence</h1>
            <p>Bengaluru Traffic Management System Platform</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <nav className="nav-tabs">
            {tabs.map(t => (
              <button
                key={t.id}
                id={t.domId}
                className={`tab-btn ${activeTab === t.id ? 'active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </nav>

          {/* Notification Bell */}
          <div ref={bellRef} style={{ position: 'relative' }}>
            <button
              onClick={handleBellClick}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${hasNewAlerts ? '#ef4444' : 'var(--border-color)'}`,
                color: hasNewAlerts ? '#ef4444' : 'var(--text-secondary)',
                padding: '8px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transition: 'all 0.2s ease'
              }}
              title="Surge Alerts"
              className="theme-toggle-btn"
            >
              <Bell size={16} />
              {hasNewAlerts && surgeAlerts.length > 0 && (
                <span style={{
                  position: 'absolute', top: '-4px', right: '-4px',
                  background: '#ef4444', color: '#fff',
                  borderRadius: '50%', width: '16px', height: '16px',
                  fontSize: '10px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontWeight: '700', lineHeight: 1
                }}>{surgeAlerts.length}</span>
              )}
            </button>

            {/* Dropdown Panel */}
            {bellOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                width: '300px', background: 'var(--nav-bg)',
                border: '1px solid var(--border-color)', borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 1000,
                overflow: 'hidden'
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 14px', borderBottom: '1px solid var(--border-color)'
                }}>
                  <span style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-primary)' }}>
                    🚨 Surge Alerts
                  </span>
                  <button onClick={() => setBellOpen(false)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-secondary)', padding: '2px'
                  }}><X size={14} /></button>
                </div>
                <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                  {surgeAlerts.length === 0 ? (
                    <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '12px' }}>
                      ✅ No active surge alerts
                    </div>
                  ) : surgeAlerts.map((alert, i) => (
                    <div key={i} style={{
                      padding: '10px 14px',
                      borderBottom: i < surgeAlerts.length - 1 ? '1px solid var(--border-color)' : 'none',
                      display: 'flex', flexDirection: 'column', gap: '3px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', flexShrink: 0, animation: 'pulse 2s infinite' }} />
                        <span style={{ fontWeight: '600', fontSize: '12px', color: 'var(--text-primary)' }}>
                          {alert.corridor || alert.zone || 'Unknown Corridor'}
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', paddingLeft: '14px' }}>
                        {alert.recent_count !== undefined ? `${alert.recent_count} incidents` : ''}
                        {alert.spike_pct !== undefined ? ` · ↑${Math.round(alert.spike_pct)}% vs baseline` : ''}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{
                  padding: '8px 14px', borderTop: '1px solid var(--border-color)',
                  fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center'
                }}>
                  Auto-refreshes every 60s · <button onClick={() => { setActiveTab('live'); setBellOpen(false); }}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '11px', padding: 0, textDecoration: 'underline' }}>View on Map</button>
                </div>
              </div>
            )}
          </div>

          {/* Help / Tour button */}
          <button
            onClick={() => setTourOpen(true)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              padding: '8px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            title="Open tutorial walkthrough"
            className="theme-toggle-btn"
          >
            <HelpCircle size={16} />
          </button>

          {/* Theme toggle */}
          <button 
            onClick={() => setLightMode(!lightMode)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              padding: '8px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            className="theme-toggle-btn"
            title={lightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {lightMode ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="dashboard-content">
        {activeTab === 'command' && (
          <CommandCenter
            analytics={analytics}
            onNavigate={setActiveTab}
          />
        )}
        {activeTab === 'analytics' && (
          <AnalyticsDashboard 
            analytics={analytics} 
            correlationData={correlationData} 
            refreshData={refreshGlobalData} 
          />
        )}
        {activeTab === 'planner' && (
          <ForecastPlanner />
        )}
        {activeTab === 'live' && (
          <LiveMap junctions={junctions} lightMode={lightMode} />
        )}
        {activeTab === 'learning' && (
          <FeedbackLog />
        )}
        {activeTab === 'agent' && (
          <AICommandAgent />
        )}
      </main>
    </div>
  );
}

export default App;
