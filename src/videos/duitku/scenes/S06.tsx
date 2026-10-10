import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Center, Chip, G, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S06", t);

// "Ada juga laporan bulanan, anggaran, sampai asisten yang bisa ditanya soal keuanganmu."
export const S06: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const toB = between(frame, fps, L(M.anggaran) - 0.3, L(M.anggaran) - 0.05);
  const toC = between(frame, fps, L(M.asisten) - 0.3, L(M.asisten) - 0.05);
  const labels = [
    { t: "Laporan bulanan + PDF", a: 0, b: L(M.anggaran) - 0.3 },
    { t: "Anggaran belanja", a: L(M.anggaran) - 0.2, b: L(M.asisten) - 0.3 },
    { t: "Asisten keuangan", a: L(M.asisten) - 0.2, b: 99 },
  ];
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <Words text="Laporan, anggaran, *asisten*" delay={L(M.laporan) - 0.3} stagger={1.15} size={96} color={G.text} accent={G.g500} />
      </TitleArea>
      <Phone
        width={540}
        y={1125}
        style={rise(enterAt(frame, fps, 0, 0.35), 60)}
        shots={[
          { src: "07-laporan.webp", o: 1 - toB },
          { src: "09-anggaran.webp", o: toB * (1 - toC) },
          { src: "11-asisten-jawab.webp", o: toC },
        ]}
      />
      <Center top={1765}>
        {labels.map((l, i) => {
          const p = enterAt(frame, fps, Math.max(0.15, l.a), 0.3) * (1 - enterAt(frame, fps, l.b, 0.2));
          return (
            <Chip key={l.t} tone={i === 2 ? "dark" : "green"} style={{ position: "absolute", ...rise(p, 20) }}>
              {l.t}
            </Chip>
          );
        })}
      </Center>
    </Stage>
  );
};
