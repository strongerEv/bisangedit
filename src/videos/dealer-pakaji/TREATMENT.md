# TREATMENT — dealer-pakaji

- Durasi: 43,56 dtk (VO 42,06 + ekor 1,5)
- Audio: `public/audio/dealer-pakaji/dealerpakaji.wav` (42,3 dtk). Waktu sudah dikunci ke audio.
- BPM musik: tidak ada
- Gaya: warna website (navy #0E1B33, merah #E01E26), garis miring khas hero. Screenshot asli di bingkai HP
  (`parts.tsx` → `Phone`); kotak sorot merah diukur dari posisi elemen website (CSS px).

## Daftar adegan

| ID  | Judul            | Mulai | Selesai | Teks di layar | Naskah | Gerakan |
|-----|------------------|-------|---------|---------------|--------|---------|
| S01 | Hook status WA   | 0,0   | 4,27    | "Stok mobil cuma di **status WA?**"; chip "Hilang dalam 24 jam" | 1 | status berganti 4 foto mobil; layar meredup + chip setelah `status` |
| S02 | Kenalin website  | 4,27  | 11,75   | "Kenalin: website **Dealer Pak Aji**"; chip "Buka 24 jam", "Langsung dari HP" | 2 | logo di `website`; HP beranda naik di `showroom`; chip di `jam24`, `hp` |
| S03 | Cari mobil       | 11,75 | 16,70   | "Cari berdasarkan **merek, tipe, harga**" | 3 | panel "Cari Mobil Anda": sorot Merek (`merek`) → Tipe bodi (`tipe`) → Harga maks. (`harga`); tap Cari → hasil stok |
| S04 | Detail & kredit  | 16,70 | 24,68   | "Detail + **simulasi kredit**"; chip Foto / Spesifikasi / Simulasi kredit; "DP 25% → 40%"; "Tenor 4 → 3 th"; "Angsuran langsung keluar" | 4 | halaman detail Xpander Cross; ganti ke simulasi di `simulasi`; DP digeser di `dp`, tenor di `tenor`; sorot angsuran di `angsuran` |
| S05 | Form ke WhatsApp | 24,68 | 30,98   | "Test drive, kredit, **tukar tambah**"; chip "Pesan otomatis" | 5 | form booking terisi; sorot data di `isi`; tap Kirim → "Terima kasih"; tap "Lanjutkan via WhatsApp" di `wa` → chat berisi pesan asli |
| S06 | Panel admin      | 30,98 | 37,50   | "DI BELAKANG LAYAR"; "Panel **admin**"; chip "Terjual ✓"; "prospek = data contoh" | 6 | dashboard (sorot Prospek baru di `dashboard`); stok di `stok`; status Raize → Terjual di `terjual`; daftar prospek di `pantau`, sorot kartu di `prospek` |
| S99 | Konsultasi       | 37,50 | 43,56   | logo Dealer Pak Aji; "Mau bikin website kayak gini buat **usahamu?**"; tombol "Konsultasi gratis →"; wordmark Youcanbuild | 7 | judul di `mau`; tombol + tap + wordmark dari `konsultasi` |

## Marker audio

Awal frasa diukur dari jeda (`silencedetect`, −35 dB): 16 potongan suara cocok 1:1 dengan frasa naskah.
Yang bertanda * diperkirakan dari jumlah suku kata. Angka lengkap di `timeline.ts` (`MARKERS`).
