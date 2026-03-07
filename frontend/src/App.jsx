import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import AllEmails from './pages/AllEmails';
import ImportantContacts from './pages/ImportantContacts';
import Settings from './pages/Settings';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 w-full flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/emails" element={<AllEmails />} />
          <Route path="/contacts" element={<ImportantContacts />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
