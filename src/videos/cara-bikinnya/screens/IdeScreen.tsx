import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { theme } from "../../../components/theme";
import { ScreenHeader, screenPad } from "./common";

const PROMPT = "Bikin video satire 30 detik soal Rocky jadi Wantimpres";

/** Langkah IDE: user mengetik permintaan ke Claude Code. */
export const IdeScreen: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const typed = Math.round(between(frame, fps, start + 0.1, start + 1.0) * PROMPT.length);
  const reply = enterAt(frame, fps, start + 1.0, 0.4);
  return (
    <div style={screenPad}>
      <ScreenHeader text="claude code · tablet" />
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            alignSelf: "flex-end",
            maxWidth: 400,
            minHeight: 40,
            background: theme.colors.text,
            color: theme.colors.onDark,
            borderRadius: 26,
            borderBottomRightRadius: 8,
            padding: "22px 26px",
            fontFamily: theme.fonts.heading,
            fontWeight: 600,
            fontSize: 30,
            lineHeight: 1.25,
          }}
        >
          {PROMPT.slice(0, typed)}
        </div>
        <div
          style={{
            ...rise(reply, 12),
            alignSelf: "flex-start",
            maxWidth: 400,
            background: theme.colors.bg,
            color: theme.colors.text,
            borderRadius: 26,
            borderBottomLeftRadius: 8,
            padding: "22px 26px",
            fontFamily: theme.fonts.heading,
            fontWeight: 500,
            fontSize: 30,
            lineHeight: 1.25,
          }}
        >
          Siap. Mulai dari naskah dulu, ya.
        </div>
      </div>
    </div>
  );
};
