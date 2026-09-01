import { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import styles from './VoiceButton.module.css';

export default function VoiceButton({ onTranscript, placeholder = "Tap to speak..." }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsRecording(true);
      };

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setIsRecording(false);
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          if (onTranscript) onTranscript(transcript);
        }, 800);
      };

      rec.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      setRecognition(rec);
    }
  }, [onTranscript]);

  const handleToggleRecord = () => {
    if (isRecording) {
      recognition?.stop();
    } else {
      if (recognition) {
        try {
          recognition.start();
        } catch(e) {
          console.error(e);
        }
      } else {
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          if (onTranscript) onTranscript("Tap water");
        }, 1500);
      }
    }
  };

  return (
    <button 
      className={`${styles.voiceBtn} ${isRecording ? styles.recording : ''} ${isProcessing ? styles.processing : ''}`}
      onClick={handleToggleRecord}
      title={recognition ? placeholder : "Voice not supported in this browser"}
      aria-label="Voice input"
    >
      {isProcessing ? (
        <Loader2 className={styles.spinner} size={24} />
      ) : isRecording ? (
        <MicOff size={24} className={styles.pulse} />
      ) : (
        <Mic size={24} />
      )}
    </button>
  );
}
