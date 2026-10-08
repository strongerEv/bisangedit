export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

export const AUDIO = "audio/rocky-pakar/satirerokylagibos.wav";

/**
 * Ruang kosong 6 dtk untuk klip pidato (diisi user di CapCut).
 * File audio TIDAK dipotong: audio diputar sampai CUT, berhenti GAP detik,
 * lalu dilanjutkan dari titik CUT yang sama.
 */
export const CUT = 2.75; // detik di file audio, sesudah "Pantesan presiden pernah pidato gini…"
export const GAP = 6.0;
export const AUDIO_END_SRC = 29.5;

/** Waktu di file audio → waktu di video. */
export const v = (t: number) => (t <= CUT ? t : t + GAP);

export const AUDIO_END = v(AUDIO_END_SRC);

// Waktu dalam DETIK (waktu video), sama persis dengan TREATMENT.md.
export const SCENES = [
  { id: "S01", label: "Hook", start: 0.0, end: CUT },
  { id: "S02", label: "Ruang kosong · klip pidato", start: CUT, end: CUT + GAP },
  { id: "S03", label: "18 September", start: CUT + GAP, end: 11.48 },
  { id: "S04", label: "Dua minggu kemudian", start: 11.48, end: 15.9 },
  { id: "S05", label: "Siapa Rocky", start: 15.9, end: 22.05 },
  { id: "S06", label: "Pakar paling lantang", start: 22.05, end: 25.08 },
  { id: "S07", label: "Luar → dalam", start: 25.08, end: 29.2 },
  { id: "S08", label: "Ternyata", start: 29.2, end: 31.91 },
  { id: "S99", label: "Isi sendiri", start: 31.91, end: 37.1 }, // akhir VO 35,5 + ekor ±1,6
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

// Momen penting (waktu VIDEO). Diukur dari jeda di file audio lalu digeser lewat v();
// yang bertanda * diperkirakan dari jumlah suku kata di dalam frasa.
export const MARKERS = {
  pantesan: v(0.26), // "Pantesan presiden pernah pidato gini…"
  tanggal: v(3.0), // "Itu delapan belas September, di HUT PAN."
  duaMinggu: v(5.68), // "Dua minggu kemudian, Rocky Gerung dilantik jadi anggota Wantimpres."
  dilantik: v(7.4), // * "dilantik jadi anggota Wantimpres"
  siapa: v(10.09), // "Rocky itu siapa?"
  filsuf: v(11.34), // "Filsuf."
  lulusan: v(12.34), // "Lulusan filsafat UI, pernah belasan tahun mengajar di sana."
  mengajar: v(14.3), // * "pernah belasan tahun mengajar di sana"
  pakar: v(16.25), // "Pakar paling lantang… yang dulu hobi bilang: dungu."
  dungu1: v(18.5), // * "dungu."
  diLuar: v(19.28), // "Dulu di luar, teriak dungu."
  dungu2: v(20.56), // * "dungu."
  diDalam: v(21.17), // "Sekarang di dalam, kasih nasihat."
  nasihat: v(22.46), // * "nasihat."
  ternyata: v(23.39), // "Oh… ternyata ini yang dimaksud."
  dimaksud: v(25.03), // * "dimaksud."
  saking: v(26.11), // "Saking pintarnya… jadi apa?"
  jadiApa: v(27.06), // * "jadi apa?"
  komentar: v(28.04), // "Isi sendiri di kolom komentar."
} as const;

/** Ubah waktu video (detik) menjadi waktu lokal di dalam adegan. */
export const local = (id: SceneId, t: number) => t - SCENES.find((s) => s.id === id)!.start;

export const DURATION = sec(SCENES[SCENES.length - 1].end);
