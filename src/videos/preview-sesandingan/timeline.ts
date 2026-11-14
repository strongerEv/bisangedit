export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/preview-sesandingan/vo.wav";
export const AUDIO_END = 53.89;

/** Rekaman layar asli undangan (390×844 CSS @2×, 30 fps), data contoh. */
export const REKAMAN = "aset/preview-sesandingan/rekaman.mp4";

// Detik di dalam REKAMAN (dicatat oleh skrip perekam).
export const REC = {
  cover: 0,
  tapBuka: 2.6,
  ayat: 6.27,
  mempelai: 9.57,
  acara: 16.97,
  lokasi: 22.07,
  cerita: 25.57,
  galeri: 30.07,
  rsvp: 32.67,
  ucapan: 37.53,
  hadiah: 45.63,
  penutup: 50.03,
  penutupEnd: 54.2, // sisa rekaman (diam di akhir) tidak dipakai
} as const;

// Momen di audio (detik). Awal frasa dari jeda (silencedetect −35 dB, 26 potongan = 26 frasa).
export const MARKERS = {
  undangan: 0.0, // "Undangan nikah, tapi rasanya kayak mulai petualangan."
  tiapTamu: 4.59, // "Tiap tamu dapat undangan dengan namanya sendiri."
  sekaliTap: 7.93, // "Sekali tap,"
  hitung: 9.05, // "hitung mundur hari H dimulai."
  ayat: 11.7, // "Ayat dan doa, di atas kertas perkamen."
  mempelai: 15.37, // "Mempelainya? Tampil di poster WANTED, lengkap dengan foto dan nama orang tua."
  akad: 21.3, // "Akad dan resepsi, jam dan tempatnya jelas."
  lokasi: 24.74, // "Lokasinya? Pakai peta harta karun."
  love: 27.63, // "Love story kalian, dalam satu timeline perjalanan."
  galeri: 31.7, // "Galeri foto ala polaroid."
  tamu: 34.17, // "Tamu bisa konfirmasi hadir langsung dari undangan."
  ucapan: 37.67, // "Ucapan dan doa langsung tampil di halaman, kayak pesan dalam botol."
  amplop: 42.71, // "Mau kasih amplop digital? Nomor rekening tinggal salin."
  ditutup: 46.34, // "Ditutup dengan ucapan terima kasih yang manis."
  interaktif: 49.51, // "Undangan digital interaktif, cuma di Sesandingan."
  pesan: 52.98, // "Pesan sekarang."
} as const;

const M = MARKERS;
const cut = (t: number) => t - 0.15;

// Waktu dalam DETIK, sama dengan TREATMENT.md.
export const SCENES = [
  { id: "S01", label: "Pembuka", start: 0, end: cut(M.tiapTamu) },
  { id: "S02", label: "Rekaman undangan", start: cut(M.tiapTamu), end: cut(M.interaktif) },
  { id: "S99", label: "Penutup Sesandingan", start: cut(M.interaktif), end: AUDIO_END + 0.8 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

/**
 * Potongan rekaman → rentang waktu VO (absolut). Kecepatan putar tiap potongan = panjang rekaman / panjang VO,
 * supaya fitur muncul saat disebut.
 */
export const SEGMENTS: { rec: [number, number]; vo: [number, number]; no: string; title: string; sub: string }[] = [
  { rec: [REC.cover, REC.tapBuka], vo: [cut(M.tiapTamu), cut(M.sekaliTap)], no: "01", title: "Cover dengan nama tamu", sub: "Tiap tamu dapat link personal" },
  { rec: [REC.tapBuka, REC.ayat], vo: [cut(M.sekaliTap), cut(M.ayat)], no: "02", title: "Hitung mundur hari H", sub: "Sekali tap, undangan terbuka" },
  { rec: [REC.ayat, REC.mempelai], vo: [cut(M.ayat), cut(M.mempelai)], no: "03", title: "Ayat & doa", sub: "Di atas kertas perkamen" },
  { rec: [REC.mempelai, REC.acara], vo: [cut(M.mempelai), cut(M.akad)], no: "04", title: "Poster WANTED mempelai", sub: "Foto, nama, dan orang tua" },
  { rec: [REC.acara, REC.lokasi], vo: [cut(M.akad), cut(M.lokasi)], no: "05", title: "Detail acara", sub: "Akad & resepsi, jam dan tempat" },
  { rec: [REC.lokasi, REC.cerita], vo: [cut(M.lokasi), cut(M.love)], no: "06", title: "Peta harta karun", sub: "Satu tap ke Google Maps" },
  { rec: [REC.cerita, REC.galeri], vo: [cut(M.love), cut(M.galeri)], no: "07", title: "Kisah perjalanan", sub: "Love story dalam timeline" },
  { rec: [REC.galeri, REC.rsvp], vo: [cut(M.galeri), cut(M.tamu)], no: "08", title: "Galeri foto", sub: "Gaya polaroid" },
  { rec: [REC.rsvp, REC.ucapan], vo: [cut(M.tamu), cut(M.ucapan)], no: "09", title: "Konfirmasi kehadiran", sub: "Tamu isi RSVP langsung" },
  { rec: [REC.ucapan, REC.hadiah], vo: [cut(M.ucapan), cut(M.amplop)], no: "10", title: "Ucapan & doa", sub: "Langsung tampil di halaman" },
  { rec: [REC.hadiah, REC.penutup], vo: [cut(M.amplop), cut(M.ditutup)], no: "11", title: "Amplop digital", sub: "Rekening tinggal salin" },
  { rec: [REC.penutup, REC.penutupEnd], vo: [cut(M.ditutup), cut(M.interaktif)], no: "12", title: "Terima kasih", sub: "Penutup yang manis" },
];

export const DURATION = sec(SCENES[SCENES.length - 1].end);
