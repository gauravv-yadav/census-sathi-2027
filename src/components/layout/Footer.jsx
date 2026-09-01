import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Lock } from 'lucide-react';
import { t } from '../utils/i18n';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(12px)',
      borderTop: '1px solid var(--border-color)',
      padding: '3rem 0 2rem',
      marginTop: '4rem'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          
          <div>
            <div className="flex items-center gap-2 mb-2" style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--primary-dark)' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '6px',
                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px'
              }}>C27</div>
              {t('brand')}
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Next-generation AI-powered public self-enumeration and digital analytics platform.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '1rem' }}>Quick Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <Link to="/citizen" style={{ color: 'var(--text-muted)' }}>Citizen Portal</Link>
              <Link to="/citizen/enumerate" style={{ color: 'var(--text-muted)' }}>Self-Enumeration (15 Qs)</Link>
              <Link to="/citizen/verify" style={{ color: 'var(--text-muted)' }}>Misinformation Shield</Link>
              <Link to="/enumerator" style={{ color: 'var(--text-muted)' }}>Field Agent Dashboard</Link>
              <Link to="/admin" style={{ color: 'var(--text-muted)' }}>Admin Command Center</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '1rem' }}>Security & Compliance</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <div className="flex items-center gap-2"><Lock size={14} color="var(--accent-color)" /> 256-bit Anonymized Storage</div>
              <div className="flex items-center gap-2"><ShieldCheck size={14} color="var(--primary-color)" /> Verified RAG Architecture</div>
              <div>Privacy Policy & Data Charter</div>
              <div>24/7 Support Desk</div>
            </div>
          </div>

        </div>

        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div>© 2027 Census Sathi Platform. Built for excellence.</div>
          <div className="flex items-center gap-1">
            Designed with <Heart size={14} color="#ec4899" fill="#ec4899" /> for Public Service
          </div>
        </div>
      </div>
    </footer>
  );
}
