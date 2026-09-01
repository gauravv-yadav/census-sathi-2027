import { useState } from 'react';
import { Search, Shield, AlertTriangle, CheckCircle, FileText, Loader2, Sparkles } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import { analyzeClaim } from '../../services/mockAiService';

export default function MisinformationShield() {
  const [claim, setClaim] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const sampleClaims = [
    "WhatsApp message: platform will delete ration cards",
    "Is it true I have to pay Rs 100 for self enumeration?",
    "Self enumeration deadline extended",
    "Submitting data will increase my taxes"
  ];

  const handleVerify = async (textToVerify) => {
    const target = textToVerify || claim;
    if (!target.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);
    if (textToVerify) setClaim(textToVerify);
    
    try {
      const analysis = await analyzeClaim(target);
      setResult(analysis);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'verified': return <CheckCircle size={24} style={{ color: '#059669' }} />;
      case 'false': return <AlertTriangle size={24} style={{ color: '#dc2626' }} />;
      default: return <Shield size={24} style={{ color: '#d97706' }} />;
    }
  };

  const getStatusBadgeClass = (status) => {
    const s = status.toLowerCase();
    if (s === 'verified') return 'verified';
    if (s === 'false') return 'false';
    return 'misleading';
  };

  return (
    <div>
      <Navbar />
      <main className="page-content container">
        <div className="card" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div className="text-center mb-4">
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              backgroundColor: 'rgba(99, 102, 241, 0.1)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem'
            }}>
              <Shield size={36} color="var(--primary-color)" />
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Verify Census Claims</h1>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              Verify viral messages, social media posts, or rumors against verified platform guidelines.
            </p>
          </div>

          {/* Quick Demo Test Pills for Judges */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Sparkles size={14} color="var(--primary-color)" /> Quick Test Samples (Click to verify instantly):
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {sampleClaims.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleVerify(sample)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid var(--border-color)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    color: 'var(--text-main)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-color)'; e.currentTarget.style.color = 'var(--primary-color)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-main)'; }}
                >
                  "{sample}"
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <textarea 
              className="input-field" 
              rows="3" 
              placeholder="Or paste any message or claim here..."
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              style={{ resize: 'none' }}
            />
          </div>
          
          <div className="flex justify-center mb-4">
            <button 
              className="btn-primary" 
              onClick={() => handleVerify(claim)}
              disabled={!claim.trim() || isAnalyzing}
              style={{ width: '100%', maxWidth: '320px' }}
            >
              {isAnalyzing ? <><Loader2 className="spinner" size={20} /> AI Analyzing Guidelines...</> : <><Search size={20} /> Verify Claim Now</>}
            </button>
          </div>

          {result && (
            <div className="card" style={{ backgroundColor: 'white', marginTop: '2rem', border: '1px solid var(--border-color)' }}>
              <div className="flex items-center justify-between mb-4" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Classification Result</span>
                  <h3 style={{ margin: 0 }}>Fact-Check Status</h3>
                </div>
                <span className={`badge ${getStatusBadgeClass(result.status)}`} style={{ fontSize: '1rem', padding: '0.5rem 1.2rem' }}>
                  {getStatusIcon(result.status)} {result.status}
                </span>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>AI Verification Reasoning</h4>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: '1.6' }}>{result.reasoning}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <FileText size={22} color="var(--primary-color)" />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Official Knowledge Base Reference</span>
                  <strong style={{ fontSize: '0.95rem' }}>{result.source}</strong>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-4" style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <AlertTriangle size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px', color: '#f59e0b' }} />
            Safety Notice: This platform will never ask for OTPs, bank accounts, or passwords.
          </div>
        </div>
      </main>
      
      <style>{`
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
