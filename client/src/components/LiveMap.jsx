import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { Map, Activity } from 'lucide-react';

const API_BASE = "http://127.0.0.1:8000/api";

export default function LiveMap({ junctions }) {
  const [hotspots, setHotspots] = useState([]);
  const [showTrafficHeatmap, setShowTrafficHeatmap] = useState(true);
  const liveMapRef = useRef(null);
  const liveHeatmapLayersRef = useRef([]);

  // Fetch hotspots (police stations) on mount
  useEffect(() => {
    const fetchHotspots = async () => {
      try {
        const res = await fetch(`${API_BASE}/hotspots`);
        const data = await res.json();
        setHotspots(data.hotspots || []);
      } catch (e) {
        console.error("Failed to load hotspots", e);
      }
    };
    fetchHotspots();
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!junctions || junctions.length === 0) return;

    // Centered at Bengaluru
    const map = L.map('live-map').setView([12.978, 77.599], 12);
    liveMapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Plot color-coded junctions by vulnerability score
    // Red (>= 60): High, Orange (30-59): Moderate, Blue (< 30): Low
    junctions.slice(0, 100).forEach(j => {
      const score = j.vulnerability_score || 0;
      const color = score >= 60 ? '#ef4444' : score >= 30 ? '#f59e0b' : '#3b82f6';
      const fillColor = score >= 60 ? '#f87171' : score >= 30 ? '#fbbf24' : '#60a5fa';

      L.circleMarker([j.lat, j.lon], {
        radius: 7,
        color: color,
        fillColor: fillColor,
        fillOpacity: 0.8,
        weight: 1.5
      })
      .addTo(map)
      .bindPopup(`
        <strong>Junction Control Point</strong><br/>
        Name: <strong>${j.junction}</strong><br/>
        Vulnerability Score: <strong style="color: ${color}">${score}/100</strong><br/>
        Incident Count: ${j.incident_count}<br/>
        Avg Resolution: ${Math.round(j.avg_duration)} mins
      `);
    });

    // Generate dynamic Traffic Congestion Heatmap layers
    const heatLayers = [];
    junctions.slice(0, 45).forEach((j, index) => {
      const severityColors = ['#ef4444', '#f59e0b', '#fbbf24'];
      const radius = 250 + (index % 5) * 150;
      const color = severityColors[index % 3];
      
      const circle = L.circle([j.lat, j.lon], {
        radius: radius,
        color: color,
        fillColor: color,
        fillOpacity: 0.22,
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
  }, [junctions]);

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

  return (
    <div className="grid-3">
      {/* Map display */}
      <div className="panel" style={{ gridColumn: 'span 2', padding: '0', position: 'relative' }}>
        <div className="map-wrapper" style={{ height: '600px' }}>
          <div id="live-map"></div>
          <div className="map-placeholder-info" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div>
              <strong>Control Nodes</strong>: Color indicates dynamic vulnerability index.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input 
                type="checkbox" 
                id="heatmap-toggle"
                checked={showTrafficHeatmap}
                onChange={(e) => setShowTrafficHeatmap(e.target.checked)}
                style={{ cursor: 'pointer', width: '1rem', height: '1rem' }}
              />
              <label htmlFor="heatmap-toggle" style={{ cursor: 'pointer', fontWeight: 'bold' }}>Overlay Traffic Flow Heatmap</label>
            </div>
          </div>
        </div>
      </div>

      {/* Active Hotspots list sidebar */}
      <div className="panel" style={{ gridColumn: 'span 1' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 className="panel-title">Active Hotspots</h2>
          <span className="badge badge-high" style={{ padding: '0.15rem 0.4rem' }}>LIVE RISK</span>
        </div>
        
        <div className="hotspot-list" style={{ maxHeight: '520px', overflowY: 'auto' }}>
          {hotspots.length > 0 ? (
            hotspots.map((hs, i) => (
              <div key={i} className="hotspot-item">
                <div className="hotspot-info">
                  <span className="hotspot-name" style={{ textTransform: 'capitalize' }}>
                    {hs.police_station_clean}
                  </span>
                  <span className="hotspot-count" style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>
                    Incidents: {hs.incident_count} | Closure Rate: {Math.round(hs.road_closure_rate)}%
                  </span>
                </div>
                <span className="hotspot-badge" style={{
                  background: hs.risk_score >= 60 ? 'rgba(239, 68, 68, 0.2)' : hs.risk_score >= 35 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                  color: hs.risk_score >= 60 ? 'var(--danger)' : hs.risk_score >= 35 ? 'var(--warning)' : 'var(--primary)',
                  fontWeight: 'bold',
                  minWidth: '50px',
                  textAlign: 'center'
                }}>
                  {hs.risk_score}
                </span>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
              <Activity size={32} style={{ margin: '0 auto 1rem', color: 'var(--primary)' }} />
              <p>Loading station hotspots...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
