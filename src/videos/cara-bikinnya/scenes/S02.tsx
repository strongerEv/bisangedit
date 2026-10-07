import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { DragIcon, TimelineIcon } from "../Icons";
import { TITLE } from "../layout";
import { local, MARKERS } from "../timeline";

const Row: React.FC<{ top: number; appear: number; strike: number; icon: React.ReactNode; label: string }> = ({
  top,
  appear,
  strike,
  icon,
  label,
}) => (
  <div style={{ position: "absolute", left: TITLE.x, top, width: 800, ...rise(appear, 30) }}>
    <div style={{ display: "flex", alignItems: "center", gap: 40, opacity: 1 - 0.55 * strike }}>
      {icon}
      <div
        style={{
          fontFamily: theme.fonts.heading,
          fontWeight: 700,
          fontSize: 68,
          letterSpacing: "-0.02em",
          color: theme.colors.text,
        }}
      >
        {label}
      </div>
    </div>
    {/* Garis coret */}
    <div
      style={{
        position: "absolute",
        left: -10,
        top: 70,
        width: `${strike * 100}%`,
        height: 10,
        borderRadius: 5,
        background: theme.colors.accent,
        transform: "rotate(-3deg)",
        transformOrigin: "left center",
      }}
    />
  </div>
);

export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t1 = local("S02", MARKERS.timeline);
  const t2 = local("S02", MARKERS.drag);
  return (
    <Stage dur={dur}>
      <div style={{ position: "absolute", left: TITLE.x, top: TITLE.y, width: TITLE.w }}>
        <Words text="Tidak ada…" size={TITLE.size} />
      </div>
      <Row top={780} appear={enterAt(frame, fps, t1 - 0.1, 0.5)} strike={between(frame, fps, t1 + 0.8, t1 + 1.15)} icon={<TimelineIcon />} label="Timeline" />
      <Row top={1060} appear={enterAt(frame, fps, t2 - 0.1, 0.5)} strike={between(frame, fps, t2 + 0.9, t2 + 1.25)} icon={<DragIcon />} label="Drag-and-drop" />
    </Stage>
  );
};
