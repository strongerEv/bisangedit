import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { POSES, Stickman } from "../../../components/Stickman";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { TITLE } from "../layout";
import { c, RED } from "../parts";
import { local, MARKERS } from "../timeline";

const POINT_UP: typeof POSES.point = { ...POSES.point, armL: [-150, 10], armR: [20, -10] };

// Penutup: wordmark + "Konsultasinya gratis." + tombol CTA.
export const S99: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = enterAt(frame, fps, 0, 0.6);
  const btnAt = local("S99", MARKERS.sekarang) - 0.1;
  const pulse = Math.sin(Math.PI * between(frame, fps, btnAt + 0.8, btnAt + 1.3)) * 0.05;

  return (
    <Stage dur={dur}>
      <Img
        src={staticFile("brand/youcanbuild-wordmark.png")}
        style={{
          position: "absolute",
          left: TITLE.x,
          top: 300,
          width: 620,
          opacity: logo,
          transform: `scale(${0.96 + 0.04 * logo})`,
          transformOrigin: "left center",
        }}
      />
      <div style={{ position: "absolute", left: TITLE.x, top: 520, width: TITLE.w, display: "flex", flexDirection: "column", gap: 48 }}>
        <Words text="Konsultasinya *gratis.*" delay={local("S99", MARKERS.gratis) - 0.1} stagger={0.1} size={120} accent={RED} />
        <div
          style={{
            alignSelf: "flex-start",
            ...rise(enterAt(frame, fps, btnAt, 0.5), 24),
            transform: `translateY(${(1 - enterAt(frame, fps, btnAt, 0.5)) * 24}px) scale(${1 + pulse})`,
            background: RED,
            color: c.card,
            borderRadius: 999,
            padding: "34px 60px",
            fontFamily: theme.fonts.heading,
            fontWeight: 700,
            fontSize: 54,
            boxShadow: "0 18px 40px rgba(242, 13, 13, 0.28)",
          }}
        >
          Konsultasi sekarang →
        </div>
      </div>
      <Stickman x={600} y={1430} pose={POINT_UP} face="happy" facing={-1} scale={1} />
    </Stage>
  );
};
