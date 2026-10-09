import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { Asset, Bg, card, mono, Out, P, StepHeader, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const BARS = 52;
const heights = Array.from({ length: BARS }, (_, i) => 30 + 150 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.37)));
// Perkiraan per kata di "…sampai ke kata." (dibagi menurut suku kata)
const WORDS = [
  { w: "sampai", at: M.sampai },
  { w: "ke", at: M.ke },
  { w: "kata.", at: M.kata },
];

// Langkah 3: suara → penanda waktu → kata menyala tepat saat diucapkan.
export const S05: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const syncAt = local("S05", M.sinkron) - 0.1;
  const head = interpolate(t, [0.3, dur - 0.3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const now = t + (M.tiga - 0.2); // waktu absolut
  return (
    <Stage dur={dur} fadeOut={false}>
      <Bg name="latar_studio" veil={0.6} />
      <StepHeader step={3} />
      <TitleArea dur={dur}>
        <Words text="Suara → *sinkron*" delay={local("S05", M.tiga) - 0.1} size={96} color={P.ink} accent={P.orangeDark} />
      </TitleArea>
      <Out dur={dur}>
        <div style={{ position: "absolute", left: 96, top: 520, width: 888, padding: "30px 32px", boxSizing: "border-box", ...card, ...rise(enterAt(frame, fps, 0.15, 0.4), 24) }}>
          <div style={{ ...mono, marginBottom: 48 }}>explainremotion001.wav</div>
          <div style={{ position: "relative", height: 210, display: "flex", alignItems: "center", gap: 6 }}>
            {heights.map((h, i) => (
              <div key={i} style={{ width: 9, height: h, borderRadius: 5, background: i / BARS < head ? P.ink : "#E4DCD2" }} />
            ))}
            <div style={{ position: "absolute", left: head * (BARS * 15 - 6), top: -14, width: 5, height: 238, borderRadius: 3, background: P.orange }} />
            {[0.12, 0.3, 0.48, 0.66, 0.84].map((x, i) => {
              const p = enterAt(frame, fps, syncAt + i * 0.12, 0.35);
              return (
                <div key={x} style={{ position: "absolute", left: x * BARS * 15, top: -18 + (1 - p) * -30, opacity: p }}>
                  <div style={{ width: 4, height: 250, background: P.orangeDark, opacity: 0.5 }} />
                  <div style={{ position: "absolute", left: 0, top: 0, width: 30, height: 22, borderRadius: "0 6px 6px 0", background: P.orangeDark }} />
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 22, marginTop: 34, fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 84, letterSpacing: "-0.02em" }}>
            {WORDS.map((w, i) => {
              const lit = now >= w.at - 0.05;
              const cur = lit && (i === WORDS.length - 1 || now < WORDS[i + 1].at - 0.05);
              return (
                <span key={w.w} style={{ color: cur ? P.orange : lit ? P.ink : "#E4DCD2" }}>
                  {w.w}
                </span>
              );
            })}
          </div>
        </div>
        <Asset name="roda_gigi" x={880} y={560} s={0.42} style={{ transform: `rotate(${t * 90}deg)`, opacity: enterAt(frame, fps, syncAt, 0.4) }} />
        <Asset name="mochi_berpikir" x={260} y={1400} s={0.95} style={rise(enterAt(frame, fps, 0.3, 0.5), 30)} />
      </Out>
    </Stage>
  );
};
