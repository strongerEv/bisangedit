import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, exitAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { Check, c, L, mono, Progress, RED, StepTitle, Window } from "../parts";
import { local, MARKERS } from "../timeline";

// Langkah 1: kartu harga Claude Pro.
export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const price = enterAt(frame, fps, local("S02", MARKERS.duaPuluh) - 0.1, 0.45);
  return (
    <Stage dur={dur} fadeOut={false}>
      <Progress step={1} appear={enterAt(frame, fps, 0, 0.4)} />
      <StepTitle dur={dur}>
        <Words text="Langganan *Claude.*" delay={local("S02", MARKERS.langganan) - 0.1} size={L.titleSize} accent={RED} />
      </StepTitle>

      <Window dur={dur} tab="claude.com/pricing" appear={enterAt(frame, fps, 0.1, 0.5)}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ ...mono, ...rise(enterAt(frame, fps, 0.6, 0.4), 10) }}>PAKET</div>
          <div
            style={{
              fontFamily: theme.fonts.heading,
              fontWeight: 700,
              fontSize: 72,
              letterSpacing: "-0.02em",
              color: c.text,
              ...rise(enterAt(frame, fps, local("S02", MARKERS.paketPro) - 0.1, 0.4), 16),
            }}
          >
            Claude Pro
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, opacity: price, transform: `scale(${0.85 + 0.15 * price})`, transformOrigin: "left bottom" }}>
            <span style={{ fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 200, lineHeight: 0.95, letterSpacing: "-0.04em", color: RED }}>$20</span>
            <span style={{ fontFamily: theme.fonts.heading, fontWeight: 600, fontSize: 52, color: c.muted }}>/ bulan</span>
          </div>
          <div style={{ marginTop: 24 }}>
            <Check text="Sudah termasuk Claude Code" p={enterAt(frame, fps, local("S02", MARKERS.termasuk) - 0.1, 0.4)} />
          </div>
        </div>
      </Window>

      <div
        style={{
          position: "absolute",
          left: L.x,
          top: L.win.y + L.win.h + 28,
          ...mono,
          fontSize: 24,
          letterSpacing: "0.02em",
          ...rise(price, 8),
          opacity: price * exitAt(frame, fps, dur),
        }}
      >
        Harga per Okt 2026 · belum termasuk pajak
      </div>
    </Stage>
  );
};
