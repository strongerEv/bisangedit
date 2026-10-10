import React from "react";
import { Img, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Center, Chip, G, img, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S02", t);

// "Kenalin Duitku. Aplikasi catat keuangan, sekaligus penagih hutang lewat WhatsApp."
export const S02: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const icon = spring({ frame: frame - Math.round((L(M.duitku) - 0.15) * fps), fps, config: { damping: 11 } });
  const phone = spring({ frame: frame - Math.round((L(M.aplikasi) - 0.3) * fps), fps, config: { damping: 14 } });
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Kenalin *Duitku*" delay={L(M.kenalin) - 0.1} stagger={0.75} size={116} color={G.text} accent={G.g500} />
      </TitleArea>
      <Img src={img("icon.png")} style={{ position: "absolute", left: 540 - 80, top: 390, width: 160, height: 160, borderRadius: 44, boxShadow: `0 20px 50px ${G.shadow}`, opacity: Math.min(1, icon * 2), transform: `scale(${0.4 + 0.6 * icon}) rotate(${(1 - icon) * 20}deg)` }} />
      <Phone shots={[{ src: "01-beranda.webp", o: 1 }]} width={480} y={1150} style={{ opacity: Math.min(1, phone * 2), transform: `translateY(${(1 - phone) * 700}px)` }} />
      <Center top={1700}>
        <Chip tone="green" style={rise(enterAt(frame, fps, L(M.aplikasi) + 0.4, 0.35), 20)}>Catat keuangan</Chip>
      </Center>
      <Center top={1805}>
        <Chip tone="wa" style={rise(enterAt(frame, fps, L(M.whatsapp) - 0.3, 0.35), 20)}>+ Tagih hutang via WhatsApp</Chip>
      </Center>
    </Stage>
  );
};
