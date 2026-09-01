import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/citizen/LandingPage';
import SelfEnumeration from './pages/citizen/SelfEnumeration';
import MisinformationShield from './pages/citizen/MisinformationShield';
import DocumentChecklist from './pages/citizen/DocumentChecklist';
import EnumeratorDashboard from './pages/enumerator/EnumeratorDashboard';
import FieldRoutePlanner from './pages/enumerator/FieldRoutePlanner';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminForecast from './pages/admin/AdminForecast';
import LoginModal from './pages/auth/LoginModal';
import GenAIAssistant from './components/ai/GenAIAssistant';
import Navbar from './components/layout/Navbar';
import JudgeDemoOverlay from './components/ui/JudgeDemoOverlay';
import { askCitizenAI } from './services/mockAiService';
import './index.css';

const AskAIPage = () => (
  <div>
    <Navbar />
    <main className="page-content container" style={{ maxWidth: '800px' }}>
      <h1 className="text-center mb-4">Ask Census AI</h1>
      <GenAIAssistant 
        onAsk={askCitizenAI} 
        initialGreeting="Hello! I am your AI Assistant. Ask me anything about the platform, schedule, guidelines, or self-enumeration."
      />
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <JudgeDemoOverlay />
      <Routes>
        <Route path="/" element={<Navigate to="/citizen" replace />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/citizen" element={<LandingPage />} />
        <Route path="/citizen/enumerate" element={<SelfEnumeration />} />
        <Route path="/citizen/checklist" element={<DocumentChecklist />} />
        <Route path="/citizen/ask" element={<AskAIPage />} />
        <Route path="/citizen/verify" element={<MisinformationShield />} />
        <Route path="/enumerator" element={<EnumeratorDashboard />} />
        <Route path="/enumerator/planner" element={<FieldRoutePlanner />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/forecast" element={<AdminForecast />} />
      </Routes>
    </Router>
  );
}

export default App;
