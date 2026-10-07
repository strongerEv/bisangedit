import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { CODE, countChars } from "../code";
import { CodePanel } from "../CodePanel";
import { PANEL, TITLE } from "../layout";
import { local, MARKERS } from "../timeline";
import { TitleBox } from "../TitleBox";

// Panel kode tetap di layar → disambung S04 (match cut).
export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const panel = enterAt(frame, fps, 0.2, 0.5);
  const chars = between(frame, fps, 0.6, 3.4) * countChars(CODE);
  return (
    <Stage dur={dur} fadeOut={false}>
      <TitleBox dur={dur}>
        <Words text="Semuanya ditulis sebagai *kode.*" delay={local("S03", MARKERS.semuanya) - 0.1} size={TITLE.size} />
        <div
          style={{
            ...rise(enterAt(frame, fps, local("S03", MARKERS.remotion) - 0.1, 0.4), 14),
            alignSelf: "flex-start",
            border: `4px solid ${theme.colors.accent}`,
            borderRadius: 999,
            padding: "10px 28px",
            fontFamily: theme.fonts.mono,
            fontWeight: 500,
            fontSize: 30,
            color: theme.colors.accent,
          }}
        >
          pakai Remotion
        </div>
      </TitleBox>
      <CodePanel lines={CODE} chars={chars} style={{ left: PANEL.x, top: PANEL.y, ...rise(panel, 40) }} />
    </Stage>
  );
};
