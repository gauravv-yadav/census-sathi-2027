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
    <div className="flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
      <Globe size={20} color="var(--primary-color)" />
      <select 
        value={currentLang}
        onChange={handleChange}
        style={{
          border: '1px solid var(--border-color)',
          background: 'rgba(255,255,255,0.8)',
          borderRadius: 'var(--radius-full)',
          padding: '0.4rem 0.8rem',
          fontSize: '0.9rem',
          fontWeight: '600',
          cursor: 'pointer',
          outline: 'none',
          color: 'var(--text-main)',
          boxShadow: 'var(--shadow-sm)'
        }}
        aria-label="Select Language"
      >
        <option value="en">English</option>
        <option value="hi">हिंदी (Hindi)</option>
        <option value="mr">मराठी (Marathi)</option>
        <option value="bn">বাংলা (Bengali)</option>
        <option value="ta">தமிழ் (Tamil)</option>
        <option value="te">తెలుగు (Telugu)</option>
      </select>
    </div>
  );
}
