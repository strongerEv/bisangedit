import React from "react";
import { Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { Backdrop, F, mono } from "../parts";
import { local, MARKERS as M } from "../timeline";

// Penutup: "Mau dibikinin aplikasi kayak gini buat usahamu? Komen 'mau'."
export const S99: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame: frame - 3, fps, config: { damping: 12 } });
  const k = local("S99", M.komen) - 0.1;
  const typed = Math.round(between(frame, fps, local("S99", M.kataMau) - 0.1, local("S99", M.kataMau) + 0.25) * 3);
  const blink = Math.floor((frame / fps) * 2) % 2 === 0;
  return (
    <Stage dur={dur}>
      <Backdrop />
      <Img src={staticFile("aset/fastreng/logo.png")} style={{ position: "absolute", left: 540 - 170, top: 230, width: 340, height: 340, opacity: Math.min(1, logo * 2), transform: `scale(${0.7 + 0.3 * logo})` }} />
      <div style={{ position: "absolute", left: 96, top: 620, width: 888, textAlign: "center" }}>
        <Words text="Mau dibikinin aplikasi kayak gini buat *usahamu?*" delay={local("S99", M.mau) - 0.1} stagger={0.08} size={80} color={F.ink} accent={F.orangeDeep} />
      </div>
      <div style={{ position: "absolute", left: 96, top: 960, width: 888, background: "white", borderRadius: 36, padding: "28px 30px", boxSizing: "border-box", boxShadow: `0 24px 60px ${F.shadow}`, ...rise(enterAt(frame, fps, k, 0.4), 24) }}>
        <div style={{ ...mono, marginBottom: 16 }}>TULIS DI KOMENTAR</div>
        <div style={{ height: 110, borderRadius: 55, border: `3px solid ${F.peach}`, background: F.cream, display: "flex", alignItems: "center", padding: "0 36px", fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 64, color: F.orangeDeep }}>
          {"mau".slice(0, typed)}
          <span style={{ width: 5, height: 60, marginLeft: 6, background: F.ink, opacity: blink ? 1 : 0 }} />
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 1200, textAlign: "center", fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 90, color: F.ink, opacity: enterAt(frame, fps, local("S99", M.kataMau) + 0.2, 0.3), transform: `translateY(${Math.sin((frame / fps) * 5) * 8}px)` }}>↓</div>
      <Img src={staticFile("brand/youcanbuild-wordmark.png")} style={{ position: "absolute", left: 540 - 150, top: 1420, width: 300, opacity: 0.9 }} />
    </Stage>
  );
};
