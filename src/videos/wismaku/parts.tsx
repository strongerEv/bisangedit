import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { exitAt } from "../../components/motion";
import { theme } from "../../components/theme";

// Palet video: malam di kos — biru tua + kuning lampu + coral. Sengaja TIDAK hijau
// (screenshot aplikasinya sendiri bertema hijau tua, jadi bingkainya dibuat kontras).
export const N = {
  night: "#121A33",
  night2: "#1B2647",
  night3: "#26335C",
  wall: "#1E2A4F",
  amber: "#FFC24B",
  amberSoft: "rgba(255,194,75,0.18)",
  coral: "#FF7A59",
  cream: "#FFF4E0",
  text: "#FFF8EC",
  muted: "#A9B3D6",
  wa: "#25D366",
  shadow: "rgba(0, 0, 0, 0.45)",
} as const;

export const font: React.CSSProperties = { fontFamily: theme.fonts.heading };

export const mono: React.CSSProperties = {
  fontFamily: theme.fonts.mono,
  fontWeight: 500,
  fontSize: 26,
  letterSpacing: "0.08em",
  color: N.muted,
};

/** Latar malam dengan cahaya lampu kuning lembut. */
export const Backdrop: React.FC = () => (
  <AbsoluteFill style={{ background: `linear-gradient(180deg, ${N.night} 0%, ${N.night2} 100%)`, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: -300, top: -300, width: 900, height: 900, borderRadius: 450, background: `radial-gradient(circle, ${N.amberSoft} 0%, rgba(255,194,75,0) 70%)` }} />
    <div style={{ position: "absolute", right: -360, bottom: -300, width: 1000, height: 1000, borderRadius: 500, background: "radial-gradient(circle, rgba(255,122,89,0.14) 0%, rgba(255,122,89,0) 70%)" }} />
  </AbsoluteFill>
);

export const img = (f: string) => staticFile(`aset/wismaku/${f}`);

/** Screenshot asli 390 px lebar (1×). Tinggi tiap berkas berbeda (halaman panjang bisa digulir). */
export const SHOT_W = 390;
export const SHOT_VIEW_H = 844;

/** Bingkai HP. `shots`: screenshot bertumpuk; `h` = tinggi asli berkas, `y` = gulir (px screenshot). */
export const Phone: React.FC<{
  x?: number;
  y?: number;
  width?: number;
  shots?: { src: string; o: number; h?: number; y?: number }[];
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ x = 540, y = 1130, width = 520, shots = [], style, children }) => {
  const k = width / SHOT_W;
  const h = SHOT_VIEW_H * k;
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
        background: "#0B1022",
        border: `3px solid ${N.night3}`,
        boxShadow: `0 40px 90px ${N.shadow}`,
        ...style,
      }}
    >
      <div style={{ position: "absolute", left: bez, top: bez, width, height: h, borderRadius: 52, overflow: "hidden", background: "#04201d" }}>
        {shots.map((s) =>
          s.o > 0 ? (
            <Img key={s.src} src={img(s.src)} style={{ position: "absolute", left: 0, top: -(s.y ?? 0) * k, width, height: (s.h ?? SHOT_VIEW_H) * k, opacity: s.o }} />
          ) : null,
        )}
        {children}
      </div>
    </div>
  );
};

/** Kotak sorot (koordinat px screenshot, 390 lebar). */
export type Box = { x: number; y: number; w: number; h: number };
export const HiBox: React.FC<{ b: Box; p: number; width?: number; color?: string; dim?: boolean; scrollY?: number }> = ({ b, p, width = 520, color = N.amber, dim = true, scrollY = 0 }) => {
  const k = width / SHOT_W;
  return p <= 0 ? null : (
    <div
      style={{
        position: "absolute",
        left: (b.x - b.w / 2) * k,
        top: (b.y - scrollY - b.h / 2) * k,
        width: b.w * k,
        height: b.h * k,
        borderRadius: 14,
        border: `5px solid ${color}`,
        boxShadow: dim ? `0 0 0 9999px rgba(10,14,30,${0.45 * p})` : undefined,
        opacity: p,
        transform: `scale(${1.08 - 0.08 * p})`,
      }}
    />
  );
};
export const at = (b: { x: number; y: number }, width = 520, scrollY = 0) => ({ x: (b.x * width) / SHOT_W, y: ((b.y - scrollY) * width) / SHOT_W });

export const TitleArea: React.FC<{ dur: number; top?: number; children: React.ReactNode }> = ({ dur, top = 200, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 90, top, width: 900, display: "flex", flexDirection: "column", gap: 12, opacity: exitAt(frame, fps, dur) }}>
      {children}
    </div>
  );
};

export const Chip: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; tone?: "amber" | "coral" | "light" | "night" | "wa" }> = ({ children, style, tone = "amber" }) => {
  const c = { amber: [N.amber, N.night], coral: [N.coral, "white"], light: [N.cream, N.night], night: [N.night3, N.text], wa: [N.wa, "white"] }[tone];
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
        boxShadow: `0 16px 40px ${N.shadow}`,
        whiteSpace: "nowrap",
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
      <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, background: "rgba(255,244,224,0.45)", opacity: 1 - p, transform: `scale(${0.6 + 0.4 * p})` }} />
      <div style={{ position: "absolute", left: x - r * 2, top: y - r * 2, width: r * 4, height: r * 4, borderRadius: r * 2, border: `${r / 5}px solid ${N.amber}`, opacity: 1 - p, transform: `scale(${0.4 + 0.8 * p})` }} />
    </>
  );
