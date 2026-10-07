# Motion-Graphics-Code — Aturan Kerja

Repo ini berisi video yang dibuat dengan Remotion (React).
File ini dibaca Claude di awal setiap sesi. Aturan di sini berlaku untuk SEMUA pekerjaan.

## Aturan tetap

1. **Review dulu, kerjakan kemudian.**
   Untuk setiap permintaan, tulis dulu: (a) apa yang kamu pahami, (b) rencana langkahnya, (c) file yang akan diubah.
   Lalu tunggu persetujuan ("ok", "lanjut", "gas"). Jangan menulis atau mengubah file sebelum disetujui.
2. **Satu tahap, satu persetujuan.**
   Ikuti urutan tahap di skill `video-studio` (Naskah → Storyboard → Kode → Suara → Cek).
   Jangan melompat ke tahap berikutnya sebelum tahap sekarang disetujui.
3. **Hasil kerja = kode siap preview.**
   Preview dilakukan oleh user di aplikasinya sendiri.
   **Jangan render MP4** kecuali user meminta dengan jelas ("render sekarang").
4. **Jangan pernah `git commit` / `git push` tanpa izin.**
   Setelah pekerjaan selesai, tampilkan daftar file yang berubah dan usulan pesan commit, lalu tunggu.
5. **Jangan mengubah yang tidak diminta.**
   Kalau melihat masalah di luar permintaan, laporkan saja dan jangan langsung diperbaiki.
6. **Kalau ragu, tanya.** Satu pertanyaan singkat lebih baik daripada menebak lalu mengulang.

## Video baru

Setiap video baru **wajib** memakai skill `video-studio` (`.claude/skills/video-studio/`).
Baca `SKILL.md`, `STYLE.md`, dan `TIMELINE.md` sebelum mulai.

## Suara

- File suara (voiceover/musik) **selalu diupload oleh user**.
  Jangan membuat, mengganti, atau memotong audio tanpa diminta.
- Audio adalah patokan waktu. Animasi menyesuaikan audio, bukan sebaliknya.

## Struktur folder

```
src/
  videos/<nama-video>/
    NASKAH.md        ← tahap 02
    TREATMENT.md     ← tahap 03 (storyboard per detik)
    timeline.ts      ← semua angka waktu video ini
    index.tsx        ← komposisi utama
    scenes/S01.tsx … ← satu file per adegan
  components/        ← komponen yang dipakai ulang
  Root.tsx           ← daftar semua komposisi
public/
  audio/<nama-video>/   ← upload suara dari user
  brand/                ← logo, font
```

## Laporan setelah selesai

Tutup setiap pekerjaan dengan:
- file yang dibuat/diubah,
- nama komposisi yang bisa dibuka di preview,
- hal yang perlu dicek user,
- usulan pesan commit (belum dijalankan).
