# TREATMENT — makaryo

- Durasi: 55,24 dtk (VO 53,74 + ekor 1,5)
- Audio: `public/audio/makaryo/makaryoku.wav` (54,0 dtk, mono 24 kHz). Waktu sudah dikunci ke audio.
- BPM musik: tidak ada
- Gaya: token warna Makaryo (latar #F2F4FB, ungu #5B4CE0, coral/amber/emerald/sky). Layar HP digambar ulang
  dalam koordinat CSS 390×844 (`parts.tsx` → `Phone`), komponen meniru `ModuleCard`, `StatCard`, `BottomNav`, `Badge`.

## Daftar adegan

| ID  | Judul               | Mulai | Selesai | Teks di layar | Naskah | Gerakan |
|-----|---------------------|-------|---------|---------------|--------|---------|
| S01 | Hook Excel          | 0,0   | 6,76    | "Punya tim host **live streaming?**" → "Absen, jadwal, omzet… numpuk di **Excel?**"; 12 kartu file .xlsx | 1 | file jatuh bertumpuk dari `absenX`, `jadwalX`, `omzetX`, `excel`; bergetar setelah `excel` |
| S02 | Kenalin Makaryo     | 6,76  | 13,41   | "Kenalin: **Makaryo**"; "Aplikasi untuk tim host **live**"; "LIVE · 3 shift / hari"; chip "Bisa dipasang di HP" + ikon aplikasi | 2 | HP beranda host naik di `aplikasi`; chip + ikon di `pasang` |
| S03 | Absen               | 13,41 | 19,75   | "Absen pakai **selfie** + **GPS**"; chip "Tercatat otomatis" | 3 | kamera depan, jepret + kilat di `selfie`; kartu lokasi di `lokasi`; ganti ke riwayat: "Telat 7 mnt" di `telat`, "Tepat waktu" di `tepat` |
| S04 | Jadwal otomatis     | 19,75 | 26,50   | "Jadwal sebulan, **sekali tekan**"; kalender Oktober 2026 | 4 | tap "Generate draft" di `generate`; 31 hari terisi bergelombang; tap "Publish (93)" di `publish` → "Terpublish" |
| S05 | Pengajuan           | 26,50 | 33,13   | "Izin, libur, **omzet**"; "semuanya **diajukan** dari aplikasi"; "Masuk ke admin · Approval" | 5 | kartu masuk di `izin`, `libur`, `setoran`; tap "Setujui" berurutan dari `setujui` → Disetujui / Tercatat |
| S06 | Laporan & pengingat | 33,13 | 39,00   | "Unduh **laporan**"; "+ **pengingat** jam kerja"; kartu PDF & XLSX; notifikasi "Shift Siang dimulai 15 menit lagi" | 6 | PDF di `pdf`, XLSX di `excel2` (cincin unduh → centang); HP layar kunci + notifikasi di `notif` |
| S07 | Teknis              | 39,00 | 49,07   | "DI BALIK LAYAR"; "**Teknisnya**"; Next.js ↔ Supabase; "Penyusun jadwal" + 4 aturan; "bukan AI"; 3 hasil generate sama; "Rp0 per generate" | 7 | kotak di `nextjs`, `supabase`; kartu di `penyusun`; aturan dari `aturan`; chip di `bukanAi`; petak di `konsisten`; chip di `tanpaBiaya` |
| S99 | Konsultasi          | 49,07 | 55,24   | logo Makaryo; "Mau dibikinin aplikasi kayak gini buat **timmu?**"; tombol "Konsultasi gratis →"; wordmark Youcanbuild | 8 | judul di `mau`; tombol + tap + wordmark dari `konsultasi` |

## Marker audio

Awal frasa diukur dari jeda (`silencedetect`, −35 dB): 24 potongan suara cocok 1:1 dengan frasa naskah.
Yang bertanda * diperkirakan dari jumlah suku kata. Angka lengkap di `timeline.ts` (`MARKERS`).
