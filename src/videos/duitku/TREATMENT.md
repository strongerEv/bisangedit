# TREATMENT — duitku

- Durasi: 43,01 dtk (VO 41,51 + ekor 1,5)
- Audio: `public/audio/duitku/voduitku.wav` (41,7 dtk). Waktu sudah dikunci ke audio.
- BPM musik: tidak ada
- Gaya: hijau Duitku (#12996B, latar #F2F7F4). Screenshot asli 640×1385 di bingkai HP (`parts.tsx` → `Phone`);
  kotak sorot diukur dari px screenshot.

## Daftar adegan

| ID  | Judul                      | Mulai | Selesai | Teks di layar | Naskah | Gerakan |
|-----|----------------------------|-------|---------|---------------|--------|---------|
| S01 | Hook nagih hutang          | 0,0   | 3,33    | "Ada yang ngutang, tapi **sungkan nagih?**"; chat "Nanti ya, gajian dulu" dst. | 1 | balasan masuk beruntun; pesan tagihan diketik lalu dihapus di `sungkan` |
| S02 | Kenalin Duitku             | 3,33  | 10,33   | "Kenalin **Duitku**"; ikon; chip "Catat keuangan", "+ Tagih hutang via WhatsApp" | 2 | ikon di `duitku`; HP beranda di `aplikasi`; chip di `whatsapp` |
| S03 | Catat transaksi            | 10,33 | 14,42   | "Catat **masuk** & **keluar**"; chip Uang Tunai / Bank / E-Wallet | 3 | sorot kartu Masuk/Keluar; chip dompet di `dompet` |
| S04 | Catatan hutang             | 14,42 | 19,48   | "Siapa, berapa, **kapan**"; chip "Lewat tempo? Kartunya jadi merah" | 4 | sorot kartu Rian (`simpan`) → detail, sorot sisa (`berapa`) → sorot telat/tempo (`kapan`) |
| S05 | Tagih via WhatsApp         | 19,48 | 26,55   | "Tagih **sekali tekan**"; chip Halus / Tegas / "Pesan terisi otomatis ✓" | 5 | tap "Tagih Sekarang" (`tagihWa`) → lembar tagih; sorot Halus (`halus`), tap Tegas (`tegas`); sorot pesan (`pesannya`); tap Kirim |
| S06 | Laporan, anggaran, asisten | 26,55 | 32,46   | "Laporan, anggaran, **asisten**"; chip per fitur | 6 | laporan → anggaran (`anggaran`) → asisten (`asisten`) |
| S07 | Data di HP                 | 32,46 | 36,21   | "Data **aman** di HP-mu"; "100% di perangkatmu", "Tanpa server, bisa offline" | 7 | HP garis + gembok pop di `aman` |
| S99 | Konsultasi gratis          | 36,21 | 43,01   | ikon Duitku; "Butuh aplikasi **kustom** seperti ini?"; tombol "Konsultasi gratis →"; wordmark Youcanbuild | 8 | judul di `buat`; tombol di `langsung`, tap di `gratis`; wordmark di `youcanbuild` |

## Marker audio

Awal frasa diukur dari jeda (`silencedetect`, −35 dB; −30 dB untuk jeda pendek): 22 potongan = 22 frasa naskah.
Yang bertanda * diperkirakan dari jumlah suku kata. Angka lengkap di `timeline.ts` (`MARKERS`).
