import { CameraMotionBlur } from "@remotion/motion-blur";
import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { catAt, SPRITES } from "./cat";
import { Caption } from "./Caption";
import { AirArrows, Dust, FlipArc, SpeedLines } from "./Fx";
import { P } from "./palette";
import { camY, CAPTIONS, GROUND_Y, speedAt, T } from "./timeline";
import { City, Ground, Sky } from "./World";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Mochi + garis kecepatan — dibungkus motion blur, jadi dihitung ulang per sub-frame. */
const Moving: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cam = camY(frame);
  const cat = catAt(t);
  return (
    <AbsoluteFill>
      <SpeedLines cam={cam} intensity={Math.min(1, speedAt(t) / 2600)} />
      {cat.layers.map((l) =>
        l.opacity <= 0.001 ? null : (
          <Img
            key={l.sprite}
            src={staticFile(`karakter/mochi/${l.sprite}.png`)}
            style={{
              position: "absolute",
              left: cat.x - (SPRITES[l.sprite].w * l.scale) / 2,
              top: cat.y - (SPRITES[l.sprite].h * l.scale) / 2,
              width: SPRITES[l.sprite].w * l.scale,
              height: SPRITES[l.sprite].h * l.scale,
              opacity: l.opacity,
              transform: `rotate(${l.rot}deg) scale(${cat.sx}, ${cat.sy})`,
              transformOrigin: t >= T.land ? "50% 100%" : "50% 50%",
            }}
          />
        ),
      )}
    </AbsoluteFill>
  );
};

/** Satu shot menerus: atap → jatuh → membalik → parasut → mendarat. */
export const Shot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cam = camY(frame);
  const cat = catAt(t);

  const push = interpolate(t, [0, T.slip, T.fall + 0.3], [1, 1.07, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const shakeK = t >= T.land ? Math.exp(-14 * (t - T.land)) : 0;
  const sx = Math.sin(frame * 2.3) * 16 * shakeK;
  const sy = Math.cos(frame * 3.1) * 12 * shakeK;

  const arcDraw = interpolate(t, [T.flip, T.flipEnd], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const arcFade = interpolate(t, [T.flip, T.flip + 0.1, T.spread + 0.3, T.spread + 0.6], [0, 1, 1, 0], clamp);
  const air = interpolate(t, [T.spread + 0.4, T.spread + 0.7, T.land - 0.5, T.land - 0.3], [0, 1, 1, 0], clamp);
  const nearGround = interpolate(t, [T.ground, T.land], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ background: P.skyBottom }}>
      <AbsoluteFill style={{ transform: `translate(${sx}px, ${sy}px) scale(${push})`, transformOrigin: "450px 1150px" }}>
        <Sky cam={cam} />
        <City cam={cam} />
        <Ground cam={cam} />
        {/* bayangan di tanah, makin jelas saat mendekat */}
        <div
          style={{
            position: "absolute",
            left: 540 - 170 * (0.5 + nearGround / 2),
            top: GROUND_Y - 22,
            width: 340 * (0.5 + nearGround / 2),
            height: 44,
            borderRadius: "50%",
            background: P.shadow,
            opacity: nearGround,
          }}
        />
        <FlipArc cx={cat.x} cy={cat.y} draw={arcDraw} opacity={arcFade} />
        <AirArrows cx={cat.x} cy={cat.y} t={t} opacity={air} />
        <CameraMotionBlur shutterAngle={180} samples={6}>
          <Moving />
        </CameraMotionBlur>
        <Dust x={540} y={GROUND_Y} u={t - T.land} />
      </AbsoluteFill>
      {CAPTIONS.map((c) => (
        <Caption key={c.text} text={c.text} frame={frame} fps={fps} from={c.from} to={c.to} />
      ))}
    </AbsoluteFill>
  );
};
