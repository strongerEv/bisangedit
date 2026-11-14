import React from "react";
import { Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Backdrop, font, img, Phone, W } from "../parts";
import { local, REKAMAN, SEGMENTS, sec } from "../timeline";

const L = (t: number) => local("S02", t);

// Rekaman layar asli, dipotong per fitur dan diputar dengan kecepatan yang menyesuaikan VO + teks penjelasan.
export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const idx = Math.max(0, SEGMENTS.findIndex((s) => t >= L(s.vo[0]) && t < L(s.vo[1])));

  return (
    <Stage dur={dur}>
      <Backdrop />
      <div style={{ position: "absolute", left: 90, top: 190, display: "flex", alignItems: "center", gap: 16 }}>
        <Img src={img("logo.png")} style={{ width: 64, height: 64, borderRadius: 16 }} />
        <div style={{ ...font, fontWeight: 700, fontSize: 36, color: W.ink }}>Sesandingan</div>
      </div>
      <div style={{ position: "absolute", right: 90, top: 204, ...font, fontWeight: 700, fontSize: 32, color: W.muted, fontVariantNumeric: "tabular-nums" }}>
        <span style={{ color: W.wood }}>{SEGMENTS[idx].no}</span> / {SEGMENTS.length}
      </div>

      {SEGMENTS.map((s) => {
        const a = L(s.vo[0]);
        const b = L(s.vo[1]);
        if (t < a - 0.05 || t > b + 0.3) return null;
        const pin = enterAt(frame, fps, a, 0.4);
        const pout = enterAt(frame, fps, b - 0.15, 0.25);
        const o = Math.min(pin, 1 - pout);
        return (
          <div key={s.no} style={{ position: "absolute", left: 90, top: 285, width: 900, opacity: o, transform: `translateY(${(1 - pin) * 24 - pout * 16}px)` }}>
            <div style={{ ...font, fontWeight: 800, fontSize: 68, lineHeight: 1.05, letterSpacing: "-0.02em", color: W.ink }}>{s.title}</div>
            <div style={{ ...font, fontWeight: 500, fontSize: 38, color: W.muted, marginTop: 10 }}>{s.sub}</div>
          </div>
        );
      })}

      <Phone>
        {SEGMENTS.map((s) => {
          const from = sec(L(s.vo[0]));
          const to = sec(L(s.vo[1]));
          const rate = (s.rec[1] - s.rec[0]) / (s.vo[1] - s.vo[0]);
          return (
            <Sequence key={s.no} from={from} durationInFrames={to - from} layout="none">
              <OffthreadVideo src={staticFile(REKAMAN)} muted startFrom={sec(s.rec[0])} playbackRate={rate} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            </Sequence>
          );
        })}
      </Phone>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 1730, textAlign: "center", ...font, fontWeight: 600, fontSize: 26, color: W.muted, opacity: 0.8, ...rise(enterAt(frame, fps, 0.3, 0.4), 8) }}>
        Rekaman layar asli · nama & data hanya contoh
      </div>
    </Stage>
  );
};
