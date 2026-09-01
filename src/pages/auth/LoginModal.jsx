import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Phone, Mail, Lock, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginModal() {
  const [method, setMethod] = useState('mobile'); // 'mobile' or 'email'
  const [identifier, setIdentifier] = useState('');
  const [step, setStep] = useState(1); // 1: Input, 2: OTP
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

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
      localStorage.setItem('user_authenticated', 'true');
      navigate('/citizen/enumerate');
    }, 1000);
  };

  return (
    <div>
      <Navbar />
      <main className="page-content container flex justify-center items-center" style={{ minHeight: '75vh' }}>
        <div className="card" style={{ maxWidth: '450px', width: '100%', padding: '2.5rem', backgroundColor: 'white' }}>
          
          <div className="text-center mb-4">
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              backgroundColor: 'rgba(99, 102, 241, 0.1)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem'
            }}>
              <ShieldCheck size={32} color="var(--primary-color)" />
            </div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>Portal Authentication</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Secure 2-Factor OTP Login for Self-Enumeration & Official Access
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSendOtp}>
              {/* Method Switcher */}
              <div className="flex gap-2 mb-4" style={{ backgroundColor: 'var(--bg-main)', padding: '0.3rem', borderRadius: 'var(--radius-md)' }}>
                <button
                  type="button"
                  onClick={() => { setMethod('mobile'); setIdentifier(''); }}
                  style={{
                    flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: '600',
                    backgroundColor: method === 'mobile' ? 'white' : 'transparent',
                    boxShadow: method === 'mobile' ? 'var(--shadow-sm)' : 'none',
                    color: method === 'mobile' ? 'var(--primary-color)' : 'var(--text-muted)'
                  }}
                >
                  <Phone size={14} style={{ display: 'inline', marginRight: '4px' }} /> Mobile OTP
                </button>
                <button
                  type="button"
                  onClick={() => { setMethod('email'); setIdentifier(''); }}
                  style={{
                    flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: '600',
                    backgroundColor: method === 'email' ? 'white' : 'transparent',
                    boxShadow: method === 'email' ? 'var(--shadow-sm)' : 'none',
                    color: method === 'email' ? 'var(--primary-color)' : 'var(--text-muted)'
                  }}
                >
                  <Mail size={14} style={{ display: 'inline', marginRight: '4px' }} /> Email OTP
                </button>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>
                  {method === 'mobile' ? 'Enter 10-Digit Mobile Number' : 'Enter Registered Email ID'}
                </label>
                <input 
                  type={method === 'mobile' ? 'tel' : 'email'}
                  className="input-field" 
                  placeholder={method === 'mobile' ? 'e.g. 9876543210' : 'name@example.com'}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                Get OTP Code <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Enter 4-digit OTP sent to <strong>{identifier}</strong>
                </span>

                <div className="flex justify-center gap-2 mt-4">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength="1"
                      className="input-field"
                      style={{ width: '50px', height: '55px', textAlign: 'center', fontSize: '1.25rem', fontWeight: '700' }}
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

              <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={isVerifying}>
                {isVerifying ? 'Verifying OTP...' : 'Verify OTP & Access Portal'}
              </button>

              <div className="text-center mt-4">
                <button type="button" onClick={() => setStep(1)} style={{ fontSize: '0.85rem', color: 'var(--primary-color)', textDecoration: 'underline' }}>
                  Change {method === 'mobile' ? 'Mobile Number' : 'Email'}
                </button>
              </div>
            </form>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
