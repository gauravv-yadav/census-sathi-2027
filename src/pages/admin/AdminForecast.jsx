import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { TrendingUp, Download, Filter, Map, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AdminForecast() {
  const [selectedZone, setSelectedZone] = useState('All');

  const zoneData = [
    { zone: "North Zone", target: "65,000,000", completed: "51,000,000", rate: "78.4%", estFinish: "Oct 12, 2027", status: "On Track" },
    { zone: "South Zone", target: "70,000,000", completed: "59,500,000", rate: "85.0%", estFinish: "Sept 28, 2027", status: "Ahead of Target" },
    { zone: "East Zone", target: "55,000,000", completed: "38,500,000", rate: "70.0%", estFinish: "Nov 04, 2027", status: "Attention Needed" },
    { zone: "West Zone", target: "60,000,000", completed: "47,400,000", rate: "79.0%", estFinish: "Oct 18, 2027", status: "On Track" }
  ];

  return (
    <div>
      <Navbar />
      <main className="page-content container">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <div>
            <h1>Zone Completion Forecast & Target Modeling</h1>
            <p>AI predictive modeling for estimated national census completion dates</p>
          </div>
          <button className="btn-secondary" onClick={() => alert("Exporting Zone Report CSV...")}>
            <Download size={18} /> Export Regional CSV Report
          </button>
        </div>

        {/* Forecast Table */}
        <div className="card" style={{ backgroundColor: 'white', padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={20} color="var(--primary-color)" /> Regional Progress Matrix
            </h3>
            <span className="badge verified">AI Confidence: 96.4%</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem 1.5rem' }}>Zone / Sector</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Target Households</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Completed Count</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Completion Rate</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Est. Finish Date</th>
                  <th style={{ padding: '1rem 1.5rem' }}>AI Forecast</th>
                </tr>
              </thead>
              <tbody>
                {zoneData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: '700' }}>{row.zone}</td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>{row.target}</td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>{row.completed}</td>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>{row.rate}</td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>{row.estFinish}</td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <span className={`badge ${
                        row.status === 'Ahead of Target' ? 'verified' : 
                        row.status === 'Attention Needed' ? 'false' : 'misleading'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
