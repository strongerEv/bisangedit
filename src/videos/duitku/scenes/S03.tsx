import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { enterAt } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Center, Chip, G, HiBox, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S03", t);
const W = 540;
const MASUK_KELUAR = { x: 320, y: 287, w: 590, h: 135 };

// "Catat pemasukan dan pengeluaran, dari banyak dompet sekaligus."
export const S03: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const wallets = ["Uang Tunai", "Bank", "E-Wallet"];
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Catat *masuk* & *keluar*" delay={L(M.catat) - 0.1} stagger={0.3} size={104} color={G.text} accent={G.g500} />
      </TitleArea>
      <Phone shots={[{ src: "02-transaksi.webp", o: 1 }]} width={W} y={1125} style={{ opacity: enterAt(frame, fps, 0, 0.3) }}>
        <HiBox b={MASUK_KELUAR} p={enterAt(frame, fps, L(M.catat) + 0.4, 0.3) * (1 - enterAt(frame, fps, L(M.dompet) - 0.2, 0.2))} width={W} />
      </Phone>
      <Center top={1765}>
        {wallets.map((w, i) => {
          const p = spring({ frame: frame - Math.round((L(M.dompet) - 0.15 + i * 0.15) * fps), fps, config: { damping: 11 } });
          return (
            <Chip key={w} tone={i === 1 ? "dark" : i === 2 ? "green" : "light"} style={{ opacity: Math.min(1, p * 2), transform: `scale(${0.5 + 0.5 * p})` }}>
              {w}
            </Chip>
          );
        })}
      </Center>
    </Stage>
  );
};
