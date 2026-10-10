import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Chip, css, D, HiBox, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S04", t);
const W = 440;
const PX = 640; // HP digeser ke kanan, chip di kiri
// Diukur dari elemen website (CSS px).
const DP = css(195, 245, W);
const TENOR = css(195, 334, W);
const ANGS = css(195, 437, W);

// "Tiap mobil ada foto, spesifikasi lengkap, dan simulasi kredit. Atur DP dan tenor, angsurannya langsung kelihatan."
export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const on = (a: number, b: number) => enterAt(frame, fps, a, 0.25) * (1 - enterAt(frame, fps, b, 0.2));
  const toCredit = between(frame, fps, L(M.simulasi) - 0.2, L(M.simulasi) + 0.15);
  const toB = between(frame, fps, L(M.dp) + 0.1, L(M.dp) + 0.35);
  const toC = between(frame, fps, L(M.tenor) + 0.2, L(M.tenor) + 0.45);
  const chips = [
    { t: "Foto", at: M.foto },
    { t: "Spesifikasi", at: M.spek },
    { t: "Simulasi kredit", at: M.simulasi },
  ];
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Detail + *simulasi* *kredit*" delay={L(M.tiap) - 0.1} stagger={0.5} size={96} color={D.text} accent={D.red} />
      </TitleArea>
      <Phone
        x={PX}
        width={W}
        y={1160}
        shots={[
          { src: "03_detail.png", o: 1 - toCredit },
          { src: "04_kredit_a.png", o: toCredit * (1 - toB) },
          { src: "04_kredit_b.png", o: toB * (1 - toC) },
          { src: "04_kredit_c.png", o: toC },
        ]}
      >
        <HiBox c={DP} w={330} h={64} p={on(L(M.atur) - 0.1, L(M.tenor) - 0.15)} width={W} />
        <HiBox c={TENOR} w={330} h={56} p={on(L(M.tenor) - 0.15, L(M.angsuran) - 0.15)} width={W} />
        <HiBox c={ANGS} w={330} h={132} p={enterAt(frame, fps, L(M.angsuran) - 0.1, 0.3)} width={W} />
      </Phone>
      {chips.map((c, i) => {
        const p = enterAt(frame, fps, L(c.at) - 0.1, 0.35) * (1 - enterAt(frame, fps, L(M.atur) - 0.2, 0.3));
        return (
          <Chip key={c.t} tone={i === 2 ? "red" : "light"} style={{ left: 40, top: 760 + i * 130, ...rise(p, 24) }}>
            ✓ {c.t}
          </Chip>
        );
      })}
      <div style={{ position: "absolute", left: 40, top: 760, ...rise(enterAt(frame, fps, L(M.dp) - 0.1, 0.3), 20) }}>
        <Chip tone="navy" style={{ position: "relative" }}>DP 25% → 40%</Chip>
      </div>
      <div style={{ position: "absolute", left: 40, top: 890, ...rise(enterAt(frame, fps, L(M.tenor) - 0.05, 0.3), 20) }}>
        <Chip tone="navy" style={{ position: "relative" }}>Tenor 4 → 3 th</Chip>
      </div>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 1690, display: "flex", justifyContent: "center", ...rise(enterAt(frame, fps, L(M.angsuran) + 0.1, 0.3), 20) }}>
        <Chip tone="red" style={{ position: "relative" }}>Angsuran langsung keluar</Chip>
      </div>
    </Stage>
  );
};
