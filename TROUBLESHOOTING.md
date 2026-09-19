# 🔧 Troubleshooting Multi-Bahasa

## ⚠️ Masalah: Bahasa Tidak Berubah

Jika Anda sudah mengubah bahasa di panel admin tetapi halaman undangan masih dalam bahasa lama, ikuti langkah-langkah berikut:

### Solusi 1: Refresh Halaman Undangan

Setelah menyimpan pengaturan bahasa di panel admin:

1. **Buka halaman undangan** di tab baru
2. **Hard refresh** halaman:
   - **Windows/Linux**: `Ctrl + Shift + R` atau `Ctrl + F5`
   - **Mac**: `Cmd + Shift + R`
3. Halaman undangan akan ter-load ulang dengan bahasa baru

### Solusi 2: Clear Browser Cache

Jika hard refresh tidak berhasil:

1. **Buka DevTools** (tekan `F12`)
2. **Klik kanan** pada tombol refresh
3. **Pilih** "Empty Cache and Hard Reload"
4. Atau buka tab **Application** → **Storage** → **Clear site data**

### Solusi 3: Clear LocalStorage Manual

Jika masih belum berhasil:

1. **Buka DevTools** (tekan `F12`)
2. **Buka tab** "Application" (Chrome) atau "Storage" (Firefox)
3. **Klik** "Local Storage" di sidebar kiri
4. **Klik** domain website Anda
5. **Cari** key `weddingData`
6. **Klik kanan** → **Delete**
7. **Refresh** halaman admin dan atur bahasa ulang

### Solusi 4: Reset Semua Data

Jika semua cara di atas tidak berhasil:

1. **Buka DevTools** (tekan `F12`)
2. **Buka tab** "Console"
3. **Ketik** perintah berikut:
   ```javascript
   localStorage.clear();
   sessionStorage.clear();
   location.reload();
   ```
4. **Tekan Enter**
5. **Atur ulang** semua data dari awal

## 🔍 Verifikasi Bahasa Berhasil Diubah

### Cara 1: Cek di Panel Admin

1. Buka tab **"⚙️ Bahasa & Agama"**
2. Lihat bagian **"Preview Konten"**
3. Jika preview sudah dalam bahasa yang dipilih, berarti pengaturan berhasil disimpan

### Cara 2: Cek di Console

1. **Buka halaman undangan**
2. **Buka DevTools** (tekan `F12`)
3. **Buka tab** "Console"
4. **Cari** log: `Language changed to: en` atau `Language changed to: id`
5. Jika log muncul, berarti bahasa berhasil diubah

### Cara 3: Cek LocalStorage

1. **Buka DevTools** (tekan `F12`)
2. **Buka tab** "Application" → "Local Storage"
3. **Klik** key `weddingData`
4. **Cari** field `"language"`
5. Pastikan nilainya `"id"` atau `"en"`

## 📋 Checklist Troubleshooting

Gunakan checklist ini untuk memastikan semua sudah benar:

- [ ] **Bahasa sudah dipilih** di tab "⚙️ Bahasa & Agama"
- [ ] **Tombol "Simpan Pengaturan"** sudah diklik
- [ ] **Alert konfirmasi** muncul: "Pengaturan bahasa dan agama berhasil disimpan!"
- [ ] **Preview konten** sudah dalam bahasa yang dipilih
- [ ] **Halaman undangan** sudah di-hard refresh
- [ ] **Browser cache** sudah di-clear
- [ ] **LocalStorage** sudah di-check untuk field `language`
- [ ] **Console log** menunjukkan bahasa yang benar

## 🎯 Langkah-Langkah Lengkap

### Untuk Mengubah Bahasa:

1. **Login** ke panel admin (`#/login`)
2. **Buka** tab **"⚙️ Bahasa & Agama"**
3. **Pilih** bahasa yang diinginkan:
   - 🇮🇩 Bahasa Indonesia
   - 🇬🇧 English
4. **Pilih** format agama (opsional)
5. **Lihat preview** di bagian bawah
6. **Klik** tombol **"Simpan Pengaturan"**
7. **Tunggu** alert konfirmasi
8. **Buka** halaman undangan di tab baru
9. **Hard refresh** halaman undangan
10. **Periksa** apakah bahasa sudah berubah

### Jika Masih Belum Berubah:

1. **Buka DevTools** (F12)
2. **Buka tab** "Application" → "Local Storage"
3. **Cari** key `weddingData`
4. **Periksa** apakah field `language` ada dan nilainya benar
5. Jika tidak ada atau salah:
   - **Hapus** key `weddingData`
   - **Kembali** ke panel admin
   - **Atur ulang** bahasa
   - **Simpan** kembali
6. **Hard refresh** halaman undangan

## 🐛 Debug Mode

Untuk debugging lebih lanjut, tambahkan kode berikut di console:

```javascript
// Cek data yang tersimpan
console.log('Wedding Data:', JSON.parse(localStorage.getItem('weddingData')));

// Cek bahasa saat ini
console.log('Current Language:', JSON.parse(localStorage.getItem('weddingData'))?.language);

// Force update language
const data = JSON.parse(localStorage.getItem('weddingData'));
data.language = 'en'; // atau 'id'
localStorage.setItem('weddingData', JSON.stringify(data));
location.reload();
```

## 📞 Support

Jika semua cara di atas tidak berhasil:

1. **Screenshot** panel admin tab "Bahasa & Agama"
2. **Screenshot** LocalStorage key `weddingData`
3. **Screenshot** Console log
4. **Screenshot** halaman undangan yang masih dalam bahasa lama
5. **Hubungi** developer dengan screenshot tersebut

## 🔄 Update Terbaru

### Versi 2.3.1 (Latest)
- ✅ Perbaikan loading data dari localStorage
- ✅ Menambahkan default values untuk language dan religion
- ✅ Force re-render ketika bahasa berubah
- ✅ Validasi field language saat save
- ✅ Console log untuk debugging

### Fitur yang Ditambahkan:
- **Auto-fix**: Field `language` dan `religion` otomatis ditambahkan jika tidak ada di data lama
- **Force re-render**: Komponen akan re-render otomatis ketika bahasa berubah
- **Validation**: Semua field divalidasi sebelum disimpan
- **Debug log**: Console log untuk memudahkan troubleshooting

## 💡 Tips

1. **Selalu hard refresh** setelah mengubah bahasa
2. **Clear cache** jika perubahan tidak terlihat
3. **Check console** untuk melihat log debugging
4. **Verify localStorage** untuk memastikan data tersimpan
5. **Test di incognito mode** untuk排除 cache issue

## 🎓 Penjelasan Teknis

### Mengapa Bahasa Tidak Berubah?

Ada beberapa kemungkinan:

1. **Browser Cache**: Browser menyimpan versi lama halaman
   - **Solusi**: Hard refresh atau clear cache

2. **LocalStorage Lama**: Data lama tidak memiliki field `language`
   - **Solusi**: Sudah diperbaiki dengan auto-fix default values

3. **React Re-render**: Komponen tidak re-render ketika data berubah
   - **Solusi**: Sudah ditambahkan `key` prop untuk force re-render

4. **Data Tidak Tersimpan**: Perubahan tidak tersimpan ke localStorage
   - **Solusi**: Sudah ditambahkan validasi sebelum save

### Bagaimana Sistem Bekerja?

1. **Admin mengubah bahasa** di panel admin
2. **Data disimpan** ke localStorage dengan field `language`
3. **Halaman undangan load** data dari localStorage
4. **Komponen membaca** field `language` dari `weddingData`
5. **Fungsi `t()`** mengembalikan terjemahan sesuai bahasa
6. **UI di-render** dengan teks dalam bahasa yang dipilih

### Flow Lengkap:

```
Admin Panel → Pilih Bahasa → Simpan → LocalStorage
                                           ↓
Halaman Undangan ← Load Data ← LocalStorage
        ↓
Baca Language → t(key, lang) → Render UI
```

---

**Terakhir diperbarui:** 2024
**Versi:** 2.3.1
**Status:** ✅ Diperbaiki dan Teruji
