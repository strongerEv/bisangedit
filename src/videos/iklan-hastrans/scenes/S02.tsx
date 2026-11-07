import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Elf, font, H, img, rupiah } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S02", t);

// Peta rute sederhana (bukan skala): Surabaya kiri atas, Jember tengah, Denpasar kanan bawah (seberang Selat Bali).
const CITY = {
  surabaya: { x: 220, y: 930, name: "Surabaya" },
  jember: { x: 560, y: 1150, name: "Jember" },
  denpasar: { x: 860, y: 1360, name: "Denpasar" },
};
const PATH_SBY = `M ${CITY.denpasar.x} ${CITY.denpasar.y} C 700 1380, 420 1300, 340 1150 S ${CITY.surabaya.x + 10} 1000, ${CITY.surabaya.x} ${CITY.surabaya.y}`;
const PATH_JBR = `M ${CITY.denpasar.x} ${CITY.denpasar.y} C 780 1330, 640 1260, ${CITY.jember.x} ${CITY.jember.y}`;

const Pin: React.FC<{ x: number; y: number; name: string; p: number; price?: number; side?: "left" | "right" | "below" }> = ({ x, y, name, p, price, side = "right" }) => (
  <>
    <div style={{ position: "absolute", left: x - 26, top: y - 26, width: 52, height: 52, borderRadius: 26, background: H.b600, border: "8px solid white", boxSizing: "border-box", boxShadow: `0 10px 24px ${H.shadow}`, transform: `scale(${p})` }} />
    <div
      style={{
        position: "absolute",
        top: side === "below" ? y + 44 : y - 34,
        ...(side === "right" ? { left: x + 44 } : side === "below" ? { left: x - 150, width: 300 } : { right: 1080 - x + 44 }),
        textAlign: side === "right" ? "left" : side === "below" ? "center" : "right",
        ...font,
        ...rise(p, 14),
      }}
    >
      <div style={{ fontWeight: 800, fontSize: 48, color: H.text, lineHeight: 1 }}>{name}</div>
      {price ? <div style={{ marginTop: 6, fontWeight: 700, fontSize: 30, color: H.b600 }}>{rupiah(price)} / kursi</div> : null}
    </div>
  </>
);

// "Ini contohnya: HasTrans, travel Denpasar, Surabaya, dan Jember."
export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame: frame - Math.round((L(M.hastrans) - 0.1) * fps), fps, config: { damping: 12 } });
  const dps = enterAt(frame, fps, L(M.denpasar) + 0.1, 0.4);
  const sby = enterAt(frame, fps, L(M.surabaya) - 0.05, 0.4);
  const jbr = enterAt(frame, fps, L(M.jember) + 0.05, 0.4);
  const drawSby = between(frame, fps, L(M.denpasar) + 0.5, L(M.surabaya));
  const drawJbr = between(frame, fps, L(M.surabaya) + 0.4, L(M.jember) + 0.1);
  const sea = enterAt(frame, fps, L(M.denpasar) - 0.1, 0.5);

  // posisi ELF kecil di sepanjang rute Surabaya
  const pathRef = React.useMemo(() => {
    if (typeof document === "undefined") return null;
    const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
    el.setAttribute("d", PATH_SBY);
    return el;
  }, []);
  const len = pathRef ? pathRef.getTotalLength() : 1;
  const pt = pathRef ? pathRef.getPointAtLength(len * drawSby) : { x: CITY.denpasar.x, y: CITY.denpasar.y };
  const bus = interpolate(drawSby, [0, 0.05, 0.95, 1], [0, 1, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <Stage dur={dur}>
      <Backdrop />
      <div style={{ position: "absolute", left: 90, top: 225, width: 900 }}>
        <Words text="Ini contohnya:" delay={L(M.ini) - 0.1} stagger={0.2} size={64} weight={600} color={H.muted} accent={H.b600} />
      </div>
      <Img
        src={img("logo.png")}
        style={{ position: "absolute", left: 90, top: 320, width: 640, opacity: Math.min(1, logo * 2), transform: `scale(${0.6 + 0.4 * logo})`, transformOrigin: "left center" }}
      />
      <div style={{ position: "absolute", left: 92, top: 540, ...font, fontWeight: 600, fontSize: 44, color: H.text, ...rise(enterAt(frame, fps, L(M.hastrans) + 0.5, 0.4), 14) }}>
        Travel ELF antar kota
      </div>

      {/* Selat Bali */}
      <div style={{ position: "absolute", left: 660, top: 760, width: 100, height: 860, borderRadius: 50, background: `linear-gradient(180deg, ${H.b50}, ${H.b100})`, opacity: sea, transform: "rotate(-14deg)" }} />
      <div style={{ position: "absolute", left: 690, top: 1080, ...font, fontWeight: 700, fontSize: 22, letterSpacing: "0.15em", color: H.b400, opacity: sea, transform: "rotate(-104deg)", transformOrigin: "left top" }}>
        SELAT BALI
      </div>

      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        <path d={PATH_SBY} fill="none" stroke={H.b600} strokeWidth={10} strokeLinecap="round" strokeDasharray="1" pathLength={1} strokeDashoffset={1 - drawSby} />
        <path d={PATH_JBR} fill="none" stroke={H.b400} strokeWidth={10} strokeLinecap="round" strokeDasharray="1" pathLength={1} strokeDashoffset={1 - drawJbr} />
      </svg>

      <Pin {...CITY.denpasar} p={dps} side="below" />
      <Pin {...CITY.surabaya} p={sby} price={250000} />
      <Pin {...CITY.jember} p={jbr} price={200000} />

      <Elf width={150} style={{ position: "absolute", left: pt.x - 75, top: pt.y - 90, opacity: bus * (1 - between(frame, fps, L(M.surabaya) + 0.1, L(M.surabaya) + 0.3)), transform: "scaleX(-1)" }} />
    </Stage>
  );
};
