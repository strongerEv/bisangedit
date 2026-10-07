import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Label } from "../../../components/Label";
import { between, enterAt, rise } from "../../../components/motion";
import { Scene } from "../../../components/Scene";
import { theme } from "../../../components/theme";
import { local, MARKERS } from "../timeline";

// Jeda komedi: "mengetik…" setelah pertanyaan selesai, lalu "dungu." tepat saat diucapkan.
const TYPING_FROM = local("S06", MARKERS.tanya) + 1.9;
const REPLY_AT = local("S06", MARKERS.jawab) - 0.1;
const DUNGU_AT = local("S06", MARKERS.dungu) - 0.1;

export const S06: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ask = enterAt(frame, fps, local("S06", MARKERS.tanya) - 0.1, 0.5);
  const typingIn = enterAt(frame, fps, TYPING_FROM, 0.3);
  const typingOut = 1 - between(frame, fps, REPLY_AT - 0.15, REPLY_AT);
  const reply = enterAt(frame, fps, REPLY_AT, 0.5);
  const dungu = enterAt(frame, fps, DUNGU_AT, 0.3);

  return (
    <Scene dur={dur} tag="05 · Imajinasi">
      <Label text="Adegan imajinasi" />
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <Bubble who="Pimpinan rapat" side="left" style={{ opacity: ask, transform: `translateX(${(1 - ask) * -40}px)` }}>
          Bagaimana pendapat Bung Rocky?
        </Bubble>

        <div style={{ position: "relative", minHeight: 230 }}>
          <div style={{ position: "absolute", right: 0, top: 0, ...rise(typingIn * typingOut, 16) }}>
            <Typing frame={frame} fps={fps} />
          </div>
          <Bubble
            who="Rocky"
            side="right"
            style={{ opacity: reply, transform: `translateX(${(1 - reply) * 40}px)` }}
          >
            Pertanyaannya…{" "}
            <span style={{ color: theme.colors.accent, display: "inline-block", opacity: dungu, transform: `scale(${0.96 + 0.04 * dungu})` }}>
              dungu.
            </span>
          </Bubble>
        </div>
      </div>
    </Scene>
  );
};

const Bubble: React.FC<{
  who: string;
  side: "left" | "right";
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ who, side, style, children }) => {
  const dark = side === "right";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: dark ? "flex-end" : "flex-start", gap: 14, ...style }}>
      <div
        style={{
          fontFamily: theme.fonts.mono,
          fontWeight: 500,
          fontSize: theme.size.label,
          letterSpacing: "0.06em",
          color: theme.colors.muted,
        }}
      >
        {who}
      </div>
      <div
        style={{
          maxWidth: 760,
          background: dark ? theme.colors.text : theme.colors.card,
          color: dark ? theme.colors.onDark : theme.colors.text,
          borderRadius: 40,
          borderBottomLeftRadius: dark ? 40 : 10,
          borderBottomRightRadius: dark ? 10 : 40,
          padding: "36px 44px",
          boxShadow: `0 16px 40px ${theme.colors.shadow}`,
          fontFamily: theme.fonts.heading,
          fontWeight: 600,
          fontSize: 54,
          lineHeight: 1.15,
          letterSpacing: "-0.015em",
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** Indikator "sedang mengetik": jeda komedi sebelum jawaban. */
const Typing: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => (
  <div
    style={{
      marginTop: 44,
      display: "flex",
      gap: 14,
      background: theme.colors.text,
      borderRadius: 40,
      borderBottomRightRadius: 10,
      padding: "30px 40px",
    }}
  >
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          width: 18,
          height: 18,
          borderRadius: 9,
          background: theme.colors.onDark,
          opacity: 0.35 + 0.65 * Math.max(0, Math.sin((frame / fps) * 2 * Math.PI * 1.6 - i * 0.9)),
        }}
      />
    ))}
  </div>
);
