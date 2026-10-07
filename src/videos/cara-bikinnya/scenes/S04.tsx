import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { CODE, CODE_EXTRA, countChars } from "../code";
import { CodePanel } from "../CodePanel";
import { PANEL, TITLE } from "../layout";
import { local, MARKERS } from "../timeline";
import { TitleBox } from "../TitleBox";

export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tName = local("S04", MARKERS.claudeCode) - 0.1;
  const chars = countChars(CODE) + between(frame, fps, tName + 0.1, tName + 0.8) * countChars(CODE_EXTRA);
  return (
    <Stage dur={dur} fadeOut={false}>
      <TitleBox dur={dur}>
        <Words text="Yang menulis kodenya:" delay={local("S04", MARKERS.yangMenulis) - 0.1} size={TITLE.size} />
        <Words text="*Claude* *Code.*" delay={tName} size={TITLE.size} />
      </TitleBox>
      <CodePanel
        lines={[...CODE, ...CODE_EXTRA]}
        chars={chars}
        cursorTag="Claude Code"
        cursorTagOpacity={enterAt(frame, fps, tName, 0.3)}
        style={{ left: PANEL.x, top: PANEL.y }}
      />
    </Stage>
  );
};
