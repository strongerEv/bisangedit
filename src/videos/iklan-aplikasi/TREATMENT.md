# TREATMENT — iklan-aplikasi

- Durasi: 20,30 dtk (VO 19,75 + ekor 0,55)
- Audio: `public/audio/iklan-aplikasi/iklan002.wav` (20,05 dtk). Waktu sudah dikunci ke audio.
- BPM musik: tidak ada
- Gaya: putih (theme.colors.bg) + merah brand #F20D0D; `Bubble`/`Sheet` dari `iklan-web-app/parts.tsx`; `Stickman`.

## Daftar adegan

| ID  | Judul                   | Mulai | Selesai | Teks di layar | Naskah | Gerakan |
|-----|-------------------------|-------|---------|---------------|--------|---------|
| S01 | Chat, Excel, ingatan    | 0,0   | 5,45    | 3 baris: "Pesanan di **chat.**" / "Stok di **Excel.**" / "Tagihan di **ingatan.**" | 1 | chat (`chat`), file Excel (`excel`), catatan tempel (`tagihan`) bertumpuk; stickman juggling makin panik |
| S02 | Saatnya punya aplikasi  | 5,45  | 9,75    | "Kalau usahamu **masih begini…**" → "Saatnya punya **aplikasi sendiri.**" | 2 | tumpukan tersapu (`saatnya`); stickman bersorak; HP muncul (`aplikasi`) |
| S03 | Sudah kami buatkan      | 9,75  | 15,47   | "Kasir, Pesan-antar, Kos, Absensi" (bertambah per kata) → "Sudah kami **buatkan.**" | 3 | HP besar ganti layar di `kasir`, `pesanAntar`, `kos`, `absensi`; menyusut jadi 4 HP + centang (`sudah`) |
| S04 | Giliran usahamu         | 15,47 | 17,78   | "Sekarang giliran **usahamu.**"; HP "?" → "Usahamu" | 4 | stickman menunjuk; "?" berubah di `giliran` |
| S99 | Konsultasi gratis       | 17,78 | 20,30   | "Konsultasi **gratis**"; tombol merah; wordmark Youcanbuild | 5 | tombol di `konsultasi`; wordmark + tap di `youcanbuild` |

## Marker audio

Awal frasa diukur dari jeda (`silencedetect` −35 dB / −30 dB): 13 potongan = 13 frasa naskah.
Yang bertanda * diperkirakan dari jumlah suku kata. Angka lengkap di `timeline.ts` (`MARKERS`).
