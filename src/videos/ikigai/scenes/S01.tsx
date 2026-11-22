import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { POSES, Stickman } from "../../../components/Stickman";
// Satu seri dengan terlahir-tampan dkk.: warna, huruf, teks ketik, konfeti.
import { Confetti, K, mono, Typed } from "../../terlahir-tampan/parts";
import { lineAt, MARKERS as M, QUOTES, TYPE_CPS } from "../timeline";

const CX = 540;
const CY = 920;
const R = 210;
const QUOTE_TOP = 1362;

// Empat lingkaran: posisi akhir (offset dari pusat) dan arah masuk.
const CIRCLES = [
  { dx: 0, dy: -125, from: [0, -900], label: "CINTAI", icon: "♥", lx: 0, ly: -R - 10 },
  { dx: -125, dy: 0, from: [-900, 0], label: "KUASAI", icon: "★", lx: -R - 10, ly: 0 },
  { dx: 125, dy: 0, from: [900, 0], label: "DIBUTUHKAN\nDUNIA", icon: "◎", lx: R + 10, ly: 0 },
  { dx: 0, dy: 125, from: [0, 900], label: "MENGHASILKAN", icon: "Rp", lx: 0, ly: R + 10 },
];
// Irisan berpasangan (label kecil di antara dua lingkaran).
const OVERLAPS = [
  { x: CX - 110, y: CY - 110, label: "PASSION" },
  { x: CX + 110, y: CY - 110, label: "MISI" },
  { x: CX - 110, y: CY + 110, label: "PROFESI" },
  { x: CX + 110, y: CY + 110, label: "VOKASI" },
];

export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const merge = between(frame, fps, M.temu, M.temu + 0.9); // jarak ke pusat menyempit sedikit
  const glow = between(frame, fps, M.ikigai, M.ikigai + 0.6);
  const dot = enterAt(frame, fps, 0.6, 0.4);
  const fade = 1 - between(frame, fps, M.pudar, M.akhir - 0.1);
  const qi = QUOTES.reduce((a, q, i) => (t >= q.at ? i : a), -1);

  return (
    <div style={{ position: "absolute", inset: 0, background: K.bg }}>
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* judul */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: 210, textAlign: "center", color: K.white, fontSize: 40, letterSpacing: "0.3em" }}>
          <Typed text="IKIGAI." at={M.judul} cps={12} />
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 272, textAlign: "center", ...mono, color: K.muted, fontSize: 18, letterSpacing: "0.16em", opacity: enterAt(frame, fps, 1.0, 0.5) }}>
          IKIGAI · HÉCTOR GARCÍA &amp; FRANCESC MIRALLES
        </div>

        {/* empat lingkaran */}
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          {CIRCLES.map((c, i) => {
            const p = enterAt(frame, fps, M.lingkaran[i], 0.8);
            const k = 1 - 0.18 * merge;
            const x = CX + c.dx * k + c.from[0] * (1 - p);
            const y = CY + c.dy * k + c.from[1] * (1 - p);
            const active = qi === i + 1;
            return <circle key={i} cx={x} cy={y} r={R} fill={`rgba(255,255,255,${active ? 0.07 : 0.035})`} stroke={active ? K.white : K.muted} strokeWidth={active ? 5 : 3} opacity={p} />;
          })}
          {glow > 0 ? <circle cx={CX} cy={CY} r={70 + 10 * glow} fill={K.gold} opacity={0.85 * glow} /> : null}
        </svg>
        {glow > 0 ? <div style={{ position: "absolute", left: CX - 200, top: CY - 200, width: 400, height: 400, borderRadius: 200, background: "radial-gradient(circle, rgba(217,169,60,0.35), rgba(0,0,0,0) 65%)", opacity: glow }} /> : null}

        {/* ikon + label tiap lingkaran */}
        {CIRCLES.map((c, i) => {
          const p = enterAt(frame, fps, M.lingkaran[i] + 0.3, 0.4);
          const k = 1 - 0.18 * merge;
          const ix = CX + c.dx * k * 1.9;
          const iy = CY + c.dy * k * 1.9;
          const vertical = c.dx === 0;
          return (
            <React.Fragment key={c.label}>
              <div style={{ position: "absolute", left: ix, top: iy, transform: "translate(-50%, -50%)", ...mono, textTransform: "none", fontSize: 40, color: i === 3 ? K.gold : K.white, opacity: p * (1 - glow * 0.4) }}>{c.icon}</div>
              <div style={{ position: "absolute", left: CX + c.dx * k + (vertical ? 0 : c.lx), top: CY + c.dy * k + (vertical ? c.ly : 0), transform: `translate(${vertical ? "-50%" : c.dx < 0 ? "-100%" : "0"}, ${vertical ? (c.dy < 0 ? "-100%" : "0") : "-50%"})`, ...mono, fontSize: 18, letterSpacing: "0.1em", color: K.muted, whiteSpace: "pre", lineHeight: "26px", textAlign: c.dx > 0 ? "left" : c.dx < 0 ? "right" : "center", opacity: p }}>
                {c.label}
              </div>
            </React.Fragment>
          );
        })}

        {/* irisan */}
        {OVERLAPS.map((o, i) => {
          const p = enterAt(frame, fps, M.irisan + i * 0.3, 0.3) * (1 - glow * 0.5);
          return p > 0 ? (
            <div key={o.label} style={{ position: "absolute", left: o.x, top: o.y, transform: `translate(-50%, -50%) scale(${0.7 + 0.3 * p})`, opacity: p, ...mono, fontSize: 17, letterSpacing: "0.08em", color: K.white }}>
              {o.label}
            </div>
          ) : null;
        })}

        {/* pusat: titik → IKIGAI + stickman */}
        {glow <= 0 ? <div style={{ position: "absolute", left: CX - 8, top: CY - 8, width: 16, height: 16, borderRadius: 8, background: K.white, opacity: dot }} /> : null}
        {glow > 0 ? (
          <>
            <div style={{ position: "absolute", left: 0, width: 1080, top: CY - 16, textAlign: "center", ...mono, fontSize: 26, letterSpacing: "0.12em", color: K.bg, opacity: glow }}>IKIGAI</div>
            <Stickman x={CX} y={CY - 90} pose={{ ...POSES.cheer }} facing={0} scale={0.28} color={K.white} style={{ opacity: glow }} />
          </>
        ) : null}
        <Confetti x={CX} y={CY} p={t - M.ikigai} />

        {/* kutipan */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: QUOTE_TOP, textAlign: "center", fontSize: 28, letterSpacing: "0.1em", lineHeight: "46px" }}>
          {qi >= 0
            ? QUOTES[qi].lines.map((l, i) => (
                <Typed key={`${qi}-${i}`} text={l} at={lineAt(QUOTES[qi].at, QUOTES[qi].lines, i)} cps={TYPE_CPS} style={{ color: qi === 6 && i === 0 ? K.gold : K.white }} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
