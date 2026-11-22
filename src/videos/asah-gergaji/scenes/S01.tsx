import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { type Pose, Stickman } from "../../../components/Stickman";
// Satu seri dengan terlahir-tampan dkk.: warna, huruf, teks ketik.
import { K, mono, Typed } from "../../terlahir-tampan/parts";
import { lineAt, MARKERS as M, POTONG_KANAN, POTONG_KIRI, QUOTES, SALIP, TYPE_CPS } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const GROUND = 1270;
const SCALE = 0.5;
const HIP = GROUND - 176 * SCALE;
const QUOTE_TOP = 1362;
const ZONES = [270, 810];
const LOG_Y = 1130;

const sawPose = (o: number): Pose => ({ lean: 10, head: 12, armL: [70 + o * 0.4, -30], armR: [85 + o * 0.5, -40], legL: [-16, 4], legR: [16, -4] });
const SIT: Pose = { lean: 18, head: 25, armL: [40, -60], armR: [55, -70], legL: [82, -82], legR: [96, -96] };
const CHEER: Pose = { armL: [-140, -10], armR: [140, 10], legL: [-14, 4], legR: [14, -4] };
const TIRED: Pose = { lean: 24, head: 30, armL: [-6, 4], armR: [8, 4], legL: [-10, 8], legR: [10, 6] };

/** Kuda-kuda + batang kayu + tumpukan hasil potongan. */
const Station: React.FC<{ zc: number; cut: number; sawX: number; dull: number; sharp: number; showSaw: boolean }> = ({ zc, cut, sawX, dull, sharp, showSaw }) => (
  <>
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <line x1={zc - 60} y1={LOG_Y + 30} x2={zc - 20} y2={GROUND} stroke="#5C4A35" strokeWidth={8} />
      <line x1={zc - 20} y1={LOG_Y + 30} x2={zc - 60} y2={GROUND} stroke="#5C4A35" strokeWidth={8} />
      <line x1={zc + 40} y1={LOG_Y + 30} x2={zc + 80} y2={GROUND} stroke="#5C4A35" strokeWidth={8} />
      <line x1={zc + 80} y1={LOG_Y + 30} x2={zc + 40} y2={GROUND} stroke="#5C4A35" strokeWidth={8} />
      <rect x={zc - 110} y={LOG_Y} width={210} height={30} rx={14} fill="#7A5A3A" />
      <ellipse cx={zc + 100} cy={LOG_Y + 15} rx={9} ry={15} fill="#A8865A" />
    </svg>
    {/* tumpukan potongan kayu */}
    {Array.from({ length: cut }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: zc + 120 + (i % 4) * 30 - Math.floor(i / 4) * 0 + (Math.floor(i / 4) % 2) * 15, top: GROUND - 30 - Math.floor(i / 4) * 26, width: 28, height: 28, borderRadius: 14, background: "#A8865A", border: "3px solid #7A5A3A", boxSizing: "border-box" }} />
    ))}
    {/* gergaji */}
    {showSaw ? (
      <div style={{ position: "absolute", left: zc + 10 + sawX, top: LOG_Y - 14, width: 130, height: 22 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 110, height: 16, background: dull > 0 ? "#6A6B70" : "#B8BAC0", clipPath: "polygon(0 0, 100% 0, 100% 100%, 92% 70%, 84% 100%, 76% 70%, 68% 100%, 60% 70%, 52% 100%, 44% 70%, 36% 100%, 28% 70%, 20% 100%, 12% 70%, 4% 100%, 0 70%)" }} />
        <div style={{ position: "absolute", left: 106, top: -4, width: 26, height: 22, borderRadius: 6, background: "#5C4A35" }} />
        {sharp > 0 ? <div style={{ position: "absolute", left: 30, top: -30, color: "white", fontSize: 26, opacity: sharp }}>✦</div> : null}
      </div>
    ) : null}
  </>
);

export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const leftCut = POTONG_KIRI.filter((a) => t >= a).length;
  const rightCut = POTONG_KANAN.filter((a) => t >= a).length;
  const ahead = t >= SALIP;

  // gerak menggergaji (kiri melambat, kanan cepat setelah diasah)
  const leftSpeed = interpolate(t, [M.mulai, M.akhir], [10, 4], clamp);
  const lPhase = t > M.mulai ? Math.sin(t * leftSpeed) : 0;
  const rightSawing = (t > M.mulai && t < M.asah) || (t > M.lanjut && t < M.q4 + 0.5);
  const sharpening = t >= M.asah && t < M.lanjut;
  const rPhase = rightSawing ? Math.sin(t * (t > M.lanjut ? 16 : 10)) : 0;
  const sharp = t >= M.tajam ? 0.5 + 0.5 * Math.sin((t - M.tajam) * 8) : 0;
  const dull = t >= M.tumpul ? 1 : 0;
  const dullBlink = t >= M.tumpul && Math.floor(t * 3) % 2 === 0;
  const clockH = interpolate(t, [0, M.q4 + 1], [8, 12], clamp);
  const clock = `${String(Math.floor(clockH)).padStart(2, "0")}:${String(Math.floor((clockH % 1) * 60)).padStart(2, "0")}`;
  const kick = t >= SALIP && t < SALIP + 0.35 ? 1 - (t - SALIP) / 0.35 : 0;
  const tiredL = t >= M.q4;
  const cheerR = t >= M.q4;
  const fade = 1 - between(frame, fps, M.pudar, M.akhir - 0.1);
  const qi = QUOTES.reduce((a, q, i) => (t >= q.at ? i : a), -1);

  return (
    <div style={{ position: "absolute", inset: 0, background: K.bg }}>
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* judul */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: 210, textAlign: "center", color: K.white, fontSize: 34, letterSpacing: "0.2em" }}>
          <Typed text="ASAH GERGAJIMU." at={M.judul} cps={TYPE_CPS} />
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 262, textAlign: "center", ...mono, color: K.muted, fontSize: 18, letterSpacing: "0.14em", opacity: enterAt(frame, fps, 1.0, 0.5) }}>
          THE 7 HABITS OF HIGHLY EFFECTIVE PEOPLE · STEPHEN R. COVEY
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 320, textAlign: "center", ...mono, color: K.white, fontSize: 54, letterSpacing: "0.08em" }}>{clock}</div>

        {/* penghitung kayu per sisi */}
        {ZONES.map((zc, i) => {
          const n = i === 0 ? leftCut : rightCut;
          const win = i === 1 ? ahead : false;
          return (
            <div key={zc} style={{ position: "absolute", left: zc - 160, width: 320, top: 600, textAlign: "center", ...mono }}>
              <div style={{ fontSize: 18, color: K.muted, letterSpacing: "0.16em" }}>{i === 0 ? "TIDAK PERNAH MENGASAH" : "BERHENTI MENGASAH"}</div>
              <div style={{ fontSize: 120, color: win ? K.gold : K.white, marginTop: 8, transform: `scale(${1 + (i === 1 ? 0.12 * kick : 0)})` }}>{n}</div>
              <div style={{ fontSize: 18, color: K.muted, letterSpacing: "0.16em" }}>KAYU</div>
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 538, top: 520, width: 4, height: GROUND - 520, background: K.divider }} />
        <div style={{ position: "absolute", left: 40, top: GROUND, width: 1000, height: 6, background: K.frame }} />

        {/* stasiun kiri & kanan */}
        <Station zc={ZONES[0]} cut={leftCut} sawX={lPhase * 30} dull={dull} sharp={0} showSaw />
        <Station zc={ZONES[1]} cut={rightCut} sawX={rPhase * 30} dull={0} sharp={sharp} showSaw={!sharpening} />
        {dullBlink && !tiredL ? (
          <div style={{ position: "absolute", left: ZONES[0] - 10, top: LOG_Y - 70, background: K.red, color: "white", borderRadius: 8, padding: "4px 10px", ...mono, fontSize: 18, letterSpacing: "0.1em" }}>TUMPUL</div>
        ) : null}

        {/* stickman */}
        <Stickman x={ZONES[0] - 120} y={HIP} pose={tiredL ? TIRED : sawPose(lPhase * 20)} facing={1} scale={SCALE} color={K.white} />
        {sharpening ? (
          <>
            <Stickman x={ZONES[1] - 120} y={GROUND - 44} pose={SIT} facing={1} scale={SCALE} color={K.white} />
            <div style={{ position: "absolute", left: ZONES[1] - 80, top: GROUND - 120, width: 110, height: 14, background: "#B8BAC0", transform: `rotate(-12deg) translateX(${Math.sin(t * 14) * 6}px)` }} />
            {Array.from({ length: 5 }, (_, i) => {
              const q = (t * 3 + i / 5) % 1;
              return <div key={i} style={{ position: "absolute", left: ZONES[1] - 20 + q * 40 * (i % 2 ? 1 : -1), top: GROUND - 130 - q * 40, width: 5, height: 5, borderRadius: 3, background: K.gold, opacity: 1 - q }} />;
            })}
          </>
        ) : (
          <Stickman x={ZONES[1] - 120} y={HIP} pose={cheerR ? CHEER : sawPose(rPhase * 20)} facing={1} scale={SCALE} color={ahead ? K.gold : K.white} />
        )}

        {/* ikon "asah dirimu" */}
        {["BELAJAR", "ISTIRAHAT", "KESEHATAN"].map((s, i) => {
          const p = enterAt(frame, fps, M.q4 + 0.6 + i * 0.4, 0.35);
          return p > 0 ? (
            <div key={s} style={{ position: "absolute", left: 180 + i * 260, top: 930, transform: `translateX(-50%) scale(${0.6 + 0.4 * p})`, opacity: p, background: "#141519", border: `2px solid ${K.gold}`, color: K.white, borderRadius: 999, padding: "10px 18px", ...mono, fontSize: 20, whiteSpace: "nowrap" }}>
              {s}
            </div>
          ) : null;
        })}

        {/* kutipan */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: QUOTE_TOP, textAlign: "center", fontSize: 28, letterSpacing: "0.1em", lineHeight: "46px" }}>
          {qi >= 0
            ? QUOTES[qi].lines.map((l, i) => (
                <Typed key={`${qi}-${i}`} text={l} at={lineAt(QUOTES[qi].at, QUOTES[qi].lines, i)} cps={TYPE_CPS} style={{ color: (qi === 2 && i === 1) || (qi === 3 && i > 0) ? K.gold : qi === 1 && i === 1 ? K.red : K.white }} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
