import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { POSES, type Pose, Stickman } from "../../../components/Stickman";
// Satu seri dengan terlahir-tampan dkk.: warna, huruf, teks ketik, konfeti, rupiah.
import { Beam, Confetti, K, mono, PhonePanel, rupiah, Typed } from "../../terlahir-tampan/parts";
import { BULANAN, lineAt, MARKERS as M, QUOTES, TYPE_CPS } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const TABLE = 1180;
const STACK_X = 540;
const JAR = { x: 330, w: 96, h: 116 };
const BILLS = [
  { x: 720, label: "SEWA" },
  { x: 820, label: "MAKAN" },
  { x: 920, label: "LAINNYA" },
];
const COIN_H = 13;
const QUOTE_TOP = 1362;
const SCALE = 0.55;

const FLICK: Pose = { lean: -6, armL: [-20, 8], armR: [100, -30], legL: [-12, 4], legR: [12, -4] };

const Coin: React.FC<{ x: number; y: number; o?: number }> = ({ x, y, o = 1 }) => (
  <div style={{ position: "absolute", left: x - 26, top: y - 9, width: 52, height: 18, borderRadius: "50%", background: K.gold, boxShadow: "inset 0 -4px 0 #9C7A2A", opacity: o }} />
);

/** Posisi koin yang terbang di lengkung dari (x0,y0) ke (x1,y1), p 0→1. */
const arc = (x0: number, y0: number, x1: number, y1: number, p: number, h = 140) => ({ x: x0 + (x1 - x0) * p, y: y0 + (y1 - y0) * p - Math.sin(Math.PI * p) * h });

export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // tumpukan 10 koin gaji
  const fallen = (i: number) => between(frame, fps, M.gaji + i * 0.1, M.gaji + i * 0.1 + 0.25);
  const firstGone = t >= M.sisih;
  const flickP = between(frame, fps, M.sisih, M.sisih + 0.45);
  const payP = (k: number) => between(frame, fps, M.bayar + k * 0.5, M.bayar + k * 0.5 + 0.4); // 3 koin per tagihan
  const monthly = BULANAN.filter((a) => t >= a + 0.25).length;
  const jarCoins = (t >= M.sisih + 0.45 ? 1 : 0) + monthly;
  const peti = between(frame, fps, M.peti, M.peti + 0.5);
  const year = t < M.montase ? 0 : Math.max(1, Math.round(interpolate(t, [M.montase, M.peti], [1, 10], clamp)));
  const tabungan = jarCoins <= 1 ? jarCoins * 500000 : interpolate(t, [M.montase, M.peti], [500000, 60000000], clamp);
  const pose: Pose = t >= M.sisih - 0.2 && t < M.sisih + 0.5 ? FLICK : t >= M.peti ? { armL: [-140, -10], armR: [140, 10], legL: [-14, 4], legR: [14, -4] } : POSES.stand;
  const fade = 1 - between(frame, fps, M.pudar, M.akhir - 0.1);
  const qi = QUOTES.reduce((a, q, i) => (t >= q.at ? i : a), -1);

  return (
    <div style={{ position: "absolute", inset: 0, background: K.bg }}>
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* judul */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: 210, textAlign: "center", color: K.white, fontSize: 34, letterSpacing: "0.2em" }}>
          <Typed text="BAYAR DIRIMU DULU." at={M.judul} cps={TYPE_CPS} />
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 262, textAlign: "center", ...mono, color: K.muted, fontSize: 20, letterSpacing: "0.18em", opacity: enterAt(frame, fps, 1.0, 0.5) }}>
          THE RICHEST MAN IN BABYLON · GEORGE S. CLASON
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 330, textAlign: "center", ...mono, color: K.white, fontSize: 56, letterSpacing: "0.08em" }}>{year ? `TAHUN ${year}` : "BULAN 1"}</div>

        {/* panel HP: gaji masuk dari sini */}
        <Beam top={[480, 600, 760]} bottom={[STACK_X - 150, STACK_X + 150, TABLE]} color={t >= M.peti ? "#FFD9A0" : "#9DB4FF"} o={0.8} />
        <PhonePanel cx={540} top={430} alert={t >= M.gaji && t < M.gaji + 1.2 ? 1 : 0}>
          {t < M.gaji ? (
            <div style={{ textAlign: "center", paddingTop: 90, ...mono, fontSize: 15, color: K.muted, letterSpacing: "0.12em" }}>MENUNGGU GAJIAN…</div>
          ) : t < M.sisih ? (
            <div style={{ padding: "30px 14px", ...mono }}>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>GAJI MASUK</div>
              <div style={{ fontSize: 22, textTransform: "none", color: K.white, marginTop: 8 }}>+{rupiah(5000000)}</div>
              <div style={{ fontSize: 15, color: K.muted, marginTop: 24 }}>= 10 KOIN</div>
            </div>
          ) : t < M.bayar ? (
            <div style={{ padding: "30px 14px", ...mono }}>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>UNTUKMU DULU</div>
              <div style={{ fontSize: 22, textTransform: "none", color: K.gold, marginTop: 8 }}>{rupiah(500000)}</div>
              <div style={{ fontSize: 15, color: K.gold, marginTop: 24 }}>10% ✓</div>
            </div>
          ) : t < M.montase ? (
            <div style={{ padding: "30px 14px", ...mono }}>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>SISA 90%</div>
              <div style={{ fontSize: 22, textTransform: "none", color: K.white, marginTop: 8 }}>{rupiah(4500000)}</div>
              <div style={{ fontSize: 15, color: K.muted, marginTop: 24 }}>→ KEBUTUHAN</div>
            </div>
          ) : (
            <div style={{ padding: "30px 14px", ...mono }}>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>TABUNGAN</div>
              <div style={{ fontSize: 20, textTransform: "none", color: K.gold, marginTop: 8 }}>{rupiah(tabungan)}</div>
              <div style={{ fontSize: 15, color: K.gold, marginTop: 24 }}>{t >= M.peti ? "10 TAHUN ✓" : "TIAP BULAN"}</div>
            </div>
          )}
        </PhonePanel>

        <div style={{ position: "absolute", inset: 0, transform: "scale(1.15)", transformOrigin: "540px 1180px" }}>
        {/* stickman di balik meja */}
        <Stickman x={200} y={TABLE + 40} pose={pose} facing={1} scale={SCALE} color={t >= M.peti ? K.gold : K.white} />

        {/* meja */}
        <div style={{ position: "absolute", left: 110, top: TABLE, width: 860, height: 20, background: "#5C4A35", borderRadius: 4 }} />
        <div style={{ position: "absolute", left: 140, top: TABLE + 20, width: 14, height: 110, background: "#4A3A2A" }} />
        <div style={{ position: "absolute", left: 926, top: TABLE + 20, width: 14, height: 110, background: "#4A3A2A" }} />

        {/* celengan → peti harta */}
        <div style={{ position: "absolute", left: JAR.x - JAR.w / 2, top: TABLE - JAR.h, width: JAR.w, height: JAR.h, border: `4px solid ${K.muted}`, borderTop: "none", borderRadius: "0 0 16px 16px", boxSizing: "border-box", overflow: "hidden", opacity: 1 - peti }}>
          {Array.from({ length: Math.min(13, jarCoins) }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 10 + (i % 2) * 8, bottom: 6 + i * 8, width: 66, height: 14, borderRadius: "50%", background: K.gold, boxShadow: "inset 0 -3px 0 #9C7A2A" }} />
          ))}
        </div>
        <div style={{ position: "absolute", left: JAR.x - 50, width: 100, top: TABLE - JAR.h - 34, textAlign: "center", ...mono, fontSize: 20, color: K.gold, opacity: 1 - peti }}>10%</div>
        {peti > 0 ? (
          <div style={{ position: "absolute", left: JAR.x - 90, top: TABLE - 120, width: 180, height: 120, transform: `scale(${0.6 + 0.4 * peti})`, transformOrigin: "50% 100%", opacity: peti }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 180, height: 50, borderRadius: "40px 40px 6px 6px", background: "#7A4A26", border: `5px solid ${K.gold}`, boxSizing: "border-box", transform: `rotate(${-18 * peti}deg)`, transformOrigin: "0% 100%" }} />
            <div style={{ position: "absolute", left: 10, top: 34, width: 160, height: 30, background: `radial-gradient(ellipse at 50% 100%, ${K.gold}, #9C7A2A)`, boxShadow: `0 0 40px rgba(217,169,60,${0.8 * peti})` }} />
            <div style={{ position: "absolute", left: 0, top: 54, width: 180, height: 66, background: "#7A4A26", border: `5px solid ${K.gold}`, boxSizing: "border-box", borderRadius: 6 }} />
            <div style={{ position: "absolute", left: 78, top: 70, width: 24, height: 28, borderRadius: 4, background: K.gold }} />
          </div>
        ) : null}
        <div style={{ position: "absolute", left: JAR.x - 160, width: 320, top: TABLE + 34, textAlign: "center", ...mono }}>
          <div style={{ fontSize: 16, color: K.muted, letterSpacing: "0.15em" }}>TABUNGANMU</div>
          <div style={{ fontSize: 26, textTransform: "none", color: K.gold, marginTop: 4 }}>{rupiah(tabungan)}</div>
        </div>

        {/* tagihan */}
        {BILLS.map((b, k) => (
          <div key={b.label} style={{ position: "absolute", left: b.x - 46, top: TABLE - 70, width: 92, height: 70, background: "#1C1D21", border: `2px solid ${K.frame}`, borderRadius: 8, textAlign: "center", ...mono, opacity: enterAt(frame, fps, M.bayar - 0.6 + k * 0.1, 0.3) }}>
            <div style={{ fontSize: 15, color: K.white, marginTop: 10, letterSpacing: "0.06em" }}>{b.label}</div>
            <div style={{ fontSize: 14, color: payP(k) >= 1 ? K.white : K.dim, marginTop: 8 }}>{payP(k) >= 1 ? "LUNAS ✓" : "..."}</div>
          </div>
        ))}

        {/* koin gaji: jatuh → 1 ke celengan → 9 ke tagihan */}
        {Array.from({ length: 10 }, (_, i) => {
          const isTop = i === 9;
          const restY = TABLE - 9 - i * COIN_H;
          if (isTop) {
            if (!firstGone) return <Coin key={i} x={STACK_X} y={interpolate(fallen(i), [0, 1], [700, restY])} o={fallen(i) > 0 ? 1 : 0} />;
            if (flickP < 1) {
              const a = arc(STACK_X, restY, JAR.x, TABLE - 60, flickP, 180);
              return <Coin key={i} x={a.x} y={a.y} />;
            }
            return null;
          }
          const k = Math.floor((8 - i) / 3); // koin teratas dulu → SEWA, MAKAN, LAINNYA
          const p = payP(k);
          if (p >= 1) return null;
          if (p > 0) {
            const a = arc(STACK_X, restY, BILLS[k].x, TABLE - 40, p, 120);
            return <Coin key={i} x={a.x} y={a.y} />;
          }
          return <Coin key={i} x={STACK_X} y={interpolate(fallen(i), [0, 1], [700, restY])} o={fallen(i) > 0 ? 1 : 0} />;
        })}
        {/* koin bulanan selama montase */}
        {BULANAN.map((a) => {
          const p = (t - a) / 0.25;
          if (p < 0 || p > 1) return null;
          const c = arc(STACK_X, TABLE - 20, JAR.x, TABLE - 60, p, 160);
          return <Coin key={a} x={c.x} y={c.y} />;
        })}
        <Confetti x={JAR.x} y={TABLE - 140} p={t - M.peti} />
        </div>

        {/* kutipan */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: QUOTE_TOP, textAlign: "center", fontSize: 28, letterSpacing: "0.1em", lineHeight: "46px" }}>
          {qi >= 0
            ? QUOTES[qi].lines.map((l, i) => (
                <Typed key={`${qi}-${i}`} text={l} at={lineAt(QUOTES[qi].at, QUOTES[qi].lines, i)} cps={TYPE_CPS} style={{ color: (qi === 1 && i === 0) || (qi === 4 && i === 1) ? K.gold : K.white }} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
