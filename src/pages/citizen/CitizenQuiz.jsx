import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Award, CheckCircle2, ShieldCheck, Zap, ArrowRight, HelpCircle, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CitizenQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const quizQuestions = [
    {
      q: "Does digital census data ever get shared with tax or commercial marketing agencies?",
      options: [
        { text: "Yes, it is shared with all departments", isCorrect: false },
        { text: "No, individual responses are strictly confidential & anonymized", isCorrect: true },
        { text: "Only if you consent during verification", isCorrect: false }
      ],
      explanation: "Under the Data Privacy & Census Charter, all individual survey responses are encrypted and can never be shared with tax or commercial agencies."
    },
    {
      q: "What is the fee required for digital self-enumeration?",
      options: [
        { text: "₹0 - Completely Free for all citizens", isCorrect: true },
        { text: "₹50 processing fee", isCorrect: false },
        { text: "₹100 for digital certificate", isCorrect: false }
      ],
      explanation: "Census participation is 100% free. No official will ever ask for bank details or processing charges."
    },
    {
      q: "How many questions are in the standard digital housing questionnaire?",
      options: [
        { text: "50 questions", isCorrect: false },
        { text: "15 standard demographic questions", isCorrect: true },
        { text: "5 questions", isCorrect: false }
      ],
      explanation: "The streamlined Census Sathi questionnaire consists of 15 simple, verified questions covering dwelling and amenities."
    },
    {
      q: "What should you do if an unauthorized person asks for your OTP?",
      options: [
        { text: "Never share OTP with anyone", isCorrect: true },
        { text: "Share only with enumerators", isCorrect: false },
        { text: "Share via WhatsApp only", isCorrect: false }
      ],
      explanation: "OTPs are private. Official enumerators only ask survey questions and never ask for confidential OTPs."
    }
  ];

  const handleSelect = (idx, isCorrect) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);
    if (isCorrect) setScore(s => s + 1);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="page-content container" style={{ maxWidth: '800px' }}>
        <div className="text-center mb-4">
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            backgroundColor: 'rgba(99, 102, 241, 0.1)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem'
          }}>
            <Trophy size={32} color="var(--primary-color)" />
          </div>
          <h1>Census Awareness & Safety Quiz</h1>
          <p>Test your knowledge on digital census safety, data privacy, and self-enumeration to earn your verified badge!</p>
        </div>

        {!showResult ? (
          <div className="card" style={{ backgroundColor: 'white', border: '1.5px solid rgba(99, 102, 241, 0.25)' }}>
            <div className="flex justify-between items-center mb-4" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                Question {currentQ + 1} of {quizQuestions.length}
              </span>
              <span className="badge verified">Score: {score}</span>
            </div>

            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
              {quizQuestions[currentQ].q}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {quizQuestions[currentQ].options.map((opt, idx) => {
                let btnBg = 'rgba(255,255,255,0.8)';
                let btnBorder = 'var(--border-color)';
                let textColor = 'var(--text-main)';

                if (isAnswered) {
                  if (opt.isCorrect) {
                    btnBg = 'rgba(16, 185, 129, 0.15)';
                    btnBorder = '#059669';
                    textColor = '#047857';
                  } else if (selectedAnswer === idx) {
                    btnBg = 'rgba(239, 68, 68, 0.15)';
                    btnBorder = '#dc2626';
                    textColor = '#b91c1c';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx, opt.isCorrect)}
                    className="btn-secondary"
                    style={{
                      justifyContent: 'flex-start',
                      backgroundColor: btnBg,
                      borderColor: btnBorder,
                      color: textColor,
                      padding: '0.9rem 1.2rem',
                      fontWeight: selectedAnswer === idx ? '700' : '500',
                      textAlign: 'left'
                    }}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div style={{
                backgroundColor: 'var(--bg-main)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                borderLeft: '4px solid var(--primary-color)',
                fontSize: '0.9rem'
              }}>
                <strong>💡 Why this matters:</strong> {quizQuestions[currentQ].explanation}
              </div>
            )}

            {isAnswered && (
              <button onClick={handleNext} className="btn-primary" style={{ width: '100%' }}>
                {currentQ < quizQuestions.length - 1 ? 'Next Question →' : 'View Your Certificate Result 🏆'}
              </button>
            )}
          </div>
        ) : (
          <div className="card text-center" style={{ backgroundColor: 'white', padding: '2.5rem', border: '2px solid #059669' }}>
            <div style={{
              width: '70px', height: '70px', borderRadius: '50%',
              backgroundColor: 'rgba(16, 185, 129, 0.15)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem'
            }}>
              <Award size={40} color="#059669" />
            </div>
            <h2>Census Safety Awareness Master!</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              You scored <strong>{score} / {quizQuestions.length}</strong>! You understand digital privacy, anti-fraud safeguards, and the self-enumeration workflow.
            </p>

            <div style={{
              backgroundColor: 'var(--bg-main)',
              border: '1px dashed var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              margin: '1.5rem 0',
              textAlign: 'left'
            }}>
              <div className="flex justify-between items-center">
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Verified Citizen Certificate</span>
                  <div style={{ fontWeight: '800', color: 'var(--primary-dark)', fontSize: '1.1rem' }}>CERT-CS2027-AWARENESS</div>
                </div>
                <span className="badge verified">Verified ✓</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <Link to="/citizen/enumerate" className="btn-primary">
                Proceed to Self-Enumeration (15 Qs) <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
