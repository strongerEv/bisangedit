# TREATMENT — rocky-wantimpres

- Durasi: 37,3 dtk (audio 35,8 + ekor 1,5)
- Audio: `public/audio/rocky-wantimpres/nusa-voice-ai.wav` (35,8 dtk, mono 24 kHz). Waktu sudah dikunci ke audio.
- BPM musik: tidak ada
- Pesan utama: yang pindah ke istana orangnya, nadanya belum tentu.
- Logo: **tidak dipakai dulu** (permintaan user). Penutup hanya CTA.

## Motif visual

Diagram "ISTANA": kotak garis membulat + titik aksen (= Rocky).
Titik di luar kotak (S01) → masuk ke dalam (S02) → diulang dengan label LUAR/DALAM (S07).
Gerakan titik = inti cerita (pindah dari luar ke dalam), bukan hiasan.

## Daftar adegan

| ID  | Judul      | Mulai | Selesai | Shot     | Teks di layar | Naskah | Gerakan |
|-----|------------|-------|---------|----------|---------------|--------|---------|
| S01 | Dulu       | 0,0   | 3,5     | wide     | tag `01 · DULU`; "Dulu kerjanya mengkritik **istana.**" + diagram, titik di luar | baris 1 | judul per kata (stagger 0,1); diagram fade + scale 0,96→1; garis kritik di `kritik`+0,3 |
| S02 | Sekarang   | 3,5   | 6,7     | wide     | tag `02 · SEKARANG`; "Sekarang, kantornya **di istana.**" + diagram | baris 2 | judul per kata; titik melompat masuk di `kantornya`+0,4 |
| S03 | Fakta      | 6,7   | 12,6    | kartu    | tag `03 · FAKTA`; kartu: "2 OKTOBER 2026 · ISTANA NEGARA" / "Rocky Gerung" / "resmi jadi anggota **Wantimpres**" / "Keppres 107/P 2026 · 26 anggota" | baris 3 | kartu scale 0,96→1; tanggal di `tanggal`; nama di `nama`; baris jabatan +0,6; catatan +1,0 |
| S04 | Tugas      | 12,6  | 16,6    | close-up | tag `04 · TUGAS`; "TUGASNYA:"; "Memberi **nasihat** kepada Presiden." | baris 4 | label fade 0,1; judul per kata di `memberi` |
| S05 | Bayangkan  | 16,6  | 19,0    | close-up | label "ADEGAN IMAJINASI"; "Bayangkan rapat **pertamanya.**" | baris 5 | label fade; judul per kata |
| S06 | Rapat      | 19,0  | 24,4    | chat     | label "ADEGAN IMAJINASI"; bubble kiri "Pimpinan rapat: Bagaimana pendapat Bung Rocky?"; bubble kanan "Rocky: Pertanyaannya… **dungu.**" | baris 6–7 | bubble 1 di `tanya`; "mengetik…" `tanya`+1,9; bubble 2 di `jawab`; kata "dungu." muncul di `dungu`; jeda panjang sesudahnya dibiarkan |
| S07 | Katanya    | 24,4  | 27,6    | wide     | tag `06 · KATANYA`; "“Cuma pindah dari **luar** ke **dalam.**”" + "— Rocky Gerung, usai dilantik" + diagram LUAR/DALAM | baris 8 | kutipan per kata di `katanya`; titik pindah luar→dalam di 1,6 dtk |
| S08 | Pertanyaan | 27,6  | 32,5    | close-up | tag `07 · PERTANYAAN`; "PERTANYAANNYA SEKARANG:" / "Yang pindah orangnya…" / "atau **nadanya?**" | baris 9 | label 0,2; baris 1 di `orangnya`; baris 2 di `nadanya` |
| S99 | Penutup    | 32,5  | 37,3    | CTA      | "Kita lihat saja." + tombol "Follow untuk part berikutnya" (tanpa logo) | baris 10 | judul scale 0,96→1; CTA di `follow` |

Teks muncul 0,1 dtk sebelum kata diucapkan. Pergantian adegan di jeda, 0,2 dtk sebelum kalimat berikut.

## Marker audio

Diukur dari jeda di audio (`silencedetect`, −35 dB) lalu dicocokkan dengan jumlah suku kata tiap kalimat.

| Nama      | Detik | Keterangan |
|-----------|-------|------------|
| kritik    | 1,35  | "kerjanya mengkritik istana" |
| kantornya | 4,72  | "kantornya di istana" |
| tanggal   | 6,95  | "Dua Oktober dua ribu dua puluh enam" |
| nama      | 9,55  | "Rocky Gerung resmi jadi anggota Wantimpres" |
| memberi   | 14,01 | "memberi nasihat kepada Presiden" |
| tanya     | 19,23 | "Bagaimana pendapat Bung Rocky?" |
| jawab     | 21,55 | "Pertanyaannya…" |
| dungu     | 22,74 | "dungu." |
| katanya   | 24,61 | "Katanya, dia cuma pindah…" |
| orangnya  | 29,39 | "yang pindah orangnya…" |
| nadanya   | 30,97 | "atau nadanya?" |
| follow    | 33,89 | "Follow untuk part berikutnya" |
