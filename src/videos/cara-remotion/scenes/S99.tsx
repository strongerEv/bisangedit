import React from "react";
import { Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { Asset, Bg, card, mono, P } from "../parts";
import { local, MARKERS as M } from "../timeline";

const KEY = "Remotion";

// Penutup: "Mau tutorial lengkapnya? Komen Remotion di bawah."
export const S99: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = local("S99", M.komen) - 0.1;
  const typed = Math.round(between(frame, fps, k + 0.3, k + 0.9) * KEY.length);
  const blink = Math.floor((frame / fps) * 2) % 2 === 0;
  const up = spring({ frame: frame - 4, fps, config: { damping: 12 } });
  return (
    <Stage dur={dur}>
      <Bg name="latar_gradasi" />
      <Img src={staticFile("brand/youcanbuild-wordmark.png")} style={{ position: "absolute", left: 96, top: 220, width: 260, opacity: 0.9 }} />
      <div style={{ position: "absolute", left: 96, top: 330, width: 888 }}>
        <Words text="Mau tutorial *lengkapnya?*" delay={local("S99", M.tutorial) - 0.1} stagger={0.1} size={104} color={P.ink} accent={P.orangeDark} />
      </div>
      <div style={{ position: "absolute", left: 96, top: 640, width: 888, padding: "28px 30px", boxSizing: "border-box", ...card, ...rise(enterAt(frame, fps, k, 0.4), 24) }}>
        <div style={{ ...mono, marginBottom: 16 }}>TULIS DI KOMENTAR</div>
        <div style={{ height: 110, borderRadius: 55, border: "3px solid #EADFD2", background: "#FFF8F0", display: "flex", alignItems: "center", padding: "0 36px", fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 60, color: P.orangeDark }}>
          {KEY.slice(0, typed)}
          <span style={{ width: 5, height: 60, marginLeft: 6, background: P.ink, opacity: blink ? 1 : 0 }} />
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 860, textAlign: "center", fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 90, color: P.ink, opacity: enterAt(frame, fps, k + 0.9, 0.3), transform: `translateY(${Math.sin((frame / fps) * 5) * 8}px)` }}>↓</div>
      <Asset name="percikan" x={760} y={1150} s={1.1} style={{ opacity: up * 0.9 }} />
      <Asset name="mochi_selebrasi" x={540} y={1330} s={1.25} style={{ opacity: Math.min(1, up * 2), transform: `translateY(${(1 - up) * 400}px)` }} />
    </Stage>
  );
};
