import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import GenAIAssistant from '../../components/ai/GenAIAssistant';
import { mockQuestions } from '../../data/mockData';
import { ShieldAlert, CheckCircle2, Mic, Volume2, Download, QrCode, ArrowLeft, ArrowRight } from 'lucide-react';
import { matchVoiceToOption } from '../../services/mockAiService';
import VoiceButton from '../../components/ui/VoiceButton';

export default function SelfEnumeration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentQuestion = mockQuestions[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / mockQuestions.length) * 100);

  const handleSelectOption = (option) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
  };

  const handleNext = () => {
    if (currentStep < mockQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleAiAsk = async () => {
    return `The question asks: "${currentQuestion.questionText}".\n\nAI Explanation: ${currentQuestion.aiExplanation}`;
  };

  const handleSpeakQuestion = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(`${currentQuestion.questionText}. ${currentQuestion.aiExplanation}`);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleVoiceAnswer = async (transcript) => {
    setToastMessage(`🎙️ Heard: "${transcript}"... Matching option...`);
    
    const matchedOption = await matchVoiceToOption(transcript, currentQuestion.options);
    
    if (matchedOption) {
      handleSelectOption(matchedOption);
      setToastMessage(`✅ Auto-Selected: "${matchedOption}"`);
      setTimeout(() => setToastMessage(null), 3000);
      
      setTimeout(() => {
        if (currentStep < mockQuestions.length - 1) {
          setCurrentStep(s => s + 1);
        }
      }, 1400);
    } else {
      setToastMessage("⚠️ Could not match option. Please try speaking again or click.");
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  if (isSubmitted) {
    const refNumber = "CS2027-DL-88492";
    const timestamp = new Date().toLocaleString();

    return (
      <div>
        <Navbar />
        <main className="page-content container flex justify-center items-center" style={{ minHeight: '75vh' }}>
          <div className="card text-center" style={{ maxWidth: '600px', width: '100%', padding: '2.5rem', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
            
            <div style={{
              width: '70px', height: '70px', borderRadius: '50%',
              backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
            }}>
              <CheckCircle2 size={44} color="#059669" />
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#0f172a' }}>Self-Enumeration Complete!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Your response has been digitally signed, encrypted, and recorded in the statistical database.
            </p>

            {/* Official Digital Census Slip */}
            <div style={{
              backgroundColor: 'var(--bg-main)',
              border: '1px dashed var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              textAlign: 'left',
              marginBottom: '1.5rem'
            }}>
              <div className="flex justify-between items-center" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reference Slip Number</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-color)' }}>{refNumber}</div>
                </div>
                <div style={{
                  width: '48px', height: '48px', backgroundColor: 'white', borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)'
                }}>
                  <QrCode size={32} color="var(--text-main)" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Submission Date:</span>
                  <div style={{ fontWeight: '600' }}>{timestamp}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Questions Answered:</span>
                  <div style={{ fontWeight: '600' }}>15 / 15 (100%)</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Verification Status:</span>
                  <div style={{ color: '#059669', fontWeight: '600' }}>Digital Verified ✓</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Security:</span>
                  <div style={{ fontWeight: '600' }}>256-bit Anonymized</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button 
                onClick={() => alert(`Receipt downloaded for Ref: ${refNumber}`)}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                <Download size={18} /> Download Official Receipt (PDF)
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      {toastMessage && (
        <div style={{
          position: 'fixed', top: '95px', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: '#1e293b', color: 'white', padding: '0.8rem 1.75rem',
          borderRadius: 'var(--radius-full)', zIndex: 100, boxShadow: 'var(--shadow-lg)',
          display: 'flex', alignItems: 'center', gap: '0.5rem', animation: 'fadeInDown 0.3s ease',
          fontSize: '0.95rem', fontWeight: '500'
        }}>
          {toastMessage}
        </div>
      )}

      <main className="page-content container" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Main Form Question Card */}
        <section style={{ flex: '2', minWidth: '320px' }}>
          <div className="card" style={{ height: '100%', position: 'relative' }}>
            
            {/* Progress Bar & Badges */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="flex justify-between items-center mb-2">
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--primary-color)' }}>
                  Question {currentStep + 1} of {mockQuestions.length}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                  {progressPercent}% Completed
                </span>
              </div>
              
              <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  backgroundColor: 'var(--primary-color)',
                  borderRadius: '9999px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
            
            <div className="flex justify-between items-start mb-3">
              <h3 style={{ fontSize: '1.4rem', margin: 0, lineHeight: '1.4', flex: 1 }}>
                {currentQuestion.questionText}
              </h3>
              <div className="flex items-center gap-2" style={{ marginLeft: '1rem' }}>
                <button
                  onClick={handleSpeakQuestion}
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    backgroundColor: isSpeaking ? 'var(--secondary-color)' : 'rgba(255,255,255,0.9)',
                    color: isSpeaking ? 'white' : 'var(--text-main)',
                    border: '1px solid var(--border-color)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', boxShadow: 'var(--shadow-sm)'
                  }}
                  title="Listen to Question (AI Voice)"
                >
                  <Volume2 size={20} />
                </button>
                <VoiceButton onTranscript={handleVoiceAnswer} placeholder="Speak your answer" />
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              💡 <em>{currentQuestion.aiExplanation}</em>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {currentQuestion.options.map(option => {
                const isSelected = answers[currentQuestion.id] === option;
                return (
                  <button
                    key={option}
                    className="btn-secondary"
                    style={{
                      justifyContent: 'flex-start',
                      padding: '1rem 1.25rem',
                      borderColor: isSelected ? 'var(--primary-color)' : 'var(--border-color)',
                      backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255,255,255,0.7)',
                      fontWeight: isSelected ? '700' : '500',
                      color: isSelected ? 'var(--primary-color)' : 'var(--text-main)',
                      transform: isSelected ? 'scale(1.01)' : 'scale(1)',
                      boxShadow: isSelected ? '0 2px 8px rgba(99, 102, 241, 0.2)' : 'var(--shadow-sm)'
                    }}
                    onClick={() => handleSelectOption(option)}
                  >
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      border: `2px solid ${isSelected ? 'var(--primary-color)' : '#cbd5e1'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginRight: '0.75rem'
                    }}>
                      {isSelected && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary-color)' }} />}
                    </div>
                    {option}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between mt-4" style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <button 
                className="btn-secondary" 
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(currentStep - 1)}
                style={{ opacity: currentStep === 0 ? 0.4 : 1 }}
              >
                <ArrowLeft size={16} /> Previous
              </button>
              <button 
                className="btn-primary" 
                disabled={!answers[currentQuestion.id]}
                onClick={handleNext}
              >
                {currentStep === mockQuestions.length - 1 ? 'Review & Submit 🚀' : <>Next <ArrowRight size={16} /></>}
              </button>
            </div>
          </div>
        </section>

        {/* AI Copilot Sidepane */}
        <section style={{ flex: '1', minWidth: '300px' }}>
          <GenAIAssistant 
            title="AI Self-Enumeration Copilot" 
            initialGreeting={`I am your assistant for Question ${currentStep + 1}. You can speak your answer using the microphone button, click to listen to my voice, or ask me for clarification anytime!`}
            onAsk={handleAiAsk}
          />
          <div className="card mt-4" style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.2)', padding: '1.25rem' }}>
            <div className="flex items-center gap-2" style={{ color: '#b45309', fontWeight: '600' }}>
              <ShieldAlert size={18} /> Privacy by Design
            </div>
            <p style={{ fontSize: '0.85rem', marginTop: '0.4rem', marginBottom: 0, color: '#78350f' }}>
              Your individual survey inputs are anonymized and protected under statistical privacy safeguards.
            </p>
          </div>
        </section>

      </main>
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
