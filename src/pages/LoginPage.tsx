import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWedding } from '../context/WeddingContext';

export default function LoginPage() {
  const [role, setRole] = useState<'admin' | 'superadmin'>('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { adminPassword, superAdminPassword } = useWedding();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'admin' && password === adminPassword) {
      navigate('/admin');
    } else if (role === 'superadmin' && password === superAdminPassword) {
      navigate('/superadmin');
    } else {
      setError('Password salah! Silakan coba lagi.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2d4a3e] to-[#1a3a2e] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-script text-5xl text-white mb-2">Ahmad & Fatimah</h1>
          <p className="text-[#e8d5a3] font-elegant tracking-widest">ADMIN PANEL</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>

          {/* Role Toggle */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => { setRole('admin'); setError(''); }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                role === 'admin' ? 'bg-white shadow text-[#2d4a3e]' : 'text-gray-500'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => { setRole('superadmin'); setError(''); }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                role === 'superadmin' ? 'bg-white shadow text-purple-700' : 'text-gray-500'
              }`}
            >
              Super Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2d4a3e] transition-colors"
                placeholder="Masukkan password"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-3 rounded-lg text-white font-medium transition-colors ${
                role === 'admin'
                  ? 'bg-[#2d4a3e] hover:bg-[#1a3a2e]'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              Masuk
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center mb-2">Demo Credentials:</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>Admin: <code className="bg-gray-100 px-2 py-0.5 rounded">admin123</code></p>
              <p>Super Admin: <code className="bg-gray-100 px-2 py-0.5 rounded">superadmin123</code></p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-[#2d4a3e] transition-colors">
              ← Kembali ke Undangan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
