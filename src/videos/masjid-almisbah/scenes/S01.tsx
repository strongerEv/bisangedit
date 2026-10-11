import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, B, Center, Chip, font, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S01", t);
const NOTES = [
  { x: -120, d: 0.0, c: "#7FB59A", r: -12 },
  { x: 40, d: 0.35, c: "#D9B86A", r: 8 },
  { x: -40, d: 0.7, c: "#9CC7B1", r: -4 },
  { x: 110, d: 1.05, c: "#E3C98B", r: 14 },
];

// "Uang infak masjid itu amanah. Tapi jamaah sering cuma tahu dari pengumuman sekilas tiap Jumat."
export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const box = spring({ frame: frame - 3, fps, config: { damping: 13 } });
  const blurIn = enterAt(frame, fps, L(M.tapi) + 0.3, 0.4);
  const fade = interpolate(t, [L(M.pengumuman), L(M.pengumuman) + 1.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Uang infak itu *amanah*" delay={L(M.uang) - 0.1} stagger={0.3} size={104} color={B.text} accent={B.b600} />
      </TitleArea>
      {/* uang kertas masuk ke kotak */}
      {NOTES.map((n, i) => {
        const p = interpolate(t, [L(M.uang) + 0.3 + n.d, L(M.uang) + 1.1 + n.d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={i} style={{ position: "absolute", left: 540 + n.x - 90, top: 520 + p * 330, width: 180, height: 90, borderRadius: 10, background: n.c, border: "4px solid rgba(255,255,255,0.7)", transform: `rotate(${n.r * (1 - p)}deg)`, opacity: p > 0 && p < 1 ? 1 : 0 }} />
        );
      })}
      {/* kotak amal */}
      <div style={{ position: "absolute", left: 540 - 230, top: 880, width: 460, height: 420, borderRadius: 34, background: `linear-gradient(180deg, ${B.b500}, ${B.b700})`, boxShadow: `0 40px 80px ${B.shadow}`, opacity: Math.min(1, box * 2), transform: `translateY(${(1 - box) * 200}px)`, ...font }}>
        <div style={{ position: "absolute", left: 120, right: 120, top: 34, height: 22, borderRadius: 11, background: B.b900 }} />
        <div style={{ position: "absolute", left: 50, right: 50, top: 150, borderRadius: 20, border: `4px solid ${B.accent}`, color: "#F3DFAE", textAlign: "center", padding: "26px 0", fontWeight: 800, fontSize: 52, letterSpacing: "0.08em" }}>KOTAK AMAL</div>
      </div>
      {/* pengumuman sekilas, makin samar */}
      <div style={{ position: "absolute", left: 120, top: 1370, width: 840, ...rise(blurIn, 24) }}>
        <div style={{ background: B.soft, border: `2px solid ${B.border}`, borderRadius: 34, padding: "28px 34px", ...font, fontSize: 40, color: B.muted, filter: `blur(${fade * 7}px)`, opacity: 1 - fade * 0.6 }}>
          "…infak Jumat kemarin terkumpul sekian, terima kasih…"
        </div>
      </div>
      <Center top={1700}>
        <Chip tone="accent" style={rise(enterAt(frame, fps, L(M.pengumuman) + 0.6, 0.3), 20)}>Cuma sekilas?</Chip>
      </Center>
    </Stage>
  );
};
