import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { mixPose, POSES, Stickman } from "../../../components/Stickman";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { TITLE } from "../layout";
import { BigNum, c, Card, RED } from "../parts";
import { local, MARKERS } from "../timeline";

const DESK_Y = 1380;
const PAPERS = 9;

// Tanda 1: kertas menumpuk, kalender berganti ke 31, stickman lemas.
export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const flipAt = local("S02", MARKERS.akhirBulan) - 0.1;
  const flip = between(frame, fps, flipAt, flipAt + 0.3);
  const tired = between(frame, fps, 2.0, 2.6);
  const drop = enterAt(frame, fps, 2.9, 0.5);

  return (
    <Stage dur={dur}>
      <div style={{ position: "absolute", left: TITLE.x, top: TITLE.y, width: TITLE.w, display: "flex", flexDirection: "column", gap: 8 }}>
        <BigNum n="1" pop={enterAt(frame, fps, local("S02", MARKERS.satu) - 0.1, 0.4)} />
        <Words text="Laporan masih direkap *manual.*" delay={local("S02", MARKERS.laporan) - 0.1} stagger={0.08} size={TITLE.size} accent={RED} />
      </div>

      <div style={{ position: "absolute", left: 96, top: DESK_Y, width: 888, height: 12, borderRadius: 6, background: c.text }} />

      {Array.from({ length: PAPERS }).map((_, i) => {
        const p = spring({ frame: frame - Math.round((1.0 + i * 0.18) * fps), fps, config: { damping: 14, stiffness: 140 } });
        const restY = DESK_Y - 52 - i * 52;
        return (
          <Card
            key={i}
            style={{
              left: 140 + (i % 2) * 14 - 7,
              top: interpolate(p, [0, 1], [restY - 500, restY]),
              opacity: Math.min(1, p * 3),
              width: 260,
              height: 50,
              borderRadius: 8,
            }}
          />
        );
      })}

      <Card style={{ left: 780, top: 760, width: 180, height: 190, overflow: "hidden", ...rise(enterAt(frame, fps, 0.6, 0.4), 20) }}>
        <div style={{ height: 50, background: RED }} />
        <div style={{ position: "relative", height: 130 }}>
          {[
            { n: "30", o: 1 - flip, y: -40 * flip },
            { n: "31", o: flip, y: 40 * (1 - flip) },
          ].map((d) => (
            <div
              key={d.n}
              style={{
                position: "absolute",
                inset: 0,
                textAlign: "center",
                fontFamily: theme.fonts.heading,
                fontWeight: 700,
                fontSize: 96,
                color: c.text,
                opacity: d.o,
                transform: `translateY(${d.y}px)`,
              }}
            >
              {d.n}
            </div>
          ))}
        </div>
      </Card>

      <div
        style={{
          position: "absolute",
          left: 700,
          top: 1000 + drop * 60,
          width: 22,
          height: 32,
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          background: c.line,
          opacity: drop * (1 - between(frame, fps, 3.5, 3.8)),
        }}
      />
      <Stickman
        x={620}
        y={DESK_Y - 176}
        pose={mixPose(POSES.stand, POSES.slump, tired)}
        face={tired > 0.5 ? "sad" : "neutral"}
        facing={-1}
      />
    </Stage>
  );
};
