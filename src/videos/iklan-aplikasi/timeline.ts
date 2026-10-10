export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/iklan-aplikasi/iklan002.wav";
export const AUDIO_END = 19.75;

// Momen penting di audio (detik). Awal frasa diukur dari jeda (silencedetect −35/−30 dB, 13 potongan = 13 frasa);
// yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.
export const MARKERS = {
  chat: 0.47, // "Pesanan di chat."
  excel: 1.92, // "Stok di Excel."
  tagihan: 3.49, // "Tagihan di ingatan."
  kalau: 5.65, // "Kalau usahamu masih begini,"
  saatnya: 7.46, // "saatnya punya aplikasi sendiri."
  aplikasi: 8.2, // * "aplikasi sendiri"
  kasir: 9.95, // "Kasir,"
  pesanAntar: 10.82, // "pesan-antar,"
  kos: 11.96, // "kos,"
  absensi: 12.75, // * "sampai absensi karyawan,"
  sudah: 14.0, // "sudah kami buatkan."
  sekarang: 15.67, // "Sekarang"
  giliran: 16.48, // "giliran usahamu."
  konsultasi: 17.98, // "Konsultasi gratis di Youcanbuild."
  youcanbuild: 19.0, // * "Youcanbuild"
} as const;

const M = MARKERS;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md. Total ±20 dtk (iklan).
export const SCENES = [
  { id: "S01", label: "Chat, Excel, ingatan", start: 0, end: M.kalau - 0.2 },
  { id: "S02", label: "Saatnya punya aplikasi", start: M.kalau - 0.2, end: M.kasir - 0.2 },
  { id: "S03", label: "Sudah kami buatkan", start: M.kasir - 0.2, end: M.sekarang - 0.2 },
  { id: "S04", label: "Giliran usahamu", start: M.sekarang - 0.2, end: M.konsultasi - 0.2 },
  { id: "S99", label: "Konsultasi gratis", start: M.konsultasi - 0.2, end: AUDIO_END + 0.55 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
