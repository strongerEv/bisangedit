# Panduan Gaya

> Bagian bertanda **[ISI]** diisi sesuai brand kamu. Selama belum diisi, Claude wajib bertanya sebelum memakai nilai lain.

## 1. WAJIB

### Format
- Ukuran: **1080 × 1920** (vertikal, 9:16)
- FPS: **30** *(ubah ke 60 kalau ingin gerakan lebih halus; render jadi lebih lama)*
- Safe area: jarak minimal **96 px** dari kiri/kanan, **220 px** dari atas, **320 px** dari bawah (area tombol & caption aplikasi)

### Brand
- Nama brand: **[ISI]**
- Logo: `public/brand/logo.svg` **[ISI]**
- Warna:
  - Latar: **[ISI]** (misal `#F7F8FA`)
  - Teks utama: **[ISI]** (misal `#111111`)
  - Aksen: **[ISI]** (misal `#3B6FF6`), dipakai untuk 1 – 2 kata penting per layar saja
- Font:
  - Judul: **[ISI]** (misal Inter Tight, tebal)
  - Isi/kode: **[ISI]** (misal JetBrains Mono)
- Semua warna dan font diambil dari `src/components/theme.ts`. **Jangan** menulis kode warna langsung di adegan.

### Warna latar & aksen (aturan tetap)
- **Latar dasar selalu putih** (`#FFFFFF`, boleh dengan bidang/bulatan sangat muda dari warna aksen) — semua video
  harus terasa satu seri, jangan berganti-ganti latar gelap/terang antar video.
- **Aksen mengikuti tone warna aplikasi** yang dibahas: ambil dari CSS/design system repo aplikasinya
  (contoh: ingonentok → hijau tua `#1E5B2F` + hijau daun `#7CB342` + kuning `#F7C948`; Fiviz → biru `#1748D9`).
- Aksen dipakai untuk judul yang ditekankan, chip, kotak sorot, dan bingkai HP. Maksimal 2 warna aksen + 1 warna peringatan.
- Tombol CTA Youcanbuild tetap merah brand (`theme.colors.brand`).

### Watermark (khusus video brand Youcanbuild)
- Teks biasa (bukan logo): **`© Youcanbuild`**, font judul biasa (Inter Tight), ukuran kecil ±28–30 px.
- **Opacity 50%.** Warna mengikuti latar: teks gelap di latar terang, putih di adegan berlatar gelap.
- Posisi **tengah horizontal, agak ke bawah (y ±1650)** — bukan di pojok, supaya tidak bisa dibuang dengan crop
  (anti-bajak), tapi tetap di atas area caption TikTok/Reels. Kalau bertabrakan dengan chip/teks, **geser
  elemen lain**, bukan watermark-nya.
- Tampil dari awal sampai akhir video. Video untuk akun lain (bukan Youcanbuild) **tidak** diberi watermark.

### Tipografi
- Judul: 96 – 140 px. Isi: 36 – 48 px. Label kecil: ≥ 24 px.
- Maksimal **2 baris** judul dan **8 kata** per baris di layar.
- Satu layar = satu ide.

### Penutup
- Setiap video diakhiri **logo + CTA** (misal "Follow untuk part berikutnya") **[ISI CTA default]**

## 2. BOLEH

- Kartu/panel dengan sudut membulat, bayangan halus
- Penanda tahap kecil di pojok (misal `01 · ATURAN`)
- Highlight kata penting dengan warna aksen atau garis bawah
- Gerakan halus: fade + geser 20 – 40 px, scale 0,96 → 1
- Efek mengetik untuk kode atau prompt

## 3. LARANGAN

- Teks bercahaya/glow berlebihan
- Hujan kode ala Matrix
- Gerakan mengambang tanpa tujuan ala screensaver
- Efek partikel, lens flare, atau glitch tanpa alasan cerita
- Lebih dari 2 warna aksen dalam satu video
- Teks yang bergerak terus saat sedang harus dibaca
- Gambar/ikon dari merek atau karakter milik pihak lain tanpa izin
- Teks keluar dari safe area

> Prinsip: **anti-generik**. Setiap gerakan harus membantu penonton memahami isi, bukan sekadar hiasan.
