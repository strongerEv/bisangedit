import { CameraMotionBlur } from "@remotion/motion-blur";
import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { catAt, flipAngle, SPRITES } from "./cat";
import { Caption } from "./Caption";
import { EarBadge, KokBisa, SpeedCompare, StepChip, window01, XrayCard } from "./Explainers";
import { AirArrows, Dust, FlipArc, SpeedLines } from "./Fx";
import { P } from "./palette";
import { camY, CAPTIONS, GROUND_Y, MARKERS as M, speedAt, T } from "./timeline";
import { City, Ground, Sky } from "./World";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Mochi + garis kecepatan — dibungkus motion blur. */
const Moving: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cam = camY(frame);
  const cat = catAt(t);
  return (
    <AbsoluteFill>
      <SpeedLines cam={cam} intensity={Math.min(1, speedAt(t) / 2400)} />
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

/** Satu shot menerus dari atap sampai mendarat, dengan grafik penjelas di atasnya. */
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
  const freeze = window01(t, T.freezeA, T.freezeB + 0.1, 0.25);

  const arcDraw = flipAngle(t) / 180;
  const arcOn = window01(t, T.flip1 - 0.05, T.xrayA, 0.2);
  const steps = window01(t, M.depan - 0.1, T.xrayA, 0.25);
  const air = window01(t, T.spread + 0.3, T.land - 0.3);
  const nearGround = interpolate(t, [T.ground, T.land], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ background: P.skyBottom }}>
      <AbsoluteFill style={{ transform: `translate(${sx}px, ${sy}px) scale(${push})`, transformOrigin: "450px 1150px" }}>
        <Sky cam={cam} />
        <City cam={cam} />
        <Ground cam={cam} />
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
        {/* vinyet saat waktu melambat */}
        <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 45%, rgba(0,0,0,0) 35%, rgba(19,41,75,0.55) 100%)", opacity: freeze }} />
        <FlipArc cx={cat.x} cy={cat.y} draw={arcDraw} opacity={arcOn} />
        <AirArrows cx={cat.x} cy={cat.y} t={t} opacity={air} />
        <CameraMotionBlur shutterAngle={180} samples={6}>
          <Moving />
        </CameraMotionBlur>
        <Dust x={540} y={GROUND_Y} u={t - T.land} />
      </AbsoluteFill>

      <KokBisa p={window01(t, M.kokBisa - 0.1, T.freezeB + 0.05, 0.2)} />
      <EarBadge x={cat.x + 270} y={cat.y - 170} p={window01(t, M.telinga + 0.1, T.flip1 - 0.2)} t={t} />
      <StepChip x={cat.x - 380} y={cat.y - 330} n="1" text="depan dulu" p={steps} />
      <StepChip x={cat.x + 40} y={cat.y + 250} n="2" text="baru belakang" p={steps * interpolate(t, [M.belakang - 0.1, M.belakang + 0.15], [0, 1], clamp)} />
      <XrayCard p={window01(t, T.xrayA, T.xrayB)} t={t} clavicle={interpolate(t, [M.selangka - 0.1, M.selangka + 0.3], [0, 1], clamp)} />
      <SpeedCompare p={window01(t, M.parasut - 0.1, M.mendarat - 0.15)} grow={interpolate(t, [M.pelan - 0.1, M.pelan + 0.7], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) })} />

      {CAPTIONS.map((c) => (
        <Caption key={c.text} text={c.text} frame={frame} fps={fps} from={c.from} to={c.to} />
      ))}
    </AbsoluteFill>
  );
};
