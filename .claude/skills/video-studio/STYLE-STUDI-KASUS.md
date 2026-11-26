# Gaya "Studi Kasus" — papan bukti (@mahirambilpeluang)

Dipakai untuk seri **Studi Kasus N** (bedah akun/orang yang jualan produk digital). Tetap mengikuti `STYLE.md`
(latar putih, aksen sesuai akun) — file ini hanya menambah aturan khusus seri studi kasus.

Referensi:
- Gaya visual: `referensi/studi-kasus-papan-bukti.jpg` (papan bukti / corkboard: polaroid, pin merah, benang merah,
  catatan kertas, kaca pembesar, pita garis kuning-hitam, rantai).
- Bahan studi kasus 1: `referensi/studi-kasus-01-nrhouse-{landing,instagram}.mp4`, `referensi/studi-kasus-01-nrhouse-profil.jpg`.

## 1. WAJIB

### Latar
- **Latar dasar tetap PUTIH** dengan grid tipis (pakai `Backdrop` template mahir) — supaya satu seri dengan video
  @mahirambilpeluang lain. Papan bukti tampil sebagai **panel di atas latar putih**, bukan latar gelap kayu penuh.
- Papan: bidang kertas krem/gabus (`#E9DCC3`, tekstur bintik halus) dengan bingkai kayu tipis, sudut sedikit membulat,
  bayangan lembut.

### Elemen papan bukti
- **Polaroid**: foto/screenshot dengan bingkai putih tebal (bawah lebih tebal), sedikit miring (−6° s/d +6°), bayangan.
  Isinya screenshot asli dari bahan (profil IG, landing page, produk, konten).
- **Pin merah**: bulat merah mengilap (radial gradient) di tepi atas tiap polaroid/catatan.
- **Benang merah**: garis merah 4–5 px antar-pin, digambar memanjang (stroke-dashoffset) saat poin baru disebut.
- **Catatan kertas**: kertas krem robek/sobek tepi, tulisan tangan (font tulisan tangan, mis. "Caveat"/"Permanent
  Marker" — muat lewat `@remotion/google-fonts` bila tersedia, atau fallback mono), berisi temuan/angka.
- **Kaca pembesar**: lingkaran lensa + gagang hitam, dipakai untuk **menyorot detail** (angka followers, harga).
- **Pita garis kuning-hitam** (`#F5C400` / `#15171C`) bertulisan "STUDI KASUS • STUDI KASUS •" di tepi bawah/atas papan.
- **Judul "STUDI KASUS N"** di pita/papan kuning (gaya tempelan label), huruf tebal hitam. **Hanya tulisan, tidak
  dibacakan VO.** Di bawahnya: nama akun (mis. `@nrhouse_id`).
- Aksen tetap: merah pin/benang (`#E5484D`), kuning label (`#F5C400`), biru template (`#2457D6`) untuk chip/karaoke.

### Gerak kamera
- Seluruh papan berada dalam satu "kamera" yang **zoom in / zoom out & geser (pan)** ke polaroid yang sedang dibahas
  (scale 1 → 1,6–2,2, easing halus ~0,6 dtk), lalu kembali ke tampilan penuh saat pindah babak.
- Saat polaroid baru disebut: polaroid "ditempel" (jatuh sedikit + pop), pin menancap, benang merah memanjang ke pin
  sebelumnya.
- Screenshot panjang (landing page) boleh **di-scroll pelan di dalam polaroid** atau dipotong per bagian.

### Teks & suara
- Subtitle karaoke template mahir tetap dipakai (di bawah papan, y ±1050).
- Karakter @mahirambilpeluang tetap di bawah, kiri/kanan bergantian.
- SFX khas papan bukti: pin tancap (pop/klik), kertas ditempel (kertas), benang ditarik (swish), kamera
  rana (kamera), zoom (whoosh), stempel (pukulan). Tetap variasikan antar video.

### Struktur isi studi kasus
1. **Hook** (dibacakan): hasil orang tersebut (angka yang **bisa dibuktikan** dari bahan; jika klaim, tulis "klaim").
2. Profil akun (polaroid profil + kaca pembesar ke angka followers/views).
3. Strategi organik: personal branding (konten keluarga, rumah, daily activity) — polaroid konten.
4. Funnel: link di bio → landing page → daftar produk.
5. Ragam produk + **rentang harga** (catatan kertas berisi harga termurah–termahal).
6. Strategi non-organik: iklan (mis. Meta Ads).
7. Pelajaran untuk penonton + CTA.

## 2. ETIKA & KEAMANAN (wajib dicek sebelum produksi)
- Pakai **hanya materi publik** dari akun yang dibahas; sebut sumbernya (nama akun) di layar.
- **Angka penghasilan**: jangan mengarang. Tampilkan angka yang terlihat di bahan (followers, views, harga produk) atau
  klaim yang mereka tulis sendiri — dengan label "klaim".
- **Wajah anak-anak di-blur** pada screenshot konten keluarga.
- Nada video **membedah/belajar**, bukan menyindir atau menyerang orangnya.

## 3. LARANGAN
- Latar papan kayu gelap memenuhi seluruh layar (latar dasar harus putih).
- Logo/brand milik akun yang dibahas dipakai seolah-olah video resmi mereka.
- Klaim penghasilan tanpa sumber.
