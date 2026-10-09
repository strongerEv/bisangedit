# TREATMENT — cara-remotion

- Durasi: 45,5 dtk (VO 44,02 + ekor 1,5)
- Audio: `public/audio/cara-remotion/explainremotion001.wav` (44,3 dtk, mono 24 kHz). Waktu dikunci ke audio.
- Aset: `public/aset/cara-remotion/` — 8 pose Mochi + 8 props (dipotong dari 2 lembar ChatGPT berlatar transparan),
  3 latar, dan `lembar_mochi.png` (lembar asli, dipakai di langkah 2).
- Warna: palet Mochi (`kucing-jatuh/palette.ts`). Langkah 1–5: latar studio + lapisan krem, header "LANGKAH n / 5".
  Isi adegan keluar sendiri; latar & header tetap → potongan antar langkah mulus.

## Daftar adegan

| ID  | Judul       | Mulai | Selesai | Isi / gerakan |
|-----|-------------|-------|---------|---------------|
| S01 | Hook        | 0,0   | 5,28    | latar studio; papan klap "klap" 0,1; "Video ini… dibuat pakai **kode.**"; Mochi kaget naik di `kode`; "Namanya **Remotion.**" di `namanya` |
| S02 | Remotion    | 5,28  | 13,77   | "Bikin video pakai **React**"; kartu React → Video di `react`; "bahasa untuk bikin website"; "Tapi kodenya… saya serahkan ke" + chip **Claude Code** memantul di `claudeCode`; Mochi menunjuk |
| S03 | 1 · Naskah  | 13,77 | 19,29   | chat "Buatkan naskah…" diketik di `naskah`; balasan "✓ Fakta sudah dicek" di `cekFakta`; kisi storyboard 6 panel di `storyboard`; Mochi mengetik |
| S04 | 2 · Aset    | 19,29 | 25,50   | lembar asli ChatGPT di `chatgpt`; garis potong di `memotong`; berubah jadi 8 aset di atas kotak-kotak transparan |
| S05 | 3 · Suara   | 25,50 | 31,10   | gelombang suara + playhead; 5 penanda jatuh di `sinkron`; "sampai ke kata." menyala per kata (`sampai`, `ke`, `kata`); roda gigi berputar; Mochi berpikir |
| S06 | 4 · Preview | 31,10 | 36,50   | latar bioskop; 6 frame preview muncul di `preview`; satu frame diberi lingkar oranye + chat "Yang ini geser sedikit, ya." di `kurang`; Mochi menonton |
| S07 | 5 · Gas     | 36,50 | 40,88   | chat "gas" diketik di `gas`; roket melesat di `mp4`; file video jatuh & memantul + "video.mp4" + percikan; Mochi jempol |
| S99 | Komen       | 40,88 | 45,52   | latar gradasi; wordmark Youcanbuild kecil; "Mau tutorial **lengkapnya?**"; kotak komentar mengetik "Remotion" di `komen`; panah ↓; Mochi selebrasi |

## Marker audio

Awal frasa diukur dari jeda (`silencedetect`, −35 dB); * = perkiraan suku kata.

| Nama | Detik | | Nama | Detik |
|------|-------|-|------|-------|
| videoIni | 0,28 | | dua | 19,49 |
| kode | 1,39 | | chatgpt | 20,17 |
| namanya | 2,86 | | memotong | 23,04 |
| remotion | 3,67 | | tiga | 25,70 |
| pakaiReact | 5,48 | | sinkron | 28,04 |
| react* | 7,30 | | sampai* / ke* / kata* | 29,54 / 29,87 / 30,04 |
| website | 8,24 | | empat | 31,30 |
| tapi | 10,48 | | preview | 32,33 |
| claudeCode* | 12,54 | | kurang | 34,22 |
| satu | 13,97 | | lima | 36,70 |
| naskah | 14,65 | | gas* | 37,90 |
| cekFakta | 16,28 | | mp4 | 38,63 |
| storyboard | 17,46 | | tutorial / komen | 41,08 / 42,65 |
