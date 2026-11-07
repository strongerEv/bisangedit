import React from "react";
import { Img, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Center, Chip, H, img, Phone } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S05", t);

// Isi pesan mengikuti bookingMessage() di lib/wa.ts HasTrans (data contoh).
const LINES: { text: string; bold?: boolean; gap?: boolean }[] = [
  { text: "Halo HasTrans, saya mau konfirmasi pesanan travel 🙏" },
  { text: "Kode Booking: HT7K2Q", bold: true, gap: true },
  { text: "Nama: Rina Wulandari" },
  { text: "Rute: Denpasar → Surabaya" },
  { text: "Tanggal: Sab, 14 Nov 2026" },
  { text: "Jam berangkat: 08.00 WITA" },
  { text: "Kursi: 8, 9" },
  { text: "Penumpang:", gap: true },
  { text: "1. Kursi 8 - Rina" },
  { text: "2. Kursi 9 - Dimas" },
  { text: "Jemput: Jl. Teuku Umar 21, Denpasar", gap: true },
  { text: "Antar: Jl. Darmo 45, Surabaya" },
  { text: "Total: Rp500.000", bold: true, gap: true },
];

// "Pesanan langsung masuk WhatsApp admin, sudah lengkap."
export const S05: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phone = enterAt(frame, fps, 0, 0.45);
  const msgAt = L(M.whatsapp) - 0.15;
  const msg = enterAt(frame, fps, msgAt, 0.35);
  const done = enterAt(frame, fps, L(M.lengkap) - 0.05, 0.35);

  return (
    <Stage dur={dur}>
      <Backdrop />
      <div style={{ position: "absolute", left: 90, top: 230, width: 900 }}>
        <Words text="Langsung masuk *WhatsApp* admin" delay={L(M.pesanan) - 0.05} stagger={0.2} size={92} color={H.text} accent={H.b600} />
      </div>

      <Phone y={1085} width={440} style={{ ...rise(phone, 60) }}>
        <div style={{ position: "absolute", inset: 0, background: H.waBg }}>
          <div style={{ height: 104, background: "#1F6F5C", display: "flex", alignItems: "flex-end", gap: 12, padding: "0 16px 14px", color: "white" }}>
            <div style={{ width: 42, height: 42, borderRadius: 21, background: "white", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <Img src={img("logo.png")} style={{ width: 40 }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17 }}>Admin HasTrans</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>online</div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: 14,
              right: 44,
              top: 128,
              background: "white",
              borderRadius: 14,
              borderTopLeftRadius: 4,
              padding: "12px 14px 8px",
              fontSize: 14.5,
              lineHeight: 1.38,
              color: H.text,
              boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
              opacity: msg,
              transform: `translateY(${(1 - msg) * 40}px) scale(${0.96 + 0.04 * msg})`,
              transformOrigin: "top left",
            }}
          >
            {LINES.map((l, i) => {
              const p = enterAt(frame, fps, msgAt + 0.1 + i * 0.06, 0.25);
              return (
                <div key={i} style={{ marginTop: l.gap ? 9 : 0, fontWeight: l.bold ? 800 : 400, opacity: p }}>
                  {l.text}
                </div>
              );
            })}
            <div style={{ textAlign: "right", fontSize: 11, color: H.muted, marginTop: 4 }}>08.12</div>
          </div>
        </div>
      </Phone>

      <Center top={1470} style={{ ...rise(done, 24) }}>
        <Chip tone="navy">
          <span style={{ color: H.kuning }}>✓</span> Sudah lengkap
        </Chip>
      </Center>
    </Stage>
  );
};
