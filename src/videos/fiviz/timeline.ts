export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/fiviz/fiviz.wav";
export const AUDIO_END = 54.05;

// Momen penting di audio (detik). Awal frasa diukur dari jeda (silencedetect −35/−30 dB, 33 potongan = 33 frasa);
// yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.
export const MARKERS = {
  naruh: 0.27, // "Naruh HP di tempat servis,"
  nunggu: 2.07, // "terus cuma bisa nunggu kabar."
  biaya: 3.98, // "Biayanya berapa?"
  udah: 5.62, // "Udah dikerjain belum?"
  firman: 7.75, // "Firman Service"
  punya: 8.73, // "punya jawabannya:"
  fiviz: 10.11, // "Fiviz."
  sebelum: 11.84, // "Sebelum datang,"
  cek: 12.86, // "cek estimasi sendiri."
  pilih: 14.64, // "Pilih tipe HP,"
  keluhan: 15.92, // "keluhannya,"
  kualitas: 16.9, // "kualitas sparepart,"
  kisaran: 18.12, // "kisaran harganya langsung keluar."
  mau: 20.65, // "Mau datang?"
  pesan: 21.71, // "Pesan jamnya dulu,"
  antre: 22.87, // "nggak perlu antre lama."
  hpmu: 24.99, // "HP-mu lagi diapain?"
  lacak: 26.64, // "Lacak dari link:"
  diterima: 28.01, // "diterima,"
  dicek: 28.96, // "dicek,"
  diperbaiki: 29.7, // "diperbaiki,"
  siap: 30.72, // "siap diambil."
  tambahan: 32.51, // "Ada biaya tambahan?"
  putuskan: 34.01, // "Kamu yang putuskan,"
  setuju: 35.39, // "setuju atau tolak,"
  dariHp: 36.84, // "langsung dari HP."
  selesai: 38.68, // "Selesai servis,"
  garansi: 39.74, // "garansinya digital."
  nota: 41.5, // "Nota hilang?"
  aman: 42.55, // "Aman."
  balik: 44.04, // "Di balik layar,"
  teknisi: 45.01, // "teknisi punya papan antrean,"
  pemilik: 46.97, // "pemilik pegang laporan pendapatan."
  laporan: 47.9, // * "laporan pendapatan"
  usahamu: 49.54, // "Mau usahamu setransparan ini?"
  ngobrol: 51.76, // "Ngobrol dulu sama Youcanbuild,"
  youcanbuild: 52.4, // * "Youcanbuild"
  gratis: 53.54, // "gratis."
} as const;

const M = MARKERS;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md. Pergantian ±0,2 dtk sebelum kalimat berikut.
export const SCENES = [
  { id: "S01", label: "Nunggu kabar servis", start: 0, end: M.firman - 0.2 },
  { id: "S02", label: "Fiviz", start: M.firman - 0.2, end: M.sebelum - 0.2 },
  { id: "S03", label: "Estimasi biaya", start: M.sebelum - 0.2, end: M.mau - 0.2 },
  { id: "S04", label: "Reservasi", start: M.mau - 0.2, end: M.hpmu - 0.2 },
  { id: "S05", label: "Lacak servis", start: M.hpmu - 0.2, end: M.tambahan - 0.2 },
  { id: "S06", label: "Persetujuan biaya", start: M.tambahan - 0.2, end: M.selesai - 0.2 },
  { id: "S07", label: "Garansi digital", start: M.selesai - 0.2, end: M.balik - 0.2 },
  { id: "S08", label: "Panel staf", start: M.balik - 0.2, end: M.usahamu - 0.2 },
  { id: "S99", label: "Ngobrol gratis", start: M.usahamu - 0.2, end: AUDIO_END + 1.5 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
