import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { POSES, type Pose, Stickman, walkPose } from "../../../components/Stickman";
// Satu seri dengan terlahir-tampan dkk.: warna, huruf, teks ketik, konfeti.
import { Confetti, K, mono, ribuan, Typed } from "../../terlahir-tampan/parts";
import { lineAt, MARKERS as M, PALU, QUOTES, TYPE_CPS } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const GROUND = 1260;
const SCALE = 0.5;
const QUOTE_TOP = 1362;
const SIT_X = 250;
const SITE = { left: 540, top: 900 }; // bangunan nyata (koordinat lokal 0..420 × 0..360)
const CLOUD = { cx: 640, cy: 740, w: 560, h: 300 };
const SK = 0.55; // skala sketsa di awan

// Bagian bangunan dalam koordinat lokal, digambar berurutan.
const PARTS = [
  "M20 360 L20 120 L400 120 L400 360 Z", // badan
  "M0 120 L210 0 L420 120", // atap
  "M180 360 L180 250 L240 250 L240 360", // pintu
  "M50 160 L140 160 L140 230 L50 230 Z", // jendela kiri
  "M280 160 L370 160 L370 230 L280 230 Z", // jendela kanan
  "M140 85 L280 85 L280 115 L140 115 Z", // papan nama
];

const SIT: Pose = { lean: 6, head: 10, armL: [30, -40], armR: [150, 150], legL: [82, -82], legR: [96, -96] };
const HAMMER_UP: Pose = { lean: -4, armL: [-20, 8], armR: [150, 20], legL: [-14, 4], legR: [14, -4] };
const HAMMER_DOWN: Pose = { lean: 8, armL: [-20, 8], armR: [80, 10], legL: [-14, 4], legR: [14, -4] };
const CHEER: Pose = { armL: [-140, -10], armR: [140, 10], legL: [-14, 4], legR: [14, -4] };

export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const bulb = enterAt(frame, fps, M.ide, 0.25) * (1 - between(frame, fps, M.turun, M.turun + 0.4));
  const cloud = enterAt(frame, fps, M.ide + 0.3, 0.5) * (1 - between(frame, fps, M.turun + 0.3, M.turun + 0.9));
  const sketch = (i: number) => between(frame, fps, M.sketsa + i * 0.53, M.sketsa + i * 0.53 + 0.5);
  const drop = between(frame, fps, M.turun, M.turun + 0.8);
  const build = (i: number) => between(frame, fps, M.bangun + i * 1.0, M.bangun + i * 1.0 + 0.9);
  const done = between(frame, fps, M.jadi, M.jadi + 0.6);
  const guide = t >= M.turun + 0.8 ? 1 - done : 0; // sketsa yang sudah turun jadi garis bantu putus-putus
  const hari = Math.round(interpolate(t, [M.bangun, M.jadi], [1, 1000], { ...clamp, easing: (q) => q * q }));

  // stickman: duduk berpikir → jalan ke lokasi → memalu → bersorak
  const sitting = t < M.jalan;
  const walkP = between(frame, fps, M.jalan, M.bangun - 0.1);
  const sx = interpolate(walkP, [0, 1], [SIT_X, 470]);
  const hit = PALU.some((a) => t >= a && t < a + 0.18);
  let pose: Pose = walkP > 0 && walkP < 1 ? walkPose(t * 1.8) : t >= M.bangun && t < M.jadi ? (hit ? HAMMER_DOWN : HAMMER_UP) : POSES.stand;
  if (t >= M.jadi) pose = CHEER;
  const hipStand = GROUND - 176 * SCALE;

  const fade = 1 - between(frame, fps, M.pudar, M.akhir - 0.1);
  const qi = QUOTES.reduce((a, q, i) => (t >= q.at ? i : a), -1);

  return (
    <div style={{ position: "absolute", inset: 0, background: K.bg }}>
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* judul */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: 210, textAlign: "center", color: K.white, fontSize: 32, letterSpacing: "0.16em" }}>
          <Typed text="PIKIRAN JADI KENYATAAN." at={M.judul} cps={TYPE_CPS} />
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 262, textAlign: "center", ...mono, color: K.muted, fontSize: 20, letterSpacing: "0.22em", opacity: enterAt(frame, fps, 1.0, 0.5) }}>
          THINK AND GROW RICH · NAPOLEON HILL
        </div>
        {t >= M.bangun ? <div style={{ position: "absolute", left: 0, width: 1080, top: 330, textAlign: "center", ...mono, color: K.white, fontSize: 54, letterSpacing: "0.08em" }}>HARI {ribuan(hari)}</div> : null}

        {/* tanah */}
        <div style={{ position: "absolute", left: 40, top: GROUND, width: 1000, height: 6, background: K.frame }} />

        {/* awan pikiran + sketsa */}
        {cloud > 0 ? (
          <div style={{ position: "absolute", left: 0, top: 0, opacity: cloud }}>
            {[0.3, 0.6].map((q, i) => (
              <div key={i} style={{ position: "absolute", left: SIT_X + (CLOUD.cx - 200 - SIT_X) * q - (8 + i * 6), top: GROUND - 230 + (CLOUD.cy + CLOUD.h / 2 - (GROUND - 230)) * q - (8 + i * 6), width: 16 + i * 12, height: 16 + i * 12, borderRadius: 20, border: `3px solid ${K.white}`, background: "#101114" }} />
            ))}
            <div style={{ position: "absolute", left: CLOUD.cx - CLOUD.w / 2, top: CLOUD.cy - CLOUD.h / 2, width: CLOUD.w, height: CLOUD.h, borderRadius: "50%", border: `4px solid ${K.white}`, background: "#101114", boxSizing: "border-box" }} />
          </div>
        ) : null}

        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: t < M.turun + 0.8 ? enterAt(frame, fps, M.ide + 0.3, 0.5) : 0 }}>
              <g transform={`translate(${CLOUD.cx - (420 * SK) / 2 + (SITE.left - (CLOUD.cx - (420 * SK) / 2)) * drop} ${CLOUD.cy - (360 * SK) / 2 + 10 + (SITE.top - (CLOUD.cy - (360 * SK) / 2 + 10)) * drop}) scale(${SK + (1 - SK) * drop})`}>
                {PARTS.map((d, i) => (
                  <path key={i} d={d} fill="none" stroke={K.white} strokeWidth={4 / (SK + (1 - SK) * drop)} strokeDasharray="1" pathLength={1} strokeDashoffset={1 - sketch(i)} />
                ))}
              </g>
            </svg>
        {/* garis bantu putus-putus (sketsa yang sudah turun) */}
        {guide > 0 ? (
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: guide }}>
            <g transform={`translate(${SITE.left} ${SITE.top})`}>
              {PARTS.map((d, i) => (
                <path key={i} d={d} fill="none" stroke={K.dim} strokeWidth={3} strokeDasharray="10 10" />
              ))}
            </g>
          </svg>
        ) : null}
        {/* bangunan nyata: garis demi garis, lalu terisi & menyala */}
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <g transform={`translate(${SITE.left} ${SITE.top})`}>
            <rect x={20} y={120} width={380} height={240} fill="#1C1D21" opacity={done} />
            <polygon points="0,120 210,0 420,120" fill="#2E2F35" opacity={done} />
            <rect x={50} y={160} width={90} height={70} fill="#5A4A30" opacity={done} />
            <rect x={280} y={160} width={90} height={70} fill="#5A4A30" opacity={done} />
            <rect x={180} y={250} width={60} height={110} fill="#3A2C22" opacity={done} />
            <rect x={140} y={85} width={140} height={30} fill={K.gold} opacity={done} />
            <text x={210} y={108} textAnchor="middle" fontSize={22} fontFamily="JetBrains Mono" fill={K.bg} opacity={done}>
              TOKO
            </text>
            {PARTS.map((d, i) => (
              <path key={i} d={d} fill="none" stroke={K.white} strokeWidth={5} strokeLinejoin="round" strokeDasharray="1" pathLength={1} strokeDashoffset={1 - build(i)} />
            ))}
          </g>
        </svg>
        {done > 0 ? <div style={{ position: "absolute", left: SITE.left - 40, top: SITE.top + 120, width: 500, height: 260, background: "radial-gradient(ellipse at 50% 40%, rgba(243,194,122,0.18), rgba(0,0,0,0) 70%)", opacity: done }} /> : null}

        {/* stickman */}
        {sitting ? (
          <Stickman x={SIT_X} y={GROUND - 44} pose={SIT} facing={1} scale={SCALE} color={K.white} />
        ) : (
          <Stickman x={sx} y={hipStand} pose={pose} facing={1} scale={SCALE} color={t >= M.jadi ? K.gold : K.white} />
        )}
        {t >= M.bangun && t < M.jadi ? <div style={{ position: "absolute", left: sx + (hit ? 30 : 12), top: hipStand - (hit ? 70 : 150), width: 30, height: 14, background: K.muted, borderRadius: 3, transform: `rotate(${hit ? 20 : -30}deg)` }} /> : null}
        {/* bohlam ide */}
        {bulb > 0 ? (
          <div style={{ position: "absolute", left: SIT_X - 18, top: GROUND - 300, width: 36, height: 44, opacity: bulb, transform: `scale(${0.6 + 0.4 * bulb})` }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, background: K.gold, boxShadow: `0 0 30px ${K.gold}` }} />
            <div style={{ width: 16, height: 10, margin: "0 auto", background: K.muted }} />
          </div>
        ) : null}
        <Confetti x={SITE.left + 210} y={SITE.top + 40} p={t - M.jadi} />

        {/* kutipan */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: QUOTE_TOP, textAlign: "center", fontSize: 28, letterSpacing: "0.1em", lineHeight: "46px" }}>
          {qi >= 0
            ? QUOTES[qi].lines.map((l, i) => (
                <Typed key={`${qi}-${i}`} text={l} at={lineAt(QUOTES[qi].at, QUOTES[qi].lines, i)} cps={TYPE_CPS} style={{ color: qi === 3 && i === 2 ? K.gold : K.white }} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
