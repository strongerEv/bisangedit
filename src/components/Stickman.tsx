import React from "react";
import { theme } from "./theme";

/**
 * Sudut dalam derajat. 0 = lurus ke bawah, 90 = ke kanan layar, -90 = ke kiri, 180 = ke atas.
 * Segmen bawah (siku/lutut) ditulis relatif terhadap segmen atas.
 */
export type Pose = {
  lean?: number; // kemiringan badan (0 = tegak)
  head?: number; // kemiringan kepala
  armL: [number, number];
  armR: [number, number];
  legL: [number, number];
  legR: [number, number];
};

export type Face = "neutral" | "happy" | "sad" | "stress" | "surprised";

export const POSES = {
  stand: { armL: [-20, 10], armR: [20, -10], legL: [-12, 4], legR: [12, -4] },
  think: { head: -10, armL: [-20, 10], armR: [40, 140], legL: [-10, 4], legR: [12, -4] },
  slump: { lean: 14, head: 25, armL: [-16, 4], armR: [-8, 4], legL: [-10, 6], legR: [10, 4] },
  juggle: { armL: [-115, -35], armR: [115, 35], legL: [-16, 4], legR: [16, -4] },
  run: { lean: 14, armL: [-60, -80], armR: [60, 90], legL: [-45, 70], legR: [40, 10] },
  cheer: { armL: [-130, -15], armR: [130, 15], legL: [-14, 4], legR: [14, -4] },
  point: { armL: [-15, 10], armR: [110, -10], legL: [-12, 4], legR: [12, -4] },
} satisfies Record<string, Pose>;

type Props = {
  /** Titik pinggul (px). */
  x: number;
  y: number;
  pose: Pose;
  face?: Face;
  /** 1 = menghadap kanan, -1 = kiri, 0 = depan. */
  facing?: number;
  scale?: number;
  color?: string;
  style?: React.CSSProperties;
};

const L = { body: 150, upperArm: 78, foreArm: 72, thigh: 88, shin: 88, head: 50, stroke: 13 };
const rad = (d: number) => (d * Math.PI) / 180;
const step = (p: { x: number; y: number }, angle: number, len: number) => ({
  x: p.x + Math.sin(rad(angle)) * len,
  y: p.y + Math.cos(rad(angle)) * len,
});

/** Stickman SVG dengan pose bersendi. Garis tebal membulat, satu warna. */
export const Stickman: React.FC<Props> = ({ x, y, pose, face = "neutral", facing = 0, scale = 1, color = theme.colors.text, style }) => {
  const lean = pose.lean ?? 0;
  const hip = { x: 0, y: 0 };
  const neck = step(hip, 180 + lean, L.body);
  const shoulder = step(neck, lean, 14);
  const headC = step(neck, 180 + lean + (pose.head ?? 0) * 0.3, L.head + 10);

  // Lengan ikut miring bersama badan; kaki tidak (kaki tetap berpijak).
  const limb = (from: { x: number; y: number }, [a, b]: [number, number], l1: number, l2: number, tilt = lean) => {
    const mid = step(from, a + tilt, l1);
    const end = step(mid, a + b + tilt, l2);
    return `M ${from.x} ${from.y} L ${mid.x} ${mid.y} L ${end.x} ${end.y}`;
  };

  const eyeDx = 16;
  const look = facing * 12;
  const ex = headC.x + look;
  const ey = headC.y - 6;
  const mouthY = headC.y + 20;

  const mouth = {
    neutral: `M ${ex - 12} ${mouthY} L ${ex + 12} ${mouthY}`,
    happy: `M ${ex - 18} ${mouthY - 4} Q ${ex} ${mouthY + 16} ${ex + 18} ${mouthY - 4}`,
    sad: `M ${ex - 16} ${mouthY + 6} Q ${ex} ${mouthY - 8} ${ex + 16} ${mouthY + 6}`,
    stress: `M ${ex - 18} ${mouthY} l 9 -6 l 9 6 l 9 -6 l 9 6`,
    surprised: "",
  }[face];

  const pad = 200;
  return (
    <svg
      width={pad * 2}
      height={pad * 2 + 120}
      viewBox={`${-pad} ${-pad - 120} ${pad * 2} ${pad * 2 + 120}`}
      style={{
        position: "absolute",
        left: x - pad * scale,
        top: y - (pad + 120) * scale,
        width: pad * 2 * scale,
        height: (pad * 2 + 120) * scale,
        overflow: "visible",
        ...style,
      }}
    >
      <g fill="none" stroke={color} strokeWidth={L.stroke} strokeLinecap="round" strokeLinejoin="round">
        <path d={limb(hip, pose.legL, L.thigh, L.shin, 0)} />
        <path d={limb(hip, pose.legR, L.thigh, L.shin, 0)} />
        <path d={`M ${hip.x} ${hip.y} L ${neck.x} ${neck.y}`} />
        <path d={limb(shoulder, pose.armL, L.upperArm, L.foreArm)} />
        <path d={limb(shoulder, pose.armR, L.upperArm, L.foreArm)} />
        <circle cx={headC.x} cy={headC.y} r={L.head} fill={theme.colors.card} />
      </g>
      <g fill={color}>
        <circle cx={ex - eyeDx} cy={ey} r={face === "surprised" ? 7 : 6} />
        <circle cx={ex + eyeDx} cy={ey} r={face === "surprised" ? 7 : 6} />
        {face === "surprised" ? <circle cx={ex} cy={mouthY + 2} r={9} /> : null}
      </g>
      {mouth ? <path d={mouth} fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" /> : null}
    </svg>
  );
};

const mixPair = (a: [number, number], b: [number, number], t: number): [number, number] => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];

/** Campur dua pose (t: 0 = a, 1 = b). */
export const mixPose = (a: Pose, b: Pose, t: number): Pose => ({
  lean: (a.lean ?? 0) + ((b.lean ?? 0) - (a.lean ?? 0)) * t,
  head: (a.head ?? 0) + ((b.head ?? 0) - (a.head ?? 0)) * t,
  armL: mixPair(a.armL, b.armL, t),
  armR: mixPair(a.armR, b.armR, t),
  legL: mixPair(a.legL, b.legL, t),
  legR: mixPair(a.legR, b.legR, t),
});

/** Siklus jalan. phase dalam putaran (1 = satu langkah penuh kiri+kanan). */
export const walkPose = (phase: number): Pose => {
  const s = Math.sin(phase * Math.PI * 2);
  return {
    lean: -4,
    armL: [-25 * s, 10],
    armR: [25 * s, -10],
    legL: [28 * s, Math.max(0, -s) * 30],
    legR: [-28 * s, Math.max(0, s) * 30],
  };
};

/** Siklus lari (lebih lebar, badan condong). */
export const runPose = (phase: number): Pose => {
  const s = Math.sin(phase * Math.PI * 2);
  return {
    lean: -14,
    armL: [-70 * s, -80],
    armR: [70 * s, -80],
    legL: [45 * s, 30 + Math.max(0, -s) * 60],
    legR: [-45 * s, 30 + Math.max(0, s) * 60],
  };
};
