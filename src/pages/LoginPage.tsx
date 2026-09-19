import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWedding } from '../context/WeddingContext';

export default function LoginPage() {
  const [role, setRole] = useState<'admin' | 'superadmin'>('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { adminContact } = useWedding();
  const navigate = useNavigate();

  // Hardcoded credentials for simplicity
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123',
  };

  const SUPERADMIN_CREDENTIALS = {
    username: 'superadmin',
    password: 'super123',
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    console.log('Login attempt:', { role, username, password });
    
    if (role === 'admin') {
      if (username.trim() === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        console.log('Admin login success');
        navigate('/admin');
      } else {
        console.log('Admin login failed');
        setError('Username atau password salah!');
      }
    } else if (role === 'superadmin') {
      if (username.trim() === SUPERADMIN_CREDENTIALS.username && password === SUPERADMIN_CREDENTIALS.password) {
        console.log('Superadmin login success');
        navigate('/superadmin');
      } else {
        console.log('Superadmin login failed');
        setError('Username atau password salah!');
      }
    }
  };

  const whatsappLink = `https://wa.me/${adminContact.phone}?text=${encodeURIComponent(adminContact.message)}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2d4a3e] to-[#1a3a2e] px-4 py-8">
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
              type="button"
              onClick={() => { setRole('admin'); setError(''); setUsername(''); setPassword(''); }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                role === 'admin' ? 'bg-white shadow text-[#2d4a3e]' : 'text-gray-500'
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => { setRole('superadmin'); setError(''); setUsername(''); setPassword(''); }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                role === 'superadmin' ? 'bg-white shadow text-purple-700' : 'text-gray-500'
              }`}
            >
              Super Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2d4a3e] transition-colors"
                  placeholder="Masukkan username"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-1">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2d4a3e] transition-colors"
                  placeholder="Masukkan password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
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

          {/* Info Box */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800 mb-1">Belum punya akun?</p>
                <p className="text-sm text-amber-700">
                  Silakan hubungi admin untuk mendapatkan akses login.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Hubungi via WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center mb-2">Demo Credentials:</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p className="flex justify-between items-center">
                <span>Admin:</span>
                <code className="bg-gray-100 px-2 py-0.5 rounded">admin / admin123</code>
              </p>
              <p className="flex justify-between items-center">
                <span>Super Admin:</span>
                <code className="bg-gray-100 px-2 py-0.5 rounded">superadmin / super123</code>
              </p>
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
