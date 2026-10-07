# TREATMENT — cara-bikinnya

- Durasi: 36,1 dtk (audio 34,57 + ekor ±1,5)
- Audio: `public/audio/cara-bikinnya/Video_2_gass_.wav` (34,57 dtk, mono 24 kHz). Waktu sudah dikunci ke audio.
- BPM musik: tidak ada
- Pesan utama: bikin video bisa tanpa aplikasi edit — cukup ide, tablet, dan Claude Code.
- Logo: tidak dipakai. Penutup = pertanyaan + ajakan komentar "KODE" + follow.
- Platform: TikTok. Teks penting dijauhkan dari pojok kanan bawah (tombol aplikasi).

## Konsep gerak

Satu panggung yang menyambung: **panel kode** (S03→S04) mengecil masuk ke **layar tablet** (S05),
tablet tetap di layar sampai S08 sementara isinya berganti. **Rel langkah** di kiri
(IDE → NASKAH → STORYBOARD → ANIMASI → SUARA → VIDEO) menyala mengikuti VO.
Adegan S03–S07 tidak di-fade: hanya judul yang keluar, elemen utama diteruskan (match cut).

## Daftar adegan

| ID  | Judul        | Mulai | Selesai | Shot     | Teks di layar | Naskah | Gerakan |
|-----|--------------|-------|---------|----------|---------------|--------|---------|
| S01 | Hook         | 0,0   | 4,0     | kartu    | "Video tadi…" / "tidak dibuat di aplikasi **edit.**" + kartu berisi video pertama | baris 1 | kartu memutar adegan Rocky S02; kartu dibalik 2,2–2,9 dtk → sisi belakang berisi kode |
| S02 | Tanpa editor | 4,0   | 7,5     | wide     | "Tidak ada…" + ikon timeline "Timeline", ikon drag "Drag-and-drop" | baris 2 | baris muncul di `timeline` / `drag`; dicoret garis aksen +0,8 / +0,9 dtk |
| S03 | Kode         | 7,5   | 11,7    | panel    | "Semuanya ditulis sebagai **kode.**" + pil "pakai Remotion" + panel kode | baris 3 | panel naik 0,2; kode diketik 0,6–3,4; pil di `remotion` |
| S04 | Claude Code  | 11,7  | 14,45   | panel    | "Yang menulis kodenya:" / "**Claude Code.**" | baris 4 | panel tetap; baris "// siap preview ✓" diketik + label kursor "Claude Code" di `claudeCode` |
| S05 | Tablet       | 14,45 | 18,85   | tablet   | "Saya cuma pegang **tablet.**" + "Samsung Galaxy Tab A11+" | baris 5 | panel mengecil masuk layar tablet 0–0,9; label di `samsung` |
| S06 | Langkah      | 18,85 | 24,1    | tablet + rel | "Saya ketik ide." / "**Claude** yang kerjakan sisanya." | baris 6 | tablet geser kanan; rel muncul; layar: prompt → NASKAH.md → TREATMENT.md → preview, di `ide`/`naskah`/`storyboard`/`animasi` |
| S07 | Suara        | 24,1  | 27,9    | tablet + rel | "Suara masuk, sinkron sampai ke **kata.**" | baris 7 | rel → SUARA; gelombang + playhead; kata menyala per kata (`SINKRON_WORDS`) |
| S08 | Cloud        | 27,9  | 31,35   | tablet + awan | "Tabletnya santai." / "Render di **cloud.**" | baris 8 | tablet turun & mengecil 0,8; layar "BEBAN TABLET: santai"; awan di `cloud`; chip "render ↑" naik, "video.mp4 ↓" turun; rel → VIDEO |
| S99 | Penutup      | 31,35 | 36,1    | CTA      | "Mau lihat **prosesnya?**" + kartu "MAU TUTORIAL LENGKAPNYA? KOMEN: **KODE**" + "Follow untuk part berikutnya →" | baris 9 | judul per kata; kartu 0,7; "KODE" diketik 1,0–1,4; follow di `follow` |

## Marker audio

Diukur dari jeda di audio (`silencedetect`, −35 dB): 20 potongan suara cocok 1:1 dengan frasa naskah.

| Nama        | Detik | Keterangan |
|-------------|-------|------------|
| videoTadi   | 0,00  | "Video tadi…" |
| tidakDibuat | 1,37  | "tidak dibuat di aplikasi edit video" |
| timeline    | 4,19  | "Tidak ada timeline" |
| drag        | 5,57  | "Tidak ada drag-and-drop" |
| semuanya    | 7,70  | "Semuanya ditulis sebagai kode" |
| remotion    | 10,05 | "pakai Remotion" |
| yangMenulis | 11,90 | "Yang menulis kodenya:" |
| claudeCode  | 13,38 | "Claude Code" |
| tablet      | 14,64 | "Saya cuma pegang tablet" |
| samsung     | 16,37 | "Samsung Galaxy Tab A11+" |
| ide         | 19,05 | "Saya ketik idenya" |
| naskah      | 20,42 | "Claude bikin naskah" |
| storyboard  | 21,86 | "storyboard" |
| animasi     | 22,66 | "lalu animasinya" |
| suara       | 24,30 | "Saya kasih suara" |
| sinkron     | 25,69 | "dia sinkronkan sampai ke kata" (per kata: perkiraan suku kata) |
| santai      | 28,12 | "Tabletnya santai" |
| cloud       | 29,33 | "karena render-nya jalan di cloud" |
| prosesnya   | 31,53 | "Mau lihat prosesnya?" |
| follow      | 32,92 | "Follow untuk part berikutnya" |
