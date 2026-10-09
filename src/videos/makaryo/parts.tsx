import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { exitAt } from "../../components/motion";
import { theme } from "../../components/theme";

// Token warna dari design system Makaryo (docs/03-design-system.md).
export const K = {
  bg: "#F2F4FB",
  surface: "#FFFFFF",
  surfaceMuted: "#F7F8FD",
  border: "#E7E9F5",
  text: "#1E2145",
  muted: "#7C7F9E",
  primary: "#5B4CE0",
  primarySoft: "#EDEBFD",
  coral: "#F4685E",
  amber: "#F5B23D",
  emerald: "#35BF74",
  sky: "#3FA9F5",
  excel: "#1D6F42",
  shadow: "rgba(30, 33, 69, 0.10)",
  shadowFloat: "rgba(91, 76, 224, 0.28)",
} as const;

export type Tone = "primary" | "coral" | "amber" | "emerald" | "sky";

export const font: React.CSSProperties = { fontFamily: theme.fonts.heading };

export const mono: React.CSSProperties = {
  fontFamily: theme.fonts.mono,
  fontWeight: 500,
  fontSize: 26,
  letterSpacing: "0.08em",
  color: K.muted,
};

/** Latar terang kebiruan dengan dua bulatan lembut. */
export const Backdrop: React.FC = () => (
  <AbsoluteFill style={{ background: K.bg }}>
    <div style={{ position: "absolute", left: -260, top: -200, width: 760, height: 760, borderRadius: 380, background: K.primarySoft, opacity: 0.8 }} />
    <div style={{ position: "absolute", right: -300, bottom: -260, width: 820, height: 820, borderRadius: 410, background: "#E4F2FD", opacity: 0.8 }} />
  </AbsoluteFill>
);

// ---------- Ikon garis (gaya lucide, digambar ulang) ----------

const circle = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const rect = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 ${-r} ${r}h${-(w - 2 * r)}a${r} ${r} 0 0 1 ${-r} ${-r}v${-(h - 2 * r)}a${r} ${r} 0 0 1 ${r} ${-r}z`;

const ICONS = {
  scan: "M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01",
  calendar: `${rect(3, 4, 18, 18, 2)}M16 2v4M8 2v4M3 10h18`,
  wallet: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",
  clipboard: `${rect(8, 2, 8, 4, 1)}M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M12 11h4M12 16h4M8 11h.01M8 16h.01`,
  clock: `${circle(12, 12, 10)}M12 6v6l4 2`,
  home: "M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  check: "M20 6 9 17l-5-5",
  pin: `M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z${circle(12, 10, 3)}`,
  camera: `M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z${circle(12, 13, 3)}`,
  login: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3",
  user: `${circle(12, 8, 4)}M4 21a8 8 0 0 1 16 0`,
  send: "M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z",
  sparkles: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",
  x: "M18 6 6 18M6 6l12 12",
} as const;

export type IconName = keyof typeof ICONS;

export const Icon: React.FC<{ name: IconName; size?: number; color?: string; stroke?: number; style?: React.CSSProperties }> = ({
  name,
  size = 20,
  color = "currentColor",
  stroke = 2,
  style,
}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d={ICONS[name]} />
  </svg>
);

// ---------- HP ----------

export const SCREEN = { w: 390, h: 844 };

/**
 * Bingkai HP. Isi layar (children) digambar dalam koordinat CSS 390×844, lalu diskalakan.
 * Posisi = titik tengah (x, y) di kanvas 1080×1920.
 */
export const Phone: React.FC<{ x?: number; y?: number; width?: number; style?: React.CSSProperties; bg?: string; children?: React.ReactNode }> = ({
  x = 540,
  y = 1080,
  width = 500,
  style,
  bg = K.bg,
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
        borderRadius: 66,
        background: K.text,
        boxShadow: `0 40px 90px ${K.shadow}`,
        ...style,
      }}
    >
      <div style={{ position: "absolute", left: bez, top: bez, width, height: h, borderRadius: 52, overflow: "hidden", background: bg }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: SCREEN.w, height: SCREEN.h, transform: `scale(${k})`, transformOrigin: "0 0", ...font, color: K.text }}>
          {children}
        </div>
      </div>
    </div>
  );
};

/** Ubah koordinat CSS layar (390×844) ke px kanvas, untuk Phone di (x, y) selebar width. */
export const screenToCanvas = (cx: number, cy: number, x = 540, y = 1080, width = 500) => {
  const k = width / SCREEN.w;
  return { x: x - width / 2 + cx * k, y: y - (SCREEN.h * k) / 2 + cy * k };
};

// ---------- Komponen UI Makaryo (ukuran CSS) ----------

const TONE_BG: Record<Tone, string> = { primary: K.primary, coral: K.coral, amber: K.amber, emerald: K.emerald, sky: K.sky };

export const Badge: React.FC<{ tone: "success" | "warning" | "danger" | "primary" | "neutral"; children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({
  tone,
  children,
  size = 11,
  style,
}) => {
  const map = {
    success: ["#E3F6EC", "#1F8A52"],
    warning: ["#FDF1DA", "#9A6510"],
    danger: ["#FDE6E4", "#C8443B"],
    primary: [K.primarySoft, K.primary],
    neutral: [K.surfaceMuted, K.muted],
  } as const;
  const [bg, fg] = map[tone];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: bg, color: fg, borderRadius: 999, padding: `${size * 0.3}px ${size * 0.8}px`, fontSize: size, fontWeight: 700, whiteSpace: "nowrap", ...style }}>
      {children}
    </span>
  );
};

export const Card: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({ style, children }) => (
  <div style={{ background: K.surface, borderRadius: 24, border: `1px solid ${K.border}`, boxShadow: `0 8px 24px rgba(30,33,69,.06)`, padding: 16, ...font, ...style }}>{children}</div>
);

export const ModuleCard: React.FC<{ title: string; desc: string; icon: IconName; tone: Tone; style?: React.CSSProperties }> = ({ title, desc, icon, tone, style }) => {
  const dark = tone === "amber";
  return (
    <div style={{ background: TONE_BG[tone], color: dark ? K.text : "white", borderRadius: 24, padding: 16, height: 124, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", ...style }}>
      <span style={{ width: 40, height: 40, borderRadius: 20, background: dark ? "rgba(30,33,69,.1)" : "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={icon} size={20} />
      </span>
      <span>
        <span style={{ display: "block", fontSize: 15, fontWeight: 700 }}>{title}</span>
        <span style={{ display: "block", fontSize: 12, opacity: 0.8, marginTop: 2 }}>{desc}</span>
      </span>
    </div>
  );
};

export const StatCard: React.FC<{ label: string; value: string; icon: IconName; tone: Tone; style?: React.CSSProperties }> = ({ label, value, icon, tone, style }) => (
  <Card style={{ padding: 14, ...style }}>
    <span style={{ width: 32, height: 32, borderRadius: 16, background: `${TONE_BG[tone]}22`, color: TONE_BG[tone], display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon name={icon} size={17} />
    </span>
    <div style={{ fontSize: 11, fontWeight: 600, color: K.muted, marginTop: 8 }}>{label}</div>
    <div style={{ fontSize: 20, fontWeight: 800, marginTop: 2, fontVariantNumeric: "tabular-nums" }}>{value}</div>
  </Card>
);

export const BottomNav: React.FC<{ active?: number }> = ({ active = 0 }) => {
  const items: IconName[] = ["home", "scan", "calendar", "wallet", "user"];
  return (
    <div style={{ position: "absolute", left: 16, right: 16, bottom: 18, height: 60, borderRadius: 30, background: K.primary, boxShadow: `0 12px 32px ${K.shadowFloat}`, display: "flex", alignItems: "center", padding: "0 10px", gap: 4 }}>
      {items.map((n, i) => (
        <div key={n} style={{ flex: 1, height: 44, borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center", background: i === active ? "white" : "transparent", color: i === active ? K.primary : "rgba(255,255,255,.75)" }}>
          <Icon name={n} size={20} />
        </div>
      ))}
    </div>
  );
};

/** Logo Makaryo: kotak ungu berhuruf M + tulisan. `s` = skala (1 = ukuran asli CSS). */
export const Brand: React.FC<{ s?: number; light?: boolean; style?: React.CSSProperties }> = ({ s = 1, light, style }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 10 * s, ...font, ...style }}>
    <span style={{ width: 44 * s, height: 44 * s, borderRadius: 16 * s, background: light ? "white" : K.primary, color: light ? K.primary : "white", fontWeight: 900, fontSize: 18 * s, display: "flex", alignItems: "center", justifyContent: "center" }}>M</span>
    <span style={{ fontWeight: 800, fontSize: 21 * s, letterSpacing: "-0.02em", color: light ? "white" : K.text }}>Makaryo</span>
  </div>
);

// ---------- Elemen video ----------

/** Area judul; keluar sendiri di akhir adegan. */
export const TitleArea: React.FC<{ dur: number; top?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ dur, top = 210, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 96, top, width: 888, display: "flex", flexDirection: "column", gap: 12, opacity: exitAt(frame, fps, dur), ...style }}>
      {children}
    </div>
  );
};

/** Chip label (ukuran kanvas). */
export const Chip: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; tone?: "dark" | "light" | "primary" | "success" }> = ({ children, style, tone = "light" }) => {
  const c = {
    dark: [K.text, "white"],
    light: ["white", K.text],
    primary: [K.primary, "white"],
    success: [K.emerald, "white"],
  }[tone];
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
        fontSize: 38,
        boxShadow: `0 16px 40px ${K.shadow}`,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Riak tap jari (koordinat bebas, ukuran CSS layar bila dipakai di dalam Phone). p = 0→1. */
export const TapRipple: React.FC<{ x: number; y: number; p: number; r?: number }> = ({ x, y, p, r = 24 }) =>
  p <= 0 || p >= 1 ? null : (
    <>
      <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, background: "rgba(30,33,69,0.3)", opacity: 1 - p, transform: `scale(${0.6 + 0.4 * p})` }} />
      <div style={{ position: "absolute", left: x - r * 2, top: y - r * 2, width: r * 4, height: r * 4, borderRadius: r * 2, border: `${r / 6}px solid ${K.primary}`, opacity: 1 - p, transform: `scale(${0.4 + 0.8 * p})` }} />
    </>
  );
