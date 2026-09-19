import { HashRouter, Routes, Route } from 'react-router-dom';
import { WeddingProvider } from './context/WeddingContext';
import WeddingInvitation from './components/WeddingInvitation';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import GuestManagement from './pages/GuestManagement';
import SuperAdmin from './pages/SuperAdmin';

function App() {
  return (
    <WeddingProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<WeddingInvitation />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/guests" element={<GuestManagement />} />
          <Route path="/superadmin" element={<SuperAdmin />} />
        </Routes>
      </HashRouter>
    </WeddingProvider>
  );
}

export default App;
