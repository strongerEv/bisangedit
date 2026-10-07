# TREATMENT — tutorial-claude-code

- Durasi: 42,7 dtk (VO 41,17 + ekor ±1,5)
- Audio: `public/audio/tutorial-claude-code/stepclaude.wav` (41,2 dtk, mono 24 kHz). Waktu sudah dikunci ke audio.
- BPM musik: tidak ada
- Pesan utama: tanpa jago ngoding, kamu bisa punya aplikasi web sendiri lewat Claude Code.
- Warna: aksen `brand` #F20D0D. Tanpa stickman. Tanpa logo pihak lain.

## Konsep

Panggung tetap S02–S06: **progress 5 segmen** + label "LANGKAH n / 5" di atas, judul langkah,
dan **satu jendela aplikasi** yang isinya berganti tiap langkah (panggung tidak di-fade; hanya judul
dan isi jendela yang keluar-masuk). S01 memberi peta 5 langkah; S99 menutup dengan Youcanbuild.

## Daftar adegan

| ID  | Judul     | Mulai | Selesai | Shot | Teks di layar | Naskah | Gerakan |
|-----|-----------|-------|---------|------|---------------|--------|---------|
| S01 | Hook      | 0,0   | 6,3     | wide | "Mau bikin **aplikasi** web sendiri," / "tapi nggak jago ngoding?" + pil "5 LANGKAH · CLAUDE CODE" + daftar 5 langkah | 1 | judul per kata di `mau`, `nggakJago`; daftar stagger 0,12 dari `limaLangkah` |
| S02 | Langkah 1 | 6,3   | 12,4    | jendela | "Langganan **Claude.**"; "Claude Pro", "**$20** / bulan", "✓ Sudah termasuk Claude Code"; catatan "Harga per Okt 2026 · belum termasuk pajak" | 2 | progress + jendela masuk; harga muncul di `duaPuluh`; centang di `termasuk` |
| S03 | Langkah 2 | 12,4  | 19,1    | jendela | "Hubungkan **GitHub.**"; simpul Claude Code — GitHub; repo "aplikasi-saya" + daftar file | 3 | garis sambung di `hubungkan` → GitHub "✓ terhubung"; repo + file stagger di `disimpan` |
| S04 | Langkah 3 | 19,1  | 24,45   | jendela | "Ceritakan **aplikasimu.**"; chat permintaan; "Claude ▸ menulis kode…" + kode | 4 | permintaan diketik 0,4–2,6; kode diketik dari `menulis` |
| S05 | Langkah 4 | 24,45 | 29,85   | jendela | "Sambungkan ke layanan **deploy.**"; GitHub → Vercel / Netlify / Lainnya… | 5 | garis + simpul muncul di `vercel`, `netlify`, `lainnya` |
| S06 | Langkah 5 | 29,85 | 36,5    | jendela | "Otomatis **online.**"; git push → progress build → "✓ Ready"; lalu browser `aplikasi-saya.vercel.app` + aplikasi Absensi | 6 | build dari `tayang`+0,4; tampilan browser di `online`, URL diketik |
| S99 | Penutup   | 36,5  | 42,7    | CTA | "Simpan video ini." / "Mau dibantu **bikin?**" / wordmark Youcanbuild / "Konsultasi **gratis.**" / tombol "Konsultasi sekarang →" | 7 | per kata di `simpan`, `dibantu`; logo + tombol dari `konsultasi` |

## Marker audio

Awal frasa diukur dari jeda (`silencedetect`, −35 dB): 19 potongan suara cocok dengan frasa naskah.
Yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.

| Nama        | Detik | Keterangan |
|-------------|-------|------------|
| mau         | 0,25  | "Mau bikin aplikasi web sendiri," |
| nggakJago   | 2,21  | "tapi nggak jago ngoding?" |
| limaLangkah | 3,69  | "Ini lima langkahnya pakai Claude Code." |
| satu        | 6,52  | "Satu:" |
| langganan   | 7,25  | "langganan Claude." |
| paketPro    | 8,37  | "Paket Pro mulai…" |
| duaPuluh    | 9,13* | "dua puluh dolar" |
| termasuk    | 10,71 | "sudah termasuk Claude Code." |
| dua         | 12,62 | "Dua: bikin akun GitHub…" |
| hubungkan   | 14,51*| "hubungkan ke Claude Code" |
| disimpan    | 16,13 | "Di sinilah semua kode aplikasimu disimpan." |
| tiga        | 19,31 | "Tiga: ceritakan aplikasimu…" |
| menulis     | 22,64 | "Claude yang menulis kodenya." |
| empat       | 24,67 | "Empat: sambungkan GitHub ke Vercel," |
| vercel      | 26,41*| "Vercel" |
| netlify     | 27,07 | "Netlify," |
| lainnya     | 27,92*| "atau layanan deploy lainnya." |
| lima        | 30,08 | "Lima:" |
| tayang      | 30,71 | "setiap kode… otomatis tayang." |
| online      | 33,54 | "Aplikasimu online, bisa dibuka lewat link." |
| simpan      | 36,69 | "Simpan video ini." |
| dibantu     | 38,07 | "Mau dibantu bikin?" |
| konsultasi  | 39,32 | "Konsultasi gratis di Youcanbuild." |
