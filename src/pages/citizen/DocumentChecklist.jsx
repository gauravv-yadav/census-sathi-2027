import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { CheckSquare, FileText, ArrowRight, ShieldCheck, Download, RefreshCw } from 'lucide-react';

export default function DocumentChecklist() {
  const [dwellingType, setDwellingType] = useState('owned');
  const [memberCount, setMemberCount] = useState('4');
  const [hasId, setHasId] = useState(true);
  const [isCalculated, setIsCalculated] = useState(false);

  const checklistItems = [
    { title: "Standard Government Photo ID (Aadhaar / Voter ID)", required: true, desc: "For head of household verification." },
    { title: "Property Utility Bill (Electricity / Water)", required: dwellingType === 'owned', desc: "To verify physical dwelling address." },
    { title: "Registered Rental Agreement", required: dwellingType === 'rented', desc: "For tenant residency proof." },
    { title: "Household Member Details List", required: true, desc: "Names, DOBs, and educational qualifications for all members." },
    { title: "Mobile Phone for OTP Verification", required: true, desc: "To receive acknowledgment reference ID." }
  ];

  return (
    <div>
      <Navbar />
      <main className="page-content container" style={{ maxWidth: '900px' }}>
        <div className="text-center mb-4">
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            backgroundColor: 'rgba(99, 102, 241, 0.1)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem'
          }}>
            <CheckSquare size={32} color="var(--primary-color)" />
          </div>
          <h1>Self-Enumeration Document Checklist</h1>
          <p>Select your household parameters below to generate your personalized preparation checklist.</p>
        </div>

        {/* Input Parameters */}
        <div className="card mb-4" style={{ backgroundColor: 'white' }}>
          <h3 style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            Household Parameters
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            
            <div>
              <label style={{ fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Dwelling Ownership</label>
              <select 
                className="input-field" 
                value={dwellingType}
                onChange={(e) => setDwellingType(e.target.value)}
              >
                <option value="owned">Owned House</option>
                <option value="rented">Rented Dwelling</option>
                <option value="employer">Employer Provided</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Household Members</label>
              <select 
                className="input-field" 
                value={memberCount}
                onChange={(e) => setMemberCount(e.target.value)}
              >
                <option value="1">1 Person (Single)</option>
                <option value="2-3">2 - 3 Members</option>
                <option value="4">4 - 5 Members</option>
                <option value="6+">6+ Joint Family</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Head of House Has Photo ID?</label>
              <select 
                className="input-field" 
                value={hasId ? "yes" : "no"}
                onChange={(e) => setHasId(e.target.value === "yes")}
              >
                <option value="yes">Yes, Available</option>
                <option value="no">No ID Available</option>
              </select>
            </div>

          </div>

          <button 
            className="btn-primary mt-4" 
            style={{ width: '100%' }}
            onClick={() => setIsCalculated(true)}
          >
            <RefreshCw size={18} /> Generate Custom Checklist
          </button>
        </div>

        {/* Generated Checklist */}
        <div className="card" style={{ backgroundColor: 'white' }}>
          <div className="flex justify-between items-center mb-4" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <div>
              <span className="badge verified" style={{ marginBottom: '0.4rem' }}>Checklist Generated</span>
              <h3 style={{ margin: 0 }}>Required Preparation List</h3>
            </div>
            <button onClick={() => alert("Downloading Checklist PDF...")} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
              <Download size={16} /> Save PDF
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {checklistItems.map((item, idx) => (
              <div key={idx} style={{ 
                padding: '1rem 1.25rem', 
                backgroundColor: item.required ? 'rgba(99, 102, 241, 0.04)' : 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
                border: `1px solid ${item.required ? 'rgba(99, 102, 241, 0.2)' : 'var(--border-color)'}`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  backgroundColor: item.required ? 'var(--primary-color)' : '#cbd5e1',
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: '700', fontSize: '0.8rem', marginTop: '2px'
                }}>
                  ✓
                </div>
                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-2">
                    <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{item.title}</strong>
                    {item.required ? (
                      <span style={{ fontSize: '0.75rem', backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>Mandatory</span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', backgroundColor: '#f1f5f9', color: '#64748b', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>Optional</span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.875rem', margin: '0.25rem 0 0 0', color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
