import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { QrCode, ShieldCheck, CheckCircle2, AlertTriangle, Smartphone, User, Home, Calendar } from 'lucide-react';

export default function EnumeratorVerification() {
  const [badgeId, setBadgeId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const mockOfficials = {
    "AG-2027-007": {
      name: "Ramesh Sharma (Field Officer #007)",
      assignedArea: "Sector 4, Block B (Mumbai East)",
      badgeStatus: "Active & Authorized",
      authorizedTill: "Oct 31, 2027",
      officialIdCard: "ID-MH-MUM-8849",
      isValid: true
    },
    "AG-2027-104": {
      name: "Priya Patel (Field Officer #104)",
      assignedArea: "Navrangpura, Block A (Ahmedabad)",
      badgeStatus: "Active & Authorized",
      authorizedTill: "Oct 31, 2027",
      officialIdCard: "ID-GJ-AHM-9921",
      isValid: true
    }
  };

  const handleVerify = (idToTest) => {
    const id = idToTest || badgeId.trim().toUpperCase();
    if (!id) return;
    setIsVerifying(true);
    setVerificationResult(null);
    if (idToTest) setBadgeId(idToTest);

    setTimeout(() => {
      setIsVerifying(false);
      if (mockOfficials[id]) {
        setVerificationResult(mockOfficials[id]);
      } else {
        setVerificationResult({
          name: "Unknown / Unauthorized Badge",
          assignedArea: "Not Assigned",
          badgeStatus: "Unverified / Potential Impersonator",
          isValid: false
        });
      }
    }, 800);
  };

  return (
    <div>
      <Navbar />
      <main className="page-content container" style={{ maxWidth: '850px' }}>
        <div className="text-center mb-4">
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            backgroundColor: 'rgba(16, 185, 129, 0.12)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem'
          }}>
            <ShieldCheck size={36} color="#059669" />
          </div>
          <h1>Field Agent Authenticity Verification</h1>
          <p>Verify whether an enumerator visiting your doorstep is officially authorized before answering survey questions.</p>
        </div>

        {/* Quick Test Demo Badges */}
        <div className="card mb-4" style={{ backgroundColor: 'white', border: '1.5px solid rgba(99, 102, 241, 0.25)' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
            ⚡ One-Click Test Official IDs:
          </div>
          <div className="flex gap-2 mb-3 flex-wrap">
            <button 
              onClick={() => handleVerify("AG-2027-007")}
              className="btn-secondary"
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem' }}
            >
              Verify Officer #007 (Mumbai)
            </button>
            <button 
              onClick={() => handleVerify("AG-2027-104")}
              className="btn-secondary"
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem' }}
            >
              Verify Officer #104 (Ahmedabad)
            </button>
            <button 
              onClick={() => handleVerify("FAKE-999")}
              className="btn-secondary"
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem', borderColor: '#fee2e2', color: '#b91c1c' }}
            >
              Test Fake/Suspicious Badge ID
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              className="input-field"
              placeholder="Enter Official Agent Badge ID (e.g. AG-2027-007)"
              value={badgeId}
              onChange={(e) => setBadgeId(e.target.value)}
            />
            <button 
              className="btn-primary" 
              onClick={() => handleVerify(badgeId)}
              disabled={!badgeId.trim() || isVerifying}
              style={{ whiteSpace: 'nowrap' }}
            >
              {isVerifying ? 'Verifying...' : 'Verify Agent'}
            </button>
          </div>
        </div>

        {/* Verification Result Card */}
        {verificationResult && (
          <div className="card" style={{
            backgroundColor: 'white',
            border: `2px solid ${verificationResult.isValid ? '#059669' : '#dc2626'}`,
            boxShadow: 'var(--shadow-md)'
          }}>
            <div className="flex justify-between items-center mb-3" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div className="flex items-center gap-2">
                {verificationResult.isValid ? (
                  <CheckCircle2 size={24} color="#059669" />
                ) : (
                  <AlertTriangle size={24} color="#dc2626" />
                )}
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
                  {verificationResult.isValid ? "Authorized Field Representative" : "Warning: Unverified Agent ID"}
                </h3>
              </div>
              <span className={`badge ${verificationResult.isValid ? 'verified' : 'false'}`}>
                {verificationResult.badgeStatus}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.9rem' }}>
              <div style={{ backgroundColor: 'var(--bg-main)', padding: '0.85rem', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Officer Name</span>
                <strong style={{ display: 'block', fontSize: '1rem', marginTop: '2px' }}>{verificationResult.name}</strong>
              </div>
              <div style={{ backgroundColor: 'var(--bg-main)', padding: '0.85rem', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Assigned Field Jurisdiction</span>
                <strong style={{ display: 'block', fontSize: '1rem', marginTop: '2px' }}>{verificationResult.assignedArea}</strong>
              </div>
              {verificationResult.isValid && (
                <div style={{ backgroundColor: 'var(--bg-main)', padding: '0.85rem', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Authorization Validity</span>
                  <strong style={{ display: 'block', color: '#059669', fontSize: '1rem', marginTop: '2px' }}>Valid until {verificationResult.authorizedTill}</strong>
                </div>
              )}
            </div>

            {!verificationResult.isValid && (
              <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '8px', fontSize: '0.85rem' }}>
                ⚠️ Do NOT share household survey information with unverified individuals. Call the 24/7 Helpline (1800-11-2027) immediately to report suspicious activity.
              </div>
            )}
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
