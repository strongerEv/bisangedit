import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Scene } from "../../../components/Scene";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { c, mono } from "../parts";
import { local, MARKERS } from "../timeline";

// Penutup menggantung: "Saking pintarnya… jadi ____?" → isi di komentar.
export const S99: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const blank = enterAt(frame, fps, local("S99", MARKERS.jadiApa) - 0.1, 0.4);
  const blink = Math.floor((frame / fps) * 2) % 2 === 0;
  const card = local("S99", MARKERS.komentar) - 0.1;
  const dots = Math.round(between(frame, fps, card + 0.5, card + 1.2) * 3);
  return (
    <Scene dur={dur} tag="Satire · 07 · Kamu yang jawab">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Words text="Saking pintarnya…" delay={local("S99", MARKERS.saking) - 0.1} size={112} />
        <div style={{ display: "flex", alignItems: "flex-end", gap: 24, opacity: blank }}>
          <span style={{ fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 112, color: c.text, letterSpacing: "-0.025em" }}>jadi</span>
          <span style={{ width: 380, height: 10, marginBottom: 24, background: c.accent, borderRadius: 5 }} />
          <span style={{ fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 112, color: c.accent }}>?</span>
        </div>
      </div>
      <div
        style={{
          background: c.card,
          borderRadius: 32,
          padding: "30px 32px",
          boxShadow: `0 24px 60px ${c.shadow}`,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          maxWidth: 760,
          ...rise(enterAt(frame, fps, card, 0.5), 24),
        }}
      >
        <div style={mono}>Isi sendiri di kolom komentar</div>
        <div
          style={{
            height: 96,
            borderRadius: 48,
            border: `3px solid ${c.line}`,
            background: c.bg,
            display: "flex",
            alignItems: "center",
            padding: "0 32px",
            fontFamily: theme.fonts.heading,
            fontWeight: 600,
            fontSize: 44,
            color: c.muted,
          }}
        >
          saking pintarnya jadi{".".repeat(dots)}
          <span style={{ width: 4, height: 48, marginLeft: 6, background: c.text, opacity: blink ? 1 : 0 }} />
        </div>
      </div>
    </Scene>
  );
};
