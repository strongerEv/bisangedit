export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

// Video animasi saja — hook talking head digabung sendiri oleh user di CapCut.
export const AUDIO = "audio/call-blocker/vo.m4a";
export const AUDIO_END = 45.41;

// Momen penting di audio (detik). Awal frasa diukur dari jeda (silencedetect −35/−30 dB);
// yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.
export const MARKERS = {
  telepon: 0.32, // "Telepon dari nomor nggak dikenal,"
  isinya: 3.01, // "isinya pinjol,"
  pinjol: 3.55, // * "pinjol"
  judol: 4.17, // "judol,"
  penipuan: 5.11, // "sampai penipuan."
  solusinya: 6.35, // "Solusinya:"
  aplikasi: 7.3, // "aplikasi"
  callBlocker: 8.24, // "Call Blocker."
  buka: 10.34, // "Buka aplikasinya,"
  bikin: 12.19, // "bikin aturan baru,"
  lalu: 13.83, // "lalu pilih:"
  blokir: 15.09, // "blokir semua nomor yang nggak ada di kontak."
  kontak: 17.2, // * "di kontak"
  pilihCara: 18.65, // "Pilih caranya,"
  dibisukan: 20.2, // * "mau dibisukan"
  ditolak: 21.6, // * "atau langsung ditolak."
  simpan: 22.96, // "Simpan."
  sekarang: 23.54, // "Sekarang,"
  nomorAsing: 24.62, // "nomor asing yang nelpon"
  otomatis: 26.33, // "otomatis diblokir."
  diblokir: 27.93, // * "diblokir"
  kamuCuma: 29.46, // "Kamu cuma"
  notifikasi: 31.2, // * "dapat notifikasi,"
  tanpaAngkat: 32.6, // * "tanpa harus angkat."
  nomorKontak: 34.57, // "Nomor dari kontakmu tetap bisa masuk seperti biasa."
  biasa: 36.6, // * "masuk seperti biasa"
  aplikasiJalan: 38.05, // "Aplikasinya jalan tanpa internet,"
  internet: 39.12, // * "tanpa internet"
  nggakPerlu: 40.44, // "dan nggak perlu daftar akun."
  simpanVideo: 42.45, // "Simpan video ini,"
  kirim: 43.9, // * "dan kirim ke orang tuamu."
} as const;

const M = MARKERS;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md. Pergantian ±0,2 dtk sebelum kalimat berikut.
export const SCENES = [
  { id: "S01", label: "Telepon spam", start: 0, end: M.solusinya - 0.2 },
  { id: "S02", label: "Solusi: Call Blocker", start: M.solusinya - 0.2, end: M.buka - 0.2 },
  { id: "S03", label: "Bikin aturan", start: M.buka - 0.2, end: M.pilihCara - 0.2 },
  { id: "S04", label: "Cara blokir + simpan", start: M.pilihCara - 0.2, end: M.sekarang - 0.1 },
  { id: "S05", label: "Otomatis diblokir", start: M.sekarang - 0.1, end: M.nomorKontak - 0.2 },
  { id: "S06", label: "Kontak tetap masuk", start: M.nomorKontak - 0.2, end: M.aplikasiJalan - 0.2 },
  { id: "S07", label: "Tanpa internet & akun", start: M.aplikasiJalan - 0.2, end: M.simpanVideo - 0.2 },
  { id: "S99", label: "Simpan & kirim", start: M.simpanVideo - 0.2, end: AUDIO_END + 1.5 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
