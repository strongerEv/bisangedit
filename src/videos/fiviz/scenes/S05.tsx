import React from "react";
import { Img, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { AppHeader, Backdrop, B, Card, img, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S05", t);

const STEPS = [
  { t: "Diterima", icon: "ic-terima.png", at: M.diterima, note: "HP diterima, foto kondisi tersimpan" },
  { t: "Pengecekan", icon: "ic-cek.png", at: M.dicek, note: "Teknisi Budi mengecek kerusakan" },
  { t: "Dikerjakan", icon: "ic-perbaikan.png", at: M.diperbaiki, note: "Ganti LCD Original" },
  { t: "Siap Diambil", icon: "ic-selesai.png", at: M.siap, note: "Sudah lolos uji coba" },
];

// "HP-mu lagi diapain? Lacak dari link: diterima, dicek, diperbaiki, siap diambil."
export const S05: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const link = enterAt(frame, fps, L(M.lacak) - 0.1, 0.35);
  const siap = enterAt(frame, fps, L(M.siap) + 0.3, 0.35);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="HP-mu lagi *diapain?*" delay={L(M.hpmu) - 0.1} stagger={0.3} size={104} color={B.text} accent={B.b600} />
      </TitleArea>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 452, display: "flex", justifyContent: "center", ...rise(link, 16) }}>
        <div style={{ background: B.b50, border: `2px solid ${B.b200}`, borderRadius: 999, padding: "14px 30px", fontFamily: "'JetBrains Mono', monospace", fontSize: 32, color: B.b700 }}>link lacak · /lacak/fs261010</div>
      </div>
      <Phone y={1200} width={500} style={rise(enterAt(frame, fps, 0, 0.35), 60)}>
        <AppHeader title="Lacak Servis" sub="Nomor servis FS-261010-007 · Galaxy A15" />
        <div style={{ padding: 16 }}>
          <Card style={{ padding: "8px 14px" }}>
            {STEPS.map((s, i) => {
              const on = enterAt(frame, fps, L(s.at) - 0.1, 0.25);
              return (
                <div key={s.t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < STEPS.length - 1 ? `1px dashed ${B.border}` : undefined }}>
                  <div style={{ width: 58, height: 58, borderRadius: 16, background: on > 0.5 ? B.b50 : "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", filter: on > 0.5 ? undefined : "grayscale(1)", opacity: 0.4 + 0.6 * on, transform: `scale(${0.9 + 0.1 * on})` }}>
                    <Img src={img(s.icon)} style={{ width: 50, height: 50, objectFit: "contain" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: on > 0.5 ? B.text : "#94A3B8" }}>{s.t}</div>
                    <div style={{ fontSize: 12, color: B.muted, opacity: on }}>{s.note}</div>
                  </div>
                  <div style={{ width: 24, height: 24, borderRadius: 12, background: on > 0.5 ? B.green : B.border, color: "white", fontSize: 14, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>{on > 0.5 ? "✓" : ""}</div>
                </div>
              );
            })}
          </Card>
          <div style={{ marginTop: 14, borderRadius: 18, background: B.green, color: "white", padding: "16px 18px", fontSize: 18, fontWeight: 800, ...rise(siap, 20) }}>
            HP Anda siap diambil 🎉
            <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.9, marginTop: 4 }}>Total Rp650.000 · garansi 90 hari</div>
          </div>
        </div>
      </Phone>
    </Stage>
  );
};
