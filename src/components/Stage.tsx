import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { exitAt } from "./motion";
import { theme } from "./theme";

type Props = {
  /** Durasi adegan dalam detik (dari timeline.ts). */
  dur: number;
  /** false = elemen dibiarkan tetap di layar untuk dilanjutkan adegan berikut (match cut). */
  fadeOut?: boolean;
  children: React.ReactNode;
};

/** Panggung dengan posisi bebas (absolute). Dipakai saat elemen harus menyambung antar adegan. */
export const Stage: React.FC<Props> = ({ dur, fadeOut = true, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const out = fadeOut ? exitAt(frame, fps, dur) : 1;
  return (
    <AbsoluteFill style={{ background: theme.colors.bg }}>
      <AbsoluteFill style={{ opacity: out }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
