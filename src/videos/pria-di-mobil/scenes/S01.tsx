import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { type Pose, Stickman } from "../../../components/Stickman";
// Satu seri dengan terlahir-tampan dkk.: panel HP, sorot cahaya, teks ketik.
import { Beam, K, mono, PhonePanel, rupiah, Typed } from "../../terlahir-tampan/parts";
import { lineAt, MARKERS as M, QUOTES, TYPE_CPS } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const WALK_TOP = 1150; // trotoar
const ROAD_TOP = 1185;
const ROAD_BOT = 1300;
const SCALE = 0.5;
const HIP_Y = WALK_TOP + 20 - 176 * SCALE;
const HEAD_Y = HIP_Y - 210 * SCALE; // pusat kepala
const PANEL = { cx: 250, top: 470 };
const QUOTE_TOP = 1350;
const SPECT = [640, 790, 940];
const CAR_W = 380;

const STAND_L: Pose = { head: -6, armL: [-18, 8], armR: [16, -8], legL: [-12, 4], legR: [12, -4] };
const PHONE: Pose = { head: 28, armL: [-20, 8], armR: [-40, -110], legL: [-12, 4], legR: [12, -4] };

/** Mobil sport tampak samping (menghadap kanan). `driver` = kepala + lengan di jendela; `tag` = aksesori kepala. */
export const Car: React.FC<{ x: number; y: number; w: number; wheel?: number; driver?: boolean; tag?: "cap" | "bun"; style?: React.CSSProperties }> = ({ x, y, w, wheel = 0, driver, tag, style }) => (
  <svg viewBox="0 0 300 110" width={w} height={(w * 110) / 300} style={{ position: "absolute", left: x, top: y, overflow: "visible", ...style }}>
    <ellipse cx={150} cy={100} rx={140} ry={7} fill="#000" opacity={0.5} />
    <path d="M10 78 Q12 60 40 56 L95 52 Q120 28 160 26 L205 28 Q235 32 262 54 L285 60 Q296 64 294 78 L294 84 Q292 90 285 90 L15 90 Q8 90 8 84 Z" fill={K.red} />
    <path d="M108 52 Q126 34 158 32 L198 34 Q220 38 238 54 Z" fill="#0E1014" />
    <line x1={170} y1={33} x2={170} y2={53} stroke={K.red} strokeWidth={4} />
    <path d="M20 70 L280 70" stroke="#B51D21" strokeWidth={3} />
    <rect x={282} y={64} width={10} height={6} rx={2} fill={K.gold} />
    <rect x={8} y={64} width={8} height={6} rx={2} fill="#7A1012" />
    {driver ? (
      <>
        <circle cx={142} cy={44} r={11} fill={K.white} />
        {tag === "cap" ? <path d="M130 38 L154 38 L154 33 Q142 26 130 33 Z M130 38 L122 39" fill="#55565C" stroke="#55565C" strokeWidth={2} /> : null}
        {tag === "bun" ? <circle cx={142} cy={30} r={6} fill={K.white} /> : null}
        <path d="M150 58 L182 56 L190 66" fill="none" stroke={K.white} strokeWidth={5} strokeLinecap="round" />
      </>
    ) : null}
    {[70, 232].map((cx) => (
      <g key={cx} transform={`rotate(${wheel} ${cx} 88)`}>
        <circle cx={cx} cy={88} r={20} fill="#16171A" />
        <circle cx={cx} cy={88} r={10} fill="#8A8B90" />
        <rect x={cx - 2} y={74} width={4} height={10} fill="#8A8B90" />
      </g>
    ))}
  </svg>
);

/** Awan pikiran: elips + dua bulatan ekor menuju (tx, ty). */
const Bubble: React.FC<{ cx: number; cy: number; w: number; h: number; tx: number; ty: number; p: number; children?: React.ReactNode }> = ({ cx, cy, w, h, tx, ty, p, children }) =>
  p <= 0 ? null : (
    <div style={{ position: "absolute", left: 0, top: 0, opacity: Math.min(1, p * 1.5) }}>
      {[0.35, 0.68].map((q, i) => (
        <div key={i} style={{ position: "absolute", left: tx + (cx - tx) * q - (6 + i * 5), top: ty + (cy + h / 2 - ty) * q - (6 + i * 5), width: 12 + i * 10, height: 12 + i * 10, borderRadius: 20, border: `3px solid ${K.white}`, background: "#101114", transform: `scale(${Math.min(1, p * 2)})` }} />
      ))}
      <div style={{ position: "absolute", left: cx - w / 2, top: cy - h / 2, width: w, height: h, borderRadius: "50%", border: `4px solid ${K.white}`, background: "#101114", boxSizing: "border-box", transform: `scale(${0.5 + 0.5 * Math.min(1, p)})`, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );

// Gedung latar (deterministik)
const BUILDINGS = [
  [40, 880, 120],
  [170, 800, 100],
  [280, 920, 130],
  [420, 780, 110],
  [540, 860, 150],
  [700, 820, 120],
  [830, 900, 100],
  [940, 840, 100],
];

export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // ---------- mobil ----------
  const carPop = enterAt(frame, fps, M.mobil, 0.35);
  const cx = interpolate(t, [M.jalan1, M.berhenti, M.jalan2, M.jalan2 + 2.2], [200, 400, 400, 1400], {
    ...clamp,
    easing: (q) => q * q * (3 - 2 * q),
  });
  const wheel = cx * 2.2;
  const carY = ROAD_BOT - 10 - (CAR_W * 110) / 300;
  const bounce = t >= M.mobil && t < M.mobil + 0.4 ? Math.sin(((t - M.mobil) / 0.4) * Math.PI) * -30 : 0;

  // ---------- awan pikiran ----------
  const khayal = between(frame, fps, M.khayal, M.khayal + 0.35);
  const pecah = between(frame, fps, M.scratch, M.scratch + 0.2);
  const aw = [M.awan1, M.awan2, M.awan3].map((a) => between(frame, fps, a, a + 0.3) * (1 - between(frame, fps, M.qD + 1.6, M.qD + 2.0)));

  // ---------- panel ----------
  const tabungan = interpolate(t, [M.kuras, M.mobil - 0.2], [150_000_000, 0], clamp);
  const kagum = t < M.scratch ? (t >= M.khayal ? "999+" : "-") : "0";
  const scratchShake = t >= M.scratch && t < M.scratch + 0.35 ? Math.sin(t * 90) * 8 : 0;

  const qi = QUOTES.reduce((a, q, i) => (t >= q.at ? i : a), -1);
  const fade = 1 - between(frame, fps, M.pudar, M.akhir - 0.1);

  return (
    <div style={{ position: "absolute", inset: 0, background: K.bg }}>
      <div style={{ position: "absolute", inset: 0, opacity: fade, transform: `translateX(${scratchShake}px)` }}>
        {/* judul */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: 220, textAlign: "center", color: K.white, fontSize: 32, letterSpacing: "0.16em" }}>
          <Typed text="PARADOKS PRIA DI DALAM MOBIL" at={M.judul} cps={TYPE_CPS} />
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 285, textAlign: "center", ...mono, color: K.muted, fontSize: 20, letterSpacing: "0.22em", opacity: enterAt(frame, fps, 1.1, 0.5) }}>
          THE PSYCHOLOGY OF MONEY · MORGAN HOUSEL
        </div>

        {/* gedung + jalan */}
        {BUILDINGS.map(([x, top, w], i) => (
          <div key={i} style={{ position: "absolute", left: x, top, width: w, height: WALK_TOP - top, background: "#101114", borderTop: `2px solid #1C1D21` }}>
            {Array.from({ length: Math.floor((WALK_TOP - top - 30) / 46) * 3 }, (_, j) => {
              const lit = (i * 7 + j * 3) % 5 === 0;
              return <div key={j} style={{ position: "absolute", left: 14 + (j % 3) * ((w - 28) / 3), top: 20 + Math.floor(j / 3) * 46, width: (w - 28) / 3 - 10, height: 22, background: lit ? "#5A4A30" : "#1A1B1F" }} />;
            })}
          </div>
        ))}
        <div style={{ position: "absolute", left: 0, top: WALK_TOP, width: 1080, height: ROAD_TOP - WALK_TOP, background: "#2A2B30" }} />
        <div style={{ position: "absolute", left: 0, top: ROAD_TOP - 4, width: 1080, height: 4, background: K.frame }} />
        <div style={{ position: "absolute", left: 0, top: ROAD_TOP, width: 1080, height: ROAD_BOT - ROAD_TOP, background: "#141518" }} />
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 20 + i * 125, top: ROAD_BOT - 22, width: 70, height: 6, background: "rgba(255,255,255,0.25)" }} />
        ))}

        <Beam top={[PANEL.cx - 60, PANEL.cx + 60, PANEL.top + 330]} bottom={[cx - 160, cx + 60, 1200]} color={t >= M.scratch ? "#FF6A6A" : "#FFD9A0"} o={t >= M.mobil ? 1 : 0.3} />

        {/* penonton di trotoar */}
        {SPECT.map((x, i) => (
          <React.Fragment key={i}>
            <Stickman x={x} y={HIP_Y} pose={i === 2 ? PHONE : STAND_L} facing={-1} scale={SCALE} color={K.white} />
            {i === 0 ? <div style={{ position: "absolute", left: x - 34, top: HEAD_Y - 30, width: 58, height: 16, borderRadius: "16px 16px 0 0", background: "#55565C" }} /> : null}
            {i === 0 ? <div style={{ position: "absolute", left: x - 50, top: HEAD_Y - 16, width: 30, height: 5, background: "#55565C" }} /> : null}
            {i === 1 ? <div style={{ position: "absolute", left: x - 13, top: HEAD_Y - 46, width: 26, height: 26, borderRadius: 13, background: K.white }} /> : null}
            {i === 2 ? <div style={{ position: "absolute", left: x - 34, top: HIP_Y - 92, width: 14, height: 22, borderRadius: 3, background: "#3A4A6A", border: `2px solid ${K.frame}` }} /> : null}
          </React.Fragment>
        ))}

        {/* mobil + pengemudi */}
        {t >= M.mobil ? <Car x={cx - CAR_W / 2} y={carY + bounce} w={CAR_W} wheel={wheel} driver style={{ transform: `scale(${0.6 + 0.4 * carPop})`, transformOrigin: "50% 100%", opacity: carPop }} /> : null}

        {/* khayalan pengemudi: semua kagum */}
        <Bubble cx={cx - 10} cy={860} w={320} h={160} tx={cx - 20} ty={carY + 20} p={khayal * (1 - pecah)}>
          <div style={{ display: "flex", justifyContent: "center", gap: 26, marginTop: 34 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ position: "relative", width: 40, height: 40, borderRadius: 20, background: K.white }}>
                <div style={{ position: "absolute", left: 6, top: -30, color: K.red, fontSize: 26, opacity: 0.6 + 0.4 * Math.sin(t * 8 + i) }}>♥</div>
              </div>
            ))}
          </div>
          <div style={{ ...mono, textAlign: "center", color: K.white, fontSize: 22, marginTop: 12, letterSpacing: "0.12em" }}>WOW!</div>
        </Bubble>
        {pecah > 0 && pecah < 1
          ? Array.from({ length: 10 }, (_, i) => {
              const a = (i / 10) * Math.PI * 2;
              return <div key={i} style={{ position: "absolute", left: cx - 10 + Math.cos(a) * 160 * pecah, top: 860 + Math.sin(a) * 90 * pecah, width: 16, height: 6, background: K.white, opacity: 1 - pecah, transform: `rotate(${a}rad)` }} />;
            })
          : null}

        {/* pikiran penonton: diri mereka sendiri di mobil itu */}
        <Bubble cx={600} cy={790} w={230} h={140} tx={SPECT[0] - 6} ty={HEAD_Y - 40} p={aw[0]}>
          <Car x={22} y={40} w={186} driver tag="cap" />
          <div style={{ position: "absolute", left: 0, right: 0, top: 12, textAlign: "center", ...mono, fontSize: 18, color: K.gold, letterSpacing: "0.12em" }}>AKU</div>
        </Bubble>
        <Bubble cx={800} cy={610} w={230} h={140} tx={SPECT[1]} ty={HEAD_Y - 52} p={aw[1]}>
          <Car x={22} y={40} w={186} driver tag="bun" />
          <div style={{ position: "absolute", left: 0, right: 0, top: 12, textAlign: "center", ...mono, fontSize: 18, color: K.gold, letterSpacing: "0.12em" }}>AKU</div>
        </Bubble>
        <Bubble cx={955} cy={790} w={150} h={110} tx={SPECT[2] - 10} ty={HEAD_Y - 40} p={aw[2]}>
          <div style={{ ...mono, textAlign: "center", color: K.muted, fontSize: 22, marginTop: 38, letterSpacing: "0.08em" }}>SCROLL…</div>
        </Bubble>

        {/* panel HP */}
        <PhonePanel cx={PANEL.cx} top={PANEL.top} alert={t >= M.qD ? 1 : 0}>
          {t < M.mobil ? (
            <div style={{ padding: "24px 14px", ...mono }}>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>TABUNGAN</div>
              <div style={{ fontSize: 19, textTransform: "none", color: tabungan < 1 ? K.red : K.white, marginTop: 8 }}>{rupiah(tabungan)}</div>
            </div>
          ) : t < M.qB ? (
            <div style={{ padding: "24px 14px", ...mono }}>
              <div style={{ fontSize: 18, color: K.white }}>MOBIL BARU ✓</div>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em", marginTop: 26 }}>CICILAN</div>
              <div style={{ fontSize: 26, color: K.white, marginTop: 6 }}>60 BULAN</div>
              <div style={{ fontSize: 15, textTransform: "none", color: K.muted, marginTop: 6 }}>{rupiah(8500000)}/bln</div>
            </div>
          ) : t < M.qD ? (
            <div style={{ textAlign: "center", paddingTop: 40, ...mono }}>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.12em" }}>YANG KAGUM</div>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.12em" }}>PADAMU</div>
              <div style={{ fontSize: 58, color: kagum === "0" ? K.red : K.white, marginTop: 20, transform: `translateX(${scratchShake}px)` }}>{kagum}</div>
            </div>
          ) : (
            <div style={{ padding: "30px 14px", ...mono }}>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>CICILAN</div>
              <div style={{ fontSize: 22, color: K.white, marginTop: 10 }}>SISA</div>
              <div style={{ fontSize: 34, color: K.red, marginTop: 4 }}>59 BULAN</div>
            </div>
          )}
        </PhonePanel>

        {/* kutipan */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: QUOTE_TOP, textAlign: "center", fontSize: 28, letterSpacing: "0.1em", lineHeight: "46px" }}>
          {qi >= 0
            ? QUOTES[qi].lines.map((l, i) => (
                <Typed key={`${qi}-${i}`} text={l} at={lineAt(QUOTES[qi].at, QUOTES[qi].lines, i)} cps={TYPE_CPS} style={{ color: qi === 3 && i === 2 ? K.red : K.white }} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
