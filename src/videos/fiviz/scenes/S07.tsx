import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, B, Center, Chip, font, img, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S07", t);

// "Selesai servis, garansinya digital. Nota hilang? Aman."
export const S07: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const card = spring({ frame: frame - Math.round((L(M.garansi) - 0.2) * fps), fps, config: { damping: 13 } });
  const nota = enterAt(frame, fps, L(M.nota) - 0.15, 0.3);
  const fly = interpolate(t, [L(M.nota) + 0.3, L(M.aman)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shield = spring({ frame: frame - Math.round((L(M.aman) - 0.1) * fps), fps, config: { damping: 9 } });
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Garansinya *digital*" delay={L(M.selesai) - 0.1} stagger={0.4} size={104} color={B.text} accent={B.b600} />
      </TitleArea>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 560,
          width: 860,
          height: 520,
          borderRadius: 44,
          background: `linear-gradient(135deg, ${B.b500} 0%, ${B.b700} 60%, ${B.b900} 100%)`,
          color: "white",
          padding: "44px 50px",
          boxSizing: "border-box",
          boxShadow: `0 40px 90px ${B.shadow}`,
          ...font,
          opacity: Math.min(1, card * 2),
          transform: `perspective(1400px) rotateY(${(1 - card) * 40}deg) scale(${0.85 + 0.15 * card})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Img src={img("logo.png")} style={{ width: 80, height: 80, borderRadius: 20 }} />
          <div>
            <div style={{ fontSize: 30, fontWeight: 800 }}>Kartu Garansi Digital</div>
            <div style={{ fontSize: 24, opacity: 0.8 }}>Firman Service</div>
          </div>
          <div style={{ marginLeft: "auto", background: B.green, borderRadius: 999, padding: "10px 22px", fontSize: 24, fontWeight: 800 }}>AKTIF</div>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 34, marginTop: 44, letterSpacing: "0.06em" }}>FS-261010-007</div>
        <div style={{ fontSize: 30, marginTop: 14, opacity: 0.9 }}>Galaxy A15 · Ganti LCD Original</div>
        <div style={{ display: "flex", gap: 60, marginTop: 34 }}>
          <div>
            <div style={{ fontSize: 22, opacity: 0.7 }}>Masa garansi</div>
            <div style={{ fontSize: 40, fontWeight: 800 }}>90 hari</div>
          </div>
          <div>
            <div style={{ fontSize: 22, opacity: 0.7 }}>Klaim</div>
            <div style={{ fontSize: 40, fontWeight: 800 }}>dari HP</div>
          </div>
        </div>
      </div>
      {/* nota kertas yang hilang */}
      <div style={{ position: "absolute", left: 180 + fly * 700, top: 1180 + fly * 500, width: 240, height: 320, background: "#FFFDF7", borderRadius: 8, boxShadow: `0 16px 40px ${B.shadow}`, transform: `rotate(${-8 + fly * 120}deg)`, opacity: nota * (1 - fly), padding: 22, boxSizing: "border-box" }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} style={{ height: 10, borderRadius: 5, background: "#E2E8F0", marginBottom: 16, width: `${90 - (i % 3) * 20}%` }} />
        ))}
        <div style={{ position: "absolute", right: -20, top: -30, ...font, fontWeight: 900, fontSize: 90, color: B.accent }}>?</div>
      </div>
      <Img src={img("ic-garansi.png")} style={{ position: "absolute", left: 540 - 150, top: 1180, width: 300, opacity: Math.min(1, shield * 2), transform: `scale(${0.4 + 0.6 * shield})` }} />
      <Center top={1560}>
        <Chip tone="green" style={rise(enterAt(frame, fps, L(M.aman) + 0.1, 0.3), 20)}>Nota hilang? Aman ✓</Chip>
      </Center>
    </Stage>
  );
};
