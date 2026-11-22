import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { POSES, type Pose, Stickman, walkPose } from "../../../components/Stickman";
// Satu seri dengan terlahir-tampan dkk.: warna, huruf, teks ketik.
import { K, mono, Typed } from "../../terlahir-tampan/parts";
import { lineAt, MARKERS as M, QUOTES, TYPE_CPS } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const CX = 540;
const CY = 950;
const SCALE = 0.45;
const QUOTE_TOP = 1362;
const TARGET = { x: 720, y: 830 }; // chip "BAHASA INGGRIS"
const CHIPS = [
  { x: TARGET.x, y: TARGET.y, label: "BAHASA INGGRIS", target: true },
  { x: 300, y: 1060, label: "PUBLIC SPEAKING" },
  { x: 540, y: 1200, label: "BISNIS" },
];
const NEW_CHIPS = [
  { x: 240, y: 800, label: "INVESTASI" },
  { x: 850, y: 1090, label: "NGE-GYM" },
  { x: 760, y: 1235, label: "MENULIS" },
];

const LIE: Pose = { armL: [150, -30], armR: [160, -40], legL: [-4, 2], legR: [4, -2] };
const STRESS: Pose = { lean: 8, head: 20, armL: [-150, 120], armR: [150, -120], legL: [-12, 4], legR: [12, -4] };
const READ: Pose = { head: 20, armL: [60, 60], armR: [70, 50], legL: [-12, 4], legR: [12, -4] };
const CHEER: Pose = { armL: [-140, -10], armR: [140, 10], legL: [-14, 4], legR: [14, -4] };

const Bubble: React.FC<{ x: number; y: number; p: number; ok?: boolean; children: React.ReactNode }> = ({ x, y, p, ok, children }) =>
  p <= 0 ? null : (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -100%) scale(${0.7 + 0.3 * p})`, transformOrigin: "50% 100%", opacity: p, background: ok ? K.white : "#1C1D21", color: ok ? K.bg : K.white, border: `3px solid ${ok ? K.gold : K.red}`, borderRadius: 18, padding: "10px 16px", ...mono, fontSize: 20, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
      {children} <span style={{ color: ok ? "#2E7D32" : K.red }}>{ok ? "✓" : "✗"}</span>
    </div>
  );

export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const grow = between(frame, fps, M.meluas, M.meluas + 1.2);
  const irx = 150 + 120 * grow;
  const iry = 115 + 90 * grow;
  const orx = 360 + 80 * grow;
  const ory = 290 + 60 * grow;
  const appear = enterAt(frame, fps, 0.3, 0.6);

  // stickman
  const standing = t >= M.keluar;
  const walkP = between(frame, fps, M.keluar + 0.3, M.keluar + 1.6);
  const sx = interpolate(walkP, [0, 1], [CX, TARGET.x]);
  const sy = interpolate(walkP, [0, 1], [CY + 40, TARGET.y + 150]);
  const walking = walkP > 0 && walkP < 1;
  const practicing = t >= M.latihan && t < M.fasih;
  let pose: Pose = walking ? walkPose(t * 1.8) : POSES.stand;
  if (t >= M.gagal1 && t < M.latihan) pose = STRESS;
  if (practicing) pose = Math.floor(t * 2) % 2 ? READ : POSES.think;
  if (t >= M.fasih) pose = CHEER;
  const crossFlash = t > M.keluar + 0.7 && t < M.keluar + 1.2 ? 1 : 0;
  const latihan = Math.round(interpolate(t, [M.latihan, M.fasih], [1, 100], clamp));
  const level = t >= M.meluas ? 2 : 1;
  const chipDone = t >= M.fasih;

  const fade = 1 - between(frame, fps, M.pudar, M.akhir - 0.1);
  const qi = QUOTES.reduce((a, q, i) => (t >= q.at ? i : a), -1);

  return (
    <div style={{ position: "absolute", inset: 0, background: K.bg }}>
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* judul + status */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: 210, textAlign: "center", color: K.white, fontSize: 34, letterSpacing: "0.2em" }}>
          <Typed text="ZONA NYAMAN." at={M.judul} cps={TYPE_CPS} />
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 300, textAlign: "center", ...mono, color: practicing ? K.white : K.muted, fontSize: practicing ? 52 : 40, letterSpacing: "0.1em", opacity: appear }}>
          {practicing ? `LATIHAN KE-${latihan}` : `LEVEL ${level}`}
        </div>

        {/* diagram */}
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: appear }}>
          <ellipse cx={CX} cy={CY} rx={orx} ry={ory} fill="rgba(255,255,255,0.02)" stroke={K.muted} strokeWidth={3} strokeDasharray="12 10" />
          <ellipse cx={CX} cy={CY} rx={irx} ry={iry} fill="#2A2B30" stroke={crossFlash ? K.red : K.white} strokeWidth={crossFlash ? 6 : 4} />
        </svg>
        <div style={{ position: "absolute", left: 0, width: 1080, top: CY - ory + 22, textAlign: "center", ...mono, fontSize: 22, letterSpacing: "0.16em", color: K.muted, opacity: appear }}>
          ZONA TIDAK NYAMAN
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: CY - iry + 20, textAlign: "center", ...mono, fontSize: 22, letterSpacing: "0.14em", color: K.white, opacity: appear }}>
          ZONA NYAMAN
        </div>

        {/* tantangan */}
        {CHIPS.map((c) => {
          const done = c.target && chipDone;
          const inside = c.target && t >= M.meluas + 0.6;
          return (
            <div key={c.label} style={{ position: "absolute", left: c.x, top: c.y, transform: `translate(-50%, -50%) scale(${done && t < M.fasih + 0.3 ? 1.15 : 1})`, background: inside ? "#3A3B41" : done ? K.gold : "#141519", color: done && !inside ? K.bg : K.white, border: `2px solid ${done ? K.gold : K.dim}`, borderRadius: 999, padding: "8px 16px", ...mono, fontSize: 18, letterSpacing: "0.06em", whiteSpace: "nowrap", opacity: appear }}>
              {c.label}
              {done ? " ✓" : ""}
            </div>
          );
        })}
        {NEW_CHIPS.map((c, i) => {
          const p = enterAt(frame, fps, M.baru + i * 0.35, 0.35);
          return p > 0 ? (
            <div key={c.label} style={{ position: "absolute", left: c.x, top: c.y, transform: `translate(-50%, -50%) scale(${0.6 + 0.4 * p})`, opacity: p, background: "#141519", color: K.white, border: `2px dashed ${K.muted}`, borderRadius: 999, padding: "8px 16px", ...mono, fontSize: 18, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
              {c.label}
            </div>
          ) : null;
        })}

        {/* stickman */}
        {!standing ? (
          <>
            <div style={{ position: "absolute", left: CX - 40, top: CY + 50, transform: "rotate(-90deg)", transformOrigin: "0 0", opacity: appear }}>
              <Stickman x={0} y={0} pose={LIE} scale={SCALE} color={K.white} />
            </div>
            <div style={{ position: "absolute", left: CX - 112, top: CY + 14, width: 12, height: 18, borderRadius: 3, background: "#3A4A6A", boxShadow: "0 0 14px rgba(120,150,255,0.6)", opacity: appear }} />
          </>
        ) : (
          <Stickman x={sx} y={sy} pose={pose} facing={1} scale={SCALE} color={t >= M.fasih ? K.gold : K.white} />
        )}
        {practicing ? <div style={{ position: "absolute", left: sx + 12, top: sy - 92, width: 28, height: 20, background: K.white, borderRadius: 3, transform: "rotate(-15deg)" }} /> : null}
        {t >= M.gagal1 && t < M.latihan ? <div style={{ position: "absolute", left: sx + 30, top: sy - 168, width: 14, height: 20, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", background: "#7CC6FF", transform: `translateY(${((t * 2) % 1) * 18}px)` }} /> : null}

        <Bubble x={sx - 30} y={sy - 180} p={enterAt(frame, fps, M.gagal1, 0.25) * (1 - enterAt(frame, fps, M.gagal2 - 0.2, 0.2))}>
          H-HELLO... MY NAME...
        </Bubble>
        <Bubble x={sx - 30} y={sy - 180} p={enterAt(frame, fps, M.gagal2, 0.25) * (1 - enterAt(frame, fps, M.latihan - 0.2, 0.2))}>
          I... AM... UHM...
        </Bubble>
        <Bubble x={sx - 60} y={sy - 180} ok p={enterAt(frame, fps, M.fasih, 0.25) * (1 - enterAt(frame, fps, M.meluas + 1.6, 0.3))}>
          HELLO! NICE TO MEET YOU.
        </Bubble>

        {/* kutipan */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: QUOTE_TOP, textAlign: "center", fontSize: 28, letterSpacing: "0.1em", lineHeight: "46px" }}>
          {qi >= 0
            ? QUOTES[qi].lines.map((l, i) => (
                <Typed key={`${qi}-${i}`} text={l} at={lineAt(QUOTES[qi].at, QUOTES[qi].lines, i)} cps={TYPE_CPS} style={{ color: (qi === 2 && i === 1) || (qi === 3 && i === 1) || (qi === 4 && i === 1) ? K.gold : qi === 1 ? K.red : K.white }} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
