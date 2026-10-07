import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { exitAt } from "../../components/motion";
import { TITLE } from "./layout";

/** Area judul di posisi tetap. Keluar sendiri di akhir adegan (dipakai saat panggung tidak di-fade). */
export const TitleBox: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left: TITLE.x,
        top: TITLE.y,
        width: TITLE.w,
        opacity: exitAt(frame, fps, dur),
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {children}
    </div>
  );
};
