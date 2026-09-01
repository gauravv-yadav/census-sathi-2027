import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, X } from 'lucide-react';
import LanguageSelector from '../ui/LanguageSelector';
import styles from './Navbar.module.css';
import { t } from '../../utils/i18n';

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: "Portal Update", text: "Self-enumeration portal extended till Nov 15th.", time: "10m ago" },
    { id: 2, title: "Security Alert", text: "Never share your OTP with unknown callers.", time: "1h ago" },
    { id: 3, title: "Guideline Added", text: "New downloadable PDF user guide is available.", time: "1d ago" }
  ];

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link to="/" className={styles.brand}>
          <div className={styles.logoBadge}>C27</div>
          <span className={styles.brandText}>{t('brand')}</span>
        </Link>
        
        <div className={styles.navLinks}>
          <Link to="/citizen" className={styles.link}>{t('navCitizen')}</Link>
          <Link to="/citizen/enumerate" className={styles.link}>Self-Enumeration</Link>
          <Link to="/citizen/checklist" className={styles.link}>Checklist Scanner</Link>
          <Link to="/citizen/verify" className={styles.link}>Verify Claims</Link>
          <Link to="/enumerator" className={styles.link}>{t('navField')}</Link>
          <Link to="/enumerator/planner" className={styles.link}>Route Planner</Link>
          <Link to="/admin" className={styles.link}>{t('navAdmin')}</Link>
          <Link to="/admin/forecast" className={styles.link}>Forecast</Link>
        </div>

        <div className={styles.actions}>
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                position: 'relative', padding: '0.5rem', borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.8)', border: '1px solid var(--border-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
              title="Notifications"
            >
              <Bell size={20} color="var(--text-main)" />
              <span style={{
                position: 'absolute', top: '-2px', right: '-2px', width: '10px', height: '10px',
                backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid white'
              }} />
            </button>

            {showNotifications && (
              <div style={{
                position: 'absolute', right: 0, top: '45px', width: '300px',
                backgroundColor: 'white', borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)',
                zIndex: 100, overflow: 'hidden'
              }}>
                <div className="flex justify-between items-center" style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)' }}>
                  <strong style={{ fontSize: '0.9rem' }}>Notifications</strong>
                  <button onClick={() => setShowNotifications(false)}><X size={16} /></button>
                </div>
                <div>
                  {notifications.map(n => (
                    <div key={n.id} style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                      <div style={{ fontWeight: '600', color: 'var(--primary-color)' }}>{n.title}</div>
                      <div style={{ color: 'var(--text-muted)' }}>{n.text}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
}
