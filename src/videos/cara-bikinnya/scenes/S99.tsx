import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Scene } from "../../../components/Scene";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { local, MARKERS } from "../timeline";

const KEYWORD = "KODE";

// Penutup tanpa logo: pertanyaan + ajakan komentar + follow.
export const S99: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = enterAt(frame, fps, 0.7, 0.5);
  const typed = Math.round(between(frame, fps, 1.0, 1.4) * KEYWORD.length);
  const blink = Math.floor((frame / fps) * 2) % 2 === 0;

  return (
    <Scene dur={dur}>
      <Words text="Mau lihat *prosesnya?*" delay={local("S99", MARKERS.prosesnya) - 0.1} size={120} />

      <div
        style={{
          ...rise(card, 30),
          background: theme.colors.card,
          borderRadius: 36,
          padding: "36px 36px",
          boxShadow: `0 24px 60px ${theme.colors.shadow}`,
          display: "flex",
          flexDirection: "column",
          gap: 22,
          maxWidth: 760,
        }}
      >
        <div
          style={{
            fontFamily: theme.fonts.mono,
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: "0.06em",
            color: theme.colors.muted,
          }}
        >
          MAU TUTORIAL LENGKAPNYA? KOMEN:
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              flex: 1,
              height: 104,
              borderRadius: 52,
              border: `3px solid ${theme.colors.line}`,
              background: theme.colors.bg,
              display: "flex",
              alignItems: "center",
              padding: "0 36px",
              fontFamily: theme.fonts.heading,
              fontWeight: 700,
              fontSize: 56,
              letterSpacing: "0.02em",
              color: theme.colors.accent,
            }}
          >
            {KEYWORD.slice(0, typed)}
            <span style={{ width: 4, height: 56, marginLeft: 6, background: theme.colors.text, opacity: blink ? 1 : 0 }} />
          </div>
          <div
            style={{
              width: 104,
              height: 104,
              borderRadius: 52,
              background: theme.colors.text,
              color: theme.colors.onDark,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: theme.fonts.heading,
              fontWeight: 700,
              fontSize: 52,
            }}
          >
            ↑
          </div>
        </div>
      </div>

      <div
        style={{
          ...rise(enterAt(frame, fps, local("S99", MARKERS.follow) - 0.1, 0.5), 24),
          alignSelf: "flex-start",
          border: `4px solid ${theme.colors.text}`,
          borderRadius: 999,
          padding: "24px 48px",
          fontFamily: theme.fonts.heading,
          fontWeight: 600,
          fontSize: 44,
          color: theme.colors.text,
        }}
      >
        Follow untuk part berikutnya →
      </div>
    </Scene>
  );
};
