# Katalog SFX

Semua efek ada di `public/audio/sfx/` dan ikut di repo, jadi render tidak butuh internet.
Contoh dengar semua efek berurutan: `out/katalog-sfx.m4a` (dibuat ulang dari daftar ini; jam di kolom "Dengar").

Cara pakai di kode:

```tsx
import { whoosh } from "@remotion/sfx";
import { sfx, syn } from "../../components/sfx";
<Audio src={sfx(whoosh)} />   // efek Remotion (salinan lokal)
<Audio src={syn("kasir")} />  // efek sintetis
```

## A. @remotion/sfx (32 efek)
Tambah efek baru dari paket: `curl -o public/audio/sfx/<nama>.wav https://remotion.media/<nama>.wav`.
Sebagian adalah suara meme populer — cocok untuk konten lucu, hindari untuk video brand yang serius.

| Import | File | Detik | Kegunaan |
|---|---|---|---|
| `animeWow` | `anime-wow.wav` | 4.18 | "Wow" anime |
| `boneCrack` | `bone-crack.wav` | 1.07 | Tulang patah (krek) |
| `bruh` | `bruh.wav` | 0.63 | Meme "bruh" |
| `ding` | `ding.wav` | 1.40 | Ding (benar, insight) |
| `dramaticBoomer` | `dramatic-boomer.wav` | 1.33 | Dramatis (boomer) |
| `fah` | `fah.wav` | 1.93 | Meme "fah" |
| `illuminatiConfirmed` | `illuminati-confirmed.wav` | 7.84 | Illuminati confirmed |
| `loadingLag` | `loading-lag.wav` | 2.69 | Loading / lag |
| `macQuack` | `mac-quack.wav` | 0.35 | Bebek Mac (quack) |
| `minecraftHurt` | `minecraft-hurt.wav` | 0.37 | Minecraft kena damage |
| `mouseClick` | `mouse-click.wav` | 0.40 | Klik mouse |
| `nellyAhh` | `nelly-ahh.wav` | 1.46 | Meme "ahh" |
| `ohMyGodVine` | `oh-my-god-vine.wav` | 1.62 | Meme "oh my god" |
| `omgHellNah` | `omg-hell-nah.wav` | 4.40 | Meme "OMG hell nah" |
| `pageTurn` | `page-turn.wav` | 0.40 | Halaman dibalik |
| `priceIsRightFail` | `price-is-right-fail.wav` | 4.52 | Trombon gagal kuis |
| `recordScratch` | `record-scratch.wav` | 1.26 | Piringan hitam tergores (berhenti mendadak) |
| `romanceMeme` | `romance-meme.wav` | 5.81 | Musik romantis meme |
| `sanctuaryGuardianWhat` | `sanctuary-guardian-what.wav` | 9.01 | Meme "what?" |
| `shutterModern` | `shutter-modern.wav` | 0.49 | Kamera HP modern |
| `shutterOld` | `shutter-old.wav` | 0.31 | Kamera jadul |
| `skedaddle` | `skedaddle.wav` | 6.55 | Kabur cepat (kartun) |
| `snapchatNotification` | `snapchat-notification.wav` | 0.22 | Notifikasi Snapchat |
| `spongebobFail` | `spongebob-fail.wav` | 3.38 | Gagal ala SpongeBob |
| `triggered` | `triggered.wav` | 0.70 | Meme triggered |
| `uiSwitch` | `switch.wav` | 0.33 | Saklar / papan dibalik |
| `vineBoom` | `vine-boom.wav` | 1.25 | Meme vine boom (dramatis) |
| `whip` | `whip.wav` | 0.17 | Cambuk / gerakan sangat cepat |
| `whoosh` | `whoosh.wav` | 0.15 | Whoosh pendek (pindah tahun/jam) |
| `wilhelmScream` | `wilhelm-scream.wav` | 2.09 | Teriakan Wilhelm |
| `windowsXpError` | `windows-xp-error.wav` | 0.99 | Error Windows XP |
| `yippee` | `yippee.wav` | 2.65 | Sorak "yippee" |

## B. Sintetis buatan sendiri (43 efek)
Dibuat dari nol oleh `scripts/buat-sfx.py` (numpy) — bebas hak cipta. Ubah/tambah efek di skrip itu lalu jalankan ulang.

| Pakai | File | Detik | Kegunaan |
|---|---|---|---|
| `syn("pop")` | `syn-pop.wav` | 0.12 | Pop muncul (teks/ikon masuk) |
| `syn("pop-kecil")` | `syn-pop-kecil.wav` | 0.08 | Gelembung kecil, item list muncul |
| `syn("klik")` | `syn-klik.wav` | 0.05 | Klik lembut / tap layar |
| `syn("tombol")` | `syn-tombol.wav` | 0.09 | Tombol ditekan (lebih berat) |
| `syn("ketik")` | `syn-ketik.wav` | 0.03 | Satu ketukan keyboard (pakai per huruf) |
| `syn("whoosh-panjang")` | `syn-whoosh-panjang.wav` | 1.00 | Transisi besar / pindah babak |
| `syn("swish")` | `syn-swish.wav` | 0.25 | Geser cepat / teks melesat |
| `syn("swipe")` | `syn-swipe.wav` | 0.30 | Swipe layar HP |
| `syn("riser")` | `syn-riser.wav` | 2.00 | Ketegangan naik sebelum reveal |
| `syn("impact")` | `syn-impact.wav` | 1.50 | Hantaman / angka besar muncul |
| `syn("boom-sinematik")` | `syn-boom-sinematik.wav` | 2.00 | Bass drop sinematik (judul/twist) |
| `syn("glitch")` | `syn-glitch.wav` | 0.42 | Glitch digital / layar error |
| `syn("notifikasi")` | `syn-notifikasi.wav` | 0.60 | Notifikasi HP dua nada |
| `syn("pesan-masuk")` | `syn-pesan-masuk.wav` | 0.35 | Chat/pesan masuk |
| `syn("sukses")` | `syn-sukses.wav` | 1.00 | Berhasil / centang hijau |
| `syn("error")` | `syn-error.wav` | 0.50 | Buzzer salah / ditolak |
| `syn("ding-lonceng")` | `syn-ding-lonceng.wav` | 1.60 | Lonceng jernih (ide/insight) |
| `syn("sparkle")` | `syn-sparkle.wav` | 1.40 | Kilau ✨ (keren, tampan, bersinar) |
| `syn("koin")` | `syn-koin.wav` | 0.60 | Satu koin |
| `syn("koin-banyak")` | `syn-koin-banyak.wav` | 1.60 | Hujan koin / jackpot |
| `syn("kasir")` | `syn-kasir.wav` | 1.20 | Cha-ching mesin kasir (gaji, untung) |
| `syn("detak-jam")` | `syn-detak-jam.wav` | 2.00 | Tik-tok jam 2 dtk (waktu berjalan) |
| `syn("detak-jantung")` | `syn-detak-jantung.wav` | 1.60 | Deg-deg (tegang, gugup) |
| `syn("langkah")` | `syn-langkah.wav` | 0.12 | Satu langkah kaki |
| `syn("pintu")` | `syn-pintu.wav` | 0.50 | Pintu ditutup |
| `syn("pukulan")` | `syn-pukulan.wav` | 0.25 | Pukulan / tamparan kartun |
| `syn("jatuh")` | `syn-jatuh.wav` | 0.60 | Badan/benda jatuh ke lantai |
| `syn("boing")` | `syn-boing.wav` | 0.60 | Per/pegas memantul |
| `syn("siul-naik")` | `syn-siul-naik.wav` | 0.80 | Siulan naik (melesat, kaget) |
| `syn("siul-turun")` | `syn-siul-turun.wav` | 0.80 | Siulan turun (jatuh, gagal) |
| `syn("gagal")` | `syn-gagal.wav` | 1.96 | Wah-wah-wah-waaah (trombon gagal) |
| `syn("8bit-koin")` | `syn-8bit-koin.wav` | 0.32 | Koin game retro |
| `syn("8bit-lompat")` | `syn-8bit-lompat.wav` | 0.22 | Lompat game retro |
| `syn("8bit-levelup")` | `syn-8bit-levelup.wav` | 0.56 | Naik level / pencapaian |
| `syn("8bit-kalah")` | `syn-8bit-kalah.wav` | 1.06 | Game over |
| `syn("drum-roll")` | `syn-drum-roll.wav` | 2.00 | Drum roll 2 dtk sebelum pengumuman |
| `syn("tada")` | `syn-tada.wav` | 1.60 | Ta-da! (reveal, selesai) |
| `syn("alarm")` | `syn-alarm.wav` | 1.26 | Alarm HP bip-bip |
| `syn("rantai")` | `syn-rantai.wav` | 1.20 | Rantai putus / logam |
| `syn("mesin-mobil")` | `syn-mesin-mobil.wav` | 2.40 | Deru mesin mobil 2,4 dtk |
| `syn("klakson")` | `syn-klakson.wav` | 0.56 | Klakson tiin-tiin |
| `syn("kamera")` | `syn-kamera.wav` | 0.40 | Jepret kamera |
| `syn("kertas")` | `syn-kertas.wav` | 0.70 | Kertas dibalik / diremas |

## Urutan di file dengar (out/katalog-sfx.m4a)

| Dengar | File | Kegunaan |
|---|---|---|
| 0:00.0 | anime-wow.wav | "Wow" anime |
| 0:04.7 | bone-crack.wav | Tulang patah (krek) |
| 0:06.5 | bruh.wav | Meme "bruh" |
| 0:07.8 | ding.wav | Ding (benar, insight) |
| 0:09.9 | dramatic-boomer.wav | Dramatis (boomer) |
| 0:11.9 | fah.wav | Meme "fah" |
| 0:14.6 | illuminati-confirmed.wav | Illuminati confirmed |
| 0:19.3 | loading-lag.wav | Loading / lag |
| 0:22.6 | mac-quack.wav | Bebek Mac (quack) |
| 0:23.7 | minecraft-hurt.wav | Minecraft kena damage |
| 0:24.8 | mouse-click.wav | Klik mouse |
| 0:25.9 | nelly-ahh.wav | Meme "ahh" |
| 0:28.0 | oh-my-god-vine.wav | Meme "oh my god" |
| 0:30.3 | omg-hell-nah.wav | Meme "OMG hell nah" |
| 0:35.0 | page-turn.wav | Halaman dibalik |
| 0:36.1 | price-is-right-fail.wav | Trombon gagal kuis |
| 0:40.8 | record-scratch.wav | Piringan hitam tergores (berhenti mendadak) |
| 0:42.8 | romance-meme.wav | Musik romantis meme |
| 0:47.5 | sanctuary-guardian-what.wav | Meme "what?" |
| 0:52.2 | shutter-modern.wav | Kamera HP modern |
| 0:53.4 | shutter-old.wav | Kamera jadul |
| 0:54.4 | skedaddle.wav | Kabur cepat (kartun) |
| 0:59.1 | snapchat-notification.wav | Notifikasi Snapchat |
| 1:00.0 | spongebob-fail.wav | Gagal ala SpongeBob |
| 1:04.1 | triggered.wav | Meme triggered |
| 1:05.5 | switch.wav | Saklar / papan dibalik |
| 1:06.5 | vine-boom.wav | Meme vine boom (dramatis) |
| 1:08.5 | whip.wav | Cambuk / gerakan sangat cepat |
| 1:09.4 | whoosh.wav | Whoosh pendek (pindah tahun/jam) |
| 1:10.2 | wilhelm-scream.wav | Teriakan Wilhelm |
| 1:13.0 | windows-xp-error.wav | Error Windows XP |
| 1:14.7 | yippee.wav | Sorak "yippee" |
| 1:18.0 | syn-pop.wav | Pop muncul (teks/ikon masuk) |
| 1:18.9 | syn-pop-kecil.wav | Gelembung kecil, item list muncul |
| 1:19.6 | syn-klik.wav | Klik lembut / tap layar |
| 1:20.4 | syn-tombol.wav | Tombol ditekan (lebih berat) |
| 1:21.2 | syn-ketik.wav | Satu ketukan keyboard (pakai per huruf) |
| 1:21.9 | syn-whoosh-panjang.wav | Transisi besar / pindah babak |
| 1:23.6 | syn-swish.wav | Geser cepat / teks melesat |
| 1:24.6 | syn-swipe.wav | Swipe layar HP |
| 1:25.6 | syn-riser.wav | Ketegangan naik sebelum reveal |
| 1:28.3 | syn-impact.wav | Hantaman / angka besar muncul |
| 1:30.5 | syn-boom-sinematik.wav | Bass drop sinematik (judul/twist) |
| 1:33.2 | syn-glitch.wav | Glitch digital / layar error |
| 1:34.3 | syn-notifikasi.wav | Notifikasi HP dua nada |
| 1:35.6 | syn-pesan-masuk.wav | Chat/pesan masuk |
| 1:36.6 | syn-sukses.wav | Berhasil / centang hijau |
| 1:38.3 | syn-error.wav | Buzzer salah / ditolak |
| 1:39.5 | syn-ding-lonceng.wav | Lonceng jernih (ide/insight) |
| 1:41.8 | syn-sparkle.wav | Kilau ✨ (keren, tampan, bersinar) |
| 1:43.9 | syn-koin.wav | Satu koin |
| 1:45.2 | syn-koin-banyak.wav | Hujan koin / jackpot |
| 1:47.5 | syn-kasir.wav | Cha-ching mesin kasir (gaji, untung) |
| 1:49.4 | syn-detak-jam.wav | Tik-tok jam 2 dtk (waktu berjalan) |
| 1:52.1 | syn-detak-jantung.wav | Deg-deg (tegang, gugup) |
| 1:54.4 | syn-langkah.wav | Satu langkah kaki |
| 1:55.3 | syn-pintu.wav | Pintu ditutup |
| 1:56.5 | syn-pukulan.wav | Pukulan / tamparan kartun |
| 1:57.4 | syn-jatuh.wav | Badan/benda jatuh ke lantai |
| 1:58.7 | syn-boing.wav | Per/pegas memantul |
| 2:00.0 | syn-siul-naik.wav | Siulan naik (melesat, kaget) |
| 2:01.5 | syn-siul-turun.wav | Siulan turun (jatuh, gagal) |
| 2:03.0 | syn-gagal.wav | Wah-wah-wah-waaah (trombon gagal) |
| 2:05.7 | syn-8bit-koin.wav | Koin game retro |
| 2:06.7 | syn-8bit-lompat.wav | Lompat game retro |
| 2:07.6 | syn-8bit-levelup.wav | Naik level / pencapaian |
| 2:08.9 | syn-8bit-kalah.wav | Game over |
| 2:10.6 | syn-drum-roll.wav | Drum roll 2 dtk sebelum pengumuman |
| 2:13.3 | syn-tada.wav | Ta-da! (reveal, selesai) |
| 2:15.6 | syn-alarm.wav | Alarm HP bip-bip |
| 2:17.6 | syn-rantai.wav | Rantai putus / logam |
| 2:19.5 | syn-mesin-mobil.wav | Deru mesin mobil 2,4 dtk |
| 2:22.6 | syn-klakson.wav | Klakson tiin-tiin |
| 2:23.9 | syn-kamera.wav | Jepret kamera |
| 2:25.0 | syn-kertas.wav | Kertas dibalik / diremas |
