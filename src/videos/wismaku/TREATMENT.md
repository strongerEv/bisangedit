# TREATMENT — wismaku

- Durasi: 46,29 dtk (VO 44,79 + ekor 1,5)
- Audio: `public/audio/wismaku/wismaku.wav` (45,0 dtk). Waktu sudah dikunci ke audio.
- BPM musik: tidak ada
- Gaya: malam di kos — biru tua #121A33, kuning #FFC24B, coral #FF7A59 (tanpa hijau). Stickman dari
  `src/components/Stickman.tsx`. Screenshot asli 390 px lebar di bingkai HP (`parts.tsx` → `Phone`).

## Daftar adegan

| ID  | Judul                 | Mulai | Selesai | Teks di layar | Naskah | Gerakan |
|-----|-----------------------|-------|---------|---------------|--------|---------|
| S01 | Lorong kos            | 0,0   | 6,68    | kalender "OKT 1"; "Tanggal **satu.**"; "Waktunya **nagih** sewa…"; "TOK TOK!"; balon "Besok ya, Bu…", "…" | 1 | stickman jalan masuk (`pemilik`), ketok 101 (`ketok`, pintu terbuka sedikit), jalan ke 102 (`nanyain`), 103, lalu lesu |
| S02 | Buka Wismaku          | 6,68  | 9,52    | "Sekarang cukup buka **Wismaku**"; logo | 2 | stickman senang mengangkat HP (`cukup`); HP membesar ke kanan (`wismaku`) |
| S03 | Denah merah           | 9,52  | 16,91   | "Kamar **merah** = belum bayar"; "Sekali lirik, langsung ketahuan"; chip "102 · Rina", "103 · Dewi" | 3 | sorot kamar 102–103 berdenyut (`merah`); sorot legenda; chip penunggak (`langsungTahu`) |
| S04 | Tagihan & pengingat   | 16,91 | 21,78   | "Tagihan **otomatis**"; chip "Terlambat & denda dihitung sendiri", "Pengingat via WhatsApp" | 4 | sorot kartu Dewi (`tagihan`); sorot + tap "Kirim Pengingat" (`pengingat`, `whatsapp`) |
| S05 | Portal penghuni       | 21,78 | 28,53   | "Penghuni punya **portal**"; chip langkah 1–3 | 5 | sorot total tagihan (`cek`); chip bukti (`kirimBukti`); sorot + tap "Saya Sudah Bayar" (`sudahBayar`) |
| S06 | Verifikasi & kwitansi | 28,53 | 32,99   | "Verifikasi, **kwitansi** jadi"; cap "LUNAS"; chip "Bukti transfer dicek", "Kwitansi digital otomatis" | 6 | sorot "Menunggu Verifikasi" → bukti (`verifikasi`); ganti ke kwitansi (`kwitansi`); cap LUNAS (`jadi`) |
| S07 | Laporan               | 32,99 | 39,03   | "Akhir bulan, **beres**"; chip ringkasan, "Ekspor Excel · PDF" | 7 | sorot pemasukan (`pemasukan`), laba kotor (`laba`), tombol Excel (`excel`) |
| S99 | Konsultasi gratis     | 39,03 | 46,29   | "Punya usaha dengan alur **seribet** ini?"; wordmark Youcanbuild; tombol "Konsultasi gratis →" | 8 | wordmark (`youcanbuild`); tombol (`konsultasi`), tap (`gratis`); stickman bersorak (`ceritain`) |

## Marker audio

Awal frasa diukur dari jeda (`silencedetect`, −35 dB; −30 dB untuk jeda pendek): 21 potongan = 21 frasa naskah.
Yang bertanda * diperkirakan dari jumlah suku kata. Angka lengkap di `timeline.ts` (`MARKERS`).
