import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { Map, Activity, AlertTriangle, TrendingUp } from 'lucide-react';

const API_BASE = "http://127.0.0.1:8000/api";

export default function LiveMap({ junctions }) {
  const [hotspots, setHotspots] = useState([]);
  const [surgeAlerts, setSurgeAlerts] = useState([]);
  const [showTrafficHeatmap, setShowTrafficHeatmap] = useState(true);
  const liveMapRef = useRef(null);
  const liveHeatmapLayersRef = useRef([]);

  // Fetch hotspots + surge alerts on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hotRes, surgeRes] = await Promise.all([
          fetch(`${API_BASE}/hotspots`),
          fetch(`${API_BASE}/surge-alerts`),
        ]);
        const hotData = await hotRes.json();
        const surgeData = await surgeRes.json();
        setHotspots(hotData.hotspots || []);
        setSurgeAlerts(surgeData.surge_alerts || []);
      } catch (e) {
        console.error("Failed to load map data", e);
      }
    };
    fetchData();
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!junctions || junctions.length === 0) return;

    // Centered at Bengaluru
    const map = L.map('live-map').setView([12.978, 77.599], 12);
    liveMapRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '©OpenStreetMap ©CartoDB',
      maxZoom: 19
    }).addTo(map);

    // Plot color-coded junctions by REAL vulnerability score
    junctions.slice(0, 100).forEach(j => {
      const score = j.vulnerability_score || 0;
      const color = score >= 60 ? '#ef4444' : score >= 30 ? '#f59e0b' : '#3b82f6';
      const fillColor = score >= 60 ? '#f87171' : score >= 30 ? '#fbbf24' : '#60a5fa';
      const radius = Math.max(5, Math.min(14, 5 + (score / 100) * 9));

      L.circleMarker([j.lat, j.lon], {
        radius,
        color: color,
        fillColor: fillColor,
        fillOpacity: 0.85,
        weight: 1.5
      })
      .addTo(map)
      .bindPopup(`
        <strong style="font-size:13px">Junction Control Point</strong><br/>
        <b>${j.junction}</b><br/>
        Vulnerability: <strong style="color: ${color}">${score}/100</strong><br/>
        Incidents: ${j.incident_count}<br/>
        Avg Resolution: ${Math.round(j.avg_duration)} mins
      `);
    });

    // Data-driven Traffic Congestion Heatmap — radius and color based on REAL vulnerability_score
    const heatLayers = [];
    junctions.slice(0, 60).forEach((j) => {
      const score = j.vulnerability_score || 0;
      if (score < 10) return; // skip low-risk junctions for cleaner heatmap

      // Color: red for high risk, orange for moderate, yellow for low
      const color = score >= 65 ? '#ef4444' : score >= 40 ? '#f97316' : '#fbbf24';
      // Radius: scale with vulnerability score and incident count
      const radius = 300 + (score / 100) * 700;
      const opacity = 0.08 + (score / 100) * 0.18;

      const circle = L.circle([j.lat, j.lon], {
        radius: radius,
        color: color,
        fillColor: color,
        fillOpacity: opacity,
        weight: 1,
      }).addTo(map)
      .bindPopup(`
        <strong>Congestion Risk Zone</strong><br/>
        ${j.junction}<br/>
        Risk Score: <strong style="color:${color}">${score}/100</strong><br/>
        ${j.incident_count} historical incidents
      `);

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

  const getSeverityColor = (sev) => {
    if (sev === 'Critical') return '#ef4444';
    if (sev === 'High') return '#f97316';
    return '#f59e0b';
  };

  return (
    <div style={{ display: 'flex', gap: '1.25rem', height: '100%' }}>
      {/* Map */}
      <div style={{ flex: 1, position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(99,102,241,0.3)' }}>
        <div id="live-map" style={{ width: '100%', height: '100%', minHeight: '520px' }} />

        {/* Toggle */}
        <div style={{
          position: 'absolute', top: '12px', right: '12px', zIndex: 999,
          display: 'flex', gap: '8px'
        }}>
          <button
            onClick={() => setShowTrafficHeatmap(!showTrafficHeatmap)}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              background: showTrafficHeatmap ? '#6366f1' : 'rgba(30,30,50,0.9)',
              color: '#fff', fontSize: '12px', fontWeight: '600',
              backdropFilter: 'blur(8px)'
            }}
          >
            {showTrafficHeatmap ? '🔥 Hide Heatmap' : '🔥 Show Heatmap'}
          </button>
        </div>

        {/* Legend */}
        <div style={{
          position: 'absolute', bottom: '12px', left: '12px', zIndex: 999,
          background: 'rgba(15,15,25,0.92)', border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '10px', padding: '10px 14px', fontSize: '11px', color: '#e2e8f0',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{ fontWeight: '700', marginBottom: '6px', color: '#a5b4fc' }}>Vulnerability Score</div>
          {[['#ef4444', '≥ 60 — High'], ['#f59e0b', '30–59 — Moderate'], ['#3b82f6', '< 30 — Low']].map(([c, l]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Surge Alerts */}
        <div style={{
          background: 'rgba(20,20,40,0.85)', border: '1px solid rgba(239,68,68,0.4)',
          borderRadius: '12px', padding: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
            <AlertTriangle size={16} color="#ef4444" />
            <span style={{ fontWeight: '700', color: '#ef4444', fontSize: '13px' }}>SURGE ALERTS</span>
          </div>
          {surgeAlerts.length === 0 ? (
            <p style={{ color: '#64748b', fontSize: '12px' }}>No surge anomalies detected</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto' }}>
              {surgeAlerts.slice(0, 8).map((alert, i) => (
                <div key={i} style={{
                  background: 'rgba(239,68,68,0.08)', border: `1px solid ${getSeverityColor(alert.severity)}40`,
                  borderLeft: `3px solid ${getSeverityColor(alert.severity)}`,
                  borderRadius: '8px', padding: '8px 10px'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#e2e8f0', marginBottom: '2px' }}>
                    {alert.corridor}
                  </div>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                    ↑ {alert.surge_factor}× surge · {alert.recent_monthly_rate}/mo recent
                  </div>
                  <div style={{
                    display: 'inline-block', marginTop: '3px',
                    fontSize: '9px', fontWeight: '700', padding: '1px 6px', borderRadius: '4px',
                    background: `${getSeverityColor(alert.severity)}25`,
                    color: getSeverityColor(alert.severity)
                  }}>
                    {alert.severity}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Hotspots (Police Stations) */}
        <div style={{
          background: 'rgba(20,20,40,0.85)', border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '12px', padding: '1rem', flex: 1
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
            <Activity size={16} color="#6366f1" />
            <span style={{ fontWeight: '700', color: '#a5b4fc', fontSize: '13px' }}>STATION RISK RANKING</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '280px', overflowY: 'auto' }}>
            {hotspots.slice(0, 12).map((h, i) => {
              const rs = h.risk_score || 0;
              const barColor = rs >= 70 ? '#ef4444' : rs >= 45 ? '#f97316' : '#6366f1';
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '10px', color: '#64748b', width: '16px', textAlign: 'right' }}>{i + 1}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', color: '#e2e8f0', fontWeight: '600', marginBottom: '2px' }}>
                      {h.police_station_clean}
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px' }}>
                      <div style={{ height: '4px', borderRadius: '2px', width: `${rs}%`, background: barColor, transition: 'width 0.5s ease' }} />
                    </div>
                  </div>
                  <span style={{ fontSize: '10px', color: barColor, fontWeight: '700', width: '28px', textAlign: 'right' }}>
                    {rs}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
