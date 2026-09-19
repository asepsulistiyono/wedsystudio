# 🛡️ Fitur Tambah Admin Baru

## 📋 Deskripsi

Super Admin sekarang dapat menambah admin baru melalui panel Super Admin. Fitur ini memungkinkan pembuatan multiple admin untuk mengelola website undangan pernikahan.

## 🎯 Fitur yang Tersedia

### 1. ➕ Tambah Admin Baru
- Membuat akun admin baru dengan username dan password custom
- Setiap admin memiliki nama lengkap untuk identifikasi
- Username harus unik (tidak boleh duplikat)
- Username tidak boleh sama dengan "superadmin"
- Admin baru dapat langsung login setelah dibuat

### 2. 👁️ Lihat Password Admin
- Menampilkan password admin yang saat ini aktif
- Password disembunyikan secara default (••••••••)
- Klik tombol **"👁️"** untuk menampilkan
- Klik **"🙈"** untuk menyembunyikan kembali
- Password ditampilkan dalam format monospace untuk kemudahan membaca

### 3. 🔄 Reset Password Admin
- Mereset password admin ke default: `admin123`
- Berguna jika admin lupa password
- Memerlukan konfirmasi sebelum reset
- Password lama akan ditimpa

### 4. 🗑️ Hapus Akun Admin
- Menghapus akun admin dari sistem
- Memerlukan konfirmasi dua kali untuk keamanan
- **Peringatan:** Admin yang dihapus tidak bisa login lagi
- Super Admin harus membuat admin baru jika diperlukan

## 📊 Cara Menggunakan

### Tambah Admin Baru:
1. Login sebagai Super Admin (`#/superadmin`)
2. Buka tab **"👥 Manajemen User"**
3. Klik tombol **"➕ Tambah Admin"**
4. Isi form:
   - **Nama Lengkap**: Nama admin untuk identifikasi
   - **Username**: Username untuk login (harus unik)
   - **Password**: Password untuk login
5. Klik **"💾 Simpan Admin Baru"**
6. Admin baru dapat langsung login dengan kredensial yang dibuat

### Lihat Password Admin:
1. Login sebagai Super Admin
2. Buka tab **"👥 Manajemen User"**
3. Pada daftar admin, klik tombol **"👁️"** pada admin yang diinginkan
4. Password akan ditampilkan
5. Klik **"🙈"** untuk menyembunyikan kembali

### Reset Password Admin:
1. Login sebagai Super Admin
2. Buka tab **"👥 Manajemen User"**
3. Klik tombol **"🔄"** pada admin yang ingin direset
4. Konfirmasi reset password
5. Password admin akan direset ke: `admin123`
6. Admin dapat login dengan password baru

### Hapus Akun Admin:
1. Login sebagai Super Admin
2. Buka tab **"👥 Manajemen User"**
3. Klik tombol **"🗑️"** pada admin yang ingin dihapus
4. Konfirmasi pertama: "Apakah Anda yakin?"
5. Konfirmasi kedua: "Hapus akun admin?"
6. Akun admin akan dihapus dari sistem

## 🔐 Keamanan

### Level Akses:
1. **Super Admin** - Bisa mengelola semua admin
2. **Admin** - Tidak bisa mengelola admin lain
3. **Tamu** - Tidak ada akses

### Proteksi:
- ✅ Super Admin tidak bisa dihapus
- ✅ Username harus unik
- ✅ Username tidak boleh sama dengan "superadmin"
- ✅ Konfirmasi ganda untuk hapus admin
- ✅ Password disembunyikan secara default
- ✅ Session management dengan sessionStorage
- ✅ Audit trail (semua aksi tercatat)

## 💾 Penyimpanan Data

### Daftar Admin:
```javascript
// Disimpan di localStorage
{
  "admins": [
    {
      "id": "1",
      "username": "admin",
      "password": "admin123",
      "name": "Admin",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": "2",
      "username": "admin2",
      "password": "password123",
      "name": "Admin Kedua",
      "createdAt": "2024-01-02T00:00:00.000Z"
    }
  ]
}
```

### Kredensial Super Admin:
```javascript
// Hardcoded (tidak bisa diubah)
{
  "id": "superadmin",
  "username": "superadmin",
  "password": "super123",
  "name": "Super Admin",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## 📝 Contoh Penggunaan

### Skenario 1: Membuat Admin Baru
```
1. Super Admin login ke #/superadmin
2. Buka tab "Manajemen User"
3. Klik "➕ Tambah Admin"
4. Isi form:
   - Nama: "Budi Santoso"
   - Username: "budi"
   - Password: "budi123"
5. Klik "💾 Simpan Admin Baru"
6. Admin baru "budi" dapat login dengan password "budi123"
```

### Skenario 2: Admin Lupa Password
```
1. Admin "budi" lupa password
2. Super Admin login ke #/superadmin
3. Buka tab "Manajemen User"
4. Klik "🔄" pada admin "budi"
5. Konfirmasi reset
6. Password "budi" direset ke: admin123
7. Admin "budi" dapat login dengan password: admin123
```

### Skenario 3: Menghapus Admin
```
1. Admin "budi" sudah tidak bekerja
2. Super Admin login ke #/superadmin
3. Buka tab "Manajemen User"
4. Klik "🗑️" pada admin "budi"
5. Konfirmasi dua kali
6. Admin "budi" dihapus dari sistem
7. Admin "budi" tidak bisa login lagi
```

## ⚠️ Peringatan Penting

### DO's:
✅ Buat admin baru sesuai kebutuhan
✅ Gunakan nama yang jelas untuk identifikasi
✅ Gunakan password yang kuat
✅ Reset password jika admin lupa
✅ Hapus admin yang tidak aktif
✅ Backup data sebelum hapus admin

### DON'Ts:
❌ Jangan bagikan password superadmin
❌ Jangan buat username yang sama
❌ Jangan gunakan username "superadmin"
❌ Jangan hapus admin tanpa konfirmasi
❌ Jangan lihat password di tempat umum
❌ Jangan biarkan password terlihat di layar

## 🔧 Troubleshooting

### Masalah: Username sudah digunakan
**Solusi:**
- Gunakan username yang berbeda
- Username harus unik di seluruh sistem

### Masalah: Admin tidak bisa login setelah dibuat
**Solusi:**
1. Cek username dan password sudah benar
2. Clear browser cache
3. Coba login ulang
4. Cek console untuk error

### Masalah: Tombol tidak berfungsi
**Solusi:**
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Cek console untuk error
4. Pastikan login sebagai Super Admin

### Masalah: Admin tidak muncul di daftar
**Solusi:**
1. Refresh halaman
2. Cek localStorage
3. Clear browser cache
4. Tambah admin ulang

## 📊 Statistik Admin

Di tab "Manajemen User", Super Admin dapat melihat:
- Jumlah total admin
- Daftar semua admin dengan detail:
  - Nama lengkap
  - Username
  - Password (tersembunyi/default)
  - Tanggal pembuatan
  - Tombol aksi (lihat/reset/hapus)

## 🎓 Best Practices

1. **Pembuatan Admin:**
   - Buat admin sesuai kebutuhan
   - Gunakan nama yang jelas
   - Gunakan username yang mudah diingat
   - Gunakan password yang kuat

2. **Manajemen Password:**
   - Reset password secara berkala
   - Jangan gunakan password yang sama
   - Ganti password setelah reset
   - Simpan password di tempat aman

3. **Keamanan:**
   - Hanya Super Admin yang bisa mengelola admin
   - Jangan bagikan kredensial superadmin
   - Hapus admin yang tidak aktif
   - Monitor aktivitas admin

4. **Backup:**
   - Backup data admin secara berkala
   - Dokumentasikan semua admin
   - Simpan kredensial di tempat aman
   - Buat rencana recovery

## 📞 Support

Jika mengalami masalah dengan fitur tambah admin:
1. Cek dokumentasi ini
2. Clear browser cache
3. Reset sistem ke default
4. Hubungi developer

---

**Terakhir diperbarui:** 2024
**Versi:** 2.2.0

## 🎯 Fitur Lengkap Super Admin

### Manajemen Admin:
- ✅ Lihat daftar semua admin
- ✅ Tambah admin baru
- ✅ Lihat password admin
- ✅ Reset password admin
- ✅ Hapus admin
- ✅ Monitor aktivitas admin

### Pengaturan Website:
- ✅ Edit nama website
- ✅ Pilih tema warna
- ✅ Aktifkan/nonaktifkan fitur
- ✅ Atur musik background

### Kontak Admin:
- ✅ Edit nomor WhatsApp
- ✅ Edit nama admin
- ✅ Edit pesan default

### Analytics:
- ✅ Total pengunjung
- ✅ Tingkat RSVP
- ✅ Open rate
- ✅ Rata-rata waktu

### Sistem:
- ✅ Informasi sistem
- ✅ Export data
- ✅ Reset semua data
- ✅ Changelog

---

**Dibuat dengan ❤️ untuk kemudahan manajemen**
