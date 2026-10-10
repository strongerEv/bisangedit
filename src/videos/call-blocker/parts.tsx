import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { exitAt } from "../../components/motion";
import { theme } from "../../components/theme";

// Warna mengikuti gaya aplikasi Call Blocker (navy + oranye). Layar digambar ulang, bukan screenshot.
export const C = {
  navy: "#1F2A44",
  navy2: "#2B3A5C",
  orange: "#FFA62B",
  orangeDeep: "#FF9100",
  bg: "#FFFFFF",
  soft: "#F4F6FA",
  text: "#111827",
  muted: "#6B7280",
  border: "#E5E7EB",
  red: "#EF4444",
  green: "#22C55E",
  blue: "#42A5F5",
  shadow: "rgba(31, 42, 68, 0.18)",
} as const;

export const font: React.CSSProperties = { fontFamily: theme.fonts.heading };

export const mono: React.CSSProperties = {
  fontFamily: theme.fonts.mono,
  fontWeight: 500,
  fontSize: 26,
  letterSpacing: "0.08em",
  color: C.muted,
};

/** Latar putih dengan bidang miring navy & oranye di bawah (gaya halaman Play Store aplikasinya). */
export const Backdrop: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <AbsoluteFill style={{ background: dark ? C.navy : C.bg, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: -200, right: -200, top: 1480, height: 900, background: dark ? C.navy2 : C.navy, transform: "rotate(-6deg)" }} />
    <div style={{ position: "absolute", left: -300, width: 900, top: 1620, height: 700, background: C.orange, transform: "rotate(10deg)" }} />
  </AbsoluteFill>
);

// ---------- Ikon garis ----------

const circle = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

const ICONS = {
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z",
  x: "M18 6 6 18M6 6l12 12",
  check: "M20 6 9 17l-5-5",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  bellOff: "M6 8a6 6 0 0 1 9.3-5M18 8c0 7 3 9 3 9H9M3 17h1s2-1.3 2-6M10.3 21a1.94 1.94 0 0 0 3.4 0M2 2l20 20",
  wifiOff: "M2 2l20 20M8.5 16.5a5 5 0 0 1 7 0M2 8.8a15 15 0 0 1 4.2-2.6M10.7 5.1A15 15 0 0 1 22 8.8M5 12.9a10 10 0 0 1 5.2-2.8M16.7 11.3a10 10 0 0 1 2.3 1.6M12 20h.01",
  userX: `${circle(9, 7, 4)}M2 21v-1a6 6 0 0 1 6-6h2M17 14l5 5M22 14l-5 5`,
  bookmark: "M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
  send: "M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z",
  plus: "M12 5v14M5 12h14",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  user: `${circle(12, 8, 4)}M4 21a8 8 0 0 1 16 0`,
  heart: "M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z",
} as const;

export type IconName = keyof typeof ICONS;

export const Icon: React.FC<{ name: IconName; size?: number; color?: string; stroke?: number; fill?: string; style?: React.CSSProperties }> = ({
  name,
  size = 24,
  color = "currentColor",
  stroke = 2,
  fill = "none",
  style,
}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d={ICONS[name]} />
  </svg>
);

/** Ikon aplikasi: perisai oranye dengan gagang telepon putih di kotak navy. */
export const AppIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 220, style }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.24, background: C.navy, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 24px 60px ${C.shadow}`, ...style }}>
    <svg viewBox="0 0 100 100" width={size * 0.66} height={size * 0.66}>
      <path d="M50 6 L88 18 V48 C88 72 70 88 50 96 C30 88 12 72 12 48 V18 Z" fill={C.orange} />
      <path d="M50 6 L88 18 V48 C88 72 70 88 50 96 Z" fill={C.orangeDeep} />
      <g transform="translate(29 28) scale(1.75)">
        <path d={ICONS.phone} fill="white" stroke="white" strokeWidth="0.5" />
      </g>
    </svg>
  </div>
);

// ---------- HP (layar digambar dalam koordinat CSS 390×844) ----------

export const SCREEN = { w: 390, h: 844 };

export const Phone: React.FC<{ x?: number; y?: number; width?: number; bg?: string; style?: React.CSSProperties; children?: React.ReactNode }> = ({
  x = 540,
  y = 1100,
  width = 500,
  bg = "white",
  style,
  children,
}) => {
  const k = width / SCREEN.w;
  const h = SCREEN.h * k;
  const bez = 16;
  return (
    <div
      style={{
        position: "absolute",
        left: x - width / 2 - bez,
        top: y - h / 2 - bez,
        width: width + bez * 2,
        height: h + bez * 2,
        borderRadius: 70,
        background: "#0B0B0F",
        boxShadow: `0 40px 90px ${C.shadow}`,
        ...style,
      }}
    >
      <div style={{ position: "absolute", left: bez, top: bez, width, height: h, borderRadius: 56, overflow: "hidden", background: bg }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: SCREEN.w, height: SCREEN.h, transform: `scale(${k})`, transformOrigin: "0 0", ...font, color: C.text }}>
          {children}
        </div>
      </div>
      {/* poni */}
      <div style={{ position: "absolute", left: "50%", top: bez, width: 150, height: 26, marginLeft: -75, borderRadius: "0 0 18px 18px", background: "#0B0B0F" }} />
    </div>
  );
};

/** Ubah koordinat CSS layar ke px di dalam layar Phone. */
export const sc = (v: number, width = 500) => (v * width) / SCREEN.w;

/** Header navy aplikasi. */
export const AppBar: React.FC<{ title: string; back?: boolean }> = ({ title, back }) => (
  <div style={{ height: 96, background: C.navy, color: "white", display: "flex", alignItems: "flex-end", padding: "0 20px 16px", gap: 14, fontSize: 19, fontWeight: 600 }}>
    {back ? <span style={{ fontSize: 22 }}>←</span> : <span style={{ fontSize: 20 }}>☰</span>}
    {title}
  </div>
);

export const Radio: React.FC<{ on: number }> = ({ on }) => (
  <span style={{ position: "relative", width: 20, height: 20, borderRadius: 10, border: `2px solid ${on > 0.5 ? C.blue : "#9CA3AF"}`, flexShrink: 0 }}>
    <span style={{ position: "absolute", left: 3, top: 3, width: 10, height: 10, borderRadius: 5, background: C.blue, transform: `scale(${on})` }} />
  </span>
);

// ---------- Elemen video ----------

export const TitleArea: React.FC<{ dur: number; top?: number; children: React.ReactNode }> = ({ dur, top = 200, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 90, top, width: 900, display: "flex", flexDirection: "column", gap: 12, opacity: exitAt(frame, fps, dur) }}>
      {children}
    </div>
  );
};

export const Chip: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; tone?: "navy" | "orange" | "light" | "red" | "green" }> = ({ children, style, tone = "navy" }) => {
  const c = { navy: [C.navy, "white"], orange: [C.orange, C.navy], light: ["white", C.text], red: [C.red, "white"], green: [C.green, "white"] }[tone];
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: c[0],
        color: c[1],
        borderRadius: 999,
        padding: "16px 30px",
        ...font,
        fontWeight: 700,
        fontSize: 40,
        boxShadow: `0 16px 40px ${C.shadow}`,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Riak tap jari (koordinat bebas). p = 0→1. */
export const TapRipple: React.FC<{ x: number; y: number; p: number; r?: number }> = ({ x, y, p, r = 22 }) =>
  p <= 0 || p >= 1 ? null : (
    <>
      <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, background: "rgba(31,42,68,0.3)", opacity: 1 - p, transform: `scale(${0.6 + 0.4 * p})` }} />
      <div style={{ position: "absolute", left: x - r * 2, top: y - r * 2, width: r * 4, height: r * 4, borderRadius: r * 2, border: `${r / 6}px solid ${C.orange}`, opacity: 1 - p, transform: `scale(${0.4 + 0.8 * p})` }} />
    </>
  );

/** Nomor fiktif (digit akhir disamarkan). */
export const SPAM = ["021 5091 ••81", "021 5091 ••27", "021 5094 ••63", "021 5093 ••05"];
