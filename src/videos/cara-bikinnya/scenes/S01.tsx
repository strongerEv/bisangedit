import React from "react";
import { Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { S02 as RockyS02 } from "../../rocky-wantimpres/scenes/S02";
import { TITLE } from "../layout";
import { local, MARKERS, sec } from "../timeline";

const CARD = { w: 432, h: 768, x: (1080 - 432) / 2, y: 620 };
const BACK_CODE = ["S02.tsx", "", "masuk = spring(…)", "", "<Istana", "  inside={masuk}", "/>"];

// Hook: potongan video pertama diputar di kartu, lalu kartu dibalik → ternyata kode.
export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = enterAt(frame, fps, 0, 0.5);
  const flip = between(frame, fps, 2.2, 2.9) * 180;

  const face: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: 32,
    overflow: "hidden",
    backfaceVisibility: "hidden",
    boxShadow: `0 30px 70px ${theme.colors.shadow}`,
  };

  return (
    <Stage dur={dur}>
      <div style={{ position: "absolute", left: TITLE.x, top: TITLE.y, width: TITLE.w, display: "flex", flexDirection: "column", gap: 20 }}>
        <Words text="Video tadi…" size={TITLE.size} />
        <Words text="tidak dibuat di aplikasi *edit.*" delay={local("S01", MARKERS.tidakDibuat) - 0.1} stagger={0.08} size={TITLE.size} />
      </div>

      <div
        style={{
          position: "absolute",
          left: CARD.x,
          top: CARD.y,
          width: CARD.w,
          height: CARD.h,
          perspective: 1800,
          opacity: card,
          transform: `scale(${0.96 + 0.04 * card})`,
        }}
      >
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", transform: `rotateY(${flip}deg)` }}>
          <div style={{ ...face, background: theme.colors.bg, border: `3px solid ${theme.colors.line}` }}>
            <div style={{ position: "relative", width: 1080, height: 1920, transform: `scale(${CARD.w / 1080})`, transformOrigin: "top left" }}>
              <Sequence from={-sec(0.4)}>
                <RockyS02 dur={10} />
              </Sequence>
            </div>
          </div>
          <div
            style={{
              ...face,
              transform: "rotateY(180deg)",
              background: theme.colors.code,
              padding: "48px 36px",
              boxSizing: "border-box",
              fontFamily: theme.fonts.mono,
              fontWeight: 500,
              fontSize: 30,
              lineHeight: 1.5,
              whiteSpace: "pre",
        fontVariantLigatures: "none",
              color: theme.colors.onDark,
            }}
          >
            {BACK_CODE.map((l, i) => (
              <div key={i} style={{ height: 45, color: i === 0 ? theme.colors.codeMuted : undefined, fontSize: i === 0 ? 24 : undefined }}>
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
};
