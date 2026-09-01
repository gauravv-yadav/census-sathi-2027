import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MessageSquare, ClipboardList, Calendar, Download, Phone, FileText, HelpCircle, Award, LogIn, Mail, ArrowRight } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { t } from '../../utils/i18n';

export default function LandingPage() {
  const [method, setMethod] = useState('mobile');
  const [identifier, setIdentifier] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      alert("Successfully Authenticated!");
    }, 1000);
  };

  const handleDownload = (fileName) => {
    alert(`Downloading ${fileName}... (Demo PDF file trigger)`);
  };

  return (
    <div>
      <Navbar />
      
      <main className="page-content container">
        
        {/* Hero Section + Quick OTP Login Card on Screen */}
        <section style={{ padding: '2rem 0 3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: 'rgba(99, 102, 241, 0.12)', color: 'var(--primary-dark)',
              padding: '0.4rem 1.2rem', borderRadius: 'var(--radius-full)',
              fontWeight: '700', fontSize: '0.85rem', marginBottom: '1.25rem',
              border: '1px solid rgba(99, 102, 241, 0.25)'
            }}>
              <Award size={16} color="var(--primary-color)" /> Next-Gen AI Public Infrastructure 2027
            </div>

            <h1 style={{ fontSize: '3.25rem', marginBottom: '1.25rem', lineHeight: '1.15' }}>{t('heroTitle')}</h1>
            <p style={{ fontSize: '1.15rem', margin: '0 0 2rem 0', color: 'var(--text-muted)' }}>
              {t('heroSubtitle')}
            </p>

            <div className="flex gap-3 flex-wrap">
              <Link to="/citizen/enumerate" className="btn-primary" style={{ fontSize: '1rem', padding: '0.85rem 1.75rem' }}>
                <ClipboardList size={20} /> {t('btnStart')}
              </Link>
              <Link to="/citizen/verify" className="btn-secondary" style={{ fontSize: '1rem', padding: '0.85rem 1.75rem' }}>
                <ShieldCheck size={20} /> Verify Claim
              </Link>
            </div>
          </div>

          {/* Quick OTP Authentication Card Right on Main Screen */}
          <div className="card" style={{ backgroundColor: 'white', padding: '1.75rem', border: '1.5px solid rgba(99, 102, 241, 0.25)', boxShadow: 'var(--shadow-lg)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <LogIn size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Quick OTP Login</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mobile or Email 2FA Access</span>
              </div>
            </div>

            {step === 1 ? (
              <form onSubmit={handleSendOtp}>
                <div className="flex gap-2 mb-3" style={{ backgroundColor: 'var(--bg-main)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
                  <button
                    type="button"
                    onClick={() => { setMethod('mobile'); setIdentifier(''); }}
                    style={{
                      flex: 1, padding: '0.4rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', fontWeight: '600',
                      backgroundColor: method === 'mobile' ? 'white' : 'transparent',
                      color: method === 'mobile' ? 'var(--primary-color)' : 'var(--text-muted)'
                    }}
                  >
                    Mobile OTP
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMethod('email'); setIdentifier(''); }}
                    style={{
                      flex: 1, padding: '0.4rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', fontWeight: '600',
                      backgroundColor: method === 'email' ? 'white' : 'transparent',
                      color: method === 'email' ? 'var(--primary-color)' : 'var(--text-muted)'
                    }}
                  >
                    Email OTP
                  </button>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <input 
                    type={method === 'mobile' ? 'tel' : 'email'}
                    className="input-field" 
                    placeholder={method === 'mobile' ? 'Enter 10-Digit Mobile Number' : 'Enter Email ID'}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    style={{ padding: '0.75rem 1rem', fontSize: '0.95rem' }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}>
                  Send OTP Code <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Enter 4-digit code sent to <strong>{identifier}</strong>
                  </span>
                  <div className="flex justify-center gap-2 mt-3">
                    {[0, 1, 2, 3].map((idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength="1"
                        className="input-field"
                        style={{ width: '42px', height: '48px', textAlign: 'center', fontSize: '1.1rem', fontWeight: '700' }}
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

                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }} disabled={isVerifying}>
                  {isVerifying ? 'Verifying...' : 'Verify & Continue'}
                </button>
              </form>
            )}

          </div>

        </section>

        {/* Feature Cards Grid */}
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

        {/* Impact Highlights Bar */}
        <section style={{ marginTop: '4rem' }}>
          <div className="card" style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(236, 72, 153, 0.08) 100%)',
            border: '1.5px solid rgba(99, 102, 241, 0.2)',
            padding: '2rem'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-color)' }}>100%</div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>Confidential & Encrypted</div>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary-color)' }}>6+</div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>Regional Languages</div>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-color)' }}>Real-Time</div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>RAG Misinformation Shield</div>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#8b5cf6' }}>Voice AI</div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>Hands-Free Enumeration</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section style={{ marginTop: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>How Self-Enumeration Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            <StepCard step="1" title="Access Portal" desc="Open the portal from your mobile or PC. Select your preferred language." />
            <StepCard step="2" title="Answer 15 Questions" desc="Answer simple questions about housing and basic household amenities." />
            <StepCard step="3" title="Use Voice Assistant" desc="Use the mic option if you prefer speaking your answers out loud." />
            <StepCard step="4" title="Get Reference ID" desc="Save your acknowledgment reference ID for official confirmation." />
          </div>
        </section>

        {/* Downloadable Resources & Posters (PDF) */}
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

      </main>
      <Footer />
    </div>
  );
}

function StepCard({ step, title, desc }) {
  return (
    <div className="card text-center" style={{ padding: '1.5rem' }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-color)',
        color: 'white', fontWeight: '700', display: 'flex', items: 'center', justifyContent: 'center',
        margin: '0 auto 1rem'
      }}>
        {step}
      </div>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ fontSize: '0.875rem', margin: 0, color: 'var(--text-muted)' }}>{desc}</p>
    </div>
  );
}
