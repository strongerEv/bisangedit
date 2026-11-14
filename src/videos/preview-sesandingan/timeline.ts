export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

/** Rekaman layar asli undangan (390×844 CSS @2×, 30 fps), data contoh. */
export const REKAMAN = "aset/preview-sesandingan/rekaman.mp4";
export const REKAMAN_DUR = 55.73;

// Tanpa VO: waktu mengikuti rekaman. Angka = detik di dalam REKAMAN (dicatat oleh skrip perekam).
export const REC = {
  cover: 0,
  tapBuka: 2.6,
  hero: 3.27,
  ayat: 6.27,
  mempelai: 9.57,
  acara: 16.97,
  lokasi: 22.07,
  cerita: 25.57,
  galeri: 30.07,
  rsvp: 32.67,
  hadir: 36.07,
  ucapan: 37.53,
  kirim: 42.47,
  hadiah: 45.63,
  penutup: 50.03,
  end: 55.73,
} as const;

export const INTRO = 2.5;
export const OUTRO = 4.0;

// Waktu dalam DETIK (absolut di video), sama dengan TREATMENT.md.
export const SCENES = [
  { id: "S01", label: "Pembuka", start: 0, end: INTRO },
  { id: "S02", label: "Rekaman undangan", start: INTRO, end: INTRO + REKAMAN_DUR },
  { id: "S99", label: "Penutup Sesandingan", start: INTRO + REKAMAN_DUR, end: INTRO + REKAMAN_DUR + OUTRO },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

/** Teks penjelasan per fitur (detik di dalam rekaman). */
export const CAPTIONS: { at: number; no: string; title: string; sub: string }[] = [
  { at: REC.cover, no: "01", title: "Cover dengan nama tamu", sub: "Tiap tamu dapat link personal" },
  { at: REC.hero, no: "02", title: "Hitung mundur hari H", sub: "Tap Buka Undangan, suara ombak menyala" },
  { at: REC.ayat, no: "03", title: "Ayat & doa", sub: "Di atas kertas perkamen" },
  { at: REC.mempelai, no: "04", title: "Poster WANTED mempelai", sub: "Foto, nama, dan orang tua" },
  { at: REC.acara, no: "05", title: "Detail acara", sub: "Akad & resepsi, lengkap jam dan tempat" },
  { at: REC.lokasi, no: "06", title: "Peta harta karun", sub: "Satu tap langsung ke Google Maps" },
  { at: REC.cerita, no: "07", title: "Kisah perjalanan", sub: "Love story dalam timeline" },
  { at: REC.galeri, no: "08", title: "Galeri foto", sub: "Gaya polaroid" },
  { at: REC.rsvp, no: "09", title: "Konfirmasi kehadiran", sub: "Tamu isi RSVP langsung" },
  { at: REC.ucapan, no: "10", title: "Ucapan & doa", sub: "Message in a bottle dari tamu" },
  { at: REC.hadiah, no: "11", title: "Peti harta: amplop digital", sub: "Rekening tinggal salin" },
  { at: REC.penutup, no: "12", title: "Terima kasih", sub: "Penutup yang manis" },
];

export const DURATION = sec(SCENES[SCENES.length - 1].end);
