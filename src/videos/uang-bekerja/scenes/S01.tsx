import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { POSES, type Pose, Stickman, runPose } from "../../../components/Stickman";
// Satu seri dengan terlahir-tampan dkk.: panel HP, sorot cahaya, teks ketik.
import { Beam, K, mono, PhonePanel, rupiah, Typed } from "../../terlahir-tampan/parts";
import { KOIN_KANAN, KOIN_KIRI, lineAt, MARKERS as M, QUOTES, TYPE_CPS } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const GROUND = 1270;
const SCALE = 0.5;
const WHEEL = { x: 300, y: 1090, r: 150 };
const PANEL_TOP = 420;
const LX = 300;
const RX = 780;
const QUOTE_TOP = 1360;
const MACHINES = [
  { x: 640, label: "SAHAM" },
  { x: 770, label: "SEWA" },
  { x: 900, label: "BISNIS" },
];

/** Jam dinding: 08:00 → 17:00 (kerja) → 21:00 (malam) → 06:00. */
const clockAt = (t: number) => {
  const h = interpolate(t, [0, M.capek, M.malam, M.akhir], [8, 17, 21, 30], clamp);
  const hh = Math.floor(h) % 24;
  const mm = Math.floor((h % 1) * 60);
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
};

const SLEEP: Pose = { armL: [-10, 8], armR: [14, -6], legL: [-4, 2], legR: [4, -2] };

export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const working = t < M.capek;
  const night = between(frame, fps, M.malam, M.malam + 1.0);
  const wheelRot = interpolate(t, [0, M.capek, M.capek + 0.8], [0, 1400, 1460], { ...clamp, easing: (q) => q });
  const leftIncome = KOIN_KIRI.filter((a) => t >= a + 0.45).length * 25000;
  const rightIncome = KOIN_KANAN.filter((a) => t >= a + 0.6).length * 75000;
  const glow = between(frame, fps, M.mesin, M.mesin + 0.3) * (1 - between(frame, fps, M.malam, M.malam + 0.5));
  const fade = 1 - between(frame, fps, M.pudar, M.akhir - 0.1);
  const qi = QUOTES.reduce((a, q, i) => (t >= q.at ? i : a), -1);
  const sleepingL = t >= M.malam + 0.4;
  const zz = (k: number) => (t * 0.6 + k / 3) % 1;

  return (
    <div style={{ position: "absolute", inset: 0, background: K.bg }}>
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* judul */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: 210, textAlign: "center", color: K.white, fontSize: 32, letterSpacing: "0.18em" }}>
          <Typed text="UANG YANG BEKERJA." at={M.judul} cps={TYPE_CPS} />
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 262, textAlign: "center", ...mono, color: K.muted, fontSize: 20, letterSpacing: "0.2em", opacity: enterAt(frame, fps, 1.0, 0.5) }}>
          RICH DAD POOR DAD · ROBERT T. KIYOSAKI
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 320, textAlign: "center", ...mono, color: K.white, fontSize: 54, letterSpacing: "0.08em" }}>{clockAt(t)}</div>

        {/* langit malam */}
        <div style={{ position: "absolute", left: 0, top: 800, width: 1080, height: GROUND - 800, background: `linear-gradient(180deg, rgba(20,30,70,${0.5 * night}) 0%, rgba(0,0,0,0) 100%)` }} />
        <div style={{ position: "absolute", left: 520, top: 830, width: 46, height: 46, borderRadius: 23, boxShadow: `-10px 6px 0 0 rgba(242,242,242,${night})` }} />

        <Beam top={[LX - 60, LX + 60, PANEL_TOP + 330]} bottom={[LX - 160, LX + 160, 1150]} color={working ? "#FFD9A0" : "#FF6A6A"} o={0.9} />
        <Beam top={[RX - 60, RX + 60, PANEL_TOP + 330]} bottom={[RX - 170, RX + 170, 1180]} color={K.gold} o={0.9} />

        {/* tanah */}
        <div style={{ position: "absolute", left: 40, top: GROUND, width: 1000, height: 6, background: K.frame }} />
        <div style={{ position: "absolute", left: 538, top: 900, width: 4, height: GROUND - 900, background: K.divider }} />

        {/* KIRI: roda hamster "GAJI" */}
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <line x1={WHEEL.x} y1={WHEEL.y} x2={WHEEL.x - 70} y2={GROUND} stroke={K.frame} strokeWidth={10} />
          <line x1={WHEEL.x} y1={WHEEL.y} x2={WHEEL.x + 70} y2={GROUND} stroke={K.frame} strokeWidth={10} />
          <g transform={`rotate(${wheelRot} ${WHEEL.x} ${WHEEL.y})`}>
            <circle cx={WHEEL.x} cy={WHEEL.y} r={WHEEL.r} fill="none" stroke={K.muted} strokeWidth={8} />
            <circle cx={WHEEL.x} cy={WHEEL.y} r={WHEEL.r - 14} fill="none" stroke={K.dim} strokeWidth={3} strokeDasharray="10 14" />
            {Array.from({ length: 8 }, (_, i) => (
              <line key={i} x1={WHEEL.x} y1={WHEEL.y} x2={WHEEL.x + Math.cos((i * Math.PI) / 4) * WHEEL.r} y2={WHEEL.y + Math.sin((i * Math.PI) / 4) * WHEEL.r} stroke={K.dim} strokeWidth={3} />
            ))}
          </g>
          <circle cx={WHEEL.x} cy={WHEEL.y} r={22} fill={K.frame} />
          <text x={WHEEL.x} y={WHEEL.y + 7} fill={K.white} fontSize={18} textAnchor="middle" fontFamily="JetBrains Mono">
            GAJI
          </text>
        </svg>
        {sleepingL ? (
          <div style={{ position: "absolute", left: 300, top: GROUND - 8, transform: "rotate(-90deg)", transformOrigin: "0 0" }}>
            <Stickman x={0} y={0} pose={SLEEP} scale={SCALE} color={K.white} />
          </div>
        ) : (
          <Stickman x={WHEEL.x} y={WHEEL.y + WHEEL.r - 10 - 88} pose={working ? runPose(t * 2.6) : POSES.slump} facing={1} scale={SCALE} color={K.white} />
        )}
        {sleepingL
          ? [0, 1, 2].map((k) => (
              <div key={k} style={{ position: "absolute", left: 170 + zz(k) * 40, top: GROUND - 60 - zz(k) * 80, ...mono, color: K.muted, fontSize: 20 + k * 6, opacity: Math.sin(Math.PI * zz(k)) }}>
                z
              </div>
            ))
          : null}
        {/* koin dari roda → naik ke panel */}
        {KOIN_KIRI.map((a) => {
          const p = (t - a) / 0.45;
          if (p < 0 || p > 1) return null;
          const x = WHEEL.x + (LX - WHEEL.x) * p;
          const y = WHEEL.y - WHEEL.r + (PANEL_TOP + 300 - (WHEEL.y - WHEEL.r)) * p - Math.sin(Math.PI * p) * 60;
          return <div key={a} style={{ position: "absolute", left: x - 12, top: y - 12, width: 24, height: 24, borderRadius: 12, background: K.gold, opacity: 1 - p * 0.5 }} />;
        })}

        {/* KANAN: hammock + mesin uang */}
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <line x1={600} y1={GROUND} x2={600} y2={1040} stroke="#5C4A35" strokeWidth={10} />
          <line x1={980} y1={GROUND} x2={980} y2={1040} stroke="#5C4A35" strokeWidth={10} />
          <path d="M600 1050 Q790 1170 980 1050" fill="none" stroke={K.muted} strokeWidth={6} />
          <path d="M610 1056 Q790 1160 970 1056" fill="none" stroke={K.dim} strokeWidth={3} strokeDasharray="6 8" />
        </svg>
        <div style={{ position: "absolute", left: 690, top: 1100, transform: "rotate(-80deg)", transformOrigin: "0 0" }}>
          <Stickman x={0} y={0} pose={{ armL: [-150, 120], armR: [150, -120], legL: [-30, 30], legR: [10, -10] }} scale={SCALE} color={K.white} />
        </div>
        {night > 0.5
          ? [0, 1, 2].map((k) => (
              <div key={k} style={{ position: "absolute", left: 640 + zz(k) * 40, top: 1020 - zz(k) * 80, ...mono, color: K.muted, fontSize: 20 + k * 6, opacity: Math.sin(Math.PI * zz(k)) }}>
                z
              </div>
            ))
          : null}
        {MACHINES.map((m, i) => (
          <div key={m.label} style={{ position: "absolute", left: m.x - 50, top: GROUND - 74, width: 100, height: 74, background: "#1C1D21", border: `3px solid ${glow > 0 ? `rgba(217,169,60,${0.4 + 0.6 * glow})` : K.frame}`, borderRadius: 8, boxShadow: glow > 0 ? `0 0 ${24 * glow}px rgba(217,169,60,0.5)` : undefined, textAlign: "center", ...mono }}>
            <div style={{ fontSize: 15, color: K.white, letterSpacing: "0.08em", marginTop: 12 }}>{m.label}</div>
            <div style={{ width: 40, height: 8, margin: "10px auto 0", borderRadius: 4, background: K.gold, opacity: 0.5 + 0.5 * Math.abs(Math.sin(t * 6 + i)) }} />
          </div>
        ))}
        {/* "uang" kecil yang bekerja: berjalan bolak-balik antar mesin */}
        {[0, 1, 2, 3].map((i) => {
          const ph = (t * 0.35 + i / 4) % 1;
          const x = 600 + ph * 340;
          const hop = Math.abs(Math.sin(t * 9 + i)) * 8;
          return (
            <div key={i} style={{ position: "absolute", left: x - 11, top: GROUND - 26 - hop, width: 22, height: 22, borderRadius: 11, background: K.gold, opacity: enterAt(frame, fps, 1.0 + i * 0.15, 0.3) }}>
              <div style={{ position: "absolute", left: 4, top: 20, width: 3, height: 8 + hop * 0.3, background: K.gold }} />
              <div style={{ position: "absolute", left: 14, top: 20, width: 3, height: 8 + (8 - hop) * 0.3, background: K.gold }} />
              <div style={{ position: "absolute", left: 6, top: 5, ...mono, fontSize: 12, color: K.bg }}>$</div>
            </div>
          );
        })}
        {/* koin dari mesin → naik ke panel kanan */}
        {KOIN_KANAN.map((a, i) => {
          const p = (t - a) / 0.6;
          if (p < 0 || p > 1) return null;
          const mx = MACHINES[i % 3].x;
          const x = mx + (RX - mx) * p;
          const y = GROUND - 80 + (PANEL_TOP + 300 - (GROUND - 80)) * p - Math.sin(Math.PI * p) * 40;
          return <div key={a} style={{ position: "absolute", left: x - 12, top: y - 12, width: 24, height: 24, borderRadius: 12, background: K.gold, opacity: 1 - p * 0.5 }} />;
        })}

        {/* panel HP */}
        <PhonePanel cx={LX} top={PANEL_TOP} alert={working ? 0 : 1}>
          <div style={{ padding: "26px 14px", ...mono }}>
            <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>PENGHASILAN</div>
            <div style={{ fontSize: 20, textTransform: "none", color: K.white, marginTop: 8 }}>{rupiah(leftIncome)}</div>
            <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.12em", marginTop: 34 }}>SEKARANG</div>
            <div style={{ fontSize: 22, textTransform: "none", color: working ? K.white : K.red, marginTop: 6 }}>{working ? "+Rp25.000" : "Rp0"}</div>
            <div style={{ fontSize: 13, color: working ? K.muted : K.red, letterSpacing: "0.1em", marginTop: 6 }}>{working ? "PER KOIN" : "BERHENTI"}</div>
          </div>
        </PhonePanel>
        <PhonePanel cx={RX} top={PANEL_TOP} alert={0}>
          <div style={{ padding: "26px 14px", ...mono }}>
            <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>PENGHASILAN PASIF</div>
            <div style={{ fontSize: 20, textTransform: "none", color: K.gold, marginTop: 8 }}>{rupiah(rightIncome)}</div>
            <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.12em", marginTop: 34 }}>JALAN</div>
            <div style={{ fontSize: 30, color: K.white, marginTop: 6 }}>24 JAM</div>
            <div style={{ fontSize: 13, color: K.gold, letterSpacing: "0.1em", marginTop: 6 }}>{night > 0.5 ? "SAAT TIDUR ✓" : "TANPA DIKEJAR"}</div>
          </div>
        </PhonePanel>

        {/* kutipan */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: QUOTE_TOP, textAlign: "center", fontSize: 28, letterSpacing: "0.1em", lineHeight: "46px" }}>
          {qi >= 0
            ? QUOTES[qi].lines.map((l, i) => (
                <Typed key={`${qi}-${i}`} text={l} at={lineAt(QUOTES[qi].at, QUOTES[qi].lines, i)} cps={TYPE_CPS} style={{ color: qi === 1 && i === 1 ? K.red : (qi === 2 && i === 1) || qi === 3 || (qi === 4 && i === 1) ? K.gold : K.white }} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
