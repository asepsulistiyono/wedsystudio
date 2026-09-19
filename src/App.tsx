import { useState, useEffect } from 'react';
import { WeddingProvider } from './context/WeddingContext';
import WeddingInvitation from './components/WeddingInvitation';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import GuestManagement from './pages/GuestManagement';
import SuperAdmin from './pages/SuperAdmin';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Listen to hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      
      if (hash === '/login') {
        setCurrentPage('login');
      } else if (hash === '/admin') {
        setCurrentPage('admin');
      } else if (hash === '/admin/guests') {
        setCurrentPage('guests');
      } else if (hash === '/superadmin') {
        setCurrentPage('superadmin');
      } else {
        setCurrentPage('home');
      }
    };

    // Handle initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigate function
  const navigate = (path: string) => {
    window.location.hash = path;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage navigate={navigate} />;
      case 'admin':
        return <AdminDashboard navigate={navigate} />;
      case 'guests':
        return <GuestManagement navigate={navigate} />;
      case 'superadmin':
        return <SuperAdmin navigate={navigate} />;
      default:
        return <WeddingInvitation />;
    }
  };

  return (
    <WeddingProvider>
      {renderPage()}
    </WeddingProvider>
  );
}

export default App;
