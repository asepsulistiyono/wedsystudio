# Perbaikan Dashboard Admin Blank Screen

## Masalah yang Diperbaiki

1. **Error handling untuk localStorage corrupt**
   - Menambahkan try-catch untuk JSON.parse di WeddingContext
   - Memastikan galleryPhotos selalu berupa array
   - Fallback ke default data jika parsing gagal

2. **Menghapus import yang tidak digunakan**
   - Membersihkan import yang menyebabkan warning

3. **Menyederhanakan fitur galeri foto**
   - Mengganti fitur kompleks dengan tombol sederhana
   - Mengarahkan ke tab "Data Mempelai" untuk upload galeri

## Cara Menggunakan

### Akses Dashboard Admin
1. Buka URL: `https://your-domain.com/#/login`
2. Login dengan kredensial:
   - **Admin**: username `admin`, password `admin123`
   - **Super Admin**: username `superadmin`, password `super123`

### Jika Masih Blank Screen
Jika dashboard admin masih blank, coba langkah berikut:

1. **Hard Refresh Browser**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Clear Browser Cache**
   - Buka DevTools (F12)
   - Klik kanan pada tombol refresh
   - Pilih "Empty Cache and Hard Reload"

3. **Clear LocalStorage**
   - Buka DevTools (F12)
   - Tab Application → Local Storage
   - Klik kanan → Clear
   - Refresh halaman

4. **Reset Data (Jika Perlu)**
   - Buka Console di DevTools
   - Ketik: `localStorage.clear()`
   - Refresh halaman

## Struktur Tab Dashboard Admin

1. **Overview**
   - Quick Stats (Total Tamu, Konfirmasi Hadir, dll)
   - Aksi Cepat (shortcut ke fitur utama)
   - Info Galeri Foto (tombol ke tab Data Mempelai)
   - Ringkasan Pernikahan

2. **Data Mempelai**
   - Upload foto mempelai pria & wanita
   - Edit data mempelai (nama, orang tua, dll)

3. **Data Acara**
   - Edit tanggal pernikahan
   - Edit detail akad & resepsi

4. **Konten**
   - Edit bismillah, kutipan, teks penutup

5. **⚙️ Bahasa & Agama**
   - Pilih bahasa (Indonesia/English)
   - Pilih format agama (Islam, Kristen, Hindu, Buddha, Konghucu, Universal)

## Fitur yang Tersedia

✅ Upload foto mempelai pria & wanita
✅ Upload galeri foto (hingga 6 foto) di tab Data Mempelai
✅ Edit data mempelai
✅ Edit data acara
✅ Edit konten undangan
✅ Multi-bahasa (ID/EN)
✅ Multi-agama (6 format)
✅ Kelola tamu via WhatsApp
✅ Sistem login dengan role (Admin/Super Admin)
✅ Proteksi akses berdasarkan role

## Catatan Penting

- Semua data disimpan di localStorage browser
- Data akan hilang jika clear browser data
- Backup data secara berkala jika penting
- Fitur galeri foto ada di tab "Data Mempelai"
