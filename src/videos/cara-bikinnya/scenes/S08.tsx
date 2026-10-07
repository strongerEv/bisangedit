import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { CloudIcon } from "../Icons";
import { CLOUD, TABLET, TABLET_POS, TITLE } from "../layout";
import { Layer } from "../screens/common";
import { RenderScreen } from "../screens/RenderScreen";
import { SuaraScreen } from "../screens/SuaraScreen";
import { StepRail } from "../StepRail";
import { Tablet } from "../Tablet";
import { local, MARKERS } from "../timeline";
import { TitleBox } from "../TitleBox";

const Chip: React.FC<{ text: string; y: number; opacity: number }> = ({ text, y, opacity }) => (
  <div
    style={{
      position: "absolute",
      left: CLOUD.x + 30,
      top: y - 24,
      opacity,
      padding: "8px 20px",
      borderRadius: 999,
      background: theme.colors.text,
      color: theme.colors.onDark,
      fontFamily: theme.fonts.mono,
      fontWeight: 500,
      fontSize: 26,
    }}
  >
    {text}
  </div>
);

// Tablet turun & mengecil, render naik ke cloud, file video turun kembali.
export const S08: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mv = enterAt(frame, fps, 0, 0.7);
  const lerp = (a: number, b: number) => interpolate(mv, [0, 1], [a, b]);
  const { right, render } = TABLET_POS;

  const tCloud = local("S08", MARKERS.cloud) - 0.1;
  const cloud = enterAt(frame, fps, tCloud, 0.5);
  const lineTop = CLOUD.y + 90;
  const lineBottom = render.y - (TABLET.h / 2) * render.s - 10;
  const line = between(frame, fps, tCloud + 0.15, tCloud + 0.5);
  const up = between(frame, fps, tCloud + 0.4, tCloud + 1.0);
  const down = between(frame, fps, tCloud + 1.1, tCloud + 1.6);
  const doneAt = tCloud + 1.6;
  const fadeChip = (p: number) => Math.min(1, p * 5) * Math.min(1, (1 - p) * 5);
  const screenIn = enterAt(frame, fps, 0, 0.35);

  return (
    <Stage dur={dur}>
      <TitleBox dur={dur}>
        <Words text="Tabletnya santai." delay={local("S08", MARKERS.santai) - 0.1} size={TITLE.size} />
        <Words text="Render di *cloud.*" delay={tCloud} size={TITLE.size} />
      </TitleBox>

      <StepRail progress={4 + enterAt(frame, fps, doneAt, 0.4)} />

      <div style={{ position: "absolute", left: CLOUD.x - 150, top: CLOUD.y - 85, ...rise(cloud, 20) }}>
        <CloudIcon />
      </div>
      <div
        style={{
          position: "absolute",
          left: CLOUD.x - 2,
          top: lineTop,
          width: 0,
          height: (lineBottom - lineTop) * line,
          borderLeft: `5px dashed ${theme.colors.muted}`,
        }}
      />
      <Chip text="render ↑" y={interpolate(up, [0, 1], [lineBottom, lineTop])} opacity={fadeChip(up)} />
      <Chip text="video.mp4 ↓" y={interpolate(down, [0, 1], [lineTop, lineBottom])} opacity={fadeChip(down)} />

      <Tablet x={lerp(right.x, render.x)} y={lerp(right.y, render.y)} s={lerp(right.s, render.s)}>
        <Layer opacity={1 - screenIn}>
          <SuaraScreen playFrom={-2} playTo={-1} words={[]} />
        </Layer>
        <Layer opacity={screenIn}>
          <RenderScreen start={0} doneAt={doneAt} />
        </Layer>
      </Tablet>
    </Stage>
  );
};
