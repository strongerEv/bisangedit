import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { c, L, RED } from "../parts";
import { local, MARKERS } from "../timeline";

// Penutup: simpan video → konsultasi gratis di Youcanbuild.
export const S99: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = local("S99", MARKERS.konsultasi) - 0.1;
  const logo = enterAt(frame, fps, brand, 0.5);
  return (
    <Stage dur={dur}>
      <div style={{ position: "absolute", left: L.x, top: 250, width: L.w, display: "flex", flexDirection: "column", gap: 16 }}>
        <Words text="Simpan video ini." delay={local("S99", MARKERS.simpan) - 0.1} size={L.titleSize} />
        <Words text="Mau dibantu *bikin?*" delay={local("S99", MARKERS.dibantu) - 0.1} size={L.titleSize} accent={RED} />
      </div>

      <div style={{ position: "absolute", left: L.x, top: 760, width: L.w, display: "flex", flexDirection: "column", gap: 40 }}>
        <Img
          src={staticFile("brand/youcanbuild-wordmark.png")}
          style={{ width: 560, opacity: logo, transform: `scale(${0.96 + 0.04 * logo})`, transformOrigin: "left center" }}
        />
        <Words text="Konsultasi *gratis.*" delay={brand + 0.2} size={112} accent={RED} />
        <div
          style={{
            alignSelf: "flex-start",
            ...rise(enterAt(frame, fps, brand + 0.6, 0.5), 24),
            background: RED,
            color: c.card,
            borderRadius: 999,
            padding: "32px 58px",
            fontFamily: theme.fonts.heading,
            fontWeight: 700,
            fontSize: 52,
            boxShadow: "0 18px 40px rgba(242, 13, 13, 0.28)",
          }}
        >
          Konsultasi sekarang →
        </div>
      </div>
    </Stage>
  );
};
