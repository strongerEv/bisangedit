# NASKAH — makaryo

- **Brand:** Youcanbuild (penutup). Aplikasi yang dijelaskan: Makaryo (portofolio, repo `strongerEv/Makaryo`).
- **Tujuan:** explainer: Makaryo itu apa, fungsinya untuk apa, teknisnya bagaimana.
- **Target penonton:** pemilik usaha live streaming / pengelola tim host (TikTok/Reels).
- **Pesan utama:** absen, jadwal, pengajuan, omzet, dan laporan tim host pindah dari tumpukan Excel ke satu aplikasi.
- **Durasi:** ±55 dtk (VO 53,74 dtk + ekor), vertikal 9:16.
- **Bahan:** layar aplikasi digambar ulang dari kode & design system Makaryo (`docs/03-design-system.md`) dengan data contoh.
  Tidak ada data, selfie, atau lokasi karyawan asli. Teks notifikasi pengingat = teks asli dari aplikasi.
- **Fakta yang dicek dari repo:** PWA Next.js 15 + Supabase; selfie + GPS, status tepat waktu/telat otomatis;
  generate draft jadwal rule-based (`lib/scheduling/`, tanpa LLM) lalu publish; approval izin & libur;
  omzet per shift + foto bukti; export PDF & Excel; pengingat shift via Web Push; 3 shift bawaan 06–21.

## Naskah (teks layar memakai ejaan asli; VO memakai ejaan bunyi)

| # | Baris |
|---|-------|
| 1 | Punya tim host live streaming? Absen, jadwal, sama omzetnya masih numpuk di file Excel? |
| 2 | Kenalin: Makaryo. Aplikasi untuk mengelola tim host live, bisa dipasang di HP. |
| 3 | Host absen pakai selfie dan lokasi GPS. Telat atau tepat waktu, tercatat otomatis. |
| 4 | Jadwal shift sebulan? Admin tinggal tekan generate. Jadwal tersusun sendiri, lalu dipublish. |
| 5 | Izin, libur, sampai setoran omzet, semuanya diajukan dari aplikasi. Admin tinggal setujui. |
| 6 | Laporannya bisa diunduh ke PDF dan Excel, plus ada notifikasi pengingat jam kerja. |
| 7 | Teknisnya: dibangun dengan Next.js dan Supabase. Penyusun jadwalnya pakai aturan, bukan AI. Hasilnya konsisten, tanpa biaya tiap generate. |
| 8 | Mau dibikinin aplikasi kayak gini buat timmu? Konsultasi gratis di Youcanbuild. |
