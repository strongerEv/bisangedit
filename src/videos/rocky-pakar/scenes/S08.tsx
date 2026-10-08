import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Scene } from "../../../components/Scene";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { c, mono } from "../parts";
import { local, MARKERS } from "../timeline";

// Callback ke kutipan pidato, lalu punchline.
export const S08: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Scene dur={dur} tag="Satire · 06 · Ternyata">
      <div
        style={{
          background: c.card,
          borderRadius: 32,
          padding: "34px 40px",
          boxShadow: `0 24px 60px ${c.shadow}`,
          borderLeft: `10px solid ${c.line}`,
          ...rise(enterAt(frame, fps, 0, 0.4), 16),
        }}
      >
        <div style={{ fontFamily: theme.fonts.heading, fontWeight: 600, fontSize: 52, lineHeight: 1.2, color: c.text }}>
          “Saking pintarnya, saking pintarnya jadi goblok.”
        </div>
        <div style={{ ...mono, fontSize: 24, marginTop: 16, textTransform: "none", letterSpacing: "0.02em" }}>
          — Presiden Prabowo, HUT ke-28 PAN, 18 Sep 2026
        </div>
      </div>
      <Words text="Oh… ternyata ini yang *dimaksud.*" delay={local("S08", MARKERS.ternyata) - 0.1} stagger={0.12} size={112} />
    </Scene>
  );
};
