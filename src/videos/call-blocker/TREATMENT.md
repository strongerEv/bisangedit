# TREATMENT — call-blocker

- Durasi: 46,91 dtk (VO 45,41 + ekor 1,5)
- Audio: `public/audio/call-blocker/vo.m4a` (45,9 dtk, AAC mono 48 kHz). Waktu sudah dikunci ke audio.
- BPM musik: tidak ada
- Gaya: putih + bidang miring navy #1F2A44 / oranye #FFA62B (gaya halaman Play Store aplikasinya). Layar HP digambar
  dalam koordinat CSS 390×844 (`parts.tsx` → `Phone`, `screens.tsx`).

## Daftar adegan

| ID  | Judul                 | Mulai | Selesai | Teks di layar | Naskah | Gerakan |
|-----|-----------------------|-------|---------|---------------|--------|---------|
| S01 | Telepon spam          | 0,0   | 6,15    | "Nomor nggak dikenal, **lagi?**"; 3 kartu panggilan masuk; label "Pinjol?", "Judol?", "Penipuan?" | 1 | kartu masuk bergetar beruntun; label di `pinjol`, `judol`, `penipuan` |
| S02 | Solusi                | 6,15  | 10,14   | "**Solusinya:**"; ikon aplikasi; "Call Blocker"; chip "Blokir telepon spam otomatis" | 1 | ikon pop di `aplikasi`; nama di `callBlocker` |
| S03 | Bikin aturan          | 10,14 | 18,45   | "Bikin **aturan** baru"; chip "= nomor yang nggak ada di kontak" | 2 | HP beranda → tap Add Rule di `bikin`; sorot pilihan di `lalu`; tap "Block Unknown calls" di `blokir` |
| S04 | Cara blokir + simpan  | 18,45 | 23,44   | "**Bisukan** atau **tolak**"; chip Silence = dibisukan / Reject = ditolak / Aturan tersimpan | 3 | sorot Silence di `dibisukan`; tap Reject di `ditolak`; tap Save Rule sebelum `simpan` → "Rule saved" |
| S05 | Otomatis diblokir     | 23,44 | 34,37   | "Nomor asing? **Otomatis diblokir**"; chip "Cuma notifikasi", "Tanpa angkat ✓" | 4 | 3 panggilan asing beruntun dicap DIBLOKIR (`otomatis`, `diblokir`); notifikasi "Call Blocked" di `kamuCuma` |
| S06 | Kontak tetap masuk    | 34,37 | 37,85   | "Kontakmu **tetap masuk**"; chip "Tersambung seperti biasa ✓" | 5 | telepon dari "Ibu" berdering, diangkat di `biasa` |
| S07 | Tanpa internet & akun | 37,85 | 42,25   | "Ringan & **simpel**"; kartu "Tanpa internet", "Tanpa daftar akun" | 6 | kartu di `internet`, `nggakPerlu` |
| S99 | Simpan & kirim        | 42,25 | 46,91   | "**Simpan** video ini,"; "kirim ke **orang tuamu**"; ikon simpan & kirim | 7 | ikon di `simpanVideo`, `kirim` |

## Marker audio

Awal frasa diukur dari jeda (`silencedetect` −35 dB, dipertajam −30 dB untuk jeda pendek di dalam kalimat).
Yang bertanda * diperkirakan dari jumlah suku kata. Angka lengkap di `timeline.ts` (`MARKERS`).
