import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt } from "../../../components/motion";
import { Bubble, Sheet } from "../../iklan-web-app/parts";
import { Sticky } from "../parts";

/** Tumpukan chat, Excel, dan catatan. `at` = waktu lokal munculnya tiap kelompok; `sweep` 0→1 menyapu keluar. */
export const Clutter: React.FC<{ at: { chat: number; excel: number; note: number }; sweep?: number }> = ({ at, sweep = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = (t: number, fx: number, fy: number, x: number, y: number, rot: number, dir: number): React.CSSProperties => {
    const p = enterAt(frame, fps, t, 0.45);
    return {
      left: interpolate(p, [0, 1], [fx, x]) + dir * sweep * 1300,
      top: interpolate(p, [0, 1], [fy, y]) - sweep * 200,
      opacity: Math.min(1, p * 3),
      transform: `rotate(${rot * p + dir * sweep * 40}deg)`,
    };
  };
  return (
    <>
      <Bubble w={220} style={pop(at.chat, 540, 1900, 90, 640, -4, -1)} />
      <Bubble w={180} dark style={pop(at.chat + 0.15, 540, 1900, 700, 600, 5, 1)} />
      <Bubble w={260} style={pop(at.chat + 0.3, 540, 1900, 140, 980, 3, -1)} />
      <Sheet name="stok_FIX.xlsx" style={pop(at.excel, 1300, 700, 640, 760, 6, 1)} />
      <Sheet name="stok_FIX (2).xlsx" style={pop(at.excel + 0.2, -400, 800, 90, 800, -7, -1)} />
      <Sticky text="Bu Rina 1,2jt udah?" style={pop(at.note, 540, -300, 700, 1020, 8, 1)} />
      <Sticky text="Kamar 102 bayar??" style={pop(at.note + 0.2, 540, -300, 110, 1180, -6, -1)} />
    </>
  );
};
