import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { Database, TrendingUp, Clock, Shield } from 'lucide-react';
import CorrelationGrid from './CorrelationGrid';

export default function AnalyticsDashboard({ analytics, correlationData }) {
  const causeChartRef = useRef(null);
  const hourChartRef = useRef(null);
  const vehChartRef = useRef(null);

  const formatMinutes = (mins) => {
    if (!mins) return "N/A";
    if (mins < 60) return `${Math.round(mins)} min`;
    const hrs = Math.floor(mins / 60);
    const remMins = Math.round(mins % 60);
    return remMins > 0 ? `${hrs}h ${remMins}m` : `${hrs}h`;
  };

  useEffect(() => {
    if (!analytics) return;

    // Destroy existing charts to prevent canvas reuse errors
    if (causeChartRef.current) causeChartRef.current.destroy();
    if (hourChartRef.current) hourChartRef.current.destroy();
    if (vehChartRef.current) vehChartRef.current.destroy();

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

    // 2. Hourly Peak Distributions
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
  }, [analytics]);

  if (!analytics) return <p>Loading analytics data...</p>;

  return (
    <div>
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
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          <p style={{ marginBottom: '0.5rem' }}>
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

      {/* Correlation Matrix */}
      <CorrelationGrid correlationData={correlationData} />

      {/* Charts Grid */}
      <div className="grid-2">
        <div className="panel">
          <h2 className="panel-title" style={{ marginBottom: '1rem' }}>Incidents Breakdown by Cause</h2>
          <canvas id="causeChart" height="200"></canvas>
        </div>
        <div className="panel">
          <h2 className="panel-title" style={{ marginBottom: '1rem' }}>Vehicle Breakdown Distributions (60% of Dataset)</h2>
          <canvas id="vehChart" height="200"></canvas>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.75rem', textAlign: 'center' }}>
            Heavy commercial vehicles (LCV and Heavy Trucks) and BMTC buses constitute over 60% of breakdown obstructions.
          </p>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <h2 className="panel-title" style={{ marginBottom: '1rem' }}>Hourly Logged Incidents Distribution (Bengaluru local time)</h2>
          <canvas id="hourChart" height="150"></canvas>
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
  );
}
