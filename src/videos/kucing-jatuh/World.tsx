import React from "react";
import { AbsoluteFill } from "remotion";
import { P } from "./palette";
import { GROUND_WORLD } from "./timeline";

const H = 1920;

/** Bangunan dengan kisi jendela; hanya baris jendela yang terlihat yang digambar. */
const Building: React.FC<{ x: number; w: number; top: number; cam: number; color: string; cols: number; seed: number }> = ({
  x,
  w,
  top,
  cam,
  color,
  cols,
  seed,
}) => {
  const screenTop = top - cam;
  const bottom = GROUND_WORLD + 400 - cam;
  const rowH = 150;
  const first = Math.max(0, Math.floor((cam - top) / rowH) - 1);
  const last = Math.floor((cam + H - top) / rowH) + 1;
  const pad = 34;
  const cw = (w - pad * 2) / cols;
  const windows: React.ReactNode[] = [];
  for (let r = first; r <= last; r++) {
    const y = top + 70 + r * rowH - cam;
    if (top + 70 + r * rowH > GROUND_WORLD - 120) break;
    for (let c = 0; c < cols; c++) {
      const lit = Math.abs(Math.sin((r + 1) * 12.9898 + (c + 1) * 78.233 + seed)) > 0.82;
      windows.push(
        <div
          key={`${r}-${c}`}
          style={{ position: "absolute", left: x + pad + c * cw + 10, top: y, width: cw - 20, height: 86, borderRadius: 8, background: lit ? P.windowLit : P.window, opacity: 0.9 }}
        />,
      );
    }
  }
  return (
    <>
      <div style={{ position: "absolute", left: x, top: screenTop, width: w, height: bottom - screenTop, background: color }} />
      {windows}
    </>
  );
};

/** Latar langit + kota jauh (paralaks lambat). */
export const Sky: React.FC<{ cam: number }> = ({ cam }) => {
  const far = cam * 0.12;
  const skyline = [
    { x: -20, w: 200, top: 980 },
    { x: 170, w: 150, top: 1120 },
    { x: 300, w: 230, top: 900 },
    { x: 520, w: 170, top: 1060 },
    { x: 680, w: 240, top: 960 },
    { x: 900, w: 200, top: 1100 },
  ];
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${P.skyTop} 0%, ${P.skyBottom} 70%)` }}>
      {[
        { x: 120, y: 420, s: 1 },
        { x: 640, y: 300, s: 1.3 },
        { x: 820, y: 640, s: 0.8 },
      ].map((cl, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: cl.x,
            top: cl.y - cam * 0.05,
            width: 260 * cl.s,
            height: 90 * cl.s,
            borderRadius: 999,
            background: "rgba(255,255,255,0.75)",
            filter: "blur(2px)",
          }}
        />
      ))}
      {skyline.map((b, i) => (
        <div key={i} style={{ position: "absolute", left: b.x, top: b.top - far, width: b.w, height: 4200, background: P.buildingFar, borderRadius: "10px 10px 0 0" }} />
      ))}
    </AbsoluteFill>
  );
};

/** Gedung dekat (bergerak penuh mengikuti kamera) + tepi atap tempat Mochi duduk. */
export const City: React.FC<{ cam: number }> = ({ cam }) => (
  <AbsoluteFill>
    <Building x={760} w={320} top={420} cam={cam} color={P.buildingNear2} cols={2} seed={3} />
    <Building x={0} w={600} top={1290} cam={cam} color={P.buildingNear} cols={4} seed={7} />
    {/* tepi atap */}
    <div style={{ position: "absolute", left: 0, top: 1250 - cam, width: 640, height: 26, background: P.ledgeTop, borderRadius: "0 8px 0 0" }} />
    <div style={{ position: "absolute", left: 0, top: 1276 - cam, width: 630, height: 34, background: P.ledgeFace }} />
  </AbsoluteFill>
);

/** Tanah berumput. */
export const Ground: React.FC<{ cam: number }> = ({ cam }) => {
  const y = GROUND_WORLD - cam;
  if (y > H + 50) return null;
  return (
    <>
      <div style={{ position: "absolute", left: 0, top: y, width: 1080, height: 900, background: P.grass }} />
      <div style={{ position: "absolute", left: 0, top: y, width: 1080, height: 24, background: P.grassDark }} />
    </>
  );
};
