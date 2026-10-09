import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { Backdrop, Chip, F, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

// Pesan asli buatan aplikasi (public/aset/fastreng/pesan-wa.txt); emoji penutup dihilangkan.
const MSG = `*PESANAN BARU — FAST CIRENG*
No. Order: *FC-261009-221046*

*DATA PEMESAN*
Nama : Rina
No. WA : 081234567890
Metode : Diantar (Delivery)
Alamat : Jl. Melati No. 5, Bandung

*DAFTAR PESANAN*
1. Cireng Original Bumbu Rujak (isi 9 pcs)
    2 x Rp15.000 = *Rp30.000*
2. Cireng Sambal Matah (isi 6 pcs)
    1 x Rp20.000 = *Rp20.000*
3. Cireng Pedas Daun Jeruk (isi 6 pcs)
    1 x Rp20.000 = *Rp20.000*
Subtotal (4 item) : Rp70.000
Ongkir : Rp8.000
*TOTAL BAYAR : Rp78.000*

Pembayaran : Bayar di Tempat (COD)`;

const LINE_H = 34;
const TOTAL_LINE = MSG.split("\n").findIndex((l) => l.includes("TOTAL BAYAR"));

const Line: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ height: LINE_H, whiteSpace: "pre" }}>
    {text.split(/(\*[^*]+\*)/g).map((p, i) => (p.startsWith("*") ? <b key={i}>{p.slice(1, -1)}</b> : <span key={i}>{p}</span>))}
  </div>
);

// Pesanan masuk ke WhatsApp penjual — rapi, lengkap dengan total.
export const S05: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const bubble = enterAt(frame, fps, local("S05", M.masukWa) - 0.05, 0.45);
  const scroll = interpolate(t, [local("S05", M.rapi), local("S05", M.total) + 0.2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const hl = enterAt(frame, fps, local("S05", M.total) + 0.4, 0.3);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Langsung masuk *WhatsApp*" delay={local("S05", M.masukWa) - 0.1} stagger={0.1} size={88} color={F.ink} accent={F.green} />
      </TitleArea>
      <Phone width={500} y={1050}>
        <div style={{ position: "absolute", inset: 0, background: F.waBg }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 120, background: "#1F6F5C", display: "flex", alignItems: "flex-end", padding: "0 26px 18px" }}>
          <div style={{ width: 52, height: 52, borderRadius: 26, background: F.orange, marginRight: 16 }} />
          <div style={{ fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 30, color: "white" }}>Fast Cireng · Penjual</div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 20,
            right: 20,
            top: 150 - scroll * 330,
            background: F.waOut,
            borderRadius: 20,
            borderTopRightRadius: 4,
            padding: "18px 20px",
            fontFamily: theme.fonts.heading,
            fontWeight: 500,
            fontSize: 21,
            color: F.ink,
            boxShadow: "0 2px 4px rgba(0,0,0,0.12)",
            ...rise(bubble, 40),
          }}
        >
          {MSG.split("\n").map((l, i) => (
            <Line key={i} text={l} />
          ))}
          <div style={{ position: "absolute", left: 10, right: 10, top: 18 + TOTAL_LINE * LINE_H - 4, height: LINE_H + 8, borderRadius: 10, border: `5px solid ${F.orange}`, opacity: hl }} />
        </div>
      </Phone>
      <Chip dark style={{ left: 640, top: 1240, opacity: enterAt(frame, fps, local("S05", M.rapi) - 0.1, 0.3), transform: `scale(${0.7 + 0.3 * enterAt(frame, fps, local("S05", M.rapi) - 0.1, 0.3)})` }}>
        ✓ Rapi
      </Chip>
    </Stage>
  );
};
