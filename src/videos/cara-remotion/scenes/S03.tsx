import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Asset, AssetName, Bg, Bubble, card, mono, Out, P, StepHeader, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const ASK = "Buatkan naskah video tentang Remotion.";
const BOARD: AssetName[] = ["papan_klap", "ikon_kode", "roda_gigi", "tombol_play", "roket", "file_video"];

// Langkah 1: minta naskah → fakta dicek → storyboard.
export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const typed = Math.round(between(frame, fps, local("S03", M.naskah), local("S03", M.naskah) + 1.0) * ASK.length);
  const sb = local("S03", M.storyboard) - 0.1;
  return (
    <Stage dur={dur} fadeOut={false}>
      <Bg name="latar_studio" veil={0.6} />
      <StepHeader step={1} />
      <TitleArea dur={dur}>
        <Words text="Minta *naskah*" delay={local("S03", M.naskah) - 0.1} size={96} color={P.ink} accent={P.orangeDark} />
      </TitleArea>
      <Out dur={dur}>
      <div style={{ position: "absolute", left: 96, top: 470, width: 888, display: "flex", flexDirection: "column", gap: 22 }}>
        <Bubble me who="saya" style={rise(enterAt(frame, fps, local("S03", M.naskah) - 0.1, 0.3), 12)}>
          {ASK.slice(0, Math.max(1, typed))}
        </Bubble>
        <Bubble who="Claude" style={rise(enterAt(frame, fps, local("S03", M.cekFakta) - 0.1, 0.35), 12)}>
          Siap. <span style={{ color: P.orangeDark }}>✓ Fakta sudah dicek</span>
        </Bubble>
      </div>
      <div style={{ position: "absolute", left: 96, top: 900, width: 888, padding: 28, boxSizing: "border-box", ...card, ...rise(enterAt(frame, fps, sb, 0.4), 24) }}>
        <div style={{ ...mono, marginBottom: 18 }}>STORYBOARD</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {BOARD.map((n, i) => (
            <div key={n} style={{ position: "relative", height: 150, borderRadius: 18, background: P.cream, ...rise(enterAt(frame, fps, sb + 0.1 + i * 0.07, 0.3), 10) }}>
              <Asset name={n} x={120} y={78} s={0.36} />
              <div style={{ ...mono, fontSize: 22, position: "absolute", left: 12, top: 10 }}>S0{i + 1}</div>
            </div>
          ))}
        </div>
      </div>
      <Asset name="mochi_mengetik" x={300} y={1470} s={0.8} style={rise(enterAt(frame, fps, 0.2, 0.5), 30)} />
      </Out>
    </Stage>
  );
};
