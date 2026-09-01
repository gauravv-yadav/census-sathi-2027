import { useState, useEffect } from 'react';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Users, CheckCircle, Clock, AlertTriangle, Activity, MapPin, Building } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import GenAIAssistant from '../../components/ai/GenAIAssistant';
import { mockAdminStats } from '../../data/mockData';
import { askAdminAI } from '../../services/mockAiService';
import { t } from '../../utils/i18n';

const PIE_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899'];
const mockPieData = [
  { name: 'Self-Enumerated', value: 45000000 },
  { name: 'Agent Assisted', value: 140000000 }
];

export default function AdminDashboard() {
  const data = mockAdminStats;
  const [liveFeed, setLiveFeed] = useState([
    "System Initialized",
    "Data streams connected securely"
  ]);

  const stateCityAlerts = [
    { state: "Maharashtra", city: "Mumbai", colony: "Bandra West", issue: "Low self-enumeration rate", severity: "medium" },
    { state: "Karnataka", city: "Bengaluru", colony: "Jayanagar 4th Block", issue: "High misinformation reports", severity: "high" },
    { state: "West Bengal", city: "Kolkata", colony: "Salt Lake Sector V", issue: "Field agents require translation support", severity: "medium" },
    { state: "Delhi NCR", city: "New Delhi", colony: "Vasant Vihar Phase 2", issue: "High verification requests", severity: "low" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const events = [
        "Household #9983 completed self-enumeration.",
        "Agent 402 escalated a translation issue.",
        "New verification claim submitted.",
        "Batch data synchronization completed."
      ];
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      setLiveFeed(prev => [randomEvent, ...prev].slice(0, 5));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      <main className="page-content" style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto' }}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1>{t('adminTitle')}</h1>
            <p>{t('adminSubtitle')}</p>
          </div>
          <div>
            <span className="badge" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-dark)', padding: '0.5rem 1rem', fontSize: '1rem' }}>
              <Activity size={18} className="pulse" /> {t('liveStream')}
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <StatCard 
            title={t('totalHouseholds')} 
            value={data.totalHouseholds.toLocaleString()} 
            icon={<Users size={32} color="var(--primary-color)" />} 
          />
          <StatCard 
            title={t('completed')} 
            value={data.completedHouseholds.toLocaleString()} 
            subtitle={`${((data.completedHouseholds / data.totalHouseholds) * 100).toFixed(1)}%`}
            icon={<CheckCircle size={32} color="var(--accent-color)" />} 
          />
          <StatCard 
            title={t('pending')} 
            value={data.pendingHouseholds.toLocaleString()} 
            icon={<Clock size={32} color="#f59e0b" />} 
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
              <div className="card">
                <h3>{t('weeklyProgress')}</h3>
                <div style={{ height: '300px', marginTop: '1.5rem' }}>
                  <AreaChart width={600} height={280} data={data.completionTrend} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                    <XAxis dataKey="name" tick={{fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{backgroundColor: 'var(--bg-card)', borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)'}} />
                    <Area type="monotone" dataKey="completed" stroke="var(--primary-color)" strokeWidth={3} fillOpacity={1} fill="url(#colorComp)" />
                  </AreaChart>
                </div>
              </div>

              <div className="card">
                <h3>{t('completionMethod')}</h3>
                <div style={{ height: '300px', display: 'flex', justifyContent: 'center' }}>
                  <PieChart width={300} height={280}>
                    <Pie data={mockPieData} cx={150} cy={120} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {mockPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              
              {/* State & City Alerts */}
              <div className="card">
                <h3>Active City & State Alerts</h3>
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {stateCityAlerts.map((alert, idx) => (
                    <div key={idx} style={{ 
                      display: 'flex', alignItems: 'flex-start', gap: '0.75rem', 
                      padding: '0.85rem', backgroundColor: alert.severity === 'high' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(245, 158, 11, 0.05)',
                      border: `1px solid ${alert.severity === 'high' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`,
                      borderRadius: 'var(--radius-md)'
                    }}>
                      <AlertTriangle size={20} color={alert.severity === 'high' ? '#ef4444' : '#f59e0b'} style={{ marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-dark)' }}>
                          {alert.city}, {alert.state} ({alert.colony})
                        </div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{alert.issue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3>{t('liveStream')}</h3>
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {liveFeed.map((msg, idx) => (
                    <div key={idx} style={{ 
                      padding: '0.75rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', 
                      fontSize: '0.9rem', borderLeft: '3px solid var(--primary-light)',
                      animation: idx === 0 ? 'slideIn 0.3s ease' : 'none',
                      opacity: 1 - (idx * 0.2)
                    }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginRight: '8px' }}>Just now</span>
                      {msg}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ flex: '1', minHeight: '600px' }}>
              <GenAIAssistant 
                title="GenAI Command Analyst" 
                initialGreeting="Hello. I am analyzing the live data streams. Try asking: 'Which areas need attention today?'"
                onAsk={askAdminAI}
              />
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="card flex items-center justify-between" style={{ padding: '1.5rem' }}>
      <div>
        <h4 style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>{title}</h4>
        <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: 1 }}>{value}</div>
        {subtitle && <div style={{ color: 'var(--accent-color)', fontWeight: '600', fontSize: '0.95rem', marginTop: '0.5rem' }}>{subtitle}</div>}
      </div>
      <div style={{ backgroundColor: 'var(--bg-ai)', padding: '1rem', borderRadius: '50%', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
        {icon}
      </div>
    </div>
  );
}
