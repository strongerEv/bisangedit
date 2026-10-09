export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/cara-remotion/explainremotion001.wav";
export const AUDIO_END = 44.02;

// Momen penting di audio (detik). Awal frasa diukur dari jeda (silencedetect −35 dB);
// yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.
export const MARKERS = {
  videoIni: 0.28, // "Video ini…"
  kode: 1.39, // "dibuat pakai kode."
  namanya: 2.86, // "Namanya"
  remotion: 3.67, // "Remotion."
  pakaiReact: 5.48, // "Remotion bikin video pakai React,"
  react: 7.3, // * "React"
  website: 8.24, // "bahasa untuk bikin website."
  tapi: 10.48, // "Tapi kodenya… saya serahkan ke Claude Code."
  claudeCode: 12.54, // * "Claude Code"
  satu: 13.97, // "Satu:"
  naskah: 14.65, // "saya minta naskah."
  cekFakta: 16.28, // "Claude cek faktanya,"
  storyboard: 17.46, // "lalu susun storyboard."
  dua: 19.49, // "Dua:"
  chatgpt: 20.17, // "aset gambarnya saya buat di ChatGPT."
  memotong: 23.04, // "Claude yang memotong dan merapikannya."
  tiga: 25.7, // "Tiga: saya rekam suara."
  sinkron: 28.04, // "Claude sinkronkan animasinya sampai ke kata."
  sampai: 29.54, // * "sampai"
  ke: 29.87, // * "ke"
  kata: 30.04, // * "kata"
  empat: 31.3, // "Empat:"
  preview: 32.33, // "Claude kirim gambar preview."
  kurang: 34.22, // "Kalau ada yang kurang, tinggal bilang."
  lima: 36.7, // "Lima: saya ketik "gas"…"
  gas: 37.9, // * "gas"
  mp4: 38.63, // "dan jadilah file MP4."
  tutorial: 41.08, // "Mau tutorial lengkapnya?"
  komen: 42.65, // "Komen Remotion di bawah."
} as const;

const M = MARKERS;

// Waktu dalam DETIK, sama persis dengan TREATMENT.md. Pergantian ±0,2 dtk sebelum kalimat berikut.
export const SCENES = [
  { id: "S01", label: "Hook", start: 0, end: M.pakaiReact - 0.2 },
  { id: "S02", label: "Remotion + Claude Code", start: M.pakaiReact - 0.2, end: M.satu - 0.2 },
  { id: "S03", label: "1 · Naskah", start: M.satu - 0.2, end: M.dua - 0.2 },
  { id: "S04", label: "2 · Aset", start: M.dua - 0.2, end: M.tiga - 0.2 },
  { id: "S05", label: "3 · Suara", start: M.tiga - 0.2, end: M.empat - 0.2 },
  { id: "S06", label: "4 · Preview", start: M.empat - 0.2, end: M.lima - 0.2 },
  { id: "S07", label: "5 · Gas", start: M.lima - 0.2, end: M.tutorial - 0.2 },
  { id: "S99", label: "Komen Remotion", start: M.tutorial - 0.2, end: AUDIO_END + 1.5 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

/** Ubah waktu absolut (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
