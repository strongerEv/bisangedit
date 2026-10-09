# TREATMENT — fastreng

- Durasi: 43,55 dtk (VO 42,05 + ekor 1,5)
- Audio: `public/audio/fastreng/cireng.wav`. Waktu sudah dikunci ke audio.
- BPM musik: tidak ada
- Gaya: warna Fastreng (oranye #FF9229 / #F26B1D, krem #FFF7F2). Screenshot asli di dalam bingkai HP (`parts.tsx` → `Phone`),
  kotak sorot oranye diukur dari piksel screenshot (`cssToScreen`).

## Daftar adegan

| ID  | Judul            | Mulai | Selesai | Teks di layar | Naskah | Gerakan |
|-----|------------------|-------|---------|---------------|--------|---------|
| S01 | Hook             | 0,0   | 6,54    | gelembung chat pesanan berantakan; "Kenalin: **Fastreng**" | 1–2 | chat muncul bertumpuk dari `jualan`, tersapu di `kenalin`; HP splash + judul di `fastreng` |
| S02 | Apa itu Fastreng | 6,54  | 11,84   | judul aplikasi; chip "Bisa dipasang di HP" | 2 | HP 02_home masuk di `aplikasi`; chip di `install` |
| S03 | Tap foto = +1    | 11,84 | 16,78   | "Tap foto = **+1 porsi**" | 3 | 03_tap; riak tap + "+1" di kartu menu dari `sekaliTap`; bar keranjang disorot di `satuPorsi` |
| S04 | Checkout         | 16,78 | 22,04   | "Isi data, lalu **kirim**" | 4 | 06_cart, sorot Diantar/Ambil di `diantar`; ganti ke 07_checkout di `alamat` (sorot alamat); sorot + tap tombol WhatsApp di `tekanWa` |
| S05 | Masuk WhatsApp   | 22,04 | 27,05   | chat WA generik berisi pesan asli; chip "✓ Rapi" | 5 | pesan masuk di `masukWa`, scroll; chip di `rapi`; baris TOTAL BAYAR disorot di `total` |
| S06 | Dashboard        | 27,05 | 32,30   | judul dashboard; chip "tampilan dengan data contoh" | 6 | admin_strip discroll: omzet (`omzet`) → menu terlaris (`terlaris`) → jam ramai (`jamRamai`) |
| S07 | Cocok untuk      | 32,30 | 37,89   | "Cocok untuk…"; UMKM kuliner / Jualan lewat WhatsApp / Ingin terlihat profesional | 7 | baris muncul di `cocok`, `lewatWa`, `profesional` |
| S99 | Komen mau        | 37,89 | 43,55   | logo Fastreng; "Mau dibikinin aplikasi kayak gini buat **usahamu?**"; kolom komentar mengetik "mau"; panah ↓; wordmark Youcanbuild | 8 | judul di `mau`; kolom komentar di `komen`; "mau" diketik di `kataMau` |

## Marker audio

Awal frasa diukur dari jeda (`silencedetect`, −35 dB). Yang bertanda * diperkirakan dari jumlah suku kata.
Angka lengkap ada di `timeline.ts` (`MARKERS`).
