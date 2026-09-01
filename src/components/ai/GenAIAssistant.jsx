import { useState, useRef, useEffect } from 'react';
import { Send, ShieldCheck, AlertCircle } from 'lucide-react';
import VoiceButton from '../ui/VoiceButton';
import styles from './GenAIAssistant.module.css';

export default function GenAIAssistant({ title = "Ask Census AI", onAsk, initialGreeting = "Hello! I am your AI assistant. How can I help you today?" }) {
  const [messages, setMessages] = useState([
    { id: 1, text: initialGreeting, sender: 'ai', isVerified: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    if (!text.trim()) return;
    
    const newMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await onAsk(text);
      const aiMsg = { 
        id: Date.now() + 1, 
        text: responseText, 
        sender: 'ai',
        isVerified: true 
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting to the verified database right now.", sender: 'ai', isVerified: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`card ${styles.assistantContainer}`}>
      <div className={styles.header}>
        <h3>{title}</h3>
      </div>
      
      <div className={styles.chatArea}>
        {messages.map(msg => (
          <div key={msg.id} className={`${styles.messageWrapper} ${msg.sender === 'user' ? styles.user : styles.ai}`}>
            <div className={styles.messageBubble}>
              {msg.text}
            </div>
            {msg.sender === 'ai' && msg.isVerified && (
              <div className={styles.verificationBadge}>
                <ShieldCheck size={14} /> Verified Response
              </div>
            )}
            {msg.sender === 'ai' && !msg.isVerified && (
              <div className={`${styles.verificationBadge} ${styles.unverified}`}>
                <AlertCircle size={14} /> Unverified
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.messageWrapper} ${styles.ai}`}>
            <div className={styles.messageBubble}>
              <span className={styles.typing}></span>
              <span className={styles.typing}></span>
              <span className={styles.typing}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        <input 
          type="text" 
          className="input-field"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
          placeholder="Ask a question..."
        />
        <VoiceButton onTranscript={(text) => handleSend(text)} placeholder="Use Voice" />
        <button 
          className="btn-primary" 
          onClick={() => handleSend(inputValue)}
          disabled={!inputValue.trim()}
          style={{ padding: '0.75rem', borderRadius: '50%' }}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
