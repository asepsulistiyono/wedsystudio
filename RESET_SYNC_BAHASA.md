# 🔄 Fitur Reset & Sync Bahasa

## 🎯 Masalah yang Diperbaiki

Sebelumnya, ketika admin mengubah bahasa dari Bahasa Indonesia ke English (atau sebaliknya), teks-teks religius seperti ayat Al-Quran, pembuka, dan penutup **tetap tampil dalam bahasa lama** karena data lama tersimpan di localStorage.

## ✅ Solusi: Tombol "Reset & Sync Bahasa"

Sekarang ada tombol khusus **"🔄 Reset & Sync Bahasa"** yang akan:
- Memaksa sinkronisasi semua teks religius dengan bahasa yang dipilih
- Mengupdate field `bismillah`, `quote`, `quoteSource`, dan `closingText`
- Membersihkan data lama yang masih dalam bahasa sebelumnya
- Menyimpan data yang sudah sinkron ke localStorage

## 📋 Cara Menggunakan

### Langkah 1: Login ke Admin Panel
```
URL: https://your-domain.com/#/login
Username: admin
Password: admin123
```

### Langkah 2: Buka Tab "Bahasa & Agama"
1. Klik tab **"⚙️ Bahasa & Agama"**
2. Pilih bahasa yang diinginkan:
   - 🇮🇩 Bahasa Indonesia
   - 🇬🇧 English
3. Pilih format agama (opsional):
   - ☪️ Islam, ✝️ Kristen, 🕉️ Hindu, ☸️ Buddha, ☯️ Konghucu, ♾️ Universal

### Langkah 3: Klik "Simpan Pengaturan"
1. Klik tombol **"Simpan Pengaturan"**
2. Tunggu alert konfirmasi

### Langkah 4: Klik "Reset & Sync Bahasa" ⭐ PENTING!
1. Klik tombol **"🔄 Reset & Sync Bahasa"** (warna orange)
2. Tunggu alert: "Bahasa dan konten religius berhasil di-sinkronisasi!"
3. **Hard refresh** halaman undangan:
   - **Windows/Linux**: `Ctrl + Shift + R`
   - **Mac**: `Cmd + Shift + R`

### Langkah 5: Verifikasi
Buka halaman undangan dan pastikan semua teks sudah dalam bahasa yang dipilih:
- ✅ Cover section: "The Wedding Of" (English) atau "Pernikahan" (Indonesia)
- ✅ Hero section: Pembukaan dalam bahasa yang dipilih
- ✅ Couple section: Ayat dalam bahasa yang dipilih
- ✅ Footer section: Penutup dalam bahasa yang dipilih

## 🔍 Cara Kerja Teknis

### Sebelum (Masalah):
```javascript
// Data di localStorage:
{
  language: 'en',  // ← Sudah English
  quote: "Dan di antara tanda-tanda...",  // ← Masih Indonesia! ❌
  religion: 'islam'
}
```

### Sesudah (Solusi):
```javascript
// Setelah klik "Reset & Sync Bahasa":
{
  language: 'en',  // ← English
  quote: "And among His Signs is this...",  // ← Sekarang English! ✅
  religion: 'islam'
}
```

### Flow Proses:
```
1. Admin pilih English → language: 'en'
2. Klik "Simpan Pengaturan" → data disimpan
3. Klik "Reset & Sync Bahasa" → 
   - forceSyncReligiousContent() dipanggil
   - getReligiousContent('islam', 'en') dipanggil
   - Template English diambil dari religiousTemplates
   - Field quote, bismillah, closingText di-update
   - Data disimpan ke localStorage
4. Hard refresh halaman undangan
5. Tampil teks English ✓
```

## 🐛 Troubleshooting

### Masalah: Teks masih dalam bahasa lama setelah sync

**Solusi 1: Hard Refresh**
```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

**Solusi 2: Clear Browser Cache**
1. Buka DevTools (F12)
2. Klik kanan pada tombol refresh
3. Pilih "Empty Cache and Hard Reload"

**Solusi 3: Clear LocalStorage Manual**
1. Buka DevTools (F12)
2. Tab "Application" → "Local Storage"
3. Klik kanan pada `weddingData`
4. Pilih "Delete"
5. Kembali ke panel admin
6. Atur bahasa ulang
7. Klik "Simpan Pengaturan"
8. Klik "Reset & Sync Bahasa"

**Solusi 4: Reset Semua Data**
```javascript
// Di Console DevTools (F12)
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### Cara Verifikasi di Console

1. Buka halaman undangan
2. Tekan F12 untuk buka DevTools
3. Buka tab "Console"
4. Cari log:
   ```
   🔄 Force syncing religious content...
   📋 Current data: { language: 'en', religion: 'islam', ... }
   ✅ Force sync complete. New data: { ... }
   ```
5. Pastikan `language` adalah 'en' dan `quote` sudah dalam English

## 📊 Contoh Hasil

### Bahasa Indonesia:
```
BISMILLAHIRRAHMANIRRAHIM
Assalamu'alaikum Warahmatullahi Wabarakatuh

"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu 
istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram 
kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang."

— QS. Ar-Rum: 21 —

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila 
Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.

Wassalamu'alaikum Warahmatullahi Wabarakatuh
```

### English:
```
BISMILLAHIRRAHMANIRRAHIM
Assalamu'alaikum Warahmatullahi Wabarakatuh

"And among His Signs is this, that He created for you mates from among 
yourselves, that ye may dwell in tranquility with them, and He has put 
love and mercy between your (hearts)."

— QS. Ar-Rum: 21 —

It would be our honor and happiness if you would be willing to attend 
and give your blessings.

Wassalamu'alaikum Warahmatullahi Wabarakatuh
```

## 🎨 Tampilan Tombol

Di tab "⚙️ Bahasa & Agama", ada 3 tombol:

1. **Reset** (abu-abu) - Reset ke data sebelumnya
2. **🔄 Reset & Sync Bahasa** (orange) - **⭐ PENTING!** Force sync bahasa
3. **Simpan Pengaturan** (hijau) - Simpan perubahan

**Selalu klik "🔄 Reset & Sync Bahasa" setelah mengubah bahasa!**

## 💡 Tips

1. **Selalu gunakan tombol "Reset & Sync Bahasa"** setelah mengubah bahasa
2. **Hard refresh** halaman undangan setelah sync
3. **Cek console** untuk melihat log proses sync
4. **Clear cache** jika perubahan tidak terlihat
5. **Verifikasi** di halaman undangan bahwa semua teks sudah berubah

## 📝 Checklist

Gunakan checklist ini untuk memastikan bahasa berhasil diubah:

- [ ] Bahasa sudah dipilih di tab "⚙️ Bahasa & Agama"
- [ ] Tombol "Simpan Pengaturan" sudah diklik
- [ ] **Tombol "🔄 Reset & Sync Bahasa" sudah diklik** ⭐
- [ ] Alert konfirmasi muncul
- [ ] Halaman undangan sudah di-hard refresh
- [ ] Semua teks sudah dalam bahasa yang dipilih
- [ ] Console log menunjukkan proses sync berhasil

## ✅ Status

- ✅ Build berhasil tanpa error
- ✅ Tombol "Reset & Sync Bahasa" ditambahkan
- ✅ Logging lengkap untuk debugging
- ✅ Force sync berfungsi dengan baik
- ✅ Dokumentasi lengkap tersedia

## 🎉 Kesimpulan

Masalah multi-bahasa telah diperbaiki dengan solusi yang robust. Tombol **"🔄 Reset & Sync Bahasa"** akan memastikan semua teks religius ter-sinkronisasi dengan bahasa yang dipilih. 

**PENTING**: Selalu klik tombol ini setelah mengubah bahasa, lalu hard refresh halaman undangan!

---

**Terakhir diperbarui:** 2024
**Versi:** 2.3.3 (Final Solution)
**Status:** ✅ Diperbaiki dan Teruji
