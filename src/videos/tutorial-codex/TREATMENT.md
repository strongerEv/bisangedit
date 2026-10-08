# TREATMENT — tutorial-codex

- Durasi: 51,1 dtk (VO 49,57 + ekor ±1,5)
- Audio: `public/audio/tutorial-codex/codexbro.wav` (49,9 dtk, mono 24 kHz). Waktu sudah dikunci ke audio.
- BPM musik: tidak ada
- Template: sama dengan tutorial-claude-code (memakai `tutorial-claude-code/parts.tsx`): progress 5 segmen,
  judul langkah, satu jendela aplikasi yang isinya berganti. Aksen `brand` #F20D0D.

## Daftar adegan

| ID  | Judul     | Mulai | Selesai | Shot | Teks di layar | Naskah | Gerakan |
|-----|-----------|-------|---------|------|---------------|--------|---------|
| S01 | Hook      | 0,0   | 5,9     | wide | "PART 2 · SERI BIKIN APLIKASI"; "Cara bikin aplikasi web pakai **Codex** dari ChatGPT."; pil "5 LANGKAH · CODEX" + daftar 5 langkah | 1 | satu kalimat per kata, jarak dihitung agar "pakai" jatuh di `pakaiCodex`; daftar stagger 0,12 dari `limaLangkah` |
| S02 | Langkah 1 | 5,9   | 13,4    | jendela | "Langganan **ChatGPT Plus.**"; "ChatGPT Plus", "**$20** / bulan", "✓ Codex sudah termasuk"; catatan harga + Free/Go tanpa cloud | 2 | harga di `duaPuluh`; centang di `termasuk` |
| S03 | Langkah 2 | 13,4  | 19,67   | jendela | "Hubungkan **GitHub.**"; Codex — GitHub; "PILIH REPO": toko-online / **kafe-saya** / profil-sekolah | 3 | Codex di `bukaCodex`; garis di `hubungkan`; daftar repo di `pilihRepo`, kafe-saya terpilih +0,9 |
| S04 | Langkah 3 | 19,67 | 28,69   | jendela | "Tulis **tugasnya.**"; "Misalnya:" + tugas diketik; "Codex mengerjakan di cloud…" + progress; 3 centang | 4 | tugas diketik dari `buatkan`; progress + centang dari `cloud` |
| S05 | Langkah 4 | 28,69 | 34,27   | jendela | "Cek, lalu **gabungkan.**"; perubahan 3 file; tombol "Buat pull request"; kartu PR #1 + "Gabungkan" + "✓ Digabung ke main" | 5 | diff di `cek`; tombol PR ditekan di `pullRequest`; "Gabungkan" ditekan di `gabungkan` |
| S06 | Langkah 5 | 34,27 | 42,05   | jendela | "Sambungkan, lalu **online.**"; GitHub → Vercel / Netlify; lalu browser `kafe-saya.vercel.app` + menu kafe; "✓ Online" | 6 | garis di `vercel`, `netlify`; browser di `setiap`; centang di `online` |
| S99 | Penutup   | 42,05 | 51,1    | CTA | "Kamu pilih yang **mana?**"; kartu Claude Code **VS** Codex; "TULIS DI KOMENTAR ↓"; "Mau dibantu?"; wordmark Youcanbuild; tombol "Konsultasi gratis →" | 7 | kartu di `kamuPilih`+0,5 dan `atauCodex`; komentar di `komentar`; logo + tombol dari `konsultasi` |

## Marker audio

Awal frasa diukur dari jeda (`silencedetect`, −35 dB): 28 potongan suara cocok 1:1 dengan frasa naskah.
Yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.

| Nama        | Detik | Keterangan |
|-------------|-------|------------|
| cara        | 0,26  | "Cara bikin aplikasi web" |
| pakaiCodex  | 1,89  | "pakai Codex dari ChatGPT." |
| limaLangkah | 4,47  | "Lima langkah." |
| satu        | 6,11  | "Satu:" |
| langganan   | 7,00  | "langganan ChatGPT Plus," |
| duaPuluh    | 8,89  | "dua puluh dolar sebulan." |
| termasuk    | 10,74 | "Codex sudah termasuk di dalamnya." |
| dua         | 13,60 | "Dua:" |
| bukaCodex   | 14,35 | "buka Codex," |
| hubungkan   | 15,54 | "hubungkan akun GitHub," |
| pilihRepo   | 17,18 | "lalu pilih repo aplikasimu." |
| tiga        | 19,87 | "Tiga:" |
| tulis       | 20,69 | "tulis tugasnya." |
| misalnya    | 21,95 | "Misalnya:" |
| buatkan     | 22,88 | "buatkan halaman pemesanan untuk kafe saya." |
| cloud       | 26,33 | "Codex mengerjakannya di cloud." |
| empat       | 28,89 | "Empat:" |
| cek         | 29,71 | "cek hasilnya," |
| pullRequest | 30,82 | "buat pull request, lalu gabungkan ke GitHub." |
| gabungkan   | 32,28*| "gabungkan ke GitHub" |
| lima        | 34,47 | "Lima:" |
| sambungkan  | 35,21 | "sambungkan repo ke Vercel atau Netlify." |
| vercel      | 36,94*| "Vercel" |
| netlify     | 37,40*| "Netlify" |
| setiap      | 38,65 | "Setiap perubahan yang digabung," |
| online      | 40,37 | "otomatis online." |
| kamuPilih   | 42,25 | "Kamu pilih Claude Code" |
| atauCodex   | 43,72 | "atau Codex?" |
| komentar    | 44,90 | "Tulis di komentar." |
| dibantu     | 46,63 | "Mau dibantu?" |
| konsultasi  | 47,78 | "Konsultasi gratis di Youcanbuild." |
