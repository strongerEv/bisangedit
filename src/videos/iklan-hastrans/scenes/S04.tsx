import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, font, H, Lock, SeatMap, seatGeom, type SeatState, TapRipple } from "../parts";
import { local, MARKERS as M } from "../timeline";
import { TAKEN } from "./S03";

const L = (t: number) => local("S04", t);

const MAP_W = 540;
const MAP = { x: 540 - MAP_W / 2, y: 700 };

// "Kursi dikunci sampai dibayar, jadi nggak ada kursi dobel."
export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const map = enterAt(frame, fps, 0, 0.4);
  const lockAt = L(M.kunci) + 0.35;
  const lock8 = between(frame, fps, lockAt, lockAt + 0.25);
  const lock9 = between(frame, fps, lockAt + 0.12, lockAt + 0.37);
  const state = (n: number): SeatState =>
    TAKEN.includes(n) ? "taken" : n === 8 ? (lock8 > 0 ? "locked" : "selected") : n === 9 ? (lock9 > 0 ? "locked" : "selected") : "free";
  const pop = (n: number) => (n === 8 ? lock8 : n === 9 ? lock9 : 0);

  // hitung mundur batas bayar 60 menit (berjalan per detik nyata)
  const timer = enterAt(frame, fps, L(M.dibayar) - 0.1, 0.4);
  const left = Math.max(0, 3600 - Math.floor(Math.max(0, t - (L(M.dibayar) - 0.1))));
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  // pelanggan lain mencoba kursi 8 → ditolak
  const g = seatGeom(MAP_W);
  const c8 = g.center(8);
  const tryAt = L(M.jadi) + 0.45;
  const shake = (n: number) => (n === 8 && t > tryAt && t < tryAt + 0.4 ? Math.sin((t - tryAt) * 70) * 8 : 0);
  const toast = enterAt(frame, fps, tryAt + 0.1, 0.3);
  const sub = enterAt(frame, fps, L(M.jadi) - 0.1, 0.4);

  return (
    <Stage dur={dur}>
      <Backdrop />
      <div style={{ position: "absolute", left: 90, top: 230, width: 900 }}>
        <Words text="Kursi *dikunci* sampai dibayar" delay={L(M.kunci) - 0.1} stagger={0.2} size={92} color={H.text} accent={H.b600} />
      </div>
      <div style={{ position: "absolute", left: 92, top: 470, ...font, fontWeight: 600, fontSize: 52, color: H.muted, ...rise(sub, 16) }}>
        Nggak ada kursi <span style={{ color: H.red, textDecoration: "line-through", textDecorationThickness: 5 }}>dobel</span>
      </div>

      <div style={{ position: "absolute", left: MAP.x, top: MAP.y, ...rise(map, 40) }}>
        <SeatMap w={MAP_W} state={state} pop={pop} shake={shake} />
        <TapRipple x={c8.x} y={c8.y} p={between(frame, fps, tryAt - 0.05, tryAt + 0.4)} r={34} />
        {/* toast penolakan */}
        <div
          style={{
            position: "absolute",
            left: c8.x - 20,
            top: c8.y - 150,
            transform: `translateX(-50%) scale(${0.7 + 0.3 * toast})`,
            transformOrigin: "bottom center",
            opacity: toast,
            background: H.red,
            color: "white",
            borderRadius: 22,
            padding: "14px 26px",
            ...font,
            fontWeight: 700,
            fontSize: 34,
            whiteSpace: "nowrap",
            boxShadow: "0 14px 30px rgba(229,72,77,0.3)",
          }}
        >
          ✕ Kursi 8 sudah dipesan
        </div>
      </div>

      {/* batas waktu bayar */}
      <div style={{ position: "absolute", left: 0, width: 1080, top: MAP.y + g.height + 40, display: "flex", justifyContent: "center", ...rise(timer, 20) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, background: H.b950, color: "white", borderRadius: 999, padding: "16px 34px", ...font, fontWeight: 700, fontSize: 40, boxShadow: `0 16px 40px ${H.shadow}` }}>
          <Lock size={36} color={H.kuning} />
          Bayar dalam <span style={{ color: H.kuning, fontVariantNumeric: "tabular-nums" }}>{mm}:{ss}</span>
        </div>
      </div>
    </Stage>
  );
};
