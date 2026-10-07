import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { CODE, CODE_EXTRA } from "../code";
import { CodePanel } from "../CodePanel";
import { CODE_IN_SCREEN, TABLET_POS, TITLE } from "../layout";
import { AnimasiScreen } from "../screens/AnimasiScreen";
import { Layer } from "../screens/common";
import { IdeScreen } from "../screens/IdeScreen";
import { NaskahScreen } from "../screens/NaskahScreen";
import { StoryboardScreen } from "../screens/StoryboardScreen";
import { StepRail } from "../StepRail";
import { Tablet } from "../Tablet";
import { local, MARKERS } from "../timeline";
import { TitleBox } from "../TitleBox";

// Tablet geser ke kanan, rel langkah muncul. Isi layar berganti mengikuti VO.
export const S06: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mv = enterAt(frame, fps, 0, 0.7);
  const x = interpolate(mv, [0, 1], [TABLET_POS.center.x, TABLET_POS.right.x]);

  const at = [MARKERS.ide, MARKERS.naskah, MARKERS.storyboard, MARKERS.animasi].map((t) => local("S06", t) - 0.1);
  const on = at.map((t) => enterAt(frame, fps, t, 0.35));
  const progress = on[1] + on[2] + on[3];
  const vis = (i: number) => on[i] * (i + 1 < on.length ? 1 - on[i + 1] : 1);

  return (
    <Stage dur={dur} fadeOut={false}>
      <TitleBox dur={dur}>
        <Words text="Saya ketik ide." delay={at[0]} size={TITLE.size} />
        <Words text="*Claude* yang kerjakan sisanya." delay={at[1]} stagger={0.08} size={TITLE.size} />
      </TitleBox>

      <StepRail progress={progress} appear={between(frame, fps, 0.1, 0.9)} />

      <Tablet x={x} y={TABLET_POS.right.y}>
        <Layer opacity={1 - on[0]} bg={theme.colors.code}>
          <CodePanel
            lines={[...CODE, ...CODE_EXTRA]}
            style={{ left: 0, top: 0, transform: `scale(${CODE_IN_SCREEN})`, transformOrigin: "top left", boxShadow: "none" }}
          />
        </Layer>
        <Layer opacity={vis(0)}>
          <IdeScreen start={at[0]} />
        </Layer>
        <Layer opacity={vis(1)} shift={(1 - on[1]) * 20}>
          <NaskahScreen start={at[1]} />
        </Layer>
        <Layer opacity={vis(2)} shift={(1 - on[2]) * 20}>
          <StoryboardScreen start={at[2]} />
        </Layer>
        <Layer opacity={vis(3)} shift={(1 - on[3]) * 20}>
          <AnimasiScreen start={at[3]} />
        </Layer>
      </Tablet>
    </Stage>
  );
};
