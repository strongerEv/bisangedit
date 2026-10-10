import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, C, Chip, Icon, Phone, TapRipple, TitleArea } from "../parts";
import { CR, CreateRuleScreen } from "../screens";
import { local, MARKERS as M } from "../timeline";
import { Hi, PHONE } from "./S03";

const L = (t: number) => local("S04", t);

// "Pilih caranya, mau dibisukan atau langsung ditolak. Simpan."
export const S04: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tapReject = L(M.ditolak) + 0.1;
  const reject = enterAt(frame, fps, tapReject + 0.05, 0.2);
  const tapSave = L(M.simpan) - 0.2;
  const saved = enterAt(frame, fps, tapSave + 0.05, 0.2);
  const on = (a: number, b: number) => enterAt(frame, fps, a, 0.25) * (1 - enterAt(frame, fps, b, 0.2));
  const slide = interpolate(t, [dur - 0.2, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Stage dur={dur} fadeOut={false}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="*Bisukan* atau *tolak*" delay={L(M.pilihCara) - 0.1} stagger={0.55} size={104} color={C.text} accent={C.orangeDeep} />
      </TitleArea>
      <Phone y={PHONE.y} width={PHONE.width} style={{ opacity: 1 - slide }}>
        <CreateRuleScreen unknown={1} reject={reject} />
        <Hi r={CR.silenceRow} p={on(L(M.dibisukan) - 0.1, L(M.ditolak) - 0.1)} />
        <Hi r={CR.rejectRow} p={on(L(M.ditolak) - 0.1, tapSave - 0.1)} />
        <TapRipple x={CR.rejectRadio.x} y={CR.rejectRadio.y} p={between(frame, fps, tapReject - 0.1, tapReject + 0.4)} />
        <TapRipple x={CR.save.x} y={CR.save.y} p={between(frame, fps, tapSave - 0.1, tapSave + 0.4)} />
        <div style={{ position: "absolute", left: 60, right: 60, top: 660, height: 52, borderRadius: 14, background: "#1F2937", color: "white", fontSize: 16, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, ...rise(saved, 14) }}>
          <Icon name="check" size={18} stroke={3} color={C.green} /> Rule saved
        </div>
      </Phone>
      {[
        { p: on(L(M.dibisukan) - 0.1, L(M.ditolak) - 0.1), el: <Chip tone="navy" style={{ position: "relative" }}><Icon name="bellOff" size={40} color={C.orange} stroke={2.4} /> Silence = dibisukan</Chip> },
        { p: on(L(M.ditolak) - 0.1, tapSave), el: <Chip tone="red" style={{ position: "relative" }}><Icon name="x" size={40} color="white" stroke={3} /> Reject = ditolak</Chip> },
        { p: saved, el: <Chip tone="green" style={{ position: "relative" }}><Icon name="check" size={40} color="white" stroke={3} /> Aturan tersimpan</Chip> },
      ].map((c, i) => (
        <div key={i} style={{ position: "absolute", left: 0, width: 1080, top: 1800, display: "flex", justifyContent: "center", ...rise(c.p, 20) }}>
          {c.el}
        </div>
      ))}
    </Stage>
  );
};
