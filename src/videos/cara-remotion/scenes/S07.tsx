import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { Asset, Bg, Bubble, Out, P, StepHeader, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

// Langkah 5: ketik "gas" → roket melesat → file MP4 jadi.
export const S07: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const gas = local("S07", M.gas) - 0.2;
  const typed = Math.round(between(frame, fps, gas, gas + 0.25) * 3);
  const mp4 = local("S07", M.mp4) - 0.1;
  const fly = between(frame, fps, mp4 - 0.3, mp4 + 0.6);
  const drop = spring({ frame: frame - Math.round((mp4 + 0.35) * fps), fps, config: { damping: 9, stiffness: 140 } });
  const burst = enterAt(frame, fps, mp4 + 0.5, 0.4);
  return (
    <Stage dur={dur}>
      <Bg name="latar_studio" veil={0.6} />
      <StepHeader step={5} />
      <TitleArea dur={dur}>
        <Words text="Ketik *gas*" delay={local("S07", M.lima) - 0.1} size={96} color={P.ink} accent={P.orangeDark} />
      </TitleArea>
      <Out dur={dur}>
        <div style={{ position: "absolute", left: 96, top: 480, width: 888, ...rise(enterAt(frame, fps, gas - 0.1, 0.3), 12) }}>
          <Bubble me who="saya">{"gas".slice(0, Math.max(1, typed))}</Bubble>
        </div>
        <Asset
          name="roket"
          x={interpolate(fly, [0, 1], [120, 1180])}
          y={interpolate(fly, [0, 1], [1500, 420], { easing: Easing.in(Easing.quad) })}
          s={0.9}
          style={{ opacity: fly > 0 && fly < 1 ? 1 : 0 }}
        />
        <Asset name="percikan" x={560} y={1020} s={1.4} style={{ opacity: burst * (1 - between(frame, fps, mp4 + 1.4, mp4 + 2.0)), transform: `scale(${0.5 + 0.5 * burst})` }} />
        <Asset name="file_video" x={560} y={interpolate(drop, [0, 1], [-300, 1050])} s={1.15} />
        <div
          style={{
            position: "absolute",
            left: 0,
            width: 1080,
            top: 1290,
            textAlign: "center",
            fontFamily: theme.fonts.mono,
            fontWeight: 500,
            fontSize: 44,
            color: P.ink,
            opacity: enterAt(frame, fps, mp4 + 0.7, 0.3),
          }}
        >
          video.mp4
        </div>
        <Asset name="mochi_jempol" x={230} y={1460} s={0.8} style={rise(enterAt(frame, fps, mp4 + 0.6, 0.4), 30)} />
      </Out>
    </Stage>
  );
};
