import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { theme } from "../../../components/theme";
import { ScreenHeader, screenPad } from "./common";

const LINES = [
  "Dulu kerjanya mengkritik istana.",
  "Sekarang… kantornya di istana.",
  "2 Oktober 2026, Rocky Gerung…",
  "Tugasnya: memberi nasihat…",
  "Bayangkan rapat pertamanya.",
];

/** Langkah NASKAH: baris naskah video pertama muncul satu per satu. */
export const NaskahScreen: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={screenPad}>
      <ScreenHeader text="NASKAH.md" />
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {LINES.map((l, i) => (
          <div
            key={i}
            style={{
              ...rise(enterAt(frame, fps, start + 0.1 + i * 0.1, 0.4), 14),
              display: "flex",
              gap: 16,
              fontFamily: theme.fonts.heading,
              fontWeight: 500,
              fontSize: 30,
              lineHeight: 1.25,
              color: theme.colors.text,
            }}
          >
            <span style={{ fontFamily: theme.fonts.mono, fontSize: 24, color: theme.colors.muted, paddingTop: 4 }}>
              {i + 1}
            </span>
            <span>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
