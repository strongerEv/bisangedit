import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { type Pose, Stickman, walkPose } from "../../../components/Stickman";
// Satu seri dengan terlahir-tampan dkk.: konfeti, teks ketik, warna & huruf.
import { Confetti, K, mono, Typed } from "../../terlahir-tampan/parts";
import { dayAt, lineAt, MARKERS as M, QUOTES, TYPE_CPS } from "../timeline";

// Grafik: hari 0–365 di sumbu x. Nilai 1 di garis dasar; naik (1,01^n) memakai skala atas, turun (0,99^n) skala bawah.
const X0 = 150;
const X1 = 860;
const BASE = 1000;
const TOP = 650;
const BOT = 1250;
const MAXV = Math.pow(1.01, 365);
const SCALE = 0.42;
const QUOTE_TOP = 1350;

const xOf = (day: number) => X0 + (day / 365) * (X1 - X0);
const yUp = (v: number) => BASE - ((v - 1) / (MAXV - 1)) * (BASE - TOP);
const yDown = (v: number) => BASE + (1 - v) * (BOT - BASE);
const fmt = (v: number) => v.toFixed(2).replace(".", ",");

const READ: Pose = { head: 20, armL: [60, 60], armR: [70, 50], legL: [-12, 4], legR: [12, -4] };

const curve = (day: number, f: (d: number) => [number, number]) => {
  const n = Math.max(1, Math.floor(day));
  const pts = Array.from({ length: n + 1 }, (_, d) => f(Math.min(d, day)));
  pts.push(f(day));
  return pts.map(([x, y], i) => `${i ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
};

export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const day = dayAt(t);
  const up = Math.pow(1.01, day);
  const down = Math.pow(0.99, day);
  const x = xOf(day);
  const yu = yUp(up);
  const yd = yDown(down);
  const done = t >= M.hari365;
  const appear = enterAt(frame, fps, M.hari1, 0.4);
  const walking = t > M.mulai && t < M.hari365;
  const kick = done && t < M.hari365 + 0.35 ? 1 - (t - M.hari365) / 0.35 : 0;
  const fade = 1 - between(frame, fps, M.pudar, M.akhir - 0.1);
  const qi = QUOTES.reduce((a, q, i) => (t >= q.at ? i : a), -1);

  return (
    <div style={{ position: "absolute", inset: 0, background: K.bg }}>
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* judul */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: 210, textAlign: "center", color: K.white, fontSize: 34, letterSpacing: "0.2em" }}>
          <Typed text="1% SETIAP HARI." at={M.judul} cps={TYPE_CPS} />
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 262, textAlign: "center", ...mono, color: K.muted, fontSize: 20, letterSpacing: "0.22em", opacity: enterAt(frame, fps, 0.9, 0.5) }}>
          ATOMIC HABITS · JAMES CLEAR
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 330, textAlign: "center", ...mono, color: K.white, fontSize: 60, letterSpacing: "0.08em", opacity: appear, transform: `scale(${1 + 0.08 * kick})` }}>
          HARI {Math.round(day)}
        </div>

        {/* sumbu & garis dasar */}
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: appear }}>
          <line x1={X0} y1={BASE} x2={X1 + 40} y2={BASE} stroke={K.dim} strokeWidth={2} strokeDasharray="8 8" />
          <line x1={X0} y1={BOT + 30} x2={X1 + 40} y2={BOT + 30} stroke={K.frame} strokeWidth={3} />
          {[1, 100, 200, 300, 365].map((d) => (
            <g key={d}>
              <line x1={xOf(d)} y1={BOT + 30} x2={xOf(d)} y2={BOT + 40} stroke={K.frame} strokeWidth={3} />
              <text x={xOf(d)} y={BOT + 66} fill={K.dim} fontSize={18} textAnchor="middle" fontFamily="JetBrains Mono">
                {d}
              </text>
            </g>
          ))}
          <text x={X0 - 14} y={BASE + 6} fill={K.muted} fontSize={20} textAnchor="end" fontFamily="JetBrains Mono">
            1×
          </text>
          {/* garis naik (+1%) & turun (−1%) */}
          {t >= M.mulai ? (
            <>
              <path d={curve(day, (d) => [xOf(d), yUp(Math.pow(1.01, d))])} fill="none" stroke={done ? K.gold : K.white} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
              <path d={curve(day, (d) => [xOf(d), yDown(Math.pow(0.99, d))])} fill="none" stroke={K.red} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
            </>
          ) : null}
        </svg>

        {/* label persen di titik awal */}
        <div style={{ position: "absolute", left: X0 - 120, top: BASE - 150, ...mono, fontSize: 26, color: K.white, opacity: appear * (1 - between(frame, fps, M.mulai, M.mulai + 0.4)) }}>+1%</div>
        <div style={{ position: "absolute", left: X0 - 120, top: BASE + 70, ...mono, fontSize: 26, color: K.red, opacity: appear * (1 - between(frame, fps, M.mulai, M.mulai + 0.4)) }}>−1%</div>

        {/* stickman +1%: membaca buku lalu berjalan menanjak */}
        <div style={{ opacity: appear }}>
          <Stickman x={x} y={yu - 176 * SCALE - 4} pose={walking ? walkPose(t * 2) : t < M.mulai ? READ : { armL: [-140, -10], armR: [140, 10], legL: [-14, 4], legR: [14, -4] }} facing={1} scale={SCALE} color={done ? K.gold : K.white} />
          {t < M.mulai ? <div style={{ position: "absolute", left: x + 14, top: yu - 100, width: 30, height: 22, background: K.white, borderRadius: 3, transform: "rotate(-15deg)", opacity: enterAt(frame, fps, M.baca, 0.3) }} /> : null}
        </div>

        {/* stickman −1%: rebahan main HP, ikut merosot */}
        <div style={{ position: "absolute", left: x - 10, top: yd + 14, transform: "rotate(-90deg)", transformOrigin: "0 0", opacity: appear }}>
          <Stickman x={0} y={0} pose={{ armL: [150, -30], armR: [160, -40], legL: [-4, 2], legR: [4, -2] }} scale={SCALE} color={K.red} />
        </div>
        <div style={{ position: "absolute", left: x - 74, top: yd - 22, width: 12, height: 18, borderRadius: 3, background: "#3A4A6A", boxShadow: "0 0 14px rgba(120,150,255,0.6)", opacity: appear * enterAt(frame, fps, M.baca + 0.4, 0.3) }} />

        {/* nilai di ujung garis */}
        {t >= M.mulai ? (
          <>
            <div style={{ position: "absolute", left: x, top: yu - 230, transform: `translateX(-50%) scale(${done ? 1.5 + 0.1 * kick : 1})`, transformOrigin: "50% 100%", ...mono, fontSize: 30, color: done ? K.gold : K.white, whiteSpace: "nowrap" }}>
              ×{fmt(up)}
            </div>
            <div style={{ position: "absolute", left: Math.min(x + 80, 880), top: yd - 24, transform: `scale(${done ? 1.3 : 1})`, transformOrigin: "0% 50%", ...mono, fontSize: 30, color: K.red, whiteSpace: "nowrap" }}>
              ×{fmt(down)}
            </div>
          </>
        ) : null}
        <Confetti x={x} y={yu - 120} p={t - M.hari365} />

        {/* kutipan */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: QUOTE_TOP, textAlign: "center", fontSize: 28, letterSpacing: "0.1em", lineHeight: "46px" }}>
          {qi >= 0
            ? QUOTES[qi].lines.map((l, i) => (
                <Typed key={`${qi}-${i}`} text={l} at={lineAt(QUOTES[qi].at, QUOTES[qi].lines, i)} cps={TYPE_CPS} style={{ color: (qi === 3 && i === 1) || (qi === 2 && i === 2) ? K.red : qi === 2 && i === 1 ? K.gold : K.white }} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
