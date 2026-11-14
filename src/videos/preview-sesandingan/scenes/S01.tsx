import React from "react";
import { Img, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, font, img, Phone, Tag, W } from "../parts";

// Pembuka (tanpa VO): "Undangan digital tema One Piece" + HP berisi cover.
export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phone = enterAt(frame, fps, 0.35, 0.7);
  return (
    <Stage dur={dur} fadeOut={false}>
      <Backdrop />
      <div style={{ position: "absolute", left: 90, top: 190, display: "flex", alignItems: "center", gap: 16, ...rise(enterAt(frame, fps, 0, 0.4), 14) }}>
        <Img src={img("logo.png")} style={{ width: 64, height: 64, borderRadius: 16 }} />
        <div style={{ ...font, fontWeight: 700, fontSize: 36, color: W.ink }}>Sesandingan</div>
      </div>
      <div style={{ position: "absolute", left: 90, top: 280, width: 900 }}>
        <Words text="Undangan digital tema *One* *Piece*" delay={0.15} stagger={0.12} size={84} color={W.ink} accent={W.wood} />
      </div>
      <Phone style={{ ...rise(phone, 220) }}>
        <Img src={img("cover.jpg")} style={{ width: "100%", height: "100%" }} />
      </Phone>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 1760, textAlign: "center", ...rise(enterAt(frame, fps, 1.1, 0.4), 10) }}>
        <Tag>THE WEDDING JOURNEY</Tag>
      </div>
    </Stage>
  );
};
