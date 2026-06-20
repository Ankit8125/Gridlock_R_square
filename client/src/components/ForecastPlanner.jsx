import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { Info, Users, AlertTriangle, Zap, Download, TrendingDown, CloudRain, Compass } from 'lucide-react';

const API_BASE = "http://127.0.0.1:8000/api";

const formatMinutes = (mins) => {
  if (!mins) return "N/A";
  if (mins < 60) return `${Math.round(mins)} min`;
  const hrs = Math.floor(mins / 60);
  const remMins = Math.round(mins % 60);
  return remMins > 0 ? `${hrs}h ${remMins}m` : `${hrs}h`;
};


export default function ForecastPlanner() {
  // Form State
  const [cause, setCause] = useState('vehicle_breakdown');
  const [eventType, setEventType] = useState('unplanned');
  const [latitude, setLatitude] = useState('12.9716');
  const [longitude, setLongitude] = useState('77.5946');
  const [requiresClosure, setRequiresClosure] = useState(false);
  const [corridor, setCorridor] = useState('Non-corridor');
  const [hour, setHour] = useState(9);
  const [dayOfWeek, setDayOfWeek] = useState(1);

  // Prediction Response
  const [prediction, setPrediction] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [routingSource, setRoutingSource] = useState("OSRM");

  // What-if state
  const [whatIfBarricades, setWhatIfBarricades] = useState(0);
  const [whatIfOfficers, setWhatIfOfficers] = useState(0);
  const [whatIfCloseRoad, setWhatIfCloseRoad] = useState(false);
  const [whatIfResult, setWhatIfResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Map references
  const plannerMapRef = useRef(null);
  const plannerMarkerRef = useRef(null);
  const detourLineRef = useRef(null);
  const junctionMarkersRef = useRef([]);

  // Initialize Map
  useEffect(() => {
    // Bengaluru default center
    const map = L.map('planner-map').setView([12.9716, 77.5946], 12);
    plannerMapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const marker = L.marker([12.9716, 77.5946], { draggable: true }).addTo(map);
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
  }, []);

  // Sync manual input changes to map marker
  useEffect(() => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (plannerMarkerRef.current && plannerMapRef.current && !isNaN(lat) && !isNaN(lon)) {
      plannerMarkerRef.current.setLatLng([lat, lon]);
      plannerMapRef.current.panTo([lat, lon]);
    }
  }, [latitude, longitude]);

  // Handle Predictions visual elements update (markers, rings, detours)
  useEffect(() => {
    if (!prediction || !plannerMapRef.current) return;

    const map = plannerMapRef.current;
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    // Clear old elements
    junctionMarkersRef.current.forEach(m => map.removeLayer(m));
    junctionMarkersRef.current = [];
    if (detourLineRef.current) {
      map.removeLayer(detourLineRef.current);
      detourLineRef.current = null;
    }

    // Add Checkpoints & Spillover Rings to Map
    if (prediction.nearest_junction_checkpoints) {
      prediction.nearest_junction_checkpoints.forEach((j, index) => {
        // Pin marker
        const marker = L.circleMarker([j.latitude, j.longitude], {
          radius: 8,
          color: '#f59e0b',
          fillColor: '#fbbf24',
          fillOpacity: 0.9
        })
        .addTo(map)
        .bindPopup(`<strong>Checkpoint ${index + 1}: ${j.name}</strong><br/>Distance: ${j.distance_meters}m<br/>Spillover Risk: ${j.spillover_risk_percentage}%`);
        junctionMarkersRef.current.push(marker);

        // Spillover Danger Ring
        const risk = j.spillover_risk_percentage || 0;
        const ringColor = risk >= 60 ? '#ef4444' : risk >= 30 ? '#f59e0b' : '#3b82f6';
        
        const ring = L.circle([j.latitude, j.longitude], {
          radius: 300, // 300 meters warning zone radius
          color: ringColor,
          fillColor: ringColor,
          fillOpacity: 0.12,
          weight: 1.5,
          dashArray: '4, 6'
        })
        .addTo(map)
        .bindPopup(`<strong>Spillover Congestion Ring</strong><br/>Check Point: ${j.name}<br/>Est Delay Risk: ${risk}%`);
        junctionMarkersRef.current.push(ring);
      });

      // Query alternate routing detour to nearest checkpoint
      if (prediction.nearest_junction_checkpoints.length > 0) {
        const primaryJunc = prediction.nearest_junction_checkpoints[0];
        fetchDetourRoute(lat, lon, primaryJunc.latitude, primaryJunc.longitude);
      }
    }
  }, [prediction]);

  const drawRouteOnMap = (coords, isFallback = false) => {
    if (!plannerMapRef.current) return;
    if (detourLineRef.current) {
      plannerMapRef.current.removeLayer(detourLineRef.current);
    }
    const line = L.polyline(coords, {
      color: isFallback ? '#ef4444' : '#3b82f6',
      weight: 6,
      opacity: 0.8,
      dashArray: isFallback ? '10, 10' : '5, 10'
    }).addTo(plannerMapRef.current);
    detourLineRef.current = line;
  };

  const fetchDetourRoute = async (startLat, startLon, endLat, endLon) => {
    setRoutingSource("OSRM API");
    try {
      const res = await fetch(`https://router.projectosrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`);
      if (!res.ok) throw new Error("OSRM service failed");
      const data = await res.json();
      
      if (data.routes && data.routes.length > 0) {
        const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
        drawRouteOnMap(coords);
      } else {
        throw new Error("No routing results");
      }
    } catch (e) {
      console.warn("OSRM offline or query error, using straight fallback detour line", e);
      setRoutingSource("Fallback (OSRM Offline)");
      // Fallback straight line
      drawRouteOnMap([[startLat, startLon], [endLat, endLon]], true);
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

  const handleWhatIf = async () => {
    if (!prediction) return;
    setIsSimulating(true);
    try {
      const res = await fetch(`${API_BASE}/what-if`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cause, event_type: eventType,
          latitude: parseFloat(latitude), longitude: parseFloat(longitude),
          requires_road_closure: requiresClosure, corridor,
          hour: parseInt(hour), day_of_week: parseInt(dayOfWeek),
          extra_barricades: whatIfBarricades,
          extra_officers: whatIfOfficers,
          close_road: whatIfCloseRoad,
        })
      });
      const data = await res.json();
      setWhatIfResult(data.simulation);
    } catch (err) {
      console.error("What-if failed", err);
    } finally {
      setIsSimulating(false);
    }
  };

  const handlePDFExport = () => {
    if (!prediction) return;
    const cascade = prediction.cascade || {};
    const manpower = prediction.resources?.manpower || {};
    const allocations = prediction.resources?.station_allocations || [];
    const junctions = prediction.nearest_junction_checkpoints || [];

    const printContent = `
<!DOCTYPE html>
<html>
<head>
  <title>BTP Dispatch Order</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 24px; color: #111; }
    h1 { color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 8px; }
    h2 { color: #374151; font-size: 14px; margin-top: 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    th, td { padding: 8px 12px; text-align: left; border: 1px solid #d1d5db; }
    th { background: #eff6ff; font-weight: 700; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 12px; }
    .high { background: #fee2e2; color: #b91c1c; }
    .low { background: #dcfce7; color: #15803d; }
    .section { margin-bottom: 20px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; }
    .meta { color: #6b7280; font-size: 12px; margin-bottom: 16px; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
  <h1>🚦 Bengaluru Traffic Police — Dispatch Order</h1>
  <div class="meta">
    Generated: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST &nbsp;|&nbsp;
    Location: ${latitude}, ${longitude} &nbsp;|&nbsp;
    Cause: ${cause.replace(/_/g, ' ')} &nbsp;|&nbsp;
    Corridor: ${corridor}
  </div>

  <div class="section">
    <h2>INCIDENT FORECAST</h2>
    <table>
      <tr><th>Parameter</th><th>Value</th></tr>
      <tr><td>Predicted Duration</td><td>${formatMinutes(prediction.predicted_duration_minutes)}</td></tr>
      <tr><td>90% Confidence Interval</td><td>${formatMinutes(prediction.predicted_duration_interval?.min)} – ${formatMinutes(prediction.predicted_duration_interval?.max)}</td></tr>
      <tr><td>Priority</td><td>${prediction.predicted_priority}</td></tr>
      <tr><td>Impact Score</td><td>${prediction.impact?.score}/100 (${prediction.impact?.class})</td></tr>
      <tr><td>Cascade Probability</td><td>${Math.round((cascade.cascade_probability || 0) * 100)}% (${cascade.cascade_class})</td></tr>
      ${cascade.point_of_no_return_minutes ? `<tr><td>Point of No Return</td><td>${cascade.point_of_no_return_minutes} minutes</td></tr>` : ''}
      <tr><td>Road Closure Recommended</td><td>${prediction.closure_recommended ? 'Yes' : 'No'}</td></tr>
      ${prediction.weather ? `<tr><td>Live Weather</td><td>${prediction.weather.description} (${prediction.weather.temperature}°C, Precipitation: ${prediction.weather.rain_mm} mm)</td></tr>` : ''}
    </table>
  </div>

  ${prediction.diversion_plan ? `
  <div class="section">
    <h2>TACTICAL DIVERSION PLAN</h2>
    <p style="font-weight:700;margin-bottom:8px;font-size:13px;color:#1e40af;">${prediction.diversion_plan.summary}</p>
    <ol style="margin-left:20px;padding-left:0;font-size:12px;line-height:1.5;">
      ${prediction.diversion_plan.steps.map(s => `<li style="margin-bottom:4px;">${s}</li>`).join('')}
    </ol>
  </div>` : ''}

  <div class="section">
    <h2>RESOURCE DEPLOYMENT ORDER</h2>
    <table>
      <tr><th>Rank</th><th>Count</th></tr>
      <tr><td>Sub-Inspector (SI)</td><td>${manpower.sub_inspector}</td></tr>
      <tr><td>Head Constable (HC)</td><td>${manpower.head_constable}</td></tr>
      <tr><td>Police Constable (PC)</td><td>${manpower.constable}</td></tr>
      <tr><td><strong>Total Officers</strong></td><td><strong>${manpower.total_officers}</strong></td></tr>
      <tr><td>Barricades</td><td>${prediction.resources?.barricades}</td></tr>
    </table>
  </div>

  ${allocations.length > 0 ? `
  <div class="section">
    <h2>STATION DEPLOYMENT ALLOCATION</h2>
    <table>
      <tr><th>Police Station</th><th>Officers to Deploy</th><th>Distance</th></tr>
      ${allocations.map(a => `<tr><td>${a.station}</td><td>${a.officers}</td><td>${(a.distance_meters/1000).toFixed(1)} km</td></tr>`).join('')}
    </table>
  </div>` : ''}

  ${junctions.length > 0 ? `
  <div class="section">
    <h2>DIVERSION CONTROL POINTS</h2>
    <table>
      <tr><th>Junction</th><th>Distance</th><th>Spillover Risk</th></tr>
      ${junctions.map(j => `<tr><td>${j.name}</td><td>${j.distance_meters}m</td><td>${j.spillover_risk_percentage}%</td></tr>`).join('')}
    </table>
  </div>` : ''}

  <div class="section">
    <h2>AI REASONING</h2>
    <ul>${(prediction.impact?.explanations || []).map(e => `<li>${e}</li>`).join('')}</ul>
  </div>

  <p style="color:#9ca3af;font-size:11px;margin-top:24px;">ASTRAM Intelligence Platform — Bengaluru Traffic Police &nbsp;|&nbsp; Confidential</p>
</body>
</html>`.trim();

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); }, 500);
  };

  return (
    <div className="grid-2">
      {/* Input Form Panel */}
      <div className="panel">
        <h2 className="panel-title" style={{ marginBottom: '1.25rem' }}>Forecast Congestion & Plan Resources</h2>
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

          <div className="grid-2" style={{ marginBottom: '0' }}>
            <div className="form-group">
              <label className="form-label">Event Type</label>
              <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
                <option value="unplanned">Unplanned Incident</option>
                <option value="planned">Planned Event</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Requires Road Closure?</label>
              <div style={{ display: 'flex', alignItems: 'center', height: '2.4rem' }}>
                <input 
                  type="checkbox" 
                  id="closure-checkbox"
                  checked={requiresClosure} 
                  onChange={(e) => setRequiresClosure(e.target.checked)}
                  style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', cursor: 'pointer' }} 
                />
                <label htmlFor="closure-checkbox" style={{ cursor: 'pointer', fontSize: '0.9rem' }}>Yes, close road</label>
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ marginBottom: '0' }}>
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

          <div className="grid-2" style={{ marginBottom: '0' }}>
            <div className="form-group">
              <label className="form-label">Hour of Day (IST: {hour}:00)</label>
              <input 
                type="range" 
                min="0" 
                max="23"
                value={hour}
                onChange={(e) => setHour(parseInt(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', marginTop: '0.5rem' }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Day of Week</label>
              <select value={dayOfWeek} onChange={(e) => setDayOfWeek(parseInt(e.target.value))}>
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

        <div style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.5rem' }}>
          <Info size={16} style={{ color: 'var(--primary)', flexShrink: '0' }} />
          <span>Tip: Click directly on the map to set coordinates, or drag the blue marker to position the incident on any road.</span>
        </div>
      </div>

      {/* Results Panel */}
      <div className="forecast-results">
        {/* Map Panel */}
        <div className="panel" style={{ padding: '0', position: 'relative' }}>
          <div className="map-wrapper">
            <div id="planner-map"></div>
            <div className="map-placeholder-info">
              <strong>Routing Engine</strong>: Suggested detour plotted in blue. Path source: <code>{routingSource}</code>.
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

            <div className="grid-2" style={{ marginBottom: '1rem' }}>
              <div className="result-card">
                <div className="resource-title">Expected Ticket Duration</div>
                <div className="prediction-val-box">
                  <span className="prediction-val">{formatMinutes(prediction.predicted_duration_minutes)}</span>
                </div>
                {prediction.predicted_duration_interval && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.4rem', fontWeight: 'bold' }}>
                    Interval: {formatMinutes(prediction.predicted_duration_interval.min)} – {formatMinutes(prediction.predicted_duration_interval.max)} (90% Conf.)
                  </div>
                )}
              </div>
              <div className="result-card">
                <div className="resource-title">Congestion Priority</div>
                <div style={{ marginTop: '0.5rem' }}>
                  <span className={`badge ${prediction.predicted_priority === 'high' ? 'badge-high' : 'badge-low'}`}>
                    {prediction.predicted_priority} priority
                  </span>
                </div>
              </div>
            </div>

            {prediction.impact && (
              <div className="result-card" style={{ marginBottom: '1rem' }}>
                <div className="panel-title" style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>Impact & Closure Intelligence</div>
                <div className="resource-grid">
                  <div className="resource-item total">
                    <div className="resource-title">Impact Score</div>
                    <div className="resource-value" style={{ color: 'var(--danger)' }}>
                      {prediction.impact.score}/100
                    </div>
                    <span className={`badge ${prediction.impact.class === 'Critical' || prediction.impact.class === 'High' ? 'badge-high' : 'badge-low'}`}>
                      {prediction.impact.class}
                    </span>
                  </div>
                  <div className="resource-item">
                    <div className="resource-title">Closure Probability</div>
                    <div className="resource-value">
                      {Math.round((prediction.closure_probability || 0) * 100)}%
                    </div>
                    <span className={`badge ${prediction.closure_recommended ? 'badge-high' : 'badge-low'}`}>
                      {prediction.closure_recommended ? 'Stage barricades' : 'Monitor'}
                    </span>
                  </div>
                  <div className="resource-item">
                    <div className="resource-title">Duration Band</div>
                    <div className="resource-value" style={{ fontSize: '1.15rem' }}>
                      {prediction.duration_band}
                    </div>
                  </div>
                  <div className="resource-item">
                    <div className="resource-title">Confidence</div>
                    <div className="resource-value" style={{ fontSize: '1.15rem' }}>
                      {prediction.impact.confidence}
                    </div>
                  </div>
                </div>
                {prediction.impact.explanations?.length > 0 && (
                  <ul className="reason-list">
                    {prediction.impact.explanations.slice(0, 4).map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Live Weather Widget */}
            {prediction.weather && (
              <div className="result-card" style={{ marginBottom: '1rem', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CloudRain size={16} color="#3b82f6" />
                    <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#93c5fd' }}>Current Weather Conditions</span>
                  </div>
                  <span className={`badge ${prediction.weather.is_raining ? 'badge-high' : 'badge-low'}`}>
                    {prediction.weather.is_raining ? 'Rain Impact active' : 'Clear weather'}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                  <div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>Weather Status</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#f8fafc' }}>{prediction.weather.description}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>Temperature / Precipitation</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#f8fafc' }}>{prediction.weather.temperature}°C &nbsp;|&nbsp; {prediction.weather.rain_mm} mm</div>
                  </div>
                </div>
              </div>
            )}

            {/* Cascade Probability */}
            {prediction.cascade && (
              <div className="result-card" style={{ marginBottom: '1rem',
                border: `1px solid ${
                  prediction.cascade.cascade_class === 'Critical' ? 'rgba(239,68,68,0.5)' :
                  prediction.cascade.cascade_class === 'High' ? 'rgba(249,115,22,0.4)' :
                  'rgba(99,102,241,0.3)'
                }`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div className="panel-title" style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Zap size={14} color="#f59e0b" />
                    Cascade & Escalation Risk
                  </div>
                  <span className={`badge ${
                    prediction.cascade.cascade_class === 'Critical' ? 'badge-high' : 'badge-low'
                  }`}>{prediction.cascade.cascade_class}</span>
                </div>
                <div className="resource-grid">
                  <div className="resource-item">
                    <div className="resource-title">Cascade Probability</div>
                    <div className="resource-value" style={{
                      color: prediction.cascade.cascade_probability >= 0.7 ? '#ef4444' :
                             prediction.cascade.cascade_probability >= 0.5 ? '#f97316' : '#6366f1'
                    }}>
                      {Math.round(prediction.cascade.cascade_probability * 100)}%
                    </div>
                  </div>
                  {prediction.cascade.point_of_no_return_minutes && (
                    <div className="resource-item" style={{ border: '1px solid rgba(239,68,68,0.35)' }}>
                      <div className="resource-title" style={{ color: '#fca5a5' }}>⏱ Point of No Return</div>
                      <div className="resource-value" style={{ color: '#ef4444' }}>
                        {prediction.cascade.point_of_no_return_minutes} min
                      </div>
                      <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>Act before this window closes</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Station-level Allocation */}
            {prediction.resources?.station_allocations?.length > 0 && (
              <div className="result-card" style={{ marginBottom: '1rem' }}>
                <div className="panel-title" style={{ fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Users size={14} color="#10b981" />
                  Station Deployment Allocation
                </div>
                {prediction.resources.station_allocations.map((alloc, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 12px', marginBottom: '6px',
                    background: 'rgba(16,185,129,0.06)',
                    border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px'
                  }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: '#e2e8f0' }}>{alloc.station}</div>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>{(alloc.distance_meters / 1000).toFixed(1)} km away</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '20px', fontWeight: '800', color: '#10b981' }}>{alloc.officers}</div>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>officers</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Resources (existing) */}
            <div className="result-card" style={{ marginBottom: '1rem' }}>
              <div className="panel-title" style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>Recommended Deployment Plan</div>
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
                    <div className="resource-title" style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', alignItems: 'center' }}>
                      <Users size={12} /> Total Deployable Manpower
                    </div>
                    <div className="resource-value" style={{ color: 'var(--primary)' }}>{prediction.resources.manpower.total_officers} Officers</div>
                  </div>
                </div>

                <div className="resource-grid">
                  <div className="resource-item total" style={{ background: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.15)' }}>
                    <div className="resource-title">Barricades Deployment</div>
                    <div className="resource-value" style={{ color: 'var(--warning)' }}>{prediction.resources.barricades} Barricades</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tactical Diversion Plan */}
            {prediction.diversion_plan && (
              <div className="result-card" style={{ marginBottom: '1rem', border: '1px solid rgba(99,102,241,0.3)' }}>
                <div className="panel-title" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Compass size={14} color="#6366f1" />
                  Tactical Diversion Instructions
                </div>
                <p style={{ fontSize: '12px', color: '#e2e8f0', marginBottom: '8px', fontWeight: '600' }}>
                  {prediction.diversion_plan.summary}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {prediction.diversion_plan.steps.map((step, i) => (
                    <div key={i} style={{
                      fontSize: '11px', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)',
                      padding: '6px 10px', borderRadius: '6px', borderLeft: '3px solid #6366f1'
                    }}>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Diversion Control Points */}
            <div className="result-card">
              <div className="panel-title" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Nearest Diversion Control Points</div>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Junction Point</th>
                      <th>Distance</th>
                      <th>Spillover Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prediction.nearest_junction_checkpoints.map((j, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{j.name}</td>
                        <td>{j.distance_meters} m</td>
                        <td>
                          <span className="badge" style={{
                            background: j.spillover_risk_percentage >= 60 ? 'rgba(239, 68, 68, 0.2)' : j.spillover_risk_percentage >= 30 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                            color: j.spillover_risk_percentage >= 60 ? 'var(--danger)' : j.spillover_risk_percentage >= 30 ? 'var(--warning)' : 'var(--primary)'
                          }}>
                            {j.spillover_risk_percentage}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Similar historical events */}
            {prediction.similar_historical_events.length > 0 && (
              <div className="result-card" style={{ marginTop: '1rem' }}>
                <div className="panel-title" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Comparable Historical Cases</div>
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
                          <td style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.address}</td>
                          <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.description}</td>
                          <td>{item.actual_duration_minutes ? formatMinutes(item.actual_duration_minutes) : 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* What-If Simulator */}
            <div className="result-card" style={{ marginTop: '1rem', border: '1px solid rgba(99,102,241,0.4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <TrendingDown size={14} color="#6366f1" />
                <div className="panel-title" style={{ fontSize: '0.9rem' }}>What-If Scenario Simulator</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Extra Barricades: {whatIfBarricades}</label>
                  <input type="range" min="0" max="30" value={whatIfBarricades}
                    onChange={e => { setWhatIfBarricades(parseInt(e.target.value)); setWhatIfResult(null); }}
                    style={{ width: '100%', cursor: 'pointer' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Extra Officers: {whatIfOfficers}</label>
                  <input type="range" min="0" max="20" value={whatIfOfficers}
                    onChange={e => { setWhatIfOfficers(parseInt(e.target.value)); setWhatIfResult(null); }}
                    style={{ width: '100%', cursor: 'pointer' }} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <label style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={whatIfCloseRoad}
                    onChange={e => { setWhatIfCloseRoad(e.target.checked); setWhatIfResult(null); }}
                    style={{ width: '14px', height: '14px' }} />
                  Close Road (Full Diversion)
                </label>
                <button onClick={handleWhatIf} disabled={isSimulating}
                  style={{
                    padding: '6px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    background: '#6366f1', color: '#fff', fontSize: '12px', fontWeight: '700',
                    opacity: isSimulating ? 0.6 : 1
                  }}>
                  {isSimulating ? 'Simulating...' : 'Simulate'}
                </button>
              </div>
              {whatIfResult && (
                <div style={{
                  background: whatIfResult.duration_change_minutes < -15 ? 'rgba(16,185,129,0.08)' : 'rgba(99,102,241,0.08)',
                  border: `1px solid ${whatIfResult.duration_change_minutes < -15 ? 'rgba(16,185,129,0.3)' : 'rgba(99,102,241,0.3)'}`,
                  borderRadius: '8px', padding: '10px 14px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div>
                      <div style={{ fontSize: '10px', color: '#94a3b8' }}>New Duration</div>
                      <div style={{ fontSize: '18px', fontWeight: '800', color: '#e2e8f0' }}>{formatMinutes(whatIfResult.modified_duration_minutes)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', color: '#94a3b8' }}>Duration Change</div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: whatIfResult.duration_change_minutes < 0 ? '#10b981' : '#ef4444' }}>
                        {whatIfResult.duration_change_pct > 0 ? '+' : ''}{whatIfResult.duration_change_pct}%
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', color: '#94a3b8' }}>New Cascade Risk</div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: '#f59e0b' }}>
                        {Math.round(whatIfResult.modified_cascade_probability * 100)}%
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '11px', color: whatIfResult.duration_change_minutes < -15 ? '#10b981' : '#94a3b8', fontWeight: '600' }}>
                    💡 {whatIfResult.recommendation}
                  </div>
                </div>
              )}
            </div>

            {/* PDF Export */}
            <div style={{ marginTop: '1rem' }}>
              <button onClick={handlePDFExport}
                style={{
                  width: '100%', padding: '10px', borderRadius: '10px', border: 'none',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: 'linear-gradient(135deg, #1e40af, #6366f1)',
                  color: '#fff', fontSize: '13px', fontWeight: '700', letterSpacing: '0.5px'
                }}>
                <Download size={14} />
                Export PDF Dispatch Order
              </button>
            </div>

          </div>
        ) : (
          <div className="panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Submit parameters to view forecast and planning data.</p>
          </div>
        )}
      </div>
    </div>
  );
}
