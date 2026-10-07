import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { TABLET_POS, TITLE } from "../layout";
import { AnimasiScreen } from "../screens/AnimasiScreen";
import { Layer } from "../screens/common";
import { SuaraScreen } from "../screens/SuaraScreen";
import { StepRail } from "../StepRail";
import { Tablet } from "../Tablet";
import { local, MARKERS, SINKRON_WORDS } from "../timeline";
import { TitleBox } from "../TitleBox";

export const S07: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tIn = local("S07", MARKERS.suara) - 0.1;
  const on = enterAt(frame, fps, tIn, 0.35);
  const words = SINKRON_WORDS.map((w) => ({ word: w.word, at: local("S07", w.at) }));

  return (
    <Stage dur={dur} fadeOut={false}>
      <TitleBox dur={dur}>
        <Words text="Suara masuk, sinkron sampai ke *kata.*" delay={tIn} stagger={0.08} size={TITLE.size} />
      </TitleBox>

      <StepRail progress={3 + on} />

      <Tablet x={TABLET_POS.right.x} y={TABLET_POS.right.y}>
        <Layer opacity={1 - on}>
          <AnimasiScreen start={-10} />
        </Layer>
        <Layer opacity={on} shift={(1 - on) * 20}>
          <SuaraScreen playFrom={tIn + 0.1} playTo={local("S07", 27.5)} words={words} />
        </Layer>
      </Tablet>
    </Stage>
  );
};
