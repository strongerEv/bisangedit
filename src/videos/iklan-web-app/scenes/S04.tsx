import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { runPose, Stickman } from "../../../components/Stickman";
import { Words } from "../../../components/Words";
import { TITLE } from "../layout";
import { BigNum, c, mono, RED } from "../parts";
import { local, MARKERS } from "../timeline";

const WHEEL = { x: 540, y: 1230, r: 270 };

// Tanda 3: stickman berlari di roda yang makin cepat.
export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const wheelIn = enterAt(frame, fps, 2.3, 0.5);
  const u = Math.max(0, t - 2.5);
  const angle = 120 * u + 70 * u * u;
  const phase = 0.9 * u + 0.4 * u * u;

  return (
    <Stage dur={dur}>
      <div style={{ position: "absolute", left: TITLE.x, top: TITLE.y, width: TITLE.w, display: "flex", flexDirection: "column", gap: 8 }}>
        <BigNum n="3" pop={enterAt(frame, fps, local("S04", MARKERS.tiga) - 0.1, 0.4)} />
        <div style={{ ...mono, color: RED, ...rise(enterAt(frame, fps, local("S04", MARKERS.diabaikan) - 0.1, 0.4), 12), marginBottom: 12 }}>
          YANG PALING SERING DIABAIKAN:
        </div>
        <Words text="Tim sibuk, kerjaannya *itu-itu* *lagi.*" delay={local("S04", MARKERS.timSibuk) - 0.1} stagger={0.08} size={TITLE.size} accent={RED} />
      </div>

      <div style={{ opacity: wheelIn, transform: `scale(${0.9 + 0.1 * wheelIn})`, transformOrigin: `${WHEEL.x}px ${WHEEL.y}px`, position: "absolute", inset: 0 }}>
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <circle cx={WHEEL.x} cy={WHEEL.y} r={WHEEL.r} fill="none" stroke={c.line} strokeWidth={14} />
          <g transform={`rotate(${angle} ${WHEEL.x} ${WHEEL.y})`}>
            {[0, 180].map((a) => (
              <g key={a} transform={`rotate(${a} ${WHEEL.x} ${WHEEL.y})`}>
                <path
                  d={`M ${WHEEL.x} ${WHEEL.y - WHEEL.r} A ${WHEEL.r} ${WHEEL.r} 0 0 0 ${WHEEL.x - WHEEL.r} ${WHEEL.y}`}
                  fill="none"
                  stroke={RED}
                  strokeWidth={14}
                  strokeLinecap="round"
                />
                <path
                  d={`M ${WHEEL.x - WHEEL.r} ${WHEEL.y} l -30 -36 M ${WHEEL.x - WHEEL.r} ${WHEEL.y} l 34 -30`}
                  stroke={RED}
                  strokeWidth={14}
                  strokeLinecap="round"
                />
              </g>
            ))}
          </g>
        </svg>
        <div style={{ position: "absolute", left: 0, width: 1080, top: WHEEL.y + WHEEL.r + 30, textAlign: "center", ...mono, letterSpacing: "0.02em" }}>
          input → rekap → kirim → ulang
        </div>
        <Stickman x={WHEEL.x} y={WHEEL.y + WHEEL.r - 7 - 176} pose={runPose(phase)} face="stress" facing={1} />
      </div>
    </Stage>
  );
};
