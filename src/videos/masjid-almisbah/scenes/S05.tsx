import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, B, Center, Chip, font, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S05", t);

// "Pengeluaran besar wajib disetujui ketua. Dan tidak ada transaksi yang bisa dihapus."
export const S05: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = enterAt(frame, fps, L(M.pengeluaran), 0.4);
  const stamp = spring({ frame: frame - Math.round((L(M.ketua) - 0.05) * fps), fps, config: { damping: 9 } });
  const row = enterAt(frame, fps, L(M.tidak), 0.4);
  const lock = spring({ frame: frame - Math.round((L(M.dihapus) - 0.1) * fps), fps, config: { damping: 9 } });
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Disetujui ketua, *tak* *bisa* *dihapus*" delay={L(M.pengeluaran) - 0.1} stagger={0.3} size={92} color={B.text} accent={B.b600} />
      </TitleArea>
      {/* kartu pengajuan */}
      <div style={{ position: "absolute", left: 90, top: 520, width: 900, background: "white", border: `2px solid ${B.border}`, borderRadius: 40, padding: "36px 40px", boxSizing: "border-box", boxShadow: `0 24px 60px ${B.shadow}`, ...font, ...rise(card, 40) }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: B.muted, letterSpacing: "0.06em" }}>PENGAJUAN DANA · DI ATAS BATAS Rp1.000.000</div>
        <div style={{ fontSize: 46, fontWeight: 800, marginTop: 14, color: B.text }}>Perbaikan sound system</div>
        <div style={{ fontSize: 30, color: B.muted, marginTop: 6 }}>Kantong Operasional · diajukan Pak Hasan</div>
        <div style={{ fontSize: 64, fontWeight: 900, color: B.red, marginTop: 18 }}>Rp3.500.000</div>
        <div style={{ position: "absolute", right: 40, bottom: 40, border: `7px solid ${B.b600}`, color: B.b600, borderRadius: 18, padding: "10px 22px", fontSize: 36, fontWeight: 900, lineHeight: 1.1, textAlign: "center", background: "rgba(255,255,255,0.9)", opacity: Math.min(1, stamp * 2), transform: `rotate(-10deg) scale(${2 - stamp})` }}>
          DISETUJUI
          <div style={{ fontSize: 22, fontWeight: 700 }}>Ketua · H. Abdul Rahman</div>
        </div>
      </div>
      {/* transaksi terkunci */}
      <div style={{ position: "absolute", left: 90, top: 1090, width: 900, background: B.soft, border: `2px solid ${B.border}`, borderRadius: 34, padding: "28px 36px", boxSizing: "border-box", display: "flex", alignItems: "center", gap: 26, ...font, ...rise(row, 40) }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 34, fontWeight: 800, color: B.text }}>Listrik & air · Oktober</div>
          <div style={{ fontSize: 26, color: B.muted, marginTop: 4 }}>Kas keluar · foto nota terlampir</div>
        </div>
        <div style={{ fontSize: 40, fontWeight: 900, color: B.red }}>−Rp1.240.000</div>
      </div>
      <div style={{ position: "absolute", left: 540 - 110, top: 1270, width: 220, height: 220, borderRadius: 110, background: B.b600, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 24px 60px ${B.shadow}`, opacity: Math.min(1, lock * 2), transform: `scale(${0.4 + 0.6 * lock})` }}>
        <svg viewBox="0 0 100 120" width={120} height={144}>
          <path d="M25 50 V35 a25 25 0 0 1 50 0 V50" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" />
          <rect x="12" y="50" width="76" height="62" rx="12" fill="#F3DFAE" />
          <circle cx="50" cy="76" r="8" fill={B.b900} />
        </svg>
      </div>
      <Center top={1530}>
        <Chip tone="dark" style={rise(enterAt(frame, fps, L(M.dihapus) + 0.2, 0.3), 20)}>Koreksi lewat transaksi pembalik</Chip>
      </Center>
    </Stage>
  );
};
