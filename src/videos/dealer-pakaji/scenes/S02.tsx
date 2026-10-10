import React from "react";
import { Img, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Chip, D, img, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S02", t);

// "Kenalin: website Dealer Pak Aji. Showroom mobil bekas yang buka dua puluh empat jam, langsung dari HP."
export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame: frame - Math.round((L(M.website) - 0.2) * fps), fps, config: { damping: 12 } });
  const phone = spring({ frame: frame - Math.round((L(M.showroom) - 0.3) * fps), fps, config: { damping: 14 } });
  const c1 = enterAt(frame, fps, L(M.jam24) - 0.1, 0.4);
  const c2 = enterAt(frame, fps, L(M.hp) - 0.1, 0.4);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Kenalin: website *Dealer* *Pak* *Aji*" delay={L(M.kenalin) - 0.1} stagger={0.28} size={96} color={D.text} accent={D.red} />
      </TitleArea>
      <Img
        src={img("logo.png")}
        style={{ position: "absolute", left: 540 - 230, top: 560, width: 460, opacity: Math.min(1, logo * 2) * (1 - phone), transform: `scale(${0.7 + 0.3 * logo - 0.2 * phone})` }}
      />
      <Phone shots={[{ src: "01_home.png", o: 1 }]} width={470} y={1170} style={{ opacity: Math.min(1, phone * 2), transform: `translateY(${(1 - phone) * 700}px)` }} />
      <Chip tone="red" style={{ left: 60, top: 1300, ...rise(c1, 30) }}>
        Buka 24 jam
      </Chip>
      <Chip tone="navy" style={{ left: 560, top: 1480, ...rise(c2, 30) }}>
        Langsung dari HP
      </Chip>
    </Stage>
  );
};
