import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { theme } from "../../../components/theme";
import { screenPad } from "./common";

type Props = { start: number; doneAt: number };

/** Langkah VIDEO: beban tablet rendah, lalu file video siap. Teks ≥ 32 px karena tablet diperkecil 0,8. */
export const RenderScreen: React.FC<Props> = ({ start, doneAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const meter = between(frame, fps, start + 0.2, start + 0.8) * 0.08;
  const done = enterAt(frame, fps, doneAt, 0.5);
  const label: React.CSSProperties = {
    fontFamily: theme.fonts.mono,
    fontWeight: 500,
    fontSize: 32,
    letterSpacing: "0.06em",
    color: theme.colors.muted,
  };
  return (
    <>
      <div style={{ ...screenPad, padding: "56px 44px", opacity: 1 - done }}>
        <div style={label}>BEBAN TABLET</div>
        <div style={{ marginTop: 24, height: 30, borderRadius: 15, background: theme.colors.line, overflow: "hidden" }}>
          <div style={{ width: `${meter * 100}%`, height: "100%", background: theme.colors.accent }} />
        </div>
        <div
          style={{
            marginTop: 30,
            fontFamily: theme.fonts.heading,
            fontWeight: 700,
            fontSize: 64,
            letterSpacing: "-0.02em",
            color: theme.colors.text,
          }}
        >
          santai.
        </div>
      </div>
      <div
        style={{
          ...screenPad,
          ...rise(done, 20),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <div
          style={{
            width: 170,
            height: 170,
            borderRadius: 85,
            background: theme.colors.text,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              marginLeft: 14,
              borderTop: "34px solid transparent",
              borderBottom: "34px solid transparent",
              borderLeft: `54px solid ${theme.colors.onDark}`,
            }}
          />
        </div>
        <div style={{ ...label, color: theme.colors.text }}>video.mp4</div>
      </div>
    </>
  );
};
