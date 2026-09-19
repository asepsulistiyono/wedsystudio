import { useState } from 'react';
import { useWedding } from '../context/WeddingContext';

interface SuperAdminProps {
  navigate: (path: string) => void;
}

export default function SuperAdmin({ navigate }: SuperAdminProps) {
  const { siteSettings, setSiteSettings, weddingData, guests, adminContact, setAdminContact, admins, superAdminCredentials, currentUser, logout, addAdmin, resetAdminPassword, deleteAdmin } = useWedding();
  const [editSettings, setEditSettings] = useState(siteSettings);
  const [isEditing, setIsEditing] = useState(false);
  const [editContact, setEditContact] = useState(adminContact);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [activeTab, setActiveTab] = useState<'settings' | 'contact' | 'users' | 'analytics' | 'system'>('settings');
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '', name: '' });

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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleResetAdminPassword = (id: string) => {
    if (confirm('Apakah Anda yakin ingin mereset password admin ke default (admin123)?')) {
      resetAdminPassword(id);
      alert('Password admin berhasil direset ke: admin123');
    }
  };

  const handleDeleteAdmin = (id: string) => {
    if (confirm('⚠️ PERINGATAN: Menghapus admin akan membuat sistem tidak bisa diakses oleh admin lagi. Apakah Anda yakin?')) {
      if (confirm('Konfirmasi sekali lagi: Hapus akun admin?')) {
        deleteAdmin(id);
        alert('Akun admin berhasil dihapus.');
      }
    }
  };

  const handleAddAdmin = () => {
    if (!newAdmin.username || !newAdmin.password || !newAdmin.name) {
      alert('Semua field harus diisi!');
      return;
    }
    
    const result = addAdmin(newAdmin.username, newAdmin.password, newAdmin.name);
    if (result.success) {
      alert('Admin berhasil ditambahkan!');
      setNewAdmin({ username: '', password: '', name: '' });
      setShowAddAdminForm(false);
    } else {
      alert(result.message || 'Gagal menambahkan admin');
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
            <a href="#/admin" className="text-white/70 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">Super Admin Panel</h1>
                <span className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full">PRO</span>
              </div>
              <p className="text-sm text-purple-200">
                Kelola seluruh website undangan • Login sebagai: <span className="font-semibold capitalize">{currentUser?.role}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#/admin"
              className="px-4 py-2 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Admin
            </a>
            <a
              href="#/admin/guests"
              className="px-4 py-2 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Tamu
            </a>
            <a
              href="#/"
              className="px-4 py-2 text-sm bg-white text-purple-700 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            >
              Lihat Undangan
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'settings', label: '⚙️ Pengaturan Website' },
            { id: 'contact', label: '📱 Kontak Admin' },
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
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-700">Daftar Admin ({admins.length})</h4>
                  <button
                    onClick={() => setShowAddAdminForm(!showAddAdminForm)}
                    className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    {showAddAdminForm ? '✖️ Batal' : '➕ Tambah Admin'}
                  </button>
                </div>

                {/* Add Admin Form */}
                {showAddAdminForm && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h5 className="text-sm font-medium text-green-800 mb-3">Tambah Admin Baru</h5>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-600 block mb-1">Nama Lengkap</label>
                        <input
                          type="text"
                          value={newAdmin.name}
                          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500"
                          placeholder="Nama admin"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 block mb-1">Username</label>
                        <input
                          type="text"
                          value={newAdmin.username}
                          onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500"
                          placeholder="Username untuk login"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 block mb-1">Password</label>
                        <input
                          type="text"
                          value={newAdmin.password}
                          onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500"
                          placeholder="Password untuk login"
                        />
                      </div>
                      <button
                        onClick={handleAddAdmin}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                      >
                        💾 Simpan Admin Baru
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3 text-sm">
                  {/* Super Admin Account */}
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-purple-800">👑 Super Admin</p>
                      <button
                        onClick={() => setShowPasswords({ ...showPasswords, 'superadmin': !showPasswords['superadmin'] })}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                      >
                        {showPasswords['superadmin'] ? '🙈 Sembunyikan' : '👁️ Lihat'} Password
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Username:</span>
                      <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">{superAdminCredentials.username}</code>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-gray-500">Password:</span>
                      <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-mono">
                        {showPasswords['superadmin'] ? superAdminCredentials.password : '••••••••'}
                      </code>
                    </div>
                  </div>

                  {/* Admin Accounts */}
                  {admins.map((admin) => (
                    <div key={admin.id} className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium text-gray-700">👤 {admin.name}</p>
                          <p className="text-xs text-gray-500">Dibuat: {new Date(admin.createdAt).toLocaleDateString('id-ID')}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setShowPasswords({ ...showPasswords, [admin.id]: !showPasswords[admin.id] })}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                          >
                            {showPasswords[admin.id] ? '🙈' : '👁️'}
                          </button>
                          <button
                            onClick={() => handleResetAdminPassword(admin.id)}
                            className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                          >
                            🔄
                          </button>
                          <button
                            onClick={() => handleDeleteAdmin(admin.id)}
                            className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Username:</span>
                        <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">{admin.username}</code>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-gray-500">Password:</span>
                        <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-mono">
                          {showPasswords[admin.id] ? admin.password : '••••••••'}
                        </code>
                      </div>
                    </div>
                  ))}

                  {admins.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      Belum ada admin. Klik "Tambah Admin" untuk membuat admin baru.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab - Pengaturan Kontak Admin */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">📱 Pengaturan Kontak Admin</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Atur informasi kontak admin yang akan ditampilkan di halaman login
                  </p>
                </div>
                {!isEditingContact ? (
                  <button
                    onClick={() => setIsEditingContact(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                  >
                    Edit Kontak
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setEditContact(adminContact); setIsEditingContact(false); }}
                      className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => { 
                        setAdminContact(editContact); 
                        setIsEditingContact(false);
                        alert('Kontak admin berhasil disimpan!');
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                    >
                      Simpan
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Informasi Penting</p>
                      <p className="text-blue-700">
                        Kontak admin ini akan ditampilkan di halaman login ketika tamu yang belum memiliki akun ingin meminta akses. 
                        Pastikan nomor WhatsApp aktif dan dapat dihubungi.
                      </p>
                    </div>
                  </div>
                </div>

                {/* No. WhatsApp Admin */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    📞 Nomor WhatsApp Admin
                  </label>
                  {isEditingContact ? (
                    <input
                      type="tel"
                      value={editContact.phone}
                      onChange={(e) => setEditContact({...editContact, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      placeholder="628xxxxxxxxxx"
                    />
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-800">{adminContact.phone}</p>
                        <p className="text-xs text-gray-500">Format: 62xxx (tanpa + atau 0)</p>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Contoh: 6281234567890 (untuk nomor 081234567890)
                  </p>
                </div>

                {/* Nama Admin */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    👤 Nama Admin
                  </label>
                  {isEditingContact ? (
                    <input
                      type="text"
                      value={editContact.name}
                      onChange={(e) => setEditContact({...editContact, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      placeholder="Nama admin yang akan ditampilkan"
                    />
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold text-gray-800">{adminContact.name}</p>
                    </div>
                  )}
                </div>

                {/* Pesan Default WhatsApp */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    💬 Pesan Default WhatsApp
                  </label>
                  {isEditingContact ? (
                    <textarea
                      rows={4}
                      value={editContact.message}
                      onChange={(e) => setEditContact({...editContact, message: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 resize-none"
                      placeholder="Pesan yang akan otomatis terisi ketika tamu menghubungi admin via WhatsApp"
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-800 italic">"{adminContact.message}"</p>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Pesan ini akan otomatis terisi ketika tamu klik tombol "Hubungi via WhatsApp" di halaman login
                  </p>
                </div>

                {/* Preview */}
                {!isEditingContact && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-green-800 mb-3">👁️ Preview di Halaman Login</h4>
                    <div className="bg-white rounded-lg p-4 border border-green-100">
                      <p className="text-sm text-gray-700 mb-3">
                        Ketika tamu klik "Hubungi via WhatsApp", akan membuka:
                      </p>
                      <div className="bg-gray-50 rounded p-3 font-mono text-xs text-gray-600 break-all">
                        https://wa.me/{adminContact.phone}?text={encodeURIComponent(adminContact.message)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab - Manajemen User */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Daftar Admin */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Daftar Admin ({admins.length})</h3>
                <button
                  onClick={() => setShowAddAdminForm(!showAddAdminForm)}
                  className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  {showAddAdminForm ? '✖️ Batal' : '➕ Tambah Admin'}
                </button>
              </div>

              {/* Add Admin Form */}
              {showAddAdminForm && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h5 className="text-sm font-medium text-green-800 mb-3">Tambah Admin Baru</h5>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        value={newAdmin.name}
                        onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500"
                        placeholder="Nama admin"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Username</label>
                      <input
                        type="text"
                        value={newAdmin.username}
                        onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500"
                        placeholder="Username untuk login"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Password</label>
                      <input
                        type="text"
                        value={newAdmin.password}
                        onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500"
                        placeholder="Password untuk login"
                      />
                    </div>
                    <button
                      onClick={handleAddAdmin}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                    >
                      💾 Simpan Admin Baru
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3 text-sm">
                {/* Super Admin Account */}
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-purple-800">👑 Super Admin</p>
                    <button
                      onClick={() => setShowPasswords({ ...showPasswords, 'superadmin': !showPasswords['superadmin'] })}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                    >
                      {showPasswords['superadmin'] ? '🙈 Sembunyikan' : '👁️ Lihat'} Password
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Username:</span>
                    <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">{superAdminCredentials.username}</code>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-500">Password:</span>
                    <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-mono">
                      {showPasswords['superadmin'] ? superAdminCredentials.password : '••••••••'}
                    </code>
                  </div>
                </div>

                {/* Admin Accounts */}
                {admins.map((admin) => (
                  <div key={admin.id} className="p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-700">👤 {admin.name}</p>
                        <p className="text-xs text-gray-500">Dibuat: {new Date(admin.createdAt).toLocaleDateString('id-ID')}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowPasswords({ ...showPasswords, [admin.id]: !showPasswords[admin.id] })}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                        >
                          {showPasswords[admin.id] ? '🙈' : '👁️'}
                        </button>
                        <button
                          onClick={() => handleResetAdminPassword(admin.id)}
                          className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                        >
                          🔄
                        </button>
                        <button
                          onClick={() => handleDeleteAdmin(admin.id)}
                          className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Username:</span>
                      <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">{admin.username}</code>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-gray-500">Password:</span>
                      <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-mono">
                        {showPasswords[admin.id] ? admin.password : '••••••••'}
                      </code>
                    </div>
                  </div>
                ))}

                {admins.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    Belum ada admin. Klik "Tambah Admin" untuk membuat admin baru.
                  </div>
                )}
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
