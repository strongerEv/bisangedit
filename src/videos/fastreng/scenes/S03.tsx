import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { Backdrop, cssToScreen, F, Phone, TapRipple, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const W = 500;
const CARD = cssToScreen(105, 420, W); // foto menu pertama di 03_tap
const BAR = cssToScreen(195, 728, W); // bar keranjang (diukur dari screenshot)

// Tap foto menu = +1 porsi.
export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const taps = [local("S03", M.sekaliTap) - 0.05, local("S03", M.satuPorsi) - 0.2];
  const plus = (at: number) => spring({ frame: frame - Math.round(at * fps), fps, config: { damping: 10 } });
  const bar = enterAt(frame, fps, local("S03", M.satuPorsi) + 0.3, 0.3);
  return (
    <Stage dur={dur} fadeOut={false}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Tap foto = *+1* *porsi*" delay={local("S03", M.tapFoto) - 0.1} stagger={0.1} size={92} color={F.ink} accent={F.orangeDeep} />
      </TitleArea>
      <Phone src="03_tap.png" width={W} y={1050}>
        {taps.map((at, i) => (
          <React.Fragment key={i}>
            <TapRipple x={CARD.x} y={CARD.y} p={between(frame, fps, at, at + 0.5)} />
            <div
              style={{
                position: "absolute",
                left: CARD.x - 40,
                top: CARD.y - 70 - plus(at) * 60,
                fontFamily: theme.fonts.heading,
                fontWeight: 700,
                fontSize: 56,
                color: F.orangeDeep,
                textShadow: "0 4px 0 white",
                opacity: plus(at) * (1 - between(frame, fps, at + 0.5, at + 0.8)),
              }}
            >
              +1
            </div>
          </React.Fragment>
        ))}
        <div style={{ position: "absolute", left: BAR.x - 240, top: BAR.y - 46, width: 480, height: 92, borderRadius: 26, border: `6px solid ${F.orange}`, opacity: bar }} />
      </Phone>
    </Stage>
  );
};
