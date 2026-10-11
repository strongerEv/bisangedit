import React from "react";
import { Img, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, B, font, img, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S06", t);

// Format teks mengikuti teksLaporanJumat() di aplikasi (angka = data contoh; baris Hijriah tidak ditampilkan).
const TEKS = [
  "*LAPORAN KAS MASJID AL MISBAH*",
  "Jumat, 9 Oktober 2026",
  "",
  "Saldo pekan lalu: Rp72.115.000",
  "Pemasukan: Rp2.655.000",
  "  • Infak Jumat: Rp2.140.000",
  "  • Kotak amal: Rp515.000",
  "Pengeluaran: Rp1.240.000",
  "  • Listrik & air: Rp1.240.000",
  "*Saldo akhir: Rp73.530.000*",
  "",
  "Jazakumullahu khairan kepada seluruh jamaah atas infak dan sedekahnya.",
];

const Line: React.FC<{ t: string }> = ({ t }) => (
  <div style={{ minHeight: 30, whiteSpace: "pre-wrap" }}>
    {t.split(/(\*[^*]+\*)/g).map((p, i) => (p.startsWith("*") ? <b key={i}>{p.slice(1, -1)}</b> : <span key={i}>{p}</span>))}
  </div>
);

// "Tiap Jumat, laporan kas siap dibagikan ke grup WhatsApp, atau ditayangkan sebagai gambar."
export const S06: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chat = enterAt(frame, fps, L(M.laporan), 0.4);
  const poster = spring({ frame: frame - Math.round((L(M.gambar) - 0.1) * fps), fps, config: { damping: 13 } });
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Laporan *Jumat* siap bagi" delay={L(M.jumat) - 0.1} stagger={0.3} size={100} color={B.text} accent={B.b600} />
      </TitleArea>
      <div style={{ position: "absolute", left: 90, top: 470, width: 900, height: 1080, borderRadius: 40, background: "#EFE7DD", overflow: "hidden", boxShadow: `0 24px 60px ${B.shadow}`, ...rise(chat, 40) }}>
        <div style={{ height: 110, background: "#1F6F5C", display: "flex", alignItems: "center", gap: 18, padding: "0 30px", ...font, color: "white" }}>
          <Img src={img("logo.png")} style={{ width: 62, height: 62, borderRadius: 31, background: "white" }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 32 }}>Jamaah Al Misbah</div>
            <div style={{ fontSize: 22, opacity: 0.8 }}>grup · 214 anggota</div>
          </div>
        </div>
        <div style={{ margin: "30px 30px 0 90px", background: "#DCF8C6", borderRadius: 22, borderTopRightRadius: 4, padding: "22px 26px", ...font, fontSize: 27, lineHeight: 1.35, color: B.text }}>
          {TEKS.map((t, i) => (
            <Line key={i} t={t} />
          ))}
        </div>
      </div>
      {/* versi gambar siap tayang */}
      <div style={{ position: "absolute", left: 470, top: 900, width: 500, height: 640, borderRadius: 30, background: `linear-gradient(160deg, ${B.b500}, ${B.b900})`, color: "white", padding: 34, boxSizing: "border-box", boxShadow: "0 40px 90px rgba(0,0,0,0.3)", ...font, opacity: Math.min(1, poster * 2), transform: `rotate(${4 * poster}deg) translateY(${(1 - poster) * 300}px)` }}>
        <Img src={img("logo.png")} style={{ width: 90, height: 90, borderRadius: 45, background: "white" }} />
        <div style={{ fontSize: 26, opacity: 0.85, marginTop: 18 }}>Laporan Kas Jumat</div>
        <div style={{ fontSize: 34, fontWeight: 800 }}>Masjid Al Misbah</div>
        <div style={{ fontSize: 22, color: "#F3DFAE", marginTop: 26 }}>Pemasukan</div>
        <div style={{ fontSize: 40, fontWeight: 900 }}>Rp2.655.000</div>
        <div style={{ fontSize: 22, color: "#F3DFAE", marginTop: 14 }}>Pengeluaran</div>
        <div style={{ fontSize: 40, fontWeight: 900 }}>Rp1.240.000</div>
        <div style={{ height: 2, background: "rgba(255,255,255,0.3)", margin: "22px 0" }} />
        <div style={{ fontSize: 22, color: "#F3DFAE" }}>Saldo akhir</div>
        <div style={{ fontSize: 48, fontWeight: 900 }}>Rp73.530.000</div>
      </div>
    </Stage>
  );
};
