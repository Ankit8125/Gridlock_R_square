import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { Info, Users, AlertTriangle } from 'lucide-react';

const API_BASE = "http://127.0.0.1:8000/api";

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

  const formatMinutes = (mins) => {
    if (!mins) return "N/A";
    if (mins < 60) return `${Math.round(mins)} min`;
    const hrs = Math.floor(mins / 60);
    const remMins = Math.round(mins % 60);
    return remMins > 0 ? `${hrs}h ${remMins}m` : `${hrs}h`;
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

            {/* Resources */}
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
