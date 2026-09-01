import { useState } from 'react';
import { Sparkles, X, ArrowRight, Mic, ShieldCheck, Lock, Activity } from 'lucide-react';

export default function JudgeDemoOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    { num: 1, title: "Hands-Free Voice AI", desc: "Go to 'Self-Enumeration' → Click Mic icon → Speak 'Tap water' out loud to watch auto-advance!", link: "/citizen/enumerate" },
    { num: 2, title: "1-Click RAG Fact Checker", desc: "Go to 'Verify Claims' → Click any sample pill to test instant AI guideline verification.", link: "/citizen/verify" },
    { num: 3, title: "PII Privacy Vault", desc: "Go to 'Field Agent' → Click 'Unlock Details' to see encrypted PII vault in action.", link: "/enumerator" },
    { num: 4, title: "Live Command Stream", desc: "Go to 'Admin Dashboard' → Watch live activity stream & click 'AI Executive Report'.", link: "/admin" }
  ];

  return (
    <>
      {/* Floating Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          background: 'linear-gradient(135deg, #6366f1, #ec4899)',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '9999px',
          fontWeight: '800',
          fontSize: '0.9rem',
          boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          border: '2px solid white',
          cursor: 'pointer',
          animation: 'pulse 2s infinite'
        }}
      >
        <Sparkles size={18} /> ⚡ Judge Quick Demo Guide
      </button>

      {/* Demo Modal Drawer */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '85px',
          right: '24px',
          zIndex: 9999,
          width: '380px',
          backgroundColor: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          border: '2px solid var(--primary-color)',
          overflow: 'hidden',
          animation: 'fadeInUp 0.3s ease'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
            color: 'white',
            padding: '1rem 1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <strong style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={18} /> Judge Demo Roadmap
            </strong>
            <button onClick={() => setIsOpen(false)} style={{ color: 'white' }}><X size={18} /></button>
          </div>

          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {steps.map(s => (
              <a
                key={s.num}
                href={s.link}
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: 'var(--bg-main)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}
              >
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  backgroundColor: 'var(--primary-color)', color: 'white',
                  fontWeight: '800', fontSize: '0.8rem', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  {s.num}
                </div>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--primary-dark)', display: 'block' }}>{s.title}</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.3', display: 'block', marginTop: '2px' }}>{s.desc}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
