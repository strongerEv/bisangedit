import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, exitAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { mixPose, POSES, Stickman } from "../../../components/Stickman";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { LAPTOP, TITLE } from "../layout";
import { c, Laptop, mono, RED, Shot } from "../parts";
import { local, MARKERS } from "../timeline";
import { LabaHighlight } from "./S05";

const THUMBS = ["pracaya", "wismaku", "dealer", "fastreng", "bengkellas", "ibnusina", "ingonentok", "lpduitku", "rintis"];
const POINT_SCREEN: typeof POSES.point = { ...POSES.point, armR: [150, -10] };

const Chip: React.FC<{ text: string; style?: React.CSSProperties }> = ({ text, style }) => (
  <div
    style={{
      position: "absolute",
      left: LAPTOP.x,
      top: LAPTOP.y - 64,
      padding: "8px 22px",
      borderRadius: 999,
      background: c.text,
      color: c.onDark,
      fontFamily: theme.fonts.mono,
      fontWeight: 500,
      fontSize: 26,
      ...style,
    }}
  >
    {text}
  </div>
);

// Bukti karya: Pracaya → Wismaku (denah kamar) → deretan karya lain.
export const S06: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const kos = local("S06", MARKERS.kos) - 0.1;
  const grid = local("S06", MARKERS.sudahKami) - 0.1;
  const slide = between(frame, fps, kos, kos + 0.5);
  const zoom = between(frame, fps, kos + 0.5, kos + 1.4);
  const gridIn = between(frame, fps, grid, grid + 0.35);
  const out = exitAt(frame, fps, dur);

  return (
    <Stage dur={dur}>
      <div style={{ position: "absolute", left: TITLE.x, top: TITLE.y, width: TITLE.w, display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ ...mono, color: RED, ...rise(enterAt(frame, fps, 0.05, 0.4), 12) }}>KARYA YOUCANBUILD</div>
        <Words text="Contoh yang sudah kami *bangun.*" delay={local("S06", MARKERS.seperti) - 0.1} stagger={0.08} size={TITLE.size} accent={RED} />
      </div>

      {/* Laptop: Pracaya → Wismaku */}
      <div style={{ opacity: 1 - gridIn }}>
        <Chip text="Pracaya · laporan outlet" style={{ opacity: 1 - slide }} />
        <Chip text="Wisma Avicenna · manajemen kos" style={{ opacity: slide }} />
        <Laptop>
          <Shot src="pracaya-1.webp" style={{ transform: `translateX(${-100 * slide}%)` }} />
          <div style={{ position: "absolute", inset: 0, transform: `translateX(${-100 * slide}%)` }}>
            <LabaHighlight p={1 - between(frame, fps, 0, 0.3)} />
          </div>
          <Shot src="wismaku-2.webp" style={{ transform: `translateX(${100 * (1 - slide)}%) scale(${1 + 0.08 * zoom})`, transformOrigin: "35% 40%" }} />
        </Laptop>
      </div>

      {/* Deretan karya lain */}
      <div
        style={{
          position: "absolute",
          left: 96,
          top: LAPTOP.y - 20,
          width: 888,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}
      >
        {THUMBS.map((n, i) => {
          const p = enterAt(frame, fps, grid + i * 0.05, 0.4);
          return (
            <Img
              key={n}
              src={staticFile(`karya/${n}-thumb.webp`)}
              style={{
                width: "100%",
                aspectRatio: "16 / 10",
                objectFit: "cover",
                borderRadius: 16,
                border: `3px solid ${c.line}`,
                boxShadow: `0 12px 30px ${c.shadow}`,
                opacity: p * out,
                transform: `scale(${0.9 + 0.1 * p})`,
              }}
            />
          );
        })}
      </div>

      <Stickman
        x={540}
        y={1430}
        pose={mixPose(POSES.cheer, POINT_SCREEN, between(frame, fps, 0, 0.4))}
        face="happy"
        facing={1}
        scale={0.9}
      />
    </Stage>
  );
};
