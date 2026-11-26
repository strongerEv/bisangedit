import React, { useEffect, useState } from "react";
import { continueRender, delayRender, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

// Komponen gaya "Studi Kasus" — papan bukti (lihat .claude/skills/video-studio/STYLE-STUDI-KASUS.md).
// Semua posisi dalam koordinat "dunia papan"; kamera (useCam) menggeser/zoom seluruh papan.

export const PB = {
  cork: "#E9DCC3",
  corkDot: "rgba(120, 90, 50, 0.10)",
  wood: "#B88A5A",
  paper: "#F4E9CF",
  ink: "#23201B",
  red: "#D93A3F",
  yellow: "#F5C400",
  black: "#15171C",
} as const;

export const HAND = "'Caveat PB', 'Inter Tight', cursive";

/** Muat font tulisan tangan (Caveat, OFL) dari public/fonts. */
export const useHandFont = () => {
  const [handle] = useState(() => delayRender("font Caveat"));
  useEffect(() => {
    const f = new FontFace("Caveat PB", `url(${staticFile("fonts/caveat-700.woff2")})`, { weight: "700" });
    f.load()
      .then((ff) => {
        (document.fonts as unknown as { add: (x: FontFace) => void }).add(ff);
        continueRender(handle);
      })
      .catch(() => continueRender(handle));
  }, [handle]);
};

export type CamKey = { t: number; cx: number; cy: number; s: number };

/** Posisi kamera saat ini: tahan di tiap kunci, transisi halus 0,7 dtk ke kunci berikutnya. */
export const camAt = (keys: CamKey[], t: number, dur = 0.7) => {
  let i = 0;
  for (let k = 0; k < keys.length; k++) if (t >= keys[k].t) i = k;
  const cur = keys[i];
  const prev = keys[Math.max(0, i - 1)];
  const p = interpolate(t, [cur.t, cur.t + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  // interpolasi skala secara logaritmik supaya zoom terasa rata
  const s = Math.exp(Math.log(prev.s) + (Math.log(cur.s) - Math.log(prev.s)) * p);
  return { cx: prev.cx + (cur.cx - prev.cx) * p, cy: prev.cy + (cur.cy - prev.cy) * p, s };
};

/** Jendela tampilan papan + kamera. */
export const BoardView: React.FC<{ keys: CamKey[]; x: number; y: number; w: number; h: number; worldW: number; worldH: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ keys, x, y, w, h, worldW, worldH, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = camAt(keys, frame / fps);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, overflow: "hidden", borderRadius: 30, ...style }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: worldW, height: worldH, transformOrigin: "0 0", transform: `translate(${w / 2 - c.cx * c.s}px, ${h / 2 - c.cy * c.s}px) scale(${c.s})` }}>
        {children}
      </div>
    </div>
  );
};

/** Papan gabus dengan bingkai kayu. */
export const Cork: React.FC<{ w: number; h: number }> = ({ w, h }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      width: w,
      height: h,
      borderRadius: 26,
      border: `18px solid ${PB.wood}`,
      boxSizing: "border-box",
      boxShadow: "0 30px 60px rgba(20,30,60,0.18), inset 0 0 40px rgba(90,60,30,0.18)",
      background: `radial-gradient(${PB.corkDot} 1.6px, transparent 1.8px) 0 0 / 14px 14px, radial-gradient(${PB.corkDot} 1.2px, transparent 1.4px) 7px 9px / 17px 17px, ${PB.cork}`,
    }}
  />
);

const useDrop = (at: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const p = spring({ frame: frame - Math.round(at * fps), fps, config: { damping: 11, mass: 0.6 } });
  return { t, p, show: t >= at - 0.02 };
};

/** Pin merah mengilap. */
export const Pin: React.FC<{ x: number; y: number; at?: number; color?: string }> = ({ x, y, at = 0, color = PB.red }) => {
  const { p, show } = useDrop(at);
  if (!show) return null;
  return (
    <div style={{ position: "absolute", left: x - 15, top: y - 15, width: 30, height: 30, borderRadius: 15, background: `radial-gradient(circle at 35% 30%, #FF9A9A 0%, ${color} 45%, #8E1F22 100%)`, boxShadow: "2px 5px 6px rgba(0,0,0,0.35)", transform: `scale(${1.6 - 0.6 * p})`, opacity: Math.min(1, p * 2), zIndex: 50 }} />
  );
};

/** Polaroid: foto dengan bingkai putih (bawah lebih tebal), miring, jatuh lalu menempel. */
export const Polaroid: React.FC<{ x: number; y: number; w: number; h: number; src: string; at: number; rot?: number; caption?: string; fit?: "cover" | "contain"; pos?: string; scrollAt?: number; scrollDur?: number; scrollFrom?: number; scrollTo?: number; children?: React.ReactNode }> = ({ x, y, w, h, src, at, rot = 0, caption, fit = "cover", pos = "50% 0%", scrollAt, scrollDur = 2, scrollFrom = 0, scrollTo = 100, children }) => {
  const { t, p, show } = useDrop(at);
  if (!show) return null;
  const scroll = scrollAt !== undefined ? interpolate(t, [scrollAt, scrollAt + scrollDur], [scrollFrom, scrollTo], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : null;
  const pad = 14;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w + pad * 2, height: h + pad + 58, background: "#FFFFFF", boxShadow: "4px 10px 18px rgba(0,0,0,0.28)", transform: `translateY(${(1 - p) * -70}px) rotate(${rot + (1 - p) * 10}deg) scale(${1.08 - 0.08 * p})`, opacity: Math.min(1, p * 1.6), transformOrigin: "50% 0%" }}>
      <div style={{ position: "absolute", left: pad, top: pad, width: w, height: h, overflow: "hidden", background: "#111" }}>
        <Img src={src} style={{ width: "100%", height: "100%", objectFit: fit, objectPosition: scroll !== null ? `50% ${scroll}%` : pos }} />
        {children}
      </div>
      {caption ? <div style={{ position: "absolute", left: 0, right: 0, bottom: 8, textAlign: "center", fontFamily: HAND, fontWeight: 700, fontSize: 34, color: PB.ink }}>{caption}</div> : null}
      <Pin x={(w + pad * 2) / 2} y={6} at={at + 0.12} />
    </div>
  );
};

/** Catatan kertas sobek dengan tulisan tangan. */
export const Note: React.FC<{ x: number; y: number; w: number; h?: number; at: number; rot?: number; size?: number; color?: string; children: React.ReactNode }> = ({ x, y, w, h, at, rot = 0, size = 40, color = PB.paper, children }) => {
  const { p, show } = useDrop(at);
  if (!show) return null;
  const jag = "polygon(0% 3%, 6% 0%, 14% 2%, 22% 0%, 31% 2.5%, 40% 0.5%, 50% 2%, 60% 0%, 70% 2.5%, 80% 0.5%, 90% 2%, 100% 0%, 99% 30%, 100% 62%, 99% 100%, 90% 97.5%, 80% 99.5%, 70% 97%, 60% 99.5%, 50% 97.5%, 40% 100%, 30% 97.5%, 20% 99.5%, 10% 97%, 0% 99.5%, 1% 60%)";
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, transform: `translateY(${(1 - p) * -50}px) rotate(${rot + (1 - p) * -8}deg)`, opacity: Math.min(1, p * 1.6), filter: "drop-shadow(3px 8px 8px rgba(0,0,0,0.25))" }}>
      <div style={{ clipPath: jag, background: color, padding: "26px 28px 24px", boxSizing: "border-box", height: h, fontFamily: HAND, fontWeight: 700, fontSize: size, lineHeight: 1.12, color: PB.ink, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>{children}</div>
      <Pin x={w / 2} y={8} at={at + 0.12} />
    </div>
  );
};

/** Label kuning ala tempelan (judul / strategi). */
export const Tape: React.FC<{ x: number; y: number; at: number; rot?: number; size?: number; children: React.ReactNode; color?: string; textColor?: string }> = ({ x, y, at, rot = -2, size = 60, children, color = PB.yellow, textColor = PB.black }) => {
  const { p, show } = useDrop(at);
  if (!show) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, background: color, color: textColor, padding: "14px 34px", fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: size, letterSpacing: "0.01em", lineHeight: 1.0, whiteSpace: "nowrap", boxShadow: "3px 8px 14px rgba(0,0,0,0.25)", border: `4px solid ${PB.black}`, transform: `rotate(${rot}deg) scale(${1.4 - 0.4 * p})`, opacity: Math.min(1, p * 2), transformOrigin: "0% 50%" }}>
      {children}
    </div>
  );
};

/** Pita garis kuning-hitam bertulisan. */
export const HazardTape: React.FC<{ x: number; y: number; w: number; rot?: number; text: string; drift?: number }> = ({ x, y, w, rot = 0, text, drift = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: 64, transform: `rotate(${rot}deg)`, background: PB.yellow, borderTop: `8px solid ${PB.black}`, borderBottom: `8px solid ${PB.black}`, overflow: "hidden", boxShadow: "0 8px 14px rgba(0,0,0,0.25)" }}>
    <div style={{ position: "absolute", left: -drift, top: 6, whiteSpace: "nowrap", fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 30, color: PB.black, letterSpacing: "0.08em" }}>{Array.from({ length: 30 }, () => text).join("  •  ")}</div>
  </div>
);

/** Benang merah antar-titik, memanjang mulai `at`. */
export const Thread: React.FC<{ pts: [number, number][]; at: number; dur?: number; w: number; h: number }> = ({ pts, at, dur = 0.6, w, h }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(frame / fps, [at, at + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (p <= 0) return null;
  const d = pts.map((q, i) => `${i ? "L" : "M"}${q[0]} ${q[1]}`).join(" ");
  return (
    <svg width={w} height={h} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", zIndex: 40, overflow: "visible" }}>
      <path d={d} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth={6} transform="translate(3 5)" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} />
      <path d={d} fill="none" stroke={PB.red} strokeWidth={5} strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} />
    </svg>
  );
};

/** Kaca pembesar (lensa + gagang). */
export const Magnifier: React.FC<{ x: number; y: number; r?: number; at: number; until?: number }> = ({ x, y, r = 90, at, until = 99 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t < at || t > until) return null;
  const p = spring({ frame: frame - Math.round(at * fps), fps, config: { damping: 13 } });
  const out = Math.min(1, Math.max(0, (until - t) / 0.25));
  return (
    <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, opacity: Math.min(p, out), transform: `translate(${(1 - p) * 220}px, ${(1 - p) * 120}px)`, zIndex: 60 }}>
      <div style={{ position: "absolute", left: r * 1.55, top: r * 1.55, width: r * 0.32, height: r * 1.3, background: "linear-gradient(90deg,#333,#111,#333)", borderRadius: r * 0.12, transform: "rotate(-45deg)", transformOrigin: "50% 0%" }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `${r * 0.14}px solid #2A2A2A`, background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.45), rgba(255,255,255,0.08) 45%, rgba(180,210,255,0.12))", boxShadow: "4px 10px 18px rgba(0,0,0,0.35)" }} />
    </div>
  );
};

/** Stempel tinta. */
export const InkStamp: React.FC<{ x: number; y: number; at: number; until?: number; rot?: number; size?: number; color?: string; children: React.ReactNode; sub?: string }> = ({ x, y, at, until = 99, rot = -8, size = 54, color = PB.red, children, sub }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame / fps < at || frame / fps > until) return null;
  const p = spring({ frame: frame - Math.round(at * fps), fps, config: { damping: 10, mass: 0.5, stiffness: 180 } });
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${2 - p})`, opacity: Math.min(1, p * 2), border: `7px solid ${color}`, borderRadius: 12, padding: "10px 24px 8px", color, textAlign: "center", background: "rgba(255,255,255,0.78)", zIndex: 55 }}>
      <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: size, lineHeight: 1.0, whiteSpace: "nowrap" }}>{children}</div>
      {sub ? <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: size * 0.34, marginTop: 6, opacity: 0.85 }}>{sub}</div> : null}
    </div>
  );
};
