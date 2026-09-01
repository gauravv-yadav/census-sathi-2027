import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Navigation, MapPin, Calendar, CheckCircle2, Clock, Play, Download, BarChart2 } from 'lucide-react';

export default function FieldRoutePlanner() {
  const [activeTab, setActiveTab] = useState('route');
  const [visitedCount, setVisitedCount] = useState(12);

  const routeList = [
    { seq: 1, house: "Block B, House #12-A", status: "Completed", time: "09:30 AM", notes: "Self-enumeration reference verified." },
    { seq: 2, house: "Block B, House #14-C", status: "Incomplete", time: "10:15 AM", notes: "Requires translation support (Telugu)." },
    { seq: 3, house: "Block B, House #15-D", status: "Completed", time: "11:00 AM", notes: "Field agent assisted completion." },
    { seq: 4, house: "Block B, House #16-E", status: "Pending", time: "01:30 PM", notes: "Scheduled afternoon visit." },
    { seq: 5, house: "Block B, House #18-F", status: "Pending", time: "02:15 PM", notes: "Resident requested evening callback." }
  ];

  return (
    <div>
      <Navbar />
      <main className="page-content container">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <div>
            <h1>Field Agent Route Planner & Logger</h1>
            <p>Optimal visit sequence and daily field operation logging for <strong>Sector 4, Block B</strong></p>
          </div>
          <button className="btn-primary" onClick={() => setVisitedCount(c => c + 1)}>
            <CheckCircle2 size={18} /> Quick Log Completed Visit (+1)
          </button>
        </div>

        {/* Target Progress Bar */}
        <div className="card mb-4" style={{ backgroundColor: 'white' }}>
          <div className="flex justify-between items-center mb-2">
            <span style={{ fontWeight: '600' }}>Daily Route Target Progress</span>
            <span style={{ fontWeight: '700', color: 'var(--primary-color)' }}>{visitedCount} / 20 Households ({Math.round((visitedCount/20)*100)}%)</span>
          </div>
          <div style={{ width: '100%', height: '10px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ width: `${(visitedCount/20)*100}%`, height: '100%', backgroundColor: 'var(--primary-color)', borderRadius: '9999px', transition: 'width 0.3s' }} />
          </div>
        </div>

        {/* Route List */}
        <div className="card" style={{ backgroundColor: 'white', padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Navigation size={20} color="var(--primary-color)" /> Optimized Visit Sequence
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>GPS Distance Sorted</span>
          </div>

          <div>
            {routeList.map(item => (
              <div key={item.seq} style={{ 
                padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
              }}>
                <div className="flex items-center gap-3">
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    backgroundColor: 'var(--primary-color)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700'
                  }}>
                    {item.seq}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.05rem' }}>{item.house}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Scheduled Time: {item.time} • {item.notes}</span>
                  </div>
                </div>

                <div>
                  <span className={`badge ${
                    item.status === 'Completed' ? 'verified' : 
                    item.status === 'Incomplete' ? 'misleading' : ''
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
