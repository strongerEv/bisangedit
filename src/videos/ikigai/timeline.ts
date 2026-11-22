import { whoosh } from "@remotion/sfx";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

// Tanpa VO. Ikigai (Héctor García & Francesc Miralles): titik temu yang kamu cintai, kuasai, dibutuhkan dunia,
// dan bisa menghasilkan. Detik absolut.
export const MARKERS = {
  judul: 0.2, // "IKIGAI."
  q1: 1.4, // "ALASANMU BANGUN DI PAGI HARI."
  lingkaran: [3.0, 5.0, 7.0, 9.0] as const, // cintai, kuasai, dibutuhkan dunia, menghasilkan
  temu: 11.6, // keempat lingkaran merapat
  irisan: 12.6, // label passion / misi / profesi / vokasi
  ikigai: 16.0, // tengah menyala
  q6: 16.2, // "DI TITIK TEMU KEEMPATNYA..."
  q7: 19.0, // "ITULAH IKIGAI-MU. / SUDAH KETEMU?"
  pudar: 22.5,
  akhir: 23.5,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Ikigai", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

export const QUOTES = [
  { at: M.q1, lines: ["ALASANMU BANGUN", "DI PAGI HARI."] },
  { at: M.lingkaran[0], lines: ["YANG KAMU CINTAI."] },
  { at: M.lingkaran[1], lines: ["YANG KAMU KUASAI."] },
  { at: M.lingkaran[2], lines: ["YANG DIBUTUHKAN DUNIA."] },
  { at: M.lingkaran[3], lines: ["YANG BISA MENGHASILKAN."] },
  { at: M.q6, lines: ["DI TITIK TEMU", "KEEMPATNYA..."] },
  { at: M.q7, lines: ["ITULAH IKIGAI-MU.", "SUDAH KETEMU?"] },
] as const;

export const TYPE_CPS = 30;
export const lineAt = (start: number, lines: readonly string[], i: number) =>
  start + lines.slice(0, i).reduce((a, l) => a + l.length / TYPE_CPS + 0.25, 0);

/** SFX — set khusus video ini. */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  { at: M.judul, src: "syn:gong", vol: 0.6, dur: 3 },
  ...M.lingkaran.map((at) => ({ at: at - 0.1, src: whoosh, vol: 0.6 })),
  ...M.lingkaran.map((at, i) => ({ at: at + 0.3, src: "syn:ding-lonceng", vol: 0.25 + i * 0.05 })),
  { at: M.temu, src: "syn:akord", vol: 0.6, dur: 2.4 },
  ...[0, 0.3, 0.6, 0.9].map((d) => ({ at: M.irisan + d, src: "syn:pop-kecil", vol: 0.4 })),
  { at: M.ikigai, src: "syn:boom-sinematik", vol: 0.5 },
  { at: M.ikigai + 0.1, src: "syn:sparkle", vol: 0.5 },
];

export const TYPED: [string, number][] = [
  ["IKIGAI.", M.judul],
  ...QUOTES.flatMap((q) => q.lines.map((l, i) => [l, lineAt(q.at, q.lines, i)] as [string, number])),
];

export const DURATION = sec(M.akhir);
