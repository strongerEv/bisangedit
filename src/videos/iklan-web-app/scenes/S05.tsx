import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { mixPose, POSES, Stickman } from "../../../components/Stickman";
import { Words } from "../../../components/Words";
import { LAPTOP, PRACAYA_LABA, SHOT_W, TITLE } from "../layout";
import { Bubble, c, Laptop, mono, RED, Sheet, Shot } from "../parts";
import { local, MARKERS } from "../timeline";

const SCREEN_CX = LAPTOP.x + LAPTOP.bezel + LAPTOP.screenW / 2;
const SCREEN_CY = LAPTOP.y + LAPTOP.bezel + LAPTOP.screenH / 2;

/** Sorotan merah di kartu "Laba Bersih" (koordinat layar laptop). */
export const LabaHighlight: React.FC<{ p: number }> = ({ p }) => {
  const k = LAPTOP.screenW / SHOT_W;
  return (
    <div
      style={{
        position: "absolute",
        left: PRACAYA_LABA.x * k - 8,
        top: PRACAYA_LABA.y * k - 8,
        width: PRACAYA_LABA.w * k + 16,
        height: PRACAYA_LABA.h * k + 16,
        border: `5px solid ${RED}`,
        borderRadius: 14,
        opacity: p,
        transform: `scale(${1.15 - 0.15 * p})`,
      }}
    />
  );
};

// Momen perubahan: kekacauan tersedot ke laptop → dashboard Pracaya asli. Laptop disambung S06.
export const S05: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Dashboard muncul begitu kekacauan selesai tersedot, saat "saatnya…" diucapkan.
  const shotAt = local("S05", MARKERS.saatnya) + 0.1;
  const shot = enterAt(frame, fps, shotAt, 0.5);
  const happy = between(frame, fps, shotAt, shotAt + 0.4);
  const hop = Math.sin(Math.PI * between(frame, fps, shotAt + 0.1, shotAt + 0.6)) * 70;

  // Kekacauan dari adegan sebelumnya tersedot ke tengah layar laptop.
  const suck = (at: number, x: number, y: number) => {
    const p = between(frame, fps, at, at + 0.6);
    return {
      left: interpolate(p, [0, 1], [x, SCREEN_CX - 100]),
      top: interpolate(p, [0, 1], [y, SCREEN_CY - 30]),
      opacity: 1 - p,
      transform: `scale(${1 - 0.8 * p}) rotate(${p * 90}deg)`,
    };
  };

  return (
    <Stage dur={dur} fadeOut={false}>
      <div style={{ position: "absolute", left: TITLE.x, top: TITLE.y, width: TITLE.w, display: "flex", flexDirection: "column", gap: 20, opacity: 1 }}>
        <div style={{ ...mono, ...rise(enterAt(frame, fps, local("S05", MARKERS.kalau) - 0.1, 0.4), 12) }}>KALAU SATU SAJA KENA…</div>
        <Words
          text="Saatnya pakai aplikasi web *khusus* *kantor* Anda."
          delay={local("S05", MARKERS.saatnya) - 0.1}
          stagger={0.07}
          size={TITLE.size}
          accent={RED}
        />
      </div>

      <Laptop appear={enterAt(frame, fps, 0.15, 0.5)}>
        <div style={{ position: "absolute", inset: 0, background: c.card, opacity: 1 - shot }} />
        <Shot src="pracaya-1.webp" style={{ opacity: shot, transform: `scale(${1.04 - 0.04 * shot})` }} />
        <LabaHighlight p={enterAt(frame, fps, shotAt + 1.0, 0.4)} />
      </Laptop>

      <Sheet name="laporan_final_v3.xlsx" style={suck(0.5, 110, 1300)} />
      <Sheet name="stok_FIX_baru.xlsx" style={suck(0.65, 640, 1300)} />
      <Bubble w={200} style={suck(0.8, 60, 1500)} />
      <Bubble w={230} dark style={suck(0.95, 760, 1500)} />

      <Stickman
        x={540}
        y={1430 - hop}
        pose={mixPose(POSES.slump, POSES.cheer, happy)}
        face={happy > 0.4 ? "happy" : "sad"}
        scale={0.9}
      />
    </Stage>
  );
};
