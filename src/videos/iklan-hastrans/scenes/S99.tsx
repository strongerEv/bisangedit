import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { Backdrop, Elf, H, TapRipple } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S99", t);

// Penutup: "Mau punya sistem kayak gini buat travelmu? Konsultasi gratis di Youcanbuild."
export const S99: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const ex = interpolate(t, [0, 0.7], [-420, 390], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const wheel = interpolate(t, [0, 0.7], [0, 720], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const btnAt = L(M.konsultasi) - 0.1;
  const btn = enterAt(frame, fps, btnAt, 0.5);
  const logo = enterAt(frame, fps, L(M.youcanbuild) - 0.15, 0.5);
  const pulse = 1 + 0.03 * Math.sin(Math.max(0, t - btnAt - 0.6) * 6) * btn;
  return (
    <Stage dur={dur} fadeOut={false}>
      <Backdrop />
      <Elf width={300} wheel={wheel} style={{ position: "absolute", left: ex, top: 230 }} />
      <div style={{ position: "absolute", left: 90, top: 460, width: 900, textAlign: "center" }}>
        <Words text="Mau punya sistem kayak gini buat *travelmu?*" delay={L(M.mau) - 0.1} stagger={0.2} size={92} color={H.text} accent={H.b600} />
      </div>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 920, display: "flex", justifyContent: "center", transform: `scale(${pulse})`, ...rise(btn, 30) }}>
        <div style={{ background: theme.colors.brand, color: "white", borderRadius: 999, padding: "34px 64px", fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 58, boxShadow: "0 18px 40px rgba(242, 13, 13, 0.28)" }}>
          Konsultasi gratis →
        </div>
      </div>
      <TapRipple x={540} y={985} p={between(frame, fps, btnAt + 0.7, btnAt + 1.2)} r={40} />
      <Img src={staticFile("brand/youcanbuild-wordmark.png")} style={{ position: "absolute", left: 540 - 280, top: 1220, width: 560, opacity: logo, transform: `scale(${0.95 + 0.05 * logo})` }} />
    </Stage>
  );
};
