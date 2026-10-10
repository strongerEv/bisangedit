import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { mixPose, POSES, Stickman } from "../../../components/Stickman";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { Backdrop, N, TapRipple } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S99", t);

// Penutup: "Punya usaha dengan alur seribet ini? Ceritain ke Youcanbuild, konsultasinya gratis."
export const S99: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const logo = enterAt(frame, fps, L(M.youcanbuild) - 0.15, 0.5);
  const btnAt = L(M.konsultasi) - 0.1;
  const btn = enterAt(frame, fps, btnAt, 0.5);
  const pulse = 1 + 0.03 * Math.sin(Math.max(0, t - btnAt - 0.6) * 6) * btn;
  const cheer = enterAt(frame, fps, L(M.ceritain), 0.4);
  const wave = Math.sin(t * 6) * 10 * cheer;
  const pose = mixPose(POSES.think, POSES.cheer, cheer);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <div style={{ position: "absolute", left: 90, top: 260, width: 900, textAlign: "center" }}>
        <Words text="Punya usaha dengan alur *seribet* ini?" delay={L(M.punya) - 0.1} stagger={0.22} size={90} color={N.text} accent={N.coral} />
      </div>
      <Img src={staticFile("brand/youcanbuild-wordmark.png")} style={{ position: "absolute", left: 540 - 280, top: 640, width: 560, opacity: logo, transform: `scale(${0.95 + 0.05 * logo})`, filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.4))", background: N.cream, borderRadius: 24, padding: "22px 30px" }} />
      <div style={{ position: "absolute", left: 0, width: 1080, top: 900, display: "flex", justifyContent: "center", transform: `scale(${pulse})`, ...rise(btn, 30) }}>
        <div style={{ background: theme.colors.brand, color: "white", borderRadius: 999, padding: "34px 64px", fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 58, boxShadow: "0 18px 40px rgba(242, 13, 13, 0.35)" }}>
          Konsultasi gratis →
        </div>
      </div>
      <TapRipple x={540} y={965} p={between(frame, fps, L(M.gratis), L(M.gratis) + 0.5)} r={40} />
      <Stickman x={540} y={1560} pose={{ ...pose, armR: [pose.armR[0] + wave, pose.armR[1]] }} face={cheer > 0.5 ? "happy" : "neutral"} scale={1.2} color={N.cream} />
    </Stage>
  );
};
