import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { PlusCircle, RefreshCw } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" 
    ? "http://127.0.0.1:8000/api" 
    : "/api");

export default function FeedbackLog() {
  // Form State
  const [feedbackEventId, setFeedbackEventId] = useState('');
  const [actualDuration, setActualDuration] = useState('');
  const [actualManpower, setActualManpower] = useState('');
  const [actualBarricades, setActualBarricades] = useState('');
  const [feedbackStation, setFeedbackStation] = useState('');
  const [feedbackNotes, setFeedbackNotes] = useState('');
  
  // Data State
  const [logs, setLogs] = useState([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const feedbackChartRef = useRef(null);

  const fetchFeedbackLogs = async () => {
    setIsLoadingLogs(true);
    try {
      const res = await fetch(`${API_BASE}/feedback/summary`);
      const data = await res.json();
      const serverLogs = data.logs || [];

      // Retrieve locally saved logs
      const localLogsStr = localStorage.getItem('astram_local_feedback_logs');
      const localLogs = localLogsStr ? JSON.parse(localLogsStr) : [];

      // Merge server logs and local logs, keyed by event_id.
      // Local logs represent newer updates, so they take precedence.
      const mergedMap = {};
      serverLogs.forEach(log => {
        if (log.event_id) {
          mergedMap[log.event_id] = log;
        }
      });
      localLogs.forEach(log => {
        if (log.event_id) {
          mergedMap[log.event_id] = log;
        }
      });

      setLogs(Object.values(mergedMap));
    } catch (e) {
      console.error("Failed to load feedback logs", e);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  useEffect(() => {
    fetchFeedbackLogs();
  }, []);

  // Render Chart comparing predicted vs actual durations
  useEffect(() => {
    if (logs.length === 0) return;

    const ctxF = document.getElementById('feedbackChart');
    if (ctxF) {
      if (feedbackChartRef.current) {
        feedbackChartRef.current.destroy();
      }

      const labels = logs.map(l => l.event_id);
      const predictedDurs = logs.map(l => l.duration?.predicted || 0);
      const actualDurs = logs.map(l => l.duration?.actual || 0);

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
              fill: false,
              tension: 0.2
            },
            {
              label: 'Actual Duration (min)',
              data: actualDurs,
              borderColor: '#10b981',
              fill: false,
              tension: 0.2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
            x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
          }
        }
      });
    }

    return () => {
      if (feedbackChartRef.current) {
        feedbackChartRef.current.destroy();
        feedbackChartRef.current = null;
      }
    };
  }, [logs]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackMsg('');
    setIsSubmitting(true);
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
        setFeedbackMsg("Feedback log submitted successfully! Recommendation policy updated dynamically.");
        
        // Save the detailed log entry locally to persist across Vercel stateless container recycles
        if (data.log_entry) {
          const localLogsStr = localStorage.getItem('astram_local_feedback_logs');
          const localLogs = localLogsStr ? JSON.parse(localLogsStr) : [];
          
          // Filter out any existing local entry for this event_id
          const updatedLocalLogs = localLogs.filter(log => log.event_id !== data.log_entry.event_id);
          updatedLocalLogs.push(data.log_entry);
          
          localStorage.setItem('astram_local_feedback_logs', JSON.stringify(updatedLocalLogs));
        }

        setFeedbackEventId('');
        setActualDuration('');
        setActualManpower('');
        setActualBarricades('');
        setFeedbackStation('');
        setFeedbackNotes('');
        await fetchFeedbackLogs(); // Refresh logs
      } else {
        setFeedbackMsg("Submission error. Please check parameters.");
      }
    } catch (err) {
      setFeedbackMsg("Error submitting feedback to server.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
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
      {/* Submit Feedback Form */}
      <div className="panel">
        <h2 className="panel-title" style={{ marginBottom: '1.25rem' }}>Log Post-Event Resolution Details</h2>
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

          <div className="grid-3" style={{ gridTemplateColumns: '1fr 1fr 1fr', marginBottom: '0' }}>
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

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <RefreshCw className="animate-spin" size={16} style={{ animation: 'spin 1.5s linear infinite' }} />
                Saving Details...
              </>
            ) : (
              <>
                <PlusCircle size={16} /> Log Resolution Details
              </>
            )}
          </button>
        </form>
      </div>

      {/* Logs List & Analysis */}
      <div className="forecast-results">
        <div className="panel">
          <h2 className="panel-title" style={{ marginBottom: '1rem' }}>Forecast vs. Actual Performance (Post-Event Learning Loop)</h2>
          {isLoadingLogs ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '240px', gap: '10px' }}>
              <RefreshCw className="animate-spin" size={32} color="var(--primary)" style={{ animation: 'spin 1.5s linear infinite' }} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Loading performance history...</p>
            </div>
          ) : logs.length > 0 ? (
            <>
              <div style={{ height: '240px', marginBottom: '1.5rem', position: 'relative' }}>
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
                    {logs.map((log, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{log.event_id}</td>
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No logs submitted yet. Submit actual results to train the feedback loop.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
