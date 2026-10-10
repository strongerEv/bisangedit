import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { c, RED } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S99", t);

// "Konsultasi gratis di Youcanbuild."
export const S99: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const btn = enterAt(frame, fps, L(M.konsultasi) - 0.05, 0.4);
  const logo = enterAt(frame, fps, L(M.youcanbuild) - 0.15, 0.4);
  const pulse = 1 + 0.035 * Math.sin(Math.max(0, t - 0.6) * 7) * btn;
  return (
    <Stage dur={dur} fadeOut={false}>
      <div style={{ position: "absolute", left: 96, top: 420, width: 888, textAlign: "center" }}>
        <Words text="Konsultasi *gratis*" delay={L(M.konsultasi) - 0.1} stagger={0.2} size={120} color={c.text} accent={RED} />
      </div>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 780, display: "flex", justifyContent: "center", transform: `scale(${pulse})`, ...rise(btn, 30) }}>
        <div style={{ background: RED, color: "white", borderRadius: 999, padding: "38px 72px", fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 64, boxShadow: "0 18px 40px rgba(242, 13, 13, 0.3)" }}>
          Konsultasi gratis →
        </div>
      </div>
      <Img src={staticFile("brand/youcanbuild-wordmark.png")} style={{ position: "absolute", left: 540 - 320, top: 1150, width: 640, opacity: logo, transform: `scale(${0.95 + 0.05 * logo})` }} />
      <div style={{ position: "absolute", left: 540 - 50, top: 850, width: 100, height: 100, borderRadius: 50, border: `8px solid ${c.text}`, opacity: (1 - between(frame, fps, L(M.youcanbuild) + 0.3, L(M.youcanbuild) + 0.8)) * between(frame, fps, L(M.youcanbuild) + 0.25, L(M.youcanbuild) + 0.3), transform: `scale(${0.5 + between(frame, fps, L(M.youcanbuild) + 0.3, L(M.youcanbuild) + 0.8)})` }} />
    </Stage>
  );
};
