import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { Backdrop, G, img, TapRipple } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S99", t);

// Penutup: "Buat kamu yang butuh aplikasi kustom seperti ini, langsung konsultasi gratis di Youcanbuild."
export const S99: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const btnAt = L(M.langsung) - 0.1;
  const btn = enterAt(frame, fps, btnAt, 0.5);
  const logo = enterAt(frame, fps, L(M.youcanbuild) - 0.1, 0.5);
  const pulse = 1 + 0.03 * Math.sin(Math.max(0, t - btnAt - 0.6) * 6) * btn;
  return (
    <Stage dur={dur}>
      <Backdrop />
      <Img src={img("icon.svg")} style={{ position: "absolute", left: 540 - 90, top: 230, width: 180, height: 180, borderRadius: 44, ...rise(enterAt(frame, fps, 0.05, 0.4), 20) }} />
      <div style={{ position: "absolute", left: 90, top: 480, width: 900, textAlign: "center" }}>
        <Words text="Butuh aplikasi *kustom* seperti ini?" delay={L(M.buat) - 0.1} stagger={0.28} size={92} color={G.text} accent={G.g500} />
      </div>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 1010, display: "flex", justifyContent: "center", transform: `scale(${pulse})`, ...rise(btn, 30) }}>
        <div style={{ background: theme.colors.brand, color: "white", borderRadius: 999, padding: "34px 64px", fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 58, boxShadow: "0 18px 40px rgba(242, 13, 13, 0.28)" }}>
          Konsultasi gratis →
        </div>
      </div>
      <TapRipple x={540} y={1075} p={between(frame, fps, L(M.gratis), L(M.gratis) + 0.5)} r={40} />
      <Img src={staticFile("brand/youcanbuild-wordmark.png")} style={{ position: "absolute", left: 540 - 280, top: 1300, width: 560, opacity: logo, transform: `scale(${0.95 + 0.05 * logo})` }} />
    </Stage>
  );
};
