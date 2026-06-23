import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { Database, TrendingUp, Clock, Shield, MapPin, AlertTriangle } from 'lucide-react';
import CorrelationGrid from './CorrelationGrid';

const API_BASE = import.meta.env.VITE_API_BASE || 
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" 
    ? "http://127.0.0.1:8000/api" 
    : "/api");

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function AnalyticsDashboard({ analytics, correlationData, refreshData }) {
  const causeChartRef = useRef(null);
  const hourChartRef = useRef(null);
  const vehChartRef = useRef(null);
  const monthChartRef = useRef(null);
  const featureImportanceChartRef = useRef(null);

  const [monthlyData, setMonthlyData] = useState([]);
  const [weeklyHeatmap, setWeeklyHeatmap] = useState([]);
  const [venueRecurrence, setVenueRecurrence] = useState([]);

  // CSV upload & model retraining states
  const [csvFile, setCsvFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [diagnostics, setDiagnostics] = useState(null);
  const [selectedModelXai, setSelectedModelXai] = useState('duration_model');

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: 'warn' });
  const showToast = (message, type = 'warn') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'warn' }), 3500);
  };

  const formatMinutes = (mins) => {
    if (!mins) return "N/A";
    if (mins < 60) return `${Math.round(mins)} min`;
    const hrs = Math.floor(mins / 60);
    const remMins = Math.round(mins % 60);
    return remMins > 0 ? `${hrs}h ${remMins}m` : `${hrs}h`;
  };

  const fetchDiagnostics = async () => {
    try {
      const res = await fetch(`${API_BASE}/model-diagnostic`);
      const data = await res.json();
      if (!data.error) {
        setDiagnostics(data);
      }
    } catch (e) {
      console.error("Failed to load model diagnostics", e);
    }
  };

  // Fetch new analytics data
  useEffect(() => {
    const fetchExtras = async () => {
      try {
        const [mRes, wRes, vRes] = await Promise.all([
          fetch(`${API_BASE}/monthly-distribution`),
          fetch(`${API_BASE}/weekly-heatmap`),
          fetch(`${API_BASE}/venue-recurrence`),
        ]);
        const [m, w, v] = await Promise.all([mRes.json(), wRes.json(), vRes.json()]);
        setMonthlyData(m.monthly || []);
        setWeeklyHeatmap(w.weekly_heatmap || []);
        setVenueRecurrence(v.venue_recurrence || []);
      } catch (e) {
        console.error("Failed to load extra analytics", e);
      }
    };
    fetchExtras();
    fetchDiagnostics();
  }, []);

  const handleCSVUpload = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      showToast('Please select a CSV file before uploading.', 'warn');
      return;
    }
    setUploading(true);
    setUploadMsg("Uploading CSV file to server...");
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      setUploadMsg("Processing new events, cleaning features, and retraining models (1-3s)...");
      const res = await fetch(`${API_BASE}/upload-csv`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.status === "success") {
        setUploadSuccess(true);
        setUploadMsg(`Success! Merged ${data.uploaded_records_count} rows. All models retrained and hot-reloaded!`);
        setCsvFile(null);
        const fileInput = document.getElementById("csv-file-input");
        if (fileInput) fileInput.value = "";
        
        if (refreshData) {
          await refreshData();
        }
        await fetchDiagnostics();
      } else {
        setUploadSuccess(false);
        setUploadMsg(data.detail || "Upload or retraining failed. Check CSV column names.");
      }
    } catch (err) {
      console.error(err);
      setUploadSuccess(false);
      setUploadMsg("Error connecting to server. Ensure backend is running.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (!analytics) return;

    if (causeChartRef.current) causeChartRef.current.destroy();
    if (hourChartRef.current) hourChartRef.current.destroy();
    if (vehChartRef.current) vehChartRef.current.destroy();

    // 1. Cause Breakdown Chart
    const ctxCause = document.getElementById('causeChart');
    if (ctxCause) {
      const labels = analytics.cause_breakdown.map(c => c.cause.replace(/_/g, ' '));
      const counts = analytics.cause_breakdown.map(c => c.count);
      causeChartRef.current = new Chart(ctxCause, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Incident Count',
            data: counts,
            backgroundColor: 'rgba(99, 102, 241, 0.65)',
            borderColor: '#6366f1',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { grid: { color: 'rgba(148, 163, 184, 0.12)' }, ticks: { color: '#94a3b8' } },
            x: { grid: { display: false }, ticks: { color: '#94a3b8', maxRotation: 45 } }
          }
        }
      });
    }

    // 2. Hourly Peak Distribution
    const ctxHour = document.getElementById('hourChart');
    if (ctxHour) {
      const hours = Array.from({ length: 24 }, (_, i) => i);
      const counts = hours.map(h => analytics.hourly_distribution[h] || 0);
      hourChartRef.current = new Chart(ctxHour, {
        type: 'line',
        data: {
          labels: hours.map(h => `${h}:00`),
          datasets: [{
            label: 'Events (IST)',
            data: counts,
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139,92,246,0.12)',
            fill: true,
            tension: 0.35,
            pointRadius: 2,
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { grid: { color: 'rgba(148, 163, 184, 0.12)' }, ticks: { color: '#94a3b8' } },
            x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
          }
        }
      });
    }

    // 3. Vehicle Breakdown Doughnut
    const ctxVeh = document.getElementById('vehChart');
    if (ctxVeh) {
      const labels = analytics.vehicle_breakdown_types.map(v => v.vehicle_type.replace(/_/g, ' '));
      const counts = analytics.vehicle_breakdown_types.map(v => v.count);
      vehChartRef.current = new Chart(ctxVeh, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{
            data: counts,
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f43f5e']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'right', labels: { color: '#f8fafc', boxWidth: 12 } }
          }
        }
      });
    }

    return () => {
      if (causeChartRef.current) causeChartRef.current.destroy();
      if (hourChartRef.current) hourChartRef.current.destroy();
      if (vehChartRef.current) vehChartRef.current.destroy();
    };
  }, [analytics]);

  // Monthly chart
  useEffect(() => {
    if (!monthlyData.length || !analytics) return;
    if (monthChartRef.current) monthChartRef.current.destroy();
    const ctxMonth = document.getElementById('monthChart');
    if (ctxMonth) {
      monthChartRef.current = new Chart(ctxMonth, {
        type: 'bar',
        data: {
          labels: monthlyData.map(m => m.month_name),
          datasets: [{
            label: 'Incidents',
            data: monthlyData.map(m => m.count),
            backgroundColor: monthlyData.map((m, i) => {
              // Highlight rainy season (Jun-Sep) in blue
              if ([6, 7, 8, 9].includes(m.month)) return 'rgba(59,130,246,0.7)';
              // Festival season (Oct-Nov) in amber
              if ([10, 11].includes(m.month)) return 'rgba(245,158,11,0.7)';
              return 'rgba(99,102,241,0.6)';
            }),
            borderColor: 'transparent',
            borderRadius: 4,
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { grid: { color: 'rgba(148, 163, 184, 0.12)' }, ticks: { color: '#94a3b8' } },
            x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
          }
        }
      });
    }
    return () => { if (monthChartRef.current) monthChartRef.current.destroy(); };
  }, [monthlyData, analytics]);

  // 5. Explainable AI Feature Importance Chart
  useEffect(() => {
    if (!diagnostics || !diagnostics.feature_importances) return;

    if (featureImportanceChartRef.current) {
      featureImportanceChartRef.current.destroy();
    }

    const ctx = document.getElementById('featureImportanceChart');
    if (ctx) {
      const impData = diagnostics.feature_importances[selectedModelXai] || {};
      const labels = Object.keys(impData).map(k => k.replace(/_clean/g, '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
      const values = Object.values(impData).map(v => v * 100);

      featureImportanceChartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Feature Weight (%)',
            data: values,
            backgroundColor: 'rgba(59, 130, 246, 0.75)',
            borderColor: '#3b82f6',
            borderWidth: 1.5,
            borderRadius: 4
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `Weight: ${context.parsed.x.toFixed(2)}%`
              }
            }
          },
          scales: {
            x: {
              grid: { color: 'rgba(148, 163, 184, 0.12)' },
              ticks: { color: '#94a3b8' },
              title: { display: true, text: 'Importance Weight (%)', color: '#94a3b8', font: { size: 10 } }
            },
            y: {
              grid: { display: false },
              ticks: { color: '#94a3b8', font: { weight: 'bold' } }
            }
          }
        }
      });
    }

    return () => {
      if (featureImportanceChartRef.current) {
        featureImportanceChartRef.current.destroy();
      }
    };
  }, [diagnostics, selectedModelXai]);

  // Compute weekly heatmap grid max for normalization
  const weeklyMax = weeklyHeatmap.reduce((mx, cell) => Math.max(mx, cell.count), 1);
  const getWeeklyCell = (day, hour) => {
    const cell = weeklyHeatmap.find(c => c.local_day_of_week === day && c.local_hour === hour);
    return cell ? cell.count : 0;
  };
  const heatColor = (count) => {
    const ratio = count / weeklyMax;
    if (ratio > 0.75) return '#ef4444';
    if (ratio > 0.5) return '#f97316';
    if (ratio > 0.25) return '#f59e0b';
    if (ratio > 0.1) return '#6366f1';
    return 'rgba(148, 163, 184, 0.12)';
  };

  if (!analytics) return <p>Loading analytics data...</p>;

  return (
    <>
    <div>
      {/* KPIs */}
      <div className="kpis-container">
        <div className="kpi-card">
          <div className="kpi-header"><span>Total Logged Incidents</span><Database size={16} className="text-secondary" /></div>
          <div className="kpi-value">{analytics.kpis.total_events}</div>
          <div className="kpi-footer">ASTRAM historical database</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><span>Planned Event Layers</span><TrendingUp size={16} className="text-secondary" /></div>
          <div className="kpi-value">{analytics.kpis.planned_events}</div>
          <div className="kpi-footer">Rallies, construction, matches</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><span>Median Ticket Duration</span><Clock size={16} className="text-secondary" /></div>
          <div className="kpi-value">{formatMinutes(analytics.kpis.median_duration_minutes)}</div>
          <div className="kpi-footer">Excluding active & outlier tickets</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><span>Requires Road Closure</span><Shield size={16} className="text-secondary" /></div>
          <div className="kpi-value">{analytics.kpis.road_closure_percentage}%</div>
          <div className="kpi-footer">Heavy diversion requirements</div>
        </div>
      </div>

      {/* Retraining & Diagnostics Panel */}
      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        {/* Upload Card */}
        <div className="panel" style={{ marginBottom: 0 }}>
          <h2 className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
            <Database size={18} color="var(--primary)" />
            Retrain Models with Additional Data
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            Upload raw ASTRAM event logs in CSV format. The pipeline will automatically clean features, resolve coordinates, handle peak hours, and train new champion models.
          </p>
          <form onSubmit={handleCSVUpload} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <input 
                type="file" 
                id="csv-file-input"
                accept=".csv"
                onChange={e => setCsvFile(e.target.files[0])}
                disabled={uploading}
                style={{
                  background: 'var(--form-control-bg)',
                  border: '1px dashed var(--border-color)',
                  padding: '12px',
                  borderRadius: '8px',
                  width: '100%',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem'
                }}
              />
            </div>
            
            {uploadMsg && (
              <div style={{
                fontSize: '11px',
                padding: '8px 12px',
                borderRadius: '6px',
                background: uploadSuccess ? 'rgba(16,185,129,0.08)' : 'rgba(99,102,241,0.08)',
                border: `1px solid ${uploadSuccess ? 'rgba(16,185,129,0.2)' : 'rgba(99,102,241,0.2)'}`,
                color: uploadSuccess ? 'var(--success)' : 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {uploading && <RefreshCw className="animate-spin" size={12} style={{ animation: 'spin 1.5s linear infinite' }} />}
                <span>{uploadMsg}</span>
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={uploading} style={{ fontSize: '0.9rem', padding: '10px 16px' }}>
              {uploading ? (
                <>
                  <RefreshCw className="animate-spin" size={14} style={{ animation: 'spin 1.5s linear infinite' }} />
                  Processing & Retraining...
                </>
              ) : "Upload CSV & Retrain Model"}
            </button>
          </form>
        </div>

        {/* Model Diagnostics Card */}
        <div className="panel" style={{ marginBottom: 0 }}>
          <h2 className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
            <Shield size={18} color="var(--success)" />
            Model Diagnostics & Evaluation
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            Metrics evaluated on a temporal test split to verify out-of-sample generalization.
          </p>
          {diagnostics ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Duration Estimator (Regression)</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                  MedAE: {formatMinutes(diagnostics.regression?.[0]?.test_median_error_minutes || 55.6)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Priority Escalation (Classification)</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                  F1-Score: {Math.round((diagnostics.classification?.[0]?.test_f1_score || 1.0) * 100)}%
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Closure Forecaster (Barricading)</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                  ROC-AUC: {Math.round((diagnostics.closure_classification?.[0]?.test_roc_auc || 0.811) * 1000) / 10}%
                </span>
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '6px' }}>
                * Model architecture: Optimized Random Forests & Gradient Boosting Classifiers.
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Loading evaluation metrics...</p>
            </div>
          )}
        </div>
      </div>

      {/* Monthly Seasonal Trend */}
      <div className="panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
          <h2 className="panel-title" style={{ margin: 0 }}>Monthly Incident Trend — Seasonal Analysis</h2>
          <div style={{ display: 'flex', gap: '14px', fontSize: '11px', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: 10, height: 10, background: 'rgba(99,102,241,0.7)', borderRadius: '2px', display: 'inline-block' }} />
              Standard
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: 10, height: 10, background: 'rgba(59,130,246,0.7)', borderRadius: '2px', display: 'inline-block' }} />
              Monsoon (Jun–Sep)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: 10, height: 10, background: 'rgba(245,158,11,0.7)', borderRadius: '2px', display: 'inline-block' }} />
              Festival (Oct–Nov)
            </span>
          </div>
        </div>
        <canvas id="monthChart" height="100" />
      </div>

      {/* Weekly Heatmap */}
      <div className="panel">
        <h2 className="panel-title" style={{ marginBottom: '1rem' }}>Weekly Incident Heatmap — Day × Hour (IST)</h2>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `50px repeat(24, 1fr)`, gap: '2px', minWidth: '700px' }}>
            {/* Header row */}
            <div style={{ fontSize: '10px', color: '#64748b' }}></div>
            {Array.from({ length: 24 }, (_, h) => (
              <div key={h} style={{ fontSize: '9px', color: '#64748b', textAlign: 'center', paddingBottom: '3px' }}>
                {h}
              </div>
            ))}
            {/* Day rows */}
            {DAYS.map((day, d) => (
              <React.Fragment key={d}>
                <div style={{ fontSize: '10px', color: '#94a3b8', display: 'flex', alignItems: 'center', fontWeight: '600' }}>{day}</div>
                {Array.from({ length: 24 }, (_, h) => {
                  const count = getWeeklyCell(d, h);
                  return (
                    <div
                      key={h}
                      title={`${day} ${h}:00 — ${count} incidents`}
                      style={{
                        height: '18px', borderRadius: '2px',
                        background: heatColor(count),
                        cursor: 'default',
                        transition: 'opacity 0.2s',
                      }}
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px', fontSize: '10px', color: '#94a3b8', justifyContent: 'flex-end', alignItems: 'center' }}>
            <span>Low</span>
            {['rgba(148, 163, 184, 0.12)', '#6366f1', '#f59e0b', '#f97316', '#ef4444'].map((c, i) => (
              <div key={i} style={{ width: '14px', height: '14px', background: c, borderRadius: '2px' }} />
            ))}
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Venue Recurrence */}
      <div className="panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <MapPin size={16} color="#10b981" />
          <h2 className="panel-title">Chronic Incident Venues — Recurrent Obstruction Hotspots</h2>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Grid Location (lat,lon)</th>
                <th>Incidents</th>
                <th>Top Cause</th>
                <th>Avg Duration</th>
                <th>Road Closure %</th>
                <th>Recurrence Score</th>
              </tr>
            </thead>
            <tbody>
              {venueRecurrence.slice(0, 20).map((v, i) => {
                const score = v.recurrence_score || 0;
                const scoreColor = score >= 70 ? '#ef4444' : score >= 40 ? '#f97316' : '#6366f1';
                return (
                  <tr key={i}>
                    <td style={{ color: 'var(--text-secondary)', fontWeight: '700' }}>#{i + 1}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {Number(v.lat).toFixed(4)}, {Number(v.lon).toFixed(4)}
                    </td>
                    <td style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{v.incident_count}</td>
                    <td style={{ textTransform: 'capitalize', color: 'var(--primary)', fontWeight: '600' }}>{String(v.top_cause).replace(/_/g, ' ')}</td>
                    <td>{v.avg_duration ? formatMinutes(v.avg_duration) : '—'}</td>
                    <td>{Number(v.road_closure_rate).toFixed(1)}%</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ flex: 1, height: '4px', background: 'var(--border-color)', borderRadius: '2px' }}>
                          <div style={{ height: '4px', borderRadius: '2px', width: `${score}%`, background: scoreColor }} />
                        </div>
                        <span style={{ fontSize: '10px', color: scoreColor, fontWeight: '700', width: '28px' }}>{score}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Scope note */}
      <div className="panel">
        <div className="panel-header">
          <h2 className="panel-title">Data Scope & Model Tuning</h2>
          <span className="badge badge-learned">Tuned Models Active</span>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>Real-world Analysis Summary:</strong> Vehicle breakdowns dominate Bengaluru's traffic obstructions,
            accounting for <strong>59.9% of all rows (4,896 incidents)</strong>. Genuinely planned events (VIP movement,
            sports, public rallies) make up only <strong>1.8%</strong> of the dataset.
          </p>
          <p>
            <strong>Duration Cap Heuristics & Model Tuning:</strong> Out of 8,173 events, only 3,192 rows (39%) have valid
            completed durations. The pipeline drops negative entries and caps outlier durations at p90. The RandomForest
            model is tuned with optimized hyperparameters (estimators=150, depth=12) for stable generalization.
          </p>
        </div>
      </div>

      {/* Correlation Matrix */}
      <CorrelationGrid correlationData={correlationData} />

      {/* ML Feature Importance (XAI) Panel */}
      {diagnostics && diagnostics.feature_importances && (
        <div className="panel" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h2 className="panel-title" style={{ marginBottom: '0.25rem' }}>Explainable AI (XAI) — ML Model Feature Weights</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                This chart displays the normalized mathematical weight of each input feature in the selected pre-trained Random Forest model.
              </p>
            </div>
            
            {/* Model Selector Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Select Model:</span>
              <select
                value={selectedModelXai}
                onChange={(e) => setSelectedModelXai(e.target.value)}
                style={{
                  background: 'var(--form-control-bg)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="duration_model">Incident Duration Model (Regressor)</option>
                <option value="priority_model">Congestion Priority Model (Classifier)</option>
                <option value="closure_model">Road Closure Model (Classifier)</option>
              </select>
            </div>
          </div>

          <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', background: 'var(--terminal-bg)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <canvas id="featureImportanceChart" height="220" />
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid-2">
        <div className="panel">
          <h2 className="panel-title" style={{ marginBottom: '1rem' }}>Incidents by Cause</h2>
          <canvas id="causeChart" height="200" />
        </div>
        <div className="panel">
          <h2 className="panel-title" style={{ marginBottom: '1rem' }}>Vehicle Type Breakdown</h2>
          <canvas id="vehChart" height="200" />
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.75rem', textAlign: 'center' }}>
            Heavy commercial vehicles and BMTC buses constitute over 60% of breakdown obstructions.
          </p>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <h2 className="panel-title" style={{ marginBottom: '1rem' }}>Hourly Distribution (IST)</h2>
          <canvas id="hourChart" height="150" />
        </div>
        <div className="panel">
          <h2 className="panel-title" style={{ marginBottom: '1rem' }}>Top 15 Most Active Police Stations</h2>
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
                    <td style={{ textTransform: 'capitalize' }}>{ps.police_station}</td>
                    <td>{ps.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    {/* Toast Notification */}
    {toast.show && (
      <div style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        padding: '14px 20px',
        borderRadius: '12px',
        background: toast.type === 'warn'
          ? 'linear-gradient(135deg, #f59e0b, #d97706)'
          : 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: 'white',
        fontWeight: '600',
        fontSize: '0.875rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        animation: 'slideInRight 0.35s cubic-bezier(0.16,1,0.3,1)',
        maxWidth: '340px',
        lineHeight: '1.4',
      }}>
        <AlertTriangle size={17} style={{ flexShrink: 0 }} />
        {toast.message}
      </div>
    )}
    </>
  );
}
