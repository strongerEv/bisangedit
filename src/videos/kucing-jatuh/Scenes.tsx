import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../components/theme";
import { Words } from "../../components/Words";
import { Caption } from "./Caption";
import { P } from "./palette";
import { MARKERS as M, T } from "./timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const useLocal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return { frame, fps, u: frame / fps };
};
const fadeIn = (u: number) => interpolate(u, [0, 0.3], [0, 1], clamp);

const chip: React.CSSProperties = {
  background: "white",
  borderRadius: 999,
  padding: "12px 26px",
  fontFamily: theme.fonts.heading,
  fontWeight: 700,
  fontSize: 38,
  color: P.ink,
  boxShadow: `0 12px 30px ${P.shadow}`,
  whiteSpace: "nowrap",
};

/** Peringatan: dari lantai rendah, kucing tak sempat berputar. */
export const WarnScene: React.FC = () => {
  const { frame, fps, u } = useLocal();
  const at = (m: number) => m - T.warn; // waktu lokal dari marker
  const rise = spring({ frame, fps, config: { damping: 16 } });
  const drop = interpolate(u, [at(M.rendah) - 0.1, at(M.rendah) + 0.4], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const x = spring({ frame: frame - Math.round((at(M.takSempat) - 0.1) * fps), fps, config: { damping: 10, stiffness: 180 } });
  const pulse = 0.5 + 0.5 * Math.sin(u * 6);
  const B = { x: 300, w: 480, top: 700, floorH: 200, floors: 5 };
  const groundY = B.top + B.floorH * B.floors;
  const win = { x: B.x + 50, y: groundY - B.floorH * 2 + 40, w: 150, h: 120 };
  return (
    <AbsoluteFill style={{ opacity: fadeIn(u), background: `linear-gradient(180deg, ${P.skyTop} 0%, ${P.skyBottom} 75%)` }}>
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - rise) * 300}px)` }}>
        <div style={{ position: "absolute", left: 0, top: groundY, width: 1080, height: 400, background: P.grass }} />
        <div style={{ position: "absolute", left: B.x, top: B.top, width: B.w, height: groundY - B.top, background: P.buildingNear2, borderRadius: "16px 16px 0 0" }} />
        {Array.from({ length: B.floors }).map((_, f) => {
          const y = groundY - B.floorH * (f + 1);
          return (
            <React.Fragment key={f}>
              <div style={{ position: "absolute", left: B.x - 90, top: y + 70, fontFamily: theme.fonts.mono, fontWeight: 500, fontSize: 34, color: P.ink, opacity: 0.7 }}>{f + 1}</div>
              {[0, 1].map((c) => (
                <div key={c} style={{ position: "absolute", left: B.x + 50 + c * 230, top: y + 40, width: 150, height: 120, borderRadius: 10, background: P.window }} />
              ))}
            </React.Fragment>
          );
        })}
        {/* jendela lantai 2 + Mochi takut */}
        <div style={{ position: "absolute", left: win.x - 8, top: win.y - 8, width: win.w + 16, height: win.h + 16, borderRadius: 14, border: `6px solid ${P.danger}`, opacity: 0.6 + 0.4 * pulse }} />
        <Img src={staticFile("karakter/mochi/e_takut.png")} style={{ position: "absolute", left: win.x + 18, top: win.y - 18, width: 114, height: 141 }} />
        {/* jarak jatuh pendek */}
        <div style={{ position: "absolute", left: win.x + win.w / 2 - 3, top: win.y + win.h + 12, width: 0, height: (groundY - win.y - win.h - 20) * drop, borderLeft: `7px dashed ${P.danger}` }} />
        <div style={{ position: "absolute", left: win.x + win.w + 40, top: win.y + 150, ...chip, opacity: drop }}>terlalu rendah</div>
        {/* ikon berputar + tanda silang */}
        <div style={{ position: "absolute", left: 640, top: 1040, width: 220, height: 220, opacity: Math.min(1, x * 2), transform: `scale(${0.6 + 0.4 * x})` }}>
          <svg width={220} height={220}>
            <circle cx={110} cy={110} r={104} fill="white" />
            <path d="M 60 120 A 52 52 0 1 1 110 162" fill="none" stroke={P.orange} strokeWidth={14} strokeLinecap="round" />
            <path d="M 46 96 L 60 124 L 86 108" fill="none" stroke={P.orange} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 40 40 L 180 180 M 180 40 L 40 180" stroke={P.danger} strokeWidth={20} strokeLinecap="round" />
          </svg>
          <div style={{ ...chip, position: "absolute", top: 240, left: 110, transform: "translateX(-50%)", color: P.danger }}>tak sempat berputar</div>
        </div>
      </div>
      <Caption text="Tetap bisa *cedera*" frame={frame} fps={fps} from={at(M.cedera) - 0.1} to={T.safe - T.warn} />
    </AbsoluteFill>
  );
};

/** Jendela berjaring pengaman, Mochi duduk aman di dalam. */
export const SafeScene: React.FC = () => {
  const { frame, fps, u } = useLocal();
  const at = (m: number) => m - T.safe;
  const W = { x: 190, y: 640, w: 700, h: 780 };
  const net = interpolate(u, [at(M.pengaman) - 0.1, at(M.pengaman) + 0.9], [0, 1], clamp);
  const ok = spring({ frame: frame - Math.round((at(M.pengaman) + 0.7) * fps), fps, config: { damping: 12 } });
  const lines = 9;
  return (
    <AbsoluteFill style={{ opacity: fadeIn(u), background: P.cream }}>
      <div style={{ position: "absolute", left: W.x - 30, top: W.y - 30, width: W.w + 60, height: W.h + 60, borderRadius: 40, background: "white", boxShadow: `0 30px 70px ${P.shadow}` }} />
      <div style={{ position: "absolute", left: W.x, top: W.y, width: W.w, height: W.h, borderRadius: 18, overflow: "hidden", background: `linear-gradient(180deg, ${P.skyTop}, ${P.skyBottom})` }}>
        {[{ x: 40, w: 140, h: 300 }, { x: 200, w: 120, h: 220 }, { x: 360, w: 170, h: 340 }, { x: 560, w: 120, h: 260 }].map((b, i) => (
          <div key={i} style={{ position: "absolute", left: b.x, bottom: 90, width: b.w, height: b.h, background: P.buildingFar, borderRadius: "8px 8px 0 0" }} />
        ))}
        <div style={{ position: "absolute", left: 0, bottom: 0, width: W.w, height: 90, background: P.ledgeTop }} />
        <Img src={staticFile("karakter/mochi/duduk.png")} style={{ position: "absolute", left: W.w / 2 - 126, bottom: 70, width: 253, height: 474 }} />
        <svg width={W.w} height={W.h} style={{ position: "absolute", left: 0, top: 0 }}>
          {Array.from({ length: lines * 2 }).map((_, i) => {
            const d = i < lines;
            const k = (i % lines) / (lines - 1);
            const p = interpolate(net * (lines * 2 + 2) - i, [0, 2], [0, 1], clamp);
            const x0 = d ? -W.h + k * (W.w + W.h) : k * (W.w + W.h);
            return (
              <line
                key={i}
                x1={x0}
                y1={0}
                x2={x0 + (d ? W.h : -W.h) * p}
                y2={W.h * p}
                stroke="white"
                strokeWidth={6}
                strokeLinecap="round"
                opacity={0.9}
              />
            );
          })}
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          left: W.x + W.w - 150,
          top: W.y + W.h - 60,
          ...chip,
          background: P.orange,
          color: "white",
          opacity: Math.min(1, ok * 2),
          transform: `scale(${0.6 + 0.4 * ok})`,
        }}
      >
        ✓ aman
      </div>
      <Caption text="Pasang *pengaman* jendela" frame={frame} fps={fps} from={at(M.jadi) - 0.05} to={T.end - T.safe} />
    </AbsoluteFill>
  );
};

/** Penutup: "Kucing itu keren… bukan kebal." */
export const EndScene: React.FC = () => {
  const { frame, fps, u } = useLocal();
  const at = (m: number) => m - T.end;
  const up = spring({ frame: frame - 2, fps, config: { damping: 14, stiffness: 120 } });
  const bob = Math.sin(u * 3) * 6;
  const s = 1.1;
  return (
    <AbsoluteFill style={{ opacity: fadeIn(u), background: `linear-gradient(180deg, ${P.endTop} 0%, ${P.endBottom} 100%)` }}>
      <div style={{ position: "absolute", left: 96, top: 250, width: 888, display: "flex", flexDirection: "column", gap: 6 }}>
        <Words text="Kucing itu keren…" delay={at(M.keren) - 0.1} stagger={0.12} size={120} color={P.ink} />
        <Words text="bukan *kebal.*" delay={at(M.kebal) - 0.1} stagger={0.15} size={150} color={P.ink} accent={P.danger} />
      </div>
      <Img
        src={staticFile("karakter/mochi/hero.png")}
        style={{ position: "absolute", left: 540 - (570 * s) / 2, top: 1650 - 890 * s + (1 - up) * 700 + bob, width: 570 * s, height: 890 * s }}
      />
    </AbsoluteFill>
  );
};
