import React from "react";
import { Img, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Backdrop, font, img, Phone, W } from "../parts";
import { CAPTIONS, REKAMAN } from "../timeline";

// Rekaman layar asli + teks penjelasan per fitur. Waktu lokal adegan = waktu rekaman.
export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const idx = Math.max(0, CAPTIONS.findIndex((c, i) => t >= c.at && (i === CAPTIONS.length - 1 || t < CAPTIONS[i + 1].at)));

  return (
    <Stage dur={dur}>
      <Backdrop />
      <div style={{ position: "absolute", left: 90, top: 190, display: "flex", alignItems: "center", gap: 16 }}>
        <Img src={img("logo.png")} style={{ width: 64, height: 64, borderRadius: 16 }} />
        <div style={{ ...font, fontWeight: 700, fontSize: 36, color: W.ink }}>Sesandingan</div>
      </div>
      <div style={{ position: "absolute", right: 90, top: 204, ...font, fontWeight: 700, fontSize: 32, color: W.muted, fontVariantNumeric: "tabular-nums" }}>
        <span style={{ color: W.wood }}>{CAPTIONS[idx].no}</span> / {CAPTIONS.length}
      </div>

      {CAPTIONS.map((c, i) => {
        const next = CAPTIONS[i + 1]?.at ?? dur + 1;
        if (t < c.at - 0.05 || t > next + 0.3) return null;
        const pin = enterAt(frame, fps, c.at, 0.4);
        const pout = enterAt(frame, fps, next - 0.15, 0.25);
        const o = Math.min(pin, 1 - pout);
        return (
          <div key={c.no} style={{ position: "absolute", left: 90, top: 285, width: 900, opacity: o, transform: `translateY(${(1 - pin) * 24 - pout * 16}px)` }}>
            <div style={{ ...font, fontWeight: 800, fontSize: 68, lineHeight: 1.05, letterSpacing: "-0.02em", color: W.ink }}>{c.title}</div>
            <div style={{ ...font, fontWeight: 500, fontSize: 38, color: W.muted, marginTop: 10 }}>{c.sub}</div>
          </div>
        );
      })}

      <Phone>
        <OffthreadVideo src={staticFile(REKAMAN)} muted style={{ width: "100%", height: "100%" }} />
      </Phone>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 1730, textAlign: "center", ...font, fontWeight: 600, fontSize: 26, color: W.muted, opacity: 0.8, ...rise(enterAt(frame, fps, 0.3, 0.4), 8) }}>
        Rekaman layar asli · nama & data hanya contoh
      </div>
    </Stage>
  );
};
