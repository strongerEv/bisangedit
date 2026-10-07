import type React from "react";
import { Easing, interpolate, spring } from "remotion";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Semua waktu dalam detik, relatif terhadap awal adegan.

/** Progres masuk 0 → 1 (spring, tanpa pantulan). */
export const enterAt = (frame: number, fps: number, delay = 0, duration = 0.5) =>
  spring({
    frame: frame - Math.round(delay * fps),
    fps,
    durationInFrames: Math.round(duration * fps),
    config: { damping: 200 },
  });

/** Progres keluar 1 → 0 di akhir adegan. */
export const exitAt = (frame: number, fps: number, sceneDur: number, duration = 0.3) =>
  interpolate(frame, [(sceneDur - duration) * fps, sceneDur * fps], [1, 0], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });

/** Nilai 0 → 1 antara dua titik waktu, dengan easing. */
export const between = (frame: number, fps: number, from: number, to: number) =>
  interpolate(frame, [from * fps, to * fps], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

/** Gaya fade + geser naik. */
export const rise = (p: number, distance = 30): React.CSSProperties => ({
  opacity: p,
  transform: `translateY(${(1 - p) * distance}px)`,
});
