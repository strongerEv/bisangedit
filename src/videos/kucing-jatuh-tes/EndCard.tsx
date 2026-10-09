import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../components/motion";
import { theme } from "../../components/theme";
import { Words } from "../../components/Words";
import { P } from "./palette";

const HERO = { w: 570, h: 890 };

// Penutup: close-up Mochi senang + pesan keselamatan.
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fade = interpolate(frame, [0, 0.3 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const up = spring({ frame: frame - 2, fps, config: { damping: 14, stiffness: 120 } });
  const bob = Math.sin((frame / fps) * 3) * 6;
  const s = 1.1;
  return (
    <AbsoluteFill style={{ opacity: fade, background: `linear-gradient(180deg, ${P.endTop} 0%, ${P.endBottom} 100%)` }}>
      <div style={{ position: "absolute", left: 96, top: 250, width: 888 }}>
        <Words text="Kucing itu *keren!*" delay={0.2} stagger={0.12} size={130} color={P.ink} accent={P.orangeDark} />
        <div
          style={{
            marginTop: 26,
            fontFamily: theme.fonts.heading,
            fontWeight: 600,
            fontSize: 42,
            lineHeight: 1.25,
            color: P.brown,
            ...rise(enterAt(frame, fps, 0.7, 0.4), 12),
          }}
        >
          Tapi tetap pasang pengaman di jendela & balkon, ya.
        </div>
      </div>
      <Img
        src={staticFile("karakter/mochi/hero.png")}
        style={{
          position: "absolute",
          left: 540 - (HERO.w * s) / 2,
          top: 1640 - HERO.h * s + (1 - up) * 700 + bob,
          width: HERO.w * s,
          height: HERO.h * s,
        }}
      />
    </AbsoluteFill>
  );
};
