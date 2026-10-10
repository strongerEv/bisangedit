import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, C, Chip, Icon, Phone, SPAM, TitleArea } from "../parts";
import { BlockedNotif, IncomingCall, LockScreen } from "../screens";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S05", t);

// Tiga panggilan asing beruntun, masing-masing langsung diblokir.
const CALLS = [
  { n: SPAM[0], in: M.nomorAsing - 0.05, block: M.otomatis },
  { n: SPAM[3], in: M.otomatis + 0.75, block: M.diblokir },
  { n: SPAM[2], in: M.diblokir + 0.5, block: M.diblokir + 0.95 },
];

// "Sekarang, nomor asing yang nelpon otomatis diblokir. Kamu cuma dapat notifikasi, tanpa harus angkat."
export const S05: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const phone = enterAt(frame, fps, 0, 0.4);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Nomor asing? *Otomatis* *diblokir*" delay={L(M.sekarang) + 0.2} stagger={0.4} size={96} color={C.text} accent={C.red} />
      </TitleArea>
      <Phone y={1150} width={540} style={rise(phone, 60)}>
        <LockScreen>
          <div style={{ position: "absolute", left: 14, right: 14, top: 250, display: "flex", flexDirection: "column", gap: 10 }}>
            {CALLS.map((c, i) => {
              const p = enterAt(frame, fps, L(M.kamuCuma) - 0.1 + i * 0.35, 0.35);
              return <BlockedNotif key={c.n} number={c.n} style={rise(p, -20)} />;
            })}
          </div>
        </LockScreen>
        {CALLS.map((c) => {
          const inP = enterAt(frame, fps, L(c.in), 0.25);
          const blocked = enterAt(frame, fps, L(c.block) - 0.05, 0.2);
          const out = between(frame, fps, L(c.block) + 0.35, L(c.block) + 0.6);
          if (inP <= 0 || out >= 1) return null;
          const ring = t < L(c.block) ? Math.sin(t * 34) : 0;
          return (
            <div key={c.n} style={{ position: "absolute", inset: 0, opacity: inP * (1 - out), transform: `translateY(${(1 - inP) * 120 - out * 200}px)` }}>
              <IncomingCall name={c.n} sub="Tidak ada di kontak" blocked={blocked} ring={ring} />
            </div>
          );
        })}
      </Phone>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 1800, display: "flex", justifyContent: "center", gap: 20 }}>
        <Chip tone="navy" style={{ position: "relative", ...rise(enterAt(frame, fps, L(M.notifikasi) - 0.1, 0.35), 20) }}>
          <Icon name="bell" size={38} color={C.orange} stroke={2.4} /> Cuma notifikasi
        </Chip>
        <Chip tone="green" style={{ position: "relative", ...rise(enterAt(frame, fps, L(M.tanpaAngkat) - 0.1, 0.35), 20) }}>
          Tanpa angkat ✓
        </Chip>
      </div>
    </Stage>
  );
};
