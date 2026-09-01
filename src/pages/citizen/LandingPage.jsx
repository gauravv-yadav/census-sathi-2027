import { Link } from 'react-router-dom';
import { ShieldCheck, MessageSquare, ClipboardList, Calendar, Download, Phone, FileText, HelpCircle } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import { t } from '../../utils/i18n';

export default function LandingPage() {
  const handleDownload = (fileName) => {
    alert(`Downloading ${fileName}... (Demo PDF file trigger)`);
  };

  return (
    <div>
      <Navbar />
      
      <main className="page-content container">
        <section className="text-center" style={{ padding: '3rem 0 3rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{t('heroTitle')}</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
            {t('heroSubtitle')}
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/citizen/enumerate" className="btn-primary">
              <ClipboardList size={20} /> {t('btnStart')}
            </Link>
            <Link to="/citizen/verify" className="btn-secondary">
              <ShieldCheck size={20} /> Verify Claim
            </Link>
          </div>
        </section>

        <section style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          <Link to="/citizen/ask" className="card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
              <MessageSquare size={40} />
            </div>
            <h2>{t('cardAskTitle')}</h2>
            <p>{t('cardAskDesc')}</p>
          </Link>

          <Link to="/citizen/verify" className="card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>
              <ShieldCheck size={40} />
            </div>
            <h2>{t('cardVerifyTitle')}</h2>
            <p>{t('cardVerifyDesc')}</p>
          </Link>

          <div className="card">
            <div style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>
              <Calendar size={40} />
            </div>
            <h2>{t('cardScheduleTitle')}</h2>
            <p>{t('cardScheduleDesc')}</p>
          </div>
        </section>

        <section style={{ marginTop: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>How Self-Enumeration Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            <StepCard step="1" title="Access Portal" desc="Open the portal from your mobile or PC. Select your preferred language." />
            <StepCard step="2" title="Answer 15 Questions" desc="Answer simple questions about housing and basic household amenities." />
            <StepCard step="3" title="Use Voice Assistant" desc="Use the mic option if you prefer speaking your answers out loud." />
            <StepCard step="4" title="Get Reference ID" desc="Save your acknowledgment reference ID for official confirmation." />
          </div>
        </section>

        <section style={{ marginTop: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Official Resources & PDF Downloads</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            
            <div className="card flex items-center justify-between" style={{ padding: '1.25rem' }}>
              <div className="flex items-center gap-3">
                <FileText size={32} color="var(--primary-color)" />
                <div>
                  <h4 style={{ margin: 0 }}>Citizen Guidebook 2027</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PDF • 2.4 MB • English / Hindi</span>
                </div>
              </div>
              <button onClick={() => handleDownload("Citizen_Guidebook_2027.pdf")} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                <Download size={16} /> PDF
              </button>
            </div>

            <div className="card flex items-center justify-between" style={{ padding: '1.25rem' }}>
              <div className="flex items-center gap-3">
                <FileText size={32} color="var(--accent-color)" />
                <div>
                  <h4 style={{ margin: 0 }}>Awareness Poster</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PDF / Printable • 1.1 MB</span>
                </div>
              </div>
              <button onClick={() => handleDownload("Awareness_Poster.pdf")} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                <Download size={16} /> PDF
              </button>
            </div>

            <div className="card flex items-center justify-between" style={{ padding: '1.25rem' }}>
              <div className="flex items-center gap-3">
                <HelpCircle size={32} color="var(--secondary-color)" />
                <div>
                  <h4 style={{ margin: 0 }}>FAQs & Safety Handbook</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PDF • 1.8 MB</span>
                </div>
              </div>
              <button onClick={() => handleDownload("Safety_Handbook.pdf")} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                <Download size={16} /> PDF
              </button>
            </div>

          </div>
        </section>

        <section style={{ marginTop: '4rem', marginBottom: '3rem' }}>
          <div className="card" style={{ backgroundColor: 'var(--bg-ai)', border: '1px solid var(--primary-light)', padding: '2rem' }}>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 style={{ margin: 0, color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={24} /> Need Help or Technical Support?
                </h3>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.95rem' }}>
                  Our support desk is available 24/7. Call our toll-free assistance number or connect via WhatsApp.
                </p>
              </div>
              <div className="flex gap-3">
                <a href="tel:1800112027" className="btn-primary" style={{ textDecoration: 'none' }}>
                  Toll-Free: 1800-11-2027
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

function StepCard({ step, title, desc }) {
  return (
    <div className="card text-center" style={{ padding: '1.5rem' }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-color)',
        color: 'white', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1rem'
      }}>
        {step}
      </div>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ fontSize: '0.875rem', margin: 0, color: 'var(--text-muted)' }}>{desc}</p>
    </div>
  );
}
