import React from "react";
import { P } from "./palette";

const rand = (i: number, k: number) => {
  const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return v - Math.floor(v);
};

/** Garis kecepatan vertikal; naik saat kamera turun. Intensitas mengikuti kecepatan jatuh. */
export const SpeedLines: React.FC<{ cam: number; intensity: number }> = ({ cam, intensity }) => {
  if (intensity <= 0.01) return null;
  return (
    <>
      {Array.from({ length: 16 }).map((_, i) => {
        const x = 40 + rand(i, 1) * 1000;
        const len = 220 + rand(i, 2) * 260;
        const span = 2600;
        const y = ((((rand(i, 3) * span - cam * 1.5) % span) + span) % span) - 400;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 6,
              height: len,
              borderRadius: 3,
              background: "white",
              opacity: intensity * (0.35 + rand(i, 4) * 0.45),
            }}
          />
        );
      })}
    </>
  );
};

/** Panah melingkar "membalik badan" di sekitar Mochi. */
export const FlipArc: React.FC<{ cx: number; cy: number; draw: number; opacity: number }> = ({ cx, cy, draw, opacity }) => {
  const r = 250;
  const start = -150;
  const sweep = 260 * draw;
  const a0 = (start * Math.PI) / 180;
  const a1 = ((start + sweep) * Math.PI) / 180;
  const x0 = cx + r * Math.cos(a0);
  const y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  const large = sweep > 180 ? 1 : 0;
  // ujung panah tegak lurus terhadap arah putaran
  const tx = -Math.sin(a1);
  const ty = Math.cos(a1);
  const head = 34;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity }}>
      <path d={`M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`} fill="none" stroke={P.orange} strokeWidth={16} strokeLinecap="round" />
      {draw > 0.05 ? (
        <path
          d={`M ${x1 + (-tx * 0.6 - ty) * head} ${y1 + (-ty * 0.6 + tx) * head} L ${x1 + tx * head * 0.5} ${y1 + ty * head * 0.5} L ${x1 + (-tx * 0.6 + ty) * head} ${y1 + (-ty * 0.6 - tx) * head}`}
          fill="none"
          stroke={P.orange}
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}
    </svg>
  );
};

/** Panah udara ke atas di bawah Mochi: hambatan udara menahan jatuh. */
export const AirArrows: React.FC<{ cx: number; cy: number; t: number; opacity: number }> = ({ cx, cy, t, opacity }) => (
  <>
    {[-150, -50, 50, 150].map((dx, i) => {
      const phase = (t * 1.6 + i * 0.27) % 1;
      return (
        <svg
          key={i}
          width={60}
          height={60}
          style={{ position: "absolute", left: cx + dx - 30, top: cy + 230 - phase * 70, opacity: opacity * Math.sin(Math.PI * phase) }}
        >
          <path d="M 10 40 L 30 18 L 50 40" fill="none" stroke="white" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    })}
  </>
);

/** Debu saat mendarat. u = detik sejak mendarat. */
export const Dust: React.FC<{ x: number; y: number; u: number }> = ({ x, y, u }) => {
  if (u < 0 || u > 0.9) return null;
  const p = u / 0.9;
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        const spread = (70 + rand(i, 5) * 230) * (1 - Math.pow(1 - p, 3));
        const size = 40 + rand(i, 6) * 50 + p * 40;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + dir * spread - size / 2,
              top: y - size * 0.6 - p * (20 + rand(i, 7) * 50),
              width: size,
              height: size,
              borderRadius: size,
              background: P.cream,
              opacity: (1 - p) * 0.85,
            }}
          />
        );
      })}
    </>
  );
};
