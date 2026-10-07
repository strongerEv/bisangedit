import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "./motion";
import { theme } from "./theme";

type Props = {
  /** Kata bertanda *bintang* diberi warna aksen. */
  text: string;
  delay?: number;
  stagger?: number;
  size?: number;
  weight?: number;
  color?: string;
  accent?: string;
};

/** Teks yang masuk per kata (stagger), lalu diam selama dibaca. */
export const Words: React.FC<Props> = ({
  text,
  delay = 0.1,
  stagger = 0.1,
  size = theme.size.title,
  weight = 700,
  color = theme.colors.text,
  accent = theme.colors.accent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div
      style={{
        fontFamily: theme.fonts.heading,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1.04,
        letterSpacing: "-0.025em",
        color,
      }}
    >
      {words.map((raw, i) => {
        // "*kata*" boleh diapit tanda baca, misal "*dalam.*”".
        const m = raw.match(/^([^*]*)\*([^*]+)\*([^*]*)$/);
        const p = enterAt(frame, fps, delay + i * stagger, 0.5);
        return (
          <React.Fragment key={i}>
            <span style={{ display: "inline-block", ...rise(p, 28) }}>
              {m ? (
                <>
                  {m[1]}
                  <span style={{ color: accent }}>{m[2]}</span>
                  {m[3]}
                </>
              ) : (
                raw
              )}
            </span>
            {i < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};
