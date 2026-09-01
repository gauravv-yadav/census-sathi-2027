import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MessageSquare, ClipboardList, Calendar, Download, Phone, FileText, HelpCircle, Award, LogIn, UserPlus, ArrowRight } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { t } from '../../utils/i18n';

export default function LandingPage() {
  const [authMode, setAuthMode] = useState('signin');
  const [identifier, setIdentifier] = useState('');
  const [fullName, setFullName] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    if (authMode === 'signup' && !fullName.trim()) return;
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      alert(authMode === 'signin' ? "Signed In!" : "Signed Up!");
    }, 600);
  };

  const handleDownload = (fileName) => {
    alert(`Downloading ${fileName}... (Demo PDF file trigger)`);
  };

  return (
    <div>
      <Navbar />
      
      <main className="page-content container">
        
        {/* Compact Hero Section + Small Auth Box */}
        <section style={{ padding: '1rem 0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
          
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              backgroundColor: 'rgba(99, 102, 241, 0.12)', color: 'var(--primary-dark)',
              padding: '0.3rem 0.85rem', borderRadius: 'var(--radius-full)',
              fontWeight: '700', fontSize: '0.78rem', marginBottom: '0.75rem',
              border: '1px solid rgba(99, 102, 241, 0.25)'
            }}>
              <Award size={14} color="var(--primary-color)" /> Next-Gen AI Public Infrastructure 2027
            </div>

            <h1 style={{ fontSize: '2.6rem', marginBottom: '0.75rem', lineHeight: '1.15' }}>{t('heroTitle')}</h1>
            <p style={{ fontSize: '1rem', margin: '0 0 1.25rem 0', color: 'var(--text-muted)' }}>
              {t('heroSubtitle')}
            </p>

            <div className="flex gap-2.5 flex-wrap">
              <Link to="/citizen/enumerate" className="btn-primary" style={{ fontSize: '0.88rem', padding: '0.65rem 1.25rem' }}>
                <ClipboardList size={16} /> {t('btnStart')}
              </Link>
              <Link to="/citizen/verify" className="btn-secondary" style={{ fontSize: '0.88rem', padding: '0.65rem 1.25rem' }}>
                <ShieldCheck size={16} /> Verify Claim
              </Link>
            </div>
          </div>

          {/* Extra Small Compact Auth Card */}
          <div className="card" style={{ backgroundColor: 'white', padding: '1rem', maxWidth: '300px', margin: '0 auto', width: '100%', border: '1.5px solid rgba(99, 102, 241, 0.25)', boxShadow: 'var(--shadow-sm)' }}>
            
            <div className="flex gap-1 mb-2.5" style={{ backgroundColor: 'var(--bg-main)', padding: '0.15rem', borderRadius: 'var(--radius-md)' }}>
              <button
                type="button"
                onClick={() => { setAuthMode('signin'); setStep(1); }}
                style={{
                  flex: 1, padding: '0.3rem', borderRadius: 'var(--radius-md)', fontSize: '0.78rem', fontWeight: '700',
                  backgroundColor: authMode === 'signin' ? 'white' : 'transparent',
                  color: authMode === 'signin' ? 'var(--primary-color)' : 'var(--text-muted)'
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setStep(1); }}
                style={{
                  flex: 1, padding: '0.3rem', borderRadius: 'var(--radius-md)', fontSize: '0.78rem', fontWeight: '700',
                  backgroundColor: authMode === 'signup' ? 'white' : 'transparent',
                  color: authMode === 'signup' ? 'var(--primary-color)' : 'var(--text-muted)'
                }}
              >
                Sign Up
              </button>
            </div>

            {step === 1 ? (
              <form onSubmit={handleSendOtp}>
                {authMode === 'signup' && (
                  <div style={{ marginBottom: '0.5rem' }}>
                    <input 
                      type="text"
                      className="input-field" 
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
                    />
                  </div>
                )}

                <div style={{ marginBottom: '0.65rem' }}>
                  <input 
                    type="text"
                    className="input-field" 
                    placeholder="Mobile No. / Email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.5rem', fontSize: '0.82rem' }}>
                  {authMode === 'signin' ? 'Sign In OTP' : 'Sign Up OTP'} <ArrowRight size={13} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <div style={{ marginBottom: '0.65rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    OTP sent to <strong>{identifier}</strong>
                  </span>
                  <div className="flex justify-center gap-1.5 mt-1.5">
                    {[0, 1, 2, 3].map((idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength="1"
                        className="input-field"
                        style={{ width: '32px', height: '36px', textAlign: 'center', fontSize: '0.9rem', fontWeight: '700', padding: 0 }}
                        value={otp[idx]}
                        onChange={(e) => {
                          const newOtp = [...otp];
                          newOtp[idx] = e.target.value;
                          setOtp(newOtp);
                          if (e.target.value && e.target.nextSibling) e.target.nextSibling.focus();
                        }}
                      />
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.5rem', fontSize: '0.82rem' }} disabled={isVerifying}>
                  {isVerifying ? 'Verifying...' : 'Verify OTP'}
                </button>
              </form>
            )}

          </div>

        </section>

        {/* Feature Cards Grid */}
        <section style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.25rem' 
        }}>
          <Link to="/citizen/ask" className="card" style={{ display: 'block', textDecoration: 'none', color: 'inherit', padding: '1.25rem' }}>
            <div style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
              <MessageSquare size={32} />
            </div>
            <h2 style={{ fontSize: '1.3rem' }}>{t('cardAskTitle')}</h2>
            <p style={{ fontSize: '0.9rem' }}>{t('cardAskDesc')}</p>
          </Link>

          <Link to="/citizen/verify" className="card" style={{ display: 'block', textDecoration: 'none', color: 'inherit', padding: '1.25rem' }}>
            <div style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}>
              <ShieldCheck size={32} />
            </div>
            <h2 style={{ fontSize: '1.3rem' }}>{t('cardVerifyTitle')}</h2>
            <p style={{ fontSize: '0.9rem' }}>{t('cardVerifyDesc')}</p>
          </Link>

          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ color: 'var(--secondary-color)', marginBottom: '0.5rem' }}>
              <Calendar size={32} />
            </div>
            <h2 style={{ fontSize: '1.3rem' }}>{t('cardScheduleTitle')}</h2>
            <p style={{ fontSize: '0.9rem' }}>{t('cardScheduleDesc')}</p>
          </div>
        </section>

        {/* Impact Highlights Bar */}
        <section style={{ marginTop: '2.5rem' }}>
          <div className="card" style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(236, 72, 153, 0.08) 100%)',
            border: '1.5px solid rgba(99, 102, 241, 0.2)',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary-color)' }}>100%</div>
                <div style={{ fontWeight: '600', fontSize: '0.82rem' }}>Confidential & Encrypted</div>
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--secondary-color)' }}>6+</div>
                <div style={{ fontWeight: '600', fontSize: '0.82rem' }}>Regional Languages</div>
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-color)' }}>Real-Time</div>
                <div style={{ fontWeight: '600', fontSize: '0.82rem' }}>RAG Misinformation Shield</div>
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#8b5cf6' }}>Voice AI</div>
                <div style={{ fontWeight: '600', fontSize: '0.82rem' }}>Hands-Free Enumeration</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section style={{ marginTop: '2.5rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.75rem' }}>How Self-Enumeration Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <StepCard step="1" title="Access Portal" desc="Open the portal from your mobile or PC. Select your preferred language." />
            <StepCard step="2" title="Answer 15 Questions" desc="Answer simple questions about housing and basic household amenities." />
            <StepCard step="3" title="Use Voice Assistant" desc="Use the mic option if you prefer speaking your answers out loud." />
            <StepCard step="4" title="Get Reference ID" desc="Save your acknowledgment reference ID for official confirmation." />
          </div>
        </section>

        {/* Downloadable Resources & Posters (PDF) */}
        <section style={{ marginTop: '2.5rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.25rem', fontSize: '1.75rem' }}>Official Resources & PDF Downloads</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            
            <div className="card flex items-center justify-between" style={{ padding: '0.85rem 1rem' }}>
              <div className="flex items-center gap-2.5">
                <FileText size={24} color="var(--primary-color)" />
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Citizen Guidebook 2027</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PDF • 2.4 MB</span>
                </div>
              </div>
              <button onClick={() => handleDownload("Citizen_Guidebook_2027.pdf")} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}>
                <Download size={13} /> PDF
              </button>
            </div>

            <div className="card flex items-center justify-between" style={{ padding: '0.85rem 1rem' }}>
              <div className="flex items-center gap-2.5">
                <FileText size={24} color="var(--accent-color)" />
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Awareness Poster</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Printable • 1.1 MB</span>
                </div>
              </div>
              <button onClick={() => handleDownload("Awareness_Poster.pdf")} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}>
                <Download size={13} /> PDF
              </button>
            </div>

            <div className="card flex items-center justify-between" style={{ padding: '0.85rem 1rem' }}>
              <div className="flex items-center gap-2.5">
                <HelpCircle size={24} color="var(--secondary-color)" />
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.9rem' }}>FAQs & Safety Handbook</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PDF • 1.8 MB</span>
                </div>
              </div>
              <button onClick={() => handleDownload("Safety_Handbook.pdf")} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}>
                <Download size={13} /> PDF
              </button>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

function StepCard({ step, title, desc }) {
  return (
    <div className="card text-center" style={{ padding: '1rem' }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary-color)',
        color: 'white', fontWeight: '700', display: 'flex', items: 'center', justifyContent: 'center',
        margin: '0 auto 0.5rem', fontSize: '0.85rem'
      }}>
        {step}
      </div>
      <h3 style={{ fontSize: '0.95rem', marginBottom: '0.3rem' }}>{title}</h3>
      <p style={{ fontSize: '0.78rem', margin: 0, color: 'var(--text-muted)' }}>{desc}</p>
    </div>
  );
}
