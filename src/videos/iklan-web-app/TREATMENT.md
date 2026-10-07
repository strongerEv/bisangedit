# TREATMENT — iklan-web-app

- Durasi: 33,0 dtk (VO 31,33 + ekor ±1,7)
- Audio: `public/audio/iklan-web-app/yubucanvideo.wav` (31,6 dtk, mono 24 kHz). Waktu sudah dikunci ke audio.
- BPM musik: tidak ada
- Pesan utama: kalau kantor masih rekap manual, saatnya punya aplikasi web sendiri — konsultasi gratis.
- Warna: latar `bg`, teks `text`, aksen **`brand` #F20D0D** (merah logo).
- Aset: `public/karya/*.webp` (dari repo `youcandbuilds`), `public/brand/youcanbuild-wordmark.png`.

## Konsep

Satu stickman "orang kantor". Babak masalah (S01–S04) digambar garis; babak solusi (S05–S06)
memakai **tangkapan layar aplikasi asli** di dalam laptop bergaya garis. S05→S06 tidak di-fade
(laptop menyambung).

## Daftar adegan

| ID  | Judul   | Mulai | Selesai | Shot | Teks di layar | Naskah | Gerakan |
|-----|---------|-------|---------|------|---------------|--------|---------|
| S01 | Hook    | 0,0   | 3,7     | wide | pil "3 TANDA"; "Kantor Anda sudah butuh **aplikasi sendiri?**" | 1 | stickman berjalan masuk 0,3–1,6, berhenti → pose berpikir; "?" muncul 2,0 |
| S02 | Tanda 1 | 3,7   | 7,9     | wide | **1**; "Laporan masih direkap **manual.**" | 2 | kertas jatuh satu-satu 1,0–2,6; kalender 30→31 di `akhirBulan`; stickman lemas 2,0–2,6, keringat 2,9 |
| S03 | Tanda 2 | 7,9   | 11,9    | wide | **2**; "Data tercecer di Excel & **chat.**" | 3 | dua file Excel terbang masuk menjelang `excel`; tiga chat menjelang `whatsapp`; stickman panik (tangan bergantian) |
| S04 | Tanda 3 | 11,9  | 17,6    | wide | **3**; "YANG PALING SERING DIABAIKAN:"; "Tim sibuk, kerjaannya **itu-itu lagi.**" | 4 | roda muncul 2,3; berputar makin cepat dari 2,5; stickman berlari di roda |
| S05 | Solusi  | 17,6  | 23,0    | laptop | "KALAU SATU SAJA KENA…"; "Saatnya pakai aplikasi web **khusus kantor** Anda." | 5 | laptop muncul 0,15; file/chat tersedot ke layar 0,5–1,55; dashboard **Pracaya** di `saatnya`+0,1; sorotan merah "Laba Bersih" +1,0; stickman lemas → lompat senang |
| S06 | Karya   | 23,0  | 28,4    | laptop → kisi | "KARYA YOUCANBUILD"; "Contoh yang sudah kami **bangun.**"; chip nama karya | 6 | Pracaya ("laporan outlet") geser ke **Wisma Avicenna** denah kamar di `kos`, zoom 1→1,08; di `sudahKami` laptop diganti kisi 9 karya (stagger 0,05); stickman menunjuk |
| S99 | Penutup | 28,4  | 33,0    | CTA | wordmark **Youcanbuild**; "Konsultasinya **gratis.**"; tombol merah "Konsultasi sekarang →" | 7 | logo scale 0,96→1; judul per kata di `gratis`; tombol di `sekarang`, berdenyut 1× (+0,8); stickman menunjuk tombol |

## Marker audio

Awal frasa diukur dari jeda (`silencedetect`, −35 dB): 14 potongan suara cocok dengan frasa naskah.
Yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.

| Nama        | Detik | Keterangan |
|-------------|-------|------------|
| tigaTanda   | 0,26  | "Tiga tanda kantor Anda…" |
| satu        | 3,90  | "Satu:" |
| laporan     | 4,72  | "laporan masih direkap manual…" |
| akhirBulan  | 6,72* | "akhir bulan" |
| dua         | 8,09  | "Dua:" |
| data        | 8,92  | "data penting tercecer…" |
| excel       | 10,35*| "Excel" |
| whatsapp    | 11,07*| "WhatsApp" |
| tiga        | 12,11 | "Tiga," |
| diabaikan   | 12,80 | "yang paling sering diabaikan:" |
| timSibuk    | 14,68 | "tim sibuk," |
| ituItu      | 16,27*| "itu-itu lagi." |
| kalau       | 17,81 | "Kalau satu saja kena," |
| saatnya     | 19,17 | "saatnya pakai aplikasi web…" |
| aplikasiWeb | 19,95*| "aplikasi web" |
| seperti     | 23,18 | "Seperti sistem laporan outlet" |
| kos         | 24,87*| "dan aplikasi manajemen kos" |
| sudahKami   | 26,25*| "yang sudah kami bangun di Youcanbuild." |
| gratis      | 28,60 | "Konsultasinya gratis." |
| sekarang    | 30,03 | "Konsultasi sekarang juga." |
