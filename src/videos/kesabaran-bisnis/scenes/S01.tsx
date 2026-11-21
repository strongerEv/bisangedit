import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { mixPose, POSES, type Pose, Stickman, walkPose } from "../../../components/Stickman";
// Satu seri dengan terlahir-tampan: pakai ulang panel, sorot cahaya, konfeti, dan teks ketik.
import { Beam, Confetti, K, mono, PhonePanel, ribuan, rupiah, Typed } from "../../terlahir-tampan/parts";
import { MARKERS as M, TYPE_CPS } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Tata letak digeser ke atas (4 baris kutipan + watermark di y 1650).
const BOX = { l: 120, r: 960, t: 860, b: 1280 };
const MID = 540;
const SCALE = 0.5;
const STAND_Y = BOX.b - 176 * SCALE;
const SIT_Y = 1236;
const PANEL_TOP = 470;
const LEFT_X = 330;
const RIGHT_X = 750;
const QUOTE_TOP = 1368;

const PACK_A: Pose = { armL: [60, 30], armR: [80, 20], legL: [-12, 4], legR: [12, -4] };
const PACK_B: Pose = { lean: 8, armL: [90, 10], armR: [100, 0], legL: [-12, 4], legR: [12, -4] };
const HEAD_HOLD: Pose = { lean: 6, head: 15, armL: [-150, 120], armR: [150, -120], legL: [-12, 4], legR: [12, -4] };
const SLAM: Pose = { lean: 18, head: 20, armL: [70, -10], armR: [80, -10], legL: [-14, 4], legR: [14, -4] };
const SIT: Pose = { lean: 6, armL: [70, -40], armR: [80, -50], legL: [82, -82], legR: [96, -96] };
const SIT_OLD: Pose = { lean: 30, head: 30, armL: [60, -20], armR: [70, -30], legL: [82, -82], legR: [96, -96] };
const OLD_STAND: Pose = { lean: 24, head: 25, armL: [-10, 6], armR: [40, -20], legL: [-8, 10], legR: [12, 4] };

// Grafik omzet toko (160×110): naik-turun, berhenti tepat sebelum naik.
const CHART = [
  [0, 104],
  [22, 100],
  [42, 92],
  [58, 98],
  [78, 86],
  [94, 94],
  [110, 84],
  [124, 90],
] as const;
const chartPath = (p: number) => {
  const n = Math.max(1, Math.round(p * (CHART.length - 1)));
  return CHART.slice(0, n + 1)
    .map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`)
    .join(" ");
};

export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // ---------- tahun & usia ----------
  const kanan = t >= M.tahunKanan;
  const yearL = t < M.tahun2 ? 1 : t < M.tahun3 ? 2 : 3;
  const yearR = Math.max(1, Math.round(interpolate(t, [M.tahunKanan, M.tahun40], [1, 40], { ...clamp, easing: (x) => Math.pow(x, 1.25) })));
  const year = kanan ? yearR : yearL;
  const age = kanan ? 27 + yearR : 24 + yearL;
  const kick = Math.max(...[M.tahun2, M.tahun3, M.tahunKanan].map((a) => (t >= a && t < a + 0.25 ? 1 - (t - a) / 0.25 : 0)));

  // ---------- stickman ----------
  const closed = t >= M.tutup;
  const walking = t > M.jalan && t < M.duduk - 0.1;
  const x = interpolate(t, [M.jalan, M.jalan + 0.6, M.duduk - 0.1], [330, 540, 690], clamp);
  const packing = t >= M.kemas && t < M.pusing;
  const headHold = between(frame, fps, M.pusing, M.pusing + 0.3) * (1 - between(frame, fps, M.tutup - 0.15, M.tutup));
  const slam = between(frame, fps, M.tutup - 0.15, M.tutup) * (1 - between(frame, fps, M.jalan - 0.3, M.jalan));
  let pose: Pose = walking ? walkPose(t * 1.7) : packing ? (Math.floor(t * 3) % 2 ? PACK_A : PACK_B) : POSES.stand;
  pose = mixPose(pose, HEAD_HOLD, headHold);
  pose = mixPose(pose, SLAM, slam);
  const seated = t >= M.duduk && t < M.berdiri;
  const aging = between(frame, fps, M.tahunKanan, M.tahun40);
  const typing = seated && t < M.pensiun ? Math.sin(t * 22) * 6 : 0;
  const sitPose = mixPose(SIT, SIT_OLD, aging);
  const typingPose: Pose = { ...sitPose, armR: [sitPose.armR[0] + typing, sitPose.armR[1]] };
  const standOld = between(frame, fps, M.berdiri, M.berdiri + 0.4);

  // ---------- lingkungan ----------
  const boxes = Math.min(5, Math.floor(Math.max(0, t - M.kemas) / 0.7) + (t >= M.kemas ? 1 : 0));
  const signFlip = between(frame, fps, M.tutup - 0.05, M.tutup + 0.2);
  const ghost = between(frame, fps, M.hantu, M.hantu + 0.6);
  const calYear = kanan ? 2028 + yearR : 2029;
  const dayNight = kanan && t < M.tahun40 ? (Math.floor(t * 6) % 2 ? 1 : 0.35) : 1;
  const plant = interpolate(yearR, [1, 40], [0.4, 1.4], clamp);
  const pens = t >= M.pensiun;
  const fade = 1 - between(frame, fps, M.pudar, M.akhir - 0.1);

  return (
    <div style={{ position: "absolute", inset: 0, background: K.bg }}>
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* judul + tahun */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: 220, textAlign: "center", color: K.white, fontSize: 34, letterSpacing: "0.22em" }}>
          <Typed text="WAKTU YANG SAMA." at={M.judul} cps={TYPE_CPS} style={{ color: t >= M.judul2 ? K.muted : K.white }} />
          <Typed text="KESABARAN BERBEDA." at={M.judul2} cps={TYPE_CPS} style={{ marginTop: 8 }} />
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 318, textAlign: "center", ...mono, color: K.white, fontSize: 58, letterSpacing: "0.08em", transform: `scale(${1 + 0.06 * kick})`, opacity: enterAt(frame, fps, 0, 0.4) }}>
          TAHUN KE-{year}
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 398, textAlign: "center", ...mono, color: K.muted, fontSize: 22, letterSpacing: "0.25em" }}>USIA {age}</div>

        <Beam top={[LEFT_X - 60, LEFT_X + 60, PANEL_TOP + 330]} bottom={[LEFT_X - 120, LEFT_X + 160, 1200]} color={closed ? "#FF6A6A" : "#FFD9A0"} o={kanan ? 0.4 : 1} />
        <Beam top={[RIGHT_X - 60, RIGHT_X + 60, PANEL_TOP + 330]} bottom={[RIGHT_X - 100, RIGHT_X + 100, 1200]} color="#9DB4FF" o={t >= M.duduk ? 1 : 0.4} />

        {/* ===== diorama ===== */}
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <polygon points={`80,835 ${BOX.l},${BOX.t} ${BOX.l},${BOX.b} 80,1330`} fill={K.side} />
          <polygon points={`1000,835 ${BOX.r},${BOX.t} ${BOX.r},${BOX.b} 1000,1330`} fill={K.side} />
          <rect x={BOX.l} y={BOX.t} width={BOX.r - BOX.l} height={BOX.b - BOX.t} fill={K.wall} />
          <polygon points={`${BOX.l},${BOX.b} ${BOX.r},${BOX.b} 1000,1330 80,1330`} fill={K.floor} />
          <polygon points={`80,835 1000,835 ${BOX.r},${BOX.t} ${BOX.l},${BOX.t}`} fill="#18191C" />
          {/* dinding tengah dengan pintu penghubung */}
          <rect x={MID - 8} y={BOX.t} width={16} height={1060 - BOX.t} fill={K.divider} />
          <rect x={MID - 14} y={1060} width={28} height={8} fill={K.frame} />
        </svg>
        <div style={{ position: "absolute", left: BOX.l, top: BOX.t, width: MID - BOX.l - 8, height: BOX.b - BOX.t, background: `radial-gradient(circle at 55% 30%, rgba(255,196,120,${closed ? 0.04 : 0.13}), rgba(0,0,0,0) 65%)` }} />
        <div style={{ position: "absolute", left: MID + 8, top: BOX.t, width: BOX.r - MID - 8, height: BOX.b - BOX.t, background: `radial-gradient(circle at 60% 60%, rgba(120,150,255,${0.11 * dayNight}), rgba(0,0,0,0) 60%)` }} />

        {/* kamar kiri: toko sendiri */}
        <div style={{ position: "absolute", left: 150, top: 960, width: 150, height: 8, background: K.frame }} />
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: 158 + i * 46, top: 926, width: 38, height: 34, background: "#6E5A44", opacity: 0.8 }} />
        ))}
        {/* papan BUKA / TUTUP */}
        <div style={{ position: "absolute", left: 380, top: 905, width: 2, height: 30, background: K.muted }} />
        <div style={{ position: "absolute", left: 330, top: 935, width: 104, height: 46, borderRadius: 6, background: signFlip > 0.5 ? K.red : K.white, transform: `scaleY(${Math.abs(1 - 2 * signFlip)})`, display: "flex", alignItems: "center", justifyContent: "center", ...mono, fontSize: 22, letterSpacing: "0.12em", color: signFlip > 0.5 ? "white" : K.bg }}>
          {signFlip > 0.5 ? "TUTUP" : "BUKA"}
        </div>
        {/* meja kerja + laptop */}
        <div style={{ position: "absolute", left: 370, top: 1180, width: 150, height: 10, background: "#3A3B41" }} />
        <div style={{ position: "absolute", left: 380, top: 1190, width: 8, height: 90, background: "#3A3B41" }} />
        <div style={{ position: "absolute", left: 500, top: 1190, width: 8, height: 90, background: "#3A3B41" }} />
        <div style={{ position: "absolute", left: 440, top: 1146, width: 54, height: 34, borderRadius: 4, background: closed ? "#202126" : "#2E3440", border: `3px solid ${K.frame}`, boxSizing: "border-box" }} />
        {/* tumpukan kardus */}
        {Array.from({ length: boxes }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 150 + (i % 3) * 40 + (i >= 3 ? 20 : 0), top: 1244 - (i >= 3 ? 36 : 0), width: 38, height: 36, background: "#7A6348", border: "2px solid #5C4A35", boxSizing: "border-box" }} />
        ))}

        {/* kamar kanan: kantor orang */}
        <div style={{ position: "absolute", left: 590, top: 925, width: 86, height: 92, background: "#E9E9EE", borderRadius: 4, overflow: "hidden", textAlign: "center", ...mono }}>
          <div style={{ height: 22, background: K.red }} />
          <div style={{ fontSize: 22, color: K.bg, marginTop: 14 }}>{calYear}</div>
        </div>
        <div style={{ position: "absolute", left: 820, top: 925, width: 110, height: 90, border: "6px solid #2E2F35", boxSizing: "border-box", background: dayNight > 0.5 ? "#2A3A5C" : "#0E1220" }}>
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 5, background: "#2E2F35", transform: "translateX(-50%)" }} />
        </div>
        <div style={{ position: "absolute", left: 720, top: 1180, width: 220, height: 10, background: "#3A3B41" }} />
        <div style={{ position: "absolute", left: 732, top: 1190, width: 8, height: 90, background: "#3A3B41" }} />
        <div style={{ position: "absolute", left: 920, top: 1190, width: 8, height: 90, background: "#3A3B41" }} />
        <div style={{ position: "absolute", left: 770, top: 1102, width: 96, height: 66, borderRadius: 4, background: t >= M.duduk ? "#3A4A6A" : "#202126", border: `4px solid ${K.frame}`, boxSizing: "border-box" }} />
        <div style={{ position: "absolute", left: 812, top: 1168, width: 12, height: 12, background: K.frame }} />
        {/* tanaman di meja tumbuh seiring tahun */}
        <div style={{ position: "absolute", left: 898, top: 1158, width: 26, height: 22, background: "#5C4A35", borderRadius: "0 0 6px 6px" }} />
        <div style={{ position: "absolute", left: 911, top: 1158, width: 0, height: 0, transform: `scale(${plant})`, transformOrigin: "0 0" }}>
          {[-30, 0, 30].map((a) => (
            <div key={a} style={{ position: "absolute", left: -6, top: -40, width: 12, height: 40, borderRadius: "50% 50% 0 0", background: "#4E7A4A", transform: `rotate(${a}deg)`, transformOrigin: "50% 100%" }} />
          ))}
        </div>
        {/* kursi */}
        <div style={{ position: "absolute", left: 664, top: 1236, width: 60, height: 8, background: "#2E2F36" }} />
        <div style={{ position: "absolute", left: 664, top: 1170, width: 8, height: 110, background: "#2E2F36" }} />

        {/* stickman */}
        {t < M.duduk ? <Stickman x={x} y={STAND_Y} pose={pose} facing={walking ? 1 : 1} scale={SCALE} color={K.white} /> : null}
        {seated ? <Stickman x={690} y={SIT_Y} pose={typingPose} facing={1} scale={SCALE} color={K.white} /> : null}
        {t >= M.berdiri ? (
          <div style={{ opacity: standOld }}>
            <Stickman x={700} y={STAND_Y} pose={OLD_STAND} facing={1} scale={SCALE} color={K.white} />
            <div style={{ position: "absolute", left: 742, top: 1196, width: 6, height: 84, borderRadius: 3, background: "#A8693A" }} />
          </div>
        ) : null}

        {/* ===== panel melayang ===== */}
        <PhonePanel cx={LEFT_X} top={PANEL_TOP} alert={closed ? 1 : 0}>
          <div style={{ padding: "22px 14px", ...mono }}>
            <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>TOKO KAMU · OMZET</div>
            <div style={{ fontSize: 22, textTransform: "none", color: K.white, marginTop: 8 }}>{rupiah(t < M.tahun2 ? 150000 : t < M.tahun3 ? 420000 : 380000)}</div>
            <svg width={160} height={110} style={{ marginTop: 18, overflow: "visible" }}>
              <path d={chartPath(between(frame, fps, M.kemas, M.tutup))} fill="none" stroke={closed ? K.dim : K.white} strokeWidth={3} strokeLinejoin="round" />
              {ghost > 0 ? <path d="M 124 90 C 136 84, 146 50, 160 6" fill="none" stroke={K.white} strokeWidth={3} strokeDasharray="6 6" opacity={0.7 * ghost} pathLength={1} /> : null}
            </svg>
            {closed ? <div style={{ fontSize: 18, color: K.red, letterSpacing: "0.1em", marginTop: 14, opacity: enterAt(frame, fps, M.tutup, 0.3) }}>TOKO DITUTUP</div> : null}
          </div>
        </PhonePanel>

        <PhonePanel cx={RIGHT_X} top={PANEL_TOP} alert={0}>
          {t < M.duduk ? (
            <div style={{ padding: "30px 14px", ...mono }}>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>LOWONGAN</div>
              <div style={{ fontSize: 26, color: K.white, marginTop: 10 }}>DICARI: STAF</div>
              <div style={{ fontSize: 15, color: K.muted, marginTop: 14 }}>GAJI TETAP</div>
              <div style={{ fontSize: 15, color: K.muted, marginTop: 6 }}>MASUK 08:00</div>
            </div>
          ) : !pens ? (
            <div style={{ padding: "24px 14px", ...mono, textAlign: "center" }}>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>ABSEN MASUK</div>
              <div style={{ fontSize: 40, color: K.white, marginTop: 8 }}>08:00</div>
              <div style={{ fontSize: 18, color: K.white, marginTop: 4 }}>✓</div>
              <div style={{ marginTop: 20, fontSize: 13, color: K.muted, letterSpacing: "0.1em" }}>HARI KE-</div>
              <div style={{ fontSize: 26, color: K.white, marginTop: 4 }}>{ribuan(Math.max(1, Math.round(interpolate(t, [M.tahunKanan, M.tahun40], [1, 10400], { ...clamp, easing: (q) => Math.pow(q, 1.25) }))))}</div>
            </div>
          ) : (
            <div style={{ padding: "40px 14px", ...mono, textAlign: "center" }}>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>STATUS</div>
              <div style={{ fontSize: 34, color: K.white, marginTop: 12 }}>PENSIUN</div>
              <div style={{ fontSize: 16, color: K.gold, marginTop: 16, letterSpacing: "0.1em" }}>40 TAHUN ✓</div>
            </div>
          )}
        </PhonePanel>
        <Confetti x={RIGHT_X} y={PANEL_TOP + 120} p={t - M.pensiun} />

        {/* ===== kutipan ===== */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: QUOTE_TOP, textAlign: "center", color: K.white, fontSize: 30, letterSpacing: "0.12em", lineHeight: "48px" }}>
          <Typed text="MEMBANGUN BISNIS 3 TAHUN," at={M.q1} cps={TYPE_CPS} style={{ color: t >= M.q3 ? K.muted : K.white }} />
          <Typed text="KAMU TIDAK SABAR." at={M.q2} cps={TYPE_CPS} style={{ color: t >= M.q3 ? K.muted : K.white }} />
          <Typed text="TAPI BEKERJA UNTUK ORANG LAIN" at={M.q3} cps={TYPE_CPS} />
          <Typed text="40 TAHUN, KAMU SABAR." at={M.q4} cps={TYPE_CPS} style={{ color: K.red }} />
        </div>
      </div>
    </div>
  );
};
