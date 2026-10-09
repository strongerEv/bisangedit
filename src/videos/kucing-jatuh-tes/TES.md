# TES GERAK — kucing-jatuh-tes

Tes kualitas motion graphic dengan karakter Mochi (tanpa VO), sebelum produksi video
"Kenapa Kucing Jarang Cedera Jatuh dari Ketinggian?" (±30 dtk).

- Karakter: sprite dipotong dari lembar karakter Mochi (user), latar dihapus dengan flood fill dari tepi,
  diperbesar 2× → `public/karakter/mochi/` (8 pose, 8 ekspresi, 1 gambar besar).
- Satu shot kamera menerus (tanpa potong adegan): atap → tergelincir → jatuh (kamera ikut turun, gedung
  bergulir, garis kecepatan) → refleks membalik badan (panah melingkar) → kaki terentang (panah udara) →
  tanah naik → mendarat (squash & stretch, debu, guncangan kamera) → kartu penutup.
- Motion blur: `@remotion/motion-blur` (`CameraMotionBlur`, shutter 180°, 6 sampel) pada Mochi + garis kecepatan.
- Kecepatan kamera dihitung di `timeline.ts` (percepatan → hambatan udara → mengerem) supaya tanah tiba tepat
  di detik `T.land`.
- Warna di `palette.ts` (mengikuti palet lembar karakter).

| Detik | Kejadian |
|-------|----------|
| 0–1,7 | Duduk di tepi atap, kamera push-in |
| 1,7–2,1 | Tergelincir |
| 2,1–4,0 | Jatuh terbalik, kamera ikut turun |
| 4,0–4,8 | Membalik badan 180° |
| 4,9–7,3 | Kaki terentang, tanah muncul dari 6,4 |
| 7,3–8,8 | Mendarat |
| 8,8–10,5 | Penutup "Kucing itu keren!" |
