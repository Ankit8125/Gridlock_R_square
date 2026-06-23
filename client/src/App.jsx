import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Bot, Compass, Map, BarChart2, BookOpen, Sun, Moon, RefreshCw, AlertOctagon, HelpCircle } from 'lucide-react';
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
      <AppTour forceOpen={tourOpen} onClose={() => setTourOpen(false)} />

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
