import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { mockEnumeratorTasks } from '../../data/mockData';
import { MapPin, Phone, AlertCircle, CheckCircle2, Lock, Unlock, Home, Filter } from 'lucide-react';

export default function EnumeratorDashboard() {
  const [selectedArea, setSelectedArea] = useState('Sector 4, Block B');
  const [tasks] = useState(mockEnumeratorTasks);
  const [unlockedTasks, setUnlockedTasks] = useState(new Set());
  const [filter, setFilter] = useState('All');

  const toggleLock = (taskId) => {
    const newUnlocked = new Set(unlockedTasks);
    if (newUnlocked.has(taskId)) {
      newUnlocked.delete(taskId);
    } else {
      newUnlocked.add(taskId);
    }
    setUnlockedTasks(newUnlocked);
  };

  const areaOptions = [
    "Sector 4, Block B",
    "Sector 2, Block A",
    "Sector 9, Block C",
    "District 12, Ward 4"
  ];

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  const pendingCount = tasks.filter(t => t.status === 'Pending').length;
  const incompleteCount = tasks.filter(t => t.status === 'Incomplete').length;
  const completedCount = tasks.filter(t => t.status === 'Completed').length;

  return (
    <div>
      <Navbar />
      <main className="page-content container">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <div>
            <h1>Field Agent Dashboard</h1>
            <p>Welcome, Agent 007. Manage house visits and census data collection securely.</p>
          </div>
          <button className="btn-secondary" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#991b1b', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <AlertCircle size={18} /> Escalate to Supervisor
          </button>
        </div>

        {/* Area Selector Dropdown */}
        <div className="card mb-4" style={{ backgroundColor: 'white', padding: '1.25rem 1.5rem' }}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div style={{
                width: '42px', height: '42px', borderRadius: '10px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <MapPin size={22} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
                  Select Field Assigned Area / Ward
                </label>
                <select 
                  className="input-field" 
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  style={{ padding: '0.4rem 0.8rem', fontWeight: '700', fontSize: '1rem', width: 'auto', marginTop: '4px' }}
                >
                  {areaOptions.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Status Filter Pills */}
            <div className="flex gap-2">
              {[
                { label: 'All', count: tasks.length },
                { label: 'Pending', count: pendingCount },
                { label: 'Incomplete', count: incompleteCount },
                { label: 'Completed', count: completedCount }
              ].map(item => (
                <button
                  key={item.label}
                  onClick={() => setFilter(item.label)}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    backgroundColor: filter === item.label ? 'var(--primary-color)' : 'var(--bg-main)',
                    color: filter === item.label ? 'white' : 'var(--text-main)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer'
                  }}
                >
                  {item.label} ({item.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          
          <section>
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div className="flex justify-between items-center" style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)' }}>
                <h2 style={{ margin: 0, fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Home size={18} color="var(--primary-color)" /> Assigned Houses in {selectedArea} ({filteredTasks.length})
                </h2>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PII Data Vault Protected</span>
              </div>
              
              <div>
                {filteredTasks.map(task => {
                  const isUnlocked = unlockedTasks.has(task.id);
                  // Generate clean House Number (e.g. H.No 12-A)
                  const houseNo = `H.No ${10 + task.id * 2}-${String.fromCharCode(64 + task.id)}`;

                  return (
                    <div key={task.id} style={{ 
                      padding: '1.25rem 1.5rem', 
                      borderBottom: '1px solid var(--border-color)',
                      transition: 'background-color 0.3s',
                      backgroundColor: isUnlocked ? 'rgba(255,255,255,0.95)' : 'transparent'
                    }}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div style={{
                            width: '40px', height: '40px', borderRadius: '10px', 
                            backgroundColor: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--primary-color)'
                          }}>
                            <Home size={20} />
                          </div>
                          <div>
                            <h3 style={{ margin: '0', fontSize: '1.1rem', color: 'var(--primary-dark)' }}>
                              {houseNo}
                            </h3>
                            <span className={`badge ${
                              task.status === 'Completed' ? 'verified' : 
                              task.status === 'Incomplete' ? 'misleading' : ''
                            }`} style={{ marginTop: '0.3rem', padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>
                              {task.status === 'Completed' && <CheckCircle2 size={12} />}
                              {task.status}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <button 
                            className="btn-secondary" 
                            style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
                            onClick={() => toggleLock(task.id)}
                          >
                            {isUnlocked ? <><Unlock size={14} /> Hide Details</> : <><Lock size={14} /> Unlock Details</>}
                          </button>
                        </div>
                      </div>

                      <div style={{
                        maxHeight: isUnlocked ? '200px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.3s ease-in-out',
                        opacity: isUnlocked ? 1 : 0
                      }}>
                        <div style={{ 
                          marginTop: '1.25rem', padding: '1rem', backgroundColor: 'var(--bg-main)', 
                          borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' 
                        }}>
                          <div className="flex justify-between flex-wrap gap-2">
                            <div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>House Location & Resident</div>
                              <div style={{ fontWeight: '600' }}>{houseNo}, {task.household}</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Contact Number</div>
                              <div className="flex items-center gap-2" style={{ fontWeight: '600' }}>
                                <Phone size={14} /> {task.contact}
                              </div>
                            </div>
                          </div>
                          {task.issue && (
                            <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#b91c1c', backgroundColor: '#fee2e2', padding: '0.4rem 0.8rem', borderRadius: '4px' }}>
                              <strong>Reported Field Issue:</strong> {task.issue}
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section>
            <div className="card" style={{ backgroundColor: 'white', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Field Assistant AI</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                Select an area above or log household visit outcomes securely. All PII data remains protected.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
