import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { mixPose, POSES, Stickman, walkPose } from "../../../components/Stickman";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { TITLE } from "../layout";
import { c, RED, RedPill } from "../parts";

const STOP = 1.6;

// Hook: stickman berjalan masuk, berhenti, lalu berpikir.
export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const x = interpolate(t, [0.3, STOP], [-160, 480], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const walking = walkPose(Math.min(t, STOP) * 1.4);
  const pose = mixPose(walking, POSES.think, between(frame, fps, STOP, STOP + 0.4));
  const q = enterAt(frame, fps, 2.0, 0.4);

  return (
    <Stage dur={dur}>
      <div style={{ position: "absolute", left: TITLE.x, top: TITLE.y, width: TITLE.w, display: "flex", flexDirection: "column", gap: 28 }}>
        <RedPill text="3 TANDA" style={rise(enterAt(frame, fps, 0.05, 0.4), 12)} />
        <Words text="Kantor Anda sudah butuh *aplikasi* *sendiri?*" delay={0.2} stagger={0.08} size={TITLE.size} accent={RED} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 610,
          top: 900,
          width: 120,
          height: 120,
          borderRadius: 60,
          border: `8px solid ${RED}`,
          background: c.card,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: theme.fonts.heading,
          fontWeight: 700,
          fontSize: 72,
          color: RED,
          opacity: Math.min(1, q * 2),
          transform: `scale(${q})`,
        }}
      >
        ?
      </div>
      <Stickman x={x} y={1400} pose={pose} face="neutral" facing={1} scale={1.3} />
    </Stage>
  );
};
