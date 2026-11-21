import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { mixPose, POSES, type Pose, Stickman, walkPose } from "../../../components/Stickman";
// Satu seri dengan terlahir-tampan / kesabaran-bisnis: panel, sorot cahaya, konfeti, teks ketik.
import { Beam, Confetti, K, mono, PhonePanel, ribuan, rupiah, Typed } from "../../terlahir-tampan/parts";
import { lineAt, MARKERS as M, TAHAP, TYPE_CPS } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Tangga 4 anak tangga, naik dari kiri bawah ke kanan atas.
const FLOOR = 1300;
const STEP_W = 205;
const RISE = 115;
const step = (i: number) => {
  const left = 130 + STEP_W * i;
  return { left, right: left + STEP_W, top: FLOOR - RISE * (i + 1), cx: left + STEP_W / 2 };
};
const PANEL = { cx: 250, top: 470 };
const QUOTE_TOP = 1350;

const SIT_OLD: Pose = { lean: 14, head: 10, armL: [30, -30], armR: [40, -40], legL: [82, -82], legR: [96, -96] };
const CHEER_SIT: Pose = { lean: 0, head: -10, armL: [-140, -10], armR: [140, 10], legL: [82, -82], legR: [96, -96] };

export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const k = TAHAP.reduce((a, s, i) => (t >= s.at ? i : a), -1); // tahap aktif (0..3), -1 = belum naik
  const end = t >= M.akhir1;

  // ---------- posisi stickman ----------
  // titik pijak: lantai (sebelum naik) lalu tengah tiap anak tangga
  const spots = [{ x: 70, y: FLOOR }, ...TAHAP.map((_, i) => ({ x: step(i).cx - (i === 3 ? 30 : 0), y: step(i).top }))];
  const climbP = k >= 0 ? between(frame, fps, TAHAP[k].at, TAHAP[k].at + 0.5) : 0;
  const from = spots[k + 1 - (climbP < 1 && k >= 0 ? 1 : 0)];
  const to = spots[k + 1];
  const p = k >= 0 ? climbP : 0;
  const walkIn = interpolate(t, [M.masuk, M.t1 - 0.05], [-80, 70], clamp);
  const fx = k < 0 ? walkIn : from.x + (to.x - from.x) * p;
  const fy = k < 0 ? FLOOR : from.y + (to.y - from.y) * p - Math.sin(Math.PI * p) * 50;
  const scale = interpolate(t, [M.t2, M.t2 + 0.5], [0.34, 0.5], clamp);
  const hipY = fy - 176 * scale;
  const moving = (k < 0 && t > M.masuk && t < M.t1) || (k >= 0 && climbP > 0 && climbP < 1);
  const seated = k === 3 && climbP >= 1;
  const cheer = between(frame, fps, M.putus + 0.1, M.putus + 0.4);
  let pose: Pose = moving ? walkPose(t * 1.8) : POSES.stand;
  if (k === 2 && !moving) pose = POSES.point;
  const sitPose = mixPose(SIT_OLD, CHEER_SIT, cheer);
  const seatX = step(3).cx - 30;
  const seatY = step(3).top - 44 * 0.5;

  // ---------- panel ----------
  const coins = [3.6, 4.4, 5.2].filter((a) => t >= a).length;
  const gajiFlash = t >= M.gaji && t < M.gaji + 0.9 ? (Math.floor(t * 8) % 2 ? 1 : 0.5) : 0;
  const pelajaran = Math.round(interpolate(t, [M.gaji + 0.8, M.t3], [1, 240], clamp));
  const pesanan = Math.round(interpolate(t, [M.t3 + 0.6, M.t4], [0, 1250], { ...clamp, easing: (x) => x * x }));
  const bebas = t >= M.putus;

  // ---------- teks ----------
  const fade = 1 - between(frame, fps, M.pudar, M.akhir - 0.1);
  const headOut = between(frame, fps, M.akhir1 - 0.3, M.akhir1);
  const kick = k >= 0 && t < TAHAP[k].at + 0.25 ? 1 - (t - TAHAP[k].at) / 0.25 : 0;

  // ---------- rantai ----------
  const brk = Math.max(0, t - M.putus);
  const chainFrom = { x: seatX + 40, y: step(3).top - 6 };
  const chainTo = { x: seatX + 120, y: step(3).top - 14 };

  return (
    <div style={{ position: "absolute", inset: 0, background: K.bg }}>
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* judul */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: 220, textAlign: "center", color: K.white, fontSize: 32, letterSpacing: "0.2em", opacity: 1 - headOut }}>
          <Typed text="4 TAHAP MEMBANGUN KEKAYAAN" at={M.judul} cps={TYPE_CPS} />
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 220, textAlign: "center", color: K.white, fontSize: 32, letterSpacing: "0.16em" }}>
          <Typed text="DI TAHAP MANA KAMU SEKARANG?" at={M.akhir1} cps={TYPE_CPS} />
        </div>
        {k >= 0 ? (
          <>
            <div style={{ position: "absolute", left: 0, width: 1080, top: 300, textAlign: "center", ...mono, color: K.white, fontSize: 58, letterSpacing: "0.08em", transform: `scale(${1 + 0.06 * kick})` }}>
              TAHAP {k + 1}/4
            </div>
            <div style={{ position: "absolute", left: 0, width: 1080, top: 380, textAlign: "center", ...mono, color: K.muted, fontSize: 22, letterSpacing: "0.25em" }}>USIA {TAHAP[k].usia}</div>
          </>
        ) : null}

        {/* matahari senja di puncak (tahap 4) */}
        <div style={{ position: "absolute", left: 960 - 160, top: 560 - 160, width: 320, height: 320, borderRadius: 160, background: "radial-gradient(circle, rgba(243,170,90,0.35) 0%, rgba(243,170,90,0) 65%)", opacity: between(frame, fps, M.t4, M.t4 + 1) }} />
        <div style={{ position: "absolute", left: 960 - 40, top: 560 - 40 + (1 - between(frame, fps, M.t4, M.t4 + 1.2)) * 60, width: 80, height: 80, borderRadius: 40, background: "#F3B06A", opacity: 0.85 * between(frame, fps, M.t4, M.t4 + 0.6) }} />

        {/* sorot cahaya panel → stickman */}
        <Beam top={[PANEL.cx - 60, PANEL.cx + 60, PANEL.top + 330]} bottom={[fx - 90, fx + 90, Math.min(FLOOR, hipY + 60)]} color={bebas ? "#FFD9A0" : "#9DB4FF"} o={k >= 0 && !end ? 1 : 0.3} />

        {/* lantai */}
        <div style={{ position: "absolute", left: 40, top: FLOOR, width: 1000, height: 6, background: K.frame }} />

        {/* anak tangga */}
        {TAHAP.map((s, i) => {
          const st = step(i);
          const active = k === i || end;
          const lit = k >= i;
          return (
            <React.Fragment key={i}>
              <div style={{ position: "absolute", left: st.left, top: st.top, width: STEP_W, height: FLOOR - st.top, background: lit ? "#1F2025" : "#16171A", borderLeft: `2px solid ${K.divider}` }} />
              <div style={{ position: "absolute", left: st.left, top: st.top - 4, width: STEP_W, height: 8, background: active ? "#8A8B90" : lit ? "#4A4B51" : K.frame }} />
              {active ? <div style={{ position: "absolute", left: st.left, top: st.top - 120, width: STEP_W, height: 120, background: "radial-gradient(ellipse at 50% 100%, rgba(255,210,150,0.16), rgba(0,0,0,0) 70%)" }} /> : null}
              <div style={{ position: "absolute", left: st.left, width: STEP_W, top: st.top + 22, textAlign: "center", ...mono }}>
                <div style={{ fontSize: 28, color: lit ? K.white : K.dim }}>{s.usia}</div>
                <div style={{ fontSize: 15, letterSpacing: "0.18em", color: lit ? K.muted : K.dim, marginTop: 6 }}>{s.nama}</div>
              </div>
            </React.Fragment>
          );
        })}

        {/* properti tahap 1: celengan + koin */}
        {(() => {
          const st = step(0);
          return (
            <>
              <div style={{ position: "absolute", left: st.left + 130, top: st.top - 40, width: 54, height: 38, borderRadius: "50%", background: "#E7A1A8", opacity: 0.9 }}>
                <div style={{ position: "absolute", left: 20, top: -4, width: 14, height: 5, borderRadius: 2, background: K.bg }} />
                <div style={{ position: "absolute", right: -6, top: 12, width: 10, height: 12, borderRadius: 4, background: "#E7A1A8" }} />
              </div>
              {[3.6, 4.4, 5.2].map((a) => {
                const q = Math.max(0, Math.min(1, (t - a + 0.5) / 0.5));
                return t > a - 0.5 && t < a + 0.2 ? <div key={a} style={{ position: "absolute", left: st.left + 150, top: st.top - 120 + q * 80, width: 18, height: 18, borderRadius: 9, background: K.gold, opacity: 1 - Math.max(0, (t - a) / 0.2) }} /> : null;
              })}
            </>
          );
        })()}

        {/* properti tahap 2: papan "KANTOR = SEKOLAH" */}
        {(() => {
          const st = step(1);
          const o = enterAt(frame, fps, M.t2teks + 1.0, 0.4) * (1 - between(frame, fps, M.t3 - 0.3, M.t3));
          return (
            <div style={{ position: "absolute", left: st.right + 20, top: st.top - 330, width: 190, opacity: o, transform: `translateY(${(1 - o) * 14}px)` }}>
              <div style={{ position: "absolute", left: 40, top: -30, width: 2, height: 30, background: K.dim }} />
              <div style={{ position: "absolute", left: 150, top: -30, width: 2, height: 30, background: K.dim }} />
              <div style={{ border: `3px solid ${K.frame}`, background: "#141519", borderRadius: 8, padding: "12px 8px", textAlign: "center", ...mono, color: K.white, fontSize: 18, letterSpacing: "0.08em", lineHeight: "26px" }}>
                <svg width={40} height={26} viewBox="0 0 40 26" style={{ display: "block", margin: "0 auto 6px" }}>
                  <polygon points="20,2 38,10 20,18 2,10" fill={K.white} />
                  <rect x={11} y={13} width={18} height={8} rx={2} fill={K.white} />
                  <line x1={34} y1={11} x2={34} y2={22} stroke={K.red} strokeWidth={2} />
                </svg>
                KANTOR =<br />SEKOLAH
              </div>
            </div>
          );
        })()}

        {/* properti tahap 3: lapak usaha */}
        {(() => {
          const st = step(2);
          const o = enterAt(frame, fps, M.t3 + 0.2, 0.4);
          return (
            <div style={{ position: "absolute", left: st.left + 105, top: st.top - 150, width: 96, height: 150, opacity: o }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 96, height: 26, background: `repeating-linear-gradient(90deg, ${K.red} 0 16px, ${K.white} 16px 32px)`, borderRadius: "6px 6px 0 0" }} />
              <div style={{ position: "absolute", left: 4, top: 26, width: 5, height: 70, background: K.dim }} />
              <div style={{ position: "absolute", right: 4, top: 26, width: 5, height: 70, background: K.dim }} />
              <div style={{ position: "absolute", left: 0, top: 96, width: 96, height: 54, background: "#5C4A35" }} />
              {[0, 1].map((i) => (
                <div key={i} style={{ position: "absolute", left: 14 + i * 36, top: 70, width: 28, height: 26, background: "#7A6348", border: "2px solid #5C4A35", boxSizing: "border-box" }} />
              ))}
            </div>
          );
        })()}

        {/* properti tahap 4: kursi santai + rantai */}
        {(() => {
          const st = step(3);
          const o = enterAt(frame, fps, M.t4 + 0.2, 0.4);
          return (
            <div style={{ opacity: o }}>
              <div style={{ position: "absolute", left: seatX - 34, top: seatY, width: 70, height: 8, background: "#A8693A" }} />
              <div style={{ position: "absolute", left: seatX - 34, top: seatY - 60, width: 8, height: st.top - seatY + 60, background: "#A8693A" }} />
              <div style={{ position: "absolute", left: seatX + 28, top: seatY, width: 8, height: st.top - seatY, background: "#A8693A" }} />
              {/* rantai + bola pemberat */}
              {Array.from({ length: 6 }, (_, i) => {
                const q = i / 5;
                const bx = chainFrom.x + (chainTo.x - chainFrom.x) * q;
                const by = chainFrom.y + (chainTo.y - chainFrom.y) * q + Math.sin(Math.PI * q) * 10;
                const dir = i < 3 ? -1 : 1;
                const lx = bx + dir * (60 + i * 25) * brk;
                const ly = by - 180 * brk + 900 * brk * brk;
                return <div key={i} style={{ position: "absolute", left: lx - 9, top: ly - 6, width: 18, height: 12, borderRadius: 6, border: `3px solid ${K.muted}`, boxSizing: "border-box", opacity: brk > 0 ? Math.max(0, 1 - brk / 0.9) : 1, transform: `rotate(${i % 2 ? 90 : 0}deg)` }} />;
              })}
              <div style={{ position: "absolute", left: chainTo.x - 4, top: chainTo.y - 18, width: 34, height: 34, borderRadius: 17, background: "#3A3B41", opacity: 1 - between(frame, fps, M.putus, M.putus + 0.6), transform: `translateX(${brk * 120}px)` }} />
            </div>
          );
        })()}

        {/* stickman */}
        {seated ? (
          <Stickman x={seatX} y={seatY} pose={sitPose} facing={1} scale={0.5} color={K.white} />
        ) : (
          <Stickman x={fx} y={hipY} pose={pose} facing={1} scale={scale} color={K.white} />
        )}
        {k === 1 && !moving ? <div style={{ position: "absolute", left: fx + 26, top: hipY - 6, width: 34, height: 26, borderRadius: 4, background: K.red }} /> : null}

        {/* panel HP */}
        <PhonePanel cx={PANEL.cx} top={PANEL.top} alert={gajiFlash}>
          {k < 0 ? (
            <div style={{ textAlign: "center", paddingTop: 80, ...mono }}>
              <div style={{ fontSize: 60, color: K.white }}>4</div>
              <div style={{ fontSize: 14, color: K.muted, letterSpacing: "0.18em", marginTop: 10 }}>TAHAP</div>
            </div>
          ) : end ? (
            <div style={{ textAlign: "center", paddingTop: 70, ...mono }}>
              <div style={{ fontSize: 15, color: K.muted, letterSpacing: "0.18em" }}>KAMU DI</div>
              <div style={{ fontSize: 40, color: K.white, marginTop: 12 }}>TAHAP ?</div>
            </div>
          ) : k === 0 ? (
            <div style={{ padding: "24px 14px", ...mono }}>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>UANG JAJAN</div>
              <div style={{ fontSize: 26, textTransform: "none", color: K.white, marginTop: 8 }}>{rupiah(10000)}</div>
              {["NABUNG", "JAJAN", "SISA Rp2.000"].map((s, i) => (
                <div key={s} style={{ fontSize: 16, color: K.white, marginTop: i ? 10 : 22, opacity: coins > i ? 1 : 0.15, textTransform: i === 2 ? "none" : undefined }}>
                  {i < 2 ? "✓ " : "= "}
                  {s}
                </div>
              ))}
            </div>
          ) : k === 1 ? (
            <div style={{ padding: "24px 14px", ...mono }}>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>GAJI MASUK</div>
              <div style={{ fontSize: 22, textTransform: "none", color: K.white, marginTop: 8, opacity: t >= M.gaji ? 1 : 0.2 }}>+{rupiah(5000000)}</div>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em", marginTop: 34 }}>PELAJARAN KE-</div>
              <div style={{ fontSize: 40, color: K.white, marginTop: 6 }}>{t >= M.gaji + 0.8 ? pelajaran : "-"}</div>
            </div>
          ) : k === 2 ? (
            <div style={{ padding: "24px 14px", ...mono }}>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>PESANAN</div>
              <div style={{ fontSize: 40, color: K.white, marginTop: 8 }}>{ribuan(pesanan)}</div>
              <svg width={160} height={100} style={{ marginTop: 24 }}>
                <path d="M 0 96 C 50 92, 90 70, 120 40 S 150 8, 160 2" fill="none" stroke={K.white} strokeWidth={3} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - between(frame, fps, M.t3 + 0.6, M.t4)} />
              </svg>
            </div>
          ) : (
            <div style={{ textAlign: "center", paddingTop: 60, ...mono }}>
              <div style={{ fontSize: 14, color: K.muted, letterSpacing: "0.18em" }}>STATUS</div>
              <div style={{ fontSize: bebas ? 40 : 22, color: bebas ? K.gold : K.muted, marginTop: 16 }}>{bebas ? "BEBAS ✓" : "TERIKAT UANG"}</div>
            </div>
          )}
        </PhonePanel>
        <Confetti x={seatX} y={step(3).top - 120} p={t - M.putus} />

        {/* teks tahap */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: QUOTE_TOP, textAlign: "center", fontSize: 28, letterSpacing: "0.1em", lineHeight: "46px", opacity: 1 - headOut }}>
          {k >= 0
            ? TAHAP[k].lines.map((l, i) => <Typed key={`${k}-${i}`} text={l} at={lineAt(TAHAP[k].teks, TAHAP[k].lines, i)} cps={TYPE_CPS} style={{ color: i === 0 ? K.white : "#C9CACE" }} />)
            : null}
        </div>
        {end ? (
          <div style={{ position: "absolute", left: 0, width: 1080, top: QUOTE_TOP + 10, textAlign: "center", ...mono, fontSize: 20, letterSpacing: "0.1em", lineHeight: "34px", color: K.muted, opacity: enterAt(frame, fps, M.akhir1 + 0.6, 0.5) }}>
            DARI BUKU &quot;NAK, BELAJAR SOAL UANG
            <br />
            ADALAH BEKAL KEHIDUPAN&quot;
            <br />
            JEONG SEON YONG
          </div>
        ) : null}
      </div>
    </div>
  );
};
