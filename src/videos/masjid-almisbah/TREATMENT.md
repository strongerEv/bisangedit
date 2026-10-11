# TREATMENT — masjid-almisbah

- Durasi: 52,80 dtk (VO 51,30 + ekor 1,5)
- Audio: `public/audio/masjid-almisbah/masjid.wav` (51,4 dtk). Waktu sudah dikunci ke audio.
- BPM musik: tidak ada
- Gaya: putih + hijau #0F5C46 + emas #B8892F. Layar HP digambar dalam koordinat CSS 390×844.
  Watermark `© Youcanbuild` (src/components/Watermark.tsx) di y 1650, opacity 50%, sepanjang video.

## Daftar adegan

| ID  | Judul                    | Mulai | Selesai | Teks di layar | Naskah | Gerakan |
|-----|--------------------------|-------|---------|---------------|--------|---------|
| S01 | Infak itu amanah         | 0,0   | 7,67    | "Uang infak itu **amanah**"; kotak amal; pengumuman samar; chip "Cuma sekilas?" | 1 | uang kertas masuk kotak (`uang`); pengumuman muncul lalu blur (`pengumuman`) |
| S02 | Aplikasi                 | 7,67  | 11,71   | "Masjid Al Misbah punya **aplikasi**"; beranda pengurus (data contoh) | 2 | logo (`masjid`); HP beranda + bar kantong (`aplikasi`) |
| S03 | Donasi QRIS & kwitansi   | 11,71 | 20,07   | "Donasi **QRIS**, kwitansi **otomatis**"; chip "Kwitansi langsung terbit" | 3 | pilih program & nominal (`pilih`); QRIS (`scan`); bukti terunggah (`unggah`); kwitansi + doa (`kwitansi`) |
| S04 | Kotak amal + saksi       | 20,07 | 26,46   | "Kotak amal, **disaksikan**"; pecahan Rp100.000–Rp2.000 = Rp2.140.000; saksi; chip | 4 | baris pecahan terisi (`pecahan`); saksi setuju (`saksi`); "Tercatat sebagai kas masuk" |
| S05 | Persetujuan & tanpa hapus| 26,46 | 33,18   | "Disetujui ketua, **tak bisa dihapus**"; pengajuan Rp3.500.000; cap DISETUJUI; gembok | 5 | kartu (`pengeluaran`); cap (`ketua`); transaksi + gembok (`tidak`, `dihapus`) |
| S06 | Laporan Jumat            | 33,18 | 39,73   | "Laporan **Jumat** siap bagi"; teks WA format aplikasi; poster gambar | 6 | chat grup (`laporan`); poster masuk (`gambar`) |
| S07 | Transparansi jamaah      | 39,73 | 46,57   | "Jamaah bisa **cek sendiri**"; halaman transparansi; progres renovasi 62% | 7 | sorot saldo (`saldo`), pengeluaran (`keluar`), progres (`renovasi`) |
| S99 | Konsultasi gratis        | 46,57 | 52,80   | logo; "Mau lembaga atau usahamu **setransparan** ini?"; tombol; wordmark | 8 | tombol (`konsultasi`); wordmark (`youcanbuild`) |

## Marker audio

Awal frasa diukur dari jeda (`silencedetect`, −35 dB): 21 potongan = 21 frasa naskah.
Yang bertanda * diperkirakan dari jumlah suku kata. Angka lengkap di `timeline.ts` (`MARKERS`).
