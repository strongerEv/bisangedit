import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Asset, Bg, P } from "../parts";
import { local, MARKERS as M } from "../timeline";

// Hook: papan klap berbunyi, Mochi kaget, "Namanya Remotion."
export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const clap = spring({ frame: frame - 3, fps, config: { damping: 9, stiffness: 200 } });
  const mochi = spring({ frame: frame - Math.round((local("S01", M.kode) - 0.1) * fps), fps, config: { damping: 11 } });
  const burst = Math.max(0, 1 - Math.abs(frame / fps - 0.35) * 3);
  return (
    <Stage dur={dur}>
      <Bg name="latar_studio" veil={0.35} />
      <div style={{ position: "absolute", left: 96, top: 280, width: 888, display: "flex", flexDirection: "column", gap: 10 }}>
        <Words text="Video ini… dibuat pakai *kode.*" delay={local("S01", M.videoIni) - 0.1} stagger={0.12} size={104} color={P.ink} accent={P.orangeDark} />
        <Words text="Namanya *Remotion.*" delay={local("S01", M.namanya) - 0.1} stagger={0.2} size={128} color={P.ink} accent={P.orangeDark} />
      </div>
      <Asset name="papan_klap" x={770} y={1080} s={1.15} style={{ transform: `rotate(${(1 - clap) * -18}deg) scale(${0.7 + 0.3 * clap})`, opacity: Math.min(1, clap * 2) }} />
      {[-40, 0, 40].map((a, i) => (
        <div key={i} style={{ position: "absolute", left: 770 + Math.sin((a * Math.PI) / 180) * 230, top: 880 - Math.cos((a * Math.PI) / 180) * 120, width: 12, height: 56, borderRadius: 6, background: P.orange, opacity: burst, transform: `rotate(${a}deg)` }} />
      ))}
      <Asset name="mochi_kaget" x={330} y={1270} s={1.45} style={{ opacity: Math.min(1, mochi * 2), transform: `translateY(${(1 - mochi) * 260}px)` }} />
    </Stage>
  );
};
