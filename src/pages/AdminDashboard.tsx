import { useState } from 'react';
import { useWedding, WeddingData, GalleryPhoto } from '../context/WeddingContext';
import { getReligiousContent } from '../utils/translations';
import { getDataUrlSize, formatFileSize } from '../utils/imageCompressor';

interface AdminDashboardProps {
  navigate: (path: string) => void;
}

export default function AdminDashboard({ navigate }: AdminDashboardProps) {
  const { weddingData, setWeddingData, guests, siteSettings, currentUser, logout } = useWedding();
  const [activeTab, setActiveTab] = useState<'overview' | 'couple' | 'photos' | 'event' | 'content' | 'settings'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(weddingData);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSave = () => {
    setWeddingData(editData);
    setIsEditing(false);
    alert('Data berhasil disimpan!');
  };

  const handleCancel = () => {
    setEditData(weddingData);
    setIsEditing(false);
  };

  const stats = {
    totalGuests: guests.length,
    confirmed: guests.filter(g => g.attendance === 'hadir').length,
    totalPeople: guests.reduce((sum, g) => sum + g.guests, 0),
    sentInvitations: guests.filter(g => g.sent).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
            <p className="text-sm text-gray-500">
              Kelola data undangan pernikahan • Login sebagai: <span className="font-semibold capitalize">{currentUser?.role}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#/admin/guests"
              className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Kelola Tamu
            </a>
            {currentUser?.role === 'superadmin' && (
              <a
                href="#/superadmin"
                className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Super Admin
              </a>
            )}
            <a
              href="#/"
              className="px-4 py-2 text-sm bg-[#2d4a3e] text-white rounded-lg hover:bg-[#1a3a2e] transition-colors"
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
            { id: 'overview', label: 'Overview' },
            { id: 'couple', label: 'Data Mempelai' },
            { id: 'photos', label: '📸 Foto' },
            { id: 'event', label: 'Data Acara' },
            { id: 'content', label: 'Konten' },
            { id: 'settings', label: '⚙️ Bahasa & Agama' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setIsEditing(false); }}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#2d4a3e] text-[#2d4a3e]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Tamu</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalGuests}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Konfirmasi Hadir</p>
                    <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Orang</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalPeople}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Undangan Terkirim</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.sentInvitations}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Aksi Cepat</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('couple')}
                  className="p-4 border border-gray-200 rounded-lg hover:border-[#2d4a3e] hover:bg-green-50 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💑</span>
                    <div>
                      <p className="font-medium text-gray-800">Edit Data Mempelai</p>
                      <p className="text-sm text-gray-500">Nama, orang tua, dll</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('event')}
                  className="p-4 border border-gray-200 rounded-lg hover:border-[#2d4a3e] hover:bg-blue-50 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="font-medium text-gray-800">Edit Data Acara</p>
                      <p className="text-sm text-gray-500">Tanggal, waktu, tempat</p>
                    </div>
                  </div>
                </button>
                <a
                  href="#/admin/guests"
                  className="p-4 border border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📱</span>
                    <div>
                      <p className="font-medium text-gray-800">Kelola Tamu</p>
                      <p className="text-sm text-gray-500">Kirim undangan via WA</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Wedding Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Ringkasan Pernikahan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Mempelai Pria</span>
                    <span className="font-medium text-gray-800">{weddingData.groomName}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Mempelai Wanita</span>
                    <span className="font-medium text-gray-800">{weddingData.brideName}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Tanggal</span>
                    <span className="font-medium text-gray-800">
                      {new Date(weddingData.weddingDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Akad</span>
                    <span className="font-medium text-gray-800">{weddingData.akadVenue}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Resepsi</span>
                    <span className="font-medium text-gray-800">{weddingData.receptionVenue}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Status Website</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Aktif</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Couple Data Tab */}
        {activeTab === 'couple' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">Data Mempelai</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-[#2d4a3e] text-white rounded-lg text-sm hover:bg-[#1a3a2e] transition-colors"
                >
                  Edit Data
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mempelai Pria */}
              <div className="space-y-4">
                <h4 className="font-medium text-[#2d4a3e] text-lg border-b border-gray-100 pb-2">Mempelai Pria</h4>
                
                {/* Upload Foto Mempelai Pria */}
                <div>
                  <label className="text-sm text-gray-600 block mb-2">Foto Mempelai</label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#c9a96e] bg-gray-100 flex items-center justify-center">
                      {weddingData.groomPhoto ? (
                        <img src={weddingData.groomPhoto} alt="Groom" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl text-gray-400">{weddingData.groomInitial}</span>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setWeddingData({ ...weddingData, groomPhoto: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2d4a3e] file:text-white hover:file:bg-[#1a3a2e] file:cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 block mb-1">Nama Lengkap</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.groomName}
                      onChange={(e) => setEditData({...editData, groomName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{weddingData.groomName}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Inisial</label>
                  {isEditing ? (
                    <input
                      type="text"
                      maxLength={1}
                      value={editData.groomInitial}
                      onChange={(e) => setEditData({...editData, groomInitial: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                    />
                  ) : (
                    <p className="text-gray-800">{weddingData.groomInitial}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Nama Ayah</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.groomFather}
                      onChange={(e) => setEditData({...editData, groomFather: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                    />
                  ) : (
                    <p className="text-gray-800">{weddingData.groomFather}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Nama Ibu</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.groomMother}
                      onChange={(e) => setEditData({...editData, groomMother: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                    />
                  ) : (
                    <p className="text-gray-800">{weddingData.groomMother}</p>
                  )}
                </div>
              </div>

              {/* Mempelai Wanita */}
              <div className="space-y-4">
                <h4 className="font-medium text-[#2d4a3e] text-lg border-b border-gray-100 pb-2">Mempelai Wanita</h4>
                
                {/* Upload Foto Mempelai Wanita */}
                <div>
                  <label className="text-sm text-gray-600 block mb-2">Foto Mempelai</label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#c9a96e] bg-gray-100 flex items-center justify-center">
                      {weddingData.bridePhoto ? (
                        <img src={weddingData.bridePhoto} alt="Bride" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl text-gray-400">{weddingData.brideInitial}</span>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setWeddingData({ ...weddingData, bridePhoto: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2d4a3e] file:text-white hover:file:bg-[#1a3a2e] file:cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 block mb-1">Nama Lengkap</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.brideName}
                      onChange={(e) => setEditData({...editData, brideName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{weddingData.brideName}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Inisial</label>
                  {isEditing ? (
                    <input
                      type="text"
                      maxLength={1}
                      value={editData.brideInitial}
                      onChange={(e) => setEditData({...editData, brideInitial: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                    />
                  ) : (
                    <p className="text-gray-800">{weddingData.brideInitial}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Nama Ayah</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.brideFather}
                      onChange={(e) => setEditData({...editData, brideFather: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                    />
                  ) : (
                    <p className="text-gray-800">{weddingData.brideFather}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Nama Ibu</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.brideMother}
                      onChange={(e) => setEditData({...editData, brideMother: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                    />
                  ) : (
                    <p className="text-gray-800">{weddingData.brideMother}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Event Data Tab */}
        {activeTab === 'event' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">Data Acara</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-[#2d4a3e] text-white rounded-lg text-sm hover:bg-[#1a3a2e] transition-colors"
                >
                  Edit Data
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
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
              {/* Tanggal */}
              <div>
                <label className="text-sm text-gray-600 block mb-1">Tanggal Pernikahan</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editData.weddingDate}
                    onChange={(e) => setEditData({...editData, weddingDate: e.target.value})}
                    className="w-full md:w-1/2 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">
                    {new Date(weddingData.weddingDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Akad */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-[#2d4a3e]">🕌 Akad Nikah</h4>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Waktu</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.akadTime}
                        onChange={(e) => setEditData({...editData, akadTime: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                        placeholder="08.00 WIB - Selesai"
                      />
                    ) : (
                      <p className="text-gray-800">{weddingData.akadTime}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Tempat</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.akadVenue}
                        onChange={(e) => setEditData({...editData, akadVenue: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                      />
                    ) : (
                      <p className="text-gray-800">{weddingData.akadVenue}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Alamat</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.akadAddress}
                        onChange={(e) => setEditData({...editData, akadAddress: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                      />
                    ) : (
                      <p className="text-gray-800">{weddingData.akadAddress}</p>
                    )}
                  </div>
                </div>

                {/* Resepsi */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-[#2d4a3e]">🎊 Resepsi</h4>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Waktu</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.receptionTime}
                        onChange={(e) => setEditData({...editData, receptionTime: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                        placeholder="11.00 - 14.00 WIB"
                      />
                    ) : (
                      <p className="text-gray-800">{weddingData.receptionTime}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Tempat</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.receptionVenue}
                        onChange={(e) => setEditData({...editData, receptionVenue: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                      />
                    ) : (
                      <p className="text-gray-800">{weddingData.receptionVenue}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Alamat</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.receptionAddress}
                        onChange={(e) => setEditData({...editData, receptionAddress: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                      />
                    ) : (
                      <p className="text-gray-800">{weddingData.receptionAddress}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Map URL */}
              <div>
                <label className="text-sm text-gray-600 block mb-1">Link Google Maps</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={editData.mapUrl}
                    onChange={(e) => setEditData({...editData, mapUrl: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                    placeholder="https://maps.google.com/..."
                  />
                ) : (
                  <p className="text-gray-800">{weddingData.mapUrl}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <PhotosTab 
            weddingData={weddingData} 
            setWeddingData={setWeddingData} 
          />
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">Konten Undangan</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-[#2d4a3e] text-white rounded-lg text-sm hover:bg-[#1a3a2e] transition-colors"
                >
                  Edit Data
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
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
              <div>
                <label className="text-sm text-gray-600 block mb-1">Bismillah</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.bismillah}
                    onChange={(e) => setEditData({...editData, bismillah: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                  />
                ) : (
                  <p className="text-gray-800 font-elegant">{weddingData.bismillah}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Ayat / Kutipan</label>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={editData.quote}
                    onChange={(e) => setEditData({...editData, quote: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e] resize-none"
                  />
                ) : (
                  <p className="text-gray-800 font-elegant">{weddingData.quote}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Sumber Kutipan</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.quoteSource}
                    onChange={(e) => setEditData({...editData, quoteSource: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                  />
                ) : (
                  <p className="text-gray-800">{weddingData.quoteSource}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Teks Penutup</label>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={editData.closingText}
                    onChange={(e) => setEditData({...editData, closingText: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e] resize-none"
                  />
                ) : (
                  <p className="text-gray-800">{weddingData.closingText}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab - Language & Religion */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Pengaturan Bahasa & Agama</h3>
              
              <div className="space-y-6">
                {/* Language Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-3">
                    🌐 Bahasa Undangan
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setEditData({...editData, language: 'id'})}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        editData.language === 'id'
                          ? 'border-[#2d4a3e] bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">🇮🇩</div>
                      <p className="font-medium text-gray-800">Bahasa Indonesia</p>
                      <p className="text-xs text-gray-500 mt-1">Undangan dalam bahasa Indonesia</p>
                    </button>
                    <button
                      onClick={() => setEditData({...editData, language: 'en'})}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        editData.language === 'en'
                          ? 'border-[#2d4a3e] bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">🇬🇧</div>
                      <p className="font-medium text-gray-800">English</p>
                      <p className="text-xs text-gray-500 mt-1">Invitation in English</p>
                    </button>
                  </div>
                </div>

                {/* Religion Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-3">
                    🕌 Format Agama
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { id: 'islam', icon: '☪️', name: 'Islam', desc: 'Format Islami' },
                      { id: 'kristen', icon: '✝️', name: 'Kristen', desc: 'Format Kristen' },
                      { id: 'hindu', icon: '🕉️', name: 'Hindu', desc: 'Format Hindu' },
                      { id: 'buddha', icon: '☸️', name: 'Buddha', desc: 'Format Buddha' },
                      { id: 'konghucu', icon: '☯️', name: 'Konghucu', desc: 'Format Konghucu' },
                      { id: 'universal', icon: '♾️', name: 'Universal', desc: 'Format Umum' },
                    ].map((religion) => (
                      <button
                        key={religion.id}
                        onClick={() => setEditData({...editData, religion: religion.id as any})}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          editData.religion === religion.id
                            ? 'border-[#2d4a3e] bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-2">{religion.icon}</div>
                        <p className="font-medium text-gray-800">{religion.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{religion.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Preview Konten</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-500">Pembukaan:</span>
                      <p className="text-gray-800 mt-1 whitespace-pre-line">
                        {getReligiousContent(editData.religion, editData.language).opening}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Kutipan:</span>
                      <p className="text-gray-800 mt-1 italic">
                        "{getReligiousContent(editData.religion, editData.language).quote}"
                      </p>
                      <p className="text-gray-600 text-xs mt-1">
                        — {getReligiousContent(editData.religion, editData.language).quoteSource}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Penutup:</span>
                      <p className="text-gray-800 mt-1 whitespace-pre-line">
                        {getReligiousContent(editData.religion, editData.language).closing}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setEditData(weddingData)}
                    className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => {
                      setWeddingData(editData);
                      alert('Pengaturan bahasa dan agama berhasil disimpan!');
                    }}
                    className="px-6 py-2 bg-[#2d4a3e] text-white rounded-lg text-sm hover:bg-[#1a3a2e] transition-colors"
                  >
                    Simpan Pengaturan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ============ PHOTOS TAB COMPONENT ============
function PhotosTab({ weddingData, setWeddingData }: { weddingData: WeddingData; setWeddingData: (data: WeddingData) => void }) {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Error boundary
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">Terjadi kesalahan: {error}</p>
        <button 
          onClick={() => setError(null)}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  const handleGroomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        try {
          setWeddingData({ ...weddingData, groomPhoto: reader.result as string });
          setMessage({ type: 'success', text: 'Foto mempelai pria berhasil diupload!' });
          setTimeout(() => setMessage(null), 3000);
        } catch (err) {
          setError('Gagal menyimpan foto mempelai pria');
        }
      };
      reader.onerror = () => setError('Gagal membaca file');
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Gagal mengupload foto');
    }
  };

  const handleBrideUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        try {
          setWeddingData({ ...weddingData, bridePhoto: reader.result as string });
          setMessage({ type: 'success', text: 'Foto mempelai wanita berhasil diupload!' });
          setTimeout(() => setMessage(null), 3000);
        } catch (err) {
          setError('Gagal menyimpan foto mempelai wanita');
        }
      };
      reader.onerror = () => setError('Gagal membaca file');
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Gagal mengupload foto');
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (!files) return;

      const newPhotos: GalleryPhoto[] = [];
      let loaded = 0;

      Array.from(files).forEach((file, i) => {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            newPhotos.push({
              id: Date.now().toString() + i,
              dataUrl: reader.result as string,
              caption: '',
              createdAt: new Date().toISOString(),
            });
            loaded++;
            if (loaded === files.length) {
              setWeddingData({ 
                ...weddingData, 
                galleryPhotos: [...weddingData.galleryPhotos, ...newPhotos] 
              });
              setMessage({ type: 'success', text: `${newPhotos.length} foto berhasil diupload!` });
              setTimeout(() => setMessage(null), 3000);
            }
          } catch (err) {
            setError('Gagal menyimpan foto galeri');
          }
        };
        reader.onerror = () => setError('Gagal membaca file');
        reader.readAsDataURL(file);
      });
    } catch (err) {
      setError('Gagal mengupload foto');
    }
  };

  const deleteGalleryPhoto = (id: string) => {
    if (confirm('Hapus foto ini dari galeri?')) {
      setWeddingData({
        ...weddingData,
        galleryPhotos: weddingData.galleryPhotos.filter(p => p.id !== id),
      });
      setMessage({ type: 'success', text: 'Foto berhasil dihapus' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const updateGalleryCaption = (id: string, caption: string) => {
    setWeddingData({
      ...weddingData,
      galleryPhotos: weddingData.galleryPhotos.map(p => p.id === id ? { ...p, caption } : p),
    });
  };

  const removeProfilePhoto = (type: 'groom' | 'bride') => {
    if (type === 'groom') {
      setWeddingData({ ...weddingData, groomPhoto: '' });
    } else {
      setWeddingData({ ...weddingData, bridePhoto: '' });
    }
    setMessage({ type: 'success', text: 'Foto berhasil dihapus' });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
          {message.text}
        </div>
      )}

      {/* Profile Photos */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Foto Mempelai</h3>
        <p className="text-sm text-gray-500 mb-6">
          Upload foto profil mempelai. Foto akan dikompresi otomatis (max 400x400px, kualitas 60%).
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Groom Photo */}
          <div className="text-center">
            <h4 className="font-medium text-[#2d4a3e] mb-4">Mempelai Pria</h4>
            <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#c9a96e] shadow-lg bg-gray-100">
              {weddingData.groomPhoto ? (
                <img src={weddingData.groomPhoto} alt="Groom" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleGroomUpload}
              className="block mx-auto mb-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2d4a3e] file:text-white hover:file:bg-[#1a3a2e] file:cursor-pointer"
            />
            {weddingData.groomPhoto && (
              <button
                onClick={() => removeProfilePhoto('groom')}
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
              >
                Hapus Foto
              </button>
            )}
          </div>

          {/* Bride Photo */}
          <div className="text-center">
            <h4 className="font-medium text-[#2d4a3e] mb-4">Mempelai Wanita</h4>
            <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#c9a96e] shadow-lg bg-gray-100">
              {weddingData.bridePhoto ? (
                <img src={weddingData.bridePhoto} alt="Bride" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleBrideUpload}
              className="block mx-auto mb-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2d4a3e] file:text-white hover:file:bg-[#1a3a2e] file:cursor-pointer"
            />
            {weddingData.bridePhoto && (
              <button
                onClick={() => removeProfilePhoto('bride')}
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
              >
                Hapus Foto
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Photos */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800">Galeri Foto</h3>
          <span className="text-sm text-gray-500">
            {weddingData.galleryPhotos.length} foto
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Upload foto pre-wedding atau momen lainnya. Foto akan dikompresi otomatis (max 800x800px, kualitas 55%).
        </p>

        {/* Upload Button */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryUpload}
          className="block mb-6 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2d4a3e] file:text-white hover:file:bg-[#1a3a2e] file:cursor-pointer"
        />

        {/* Gallery Grid */}
        {weddingData.galleryPhotos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {weddingData.galleryPhotos.map((photo) => (
              <div key={photo.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <img src={photo.dataUrl} alt={photo.caption} className="w-full h-full object-cover" />
                </div>
                <input
                  type="text"
                  value={photo.caption}
                  onChange={(e) => updateGalleryCaption(photo.id, e.target.value)}
                  placeholder="Caption..."
                  className="mt-2 w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:border-[#2d4a3e]"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => deleteGalleryPhoto(photo.id)}
                    className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {formatFileSize(getDataUrlSize(photo.dataUrl))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500">Belum ada foto di galeri</p>
            <p className="text-sm text-gray-400 mt-1">Klik tombol upload untuk menambahkan foto</p>
          </div>
        )}
      </div>

      {/* Storage Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Info Kompresi
        </h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p>• Foto profil: max 400x400px, kualitas JPEG 60%</p>
          <p>• Foto galeri: max 800x800px, kualitas JPEG 55%</p>
          <p>• Semua foto dikompresi otomatis untuk menghemat storage</p>
          <p>• Total ukuran foto saat ini: {formatFileSize(
            (weddingData.groomPhoto ? getDataUrlSize(weddingData.groomPhoto) : 0) +
            (weddingData.bridePhoto ? getDataUrlSize(weddingData.bridePhoto) : 0) +
            weddingData.galleryPhotos.reduce((sum, p) => sum + getDataUrlSize(p.dataUrl), 0)
          )}</p>
        </div>
      </div>
    </div>
  );
}
