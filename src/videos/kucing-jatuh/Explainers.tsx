import React from "react";
import { Easing, interpolate } from "remotion";
import { theme } from "../../components/theme";
import { P } from "./palette";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
/** Muncul (0→1) lalu hilang, dalam detik. */
export const window01 = (t: number, a: number, b: number, fade = 0.3) =>
  interpolate(t, [a, a + fade, b - fade, b], [0, 1, 1, 0], { ...clamp, easing: Easing.inOut(Easing.cubic) });

const chip: React.CSSProperties = {
  background: "white",
  borderRadius: 999,
  padding: "10px 24px",
  fontFamily: theme.fonts.heading,
  fontWeight: 700,
  fontSize: 36,
  color: P.ink,
  boxShadow: `0 12px 30px ${P.shadow}`,
  whiteSpace: "nowrap",
};

/** "KOK BISA?" besar saat waktu melambat. */
export const KokBisa: React.FC<{ p: number }> = ({ p }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      width: 1080,
      top: 1380,
      textAlign: "center",
      fontFamily: theme.fonts.heading,
      fontWeight: 700,
      fontSize: 150,
      letterSpacing: "-0.03em",
      color: "white",
      textShadow: `0 10px 0 ${P.orangeDark}, 0 18px 40px rgba(0,0,0,0.25)`,
      opacity: p,
      transform: `scale(${0.7 + 0.3 * p}) rotate(${-4 * p}deg)`,
    }}
  >
    KOK BISA?
  </div>
);

/** Lencana telinga dalam: spiral keseimbangan + gelombang. */
export const EarBadge: React.FC<{ x: number; y: number; p: number; t: number }> = ({ x, y, p, t }) => {
  const spiral = Array.from({ length: 60 })
    .map((_, i) => {
      const a = i * 0.32;
      const r = 6 + i * 1.05;
      return `${i === 0 ? "M" : "L"} ${100 + Math.cos(a) * r} ${100 + Math.sin(a) * r}`;
    })
    .join(" ");
  return (
    <div style={{ position: "absolute", left: x - 100, top: y - 100, opacity: p, transform: `scale(${0.6 + 0.4 * p})` }}>
      <svg width={200} height={200}>
        <circle cx={100} cy={100} r={96} fill="white" />
        {[0, 1, 2].map((i) => {
          const ph = (t * 1.2 + i / 3) % 1;
          return <circle key={i} cx={100} cy={100} r={70 + ph * 26} fill="none" stroke={P.orange} strokeWidth={4} opacity={(1 - ph) * 0.6} />;
        })}
        <path d={spiral} fill="none" stroke={P.orangeDark} strokeWidth={7} strokeLinecap="round" />
      </svg>
      <div style={{ ...chip, position: "absolute", top: 210, left: 100, transform: "translateX(-50%)", fontSize: 30 }}>telinga dalam</div>
    </div>
  );
};

/** Label tahap putaran. */
export const StepChip: React.FC<{ x: number; y: number; n: string; text: string; p: number }> = ({ x, y, n, text, p }) => (
  <div style={{ position: "absolute", left: x, top: y, opacity: p, transform: `translateY(${(1 - p) * 16}px)`, display: "flex", alignItems: "center", gap: 12, ...chip }}>
    <span style={{ width: 44, height: 44, borderRadius: 22, background: P.orange, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{n}</span>
    {text}
  </div>
);

/** Kartu "X-ray": kerangka kucing tampak samping, tulang punggung melengkung, tulang selangka disorot. */
export const XrayCard: React.FC<{ p: number; t: number; clavicle: number }> = ({ p, t, clavicle }) => {
  const bend = Math.sin(t * 2.4) * 46;
  const hip = { x: 560, y: 250 };
  const neck = { x: 230, y: 230 };
  const ctrl = { x: 395, y: 170 + bend };
  const q = (s: number) => ({
    x: (1 - s) ** 2 * hip.x + 2 * (1 - s) * s * ctrl.x + s ** 2 * neck.x,
    y: (1 - s) ** 2 * hip.y + 2 * (1 - s) * s * ctrl.y + s ** 2 * neck.y,
  });
  const verts = Array.from({ length: 13 }).map((_, i) => q(i / 12));
  const shoulder = q(0.9);
  const glow = 0.5 + 0.5 * Math.sin(t * 6);
  return (
    <div
      style={{
        position: "absolute",
        left: 96,
        top: 1010,
        width: 888,
        height: 560,
        borderRadius: 40,
        background: P.xray,
        boxShadow: `0 30px 70px rgba(19,41,75,0.45)`,
        overflow: "hidden",
        opacity: p,
        transform: `translateY(${(1 - p) * 80}px)`,
      }}
    >
      <div style={{ position: "absolute", left: 32, top: 26, fontFamily: theme.fonts.mono, fontWeight: 500, fontSize: 26, letterSpacing: "0.12em", color: P.xrayLine }}>X-RAY · TAMPAK SAMPING</div>
      <svg width={888} height={560} style={{ position: "absolute", left: 0, top: 30 }}>
        <g stroke={P.xrayLine} strokeLinecap="round" fill="none" style={{ filter: "drop-shadow(0 0 6px rgba(143,211,255,0.8))" }}>
          {/* tengkorak */}
          <ellipse cx={170} cy={210} rx={62} ry={48} strokeWidth={6} />
          <path d="M 120 175 L 108 120 L 150 165 M 205 168 L 230 118 L 232 172" strokeWidth={6} />
          {/* tulang punggung */}
          <path d={`M ${hip.x} ${hip.y} Q ${ctrl.x} ${ctrl.y} ${neck.x} ${neck.y}`} strokeWidth={8} />
          {/* ekor */}
          <path d={`M ${hip.x} ${hip.y} q 120 -20 150 -130`} strokeWidth={6} />
          {/* rusuk */}
          {[0.35, 0.45, 0.55, 0.65].map((s) => {
            const v = q(s);
            return <path key={s} d={`M ${v.x} ${v.y} q -10 70 18 110`} strokeWidth={5} opacity={0.8} />;
          })}
          {/* kaki */}
          <path d={`M ${shoulder.x} ${shoulder.y} l -10 120 l 18 110`} strokeWidth={7} />
          <path d={`M ${hip.x} ${hip.y} l 30 110 l -30 120`} strokeWidth={7} />
        </g>
        {verts.map((v, i) => (
          <circle key={i} cx={v.x} cy={v.y} r={9} fill={P.xray} stroke={P.xrayLine} strokeWidth={4} />
        ))}
        {/* tulang selangka: melayang, tidak menyambung */}
        <g opacity={clavicle}>
          <circle cx={shoulder.x + 4} cy={shoulder.y + 34} r={46 + glow * 8} fill={P.orange} opacity={0.18} />
          <path d={`M ${shoulder.x - 22} ${shoulder.y + 40} q 26 -16 52 -6`} stroke={P.orange} strokeWidth={10} strokeLinecap="round" fill="none" />
        </g>
      </svg>
      <div style={{ position: "absolute", left: 470, top: 410, ...chip, fontSize: 30 }}>tulang punggung lentur</div>
      <div style={{ position: "absolute", left: 40, top: 470, ...chip, fontSize: 30, color: P.orangeDark, opacity: clavicle }}>tulang selangka</div>
    </div>
  );
};

/** Perbandingan kecepatan jatuh maksimal. */
export const SpeedCompare: React.FC<{ p: number; grow: number }> = ({ p, grow }) => {
  const row = (label: string, value: string, w: number, color: string) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 38, color: P.ink }}>
        <span>{label}</span>
        <span style={{ color }}>{value}</span>
      </div>
      <div style={{ height: 30, borderRadius: 15, background: "#E7EEF6", overflow: "hidden" }}>
        <div style={{ width: `${w * grow * 100}%`, height: "100%", borderRadius: 15, background: color }} />
      </div>
    </div>
  );
  return (
    <div
      style={{
        position: "absolute",
        left: 96,
        top: 1180,
        width: 888,
        background: "white",
        borderRadius: 36,
        padding: "30px 36px",
        boxSizing: "border-box",
        boxShadow: `0 24px 60px ${P.shadow}`,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        opacity: p,
        transform: `translateY(${(1 - p) * 60}px)`,
      }}
    >
      <div style={{ fontFamily: theme.fonts.mono, fontWeight: 500, fontSize: 26, letterSpacing: "0.1em", color: "#6B7079" }}>KECEPATAN JATUH MAKSIMAL</div>
      {row("Kucing", "±97 km/jam", 0.5, P.orange)}
      {row("Manusia", "±2× lebih cepat", 1, "#9AA6B5")}
    </div>
  );
};
