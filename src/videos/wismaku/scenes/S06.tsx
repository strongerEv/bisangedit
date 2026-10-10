import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Center, Chip, font, HiBox, N, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S06", t);
const W = 520;
const SCROLL = 0; // bilah navigasi asli ada di y 770–840; tidak digulir agar tidak menutupi bukti
const BUKTI = { x: 194, y: 700, w: 312, h: 140 };
const MENUNGGU = { x: 288, y: 142, w: 132, h: 28 };
const JUMLAH = { x: 140, y: 612, w: 212, h: 82 };

// "Kamu tinggal verifikasi, dan kwitansi digitalnya langsung jadi."
export const S06: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scroll = between(frame, fps, L(M.verifikasi) - 0.1, L(M.verifikasi) + 0.7) * SCROLL;
  const toKw = between(frame, fps, L(M.kwitansi) - 0.25, L(M.kwitansi) + 0.05);
  const stamp = spring({ frame: frame - Math.round((L(M.jadi) - 0.15) * fps), fps, config: { damping: 9 } });
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Verifikasi, *kwitansi* jadi" delay={L(M.verifikasi) - 0.1} stagger={0.5} size={100} color={N.text} accent={N.amber} />
      </TitleArea>
      <Phone width={W} y={1150} shots={[{ src: "verifikasi-bukti.png", o: 1 - toKw, h: 1582, y: scroll }, { src: "kwitansi.png", o: toKw }]}>
        <HiBox b={MENUNGGU} p={enterAt(frame, fps, L(M.verifikasi) - 0.1, 0.25) * (1 - enterAt(frame, fps, L(M.verifikasi) + 0.7, 0.2))} width={W} dim={false} />
        <HiBox b={BUKTI} p={enterAt(frame, fps, L(M.verifikasi) + 0.75, 0.25) * (1 - toKw)} width={W} scrollY={scroll} dim={false} />
        <HiBox b={JUMLAH} p={enterAt(frame, fps, L(M.kwitansi) + 0.3, 0.25)} width={W} dim={false} />
        <div
          style={{
            position: "absolute",
            left: 250,
            top: 360,
            border: `8px solid ${N.amber}`,
            color: N.amber,
            borderRadius: 18,
            padding: "6px 26px",
            ...font,
            fontWeight: 900,
            fontSize: 70,
            letterSpacing: "0.08em",
            background: "rgba(18,26,51,0.75)",
            opacity: Math.min(1, stamp * 2),
            transform: `rotate(-12deg) scale(${2 - stamp})`,
          }}
        >
          LUNAS
        </div>
      </Phone>
      <Center top={1780}>
        <Chip tone="night" style={{ position: "absolute", ...rise(enterAt(frame, fps, L(M.verifikasi) + 0.8, 0.3) * (1 - toKw), 20) }}>Bukti transfer dicek</Chip>
        <Chip tone="amber" style={{ position: "absolute", ...rise(enterAt(frame, fps, L(M.jadi), 0.3), 20) }}>Kwitansi digital otomatis</Chip>
      </Center>
    </Stage>
  );
};
