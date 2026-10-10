# TREATMENT — warkas

- Durasi: 43,87 dtk (VO 42,37 + ekor 1,5)
- Audio: `public/audio/warkas/vowarkas.wav` (42,6 dtk). Waktu sudah dikunci ke audio.
- BPM musik: tidak ada
- Gaya: hijau Warkas (#059669, latar #F3F7F5). Screenshot asli 900×1948 di bingkai HP (`parts.tsx` → `Phone`);
  kotak sorot diukur dari px screenshot.

## Daftar adegan

| ID  | Judul             | Mulai | Selesai | Teks di layar | Naskah | Gerakan |
|-----|-------------------|-------|---------|---------------|--------|---------|
| S01 | Hook untung       | 0,0   | 3,97    | "Warung ramai, tapi **untungnya?**"; kartu "Omzet Rp18,4 jt" & "Untung bersih Rp ???" | 1 | omzet masuk di `warung`; kartu untung bergetar di `untung` |
| S02 | Kenalin Warkas    | 3,97  | 10,19   | "Kenalin **Warkas**"; ikon; chip Kasir / + Pembukuan / Warung & UMKM | 2 | ikon di `warkas`; HP dashboard di `aplikasi`; chip di `pembukuan` |
| S03 | Kasir             | 10,19 | 17,22   | "Tinggal **tap** produk"; chip Tunai / QRIS / Transfer; "Stok terpotong otomatis" | 3 | tap produk di `tap`; sorot keranjang di `bayar`; chip bayar di `bayar`, `qris`, `transfer`; sorot "Stok 12" di `stok` |
| S04 | Harga modal       | 17,22 | 21,25   | "Isi modal, **untung** kelihatan"; chip "Untung Rp7.000 · margin 38,9%" | 4 | sorot harga modal di `isi`; sorot untung per unit di `untungPer` |
| S05 | Tutup shift       | 21,25 | 26,66   | "Tutup shift, kas **dicocokkan**"; chip "Selisih langsung ketahuan" | 5 | sorot modal awal di `saat`; sorot kas seharusnya di `kas`; chip di `selisih` |
| S06 | Laba bersih       | 26,66 | 32,49   | "Bukan cuma omzet, tapi **laba bersih**"; chip "Laba bersih Rp4.223.000" | 6 | sorot omzet (`omzet`) → laba bersih (`labaBersih`) → HPP (`modal`) & pengeluaran (`pengeluaran`) |
| S07 | Offline           | 32,49 | 37,66   | "Internet putus? **Aman**"; 3 struk "antre" → "terkirim"; chip "Sinkron otomatis saat online" | 7 | ikon sinyal putus di `internet`; struk antre di `transaksi`; terkirim di `terkirim` |
| S99 | Konsultasi gratis | 37,66 | 43,87   | ikon Warkas; "Butuh aplikasi **kustom** seperti ini?"; tombol "Konsultasi gratis →"; wordmark Youcanbuild | 8 | judul di `buat`; tombol di `langsung`, tap di `gratis` |

## Marker audio

Awal frasa diukur dari jeda (`silencedetect`, −35 dB; −30 dB untuk jeda pendek): 21 potongan = 21 frasa naskah.
Yang bertanda * diperkirakan dari jumlah suku kata. Angka lengkap di `timeline.ts` (`MARKERS`).
