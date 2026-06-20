import React, { useState, useEffect } from 'react';
import { BarChart2, Compass, Map, BookOpen } from 'lucide-react';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ForecastPlanner from './components/ForecastPlanner';
import LiveMap from './components/LiveMap';
import FeedbackLog from './components/FeedbackLog';
import './App.css';

const API_BASE = "http://127.0.0.1:8000/api";

function App() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [analytics, setAnalytics] = useState(null);
  const [junctions, setJunctions] = useState([]);
  const [correlationData, setCorrelationData] = useState(null);

  // Load initial global data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${API_BASE}/analytics`);
        const data = await res.json();
        setAnalytics(data);
      } catch (e) {
        console.error("Failed to load analytics", e);
      }
    };

    const fetchJunctions = async () => {
      try {
        const res = await fetch(`${API_BASE}/junctions`);
        const data = await res.json();
        setJunctions(data.junctions || []);
      } catch (e) {
        console.error("Failed to load junctions", e);
      }
    };

    const fetchCorrelation = async () => {
      try {
        const res = await fetch(`${API_BASE}/correlation`);
        const data = await res.json();
        setCorrelationData(data);
      } catch (e) {
        console.error("Failed to load correlation matrix", e);
      }
    };

    fetchAnalytics();
    fetchJunctions();
    fetchCorrelation();
  }, []);

  return (
    <div className="app-container">
      {/* Header Navbar */}
      <header className="app-header">
        <div className="brand-section">
          <div className="brand-logo">ASTRAM</div>
          <div className="brand-title">
            <h1>Obstruction & Event Intelligence</h1>
            <p>Bengaluru Traffic Management System Platform</p>
          </div>
        </div>
        <nav className="nav-tabs">
          <button 
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart2 size={16} /> Analytics
          </button>
          <button 
            className={`tab-btn ${activeTab === 'planner' ? 'active' : ''}`}
            onClick={() => setActiveTab('planner')}
          >
            <Compass size={16} /> Predict & Plan
          </button>
          <button 
            className={`tab-btn ${activeTab === 'live' ? 'active' : ''}`}
            onClick={() => setActiveTab('live')}
          >
            <Map size={16} /> Hotspots Map
          </button>
          <button 
            className={`tab-btn ${activeTab === 'learning' ? 'active' : ''}`}
            onClick={() => setActiveTab('learning')}
          >
            <BookOpen size={16} /> Post-Event Log
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="dashboard-content">
        {activeTab === 'analytics' && (
          <AnalyticsDashboard analytics={analytics} correlationData={correlationData} />
        )}
        {activeTab === 'planner' && (
          <ForecastPlanner />
        )}
        {activeTab === 'live' && (
          <LiveMap junctions={junctions} />
        )}
        {activeTab === 'learning' && (
          <FeedbackLog />
        )}
      </main>
    </div>
  );
}

export default App;
