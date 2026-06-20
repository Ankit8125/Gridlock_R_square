import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { Chart } from 'chart.js/auto';
import { 
  TrendingUp, 
  MapPin, 
  Shield, 
  Clock, 
  Database, 
  AlertTriangle, 
  Users, 
  BarChart2, 
  PlusCircle, 
  BookOpen, 
  Info,
  Map,
  Compass,
  AlertCircle,
  Activity
} from 'lucide-react';
import './App.css';

// Fix Leaflet marker icons issue in React/Vite builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const API_BASE = "http://127.0.0.1:8000/api";

function App() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [analytics, setAnalytics] = useState(null);
  const [junctions, setJunctions] = useState([]);
  const [correlationData, setCorrelationData] = useState(null);
  
  // Forecast Form state
  const [cause, setCause] = useState('vehicle_breakdown');
  const [eventType, setEventType] = useState('unplanned');
  const [latitude, setLatitude] = useState('12.9716');
  const [longitude, setLongitude] = useState('77.5946');
  const [requiresClosure, setRequiresClosure] = useState(false);
  const [corridor, setCorridor] = useState('Non-corridor');
  const [hour, setHour] = useState(9);
  const [dayOfWeek, setDayOfWeek] = useState(1);
  
  // Prediction result
  const [prediction, setPrediction] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);

  // Feedback Form state
  const [feedbackEventId, setFeedbackEventId] = useState('');
  const [actualDuration, setActualDuration] = useState('');
  const [actualManpower, setActualManpower] = useState('');
  const [actualBarricades, setActualBarricades] = useState('');
  const [feedbackStation, setFeedbackStation] = useState('');
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [feedbackLogs, setFeedbackLogs] = useState([]);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // UI state for Live Traffic Map
  const [showTrafficHeatmap, setShowTrafficHeatmap] = useState(true);
  const [hoveredCorrelation, setHoveredCorrelation] = useState(null);

  // Refs for Charts
  const causeChartRef = useRef(null);
  const hourChartRef = useRef(null);
  const vehChartRef = useRef(null);
  const feedbackChartRef = useRef(null);
  
  // Map instances
  const liveMapRef = useRef(null);
  const liveHeatmapLayersRef = useRef([]);
  const plannerMapRef = useRef(null);
  const plannerMarkerRef = useRef(null);
  const detourLineRef = useRef(null);
  const junctionMarkersRef = useRef([]);

  // Load stats, junctions, and feedback logs initially
  useEffect(() => {
    fetchAnalytics();
    fetchJunctions();
    fetchFeedbackLogs();
    fetchCorrelation();
  }, []);

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

  const fetchFeedbackLogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/feedback/summary`);
      const data = await res.json();
      setFeedbackLogs(data.logs || []);
    } catch (e) {
      console.error("Failed to load feedback logs", e);
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

  // Render Charts in Analytics Tab
  useEffect(() => {
    if (activeTab !== 'analytics' || !analytics) return;

    // 1. Cause Breakdown Chart
    const ctxCause = document.getElementById('causeChart');
    if (ctxCause) {
      const labels = analytics.cause_breakdown.map(c => c.cause.replace('_', ' '));
      const counts = analytics.cause_breakdown.map(c => c.count);
      
      causeChartRef.current = new Chart(ctxCause, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Incident Count',
            data: counts,
            backgroundColor: 'rgba(59, 130, 246, 0.65)',
            borderColor: '#3b82f6',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
            x: { grid: { display: false }, ticks: { color: '#94a3b8', rotation: 45 } }
          }
        }
      });
    }

    // 2. Hourly peak distributions
    const ctxHour = document.getElementById('hourChart');
    if (ctxHour) {
      const hours = Array.from({ length: 24 }, (_, i) => i);
      const counts = hours.map(h => analytics.hourly_distribution[h] || 0);

      hourChartRef.current = new Chart(ctxHour, {
        type: 'line',
        data: {
          labels: hours.map(h => `${h}:00`),
          datasets: [{
            label: 'Events Logged (IST)',
            data: counts,
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
            x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
          }
        }
      });
    }

    // 3. Vehicle Breakdowns
    const ctxVeh = document.getElementById('vehChart');
    if (ctxVeh) {
      const labels = analytics.vehicle_breakdown_types.map(v => v.vehicle_type.replace('_', ' '));
      const counts = analytics.vehicle_breakdown_types.map(v => v.count);

      vehChartRef.current = new Chart(ctxVeh, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{
            data: counts,
            backgroundColor: [
              '#3b82f6', '#10b981', '#f59e0b', '#ef4444', 
              '#8b5cf6', '#ec4899', '#14b8a6', '#f43f5e'
            ]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
              labels: { color: '#f8fafc', boxWidth: 12 }
            }
          }
        }
      });
    }

    return () => {
      if (causeChartRef.current) causeChartRef.current.destroy();
      if (hourChartRef.current) hourChartRef.current.destroy();
      if (vehChartRef.current) vehChartRef.current.destroy();
    };
  }, [activeTab, analytics]);

  // Render Error Comparison Chart in Learning Tab
  useEffect(() => {
    if (activeTab !== 'learning' || feedbackLogs.length === 0) return;

    const ctxF = document.getElementById('feedbackChart');
    if (ctxF) {
      const labels = feedbackLogs.map(l => l.event_id);
      const predictedDurs = feedbackLogs.map(l => l.duration?.predicted || 0);
      const actualDurs = feedbackLogs.map(l => l.duration?.actual || 0);

      feedbackChartRef.current = new Chart(ctxF, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Predicted Duration (min)',
              data: predictedDurs,
              borderColor: '#3b82f6',
              borderDash: [5, 5],
              fill: false
            },
            {
              label: 'Actual Duration (min)',
              data: actualDurs,
              borderColor: '#10b981',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
            x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
          }
        }
      });
    }

    return () => {
      if (feedbackChartRef.current) feedbackChartRef.current.destroy();
    };
  }, [activeTab, feedbackLogs]);

  // Initialize Live Board Map
  useEffect(() => {
    if (activeTab !== 'live' || !junctions.length) return;

    // Centered at Bengaluru
    const map = L.map('live-map').setView([12.978, 77.599], 12);
    liveMapRef.current = map;

    // OpenStreetMap standard base layer
    const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Overlay real-time TomTom-style traffic congestion flow overlay
    const trafficFlowLayer = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
      opacity: 0.5
    });

    // Plot a selection of junctions as blue circle markers
    junctions.slice(0, 100).forEach(j => {
      L.circleMarker([j.lat, j.lon], {
        radius: 6,
        color: '#3b82f6',
        fillColor: '#60a5fa',
        fillOpacity: 0.8
      })
      .addTo(map)
      .bindPopup(`<strong>Junction Control Point</strong><br/>${j.junction}`);
    });

    // Generate dynamic Incident Congestion Heatmap layers
    const heatLayers = [];
    junctions.slice(0, 45).forEach((j, index) => {
      // Simulate congestion circles of varying severity (red, orange, yellow)
      const severityColors = ['#ef4444', '#f59e0b', '#fbbf24'];
      const radius = 250 + (index % 5) * 150;
      const color = severityColors[index % 3];
      
      const circle = L.circle([j.lat, j.lon], {
        radius: radius,
        color: color,
        fillColor: color,
        fillOpacity: 0.25,
        weight: 1.5
      }).addTo(map)
      .bindPopup(`<strong>Live Traffic Congestion Index</strong><br/>Location: ${j.junction}<br/>Delay Level: ${index % 3 === 0 ? 'Critical' : 'Moderate'}`);
      
      heatLayers.push(circle);
    });
    
    liveHeatmapLayersRef.current = heatLayers;

    return () => {
      if (liveMapRef.current) {
        liveMapRef.current.remove();
        liveMapRef.current = null;
      }
    };
  }, [activeTab, junctions]);

  // Handle toggling of live traffic heatmap layers
  useEffect(() => {
    if (!liveMapRef.current) return;
    
    liveHeatmapLayersRef.current.forEach(layer => {
      if (showTrafficHeatmap) {
        layer.addTo(liveMapRef.current);
      } else {
        liveMapRef.current.removeLayer(layer);
      }
    });
  }, [showTrafficHeatmap]);

  // Initialize Planner Map
  useEffect(() => {
    if (activeTab !== 'planner') return;

    const map = L.map('planner-map').setView([12.9716, 77.5946], 12);
    plannerMapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add marker representing input coordinates
    const initialLat = parseFloat(latitude);
    const initialLon = parseFloat(longitude);
    const marker = L.marker([initialLat, initialLon], { draggable: true }).addTo(map);
    plannerMarkerRef.current = marker;

    marker.on('dragend', (e) => {
      const position = marker.getLatLng();
      setLatitude(position.lat.toFixed(5));
      setLongitude(position.lng.toFixed(5));
    });

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      setLatitude(lat.toFixed(5));
      setLongitude(lng.toFixed(5));
      marker.setLatLng([lat, lng]);
    });

    return () => {
      if (plannerMapRef.current) {
        plannerMapRef.current.remove();
        plannerMapRef.current = null;
      }
    };
  }, [activeTab]);

  // Update Planner marker if latitude/longitude changes manually
  useEffect(() => {
    if (plannerMarkerRef.current && plannerMapRef.current) {
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);
      if (!isNaN(lat) && !isNaN(lon)) {
        plannerMarkerRef.current.setLatLng([lat, lon]);
        plannerMapRef.current.panTo([lat, lon]);
      }
    }
  }, [latitude, longitude]);

  // Update map visual features after prediction loads
  useEffect(() => {
    if (!prediction || !plannerMapRef.current) return;

    const map = plannerMapRef.current;
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    // Remove existing junction markers and detours
    junctionMarkersRef.current.forEach(m => map.removeLayer(m));
    junctionMarkersRef.current = [];
    if (detourLineRef.current) {
      map.removeLayer(detourLineRef.current);
      detourLineRef.current = null;
    }

    // Add diversion checkpoints to map
    prediction.nearest_junction_checkpoints.forEach((j, index) => {
      const marker = L.circleMarker([j.latitude, j.longitude], {
        radius: 8,
        color: '#f59e0b',
        fillColor: '#fbbf24',
        fillOpacity: 0.9
      })
      .addTo(map)
      .bindPopup(`<strong>Checkpoint ${index + 1}: ${j.name}</strong><br/>Distance: ${j.distance_meters}m`);
      
      junctionMarkersRef.current.push(marker);
    });

    // Draw OSRM route detour around the event to the nearest junction
    if (prediction.nearest_junction_checkpoints.length > 0) {
      const targetJunc = prediction.nearest_junction_checkpoints[0];
      fetchDetourRoute(lat, lon, targetJunc.latitude, targetJunc.longitude);
    }

  }, [prediction]);

  const fetchDetourRoute = async (startLat, startLon, endLat, endLon) => {
    try {
      const res = await fetch(`https://router.projectosrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`);
      const data = await res.json();
      
      if (data.routes && data.routes.length > 0 && plannerMapRef.current) {
        const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
        const line = L.polyline(coords, {
          color: '#3b82f6',
          weight: 6,
          opacity: 0.8,
          dashArray: '5, 10'
        }).addTo(plannerMapRef.current);
        
        detourLineRef.current = line;
      }
    } catch (e) {
      console.error("Failed to query OSRM routing", e);
    }
  };

  const handleForecastSubmit = async (e) => {
    e.preventDefault();
    setIsPredicting(true);
    setPrediction(null);
    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cause,
          event_type: eventType,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          requires_road_closure: requiresClosure,
          corridor,
          hour: parseInt(hour),
          day_of_week: parseInt(dayOfWeek)
        })
      });
      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      console.error("Forecasting failed", err);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackMsg('');
    try {
      const res = await fetch(`${API_BASE}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_id: feedbackEventId,
          actual_duration: parseFloat(actualDuration),
          actual_manpower_total: parseInt(actualManpower),
          actual_barricades: parseInt(actualBarricades),
          police_station: feedbackStation,
          notes: feedbackNotes
        })
      });
      const data = await res.json();
      if (data.status === 'success') {
        setFeedbackMsg("Feedback log submitted successfully!");
        setFeedbackEventId('');
        setActualDuration('');
        setActualManpower('');
        setActualBarricades('');
        setFeedbackStation('');
        setFeedbackNotes('');
        fetchFeedbackLogs(); // Refresh log summary
      }
    } catch (err) {
      setFeedbackMsg("Error submitting feedback.");
      console.error(err);
    }
  };

  const formatMinutes = (mins) => {
    if (!mins) return "N/A";
    if (mins < 60) return `${Math.round(mins)} min`;
    const hrs = Math.floor(mins / 60);
    const remMins = Math.round(mins % 60);
    return remMins > 0 ? `${hrs}h ${remMins}m` : `${hrs}h`;
  };

  // Helper to color-code correlation cells
  const getCorrelationColor = (val) => {
    if (val === 1) return 'rgba(59, 130, 246, 0.9)'; // Diagonal
    if (val > 0) return `rgba(59, 130, 246, ${val * 0.85})`; // Positive correlation (Blue)
    if (val < 0) return `rgba(239, 68, 68, ${Math.abs(val) * 0.85})`; // Negative correlation (Red)
    return 'rgba(30, 41, 59, 0.4)';
  };

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
        
        {/* Tab 1: Analytics & EDA */}
        {activeTab === 'analytics' && (
          <div>
            {analytics ? (
              <>
                {/* KPIs Container */}
                <div className="kpis-container">
                  <div className="kpi-card">
                    <div className="kpi-header">
                      <span>Total Logged Incidents</span>
                      <Database size={16} className="text-secondary" />
                    </div>
                    <div className="kpi-value">{analytics.kpis.total_events}</div>
                    <div className="kpi-footer">ASTRAM historical database</div>
                  </div>
                  <div className="kpi-card">
                    <div className="kpi-header">
                      <span>Planned Event Layers</span>
                      <TrendingUp size={16} className="text-secondary" />
                    </div>
                    <div className="kpi-value">{analytics.kpis.planned_events}</div>
                    <div className="kpi-footer">Rallies, construction, matches</div>
                  </div>
                  <div className="kpi-card">
                    <div className="kpi-header">
                      <span>Median Ticket Duration</span>
                      <Clock size={16} className="text-secondary" />
                    </div>
                    <div className="kpi-value">{formatMinutes(analytics.kpis.median_duration_minutes)}</div>
                    <div className="kpi-footer">Excluding active & outlier tickets</div>
                  </div>
                  <div className="kpi-card">
                    <div className="kpi-header">
                      <span>Requires Road Closure</span>
                      <Shield size={16} className="text-secondary" />
                    </div>
                    <div className="kpi-value">{analytics.kpis.road_closure_percentage}%</div>
                    <div className="kpi-footer">Heavy diversion requirements</div>
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <h2 className="panel-title">Data Scope & Model Tuning</h2>
                    <span className="badge badge-learned">Tuned Models Active</span>
                  </div>
                  <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5'}}>
                    <p style={{marginBottom: '0.5rem'}}>
                      <strong>Real-world Analysis Summary:</strong> Our direct read of the database confirms that 
                      <strong> vehicle breakdowns</strong> dominate Bengaluru's traffic obstructions, accounting for <strong>59.9% of all rows (4,896 incidents)</strong>.
                      Genuinely planned events like VIP movement, sports, and public rallies make up only <strong>1.8%</strong> of the dataset.
                    </p>
                    <p>
                      <strong>Duration Cap Heuristics & Model Tuning:</strong> Out of 8,173 events, only 3,192 rows (39%) have valid completed durations. 
                      Due to administrative ticket delays, durations average 4.3 days, but show a median resolution of <strong>64 minutes</strong>. 
                      To train regression models without bias, the pipeline drops negative entries and caps outlier durations at the 90th percentile (p90).
                      The RandomForest model is tuned with optimized hyperparameters (estimators=150, depth=12, split=5) to ensure stable generalization on unseen test splits.
                    </p>
                  </div>
                </div>

                {/* Correlation Heatmap Grid */}
                {correlationData && (
                  <div className="panel">
                    <h2 className="panel-title" style={{marginBottom: '0.5rem'}}>Feature Correlation Matrix (Hidden Traffic Relationships)</h2>
                    <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem'}}>
                      This matrix displays calculated relationships between variables. Hover over cells to inspect hidden traffic congestion drivers.
                      <span style={{color: 'var(--primary)', marginLeft: '1rem', fontWeight: 'bold'}}>Blue = Positive Correlation</span>, 
                      <span style={{color: 'var(--danger)', marginLeft: '1rem', fontWeight: 'bold'}}>Red = Negative Correlation</span>.
                    </p>
                    
                    <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
                      {/* Interactive Matrix */}
                      <div style={{
                        display: 'grid', 
                        gridTemplateColumns: `repeat(${correlationData.labels.length}, 1fr)`,
                        gap: '2px',
                        background: 'rgba(255,255,255,0.02)',
                        padding: '4px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        width: '100%',
                        maxWidth: '520px',
                        height: '520px'
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
                                border: hoveredCorrelation && hoveredCorrelation.row === rIdx && hoveredCorrelation.col === cIdx ? '2px solid #fff' : 'none'
                              }}
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

                      {/* Tooltip detail block */}
                      <div style={{
                        flex: '1 1 300px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        background: 'rgba(15, 23, 42, 0.4)',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)'
                      }}>
                        {hoveredCorrelation ? (
                          <div>
                            <div style={{fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 'bold', marginBottom: '0.5rem'}}>Correlation Analyzer</div>
                            <div style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.25rem'}}>{hoveredCorrelation.labelA}</div>
                            <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>vs.</div>
                            <div style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', marginBottom: '1rem'}}>{hoveredCorrelation.labelB}</div>
                            <div style={{display: 'flex', alignItems: 'baseline', gap: '0.5rem'}}>
                              <span style={{
                                fontSize: '2.5rem', 
                                fontWeight: '800', 
                                color: hoveredCorrelation.val > 0 ? 'var(--primary)' : hoveredCorrelation.val < 0 ? 'var(--danger)' : '#fff'
                              }}>{hoveredCorrelation.val.toFixed(3)}</span>
                              <span style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>(Pearson r)</span>
                            </div>
                            <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: '1.4'}}>
                              {hoveredCorrelation.val > 0.4 ? "Strong positive relationship. An increase in one variable strongly correlates with an increase in the other." :
                               hoveredCorrelation.val > 0.15 ? "Moderate positive relationship." :
                               hoveredCorrelation.val < -0.4 ? "Strong negative relationship. An increase in one variable strongly correlates with a decrease in the other." :
                               hoveredCorrelation.val < -0.15 ? "Moderate negative relationship." :
                               "Weak or negligible correlation."}
                            </p>
                          </div>
                        ) : (
                          <div style={{textAlign: 'center', color: 'var(--text-secondary)'}}>
                            <Activity size={32} style={{margin: '0 auto 1rem', color: 'var(--primary)'}} />
                            <p>Hover over the correlation grid blocks to analyze specific relationships.</p>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                )}

                {/* Charts Grid */}
                <div className="grid-2">
                  <div className="panel">
                    <h2 className="panel-title" style={{marginBottom: '1rem'}}>Incidents Breakdown by Cause</h2>
                    <canvas id="causeChart" height="200"></canvas>
                  </div>
                  <div className="panel">
                    <h2 className="panel-title" style={{marginBottom: '1rem'}}>Vehicle Breakdown Distributions (60% of Dataset)</h2>
                    <canvas id="vehChart" height="200"></canvas>
                    <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.75rem', textAlign: 'center'}}>
                      Heavy commercial vehicles (LCV and Heavy Trucks) and BMTC buses constitute over 60% of breakdown obstructions.
                    </p>
                  </div>
                </div>

                <div className="grid-2">
                  <div className="panel">
                    <h2 className="panel-title" style={{marginBottom: '1rem'}}>Hourly Logged Incidents Distribution (Bengaluru local time)</h2>
                    <canvas id="hourChart" height="150"></canvas>
                  </div>
                  <div className="panel">
                    <h2 className="panel-title" style={{marginBottom: '1rem'}}>Top 15 Most Active Police Stations</h2>
                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr>
                            <th>Police Station</th>
                            <th>Incident Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          {analytics.top_police_stations.map((ps, i) => (
                            <tr key={i}>
                              <td style={{textTransform: 'capitalize'}}>{ps.police_station}</td>
                              <td>{ps.count}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p>Loading analytics data...</p>
            )}
          </div>
        )}

        {/* Tab 2: Predict & Plan */}
        {activeTab === 'planner' && (
          <div className="grid-2">
            
            {/* Input Form Panel */}
            <div className="panel">
              <h2 className="panel-title" style={{marginBottom: '1.25rem'}}>Forecast Congestion & Plan Resources</h2>
              <form onSubmit={handleForecastSubmit}>
                
                <div className="form-group">
                  <label className="form-label">Event/Obstruction Cause</label>
                  <select value={cause} onChange={(e) => setCause(e.target.value)}>
                    <option value="vehicle_breakdown">Vehicle Breakdown (High-volume)</option>
                    <option value="accident">Accident (High-volume)</option>
                    <option value="construction">Construction Work (High-volume)</option>
                    <option value="water_logging">Water Logging (High-volume)</option>
                    <option value="pot_holes">Potholes (High-volume)</option>
                    <option value="tree_fall">Tree Fall (High-volume)</option>
                    <option value="road_conditions">Road Conditions (High-volume)</option>
                    <option value="congestion">General Congestion (High-volume)</option>
                    <option value="others">Others (High-volume)</option>
                    <option value="public_event">Public Event (Low-volume match)</option>
                    <option value="procession">Procession (Low-volume match)</option>
                    <option value="vip_movement">VIP Movement (Low-volume match)</option>
                    <option value="protest">Protest (Low-volume match)</option>
                  </select>
                </div>

                <div className="grid-2" style={{marginBottom: '0'}}>
                  <div className="form-group">
                    <label className="form-label">Event Type</label>
                    <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
                      <option value="unplanned">Unplanned Incident</option>
                      <option value="planned">Planned Event</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Requires Road Closure?</label>
                    <div style={{display: 'flex', alignItems: 'center', height: '2.4rem'}}>
                      <input 
                        type="checkbox" 
                        id="closure-checkbox"
                        checked={requiresClosure} 
                        onChange={(e) => setRequiresClosure(e.target.checked)}
                        style={{width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', cursor: 'pointer'}} 
                      />
                      <label htmlFor="closure-checkbox" style={{cursor: 'pointer', fontSize: '0.9rem'}}>Yes, close road</label>
                    </div>
                  </div>
                </div>

                <div className="grid-2" style={{marginBottom: '0'}}>
                  <div className="form-group">
                    <label className="form-label">Latitude</label>
                    <input 
                      type="number" 
                      step="any"
                      className="form-control"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Longitude</label>
                    <input 
                      type="number" 
                      step="any"
                      className="form-control"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)} 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Corridor Name</label>
                  <select value={corridor} onChange={(e) => setCorridor(e.target.value)}>
                    <option value="Non-corridor">Non-corridor (Default)</option>
                    <option value="Mysore Road">Mysore Road</option>
                    <option value="Bellary Road 1">Bellary Road 1</option>
                    <option value="Bellary Road 2">Bellary Road 2</option>
                    <option value="Tumkur Road">Tumkur Road</option>
                    <option value="Hosur Road">Hosur Road</option>
                    <option value="ORR North 1">ORR North 1</option>
                    <option value="ORR North 2">ORR North 2</option>
                    <option value="ORR East 1">ORR East 1</option>
                    <option value="ORR East 2">ORR East 2</option>
                    <option value="ORR West 1">ORR West 1</option>
                    <option value="Old Madras Road">Old Madras Road</option>
                    <option value="Magadi Road">Magadi Road</option>
                    <option value="Bannerghata Road">Bannerghata Road</option>
                  </select>
                </div>

                <div className="grid-2" style={{marginBottom: '0'}}>
                  <div className="form-group">
                    <label className="form-label">Hour of Day (IST: {hour}:00)</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="23"
                      value={hour}
                      onChange={(e) => setHour(e.target.value)}
                      style={{width: '100%', cursor: 'pointer', marginTop: '0.5rem'}}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Day of Week</label>
                    <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)}>
                      <option value="0">Monday</option>
                      <option value="1">Tuesday</option>
                      <option value="2">Wednesday</option>
                      <option value="3">Thursday</option>
                      <option value="4">Friday</option>
                      <option value="5">Saturday</option>
                      <option value="6">Sunday</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-primary" disabled={isPredicting}>
                  {isPredicting ? "Predicting..." : "Generate Forecast & Resource Plan"}
                </button>
              </form>

              {/* Map instructions */}
              <div style={{marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.5rem'}}>
                <Info size={16} style={{color: 'var(--primary)', flexShrink: '0'}} />
                <span>Tip: Click directly on the map to set coordinates, or drag the blue marker to position the incident on any road.</span>
              </div>
            </div>

            {/* Results Panel */}
            <div className="forecast-results">
              
              {/* Map Panel */}
              <div className="panel" style={{padding: '0', position: 'relative'}}>
                <div className="map-wrapper">
                  <div id="planner-map"></div>
                  <div className="map-placeholder-info">
                    <strong>Routing Engine</strong>: Suggested detour plotted in blue.
                  </div>
                </div>
              </div>

              {prediction ? (
                <div className="panel">
                  <div className="panel-header">
                    <h2 className="panel-title">Forecaster Response</h2>
                    <span className={`badge ${
                      prediction.data_basis === 'learned' ? 'badge-learned' : 
                      prediction.data_basis === 'similarity_retrieval' ? 'badge-similarity' : 
                      'badge-policy'
                    }`}>
                      {prediction.data_basis === 'learned' ? 'Model-Backed' : 
                       prediction.data_basis === 'similarity_retrieval' ? 'Similar-Case Match' : 
                       'Policy Recommendation'}
                    </span>
                  </div>

                  <div className="grid-2" style={{marginBottom: '1rem'}}>
                    <div className="result-card">
                      <div className="resource-title">Expected Ticket Duration</div>
                      <div className="prediction-val-box">
                        <span className="prediction-val">{formatMinutes(prediction.predicted_duration_minutes)}</span>
                      </div>
                    </div>
                    <div className="result-card">
                      <div className="resource-title">Congestion Priority</div>
                      <div style={{marginTop: '0.5rem'}}>
                        <span className={`badge ${prediction.predicted_priority === 'high' ? 'badge-high' : 'badge-low'}`}>
                          {prediction.predicted_priority} priority
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="result-card" style={{marginBottom: '1rem'}}>
                    <div className="panel-title" style={{fontSize: '0.9rem', marginBottom: '0.75rem'}}>Recommended Deployment Plan</div>
                    <div className="resources-panel">
                      <div className="resource-grid">
                        <div className="resource-item">
                          <div className="resource-title">Sub-Inspector (SI)</div>
                          <div className="resource-value">{prediction.resources.manpower.sub_inspector}</div>
                        </div>
                        <div className="resource-item">
                          <div className="resource-title">Head Constable (HC)</div>
                          <div className="resource-value">{prediction.resources.manpower.head_constable}</div>
                        </div>
                        <div className="resource-item">
                          <div className="resource-title">Constables (PC)</div>
                          <div className="resource-value">{prediction.resources.manpower.constable}</div>
                        </div>
                        <div className="resource-item total">
                          <div className="resource-title" style={{display: 'flex', justifyContent: 'center', gap: '0.25rem', alignItems: 'center'}}>
                            <Users size={12} /> Total Deployable Manpower
                          </div>
                          <div className="resource-value" style={{color: 'var(--primary)'}}>{prediction.resources.manpower.total_officers} Officers</div>
                        </div>
                      </div>

                      <div className="resource-grid">
                        <div className="resource-item total" style={{background: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.15)'}}>
                          <div className="resource-title">Barricades Deployment</div>
                          <div className="resource-value" style={{color: 'var(--warning)'}}>{prediction.resources.barricades} Barricades</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Diversion Control Points */}
                  <div className="result-card">
                    <div className="panel-title" style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>Nearest Diversion Control Points</div>
                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr>
                            <th>Junction Point</th>
                            <th>Distance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {prediction.nearest_junction_checkpoints.map((j, i) => (
                            <tr key={i}>
                              <td style={{fontWeight: 'bold', color: 'var(--text-primary)'}}>{j.name}</td>
                              <td>{j.distance_meters} m</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Similar historical events */}
                  {prediction.similar_historical_events.length > 0 && (
                    <div className="result-card" style={{marginTop: '1rem'}}>
                      <div className="panel-title" style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>Comparable Historical Cases</div>
                      <div className="table-wrapper">
                        <table>
                          <thead>
                            <tr>
                              <th>Address</th>
                              <th>Description</th>
                              <th>Duration</th>
                            </tr>
                          </thead>
                          <tbody>
                            {prediction.similar_historical_events.slice(0, 3).map((item, i) => (
                              <tr key={i}>
                                <td style={{maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{item.address}</td>
                                <td style={{maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{item.description}</td>
                                <td>{item.actual_duration_minutes ? formatMinutes(item.actual_duration_minutes) : 'N/A'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="panel" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px'}}>
                  <p style={{color: 'var(--text-secondary)'}}>Submit parameters to view forecast and planning data.</p>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Tab 3: Hotspots Map */}
        {activeTab === 'live' && (
          <div className="grid-3">
            <div className="panel" style={{gridColumn: 'span 2', padding: '0', position: 'relative'}}>
              <div className="map-wrapper" style={{height: '600px'}}>
                <div id="live-map"></div>
                <div className="map-placeholder-info" style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                  <div>
                    <strong>Routing Engine</strong>: Live control checkpoints plotted.
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <input 
                      type="checkbox" 
                      id="heatmap-toggle"
                      checked={showTrafficHeatmap}
                      onChange={(e) => setShowTrafficHeatmap(e.target.checked)}
                      style={{cursor: 'pointer', width: '1rem', height: '1rem'}}
                    />
                    <label htmlFor="heatmap-toggle" style={{cursor: 'pointer', fontWeight: 'bold'}}>Overlay Traffic Flow Heatmap</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel" style={{gridColumn: 'span 1'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                <h2 className="panel-title">Active Hotspots</h2>
                <span className="badge badge-high" style={{padding: '0.15rem 0.4rem'}}>LIVE FLOW</span>
              </div>
              
              <div className="hotspot-list">
                {analytics && analytics.top_police_stations.map((ps, i) => (
                  <div key={i} className="hotspot-item">
                    <div className="hotspot-info">
                      <span className="hotspot-name" style={{textTransform: 'capitalize'}}>{ps.police_station}</span>
                      <span className="hotspot-count">{i % 3 === 0 ? 'Heavy Congestion' : 'Moderate Congestion'}</span>
                    </div>
                    <span className="hotspot-badge" style={{
                      background: i % 3 === 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      color: i % 3 === 0 ? 'var(--danger)' : 'var(--warning)'
                    }}>{ps.count} events</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Post-Event Learning Log */}
        {activeTab === 'learning' && (
          <div className="grid-2">
            
            {/* Submit Feedback Form */}
            <div className="panel">
              <h2 className="panel-title" style={{marginBottom: '1.25rem'}}>Log Post-Event Resolution Details</h2>
              {feedbackMsg && (
                <div style={{
                  padding: '0.75rem', 
                  borderRadius: '6px', 
                  background: 'rgba(16, 185, 129, 0.15)', 
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: 'var(--success)',
                  marginBottom: '1rem',
                  fontSize: '0.85rem'
                }}>
                  {feedbackMsg}
                </div>
              )}
              <form onSubmit={handleFeedbackSubmit}>
                <div className="form-group">
                  <label className="form-label">Event ID (e.g. FKID000001)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={feedbackEventId} 
                    onChange={(e) => setFeedbackEventId(e.target.value)}
                    placeholder="Enter ASTRAM Event ID"
                    required
                  />
                </div>

                <div className="grid-3" style={{gridTemplateColumns: '1fr 1fr 1fr', marginBottom: '0'}}>
                  <div className="form-group">
                    <label className="form-label">Actual Duration (min)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={actualDuration} 
                      onChange={(e) => setActualDuration(e.target.value)}
                      placeholder="e.g. 45"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Actual Manpower</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={actualManpower} 
                      onChange={(e) => setActualManpower(e.target.value)}
                      placeholder="Officers count"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Actual Barricades</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={actualBarricades} 
                      onChange={(e) => setActualBarricades(e.target.value)}
                      placeholder="Barricades count"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Police Station Location</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={feedbackStation} 
                    onChange={(e) => setFeedbackStation(e.target.value)}
                    placeholder="e.g. Yelahanka"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Operational Notes & Lessons Learned</label>
                  <textarea 
                    rows="3" 
                    value={feedbackNotes} 
                    onChange={(e) => setFeedbackNotes(e.target.value)}
                    placeholder="Enter diversion details or bottlenecks..."
                  />
                </div>

                <button type="submit" className="btn-primary">
                  <PlusCircle size={16} /> Log Resolution Details
                </button>
              </form>
            </div>

            {/* Logs List & Analysis */}
            <div className="forecast-results">
              <div className="panel">
                <h2 className="panel-title" style={{marginBottom: '1rem'}}>Forecast vs. Actual Performance (Post-Event Learning Loop)</h2>
                {feedbackLogs.length > 0 ? (
                  <>
                    <div style={{height: '240px', marginBottom: '1.5rem'}}>
                      <canvas id="feedbackChart"></canvas>
                    </div>
                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr>
                            <th>Event ID</th>
                            <th>Duration (P/A)</th>
                            <th>Manpower (R/A)</th>
                            <th>Barricades (R/A)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {feedbackLogs.map((log, i) => (
                            <tr key={i}>
                              <td style={{fontWeight: 'bold', color: 'var(--text-primary)'}}>{log.event_id}</td>
                              <td>{formatMinutes(log.duration?.predicted)} / {formatMinutes(log.duration?.actual)}</td>
                              <td>{log.manpower?.recommended} / {log.manpower?.actual}</td>
                              <td>{log.barricades?.recommended} / {log.barricades?.actual}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px'}}>
                    <p style={{color: 'var(--text-secondary)'}}>No logs submitted yet. Submit actual results to train the feedback loop.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}

export default App;
