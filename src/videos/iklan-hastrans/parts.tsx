import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { exitAt } from "../../components/motion";
import { theme } from "../../components/theme";

// Dasar PUTIH (seragam antar video) + aksen dari HasTrans (tailwind.config.ts: brand-*, kuning lampu ELF).
export const H = {
  white: "#FFFFFF",
  b50: "#EEF5FF",
  b100: "#D9E8FF",
  b200: "#BCD7FF",
  b400: "#5999FF",
  b500: "#2F74FB",
  b600: "#0064E7",
  b700: "#0050C0",
  b800: "#06449B",
  b950: "#0A264D",
  kuning: "#FFD34D",
  amber: "#F59E0B",
  red: "#E5484D",
  text: "#0F172A",
  muted: "#64748B",
  slate50: "#F8FAFC",
  slate100: "#F1F5F9",
  slate200: "#E2E8F0",
  slate300: "#CBD5E1",
  slate700: "#334155",
  wa: "#25D366",
  waBg: "#EFE7DD",
  waOut: "#DCF8C6",
  shadow: "rgba(10, 38, 77, 0.16)",
} as const;

export const font: React.CSSProperties = { fontFamily: theme.fonts.heading };
export const img = (f: string) => staticFile(`aset/iklan-hastrans/${f}`);

/** Latar putih dengan dua bulatan biru sangat muda. */
export const Backdrop: React.FC = () => (
  <AbsoluteFill style={{ background: H.white, overflow: "hidden" }}>
    <div style={{ position: "absolute", right: -320, top: -280, width: 820, height: 820, borderRadius: 410, background: H.b50 }} />
    <div style={{ position: "absolute", left: -380, bottom: -360, width: 920, height: 920, borderRadius: 460, background: H.b50, opacity: 0.7 }} />
  </AbsoluteFill>
);

/** HP berisi layar yang digambar ulang (koordinat CSS 390×844). Titik tengah (x, y). */
export const Phone: React.FC<{ x?: number; y?: number; width?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({
  x = 540,
  y = 1070,
  width = 460,
  style,
  children,
}) => {
  const k = width / 390;
  const h = 844 * k;
  const bez = 16;
  return (
    <div
      style={{
        position: "absolute",
        left: x - width / 2 - bez,
        top: y - h / 2 - bez,
        width: width + bez * 2,
        height: h + bez * 2,
        borderRadius: 64,
        background: H.b950,
        boxShadow: `0 40px 90px ${H.shadow}`,
        ...style,
      }}
    >
      <div style={{ position: "absolute", left: bez, top: bez, width, height: h, borderRadius: 50, overflow: "hidden", background: H.slate50 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 390, height: 844, transform: `scale(${k})`, transformOrigin: "0 0", ...font, color: H.text }}>{children}</div>
      </div>
    </div>
  );
};

/** Pita biru HasTrans (gradasi + lingkaran dekoratif) dengan logo putih. */
export const BlueBand: React.FC<{ height: number; children?: React.ReactNode }> = ({ height, children }) => (
  <div style={{ position: "relative", height, overflow: "hidden", background: `linear-gradient(135deg, ${H.b600} 0%, ${H.b600} 45%, ${H.b800} 100%)`, color: "white" }}>
    <div style={{ position: "absolute", right: -90, top: -150, width: 420, height: 420, borderRadius: 210, background: "rgba(255,255,255,0.1)" }} />
    <div style={{ position: "absolute", left: -120, top: 90, width: 300, height: 300, borderRadius: 150, background: "rgba(89,153,255,0.2)" }} />
    <div style={{ position: "absolute", left: 18, top: 40, display: "flex", alignItems: "center", justifyContent: "space-between", width: 354 }}>
      <Img src={img("logo-white.png")} style={{ height: 40 }} />
      <div style={{ borderRadius: 999, background: "rgba(255,255,255,0.15)", padding: "7px 12px", fontSize: 13, fontWeight: 600 }}>🎫 Pesanan</div>
    </div>
    <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0 }}>{children}</div>
  </div>
);

/** Ilustrasi ELF tampak samping (sama dengan ElfIllustration di repo HasTrans). */
export const Elf: React.FC<{ width: number; style?: React.CSSProperties; wheel?: number }> = ({ width, style, wheel = 0 }) => (
  <svg viewBox="0 0 320 150" width={width} height={(width * 150) / 320} style={style}>
    <ellipse cx="160" cy="136" rx="140" ry="8" fill="#000" opacity=".15" />
    <path d="M24 112V44c0-11 9-20 20-20h196c12 0 22 6 28 16l26 42c3 5 4 10 4 15v15c0 6-4 10-10 10H34c-6 0-10-4-10-10Z" fill="#fff" stroke={H.slate200} strokeWidth="2" />
    <path d="M24 92h274v20c0 6-4 10-10 10H34c-6 0-10-4-10-10Z" fill={H.b600} />
    <path d="M24 86h274v6H24z" fill={H.b400} />
    <rect x="36" y="36" width="44" height="34" rx="6" fill={H.b950} />
    <rect x="86" y="36" width="44" height="34" rx="6" fill={H.b950} />
    <rect x="136" y="36" width="44" height="34" rx="6" fill={H.b950} />
    <rect x="186" y="36" width="36" height="50" rx="5" fill={H.b950} />
    <path d="M230 36h12c6 0 11 3 14 8l20 34c1 3 0 8-5 8h-41Z" fill={H.b950} />
    <rect x="182" y="34" width="44" height="78" rx="6" fill="none" stroke={H.b200} strokeWidth="2" />
    <rect x="286" y="96" width="10" height="6" rx="2" fill={H.kuning} />
    <text x="40" y="108" fill="#fff" fontSize="12" fontWeight="700" fontFamily="sans-serif">
      HasTrans
    </text>
    {[70, 248].map((cx) => (
      <g key={cx} transform={`rotate(${wheel} ${cx} 122)`}>
        <circle cx={cx} cy="122" r="17" fill="#1e293b" />
        <circle cx={cx} cy="122" r="7" fill={H.slate300} />
        <rect x={cx - 1.5} y="111" width="3" height="6" fill={H.slate300} />
      </g>
    ))}
  </svg>
);

/** Denah ELF 19 kursi (lib/seats.ts). Sopir kanan depan, pintu kiri. */
export const ELF_LAYOUT: (number | "driver" | "door" | null)[][] = [
  [2, 1, null, "driver"],
  ["door", 5, 4, 3],
  [9, 8, 7, 6],
  ["door", 12, 11, 10],
  [null, 15, 14, 13],
  [19, 18, 17, 16],
];

/** Ukuran denah dalam px induk: lebar `w`, sel persegi. Mengembalikan pusat kursi n. */
export const seatGeom = (w: number) => {
  const pad = w * 0.075;
  const gap = w * 0.035;
  const cell = (w - pad * 2 - gap * 3) / 4;
  const top = pad + cell * 0.35;
  const rowY = (r: number) => top + r * (cell + gap) + (r >= 1 ? gap * 1.6 : 0);
  const center = (n: number) => {
    for (let r = 0; r < ELF_LAYOUT.length; r++) {
      const c = ELF_LAYOUT[r].indexOf(n);
      if (c >= 0) return { x: pad + c * (cell + gap) + cell / 2, y: rowY(r) + cell / 2 };
    }
    return { x: 0, y: 0 };
  };
  const height = rowY(ELF_LAYOUT.length - 1) + cell + pad;
  return { pad, gap, cell, rowY, center, height };
};

export type SeatState = "free" | "selected" | "taken" | "locked";

/** Denah kursi; `state(n)` menentukan tampilan; `pop(n)` 0→1 untuk animasi pilih. */
export const SeatMap: React.FC<{
  w: number;
  state: (n: number) => SeatState;
  pop?: (n: number) => number;
  shake?: (n: number) => number;
  style?: React.CSSProperties;
}> = ({ w, state, pop = () => 0, shake = () => 0, style }) => {
  const g = seatGeom(w);
  return (
    <div style={{ position: "relative", width: w, height: g.height, borderRadius: w * 0.14, border: `${w * 0.014}px solid ${H.slate300}`, background: H.slate50, boxSizing: "border-box", ...font, ...style }}>
      <div style={{ position: "absolute", left: "50%", top: 0, transform: "translate(-50%, -50%)", borderRadius: 999, background: H.slate300, padding: `${w * 0.006}px ${w * 0.03}px`, fontSize: w * 0.034, fontWeight: 700, color: H.slate700, letterSpacing: "0.1em" }}>
        DEPAN
      </div>
      <div style={{ position: "absolute", left: g.pad, right: g.pad, top: g.rowY(1) - g.gap * 1.3, height: w * 0.012, borderRadius: 9, background: H.slate200 }} />
      {ELF_LAYOUT.map((row, r) =>
        row.map((cell, c) => {
          const left = g.pad + c * (g.cell + g.gap);
          const top = g.rowY(r);
          if (cell === null) return null;
          if (cell === "door")
            return <div key={`${r}-${c}`} style={{ position: "absolute", left: left - g.pad * 0.55, top: top + g.cell * 0.1, width: w * 0.016, height: g.cell * 0.8, borderRadius: 9, background: "#FBBF24" }} />;
          if (cell === "driver")
            return (
              <div key={`${r}-${c}`} style={{ position: "absolute", left, top, width: g.cell, height: g.cell, borderRadius: g.cell * 0.22, background: H.slate700, color: H.slate200, fontSize: g.cell * 0.18, fontWeight: 600, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
                <svg width={g.cell * 0.4} height={g.cell * 0.4} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M12 14v7M10 12H3M14 12h7" />
                </svg>
                Sopir
              </div>
            );
          const s = state(cell);
          const p = pop(cell);
          const look = {
            free: { bg: "white", bd: H.b200, fg: H.b700 },
            selected: { bg: H.b600, bd: H.b600, fg: "white" },
            locked: { bg: H.b600, bd: H.b600, fg: "white" },
            taken: { bg: H.slate300, bd: H.slate300, fg: H.muted },
          }[s];
          return (
            <div
              key={`${r}-${c}`}
              style={{
                position: "absolute",
                left,
                top,
                width: g.cell,
                height: g.cell,
                boxSizing: "border-box",
                borderRadius: g.cell * 0.22,
                border: `${w * 0.009}px solid ${look.bd}`,
                background: look.bg,
                color: look.fg,
                fontSize: g.cell * 0.36,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${1 + 0.18 * Math.sin(Math.PI * Math.min(1, Math.max(0, p)))}) translateX(${shake(cell)}px)`,
                boxShadow: s === "selected" || s === "locked" ? `0 ${w * 0.012}px ${w * 0.03}px rgba(0,100,231,0.35)` : undefined,
              }}
            >
              {s === "taken" ? "✕" : cell}
              {s === "locked" ? (
                <div style={{ position: "absolute", right: -g.cell * 0.14, top: -g.cell * 0.14, width: g.cell * 0.46, height: g.cell * 0.46, borderRadius: g.cell, background: H.kuning, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}>
                  <Lock size={g.cell * 0.26} color={H.b950} />
                </div>
              ) : null}
            </div>
          );
        }),
      )}
    </div>
  );
};

export const Lock: React.FC<{ size: number; color: string; open?: number }> = ({ size, color, open = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round">
    <rect x="4.5" y="10.5" width="15" height="11" rx="2.5" fill={color} />
    <path d={`M8 10.5V7a4 4 0 0 1 8 0${open > 0.5 ? "" : "v3.5"}`} transform={`translate(0 ${-open * 2})`} />
  </svg>
);

export const TitleArea: React.FC<{ dur: number; top?: number; children: React.ReactNode }> = ({ dur, top = 210, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 90, top, width: 900, display: "flex", flexDirection: "column", gap: 12, opacity: exitAt(frame, fps, dur) }}>
      {children}
    </div>
  );
};

export const Chip: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; tone?: "biru" | "kuning" | "light" | "navy" | "wa" | "red" }> = ({ children, style, tone = "biru" }) => {
  const c = { biru: [H.b600, "white"], kuning: [H.kuning, H.b950], light: ["white", H.text], navy: [H.b950, "white"], wa: [H.wa, "white"], red: [H.red, "white"] }[tone];
  return (
    <div
      style={{
        position: "relative",
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
        boxShadow: `0 16px 40px ${H.shadow}`,
        whiteSpace: "nowrap",
        border: tone === "light" ? `2px solid ${H.slate200}` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Center: React.FC<{ top: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ top, style, children }) => (
  <div style={{ position: "absolute", left: 0, width: 1080, top, display: "flex", justifyContent: "center", gap: 20, ...style }}>{children}</div>
);

/** Riak tap (koordinat induk). */
export const TapRipple: React.FC<{ x: number; y: number; p: number; r?: number }> = ({ x, y, p, r = 20 }) =>
  p <= 0 || p >= 1 ? null : (
    <>
      <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, background: "rgba(10,38,77,0.3)", opacity: 1 - p, transform: `scale(${0.6 + 0.4 * p})` }} />
      <div style={{ position: "absolute", left: x - r * 2, top: y - r * 2, width: r * 4, height: r * 4, borderRadius: r * 2, border: `${r / 5}px solid ${H.kuning}`, opacity: 1 - p, transform: `scale(${0.4 + 0.8 * p})` }} />
    </>
  );

export const rupiah = (n: number) => "Rp" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
