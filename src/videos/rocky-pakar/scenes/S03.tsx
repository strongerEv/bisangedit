import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Scene } from "../../../components/Scene";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { c, mono, PanLogo } from "../parts";
import { local, MARKERS } from "../timeline";

export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = enterAt(frame, fps, local("S03", MARKERS.tanggal) - 0.1, 0.5);
  return (
    <Scene dur={dur} tag="Satire · 01 · Pidato">
      <Words text="Itu *18* *September,* di HUT PAN." delay={local("S03", MARKERS.tanggal) - 0.1} stagger={0.08} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 36,
          background: c.card,
          borderRadius: 36,
          padding: "36px 40px",
          boxShadow: `0 24px 60px ${c.shadow}`,
          opacity: card,
          transform: `scale(${0.96 + 0.04 * card})`,
        }}
      >
        <PanLogo height={170} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={mono}>Jumat · Jakarta</div>
          <div style={{ fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 64, color: c.text, letterSpacing: "-0.02em" }}>HUT ke-28 PAN</div>
          <div style={{ ...mono, color: c.text, ...rise(enterAt(frame, fps, 1.0, 0.4), 10) }}>“…saking pintarnya jadi goblok.”</div>
        </div>
      </div>
    </Scene>
  );
};
