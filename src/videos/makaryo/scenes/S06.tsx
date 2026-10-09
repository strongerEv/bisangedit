import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Brand, font, Icon, K, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S06", t);

const FILES = [
  { tag: "PDF", color: K.coral, title: "Laporan absensi", sub: "Oktober 2026 · semua host", at: M.pdf },
  { tag: "XLSX", color: K.emerald, title: "Laporan omzet", sub: "Oktober 2026 · per shift", at: M.excel2 },
];

const Ring: React.FC<{ p: number; color: string }> = ({ p, color }) => {
  const r = 34;
  const c = 2 * Math.PI * r;
  const done = p >= 1;
  return (
    <div style={{ position: "relative", width: 84, height: 84 }}>
      <svg width={84} height={84} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
        <circle cx={42} cy={42} r={r} stroke={K.border} strokeWidth={6} fill="none" />
        <circle cx={42} cy={42} r={r} stroke={color} strokeWidth={6} fill="none" strokeDasharray={c} strokeDashoffset={c * (1 - p)} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: done ? color : K.muted }}>
        <Icon name={done ? "check" : "download"} size={36} stroke={2.6} />
      </div>
    </div>
  );
};

/** Layar kunci HP dengan notifikasi pengingat (teks asli dari aplikasi). */
const LockScreen: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, #2B2470 0%, ${K.primary} 60%, #8C7FF0 100%)`, color: "white" }}>
    <div style={{ textAlign: "center", marginTop: 70, fontSize: 15, fontWeight: 600, opacity: 0.85 }}>Senin, 12 Oktober</div>
    <div style={{ textAlign: "center", fontSize: 78, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>10.45</div>
  </div>
);

/** Notifikasi pengingat (teks asli dari aplikasi), digambar besar di atas HP. */
const Banner: React.FC<{ p: number }> = ({ p }) => (
  <div
    style={{
      position: "absolute",
      left: 70,
      top: 1170,
      width: 940,
      boxSizing: "border-box",
      background: "rgba(255,255,255,0.97)",
      color: K.text,
      borderRadius: 40,
      padding: "28px 34px",
      boxShadow: `0 30px 70px ${K.shadowFloat}`,
      ...font,
      opacity: p,
      transform: `translateY(${(1 - p) * -80}px) scale(${0.92 + 0.08 * p})`,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 26, fontWeight: 600, color: K.muted }}>
      <Brand s={0.8} />
      <span style={{ flex: 1 }} />
      sekarang
    </div>
    <div style={{ fontSize: 42, fontWeight: 800, marginTop: 14, letterSpacing: "-0.01em" }}>Shift Siang dimulai 15 menit lagi</div>
    <div style={{ fontSize: 32, marginTop: 6, lineHeight: 1.3, color: K.muted }}>Shift kamu mulai pukul 11.00 WIB. Siapkan diri dan jangan lupa clock in.</div>
  </div>
);

// "Laporannya bisa diunduh ke PDF dan Excel, plus ada notifikasi pengingat jam kerja."
export const S06: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const phone = spring({ frame: frame - Math.round((L(M.notif) - 0.35) * fps), fps, config: { damping: 15 } });
  const banner = enterAt(frame, fps, L(M.notif) + 0.35, 0.4);
  const ring = interpolate(t, [L(M.notif) + 0.35, L(M.notif) + 0.5, L(M.notif) + 0.65, L(M.notif) + 0.8], [0, 1, -1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Unduh *laporan*" delay={L(M.laporan) - 0.1} stagger={0.2} size={104} color={K.text} accent={K.primary} />
        <Words text="+ *pengingat* jam kerja" delay={L(M.notif) - 0.1} stagger={0.14} size={64} weight={700} color={K.muted} accent={K.primary} />
      </TitleArea>
      {FILES.map((f, i) => {
        const p = enterAt(frame, fps, L(f.at) - 0.15, 0.4);
        const dl = between(frame, fps, L(f.at) + 0.1, L(f.at) + 0.8);
        return (
          <div
            key={f.tag}
            style={{
              position: "absolute",
              left: 60,
              top: 470 + i * 214,
              width: 960,
              height: 190,
              boxSizing: "border-box",
              background: "white",
              borderRadius: 36,
              border: `2px solid ${K.border}`,
              boxShadow: `0 20px 50px ${K.shadow}`,
              padding: "0 34px 0 28px",
              display: "flex",
              alignItems: "center",
              gap: 28,
              ...font,
              color: K.text,
              ...rise(p, 40),
            }}
          >
            <div style={{ width: 120, height: 140, borderRadius: 18, background: f.color, color: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Icon name="file" size={44} stroke={2} />
              <span style={{ fontSize: 26, fontWeight: 900, letterSpacing: "0.04em" }}>{f.tag}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 42, fontWeight: 800 }}>{f.title}</div>
              <div style={{ fontSize: 28, color: K.muted, marginTop: 4 }}>{f.sub}</div>
            </div>
            <Ring p={dl} color={f.color} />
          </div>
        );
      })}
      <Phone width={410} y={1410} bg={K.primary} style={{ opacity: Math.min(1, phone * 2), transform: `translateY(${(1 - phone) * 700}px) rotate(${ring * 2}deg)` }}>
        <LockScreen />
      </Phone>
      <Banner p={banner} />
    </Stage>
  );
};
