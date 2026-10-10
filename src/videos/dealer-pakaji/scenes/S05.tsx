import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { theme } from "../../../components/theme";
import { Words } from "../../../components/Words";
import { Backdrop, Chip, css, D, HiBox, Phone, TapRipple, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S05", t);
const W = 500;
const NAME = css(195, 306, W);
const SUBMIT = css(195, 826, W);
const WA_BTN = css(195, 748, W);

// Pesan asli buatan website (public/aset/dealer-pakaji/pesan-wa.txt).
const MSG = [
  "Halo Dealer Pak Aji, saya Budi Santoso.",
  "Saya ingin booking test drive untuk 2024 Mitsubishi Xpander Cross Premium CVT (Rp 315.000.000).",
  "Jadwal: 2026-10-12 jam 11.00, Di showroom.",
];

// "Mau test drive, ajukan kredit, atau tukar tambah? Isi formnya, lalu lanjut ke WhatsApp dealer."
export const S05: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tapSubmit = L(M.isi) + 0.7;
  const toSuccess = between(frame, fps, tapSubmit + 0.2, tapSubmit + 0.45);
  const tapWa = L(M.wa) - 0.15;
  const toChat = between(frame, fps, tapWa + 0.25, tapWa + 0.5);
  const bubble = enterAt(frame, fps, tapWa + 0.45, 0.35);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Test drive, kredit, *tukar* *tambah*" delay={L(M.testDrive) - 0.1} stagger={0.5} size={92} color={D.text} accent={D.red} />
      </TitleArea>
      <Phone width={W} y={1150} shots={[{ src: "05_form_filled.png", o: 1 - toSuccess }, { src: "06_success.png", o: toSuccess }]}>
        <HiBox c={NAME} w={370} h={130} p={enterAt(frame, fps, L(M.isi) - 0.1, 0.25) * (1 - toSuccess)} width={W} />
        <TapRipple x={SUBMIT.x} y={SUBMIT.y} p={between(frame, fps, tapSubmit - 0.1, tapSubmit + 0.35)} />
        <HiBox c={WA_BTN} w={370} h={56} p={enterAt(frame, fps, L(M.wa) - 0.6, 0.25) * toSuccess * (1 - toChat)} color={D.wa} width={W} />
        <TapRipple x={WA_BTN.x} y={WA_BTN.y} p={between(frame, fps, tapWa - 0.1, tapWa + 0.35)} />
        {/* layar chat generik (tanpa logo aplikasi) */}
        <div style={{ position: "absolute", inset: 0, opacity: toChat, background: D.waBg }}>
          <div style={{ height: 120, background: "#1F6F5C", display: "flex", alignItems: "flex-end", padding: "0 26px 18px", gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 26, background: D.red }} />
            <div style={{ fontFamily: theme.fonts.heading, fontWeight: 700, fontSize: 30, color: "white" }}>Dealer Pak Aji</div>
          </div>
          <div
            style={{
              position: "absolute",
              left: 40,
              right: 20,
              top: 170,
              background: D.waOut,
              borderRadius: 20,
              borderTopRightRadius: 4,
              padding: "18px 22px",
              fontFamily: theme.fonts.heading,
              fontWeight: 500,
              fontSize: 25,
              lineHeight: 1.35,
              color: D.text,
              boxShadow: "0 2px 4px rgba(0,0,0,0.12)",
              ...rise(bubble, 40),
            }}
          >
            {MSG.map((l) => (
              <div key={l} style={{ marginBottom: 6 }}>
                {l}
              </div>
            ))}
            <div style={{ textAlign: "right", fontSize: 18, color: D.muted }}>11.02 ✓✓</div>
          </div>
        </div>
      </Phone>
      <Chip tone="wa" style={{ left: 600, top: 1560, ...rise(enterAt(frame, fps, tapWa + 0.5, 0.3), 24) }}>
        Pesan otomatis
      </Chip>
    </Stage>
  );
};
