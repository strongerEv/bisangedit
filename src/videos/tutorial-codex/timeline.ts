export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/tutorial-codex/codexbro.wav";
export const AUDIO_END = 49.57;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md.
// Pergantian adegan di jeda, ±0,2 dtk sebelum kalimat berikut diucapkan.
export const SCENES = [
  { id: "S01", label: "Hook", start: 0.0, end: 5.9 },
  { id: "S02", label: "Langkah 1 · ChatGPT Plus", start: 5.9, end: 13.4 },
  { id: "S03", label: "Langkah 2 · GitHub", start: 13.4, end: 19.67 },
  { id: "S04", label: "Langkah 3 · Tugas", start: 19.67, end: 28.69 },
  { id: "S05", label: "Langkah 4 · Pull request", start: 28.69, end: 34.27 },
  { id: "S06", label: "Langkah 5 · Online", start: 34.27, end: 42.05 },
  { id: "S99", label: "Penutup", start: 42.05, end: 51.1 }, // akhir VO 49,57 + ekor ±1,5
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

// Momen penting di audio (detik). Awal frasa diukur dari jeda;
// yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.
export const MARKERS = {
  cara: 0.26, // "Cara bikin aplikasi web"
  pakaiCodex: 1.89, // "pakai Codex dari ChatGPT."
  limaLangkah: 4.47, // "Lima langkah."
  satu: 6.11, // "Satu:"
  langganan: 7.0, // "langganan ChatGPT Plus,"
  duaPuluh: 8.89, // "dua puluh dolar sebulan."
  termasuk: 10.74, // "Codex sudah termasuk di dalamnya."
  dua: 13.6, // "Dua:"
  bukaCodex: 14.35, // "buka Codex,"
  hubungkan: 15.54, // "hubungkan akun GitHub,"
  pilihRepo: 17.18, // "lalu pilih repo aplikasimu."
  tiga: 19.87, // "Tiga:"
  tulis: 20.69, // "tulis tugasnya."
  misalnya: 21.95, // "Misalnya:"
  buatkan: 22.88, // "buatkan halaman pemesanan untuk kafe saya."
  cloud: 26.33, // "Codex mengerjakannya di cloud."
  empat: 28.89, // "Empat:"
  cek: 29.71, // "cek hasilnya,"
  pullRequest: 30.82, // "buat pull request, lalu gabungkan ke GitHub."
  gabungkan: 32.28, // * "gabungkan ke GitHub"
  lima: 34.47, // "Lima:"
  sambungkan: 35.21, // "sambungkan repo ke Vercel atau Netlify."
  vercel: 36.94, // * "Vercel"
  netlify: 37.4, // * "Netlify"
  setiap: 38.65, // "Setiap perubahan yang digabung,"
  online: 40.37, // "otomatis online."
  kamuPilih: 42.25, // "Kamu pilih Claude Code"
  atauCodex: 43.72, // "atau Codex?"
  komentar: 44.9, // "Tulis di komentar."
  dibantu: 46.63, // "Mau dibantu?"
  konsultasi: 47.78, // "Konsultasi gratis di Youcanbuild."
} as const;

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
