import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../../components/theme";
import { ScreenHeader, screenPad } from "./common";

const BARS = 44;
const heights = Array.from({ length: BARS }, (_, i) => 24 + 110 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.37)));

type Props = {
  /** Waktu lokal (detik) awal & akhir jalannya playhead. */
  playFrom: number;
  playTo: number;
  /** Kata + waktu lokal diucapkan. */
  words: readonly { word: string; at: number }[];
};

/** Langkah SUARA: gelombang suara + kata menyala tepat saat diucapkan. */
export const SuaraScreen: React.FC<Props> = ({ playFrom, playTo, words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const head = interpolate(t, [playFrom, playTo], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const current = words.reduce((idx, w, i) => (t >= w.at - 0.05 ? i : idx), -1);

  return (
    <div style={screenPad}>
      <ScreenHeader text="vo.wav · sinkron" />
      <div style={{ position: "relative", height: 180, display: "flex", alignItems: "center", gap: 4 }}>
        {heights.map((h, i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: h,
              borderRadius: 3,
              background: i / BARS < head ? theme.colors.text : theme.colors.line,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: head * (BARS * 10 - 4),
            top: -10,
            width: 4,
            height: 200,
            background: theme.colors.accent,
            borderRadius: 2,
          }}
        />
      </div>
      <div
        style={{
          marginTop: 60,
          display: "flex",
          flexWrap: "wrap",
          gap: "10px 16px",
          fontFamily: theme.fonts.heading,
          fontWeight: 700,
          fontSize: 52,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}
      >
        {words.map((w, i) => (
          <span
            key={w.word}
            style={{
              color: i === current ? theme.colors.accent : i < current ? theme.colors.text : theme.colors.line,
            }}
          >
            {w.word}
          </span>
        ))}
      </div>
    </div>
  );
};
