export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/makaryo/makaryoku.wav";
export const AUDIO_END = 53.74;

// Momen penting di audio (detik). Awal frasa diukur dari jeda (silencedetect −35 dB, 24 potongan = 24 frasa);
// yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.
export const MARKERS = {
  punya: 0.27, // "Punya tim host live streaming?"
  absenX: 2.43, // "Absen, jadwal, sama omzetnya masih numpuk di file Excel?"
  jadwalX: 2.95, // * "jadwal"
  omzetX: 3.7, // * "omzetnya"
  excel: 5.3, // * "file Excel?"
  kenalin: 6.96, // "Kenalin:"
  makaryo: 7.77, // "Makaryo."
  aplikasi: 8.91, // "Aplikasi untuk mengelola tim host live,"
  pasang: 11.47, // "bisa dipasang di HP."
  hostAbsen: 13.61, // "Host absen pakai selfie dan lokasi GPS."
  selfie: 14.5, // * "selfie"
  lokasi: 15.05, // * "lokasi GPS"
  telat: 16.52, // "Telat atau tepat waktu,"
  tepat: 17.18, // * "tepat waktu"
  tercatat: 18.06, // "tercatat otomatis."
  jadwalSif: 19.95, // "Jadwal shift sebulan?"
  tekan: 21.43, // "Admin tinggal tekan generate."
  generate: 22.4, // * "generate"
  tersusun: 23.54, // "Jadwal tersusun sendiri, lalu dipublish."
  publish: 25.45, // * "dipublish"
  izin: 26.7, // "Izin, libur, sampai setoran omzet,"
  libur: 27.25, // * "libur"
  setoran: 28.0, // * "setoran omzet"
  diajukan: 29.14, // "semuanya diajukan dari aplikasi."
  setujui: 31.4, // "Admin tinggal setujui."
  laporan: 33.33, // "Laporannya bisa diunduh ke PDF dan Excel,"
  pdf: 34.9, // * "PDF"
  excel2: 35.55, // * "Excel"
  notif: 36.2, // "plus ada notifikasi pengingat jam kerja."
  teknis: 39.2, // "Teknisnya:"
  dibangun: 40.08, // "dibangun dengan Next.js dan Supabase."
  nextjs: 41.0, // * "Next.js"
  supabase: 41.8, // * "Supabase"
  penyusun: 43.03, // "Penyusun jadwalnya pakai aturan, bukan AI."
  aturan: 44.35, // * "aturan"
  bukanAi: 44.95, // * "bukan AI"
  konsisten: 45.87, // "Hasilnya konsisten,"
  tanpaBiaya: 47.26, // "tanpa biaya tiap generate."
  mau: 49.27, // "Mau dibikinin aplikasi kayak gini buat timmu?"
  konsultasi: 51.92, // "Konsultasi gratis di Youcanbuild."
} as const;

const M = MARKERS;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md. Pergantian ±0,2 dtk sebelum kalimat berikut.
export const SCENES = [
  { id: "S01", label: "Hook Excel", start: 0, end: M.kenalin - 0.2 },
  { id: "S02", label: "Kenalin Makaryo", start: M.kenalin - 0.2, end: M.hostAbsen - 0.2 },
  { id: "S03", label: "Absen", start: M.hostAbsen - 0.2, end: M.jadwalSif - 0.2 },
  { id: "S04", label: "Jadwal otomatis", start: M.jadwalSif - 0.2, end: M.izin - 0.2 },
  { id: "S05", label: "Pengajuan", start: M.izin - 0.2, end: M.laporan - 0.2 },
  { id: "S06", label: "Laporan & pengingat", start: M.laporan - 0.2, end: M.teknis - 0.2 },
  { id: "S07", label: "Teknis", start: M.teknis - 0.2, end: M.mau - 0.2 },
  { id: "S99", label: "Konsultasi", start: M.mau - 0.2, end: AUDIO_END + 1.5 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
