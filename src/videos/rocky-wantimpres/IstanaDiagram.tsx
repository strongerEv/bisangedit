import React from "react";
import { interpolate } from "remotion";
import { theme } from "../../components/theme";

type Props = {
  /** 0 = Rocky di luar istana, 1 = di dalam. */
  inside: number;
  /** Garis "kritik" dari titik ke istana (0 → 1 = muncul). */
  critique?: number;
  /** Label LUAR / DALAM di bawah garis tanah (0 → 1 = muncul). */
  sides?: number;
  /** Progres muncul keseluruhan diagram (0 → 1). */
  appear?: number;
};

const W = 888;
const H = 640;
const GROUND = 560;
const BUILDING = { x: 380, w: 488, top: 210 };
const OUT_X = 160;
const IN_X = BUILDING.x + BUILDING.w / 2;
const DOT_Y = 470;
const DOT_R = 34;

/** Istana (garis) + titik aksen = Rocky. Gerakan titik = inti cerita. */
export const IstanaDiagram: React.FC<Props> = ({ inside, critique = 0, sides = 0, appear = 1 }) => {
  const c = theme.colors;
  const x = interpolate(inside, [0, 1], [OUT_X, IN_X]);
  const hop = Math.sin(Math.PI * inside) * 90;
  const roofPeak = BUILDING.top - 130;

  return (
    <svg
      width={W}
      viewBox={`0 0 ${W} ${H}`}
      style={{ opacity: appear, transform: `scale(${0.96 + 0.04 * appear})`, overflow: "visible" }}
    >
      <line x1={0} y1={GROUND} x2={W} y2={GROUND} stroke={c.line} strokeWidth={4} />

      {/* Istana: atap segitiga + badan + pilar */}
      <path
        d={`M ${BUILDING.x - 20} ${BUILDING.top} L ${IN_X} ${roofPeak} L ${BUILDING.x + BUILDING.w + 20} ${BUILDING.top} Z`}
        fill={c.card}
        stroke={c.text}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <rect
        x={BUILDING.x}
        y={BUILDING.top}
        width={BUILDING.w}
        height={GROUND - BUILDING.top}
        fill={c.card}
        stroke={c.text}
        strokeWidth={6}
      />
      {[0.2, 0.8].map((f) => (
        <line
          key={f}
          x1={BUILDING.x + BUILDING.w * f}
          y1={BUILDING.top + 90}
          x2={BUILDING.x + BUILDING.w * f}
          y2={GROUND}
          stroke={c.line}
          strokeWidth={6}
        />
      ))}
      <text
        x={IN_X}
        y={BUILDING.top + 60}
        textAnchor="middle"
        fontFamily={theme.fonts.mono}
        fontWeight={500}
        fontSize={28}
        letterSpacing="0.12em"
        fill={c.text}
      >
        ISTANA
      </text>

      {/* Garis kritik: tiga busur dari titik ke arah istana */}
      {[0, 1, 2].map((i) => {
        const p = interpolate(critique, [i / 3, (i + 1) / 3], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const bx = OUT_X + 70 + i * 44;
        const r = 26 + i * 16;
        return (
          <path
            key={i}
            d={`M ${bx} ${DOT_Y - r} Q ${bx + r * 0.6} ${DOT_Y} ${bx} ${DOT_Y + r}`}
            fill="none"
            stroke={c.muted}
            strokeWidth={6}
            strokeLinecap="round"
            opacity={p * (1 - inside)}
          />
        );
      })}

      {/* Titik = Rocky */}
      <circle cx={x} cy={DOT_Y - hop} r={DOT_R} fill={c.accent} />
      <text
        x={x}
        y={DOT_Y - hop + DOT_R + 40}
        textAnchor="middle"
        fontFamily={theme.fonts.mono}
        fontWeight={500}
        fontSize={24}
        fill={c.text}
      >
        Rocky
      </text>

      {/* Label sisi */}
      <g opacity={sides} fontFamily={theme.fonts.mono} fontWeight={500} fontSize={26} letterSpacing="0.12em" fill={c.muted}>
        <text x={OUT_X} y={GROUND + 56} textAnchor="middle">LUAR</text>
        <text x={IN_X} y={GROUND + 56} textAnchor="middle">DALAM</text>
      </g>
    </svg>
  );
};
