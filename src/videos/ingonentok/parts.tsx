import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { exitAt } from "../../components/motion";
import { theme } from "../../components/theme";

// Dasar PUTIH (seragam antar video) + aksen dari logo ingonentok (assets/css/style.css).
export const E = {
  white: "#FFFFFF",
  soft: "#F6FAF2",
  hijauTua: "#1E5B2F",
  hijau: "#2F7D3F",
  daun: "#7CB342",
  muda: "#E8F3DB",
  kuning: "#F7C948",
  oranye: "#E8871E",
  text: "#23301F",
  muted: "#556350",
  border: "#E3EBDA",
  wa: "#25D366",
  waBg: "#EFE7DD",
  waOut: "#DCF8C6",
  shadow: "rgba(30, 91, 47, 0.14)",
} as const;

export const font: React.CSSProperties = { fontFamily: theme.fonts.heading };
export const img = (f: string) => staticFile(`aset/ingonentok/${f}`);

/** Latar putih dengan dua bulatan hijau sangat muda. */
export const Backdrop: React.FC = () => (
  <AbsoluteFill style={{ background: E.white, overflow: "hidden" }}>
    <div style={{ position: "absolute", right: -320, top: -280, width: 820, height: 820, borderRadius: 410, background: E.muda, opacity: 0.7 }} />
    <div style={{ position: "absolute", left: -380, bottom: -360, width: 920, height: 920, borderRadius: 460, background: E.soft }} />
  </AbsoluteFill>
);

/** Screenshot asli 1170×2532 (390×844 CSS @3×). */
export const SHOT = { w: 1170, h: 2532 };

/** Bingkai HP berisi screenshot bertumpuk. Titik tengah (x, y). */
export const Phone: React.FC<{
  x?: number;
  y?: number;
  width?: number;
  shots?: { src: string; o: number; dy?: number }[];
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ x = 540, y = 1130, width = 520, shots = [], style, children }) => {
  const h = (width * SHOT.h) / SHOT.w;
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
        background: E.hijauTua,
        boxShadow: `0 40px 90px ${E.shadow}`,
        ...style,
      }}
    >
      <div style={{ position: "absolute", left: bez, top: bez, width, height: h, borderRadius: 52, overflow: "hidden", background: "white" }}>
        {shots.map((s) =>
          s.o > 0 ? <Img key={s.src} src={img(s.src)} style={{ position: "absolute", left: 0, top: s.dy ?? 0, width, height: h, opacity: s.o }} /> : null,
        )}
        {children}
      </div>
    </div>
  );
};

/** Kotak sorot dalam koordinat CSS layar (390 lebar). */
export type Box = { x: number; y: number; w: number; h: number };
export const HiBox: React.FC<{ b: Box; p: number; width?: number; color?: string; dim?: boolean }> = ({ b, p, width = 520, color = E.oranye, dim = true }) => {
  const k = width / 390;
  return p <= 0 ? null : (
    <div
      style={{
        position: "absolute",
        left: (b.x - b.w / 2) * k,
        top: (b.y - b.h / 2) * k,
        width: b.w * k,
        height: b.h * k,
        borderRadius: 16,
        border: `5px solid ${color}`,
        boxShadow: dim ? `0 0 0 9999px rgba(30,48,31,${0.32 * p})` : undefined,
        opacity: p,
        transform: `scale(${1.08 - 0.08 * p})`,
      }}
    />
  );
};
export const at = (b: { x: number; y: number }, width = 520) => ({ x: (b.x * width) / 390, y: (b.y * width) / 390 });

export const TitleArea: React.FC<{ dur: number; top?: number; children: React.ReactNode }> = ({ dur, top = 200, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 90, top, width: 900, display: "flex", flexDirection: "column", gap: 12, opacity: exitAt(frame, fps, dur) }}>
      {children}
    </div>
  );
};

export const Chip: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; tone?: "hijau" | "kuning" | "light" | "wa" | "oranye" }> = ({ children, style, tone = "hijau" }) => {
  const c = { hijau: [E.hijauTua, "white"], kuning: [E.kuning, E.hijauTua], light: ["white", E.text], wa: [E.wa, "white"], oranye: [E.oranye, "white"] }[tone];
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
        boxShadow: `0 16px 40px ${E.shadow}`,
        whiteSpace: "nowrap",
        border: tone === "light" ? `2px solid ${E.border}` : undefined,
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

export const TapRipple: React.FC<{ x: number; y: number; p: number; r?: number }> = ({ x, y, p, r = 30 }) =>
  p <= 0 || p >= 1 ? null : (
    <>
      <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, background: "rgba(30,48,31,0.3)", opacity: 1 - p, transform: `scale(${0.6 + 0.4 * p})` }} />
      <div style={{ position: "absolute", left: x - r * 2, top: y - r * 2, width: r * 4, height: r * 4, borderRadius: r * 2, border: `${r / 5}px solid ${E.oranye}`, opacity: 1 - p, transform: `scale(${0.4 + 0.8 * p})` }} />
    </>
  );

/** Gelembung chat WhatsApp generik (tanpa logo). */
export const WaChat: React.FC<{ lines: string[]; p: number; title?: string }> = ({ lines, p, title = "ingonentok" }) => (
  <div style={{ position: "absolute", inset: 0, background: E.waBg, opacity: p }}>
    <div style={{ height: 120, background: "#1F6F5C", display: "flex", alignItems: "flex-end", padding: "0 26px 18px", gap: 16 }}>
      <Img src={img("logo.png")} style={{ width: 52, height: 52, borderRadius: 26, background: "white" }} />
      <div style={{ ...font, fontWeight: 700, fontSize: 30, color: "white" }}>{title}</div>
    </div>
    <div
      style={{
        position: "absolute",
        left: 40,
        right: 20,
        top: 160,
        background: E.waOut,
        borderRadius: 20,
        borderTopRightRadius: 4,
        padding: "18px 22px",
        ...font,
        fontWeight: 500,
        fontSize: 25,
        lineHeight: 1.4,
        color: E.text,
        boxShadow: "0 2px 4px rgba(0,0,0,0.12)",
        transform: `translateY(${(1 - p) * 40}px)`,
        whiteSpace: "pre-wrap",
      }}
    >
      {lines.join("\n")}
      <div style={{ textAlign: "right", fontSize: 18, color: E.muted }}>10.12 ✓✓</div>
    </div>
  </div>
);
