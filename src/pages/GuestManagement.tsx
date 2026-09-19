import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWedding, Guest } from '../context/WeddingContext';

export default function GuestManagement() {
  const { guests, addGuest, updateGuest, deleteGuest, sendWhatsApp, weddingData } = useWedding();
  const [showForm, setShowForm] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    group: 'friend' as Guest['group'],
    guests: 1,
  });

  const filteredGuests = guests.filter(guest => {
    const matchSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGroup = filterGroup === 'all' || guest.group === filterGroup;
    const matchStatus = filterStatus === 'all' || guest.attendance === filterStatus;
    return matchSearch && matchGroup && matchStatus;
  });

  const stats = {
    total: guests.length,
    hadir: guests.filter(g => g.attendance === 'hadir').length,
    tidak: guests.filter(g => g.attendance === 'tidak').length,
    ragu: guests.filter(g => g.attendance === 'ragu').length,
    pending: guests.filter(g => g.attendance === 'pending').length,
    sent: guests.filter(g => g.sent).length,
    unsent: guests.filter(g => !g.sent).length,
    totalGuests: guests.reduce((sum, g) => sum + g.guests, 0),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGuest) {
      updateGuest(editingGuest.id, formData);
      setEditingGuest(null);
    } else {
      const newGuest: Guest = {
        id: Date.now().toString(),
        ...formData,
        attendance: 'pending',
        message: '',
        sent: false,
        createdAt: new Date().toISOString().split('T')[0],
      };
      addGuest(newGuest);
    }
    setFormData({ name: '', phone: '', group: 'friend', guests: 1 });
    setShowForm(false);
  };

  const handleEdit = (guest: Guest) => {
    setEditingGuest(guest);
    setFormData({
      name: guest.name,
      phone: guest.phone,
      group: guest.group,
      guests: guest.guests,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus tamu ini?')) {
      deleteGuest(id);
    }
  };

  const handleSendAll = () => {
    const unsentGuests = guests.filter(g => !g.sent);
    if (unsentGuests.length === 0) {
      alert('Semua undangan sudah terkirim!');
      return;
    }
    if (confirm(`Akan mengirim ${unsentGuests.length} undangan via WhatsApp. Lanjutkan?`)) {
      sendWhatsApp(unsentGuests[0]);
    }
  };

  const getGroupLabel = (group: string) => {
    const labels: Record<string, string> = {
      family: 'Keluarga',
      friend: 'Teman',
      colleague: 'Rekan Kerja',
      other: 'Lainnya',
    };
    return labels[group] || group;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      hadir: 'bg-green-100 text-green-800',
      tidak: 'bg-red-100 text-red-800',
      ragu: 'bg-yellow-100 text-yellow-800',
      pending: 'bg-gray-100 text-gray-800',
    };
    const labels: Record<string, string> = {
      hadir: 'Hadir',
      tidak: 'Tidak Hadir',
      ragu: 'Ragu',
      pending: 'Belum Konfirmasi',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Kelola Tamu Undangan</h1>
              <p className="text-sm text-gray-500">Kirim undangan via WhatsApp</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/admin"
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/superadmin"
              className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Super Admin
            </Link>
            <Link
              to="/"
              className="px-4 py-2 text-sm bg-[#2d4a3e] text-white rounded-lg hover:bg-[#1a3a2e] transition-colors"
            >
              Lihat Undangan
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Tamu</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            <p className="text-xs text-gray-400">{stats.totalGuests} orang</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
            <p className="text-sm text-green-600">Konfirmasi Hadir</p>
            <p className="text-2xl font-bold text-green-700">{stats.hadir}</p>
            <p className="text-xs text-gray-400">tamu</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
            <p className="text-sm text-blue-600">Sudah Dikirim</p>
            <p className="text-2xl font-bold text-blue-700">{stats.sent}</p>
            <p className="text-xs text-gray-400">dari {stats.total} undangan</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
            <p className="text-sm text-orange-600">Belum Dikirim</p>
            <p className="text-2xl font-bold text-orange-700">{stats.unsent}</p>
            <p className="text-xs text-gray-400">undangan</p>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => { setShowForm(true); setEditingGuest(null); setFormData({ name: '', phone: '', group: 'friend', guests: 1 }); }}
              className="px-4 py-2 bg-[#2d4a3e] text-white rounded-lg text-sm font-medium hover:bg-[#1a3a2e] transition-colors"
            >
              + Tambah Tamu
            </button>
            <button
              onClick={handleSendAll}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Kirim Semua ({stats.unsent})
            </button>
            
            {/* Search & Filter */}
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Cari tamu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
              />
            </div>
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
            >
              <option value="all">Semua Grup</option>
              <option value="family">Keluarga</option>
              <option value="friend">Teman</option>
              <option value="colleague">Rekan Kerja</option>
              <option value="other">Lainnya</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Belum Konfirmasi</option>
              <option value="hadir">Hadir</option>
              <option value="tidak">Tidak Hadir</option>
              <option value="ragu">Ragu</option>
            </select>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {editingGuest ? 'Edit Tamu' : 'Tambah Tamu Baru'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Nama Tamu</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                    placeholder="Nama lengkap tamu"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">No. WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                    placeholder="628xxxxxxxxxx"
                  />
                  <p className="text-xs text-gray-400 mt-1">Format: 62xxx (tanpa + atau 0)</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Grup</label>
                  <select
                    value={formData.group}
                    onChange={(e) => setFormData({...formData, group: e.target.value as Guest['group']})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                  >
                    <option value="family">Keluarga</option>
                    <option value="friend">Teman</option>
                    <option value="colleague">Rekan Kerja</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Jumlah Tamu</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2d4a3e]"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditingGuest(null); }}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#2d4a3e] text-white rounded-lg text-sm font-medium hover:bg-[#1a3a2e] transition-colors"
                  >
                    {editingGuest ? 'Update' : 'Simpan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Guest List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Nama</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">No. WA</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Grup</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Terkirim</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredGuests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{guest.name}</p>
                        <p className="text-xs text-gray-400 md:hidden">{guest.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{guest.phone}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {getGroupLabel(guest.group)}
                      </span>
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(guest.attendance)}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {guest.sent ? (
                        <span className="text-xs text-green-600 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Ya
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Belum</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => sendWhatsApp(guest)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Kirim via WhatsApp"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEdit(guest)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(guest.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredGuests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">Tidak ada tamu ditemukan</p>
            </div>
          )}
        </div>

        {/* Preview Message */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Preview Pesan WhatsApp</h3>
          <div className="bg-green-50 rounded-lg p-4 font-mono text-sm text-gray-700 whitespace-pre-wrap border border-green-100">
            {(() => {
              const date = new Date(weddingData.weddingDate).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
              return `Assalamu'alaikum Warahmatullahi Wabarakatuh 🌸

Yth. Bapak/Ibu/Saudara/i
*[Nama Tamu]*

Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami:

💍 *${weddingData.groomName}*
   Putra dari ${weddingData.groomFather} & ${weddingData.groomMother}
   
   &
   
💍 *${weddingData.brideName}*
   Putri dari ${weddingData.brideFather} & ${weddingData.brideMother}

📅 *${date}*

🕌 *Akad Nikah*
   Pukul ${weddingData.akadTime}
   ${weddingData.akadVenue}
   ${weddingData.akadAddress}

🎊 *Resepsi*
   Pukul ${weddingData.receptionTime}
   ${weddingData.receptionVenue}
   ${weddingData.receptionAddress}

*${weddingData.groomName} & ${weddingData.brideName}* 🤍`;
            })()}
          </div>
        </div>
      </main>
    </div>
  );
}
