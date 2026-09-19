# 📱 Pengaturan Kontak Admin

## 🎯 Fitur Baru

Fitur pengaturan kontak admin telah ditambahkan di panel Super Admin dengan tab terpisah yang lebih mudah diakses.

## 📍 Lokasi

**Panel Super Admin** → Tab **"📱 Kontak Admin"**

## ✨ Fitur yang Tersedia

### 1. 📞 Nomor WhatsApp Admin
- Input nomor WhatsApp admin yang akan ditampilkan di halaman login
- Format: `628xxxxxxxxxx` (tanpa + atau 0)
- Contoh: `6281234567890` (untuk nomor 081234567890)
- Ditampilkan dengan ikon WhatsApp hijau

### 2. 👤 Nama Admin
- Input nama admin yang akan ditampilkan
- Ditampilkan dengan ikon user biru
- Membantu tamu mengetahui siapa yang akan mereka hubungi

### 3. 💬 Pesan Default WhatsApp
- Input pesan default yang akan otomatis terisi ketika tamu klik "Hubungi via WhatsApp"
- Ditampilkan dalam format italic dengan kutipan
- Membantu tamu memahami tujuan kontak

### 4. 👁️ Preview Link WhatsApp
- Menampilkan preview link WhatsApp yang akan dibuka
- Format: `https://wa.me/{nomor}?text={pesan}`
- Membantu verifikasi bahwa link sudah benar

## 🎨 Tampilan UI

### Tab "📱 Kontak Admin"
- Header dengan judul dan deskripsi
- Tombol "Edit Kontak" (hijau) untuk mode edit
- Tombol "Batal" dan "Simpan" saat mode edit aktif
- Info box biru dengan penjelasan pentingnya kontak admin
- 3 section input dengan ikon:
  - 📞 Nomor WhatsApp (hijau)
  - 👤 Nama Admin (biru)
  - 💬 Pesan Default (abu-abu)
- Preview link WhatsApp di bagian bawah

## 📋 Cara Menggunakan

### Langkah 1: Login sebagai Super Admin
```
URL: https://your-domain.com/#/login
Username: superadmin
Password: super123
```

### Langkah 2: Buka Tab "📱 Kontak Admin"
1. Klik tab **"📱 Kontak Admin"** di navbar
2. Lihat informasi kontak admin saat ini

### Langkah 3: Edit Kontak Admin
1. Klik tombol **"Edit Kontak"** (hijau)
2. Isi atau ubah:
   - **No. WhatsApp Admin**: Masukkan nomor WhatsApp (format: 628xxx)
   - **Nama Admin**: Masukkan nama admin
   - **Pesan Default WhatsApp**: Masukkan pesan yang akan otomatis terisi
3. Klik tombol **"Simpan"** (hijau)
4. Tunggu alert: "Kontak admin berhasil disimpan!"

### Langkah 4: Verifikasi
1. Lihat preview link WhatsApp di bagian bawah
2. Pastikan format nomor sudah benar (628xxx)
3. Pastikan pesan default sudah sesuai

## 🔗 Cara Kerja di Halaman Login

Ketika tamu membuka halaman login dan belum memiliki akun:

1. Tamu melihat box kuning "Belum punya akun?"
2. Tamu klik tombol **"Hubungi via WhatsApp"** (hijau)
3. Sistem membuka WhatsApp dengan:
   - Nomor: `{adminContact.phone}`
   - Pesan: `{adminContact.message}` (sudah terisi otomatis)
4. Tamu bisa langsung chat dengan admin

### Contoh Link WhatsApp:
```
https://wa.me/6281234567890?text=Assalamu'alaikum%2C%20saya%20ingin%20meminta%20akses%20login%20untuk%20undangan%20pernikahan.
```

## 💡 Tips Penggunaan

### Format Nomor WhatsApp:
✅ **Benar**: `6281234567890` (untuk 081234567890)
❌ **Salah**: `081234567890` (menggunakan 0 di depan)
❌ **Salah**: `+6281234567890` (menggunakan +)
❌ **Salah**: `62-812-3456-7890` (menggunakan dash)

### Pesan Default yang Baik:
```
✅ "Assalamu'alaikum, saya ingin meminta akses login untuk undangan pernikahan."
✅ "Halo, saya tamu undangan dan ingin meminta akses untuk melihat undangan."
✅ "Selamat siang, saya ingin konfirmasi kehadiran dan meminta akses login."
```

### Nama Admin:
```
✅ "Admin Undangan"
✅ "Panitia Pernikahan"
✅ "Budi Santoso"
✅ "Contact Person"
```

## 🔐 Keamanan

- Nomor WhatsApp hanya ditampilkan di halaman login
- Tidak ada validasi format nomor (admin bertanggung jawab)
- Pesan default bisa diubah kapan saja
- Perubahan langsung berlaku setelah disimpan

## 📊 Struktur Data

```typescript
interface AdminContact {
  phone: string;    // Nomor WhatsApp (format: 628xxx)
  name: string;     // Nama admin
  message: string;  // Pesan default WhatsApp
}
```

### Default Values:
```javascript
{
  phone: '6281234567890',
  name: 'Admin Undangan',
  message: 'Assalamu\'alaikum, saya ingin meminta akses login untuk undangan pernikahan.'
}
```

## 🎯 Keuntungan

### Untuk Tamu:
✅ Mudah menghubungi admin untuk minta akses
✅ Pesan sudah terisi otomatis, tidak perlu mengetik
✅ Langsung terhubung ke WhatsApp admin
✅ Tidak perlu mencari nomor kontak

### Untuk Admin:
✅ Mudah mengatur kontak yang ditampilkan
✅ Bisa update nomor WhatsApp kapan saja
✅ Bisa ubah pesan default sesuai kebutuhan
✅ Kontrol penuh atas informasi kontak

### Untuk Sistem:
✅ Terintegrasi dengan halaman login
✅ Otomatis generate link WhatsApp
✅ Data tersimpan di localStorage
✅ Mudah di-maintain

## 🐛 Troubleshooting

### Masalah: Nomor WhatsApp tidak muncul di halaman login

**Solusi:**
1. Cek di Super Admin → Tab "📱 Kontak Admin"
2. Pastikan nomor sudah diisi
3. Klik "Simpan" jika sudah edit
4. Refresh halaman login

### Masalah: Link WhatsApp tidak bisa dibuka

**Solusi:**
1. Cek format nomor WhatsApp
2. Pastikan format: `628xxx` (tanpa + atau 0)
3. Contoh benar: `6281234567890`
4. Update nomor jika format salah

### Masalah: Pesan default tidak terisi otomatis

**Solusi:**
1. Cek di Super Admin → Tab "📱 Kontak Admin"
2. Pastikan pesan default sudah diisi
3. Klik "Simpan" jika sudah edit
4. Refresh halaman login

## 📝 Contoh Penggunaan

### Skenario 1: Ganti Nomor WhatsApp Admin
```
1. Super Admin login
2. Buka tab "📱 Kontak Admin"
3. Klik "Edit Kontak"
4. Ubah nomor: 6281234567890 → 6289876543210
5. Klik "Simpan"
6. Nomor baru langsung aktif di halaman login
```

### Skenario 2: Ubah Pesan Default
```
1. Super Admin login
2. Buka tab "📱 Kontak Admin"
3. Klik "Edit Kontak"
4. Ubah pesan: "Halo, saya ingin minta akses..."
5. Klik "Simpan"
6. Pesan baru langsung aktif di halaman login
```

### Skenario 3: Ganti Nama Admin
```
1. Super Admin login
2. Buka tab "📱 Kontak Admin"
3. Klik "Edit Kontak"
4. Ubah nama: "Admin Undangan" → "Panitia Pernikahan Ahmad & Fatimah"
5. Klik "Simpan"
6. Nama baru langsung aktif di halaman login
```

## 🎨 Tampilan di Halaman Login

Ketika tamu membuka halaman login, mereka akan melihat:

```
┌─────────────────────────────────────────┐
│  ⚠️ Belum punya akun?                    │
│                                         │
│  Silakan hubungi admin untuk            │
│  mendapatkan akses login.               │
│                                         │
│  [📱 Hubungi via WhatsApp]              │
│                                         │
└─────────────────────────────────────────┘
```

Ketika klik tombol "Hubungi via WhatsApp":
- WhatsApp terbuka dengan nomor admin
- Pesan sudah terisi otomatis
- Tamu bisa langsung kirim pesan

## ✅ Status

- ✅ Build berhasil tanpa error
- ✅ Tab "📱 Kontak Admin" ditambahkan
- ✅ UI lebih mudah diakses
- ✅ Preview link WhatsApp
- ✅ Info box penjelasan
- ✅ Dokumentasi lengkap tersedia

## 🎉 Kesimpulan

Fitur pengaturan kontak admin sekarang lebih mudah diakses dengan tab terpisah "📱 Kontak Admin" di panel Super Admin. Admin dapat dengan mudah mengatur nomor WhatsApp, nama admin, dan pesan default yang akan ditampilkan di halaman login.

**Lokasi**: Panel Super Admin → Tab "📱 Kontak Admin"

**Fitur**:
- 📞 Nomor WhatsApp Admin
- 👤 Nama Admin
- 💬 Pesan Default WhatsApp
- 👁️ Preview Link WhatsApp

---

**Terakhir diperbarui:** 2024
**Versi:** 2.4.0
**Status:** ✅ Selesai dan Teruji
