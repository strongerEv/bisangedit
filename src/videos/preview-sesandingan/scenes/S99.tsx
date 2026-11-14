import React from "react";
import { Img, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, font, img, W } from "../parts";

// Penutup: logo Sesandingan + ajakan pesan.
export const S99: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const logo = enterAt(frame, fps, 0.1, 0.5);
  const btn = enterAt(frame, fps, 1.1, 0.5);
  const pulse = 1 + 0.03 * Math.sin(Math.max(0, t - 1.7) * 6) * btn;
  return (
    <Stage dur={dur} fadeOut={false}>
      <Backdrop />
      <Img src={img("logo.png")} style={{ position: "absolute", left: 540 - 130, top: 380, width: 260, height: 260, borderRadius: 60, boxShadow: `0 30px 70px rgba(95,168,224,0.35)`, opacity: logo, transform: `scale(${0.8 + 0.2 * logo})` }} />
      <div style={{ position: "absolute", left: 0, width: 1080, top: 690, textAlign: "center", ...font, fontWeight: 800, fontSize: 96, color: W.ink, letterSpacing: "-0.02em", ...rise(logo, 20) }}>Sesandingan</div>
      <div style={{ position: "absolute", left: 90, top: 830, width: 900, textAlign: "center" }}>
        <Words text="Undangan digital *interaktif* untuk hari bahagiamu" delay={0.5} stagger={0.1} size={58} weight={600} color={W.muted} accent={W.wood} />
      </div>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 1080, display: "flex", justifyContent: "center", transform: `scale(${pulse})`, ...rise(btn, 30) }}>
        <div style={{ background: W.sky, color: "white", borderRadius: 999, padding: "32px 60px", ...font, fontWeight: 700, fontSize: 54, boxShadow: "0 18px 40px rgba(95,168,224,0.4)" }}>Pesan undanganmu →</div>
      </div>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 1300, textAlign: "center", ...font, fontWeight: 600, fontSize: 30, color: W.muted, opacity: between(frame, fps, 1.6, 2.1) }}>
        Nama & data di video ini hanya contoh.
      </div>
    </Stage>
  );
};
