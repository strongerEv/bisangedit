import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, exitAt, rise } from "../../components/motion";
import { theme } from "../../components/theme";

export const c = theme.colors;
export const RED = c.brand;

// Posisi tetap (px): progress di atas, judul, lalu satu jendela yang isinya berganti tiap langkah.
export const L = {
  x: 96,
  w: 888,
  progressY: 236,
  titleY: 330,
  win: { y: 700, h: 760 },
  titleSize: 96,
};

export const mono: React.CSSProperties = {
  fontFamily: theme.fonts.mono,
  fontWeight: 500,
  fontSize: 26,
  letterSpacing: "0.06em",
  color: c.muted,
};

export const STEPS = 5;

/** Progress 5 segmen + label "LANGKAH n / 5". Segmen aktif terisi merah saat adegan mulai. */
export const Progress: React.FC<{ step: number; appear?: number }> = ({ step, appear = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fill = between(frame, fps, 0.05, 0.5);
  const segW = (L.w - (STEPS - 1) * 12) / STEPS;
  return (
    <div style={{ position: "absolute", left: L.x, top: L.progressY, width: L.w, opacity: appear }}>
      <div style={{ ...mono, color: c.text, marginBottom: 18 }}>
        LANGKAH <span style={{ color: RED }}>{step}</span> / {STEPS}
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {Array.from({ length: STEPS }).map((_, i) => {
          const n = i + 1;
          const w = n < step ? 1 : n === step ? fill : 0;
          return (
            <div key={i} style={{ width: segW, height: 12, borderRadius: 6, background: c.line, overflow: "hidden" }}>
              <div style={{ width: `${w * 100}%`, height: "100%", background: n === step ? RED : c.text }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Judul langkah. Keluar sendiri di akhir adegan (panggung tidak di-fade). */
export const StepTitle: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: L.x, top: L.titleY, width: L.w, opacity: exitAt(frame, fps, dur) }}>
      {children}
    </div>
  );
};

/** Jendela aplikasi generik (tiga titik + judul tab). Isi = children, keluar sendiri di akhir adegan. */
export const Window: React.FC<{
  dur?: number;
  tab: string;
  appear?: number;
  children: React.ReactNode;
}> = ({ dur, tab, appear = 1, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const contentOut = dur === undefined ? 1 : exitAt(frame, fps, dur, 0.25);
  const contentIn = enterAt(frame, fps, 0.05, 0.4);
  return (
    <div
      style={{
        position: "absolute",
        left: L.x,
        top: L.win.y,
        width: L.w,
        height: L.win.h,
        background: c.card,
        borderRadius: 32,
        border: `4px solid ${c.text}`,
        boxShadow: `0 30px 70px ${c.shadow}`,
        overflow: "hidden",
        ...rise(appear, 40),
      }}
    >
      <div style={{ height: 64, borderBottom: `3px solid ${c.line}`, display: "flex", alignItems: "center", gap: 12, padding: "0 28px" }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 16, height: 16, borderRadius: 8, background: i === 0 ? RED : c.line }} />
        ))}
        <div style={{ ...mono, fontSize: 24, letterSpacing: "0.02em", marginLeft: 12, opacity: contentIn * contentOut }}>{tab}</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 64, bottom: 0, padding: 48, opacity: contentIn * contentOut }}>{children}</div>
    </div>
  );
};

/** Kotak simpul bernama (dipakai untuk diagram koneksi). */
export const Node: React.FC<{ label: string; sub?: string; active?: boolean; style?: React.CSSProperties }> = ({
  label,
  sub,
  active,
  style,
}) => (
  <div
    style={{
      position: "absolute",
      borderRadius: 24,
      border: `4px solid ${active ? RED : c.text}`,
      background: c.card,
      padding: "22px 28px",
      boxSizing: "border-box",
      ...style,
    }}
  >
    <div style={{ fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 44, color: c.text, letterSpacing: "-0.02em" }}>{label}</div>
    {sub ? <div style={{ ...mono, fontSize: 24, marginTop: 6 }}>{sub}</div> : null}
  </div>
);

/** Teks isi standar di dalam jendela. */
export const body = (size = 40): React.CSSProperties => ({
  fontFamily: theme.fonts.heading,
  fontWeight: 600,
  fontSize: size,
  lineHeight: 1.25,
  color: c.text,
  letterSpacing: "-0.01em",
});

export const Check: React.FC<{ text: string; p: number }> = ({ text, p }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 18, ...rise(p, 14) }}>
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        background: RED,
        color: c.card,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: theme.fonts.mono,
        fontSize: 28,
        fontWeight: 500,
      }}
    >
      ✓
    </div>
    <div style={body(40)}>{text}</div>
  </div>
);
