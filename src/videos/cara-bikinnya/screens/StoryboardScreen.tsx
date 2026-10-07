import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt } from "../../../components/motion";
import { theme } from "../../../components/theme";
import { ScreenHeader, screenPad } from "./common";

/** Langkah STORYBOARD: kisi adegan S01–S06 muncul berurutan. */
export const StoryboardScreen: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={screenPad}>
      <ScreenHeader text="TREATMENT.md" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const p = enterAt(frame, fps, start + 0.05 + i * 0.06, 0.35);
          return (
            <div
              key={i}
              style={{
                opacity: p,
                transform: `scale(${0.9 + 0.1 * p})`,
                height: 190,
                borderRadius: 18,
                background: theme.colors.bg,
                border: `3px solid ${theme.colors.line}`,
                padding: 16,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ fontFamily: theme.fonts.mono, fontSize: 24, color: theme.colors.muted }}>
                S0{i + 1}
              </div>
              <div style={{ height: 14, width: `${70 - (i % 3) * 15}%`, borderRadius: 7, background: theme.colors.text }} />
              <div style={{ height: 14, width: `${50 + (i % 2) * 20}%`, borderRadius: 7, background: theme.colors.line }} />
              {i % 2 === 0 ? (
                <div style={{ marginTop: "auto", width: 26, height: 26, borderRadius: 13, background: theme.colors.accent }} />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
