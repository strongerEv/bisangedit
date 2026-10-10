import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Chip, D, font, img } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S01", t);

const STORIES = [
  { src: "cars/toyota-innova.jpg", t: "DIJUAL! Innova 2021 diesel, nego" },
  { src: "cars/mitsubishi-xpander-cross.webp", t: "Xpander Cross 2024 mulus, minat DM" },
  { src: "cars/hyundai-creta.webp", t: "Creta N Line ready, cash/kredit" },
  { src: "cars/toyota-raize.webp", t: "Raize GR 2022, cek story sebelah" },
];

// Hook: "Jualan mobil bekas, tapi stoknya cuma dipajang di status WA?"
// Tampilan status chat generik (tanpa logo aplikasi).
export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const start = 0.2;
  const per = (L(M.kenalin) - 0.3 - start) / STORIES.length;
  const idx = Math.max(0, Math.min(STORIES.length - 1, Math.floor((t - start) / per)));
  const phone = spring({ frame: frame - 2, fps, config: { damping: 14 } });
  const gone = enterAt(frame, fps, L(M.status) + 0.15, 0.35);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <div style={{ position: "absolute", left: 96, top: 210, width: 888 }}>
        <Words text="Stok mobil cuma di *status* *WA?*" delay={L(M.tapi) - 0.1} stagger={0.4} size={100} color={D.text} accent={D.red} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 540 - 250,
          top: 560,
          width: 500,
          height: 1000,
          borderRadius: 60,
          background: D.navy,
          padding: 16,
          boxSizing: "border-box",
          boxShadow: `0 40px 90px ${D.shadow}`,
          opacity: Math.min(1, phone * 2),
          transform: `translateY(${(1 - phone) * 400}px)`,
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 46, overflow: "hidden", background: "#111" }}>
          {STORIES.map((s, i) => (
            <Img key={s.src} src={img(s.src)} style={{ position: "absolute", left: 0, top: 260, width: "100%", height: 420, objectFit: "contain", background: "#ddd", opacity: i === idx ? 1 : 0 }} />
          ))}
          {/* bar progres status */}
          <div style={{ position: "absolute", left: 18, right: 18, top: 22, display: "flex", gap: 6 }}>
            {STORIES.map((_, i) => {
              const p = interpolate(t, [start + i * per, start + (i + 1) * per], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.35)" }}>
                  <div style={{ width: `${p * 100}%`, height: "100%", borderRadius: 3, background: "white" }} />
                </div>
              );
            })}
          </div>
          <div style={{ position: "absolute", left: 22, top: 50, display: "flex", alignItems: "center", gap: 14, ...font, color: "white" }}>
            <div style={{ width: 56, height: 56, borderRadius: 28, background: D.red, fontWeight: 800, fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>PA</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 26 }}>Status saya</div>
              <div style={{ fontSize: 20, opacity: 0.7 }}>{12 - idx * 2} menit lalu</div>
            </div>
          </div>
          <div style={{ position: "absolute", left: 30, right: 30, top: 720, textAlign: "center", ...font, fontWeight: 700, fontSize: 34, color: "white", background: "rgba(0,0,0,0.45)", borderRadius: 18, padding: "16px 18px" }}>
            {STORIES[idx].t}
          </div>
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.75)", opacity: gone }} />
        </div>
      </div>
      <Chip tone="red" style={{ left: 540, top: 1500, transform: `translateX(-50%) scale(${0.8 + 0.2 * gone})`, opacity: gone }}>
        Hilang dalam 24 jam
      </Chip>
    </Stage>
  );
};
