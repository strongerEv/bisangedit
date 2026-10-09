import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { Backdrop, Brand, K, TapRipple } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S99", t);

// Penutup: "Mau dibikinin aplikasi kayak gini buat timmu? Konsultasi gratis di Youcanbuild."
export const S99: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const brand = L(M.konsultasi) - 0.1;
  const logo = enterAt(frame, fps, brand + 0.6, 0.5);
  const btn = enterAt(frame, fps, brand, 0.5);
  const pulse = 1 + 0.03 * Math.sin(Math.max(0, t - brand - 0.6) * 6) * btn;
  return (
    <Stage dur={dur}>
      <Backdrop />
      <div style={{ position: "absolute", left: 0, width: 1080, top: 300, display: "flex", justifyContent: "center", ...rise(enterAt(frame, fps, 0.05, 0.4), 20) }}>
        <Brand s={1.9} />
      </div>
      <div style={{ position: "absolute", left: 96, top: 520, width: 888, textAlign: "center" }}>
        <Words text="Mau dibikinin aplikasi kayak gini buat *timmu?*" delay={L(M.mau) - 0.1} stagger={0.1} size={86} color={K.text} accent={K.primary} />
      </div>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 1010, display: "flex", justifyContent: "center", transform: `scale(${pulse})`, ...rise(btn, 30) }}>
        <div style={{ position: "relative", background: theme.colors.brand, color: "white", borderRadius: 999, padding: "34px 64px", fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 58, boxShadow: "0 18px 40px rgba(242, 13, 13, 0.28)" }}>
          Konsultasi gratis →
        </div>
      </div>
      <TapRipple x={540} y={1075} p={between(frame, fps, brand + 1.3, brand + 1.8)} r={40} />
      <Img src={staticFile("brand/youcanbuild-wordmark.png")} style={{ position: "absolute", left: 540 - 280, top: 1300, width: 560, opacity: logo, transform: `scale(${0.95 + 0.05 * logo})` }} />
    </Stage>
  );
};
