import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Asset, AssetName, Bg, Bubble, mono, Out, P, StepHeader, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const FRAMES: AssetName[] = ["mochi_kaget", "ikon_kode", "mochi_mengetik", "roda_gigi", "mochi_menonton", "roket"];
const PICK = 3;

// Langkah 4: Claude kirim gambar preview; minta revisi lewat chat.
export const S06: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pv = local("S06", M.preview) - 0.1;
  const fix = local("S06", M.kurang) - 0.1;
  const ring = enterAt(frame, fps, fix, 0.3);
  return (
    <Stage dur={dur}>
      <Bg name="latar_bioskop" />
      <StepHeader step={4} dark />
      <TitleArea dur={dur}>
        <Words text="Cek *preview*" delay={pv} size={96} color="white" accent={P.orange} />
      </TitleArea>
      <Out dur={dur}>
        <div style={{ position: "absolute", left: 96, top: 480, width: 888, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {FRAMES.map((n, i) => (
            <div
              key={n}
              style={{
                position: "relative",
                height: 420,
                borderRadius: 20,
                overflow: "hidden",
                outline: i === PICK ? `6px solid rgba(255,138,61,${ring})` : "none",
                outlineOffset: 4,
                boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
                ...rise(enterAt(frame, fps, pv + 0.1 + i * 0.08, 0.35), 20),
              }}
            >
              <Img src={staticFile("aset/cara-remotion/latar_studio.png")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <Asset name={n} x={140} y={240} s={0.5} />
              <div style={{ ...mono, fontSize: 20, position: "absolute", left: 10, top: 8, color: P.ink, background: "rgba(255,255,255,0.8)", borderRadius: 8, padding: "2px 8px" }}>{`frame ${(i + 1) * 90}`}</div>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 96, top: 1380, width: 888, ...rise(enterAt(frame, fps, fix, 0.35), 14) }}>
          <Bubble me who="saya">Yang ini geser sedikit, ya.</Bubble>
        </div>
        <Asset name="mochi_menonton" x={240} y={1490} s={0.75} style={rise(enterAt(frame, fps, 0.3, 0.5), 30)} />
      </Out>
    </Stage>
  );
};
