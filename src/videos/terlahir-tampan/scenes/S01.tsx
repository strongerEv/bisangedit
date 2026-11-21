import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { mixPose, POSES, type Pose, Stickman, walkPose } from "../../../components/Stickman";
import { Beam, Confetti, K, mono, PhonePanel, ribuan, rupiah, Typed } from "../parts";
import { MARKERS as M, TYPE_CPS } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Diorama: dua kamar bersebelahan (gaya referensi "Same evening. Different choice.").
const BOX = { l: 120, r: 960, t: 960, b: 1380 };
const MID = 540;
const SCALE = 0.5;
const FLOOR = BOX.b;
const STAND_Y = FLOOR - 176 * SCALE;
const PANEL_TOP = 560;
const LEFT_X = 330;
const RIGHT_X = 750;

const SIT: Pose = { lean: 16, head: 30, armL: [-6, 4], armR: [8, 4], legL: [82, -82], legR: [96, -96] };
const FLEX: Pose = { lean: -4, head: -10, armL: [-120, -70], armR: [110, 75], legL: [-14, 4], legR: [14, -4] };

/** Stickman berbaring (kepala ke kiri, ke bantal). */
const Lying: React.FC<{ x: number; y: number; jitter?: number; breathe?: number }> = ({ x, y, jitter = 0, breathe = 0 }) => (
  <div style={{ position: "absolute", left: x + jitter, top: y, transform: `rotate(-90deg) translateX(${breathe}px)`, transformOrigin: "0 0" }}>
    <Stickman x={0} y={0} pose={{ armL: [-10, 8], armR: [14, -6], legL: [-4, 2], legR: [4, -2] }} scale={SCALE} color={K.white} />
  </div>
);

const Window: React.FC<{ x: number; y: number; w: number; h: number; sun: number }> = ({ x, y, w, h, sun }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, border: `6px solid #2E2F35`, boxSizing: "border-box", background: `linear-gradient(180deg, #121A2E 0%, #2A2F4A ${60 - sun * 30}%, #6A4A3A 100%)`, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: w * 0.55, top: h * (0.95 - 0.35 * sun), width: 26, height: 26, borderRadius: 13, background: "#F3C27A", boxShadow: "0 0 20px rgba(243,194,122,0.7)", opacity: 0.4 + 0.6 * sun }} />
    <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 5, background: "#2E2F35", transform: "translateX(-50%)" }} />
  </div>
);

export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // ---------- jam & hari ----------
  let min = 0;
  if (t >= M.jam0605) min = 5;
  if (t >= M.jam0610) min = 10;
  if (t >= M.q1 - 0.2) min = 15 + Math.floor((t - (M.q1 - 0.2)) / 1.2);
  if (t >= M.jam0645) min = Math.min(59, 45 + Math.floor((t - M.jam0645) / 0.17));
  const hour = t >= M.jam0700 ? 7 : 6;
  if (t >= M.jam0700) min = 0;
  const clock = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")} AM`;
  const hari = Math.round(interpolate(t, [M.hari, M.hari + 0.9], [1, 1825], { ...clamp, easing: (x) => 1 - Math.pow(1 - x, 3) }));
  const clockKick = Math.max(...[M.jam0605, M.jam0610, M.jam0645, M.jam0700].map((a) => (t >= a && t < a + 0.25 ? 1 - (t - a) / 0.25 : 0)));

  // ---------- alarm ----------
  const ringing = [M.alarm1, M.alarm2, M.alarm3].some((a, i) => t >= a && t < [M.tunda1, M.tunda2, M.tunda3][i]);
  const ring = ringing ? 0.55 + 0.45 * Math.round((Math.sin(t * 28) + 1) / 2) : 0;

  // ---------- stickman kanan ----------
  const sitP = between(frame, fps, M.duduk, M.duduk + 0.5);
  const standP = between(frame, fps, M.berdiri, M.berdiri + 0.35);
  const walking = (t > M.keCermin && t < M.keCermin + 0.8) || (t > M.jalan && t < M.diPintu);
  const rx = interpolate(t, [M.berdiri, M.keCermin, M.keCermin + 0.8, M.jalan, M.diPintu], [700, 700, 800, 800, 915], clamp);
  const flex = between(frame, fps, M.tampan, M.tampan + 0.3) * (1 - between(frame, fps, M.bukanKaya - 0.1, M.bukanKaya + 0.2));
  const slump = between(frame, fps, M.bukanKaya, M.bukanKaya + 0.35) * (1 - between(frame, fps, M.jalan - 0.3, M.jalan));
  let rPose: Pose = walking ? walkPose(t * 1.7) : POSES.stand;
  rPose = mixPose(rPose, FLEX, flex);
  rPose = mixPose(rPose, POSES.slump, slump);
  const goneR = between(frame, fps, M.diPintu - 0.1, M.diPintu + 0.15);
  const doorOpen = between(frame, fps, M.diPintu - 0.5, M.diPintu - 0.2) * (1 - between(frame, fps, M.pintu - 0.15, M.pintu));
  const jitter = ringing ? Math.sin(t * 60) * 3 : 0;
  const bag = t > M.jalan - 0.3;

  // ---------- panel ----------
  const saldo = interpolate(t, [M.saldoMulai, M.sepuluhM], [9_999_000_000, 10_000_000_000], { ...clamp, easing: (x) => 1 - Math.pow(1 - x, 2) });
  const hit10 = t >= M.sepuluhM;
  const leftScreen = t < M.saldoMulai ? "tidur" : "saldo";
  const rightScreen = t < M.duduk ? "alarm" : t < M.q3 ? "jadwal" : t < M.q4 ? "cermin" : t < M.jam0645 ? "miskin" : "jadwal";
  const kayaFlash = rightScreen === "miskin" ? (Math.floor(t * 4) % 2 ? 1 : 0.55) : 0;
  const sparkle = t >= M.tampan ? 0.5 + 0.5 * Math.sin((t - M.tampan) * 10) : 0;
  const chart = between(frame, fps, M.saldoMulai, M.sepuluhM);

  // ---------- teks atas & kutipan ----------
  const q1 = t < M.q2 - 0.15 ? 1 : 0;
  const fade = 1 - between(frame, fps, M.pudar, M.akhir - 0.1);
  const zzz = (k: number) => ((t * 0.6 + k / 3) % 1);

  return (
    <div style={{ position: "absolute", inset: 0, background: K.bg }}>
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* judul + jam */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: 280, textAlign: "center", color: K.white, fontSize: 34, letterSpacing: "0.22em" }}>
          <Typed text="PAGI YANG SAMA." at={M.judul} cps={TYPE_CPS} style={{ color: t >= M.judul2 ? K.muted : K.white }} />
          <Typed text="NASIB BERBEDA." at={M.judul2} cps={TYPE_CPS} style={{ marginTop: 8 }} />
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 380, textAlign: "center", ...mono, color: K.white, fontSize: 64, letterSpacing: "0.08em", transform: `scale(${1 + 0.06 * clockKick})`, opacity: enterAt(frame, fps, 0, 0.4) }}>
          {clock}
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 470, textAlign: "center", ...mono, color: K.muted, fontSize: 22, letterSpacing: "0.25em" }}>HARI KERJA {ribuan(hari)}</div>

        {/* sorot cahaya panel → kamar */}
        <Beam top={[LEFT_X - 60, LEFT_X + 60, PANEL_TOP + 330]} bottom={[LEFT_X - 150, LEFT_X + 60, 1290]} color="#9DB4FF" o={1} />
        <Beam top={[RIGHT_X - 60, RIGHT_X + 60, PANEL_TOP + 330]} bottom={[RIGHT_X - 40, RIGHT_X + 120, 1300]} color={ringing || kayaFlash ? "#FF6A6A" : "#FFD9A0"} o={1} />

        {/* ===== diorama ===== */}
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <polygon points={`80,935 ${BOX.l},${BOX.t} ${BOX.l},${BOX.b} 80,1430`} fill={K.side} />
          <polygon points={`1000,935 ${BOX.r},${BOX.t} ${BOX.r},${BOX.b} 1000,1430`} fill={K.side} />
          <rect x={BOX.l} y={BOX.t} width={BOX.r - BOX.l} height={BOX.b - BOX.t} fill={K.wall} />
          <polygon points={`${BOX.l},${BOX.b} ${BOX.r},${BOX.b} 1000,1430 80,1430`} fill={K.floor} />
          <polygon points={`80,935 1000,935 ${BOX.r},${BOX.t} ${BOX.l},${BOX.t}`} fill="#18191C" />
          <rect x={MID - 8} y={BOX.t} width={16} height={BOX.b - BOX.t + 30} fill={K.divider} />
        </svg>
        {/* cahaya lampu kamar kanan (hangat), kamar kiri biru temaram */}
        <div style={{ position: "absolute", left: MID + 8, top: BOX.t, width: BOX.r - MID - 8, height: BOX.b - BOX.t, background: `radial-gradient(circle at 75% 15%, rgba(255,196,120,${0.14 * (1 - goneR * 0.6)}), rgba(0,0,0,0) 65%)` }} />
        <div style={{ position: "absolute", left: BOX.l, top: BOX.t, width: MID - BOX.l - 8, height: BOX.b - BOX.t, background: "radial-gradient(circle at 40% 70%, rgba(120,150,255,0.10), rgba(0,0,0,0) 60%)" }} />

        {/* kamar kiri: si kaya */}
        <Window x={170} y={1010} w={130} h={110} sun={between(frame, fps, 0, 14)} />
        <div style={{ position: "absolute", left: 380, top: 1015, width: 100, height: 76, border: `6px solid ${K.gold}`, boxSizing: "border-box", background: "#22201A" }}>
          <div style={{ ...mono, color: K.gold, fontSize: 22, textAlign: "center", lineHeight: "64px" }}>$</div>
        </div>
        <div style={{ position: "absolute", left: 140, top: 1215, width: 20, height: 160, background: "#3A3036", borderRadius: "8px 8px 0 0" }} />
        <div style={{ position: "absolute", left: 150, top: 1310, width: 360, height: 62, background: "#2E2F36", borderRadius: 6 }} />
        <div style={{ position: "absolute", left: 158, top: 1268, width: 74, height: 28, background: "#D9D9DE", borderRadius: 14 }} />
        <Lying x={300} y={1296} breathe={Math.sin(t * 2.4) * 2} />
        <div style={{ position: "absolute", left: 255, top: 1272, width: 255, height: 46, background: `linear-gradient(180deg, ${K.gold}, #9C7A2A)`, borderRadius: "18px 8px 6px 6px" }} />
        {[0, 1, 2].map((k) => (
          <div key={k} style={{ position: "absolute", left: 210 + zzz(k) * 50, top: 1240 - zzz(k) * 90, ...mono, color: K.muted, fontSize: 22 + k * 6, opacity: Math.sin(Math.PI * zzz(k)) }}>
            z
          </div>
        ))}

        {/* kamar kanan: si tampan */}
        <Window x={600} y={1010} w={110} h={100} sun={between(frame, fps, 0, 14)} />
        {/* cermin */}
        <div style={{ position: "absolute", left: 790, top: 1035, width: 72, height: 140, borderRadius: 40, border: `5px solid ${K.muted}`, background: "linear-gradient(135deg, #2B3038 0%, #3E4552 45%, #2B3038 60%)", boxSizing: "border-box" }}>
          {t >= M.tampan ? <div style={{ position: "absolute", right: 6, top: 10, color: "white", fontSize: 22, opacity: sparkle }}>✦</div> : null}
        </div>
        {/* pintu */}
        <div style={{ position: "absolute", left: 885, top: 1150, width: 68, height: 230, background: doorOpen > 0 ? "#FFE3B0" : "#1A1410", border: `5px solid #2E2F35`, boxSizing: "border-box" }}>
          <div style={{ position: "absolute", inset: 0, background: "#4A3628", transformOrigin: "right center", transform: `scaleX(${1 - 0.85 * doorOpen})` }}>
            <div style={{ position: "absolute", left: 8, top: 110, width: 9, height: 9, borderRadius: 5, background: K.gold }} />
          </div>
        </div>
        {/* kasur kecil + meja */}
        <div style={{ position: "absolute", left: 565, top: 1316, width: 195, height: 56, background: "#2E2F36", borderRadius: 6 }} />
        <div style={{ position: "absolute", left: 572, top: 1284, width: 52, height: 24, background: "#C9C9CE", borderRadius: 12 }} />
        <div style={{ position: "absolute", left: 768, top: 1322, width: 50, height: 58, background: "#3A3B41" }} />
        <div style={{ position: "absolute", left: 780, top: 1310, width: 26, height: 10, borderRadius: 3, background: ring > 0 ? `rgba(229,38,43,${ring})` : "#55565C", boxShadow: ring > 0 ? `0 0 ${30 * ring}px rgba(229,38,43,0.8)` : undefined }} />
        {/* stickman kanan (berbaring: selimut digambar sesudahnya) */}
        {t < M.duduk + 0.25 ? (
          <div style={{ opacity: 1 - sitP * 3 }}>
            <Lying x={680} y={1300} jitter={jitter} />
            <div style={{ position: "absolute", left: 640, top: 1290, width: 120, height: 30, background: "#5A5B62", borderRadius: "14px 6px 4px 4px" }} />
          </div>
        ) : null}
        {t >= M.duduk ? <div style={{ position: "absolute", left: 630, top: 1296, width: 90, height: 22, background: "#5A5B62", borderRadius: "10px 6px 4px 4px", opacity: Math.min(1, sitP * 3) }} /> : null}
        {t >= M.duduk && t < M.berdiri + 0.2 ? (
          <div style={{ opacity: Math.min(1, sitP * 2) * (1 - standP) }}>
            <Stickman x={728} y={1300} pose={SIT} facing={1} scale={SCALE} color={K.white} />
          </div>
        ) : null}
        {t >= M.berdiri ? (
          <div style={{ opacity: standP * (1 - goneR) }}>
            <Stickman x={rx} y={STAND_Y} pose={rPose} facing={1} scale={SCALE} color={K.white} />
            {bag ? <div style={{ position: "absolute", left: rx + 18, top: STAND_Y - 28, width: 26, height: 30, borderRadius: 5, background: K.red, opacity: enterAt(frame, fps, M.jalan - 0.3, 0.3) }} /> : null}
          </div>
        ) : null}

        {/* ===== panel melayang ===== */}
        <PhonePanel cx={LEFT_X} top={PANEL_TOP} alert={hit10 ? 1 : 0}>
          {leftScreen === "tidur" ? (
            <div style={{ textAlign: "center", paddingTop: 62, ...mono, color: K.muted }}>
              <div style={{ fontSize: 70, color: K.white, lineHeight: 1 }}>☾</div>
              <div style={{ fontSize: 15, letterSpacing: "0.12em", marginTop: 24 }}>JANGAN GANGGU</div>
              <div style={{ fontSize: 13, letterSpacing: "0.12em", marginTop: 8, color: K.dim }}>SAMPAI SIANG</div>
            </div>
          ) : (
            <div style={{ padding: "26px 14px", ...mono }}>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>SALDO</div>
              <div style={{ fontSize: 17, textTransform: "none", color: hit10 ? K.gold : K.white, marginTop: 8, transform: `scale(${hit10 ? 1 + 0.08 * Math.max(0, 1 - (t - M.sepuluhM) * 3) : 1})`, transformOrigin: "left center" }}>
                {rupiah(saldo)}
              </div>
              <svg width={160} height={110} style={{ marginTop: 30 }}>
                <path d="M 0 100 C 50 96, 90 80, 120 50 S 150 10, 160 4" fill="none" stroke={K.white} strokeWidth={3} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - chart} />
              </svg>
            </div>
          )}
        </PhonePanel>

        <PhonePanel cx={RIGHT_X} top={PANEL_TOP} alert={ringing ? ring : rightScreen === "miskin" ? kayaFlash : 0}>
          {rightScreen === "alarm" ? (
            <div style={{ textAlign: "center", paddingTop: 40, ...mono }}>
              <div style={{ fontSize: 46, color: K.white, transform: `translateX(${jitter}px)` }}>{clock.slice(0, 5)}</div>
              <div style={{ display: "inline-block", marginTop: 14, padding: "6px 16px", borderRadius: 20, background: ringing ? K.red : "#2A2B30", color: "white", fontSize: 15, letterSpacing: "0.12em" }}>ALARM</div>
              <div style={{ position: "absolute", left: 22, right: 22, bottom: 30, height: 48, borderRadius: 24, border: `3px solid ${K.dim}`, color: K.muted, fontSize: 16, letterSpacing: "0.15em", lineHeight: "42px" }}>TUNDA</div>
              {[M.tunda1, M.tunda2, M.tunda3].map((a) => {
                const p = between(frame, fps, a, a + 0.35);
                return p > 0 && p < 1 ? <div key={a} style={{ position: "absolute", left: 98 - 30, bottom: 30 + 24 - 30, width: 60, height: 60, borderRadius: 30, border: "3px solid white", opacity: 1 - p, transform: `scale(${0.5 + p})` }} /> : null;
              })}
            </div>
          ) : rightScreen === "jadwal" ? (
            <div style={{ textAlign: "center", paddingTop: 36, ...mono }}>
              <div style={{ fontSize: 14, color: K.muted, letterSpacing: "0.2em" }}>SENIN</div>
              <div style={{ fontSize: 44, color: K.white, marginTop: 4 }}>{clock.slice(0, 5)}</div>
              <div style={{ margin: "26px 14px 0", padding: "12px 10px", borderRadius: 14, background: "#1C1D21", textAlign: "left", fontSize: 13, color: K.white, letterSpacing: "0.06em" }}>
                <span style={{ color: K.red }}>●</span> MASUK KERJA
                <div style={{ color: K.muted, marginTop: 4 }}>07:00</div>
              </div>
            </div>
          ) : rightScreen === "cermin" ? (
            <div style={{ textAlign: "center", paddingTop: 30, ...mono }}>
              <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto", borderRadius: 60, background: "#23262C", border: `3px solid ${K.muted}` }}>
                <div style={{ position: "absolute", left: 30, top: 24, width: 60, height: 60, borderRadius: 30, background: K.white }} />
                <div style={{ position: "absolute", left: 28, top: 92, width: 64, height: 40, borderRadius: "30px 30px 0 0", background: K.white }} />
                {[
                  [8, 10, 26],
                  [96, 20, 20],
                  [90, 86, 16],
                ].map(([x, y, s], i) => (
                  <div key={i} style={{ position: "absolute", left: x, top: y, color: "white", fontSize: s, opacity: 0.4 + 0.6 * Math.abs(Math.sin((t - M.tampan) * 6 + i)) }}>
                    ✦
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 22, color: K.white, marginTop: 30, letterSpacing: "0.12em" }}>TAMPAN ✓</div>
            </div>
          ) : (
            <div style={{ padding: "26px 14px", ...mono }}>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>SALDO</div>
              <div style={{ fontSize: 30, textTransform: "none", color: K.white, marginTop: 8 }}>{rupiah(12500)}</div>
              <div style={{ marginTop: 40, fontSize: 24, color: K.red, letterSpacing: "0.12em", opacity: kayaFlash > 0.6 ? 1 : 0.5 }}>KAYA ✗</div>
            </div>
          )}
        </PhonePanel>
        <Confetti x={LEFT_X} y={PANEL_TOP + 120} p={t - M.sepuluhM} />

        {/* ===== kutipan ===== */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: 1470, textAlign: "center", color: K.white, fontSize: 32, letterSpacing: "0.12em", lineHeight: "50px" }}>
          {q1 ? (
            <>
              <Typed text="TERKADANG AKU MERASA" at={M.q1} cps={TYPE_CPS} />
              <Typed text="TIDAK INGIN PERGI BEKERJA," at={M.q1 + 20 / TYPE_CPS} cps={TYPE_CPS} />
            </>
          ) : (
            <>
              <Typed text="TAPI KEMUDIAN AKU INGAT..." at={M.q2} cps={TYPE_CPS} style={{ color: t >= M.q3 ? K.muted : K.white }} />
              <Typed text="AKU TERLAHIR TAMPAN," at={M.q3} cps={TYPE_CPS} />
              <Typed text="BUKAN KAYA." at={M.q4} cps={TYPE_CPS} style={{ color: K.red }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
