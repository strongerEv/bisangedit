import React from "react";
import { Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, BottomNav, Card, Chip, Icon, K, ModuleCard, Phone, StatCard, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

/** Beranda host (data contoh). */
export const HomeScreen: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, padding: "0 16px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700, padding: "14px 10px 0" }}>
      <span>10.45</span>
      <span>●●● ▮</span>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 22 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: K.muted }}>Selamat pagi,</div>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>Rani Putri!</div>
      </div>
      <span style={{ width: 42, height: 42, borderRadius: 21, background: "white", border: `1px solid ${K.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="bell" size={19} />
      </span>
    </div>
    <div style={{ marginTop: 16, background: K.primary, color: "white", borderRadius: 24, padding: 16, boxShadow: `0 12px 32px ${K.shadowFloat}` }}>
      <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.8 }}>Shift kamu hari ini</div>
      <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>Shift Siang</div>
      <div style={{ fontSize: 13, opacity: 0.8 }}>11.00 – 16.00 WIB</div>
      <div style={{ marginTop: 12, height: 44, borderRadius: 22, background: "white", color: K.primary, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <Icon name="login" size={16} /> Clock in sekarang
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
      <StatCard label="Jam kerja bulan ini" value="86j 30m" icon="clock" tone="primary" />
      <StatCard label="Tepat waktu" value="18" icon="scan" tone="emerald" />
      <StatCard label="Telat" value="2" icon="clock" tone="amber" />
      <StatCard label="Omzet bulan ini" value="Rp12,4 jt" icon="wallet" tone="sky" />
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
      <ModuleCard title="Absen" desc="Clock in & clock out" icon="scan" tone="primary" style={{ height: 104 }} />
      <ModuleCard title="Jadwal" desc="Lihat shift kamu" icon="calendar" tone="coral" style={{ height: 104 }} />
      <ModuleCard title="Omzet" desc="Lapor hasil shift" icon="wallet" tone="amber" style={{ height: 104 }} />
      <ModuleCard title="Pengajuan" desc="Izin & libur" icon="clipboard" tone="emerald" style={{ height: 104 }} />
    </div>
    <BottomNav active={0} />
  </div>
);

// "Kenalin: Makaryo. Aplikasi untuk mengelola tim host live, bisa dipasang di HP."
export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phone = spring({ frame: frame - Math.round((local("S02", M.aplikasi) - 0.3) * fps), fps, config: { damping: 14 } });
  const chip = enterAt(frame, fps, local("S02", M.pasang) - 0.1, 0.4);
  const icon = spring({ frame: frame - Math.round((local("S02", M.pasang) + 0.2) * fps), fps, config: { damping: 10 } });
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Kenalin: *Makaryo*" delay={local("S02", M.kenalin) - 0.1} stagger={0.8} size={112} color={K.text} accent={K.primary} />
        <Words text="Aplikasi untuk tim host *live*" delay={local("S02", M.aplikasi) - 0.1} stagger={0.14} size={56} weight={600} color={K.muted} accent={K.primary} />
      </TitleArea>
      <Phone width={470} y={1220} style={{ opacity: Math.min(1, phone * 2), transform: `translateY(${(1 - phone) * 600}px)` }}>
        <HomeScreen />
      </Phone>
      <Chip tone="primary" style={{ left: 560, top: 1440, opacity: chip, transform: `translateY(${(1 - chip) * 30}px)` }}>
        <Icon name="download" size={38} color="white" stroke={2.4} /> Bisa dipasang di HP
      </Chip>
      <div style={{ position: "absolute", left: 845, top: 1250, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: Math.min(1, icon * 2), transform: `scale(${0.5 + 0.5 * icon})` }}>
        <Img src={staticFile("aset/makaryo/icon.png")} style={{ width: 150, height: 150, borderRadius: 36, boxShadow: `0 20px 50px ${K.shadowFloat}` }} />
      </div>
      <Card style={{ position: "absolute", left: 60, top: 640, padding: "18px 26px", borderRadius: 999, display: "flex", alignItems: "center", gap: 12, fontSize: 32, fontWeight: 700, opacity: enterAt(frame, fps, local("S02", M.aplikasi) + 0.9, 0.4) }}>
        <span style={{ width: 16, height: 16, borderRadius: 8, background: K.coral }} /> LIVE · 3 shift / hari
      </Card>
    </Stage>
  );
};
