import { Globe } from 'lucide-react';
import { getLanguage, setLanguage } from '../../utils/i18n';

export default function LanguageSelector() {
  const currentLang = getLanguage();

  const handleChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-1" style={{ color: 'var(--text-main)', flexShrink: 0 }}>
      <Globe size={16} color="var(--primary-color)" />
      <select 
        value={currentLang}
        onChange={handleChange}
        style={{
          border: '1px solid var(--border-color)',
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 'var(--radius-full)',
          padding: '0.2rem 0.4rem',
          fontSize: '0.78rem',
          fontWeight: '600',
          cursor: 'pointer',
          outline: 'none',
          color: 'var(--text-main)',
          boxShadow: 'var(--shadow-sm)',
          maxWidth: '100px'
        }}
        aria-label="Select Language"
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
        <option value="mr">मराठी</option>
        <option value="bn">বাংলা</option>
        <option value="ta">தமிழ்</option>
        <option value="te">తెలుగు</option>
      </select>
    </div>
  );
}
