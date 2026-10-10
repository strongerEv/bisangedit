import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, C, Chip, Phone, TitleArea } from "../parts";
import { IncomingCall } from "../screens";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S06", t);

// "Nomor dari kontakmu tetap bisa masuk seperti biasa."
export const S06: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const accepted = enterAt(frame, fps, L(M.biasa) - 0.1, 0.25);
  const ring = accepted < 0.5 ? Math.sin(t * 30) : 0;
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Kontakmu *tetap* *masuk*" delay={L(M.nomorKontak) - 0.1} stagger={0.3} size={104} color={C.text} accent={C.green} />
      </TitleArea>
      <Phone y={1150} width={540} style={rise(enterAt(frame, fps, 0.05, 0.4), 60)}>
        <IncomingCall name="Ibu" sub="Kontak · Seluler" contact accepted={accepted} ring={ring} />
      </Phone>
      <div style={{ position: "absolute", left: 0, width: 1080, top: 1800, display: "flex", justifyContent: "center", ...rise(accepted, 20) }}>
        <Chip tone="green" style={{ position: "relative" }}>Tersambung seperti biasa ✓</Chip>
      </div>
    </Stage>
  );
};
