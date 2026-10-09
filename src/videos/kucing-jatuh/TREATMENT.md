# TREATMENT — kucing-jatuh

- Durasi: 40,1 dtk (VO 38,58 + ekor 1,5)
- Audio: `public/audio/kucing-jatuh/animasikucing.wav` (38,9 dtk, mono 24 kHz). Waktu dikunci ke audio.
- Gaya: dikembangkan dari `kucing-jatuh-tes` — satu shot kamera menerus (kecepatan kamera dihitung di
  timeline.ts, dengan gerak lambat di "Kok bisa?" dan kartu tulang), motion blur (`@remotion/motion-blur`) pada Mochi.
- Warna: `palette.ts` (palet lembar karakter + danger/x-ray).

## Daftar adegan

| ID   | Judul            | Mulai | Selesai | Isi / gerakan |
|------|------------------|-------|---------|---------------|
| SHOT | Atap → mendarat  | 0,0   | 28,59   | duduk di atap (push-in) → tergelincir 1,3 → jatuh 1,75 · **KOK BISA?** + waktu melambat + vinyet 4,29–5,89 · lencana telinga dalam 5,99 · putar 90° di 11,12 (label "1 depan dulu") + 90° di 12,09 ("2 baru belakang") + panah melingkar · kartu X-ray 13,45–19,05 (tulang punggung melengkung; tulang selangka disorot di 16,08) · kaki terentang 19,1 + panah udara · kartu kecepatan 20,1 (bar tumbuh di 22,12) · tanah 23,97 · mendarat 25,12 (squash, debu, guncangan) |
| WARN | Tetap bisa cedera| 28,59 | 34,01   | gedung 5 lantai, Mochi takut di jendela lantai 2 · garis jatuh pendek "terlalu rendah" di 31,05 · ikon putar + ✗ "tak sempat berputar" di 32,16 |
| SAFE | Pasang pengaman  | 34,01 | 36,49   | jendela besar, Mochi duduk di dalam · jaring pengaman tergambar di 34,92 · "✓ aman" |
| END  | Keren, bukan kebal | 36,49 | 40,08 | "Kucing itu keren…" di 36,69 · "bukan **kebal.**" di 37,83 · Mochi besar naik dari bawah |

Teks di layar (chip atas) mengikuti `CAPTIONS` di timeline.ts; muncul 0,1 dtk sebelum frasa diucapkan.
Adegan berikut memudar masuk 0,3 dtk di atas adegan sebelumnya.

## Marker audio

| Nama | Detik | Frasa |
|------|-------|-------|
| jatuh | 0,31 | "Kucing jatuh dari ketinggian…" |
| mendaratKaki | 2,34 | "tapi mendarat pakai kaki." |
| kokBisa | 4,49 | "Kok bisa?" |
| telinga | 5,89 | "Telinga dalamnya…" |
| duaTahap | 8,90 | "Lalu badannya memutar dua tahap:" |
| depan | 11,22 | "depan dulu," |
| belakang | 12,19 | "baru belakang." |
| punggung | 13,65 | "…tulang punggungnya lentur," |
| selangka | 16,18 | "dan tulang selangkanya…" |
| tegak | 19,20 | "Setelah tegak," |
| parasut | 20,20 | "kakinya merentang seperti parasut." |
| pelan | 22,22 | "Jatuhnya jadi lebih pelan." |
| mendarat | 24,37 | "Mendarat?" |
| kakiDulu | 25,18 | "Kaki dulu…" |
| menekuk | 26,07 | "lalu menekuk…" |
| cedera | 28,79 | "Tapi kucing tetap bisa cedera." |
| rendah | 31,05 | "Dari tempat rendah," |
| takSempat | 32,16 | "dia malah tak sempat berputar." |
| jadi | 34,21 | "Jadi," |
| pengaman | 34,92 | "pasang pengaman di jendela." |
| keren | 36,69 | "Kucing itu keren…" |
| kebal | 37,83 | "bukan kebal." |
