import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Lock, Sparkles, Globe, PhoneCall } from 'lucide-react';
import { t } from '../../utils/i18n';

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(238, 242, 255, 0.95) 50%, rgba(252, 231, 243, 0.95) 100%)',
      backdropFilter: 'blur(20px)',
      borderTop: '2px solid rgba(99, 102, 241, 0.2)',
      padding: '3.5rem 0 2rem',
      marginTop: '4rem',
      boxShadow: '0 -10px 40px rgba(99, 102, 241, 0.08)'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          
          <div>
            <div className="flex items-center gap-2 mb-3" style={{ fontWeight: '800', fontSize: '1.3rem' }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px',
                fontWeight: '800', boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)'
              }}>C27</div>
              <span style={{
                background: 'linear-gradient(135deg, #1e1b4b, #4338ca, #be185d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {t('brand')}
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Next-generation GenAI digital census platform combining real-time voice, RAG misinformation shields, and field intelligence.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.25rem', color: '#1e1b4b' }}>Platform Portals</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <Link to="/citizen" style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Citizen Portal</Link>
              <Link to="/citizen/enumerate" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Self-Enumeration (15 Qs) 🚀</Link>
              <Link to="/citizen/verify" style={{ color: 'var(--accent-color)', fontWeight: '600' }}>Misinformation Shield 🛡️</Link>
              <Link to="/enumerator" style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Field Agent Dashboard</Link>
              <Link to="/admin" style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Admin Command Center</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.25rem', color: '#1e1b4b' }}>Security & AI Architecture</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <div className="flex items-center gap-2" style={{ color: '#047857', fontWeight: '600' }}><Lock size={15} /> 256-Bit Anonymized PII Vault</div>
              <div className="flex items-center gap-2" style={{ color: 'var(--primary-dark)', fontWeight: '600' }}><ShieldCheck size={15} /> Grounded RAG Knowledge Base</div>
              <div className="flex items-center gap-2" style={{ color: '#b45309', fontWeight: '600' }}><Globe size={15} /> 6 Indian Languages Support</div>
              <div className="flex items-center gap-2" style={{ color: '#be185d', fontWeight: '600' }}><PhoneCall size={15} /> 24/7 Toll-Free Support Desk</div>
            </div>
          </div>

        </div>

        <div style={{
          borderTop: '1px solid rgba(99, 102, 241, 0.15)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ fontWeight: '500' }}>© 2027 Census Sathi Platform. Built for Excellence.</div>
          <div className="flex items-center gap-1" style={{ fontWeight: '600', color: '#4338ca' }}>
            <Sparkles size={16} color="#ec4899" /> Engineered with <Heart size={14} color="#ec4899" fill="#ec4899" /> for Public Innovation
          </div>
        </div>
      </div>
    </footer>
  );
}
