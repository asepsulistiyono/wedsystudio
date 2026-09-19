import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWedding } from '../context/WeddingContext';

export default function SuperAdmin() {
  const { siteSettings, setSiteSettings, weddingData, guests } = useWedding();
  const [editSettings, setEditSettings] = useState(siteSettings);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'settings' | 'users' | 'analytics' | 'system'>('settings');
  const navigate = useNavigate();

  const handleSave = () => {
    setSiteSettings(editSettings);
    setIsEditing(false);
    alert('Pengaturan berhasil disimpan!');
  };

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin mereset semua data ke default? Tindakan ini tidak dapat dibatalkan.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const analytics = {
    totalVisitors: 1247,
    rsvpRate: Math.round((guests.filter(g => g.attendance === 'hadir').length / guests.length) * 100) || 0,
    openRate: 89,
    avgTimeOnSite: '3:45',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 to-purple-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="text-white/70 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">Super Admin Panel</h1>
                <span className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full">PRO</span>
              </div>
              <p className="text-sm text-purple-200">Kelola seluruh website undangan</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/admin"
              className="px-4 py-2 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Admin
            </Link>
            <Link
              to="/admin/guests"
              className="px-4 py-2 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Tamu
            </Link>
            <Link
              to="/"
              className="px-4 py-2 text-sm bg-white text-purple-700 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            >
              Lihat Undangan
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'settings', label: '⚙️ Pengaturan Website' },
            { id: 'users', label: '👥 Manajemen User' },
            { id: 'analytics', label: '📊 Analytics' },
            { id: 'system', label: '🔧 Sistem' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setIsEditing(false); }}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Pengaturan Umum</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
                  >
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setEditSettings(siteSettings); setIsEditing(false); }}
                      className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                    >
                      Simpan
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Site Name */}
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Nama Website</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editSettings.siteName}
                      onChange={(e) => setEditSettings({...editSettings, siteName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                    />
                  ) : (
                    <p className="text-gray-800">{siteSettings.siteName}</p>
                  )}
                </div>

                {/* Theme */}
                <div>
                  <label className="text-sm text-gray-600 block mb-2">Tema Warna</label>
                  {isEditing ? (
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'green-gold', name: 'Hijau Emas', colors: ['#2d4a3e', '#c9a96e'] },
                        { id: 'blue-silver', name: 'Biru Perak', colors: ['#1e3a5f', '#a8b8c8'] },
                        { id: 'pink-rose', name: 'Pink Rose', colors: ['#8b3a62', '#e8a0b8'] },
                      ].map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => setEditSettings({...editSettings, theme: theme.id as any})}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            editSettings.theme === theme.id ? 'border-purple-500 shadow-md' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex gap-1 mb-2">
                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.colors[0] }} />
                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.colors[1] }} />
                          </div>
                          <p className="text-xs text-gray-600">{theme.name}</p>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-800 capitalize">{siteSettings.theme.replace('-', ' ')}</p>
                  )}
                </div>

                {/* Feature Toggles */}
                <div>
                  <label className="text-sm text-gray-600 block mb-3">Fitur Website</label>
                  <div className="space-y-3">
                    {[
                      { key: 'coverEnabled', label: 'Halaman Cover', desc: 'Tampilkan halaman pembuka undangan' },
                      { key: 'countdownEnabled', label: 'Countdown Timer', desc: 'Tampilkan hitung mundur ke hari H' },
                      { key: 'storyEnabled', label: 'Love Story', desc: 'Tampilkan timeline cerita cinta' },
                      { key: 'galleryEnabled', label: 'Galeri Foto', desc: 'Tampilkan galeri foto pre-wedding' },
                      { key: 'rsvpEnabled', label: 'RSVP', desc: 'Form konfirmasi kehadiran tamu' },
                      { key: 'wishesEnabled', label: 'Ucapan & Doa', desc: 'Kolom ucapan dari tamu' },
                      { key: 'giftEnabled', label: 'Amplop Digital', desc: 'Tampilkan informasi rekening' },
                      { key: 'musicEnabled', label: 'Background Music', desc: 'Musik latar di undangan' },
                    ].map((feature) => (
                      <div key={feature.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{feature.label}</p>
                          <p className="text-xs text-gray-500">{feature.desc}</p>
                        </div>
                        {isEditing ? (
                          <button
                            onClick={() => setEditSettings({
                              ...editSettings,
                              [feature.key]: !editSettings[feature.key as keyof typeof editSettings]
                            } as any)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              editSettings[feature.key as keyof typeof editSettings] ? 'bg-purple-600' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                editSettings[feature.key as keyof typeof editSettings] ? 'left-7' : 'left-1'
                              }`}
                            />
                          </button>
                        ) : (
                          <span className={`w-3 h-3 rounded-full ${
                            siteSettings[feature.key as keyof typeof siteSettings] ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Music URL */}
                <div>
                  <label className="text-sm text-gray-600 block mb-1">URL Musik Background</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={editSettings.musicUrl}
                      onChange={(e) => setEditSettings({...editSettings, musicUrl: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                      placeholder="https://example.com/music.mp3"
                    />
                  ) : (
                    <p className="text-gray-800">{siteSettings.musicUrl || 'Belum diatur'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Manajemen User</h3>
              
              <div className="space-y-4">
                {/* Super Admin */}
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                      SA
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Super Admin</p>
                      <p className="text-sm text-gray-500">Akses penuh: Semua fitur</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    Aktif
                  </span>
                </div>

                {/* Admin */}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Admin</p>
                      <p className="text-sm text-gray-500">Akses: Edit data, kelola tamu</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Aktif
                  </span>
                </div>

                {/* Editor */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                      E
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Editor</p>
                      <p className="text-sm text-gray-500">Akses: Edit konten saja</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">
                    Nonaktif
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Informasi Login</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Admin Password:</span>
                    <code className="bg-gray-200 px-2 py-0.5 rounded text-gray-700">admin123</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Super Admin Password:</span>
                    <code className="bg-gray-200 px-2 py-0.5 rounded text-gray-700">superadmin123</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Access Control */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Hak Akses</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-500 font-medium">Fitur</th>
                      <th className="text-center py-3 px-4 text-gray-500 font-medium">Super Admin</th>
                      <th className="text-center py-3 px-4 text-gray-500 font-medium">Admin</th>
                      <th className="text-center py-3 px-4 text-gray-500 font-medium">Editor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      'Edit Data Mempelai',
                      'Edit Data Acara',
                      'Kelola Tamu',
                      'Kirim WhatsApp',
                      'Pengaturan Website',
                      'Manajemen User',
                      'Analytics',
                      'Reset Data',
                    ].map((feature, idx) => (
                      <tr key={idx}>
                        <td className="py-3 px-4 text-gray-700">{feature}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-green-500">✓</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={idx < 4 ? 'text-green-500' : 'text-gray-300'}>
                            {idx < 4 ? '✓' : '✗'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={idx < 3 ? 'text-green-500' : 'text-gray-300'}>
                            {idx < 3 ? '✓' : '✗'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Total Pengunjung</p>
                <p className="text-3xl font-bold text-gray-800">{analytics.totalVisitors.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">↑ 12% dari minggu lalu</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Tingkat RSVP</p>
                <p className="text-3xl font-bold text-gray-800">{analytics.rsvpRate}%</p>
                <p className="text-xs text-green-600 mt-1">↑ 5% dari minggu lalu</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Open Rate</p>
                <p className="text-3xl font-bold text-gray-800">{analytics.openRate}%</p>
                <p className="text-xs text-green-600 mt-1">↑ 3% dari minggu lalu</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Rata-rata Waktu</p>
                <p className="text-3xl font-bold text-gray-800">{analytics.avgTimeOnSite}</p>
                <p className="text-xs text-gray-400 mt-1">menit per kunjungan</p>
              </div>
            </div>

            {/* RSVP Breakdown */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Breakdown RSVP</h3>
              <div className="space-y-4">
                {[
                  { label: 'Hadir', count: guests.filter(g => g.attendance === 'hadir').length, color: 'bg-green-500', total: guests.length },
                  { label: 'Tidak Hadir', count: guests.filter(g => g.attendance === 'tidak').length, color: 'bg-red-500', total: guests.length },
                  { label: 'Masih Ragu', count: guests.filter(g => g.attendance === 'ragu').length, color: 'bg-yellow-500', total: guests.length },
                  { label: 'Belum Konfirmasi', count: guests.filter(g => g.attendance === 'pending').length, color: 'bg-gray-400', total: guests.length },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium text-gray-800">{item.count} ({item.total > 0 ? Math.round((item.count / item.total) * 100) : 0}%)</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${item.total > 0 ? (item.count / item.total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guest Groups */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Tamu per Grup</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Keluarga', count: guests.filter(g => g.group === 'family').length, icon: '👨‍👩‍👧‍👦' },
                  { label: 'Teman', count: guests.filter(g => g.group === 'friend').length, icon: '👫' },
                  { label: 'Rekan Kerja', count: guests.filter(g => g.group === 'colleague').length, icon: '💼' },
                  { label: 'Lainnya', count: guests.filter(g => g.group === 'other').length, icon: '📋' },
                ].map((group) => (
                  <div key={group.label} className="text-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-3xl">{group.icon}</span>
                    <p className="text-2xl font-bold text-gray-800 mt-2">{group.count}</p>
                    <p className="text-sm text-gray-500">{group.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Informasi Sistem</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Versi Aplikasi</span>
                    <span className="text-sm font-medium text-gray-800">v2.0.0</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Status Website</span>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">Online</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Last Updated</span>
                    <span className="text-sm font-medium text-gray-800">{new Date().toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Storage Used</span>
                    <span className="text-sm font-medium text-gray-800">
                      {(new Blob([JSON.stringify(localStorage)]).size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Total Tamu</span>
                    <span className="text-sm font-medium text-gray-800">{guests.length}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Undangan Terkirim</span>
                    <span className="text-sm font-medium text-gray-800">{guests.filter(g => g.sent).length}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Ucapan Diterima</span>
                    <span className="text-sm font-medium text-gray-800">{guests.filter(g => g.message).length}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Framework</span>
                    <span className="text-sm font-medium text-gray-800">React + Vite</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-red-100">
              <h3 className="text-lg font-bold text-red-600 mb-4">⚠️ Zona Berbahaya</h3>
              <p className="text-sm text-gray-600 mb-4">Tindakan di bawah ini tidak dapat dibatalkan. Harap berhati-hati.</p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    if (confirm('Export semua data ke file JSON?')) {
                      const data = {
                        weddingData,
                        guests,
                        siteSettings,
                        exportedAt: new Date().toISOString(),
                      };
                      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'wedding-data-backup.json';
                      a.click();
                    }
                  }}
                  className="w-full md:w-auto px-4 py-2 border border-blue-200 text-blue-700 rounded-lg text-sm hover:bg-blue-50 transition-colors"
                >
                  📥 Export Data (Backup)
                </button>
                <button
                  onClick={handleReset}
                  className="w-full md:w-auto px-4 py-2 border border-red-200 text-red-700 rounded-lg text-sm hover:bg-red-50 transition-colors"
                >
                  🗑️ Reset Semua Data
                </button>
              </div>
            </div>

            {/* Changelog */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Changelog</h3>
              <div className="space-y-4">
                {[
                  { version: 'v2.0.0', date: '2025-01-15', changes: ['Tambah Super Admin Panel', 'Fitur Analytics', 'Export/Import data'] },
                  { version: 'v1.5.0', date: '2025-01-10', changes: ['Kelola tamu via WhatsApp', 'Form RSVP interaktif', 'Galeri foto'] },
                  { version: 'v1.0.0', date: '2025-01-01', changes: ['Rilis awal', 'Halaman undangan', 'Countdown timer'] },
                ].map((release) => (
                  <div key={release.version} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      <div className="w-0.5 flex-1 bg-gray-200 mt-1" />
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-800">{release.version}</span>
                        <span className="text-xs text-gray-400">{release.date}</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {release.changes.map((change, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-green-500">+</span> {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
