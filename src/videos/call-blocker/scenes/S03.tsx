import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, C, Chip, Phone, TapRipple, TitleArea } from "../parts";
import { CR, CreateRuleScreen, HOME_ADD, HomeScreen } from "../screens";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S03", t);

/** Kotak sorot oranye dalam koordinat CSS layar. */
export const Hi: React.FC<{ r: { x: number; y: number; w: number; h: number }; p: number }> = ({ r, p }) =>
  p <= 0 ? null : (
    <div style={{ position: "absolute", left: r.x - r.w / 2, top: r.y - r.h / 2, width: r.w, height: r.h, borderRadius: 14, border: `4px solid ${C.orange}`, opacity: p, transform: `scale(${1.06 - 0.06 * p})` }} />
  );

export const PHONE = { y: 1150, width: 560 };

// "Buka aplikasinya, bikin aturan baru, lalu pilih: blokir semua nomor yang nggak ada di kontak."
export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phone = enterAt(frame, fps, 0, 0.5);
  const tapAdd = L(M.bikin) + 0.25;
  const toRule = between(frame, fps, tapAdd + 0.2, tapAdd + 0.45);
  const tapUnknown = L(M.blokir) + 0.35;
  const unknown = enterAt(frame, fps, tapUnknown + 0.05, 0.2);
  const on = (a: number, b: number) => enterAt(frame, fps, a, 0.25) * (1 - enterAt(frame, fps, b, 0.2));
  return (
    <Stage dur={dur} fadeOut={false}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Bikin *aturan* baru" delay={L(M.bikin) - 0.1} stagger={0.2} size={104} color={C.text} accent={C.orangeDeep} />
      </TitleArea>
      <Phone y={PHONE.y} width={PHONE.width} style={rise(phone, 80)}>
        <div style={{ position: "absolute", inset: 0, opacity: 1 - toRule }}>
          <HomeScreen />
        </div>
        <div style={{ position: "absolute", inset: 0, opacity: toRule }}>
          <CreateRuleScreen unknown={unknown} reject={0} />
        </div>
        <TapRipple x={HOME_ADD.x} y={HOME_ADD.y} p={between(frame, fps, tapAdd - 0.1, tapAdd + 0.4)} />
        <Hi r={CR.blacklistCard} p={on(L(M.lalu) - 0.1, L(M.blokir))} />
        <Hi r={CR.unknownRow} p={enterAt(frame, fps, L(M.blokir), 0.25)} />
        <TapRipple x={CR.unknownRadio.x} y={CR.unknownRadio.y} p={between(frame, fps, tapUnknown - 0.1, tapUnknown + 0.4)} />
      </Phone>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 1800, display: "flex", justifyContent: "center", ...rise(enterAt(frame, fps, L(M.kontak) - 0.3, 0.35), 20) }}>
        <Chip tone="orange" style={{ position: "relative" }}>= nomor yang nggak ada di kontak</Chip>
      </div>
    </Stage>
  );
};
