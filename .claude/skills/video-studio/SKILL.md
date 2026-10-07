---
name: video-studio
description: Wajib dipakai untuk setiap video Remotion baru atau revisi besar. Berisi urutan tahap kerja dari naskah sampai render, beserta aturan gaya dan timeline.
---

# Video Studio — Alur Kerja

Baca juga:
- `STYLE.md`: panduan gaya (WAJIB & LARANGAN)
- `TIMELINE.md`: aturan waktu dan sinkronisasi
- `TREATMENT.template.md`: format storyboard

Setiap tahap punya **hasil** dan **gerbang**.
Gerbang = berhenti, tampilkan hasil, tunggu persetujuan user.

---

## 00 · Siapkan
- Cek proyek Remotion sudah ada (`package.json` berisi `remotion`).
- Buat folder `src/videos/<nama-video>/` dan `public/audio/<nama-video>/`.
- **Gerbang:** konfirmasi nama video, durasi target, dan tujuan video.

## 02 · Naskah
- Tulis `NASKAH.md`: tujuan video, target penonton, pesan utama (1 kalimat), lalu naskah per baris.
- Satu baris naskah = satu ide. Kalimat pendek, mudah dibaca di layar HP.
- **Gerbang:** user menyetujui naskah.

## 03 · Storyboard
- Tulis `TREATMENT.md` mengikuti `TREATMENT.template.md`.
- Setiap adegan (S01, S02, …) punya detik mulai dan selesai, shot, teks di layar, potongan naskah, dan gerakan.
- Kalau audio belum ada, pakai waktu perkiraan dan tandai `~`. Waktu final dikunci di tahap 05.
- **Gerbang:** user menyetujui storyboard. **Jangan menulis kode sebelum ini.**

## 04 · Kode
- Salin waktu dari `TREATMENT.md` ke `timeline.ts` (lihat `TIMELINE.md`).
- Satu adegan = satu file di `scenes/`. Komposisi utama merangkai adegan dengan `<Sequence>`.
- Semua gaya harus mengikuti `STYLE.md`.
- **Gerbang:** user mengecek di preview.

## 05 · Suara
- User mengupload audio ke `public/audio/<nama-video>/`.
- Ukur durasi audio (`ffprobe`), lalu catat waktu tiap kalimat atau ketukan penting.
- Perbarui `TREATMENT.md` (hapus tanda `~`), lalu `timeline.ts`. Kode adegan tidak perlu diubah kalau aturan timeline diikuti.
- Durasi komposisi = durasi audio + ekor penutup (lihat `TIMELINE.md`).
- **Gerbang:** user mengecek sinkronisasi di preview.

## 06 · Cek & Render
Jalankan checklist ini dan laporkan hasilnya:
- [ ] Ukuran dan fps sesuai `STYLE.md`
- [ ] Semua adegan di `TREATMENT.md` ada di kode, dengan urutan dan waktu yang sama
- [ ] Tidak ada teks keluar dari safe area
- [ ] Penutup logo + CTA ada
- [ ] Tidak ada pelanggaran LARANGAN
- [ ] `npx tsc --noEmit` lolos tanpa error

Render **hanya jika diminta**:
`npx remotion render <NamaKomposisi> out/<nama-video>.mp4`

Commit **hanya jika diizinkan**.

## Revisi
- Revisi kecil (warna, teks, timing satu adegan): langsung ke tahap terkait, tetap lewat gerbang.
- Revisi besar (urutan cerita berubah): kembali ke tahap 03.
- Setiap perubahan waktu dicatat di `TREATMENT.md` **dan** `timeline.ts`. Keduanya harus selalu sama.
