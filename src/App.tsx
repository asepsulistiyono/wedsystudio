import { useState, useEffect } from 'react';
import { WeddingProvider, useWedding } from './context/WeddingContext';
import WeddingInvitation from './components/WeddingInvitation';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import GuestManagement from './pages/GuestManagement';
import SuperAdmin from './pages/SuperAdmin';

// Access Denied Component
function AccessDenied({ navigate }: { navigate: (path: string) => void }) {
  const { currentUser, logout } = useWedding();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Akses Ditolak</h1>
        <p className="text-gray-600 mb-6">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            Login sebagai: <span className="font-semibold">{currentUser?.username}</span>
          </p>
          <p className="text-sm text-gray-600">
            Role: <span className="font-semibold capitalize">{currentUser?.role}</span>
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            Logout & Login Ulang
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Kembali ke Undangan
          </button>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { currentUser } = useWedding();

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
        // Check if user is logged in
        if (!currentUser) {
          navigate('/login');
          return null;
        }
        // Admin and SuperAdmin can access admin pages
        if (currentUser.role !== 'admin' && currentUser.role !== 'superadmin') {
          return <AccessDenied navigate={navigate} />;
        }
        return <AdminDashboard navigate={navigate} />;
      case 'guests':
        // Check if user is logged in
        if (!currentUser) {
          navigate('/login');
          return null;
        }
        // Admin and SuperAdmin can access guest management
        if (currentUser.role !== 'admin' && currentUser.role !== 'superadmin') {
          return <AccessDenied navigate={navigate} />;
        }
        return <GuestManagement navigate={navigate} />;
      case 'superadmin':
        // Check if user is logged in
        if (!currentUser) {
          navigate('/login');
          return null;
        }
        // ONLY SuperAdmin can access superadmin page
        if (currentUser.role !== 'superadmin') {
          return <AccessDenied navigate={navigate} />;
        }
        return <SuperAdmin navigate={navigate} />;
      default:
        return <WeddingInvitation />;
    }
  };

  return renderPage();
}

function App() {
  return (
    <WeddingProvider>
      <AppContent />
    </WeddingProvider>
  );
}

export default App;
