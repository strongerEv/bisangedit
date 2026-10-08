import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { c, L, mono, PanLogo, SatireTag } from "../parts";

export const CLIP_BOX = { x: L.x, y: 720, w: L.w, h: Math.round((L.w * 9) / 16) };

// RUANG KOSONG 6 dtk: kotak 16:9 gelap untuk klip pidato (ditempel user di CapCut). Tanpa suara.
export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage dur={dur}>
      <SatireTag />
      <div style={{ position: "absolute", left: L.x, top: CLIP_BOX.y - 110, display: "flex", alignItems: "center", gap: 20, ...rise(enterAt(frame, fps, 0, 0.4), 12) }}>
        <PanLogo height={80} />
        <div style={{ ...mono, color: c.text }}>Pidato Presiden · HUT ke-28 PAN · 18 Sep 2026</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: CLIP_BOX.x,
          top: CLIP_BOX.y,
          width: CLIP_BOX.w,
          height: CLIP_BOX.h,
          background: c.text,
          borderRadius: 24,
        }}
      />
    </Stage>
  );
};
