import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, exitAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { CODE, CODE_EXTRA } from "../code";
import { CodePanel } from "../CodePanel";
import { CODE_IN_SCREEN, PANEL, SCREEN_AT_CENTER, TABLET, TABLET_POS, TITLE } from "../layout";
import { Tablet } from "../Tablet";
import { local, MARKERS } from "../timeline";
import { TitleBox } from "../TitleBox";

// Panel kode mengecil dan masuk ke layar tablet. Tablet tetap → disambung S06.
export const S05: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const m = enterAt(frame, fps, 0, 0.9);
  const lerp = (a: number, b: number) => interpolate(m, [0, 1], [a, b]);
  const pos = TABLET_POS.center;

  return (
    <Stage dur={dur} fadeOut={false}>
      <TitleBox dur={dur}>
        <Words text="Saya cuma pegang *tablet.*" delay={local("S05", MARKERS.tablet) - 0.1} size={TITLE.size} />
      </TitleBox>

      <Tablet x={pos.x} y={pos.y} appear={m} screenBg={theme.colors.code} />
      <CodePanel
        lines={[...CODE, ...CODE_EXTRA]}
        style={{
          left: lerp(PANEL.x, SCREEN_AT_CENTER.x),
          top: lerp(PANEL.y, SCREEN_AT_CENTER.y),
          transform: `scale(${lerp(1, CODE_IN_SCREEN)})`,
          transformOrigin: "top left",
          boxShadow: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          width: 1080,
          top: pos.y + TABLET.h / 2 + 30,
          textAlign: "center",
          opacity: exitAt(frame, fps, dur),
        }}
      >
        <span
          style={{
            display: "inline-block",
            ...rise(enterAt(frame, fps, local("S05", MARKERS.samsung) - 0.1, 0.4), 14),
            fontFamily: theme.fonts.mono,
            fontWeight: 500,
            fontSize: 30,
            letterSpacing: "0.04em",
            color: theme.colors.text,
          }}
        >
          Samsung Galaxy Tab A11+
        </span>
      </div>
    </Stage>
  );
};
