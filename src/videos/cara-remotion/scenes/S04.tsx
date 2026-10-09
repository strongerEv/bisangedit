import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Asset, AssetName, Bg, card, mono, Out, P, StepHeader, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const POSES: AssetName[] = ["mochi_melambai", "mochi_kaget", "mochi_mengetik", "mochi_menunjuk", "mochi_berpikir", "mochi_menonton", "mochi_selebrasi", "mochi_jempol"];
const SHEET = { x: 96, y: 640, w: 888, h: 592 }; // lembar 1536×1024 diperkecil ke lebar 888

// Langkah 2: lembar aset dari ChatGPT → dipotong jadi 8 aset transparan.
export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const sheetIn = enterAt(frame, fps, local("S04", M.chatgpt) - 0.1, 0.5);
  const cutAt = local("S04", M.memotong) - 0.1;
  const cut = between(frame, fps, cutAt, cutAt + 0.5);
  const split = between(frame, fps, cutAt + 0.5, cutAt + 1.1);
  const cw = SHEET.w / 4;
  const ch = SHEET.h / 2;
  return (
    <Stage dur={dur} fadeOut={false}>
      <Bg name="latar_studio" veil={0.6} />
      <StepHeader step={2} />
      <TitleArea dur={dur}>
        <Words text="Aset dari *ChatGPT*" delay={local("S04", M.chatgpt) - 0.1} size={96} color={P.ink} accent={P.orangeDark} />
        <Words text="Claude memotong & merapikan" delay={cutAt} stagger={0.08} size={60} color={P.brown} />
      </TitleArea>
      <Out dur={dur}>
        <div style={{ position: "absolute", left: SHEET.x - 16, top: SHEET.y - 56, width: SHEET.w + 32, height: SHEET.h + 80, ...card, ...rise(sheetIn, 30) }}>
          <div style={{ ...mono, position: "absolute", left: 24, top: 16 }}>{split < 0.5 ? "lembar_mochi.png · dari ChatGPT" : "✓ 8 aset · latar transparan"}</div>
        </div>
        {/* latar kotak-kotak = transparan */}
        <div
          style={{
            position: "absolute",
            left: SHEET.x,
            top: SHEET.y,
            width: SHEET.w,
            height: SHEET.h,
            borderRadius: 16,
            opacity: split,
            background: "repeating-conic-gradient(#ECE6DD 0% 25%, #FFFFFF 0% 50%) 0 0 / 40px 40px",
          }}
        />
        <Img src={staticFile("aset/cara-remotion/lembar_mochi.png")} style={{ position: "absolute", left: SHEET.x, top: SHEET.y, width: SHEET.w, height: SHEET.h, borderRadius: 16, opacity: sheetIn * (1 - split) }} />
        {/* garis potong */}
        <svg width={SHEET.w} height={SHEET.h} style={{ position: "absolute", left: SHEET.x, top: SHEET.y, opacity: 1 - split }}>
          {[1, 2, 3].map((i) => (
            <line key={`v${i}`} x1={i * cw} y1={0} x2={i * cw} y2={SHEET.h * cut} stroke={P.orange} strokeWidth={6} strokeDasharray="18 12" />
          ))}
          <line x1={0} y1={ch} x2={SHEET.w * cut} y2={ch} stroke={P.orange} strokeWidth={6} strokeDasharray="18 12" />
        </svg>
        {/* aset hasil potongan, sedikit merenggang */}
        {POSES.map((n, i) => {
          const col = i % 4;
          const row = Math.floor(i / 4);
          const p = enterAt(frame, fps, cutAt + 0.5 + i * 0.05, 0.4);
          const spread = interpolate(split, [0, 1], [1, 1.04]);
          const cx = SHEET.x + SHEET.w / 2 + (col - 1.5) * cw * spread;
          const cy = SHEET.y + SHEET.h / 2 + (row - 0.5) * ch * spread;
          return <Asset key={n} name={n} x={cx} y={cy - p * 6 + Math.sin(t * 2 + i) * 0} s={0.58} style={{ opacity: p, transform: `scale(${0.85 + 0.15 * p})` }} />;
        })}
      </Out>
    </Stage>
  );
};
