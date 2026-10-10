import React from "react";
import { Img, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { AppHeader, Backdrop, B, Center, Chip, img, Phone, TapRipple, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S06", t);

// "Ada biaya tambahan? Kamu yang putuskan, setuju atau tolak, langsung dari HP."
export const S06: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = enterAt(frame, fps, L(M.tambahan) + 0.1, 0.35);
  const tap = L(M.setuju) + 0.2;
  const ok = enterAt(frame, fps, tap + 0.15, 0.25);
  const both = enterAt(frame, fps, L(M.putuskan), 0.25) * (1 - enterAt(frame, fps, tap - 0.1, 0.2));
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Kamu yang *putuskan*" delay={L(M.tambahan) - 0.1} stagger={0.4} size={104} color={B.text} accent={B.b600} />
      </TitleArea>
      <Phone y={1150} width={520} style={rise(enterAt(frame, fps, 0, 0.35), 60)}>
        <AppHeader title="Lacak Servis" sub="FS-261010-007 · Galaxy A15" />
        <div style={{ padding: 16 }}>
          <div style={{ borderRadius: 20, background: "#FFFBEB", border: "2px solid #FCD34D", padding: 16, ...rise(card, 30) }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", color: "#B45309" }}>BIAYA TAMBAHAN, PERLU PERSETUJUAN</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
              <Img src={img("part-baterai.png")} style={{ width: 60, height: 60, objectFit: "contain" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 800 }}>Ganti Baterai (Original)</div>
                <div style={{ fontSize: 12, color: B.muted }}>Baterai kembung, ditemukan saat pengecekan</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 18, fontWeight: 900 }}>
              <span>Total</span>
              <span>Rp180.000</span>
            </div>
            <div style={{ fontSize: 11, color: B.muted, marginTop: 8, lineHeight: 1.4 }}>Persetujuan dicatat dengan waktu dan perangkat Anda sebagai bukti.</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14, position: "relative" }}>
              <div style={{ height: 48, borderRadius: 14, background: B.red, color: "white", fontSize: 16, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", opacity: 1 - ok * 0.6, boxShadow: both > 0 ? `0 0 0 ${4 * both}px #FCA5A5` : undefined }}>Tolak</div>
              <div style={{ height: 48, borderRadius: 14, background: B.b600, color: "white", fontSize: 16, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: both > 0 ? `0 0 0 ${4 * both}px ${B.b200}` : undefined }}>{ok > 0.5 ? "✓ Disetujui" : "Setuju"}</div>
            </div>
          </div>
        </div>
        <TapRipple x={280} y={388} p={between(frame, fps, tap - 0.1, tap + 0.4)} />
      </Phone>
      <Center top={1790}>
        <Chip tone="green" style={rise(enterAt(frame, fps, L(M.dariHp), 0.3), 20)}>Tanpa telepon bolak-balik</Chip>
      </Center>
    </Stage>
  );
};
