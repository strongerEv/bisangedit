import { uiSwitch } from "@remotion/sfx";

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

// Tanpa VO. Think and Grow Rich (Napoleon Hill): "Whatever the mind can conceive and believe, it can achieve."
export const MARKERS = {
  judul: 0.2, // "PIKIRAN JADI KENYATAAN."
  ide: 1.3, // bohlam menyala
  q1: 1.6, // "SEMUA DIMULAI / DARI PIKIRAN."
  sketsa: 2.2, // sketsa toko digambar di awan pikiran (2,2–5,4)
  q2: 5.8, // "BAYANGKAN DENGAN JELAS. / YAKINI SEPENUHNYA."
  turun: 7.0, // sketsa turun ke dunia nyata
  jalan: 7.4,
  bangun: 8.4, // membangun garis demi garis (8,4–14,4)
  q3: 9.6, // "LALU KERJAKAN, / SEDIKIT DEMI SEDIKIT."
  jadi: 14.6, // toko jadi, lampu menyala
  q4: 15.0, // "APA PUN YANG BISA DIBAYANGKAN / DAN DIYAKINI OLEH PIKIRAN, / BISA DICAPAI."
  pudar: 21.0,
  akhir: 22.0,
} as const;

const M = MARKERS;

export const SCENES = [{ id: "S01", label: "Pikiran jadi nyata", start: 0, end: M.akhir }] as const;
export type SceneId = (typeof SCENES)[number]["id"];

export const QUOTES = [
  { at: M.q1, lines: ["SEMUA DIMULAI", "DARI PIKIRAN."] },
  { at: M.q2, lines: ["BAYANGKAN DENGAN JELAS.", "YAKINI SEPENUHNYA."] },
  { at: M.q3, lines: ["LALU KERJAKAN,", "SEDIKIT DEMI SEDIKIT."] },
  { at: M.q4, lines: ["APA PUN YANG BISA DIBAYANGKAN", "DAN DIYAKINI OLEH PIKIRAN,", "BISA DICAPAI."] },
] as const;

export const TYPE_CPS = 30;
export const lineAt = (start: number, lines: readonly string[], i: number) =>
  start + lines.slice(0, i).reduce((a, l) => a + l.length / TYPE_CPS + 0.25, 0);

/** Ketukan palu saat membangun. */
export const PALU = Array.from({ length: 10 }, (_, i) => M.bangun + 0.2 + i * 0.6);

/** SFX — set khusus video ini. */
export const SFX: { at: number; src: string; vol?: number; dur?: number }[] = [
  { at: M.ide, src: uiSwitch, vol: 0.8 },
  ...Array.from({ length: 6 }, (_, i) => ({ at: M.sketsa + i * 0.53, src: "syn:swish", vol: 0.3 })),
  { at: M.turun, src: "syn:whoosh-panjang", vol: 0.55 },
  ...[0, 0.35, 0.7].map((d) => ({ at: M.jalan + 0.1 + d, src: "syn:langkah", vol: 0.7 })),
  ...PALU.map((at) => ({ at, src: "syn:pukulan", vol: 0.4 })),
  { at: M.jadi, src: "syn:boom-sinematik", vol: 0.65 },
];

export const TYPED: [string, number][] = [
  ["PIKIRAN JADI KENYATAAN.", M.judul],
  ...QUOTES.flatMap((q) => q.lines.map((l, i) => [l, lineAt(q.at, q.lines, i)] as [string, number])),
];

export const DURATION = sec(M.akhir);
