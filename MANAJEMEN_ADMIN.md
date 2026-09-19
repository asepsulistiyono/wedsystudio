# 🛡️ Fitur Manajemen Admin (Super Admin)

## 📋 Deskripsi

Fitur manajemen admin memungkinkan Super Admin untuk mengelola akun admin, termasuk melihat password, reset password, dan menghapus akun admin.

## 🎯 Fitur yang Tersedia

### 1. 👁️ Lihat Password Admin
- Menampilkan password admin yang saat ini aktif
- Password disembunyikan secara default (••••••••)
- Klik tombol **"👁️ Lihat Password"** untuk menampilkan
- Klik **"🙈 Sembunyikan"** untuk menyembunyikan kembali
- Password ditampilkan dalam format monospace untuk kemudahan membaca

**Cara Menggunakan:**
1. Login sebagai Super Admin (`#/superadmin`)
2. Buka tab **"👥 Manajemen User"**
3. Pada bagian "Informasi Login", klik tombol **"👁️ Lihat Password"** pada akun Admin
4. Password akan ditampilkan
5. Klik **"🙈 Sembunyikan"** untuk menyembunyikan kembali

### 2. 🔄 Reset Password Admin
- Mereset password admin ke default: `admin123`
- Berguna jika admin lupa password
- Memerlukan konfirmasi sebelum reset
- Password lama akan ditimpa

**Cara Menggunakan:**
1. Login sebagai Super Admin
2. Buka tab **"👥 Manajemen User"**
3. Klik tombol **"🔄 Reset Password"** pada akun Admin
4. Konfirmasi reset password
5. Password admin akan direset ke: `admin123`
6. Admin dapat login dengan password baru

**Kapan Menggunakan:**
- Admin lupa password
- Ingin mengembalikan password ke default
- Keamanan: setelah periode tertentu

### 3. 🗑️ Hapus Akun Admin
- Menghapus akun admin dari sistem
- Memerlukan konfirmasi dua kali untuk keamanan
- **Peringatan:** Sistem tidak bisa diakses admin lagi setelah dihapus
- Super Admin harus membuat admin baru jika diperlukan

**Cara Menggunakan:**
1. Login sebagai Super Admin
2. Buka tab **"👥 Manajemen User"**
3. Klik tombol **"🗑️ Hapus Admin"** pada akun Admin
4. Konfirmasi pertama: "Apakah Anda yakin?"
5. Konfirmasi kedua: "Hapus akun admin?"
6. Akun admin akan dihapus dari sistem

**Peringatan:**
- ⚠️ Tindakan ini tidak dapat dibatalkan
- ⚠️ Sistem tidak bisa diakses admin lagi
- ⚠️ Super Admin harus membuat admin baru secara manual
- ⚠️ Gunakan hanya jika diperlukan

## 🔐 Keamanan

### Level Akses:
1. **Super Admin** - Bisa mengelola admin
2. **Admin** - Tidak bisa mengelola diri sendiri
3. **Tamu** - Tidak ada akses

### Proteksi:
- ✅ Super Admin tidak bisa dihapus
- ✅ Konfirmasi ganda untuk hapus admin
- ✅ Password disembunyikan secara default
- ✅ Session management dengan sessionStorage
- ✅ Audit trail (semua aksi tercatat)

## 💾 Penyimpanan Data

### Kredensial Admin:
```javascript
// Disimpan di localStorage
{
  "adminCredentials": {
    "username": "admin",
    "password": "admin123"
  }
}
```

### Kredensial Super Admin:
```javascript
// Hardcoded (tidak bisa diubah)
{
  "username": "superadmin",
  "password": "super123"
}
```

## 📊 Contoh Penggunaan

### Skenario 1: Admin Lupa Password
```
1. Admin tidak bisa login karena lupa password
2. Super Admin login ke #/superadmin
3. Buka tab "Manajemen User"
4. Klik "🔄 Reset Password" pada akun Admin
5. Konfirmasi reset
6. Password admin direset ke: admin123
7. Admin dapat login kembali dengan password baru
```

### Skenario 2: Ganti Admin
```
1. Admin lama sudah tidak bekerja
2. Super Admin login ke #/superadmin
3. Buka tab "Manajemen User"
4. Klik "🗑️ Hapus Admin" pada akun Admin lama
5. Konfirmasi dua kali
6. Akun admin lama dihapus
7. Buat admin baru melalui kode atau Super Admin
```

### Skenario 3: Cek Password Admin
```
1. Super Admin perlu mengetahui password admin
2. Login ke #/superadmin
3. Buka tab "Manajemen User"
4. Klik "👁️ Lihat Password" pada akun Admin
5. Password ditampilkan
6. Catat atau gunakan password tersebut
7. Klik "🙈 Sembunyikan" untuk keamanan
```

## ⚠️ Peringatan Penting

### DO's:
✅ Gunakan reset password jika admin lupa password
✅ Lihat password hanya jika diperlukan
✅ Hapus admin jika sudah tidak diperlukan
✅ Backup data sebelum hapus admin
✅ Konfirmasi dengan admin sebelum hapus

### DON'Ts:
❌ Jangan bagikan password superadmin
❌ Jangan hapus admin tanpa konfirmasi
❌ Jangan lihat password di tempat umum
❌ Jangan reset password tanpa alasan jelas
❌ Jangan biarkan password terlihat di layar

## 🔧 Troubleshooting

### Masalah: Tombol tidak berfungsi
**Solusi:**
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Cek console untuk error
4. Pastikan login sebagai Super Admin

### Masalah: Password tidak berubah setelah reset
**Solusi:**
1. Clear localStorage
2. Refresh halaman
3. Coba reset ulang
4. Cek console untuk error

### Masalah: Admin tidak bisa login setelah dihapus
**Solusi:**
1. Ini normal - admin sudah dihapus
2. Super Admin harus membuat admin baru
3. Atau reset sistem ke default

## 📝 Best Practices

1. **Keamanan Password:**
   - Gunakan password yang kuat
   - Ganti password secara berkala
   - Jangan bagikan password

2. **Manajemen Admin:**
   - Hanya buat admin jika diperlukan
   - Hapus admin yang tidak aktif
   - Monitor aktivitas admin

3. **Backup:**
   - Backup data secara berkala
   - Simpan kredensial di tempat aman
   - Dokumentasikan perubahan

4. **Audit:**
   - Catat semua perubahan
   - Review akses secara berkala
   - Monitor aktivitas mencurigakan

## 🎓 FAQ

**Q: Apakah Super Admin bisa dihapus?**
A: Tidak, Super Admin tidak bisa dihapus untuk keamanan sistem.

**Q: Bagaimana jika lupa password Super Admin?**
A: Password Super Admin adalah `super123`. Jika lupa, reset sistem ke default.

**Q: Apakah bisa membuat banyak admin?**
A: Saat ini hanya mendukung 1 admin. Fitur multi-admin akan datang di versi berikutnya.

**Q: Apakah perubahan password bersifat permanen?**
A: Ya, perubahan password disimpan di localStorage dan bersifat permanen.

**Q: Bagaimana cara membuat admin baru setelah dihapus?**
A: Super Admin perlu mengakses kode atau menggunakan fitur create admin (akan datang).

## 📞 Support

Jika mengalami masalah dengan fitur manajemen admin:
1. Cek dokumentasi ini
2. Clear browser cache
3. Reset sistem ke default
4. Hubungi developer

---

**Terakhir diperbarui:** 2024
**Versi:** 2.1.0
