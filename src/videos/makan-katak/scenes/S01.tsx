import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { POSES, type Pose, Stickman } from "../../../components/Stickman";
// Satu seri dengan terlahir-tampan dkk.: warna, huruf, teks ketik.
import { K, mono, Typed } from "../../terlahir-tampan/parts";
import { lineAt, MARKERS as M, QUOTES, TYPE_CPS } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const GROUND = 1270;
const SCALE = 0.5;
const HIP = GROUND - 176 * SCALE;
const QUOTE_TOP = 1362;
const CARD = { x: 90, y: 470, w: 520, h: 560 };
const ITEMS = ["BALAS CHAT", "SCROLL SOSMED", "RAPIKAN MEJA", "LAPORAN BESAR"];
const ROW = (i: number) => CARD.y + 120 + i * 100;
const FROG_HOME = { x: CARD.x + CARD.w - 70, y: ROW(3) + 20 };
const ME = { x: 800, y: HIP };
const GREEN = "#4E9A51";

const TYPE: Pose = { lean: 6, armL: [70, -50], armR: [80, -60], legL: [-14, 4], legR: [14, -4] };
const STRESS: Pose = { lean: 8, head: 20, armL: [-150, 120], armR: [150, -120], legL: [-12, 4], legR: [12, -4] };
const RELAX: Pose = { lean: -10, head: -10, armL: [-150, 140], armR: [150, -140], legL: [-20, 6], legR: [20, -6] };

const Frog: React.FC<{ x: number; y: number; s: number; o?: number }> = ({ x, y, s, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, transform: `scale(${s})`, opacity: o }}>
    <div style={{ position: "absolute", left: -30, top: -22, width: 60, height: 40, borderRadius: "50% 50% 45% 45%", background: GREEN }} />
    {[-16, 16].map((dx) => (
      <div key={dx} style={{ position: "absolute", left: dx - 9, top: -34, width: 18, height: 18, borderRadius: 9, background: "white", border: `3px solid ${GREEN}` }}>
        <div style={{ position: "absolute", left: 5, top: 5, width: 6, height: 6, borderRadius: 3, background: K.bg }} />
      </div>
    ))}
    <div style={{ position: "absolute", left: -12, top: -2, width: 24, height: 8, borderBottom: "3px solid #2E5E30", borderRadius: "0 0 12px 12px" }} />
  </div>
);

export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const versionB = t >= M.rewind + 1.0;
  const rewinding = t >= M.rewind && t < M.rewind + 1.0;

  // jam: A 08:00 → 17:00, rewind kembali, B 08:00 → 11:30
  let h = interpolate(t, [M.q1, M.gagal], [8, 17], clamp);
  if (rewinding) h = interpolate(t, [M.rewind, M.rewind + 1.0], [17, 8], clamp);
  if (versionB) h = interpolate(t, [M.lompat, M.laporan, M.cekB[2]], [8, 10, 11.5], clamp);
  const clock = `${String(Math.floor(h)).padStart(2, "0")}:${String(Math.floor((h % 1) * 60)).padStart(2, "0")}`;

  const checked = (i: number) => {
    if (rewinding) return false;
    if (!versionB) return i < 3 && t >= M.cekA[i];
    if (i === 3) return t >= M.laporan;
    return t >= M.cekB[i];
  };
  const failed = !versionB && !rewinding && t >= M.gagal;

  // katak: A makin besar; B melompat & ditelan
  const grow = !versionB ? interpolate(t, [M.q1, M.gagal], [1, 2.4], clamp) * (rewinding ? interpolate(t, [M.rewind, M.rewind + 1], [1, 1 / 2.4], clamp) : 1) : 1;
  const jumpP = between(frame, fps, M.lompat, M.telan);
  const eaten = versionB && t >= M.telan;
  const frogPos = versionB && jumpP > 0 ? { x: FROG_HOME.x + (ME.x - FROG_HOME.x) * jumpP, y: FROG_HOME.y + (ME.y - 100 - FROG_HOME.y) * jumpP - Math.sin(Math.PI * jumpP) * 260 } : FROG_HOME;
  const ribbit = [M.katak, 4.6, 6.6, 8.4].some((a) => t >= a && t < a + 0.3);

  let pose: Pose = TYPE;
  if (!versionB && t >= M.q2) pose = STRESS;
  if (versionB && t >= M.cekB[2] + 0.3) pose = RELAX;
  if (rewinding) pose = POSES.stand;

  const fade = 1 - between(frame, fps, M.pudar, M.akhir - 0.1);
  const qi = QUOTES.reduce((a, q, i) => (t >= q.at ? i : a), -1);

  return (
    <div style={{ position: "absolute", inset: 0, background: K.bg }}>
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* judul + jam */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: 210, textAlign: "center", color: K.white, fontSize: 34, letterSpacing: "0.2em" }}>
          <Typed text="MAKAN KATAKMU DULU." at={M.judul} cps={TYPE_CPS} />
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 262, textAlign: "center", ...mono, color: K.muted, fontSize: 20, letterSpacing: "0.22em", opacity: enterAt(frame, fps, 1.0, 0.5) }}>
          EAT THAT FROG! · BRIAN TRACY
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 320, textAlign: "center", ...mono, color: failed ? K.red : K.white, fontSize: 56, letterSpacing: "0.08em" }}>
          {rewinding ? "◀◀ " : ""}
          {clock}
        </div>
        {t >= M.q1 ? (
          <div style={{ position: "absolute", left: 0, width: 1080, top: 400, textAlign: "center", ...mono, fontSize: 20, letterSpacing: "0.18em", color: versionB ? K.gold : K.red }}>
            {versionB ? "VERSI B · KATAK DULU" : "VERSI A · MENUNDA"}
          </div>
        ) : null}

        {/* daftar tugas */}
        <div style={{ position: "absolute", left: CARD.x, top: CARD.y, width: CARD.w, height: CARD.h, background: "#141519", border: `3px solid ${K.frame}`, borderRadius: 24, opacity: enterAt(frame, fps, M.daftar, 0.4), ...mono }}>
          <div style={{ position: "absolute", left: 30, top: 30, fontSize: 20, color: K.muted, letterSpacing: "0.18em" }}>TUGAS HARI INI</div>
          {ITEMS.map((it, i) => {
            const c = checked(i);
            const big = i === 3;
            return (
              <div key={it} style={{ position: "absolute", left: 30, top: ROW(i) - CARD.y, display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, border: `3px solid ${c ? K.gold : big && failed ? K.red : K.dim}`, background: c ? K.gold : "transparent", color: K.bg, fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {c ? "✓" : big && failed ? <span style={{ color: K.red }}>✗</span> : ""}
                </div>
                <div style={{ fontSize: big ? 26 : 24, color: c ? K.muted : big ? K.white : "#C9CACE", textDecoration: c ? "line-through" : undefined, fontWeight: big ? 700 : 500 }}>{it}</div>
              </div>
            );
          })}
        </div>
        {!eaten ? <Frog x={frogPos.x} y={frogPos.y + (ribbit ? -6 : 0)} s={grow} o={enterAt(frame, fps, M.katak, 0.3)} /> : null}

        {/* meja + stickman */}
        <div style={{ position: "absolute", left: 40, top: GROUND, width: 1000, height: 6, background: K.frame }} />
        <div style={{ position: "absolute", left: 830, top: 1180, width: 190, height: 12, background: "#5C4A35" }} />
        <div style={{ position: "absolute", left: 845, top: 1192, width: 10, height: 78, background: "#4A3A2A" }} />
        <div style={{ position: "absolute", left: 995, top: 1192, width: 10, height: 78, background: "#4A3A2A" }} />
        <div style={{ position: "absolute", left: 870, top: 1136, width: 70, height: 44, borderRadius: 4, background: "#2E3440", border: `3px solid ${K.frame}`, boxSizing: "border-box" }} />
        <Stickman x={ME.x} y={ME.y} pose={pose} facing={1} scale={SCALE} color={versionB && t >= M.laporan ? K.gold : K.white} />
        {t >= M.telan && t < M.telan + 0.5 ? <div style={{ position: "absolute", left: ME.x - 60, top: ME.y - 190, ...mono, fontSize: 30, color: K.white }}>GLUK!</div> : null}

        {/* efek putar ulang */}
        {rewinding ? <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 4px, transparent 4px 10px)" }} /> : null}

        {/* kutipan */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: QUOTE_TOP, textAlign: "center", fontSize: 28, letterSpacing: "0.1em", lineHeight: "46px" }}>
          {qi >= 0
            ? QUOTES[qi].lines.map((l, i) => (
                <Typed key={`${qi}-${i}`} text={l} at={lineAt(QUOTES[qi].at, QUOTES[qi].lines, i)} cps={TYPE_CPS} style={{ color: qi === 1 ? K.red : (qi === 2 && i > 0) || (qi === 3 && i === 1) ? K.gold : K.white }} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
