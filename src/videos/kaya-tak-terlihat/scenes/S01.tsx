import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { POSES, type Pose, Stickman } from "../../../components/Stickman";
// Satu seri dengan terlahir-tampan dkk. + mobil dari pria-di-mobil.
import { Car } from "../../pria-di-mobil/scenes/S01";
import { Beam, K, mono, PhonePanel, ribuan, rupiah, Typed } from "../../terlahir-tampan/parts";
import { lineAt, MARKERS as M, QUOTES, TYPE_CPS } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const GROUND = 1240;
const UNDER = 1330;
const SCALE = 0.5;
const HIP = GROUND - 176 * SCALE;
const PANEL_TOP = 420;
const LX = 300;
const RX = 780;
const QUOTE_TOP = 1372;

const SELFIE: Pose = { lean: -4, head: -8, armL: [-20, 8], armR: [140, 20], legL: [-14, 4], legR: [14, -4] };
const FLEX: Pose = { lean: -6, head: -12, armL: [-120, -70], armR: [110, 75], legL: [-16, 4], legR: [16, -4] };

const Tag: React.FC<{ x: number; y: number; p: number; children: React.ReactNode; color?: string }> = ({ x, y, p, children, color = K.red }) =>
  p <= 0 ? null : (
    <div style={{ position: "absolute", left: x, top: y, transform: `translateX(-50%) scale(${0.7 + 0.3 * p})`, opacity: p, background: color, color: "white", borderRadius: 8, padding: "6px 12px", ...mono, fontSize: 18, letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
      {children}
    </div>
  );

export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const item = (i: number) => enterAt(frame, fps, M.beli[i], 0.35);
  const flash = Math.max(0, ...M.selfie.map((a) => (t >= a && t < a + 0.25 ? 1 - (t - a) / 0.25 : 0)));
  const selfie = t >= M.selfie[0] - 0.3 && t < M.selfie[2] + 0.6;
  const scanX = interpolate(t, [M.pindai, M.pindaiSelesai], [40, 1040], clamp);
  const scanning = t >= M.pindai && t <= M.pindaiSelesai + 0.1;
  const xray = between(frame, fps, M.pindai, M.pindaiSelesai); // area kiri dari garis pindai sudah terbuka
  const utang = (i: number) => enterAt(frame, fps, M.utang + i * 0.25, 0.3);
  const vault = between(frame, fps, M.brankas, M.brankas + 2.5);
  const likes = Math.round(interpolate(t, [M.selfie[0], M.selfie[2] + 0.6], [0, 12400], clamp));
  const aset = interpolate(t, [M.brankas, M.akhir], [850_000_000, 1_240_000_000], clamp);
  const revealed = (x: number) => (scanX > x ? 1 : 0) * xray;
  const fade = 1 - between(frame, fps, M.pudar, M.akhir - 0.1);
  const qi = QUOTES.reduce((a, q, i) => (t >= q.at ? i : a), -1);
  const lpose: Pose = selfie ? SELFIE : t >= M.utang ? POSES.slump : FLEX;

  return (
    <div style={{ position: "absolute", inset: 0, background: K.bg }}>
      <div style={{ position: "absolute", inset: 0, opacity: fade }}>
        {/* judul */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: 210, textAlign: "center", color: K.white, fontSize: 32, letterSpacing: "0.16em" }}>
          <Typed text="KEKAYAAN YANG TIDAK TERLIHAT." at={M.judul} cps={TYPE_CPS} />
        </div>
        <div style={{ position: "absolute", left: 0, width: 1080, top: 262, textAlign: "center", ...mono, color: K.muted, fontSize: 20, letterSpacing: "0.22em", opacity: enterAt(frame, fps, 1.0, 0.5) }}>
          THE PSYCHOLOGY OF MONEY · MORGAN HOUSEL
        </div>
        {[
          [LX, "TERLIHAT KAYA"],
          [RX, "BENAR-BENAR KAYA"],
        ].map(([x, s]) => (
          <div key={s as string} style={{ position: "absolute", left: (x as number) - 200, width: 400, top: 340, textAlign: "center", ...mono, fontSize: 22, letterSpacing: "0.16em", color: K.muted, opacity: enterAt(frame, fps, 0.6, 0.4) }}>
            {s}
          </div>
        ))}

        <Beam top={[LX - 60, LX + 60, PANEL_TOP + 330]} bottom={[LX - 160, LX + 160, 1100]} color={t >= M.utang ? "#FF6A6A" : "#FFD9A0"} o={0.9} />
        <Beam top={[RX - 60, RX + 60, PANEL_TOP + 330]} bottom={[RX - 140, RX + 140, 1100]} color={t >= M.brankas ? "#FFD9A0" : "#9DB4FF"} o={0.9} />

        {/* rumah kiri: besar, jendela menyala */}
        <div style={{ position: "absolute", left: 110, top: 985, width: 380, height: 16, background: "#2E2F35" }} />
        <div style={{ position: "absolute", left: 120, top: 1000, width: 360, height: GROUND - 1000, background: "#1C1D21" }}>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 24 + (i % 3) * 112, top: 22 + Math.floor(i / 3) * 90, width: 92, height: 62, background: "#5A4A30", boxShadow: "0 0 24px rgba(243,194,122,0.25)" }} />
          ))}
        </div>
        {/* rumah kanan: kecil, sederhana */}
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <polygon points={`620,1070 780,985 940,1070`} fill="#2E2F35" />
          <rect x={640} y={1070} width={280} height={GROUND - 1070} fill="#1C1D21" />
          <rect x={690} y={1110} width={60} height={50} fill="#2A2B30" />
          <rect x={830} y={1140} width={56} height={GROUND - 1140} fill="#3A2C22" />
        </svg>

        {/* tanah + lapisan bawah tanah (terbuka saat sinar-X) */}
        <div style={{ position: "absolute", left: 40, top: GROUND, width: 1000, height: 6, background: K.frame }} />
        <div style={{ position: "absolute", left: 40, top: GROUND + 6, width: 1000, height: UNDER - GROUND, background: `rgba(157,180,255,${0.07 * xray})` }} />

        {/* sisi kiri: mobil, jam, tas */}
        <div style={{ opacity: item(0), transform: `scale(${0.7 + 0.3 * item(0)})`, transformOrigin: "200px 1240px" }}>
          <Car x={100} y={GROUND - 92} w={250} />
        </div>
        <Stickman x={410} y={HIP} pose={lpose} facing={1} scale={SCALE} color={K.white} />
        <div style={{ position: "absolute", left: 398, top: HIP - 118, width: 34, height: 9, borderRadius: 4, background: K.bg, opacity: item(1) }} />
        <div style={{ position: "absolute", left: 360, top: HIP - 40, width: 14, height: 14, borderRadius: 7, background: K.gold, boxShadow: `0 0 12px ${K.gold}`, opacity: item(1) }} />
        <div style={{ position: "absolute", left: 438, top: HIP - 6, width: 34, height: 30, borderRadius: "6px 6px 4px 4px", background: K.gold, opacity: item(2) }} />
        {selfie ? <div style={{ position: "absolute", left: 470, top: HIP - 92, width: 16, height: 26, borderRadius: 3, background: "#3A4A6A" }} /> : null}
        <div style={{ position: "absolute", left: 478 - 200, top: HIP - 80 - 200, width: 400, height: 400, borderRadius: 200, background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 60%)", opacity: flash }} />

        {/* sisi kanan: motor sederhana + stickman biasa */}
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <circle cx={672} cy={GROUND - 18} r={18} fill="none" stroke={K.muted} strokeWidth={6} />
          <circle cx={752} cy={GROUND - 18} r={18} fill="none" stroke={K.muted} strokeWidth={6} />
          <path d={`M672 ${GROUND - 18} L700 ${GROUND - 50} L740 ${GROUND - 50} L752 ${GROUND - 18} M700 ${GROUND - 50} L694 ${GROUND - 70} L680 ${GROUND - 70}`} fill="none" stroke={K.muted} strokeWidth={6} strokeLinejoin="round" />
        </svg>
        <Stickman x={800} y={HIP} pose={POSES.stand} facing={-1} scale={SCALE} color={K.white} />

        {/* label hasil sinar-X */}
        <Tag x={225} y={GROUND - 140} p={utang(0) * revealed(225)}>
          CICILAN 60 BLN
        </Tag>
        <Tag x={366} y={HIP - 86} p={utang(1) * revealed(366)}>
          PAYLATER
        </Tag>
        <Tag x={455} y={HIP + 30} p={utang(2) * revealed(455)}>
          KARTU KREDIT
        </Tag>
        {/* bawah tanah kiri: tumpukan tagihan */}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 140 + i * 66, top: GROUND + 22 + (i % 2) * 10, width: 54, height: 42, background: "#3A1416", border: `2px solid ${K.red}`, ...mono, fontSize: 11, color: K.red, textAlign: "center", lineHeight: "40px", opacity: utang(i * 0.4) * revealed(140 + i * 66) }}>
            TAGIHAN
          </div>
        ))}
        {/* bawah tanah kanan: brankas emas makin penuh */}
        <div style={{ position: "absolute", left: 640, top: GROUND + 14, width: 280, height: 70, border: `3px solid ${K.gold}`, borderRadius: 6, opacity: revealed(640) * (t >= M.pindaiSelesai ? 1 : 0.6) }}>
          {Array.from({ length: Math.round(12 * vault) }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 10 + (i % 6) * 44, top: 38 - Math.floor(i / 6) * 22, width: 38, height: 18, background: K.gold, borderRadius: 3, boxShadow: "inset 0 -4px 0 #9C7A2A" }} />
          ))}
        </div>

        {/* garis pindai sinar-X */}
        {scanning ? (
          <>
            <div style={{ position: "absolute", left: scanX - 3, top: 900, width: 6, height: 440, background: "#BFD3FF", boxShadow: "0 0 30px 8px rgba(157,180,255,0.6)" }} />
            <div style={{ position: "absolute", left: 40, top: 900, width: Math.max(0, scanX - 40), height: 440, background: "rgba(157,180,255,0.05)" }} />
          </>
        ) : null}

        {/* panel HP */}
        <PhonePanel cx={LX} top={PANEL_TOP} alert={t >= M.utang ? 1 : 0}>
          {t < M.utang ? (
            <div style={{ textAlign: "center", paddingTop: 50, ...mono }}>
              <div style={{ fontSize: 14, color: K.muted, letterSpacing: "0.18em" }}>LIKES</div>
              <div style={{ fontSize: 40, color: K.white, marginTop: 14 }}>♥ {ribuan(likes)}</div>
            </div>
          ) : (
            <div style={{ padding: "28px 14px", ...mono }}>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>SALDO</div>
              <div style={{ fontSize: 34, textTransform: "none", color: K.red, marginTop: 6 }}>{rupiah(0)}</div>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em", marginTop: 30 }}>CICILAN AKTIF</div>
              <div style={{ fontSize: 34, color: K.white, marginTop: 6 }}>5</div>
            </div>
          )}
        </PhonePanel>
        <PhonePanel cx={RX} top={PANEL_TOP} alert={0}>
          {t < M.brankas ? (
            <div style={{ textAlign: "center", paddingTop: 60, ...mono }}>
              <div style={{ fontSize: 14, color: K.muted, letterSpacing: "0.18em" }}>LIKES</div>
              <div style={{ fontSize: 40, color: K.dim, marginTop: 14 }}>♥ 3</div>
            </div>
          ) : (
            <div style={{ padding: "28px 14px", ...mono }}>
              <div style={{ fontSize: 13, color: K.muted, letterSpacing: "0.15em" }}>TOTAL ASET</div>
              <div style={{ fontSize: 17, textTransform: "none", color: K.gold, marginTop: 8 }}>{rupiah(aset)}</div>
              <svg width={160} height={110} style={{ marginTop: 26 }}>
                <path d="M 0 100 C 50 96, 90 80, 120 50 S 150 10, 160 4" fill="none" stroke={K.gold} strokeWidth={3} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - between(frame, fps, M.brankas, M.akhir - 1)} />
              </svg>
            </div>
          )}
        </PhonePanel>

        {/* kutipan */}
        <div style={{ position: "absolute", left: 0, width: 1080, top: QUOTE_TOP, textAlign: "center", fontSize: 28, letterSpacing: "0.1em", lineHeight: "46px" }}>
          {qi >= 0
            ? QUOTES[qi].lines.map((l, i) => (
                <Typed key={`${qi}-${i}`} text={l} at={lineAt(QUOTES[qi].at, QUOTES[qi].lines, i)} cps={TYPE_CPS} style={{ color: qi === 2 ? (i === 0 ? K.red : K.gold) : qi === 3 && i === 1 ? K.gold : K.white }} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
