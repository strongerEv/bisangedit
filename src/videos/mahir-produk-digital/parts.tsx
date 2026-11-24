import React from "react";
import { AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt } from "../../components/motion";
import { theme } from "../../components/theme";
import { CAPTIONS, POSE_AT } from "./timeline";

export type Cap = { t0: number; t1: number; text: string };
export type PoseAt = { at: number; pose: string; side?: "kiri" | "kanan" };

const syl = (w: string) => {
  const s = w.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (/^\d+$/.test(s)) return s.length === 2 ? 4 : 3; // "24"/"30" = dua/tiga puluh empat
  if (s === "follow" || s === "file") return 2;
  if (s === "ai") return 2;
  return Math.max(1, (s.replace(/ai|au/g, "A").match(/[aiueoA]/g) ?? []).length);
};

/** Kata-kata satu klausa dengan waktu mulai masing-masing (proporsional suku kata). `hi` = kata kunci (bertanda *). */
export const wordsOf = (c: Cap) => {
  const raw = c.text.split(" ");
  const ss = raw.map(syl);
  const tot = ss.reduce((a, b) => a + b, 0);
  let acc = 0;
  return raw.map((r, i) => {
    const m = r.match(/^\*(.+)\*(.*)$/);
    const w = { text: m ? m[1] + m[2] : r, hi: !!m, at: c.t0 + ((c.t1 - c.t0) * acc) / tot };
    acc += ss[i];
    return w;
  });
};

// Akun @mahirambilpeluang — gaya mengikuti referensi/mahir-layout-kartu-grid.mp4: latar putih berkotak dengan lantai
// berperspektif, kartu putih, stempel, subtitle karaoke, karakter sticker di pojok bawah.
// Aksen biru (senada kaos karakter) + merah untuk stempel/peringatan.
export const C = {
  bg: "#FFFFFF",
  grid: "#E7EAF0",
  ink: "#15171C",
  muted: "#9096A0",
  soft: "#F4F6FA",
  blue: "#2457D6",
  blueSoft: "#E8EEFC",
  red: "#E5484D",
  yellow: "#F5B700",
  shadow: "rgba(20, 30, 60, 0.12)",
} as const;

export const head: React.CSSProperties = { fontFamily: theme.fonts.heading, fontWeight: 700 };
export const mono: React.CSSProperties = { fontFamily: theme.fonts.mono, fontWeight: 500 };
export const img = (f: string) => staticFile(`aset/mahirambilpeluang/${f}`);

/** Latar putih: kotak-kotak datar di atas, lantai berperspektif di bawah (memudar ke cakrawala). */
export const Backdrop: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg, overflow: "hidden" }}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `linear-gradient(${C.grid} 2px, transparent 2px), linear-gradient(90deg, ${C.grid} 2px, transparent 2px)`,
        backgroundSize: "90px 90px",
        backgroundPosition: "-2px -2px",
        WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0) 52%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, right: 0, top: 960, bottom: 0, perspective: "700px", perspectiveOrigin: "50% 0%" }}>
      <div
        style={{
          position: "absolute",
          left: -1200,
          width: 3480,
          top: 0,
          height: 2600,
          transformOrigin: "50% 0%",
          transform: "rotateX(62deg)",
          backgroundImage: `linear-gradient(${C.grid} 3px, transparent 3px), linear-gradient(90deg, ${C.grid} 3px, transparent 3px)`,
          backgroundSize: "160px 160px",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0) 30%)" }} />
    </div>
  </AbsoluteFill>
);

/** Judul babak di atas (berganti dengan efek pop). */
export const Title: React.FC<{ text: string; at: number; until: number }> = ({ text, at, until }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t < at - 0.05 || t > until) return null;
  const p = spring({ frame: frame - Math.round(at * fps), fps, config: { damping: 12, mass: 0.6 } });
  const out = Math.min(1, Math.max(0, (until - t) / 0.2));
  return (
    <div style={{ position: "absolute", left: 0, width: 1080, top: 250, textAlign: "center", ...head, fontSize: 66, letterSpacing: "-0.01em", color: C.ink, opacity: Math.min(p, out), transform: `scale(${0.8 + 0.2 * p})` }}>
      {text}
    </div>
  );
};

/** Subtitle karaoke: kata yang sudah diucapkan hitam, yang sedang diucapkan biru bergaris bawah, berikutnya abu-abu. */
export const Caption: React.FC<{ top?: number; captions?: Cap[] }> = ({ top = 1050, captions = CAPTIONS }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const idx = captions.findIndex((c, i) => t >= c.t0 - 0.05 && t < (captions[i + 1]?.t0 ?? 99) - 0.05);
  if (idx < 0) return null;
  const c = captions[idx];
  const words = wordsOf(c);
  const p = spring({ frame: frame - Math.round((c.t0 - 0.05) * fps), fps, config: { damping: 14, mass: 0.5 } });
  return (
    <div style={{ position: "absolute", left: 0, width: 1080, top, display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: 940, background: "white", borderRadius: 22, padding: "16px 30px", boxShadow: `0 14px 34px ${C.shadow}`, textAlign: "center", ...head, fontSize: 54, lineHeight: 1.18, transform: `scale(${0.92 + 0.08 * p})`, opacity: Math.min(1, p * 1.5) }}>
        {words.map((w, i) => {
          const said = t >= w.at;
          const now = said && (i === words.length - 1 || t < words[i + 1].at);
          const color = !said ? "#C5C9D0" : now || w.hi ? C.blue : C.ink;
          return (
            <React.Fragment key={i}>
              <span style={{ color, textDecoration: now || (said && w.hi) ? "underline" : undefined, textDecorationThickness: 6, textUnderlineOffset: 8, display: "inline-block", transform: now ? "translateY(-3px)" : undefined }}>{w.text}</span>
              {i < words.length - 1 ? " " : null}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

/** Karakter sticker di pojok bawah (kiri/kanan sesuai `side`): ganti pose dengan efek pop + garis kejut kuning. */
export const Character: React.FC<{ poses?: PoseAt[] }> = ({ poses = POSE_AT }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cur: PoseAt = poses.reduce<PoseAt>((a, p) => (t >= p.at ? p : a), poses[0]);
  const right = cur.side === "kanan";
  const pop = spring({ frame: frame - Math.round(cur.at * fps), fps, config: { damping: 9, mass: 0.5 } });
  const enter = enterAt(frame, fps, 0, 0.5);
  const breathe = 1 + 0.012 * Math.sin(t * 2.4);
  const burst = Math.max(0, 1 - (t - cur.at) / 0.45);
  const W = 330;
  return (
    <div style={{ position: "absolute", left: right ? 1080 - 18 - W : 18, top: 1452, width: W, height: 420, opacity: enter }}>
      <div style={{ position: "absolute", left: 60, right: 60, bottom: -6, height: 34, borderRadius: "50%", background: "rgba(20,30,60,0.12)", filter: "blur(4px)" }} />
      <Img
        src={img(`pose-${cur.pose}.png`)}
        style={{ position: "absolute", left: 0, bottom: 0, width: W, height: 420, objectFit: "contain", objectPosition: "50% 100%", transform: `scale(${(0.86 + 0.14 * pop) * breathe})`, transformOrigin: "50% 100%" }}
      />
      {burst > 0
        ? [-35, 0, 35].map((a, i) => (
            <div key={i} style={{ position: "absolute", left: (right ? 30 : W - 40) + Math.sin(((right ? -a : a) * Math.PI) / 180) * 30, top: 30 - Math.cos((a * Math.PI) / 180) * 10, width: 8, height: 34, borderRadius: 4, background: C.yellow, opacity: burst, transform: `rotate(${right ? -a - 20 : a + 20}deg) translateY(${-14 * (1 - burst)}px)` }} />
          ))
        : null}
    </div>
  );
};

/** Kartu putih membulat dengan bayangan; muncul naik + skala. */
export const Card: React.FC<{ x: number; y: number; w: number; h?: number; at: number; until?: number; dim?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({ x, y, w, h, at, until = 99, dim = 0, style, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t < at - 0.05 || t > until) return null;
  const p = spring({ frame: frame - Math.round(at * fps), fps, config: { damping: 14, mass: 0.6 } });
  const out = Math.min(1, Math.max(0, (until - t) / 0.2));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, background: "white", borderRadius: 26, border: "2px solid #ECEEF3", boxShadow: `0 18px 40px ${C.shadow}`, opacity: Math.min(1, p * 1.4) * out * (1 - dim * 0.5), transform: `translateY(${(1 - p) * 40}px) scale(${0.94 + 0.06 * p})`, boxSizing: "border-box", ...style }}>
      {children}
    </div>
  );
};

/** Stempel miring bergaya cap. */
export const Stamp: React.FC<{ x: number; y: number; at: number; until?: number; color?: string; rot?: number; size?: number; children: React.ReactNode }> = ({ x, y, at, until = 99, color = C.red, rot = -8, size = 60, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t < at || t > until) return null;
  const p = spring({ frame: frame - Math.round(at * fps), fps, config: { damping: 10, mass: 0.5, stiffness: 180 } });
  const out = Math.min(1, Math.max(0, (until - t) / 0.2));
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${2 - p})`, opacity: Math.min(1, p * 2) * out, border: `7px solid ${color}`, borderRadius: 14, padding: "8px 26px", color, ...head, fontWeight: 800, fontSize: size, letterSpacing: "0.02em", whiteSpace: "nowrap", background: "rgba(255,255,255,0.85)" }}>
      {children}
    </div>
  );
};

// ---------- ikon sederhana (SVG) ----------
type IP = { size?: number; color?: string };
export const IconFile: React.FC<IP> = ({ size = 64, color = C.blue }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round">
    <path d="M6 2h8l5 5v15H6z" fill={C.blueSoft} />
    <path d="M14 2v5h5M9 13h7M9 17h5" />
  </svg>
);
export const IconClock: React.FC<IP> = ({ size = 64, color = C.ink }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round">
    <circle cx={12} cy={12} r={9} />
    <path d="M12 7v5l3 2" />
  </svg>
);
export const IconBox: React.FC<IP> = ({ size = 64, color = C.ink }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round">
    <path d="M3 7l9-4 9 4v10l-9 4-9-4z" />
    <path d="M3 7l9 4 9-4M12 11v10" />
  </svg>
);
export const IconTruck: React.FC<IP> = ({ size = 64, color = C.ink }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round">
    <path d="M2 6h12v10H2zM14 9h4l3 3v4h-7z" />
    <circle cx={6} cy={18} r={2} fill="white" />
    <circle cx={17} cy={18} r={2} fill="white" />
  </svg>
);
export const IconBell: React.FC<IP> = ({ size = 40, color = C.blue }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6zM10 19a2 2 0 0 0 4 0z" />
  </svg>
);
export const Cross: React.FC<{ size: number; p: number }> = ({ size, p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ position: "absolute", left: 0, top: 0 }}>
    <path d="M4 4L20 20M20 4L4 20" stroke={C.red} strokeWidth={3.2} strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} />
  </svg>
);

export const rupiah = (n: number) => "Rp" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
