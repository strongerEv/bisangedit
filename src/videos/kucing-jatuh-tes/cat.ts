import { Easing, interpolate } from "remotion";
import { camY, FPS, GROUND_Y, T } from "./timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const io = { ...clamp, easing: Easing.inOut(Easing.cubic) };
const out = { ...clamp, easing: Easing.out(Easing.cubic) };

export type Sprite = "duduk" | "jatuh" | "melompat" | "mendarat";

/** Ukuran sprite (px, sudah 2×) dari public/karakter/mochi. */
export const SPRITES: Record<Sprite, { w: number; h: number }> = {
  duduk: { w: 158, h: 296 },
  jatuh: { w: 282, h: 234 },
  melompat: { w: 272, h: 288 },
  mendarat: { w: 230, h: 216 },
};

export type CatLayer = { sprite: Sprite; opacity: number; rot: number; scale: number };
export type CatState = { x: number; y: number; layers: CatLayer[]; sx: number; sy: number };

/**
 * Posisi & pose Mochi di detik t (x, y = titik tengah di layar).
 * Semua angka waktu diambil dari T (timeline.ts).
 */
export const catAt = (t: number): CatState => {
  const frame = t * FPS;
  const cam = camY(frame);

  // 1) Duduk di tepi atap, lalu tergelincir.
  if (t < T.fall) {
    const slip = interpolate(t, [T.slip, T.fall], [0, 1], io);
    const s = 1.25;
    const h = SPRITES.duduk.h * s;
    return {
      x: interpolate(slip, [0, 1], [400, 570]),
      y: 1252 - cam - h / 2 + slip * 40,
      layers: [{ sprite: "duduk", opacity: 1, rot: slip * 28, scale: s }],
      sx: 1,
      sy: 1,
    };
  }

  // 4) Mendarat.
  if (t >= T.land) {
    const s = 1.75;
    const h = SPRITES.mendarat.h * s;
    const u = t - T.land;
    const amt = Math.exp(-6 * u) * Math.cos(16 * u); // squash → pantul kecil → diam
    return {
      x: 540,
      y: GROUND_Y - h / 2 + 8,
      layers: [{ sprite: "mendarat", opacity: 1, rot: 0, scale: s }],
      sx: 1 + 0.14 * amt,
      sy: 1 - 0.2 * amt,
    };
  }

  // 2–3) Di udara: jatuh (terbalik) → membalik badan → kaki terentang.
  const dip = interpolate(t, [T.fall, T.fall + 0.45, T.fall + 1.3], [1100, 1260, 880], {
    ...clamp,
    easing: Easing.inOut(Easing.quad),
  });
  const approach = interpolate(t, [T.land - 0.4, T.land], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  const yAir = interpolate(approach, [0, 1], [dip, GROUND_Y - 190]);
  const wobble = t < T.flip ? Math.sin((t - T.fall) * 7) * 9 : 0;
  const flip = interpolate(t, [T.flip, T.flipEnd], [0, 180], io);
  const swap = interpolate(t, [T.spread, T.spread + 0.2], [0, 1], clamp);
  const sway = t > T.spread ? Math.sin((t - T.spread) * 2.2) : 0;

  return {
    x: interpolate(t, [T.fall, T.fall + 0.8], [570, 540], out) + sway * 18,
    y: yAir,
    layers: [
      { sprite: "jatuh", opacity: 1 - swap, rot: wobble + flip, scale: 1.5 },
      { sprite: "melompat", opacity: swap, rot: -12 + sway * 4, scale: 1.55 },
    ],
    sx: 1,
    sy: 1,
  };
};
