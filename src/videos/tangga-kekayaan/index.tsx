import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { sfx } from "../../components/sfx";
import { Watermark } from "../../components/Watermark";
import { S01 } from "./scenes/S01";
import { lineAt, MARKERS as M, SCENES, sec, SFX, TAHAP, TYPE_CPS, type SceneId } from "./timeline";

const SCENE_COMPONENTS: Record<SceneId, React.FC<{ dur: number }>> = { S01 };

// Teks yang diketik → bunyi "tik" tiap 2 huruf (bukan spasi).
const TYPED: [string, number][] = [
  ["4 TAHAP MEMBANGUN KEKAYAAN", M.judul],
  ...TAHAP.flatMap((s) => s.lines.map((l, i) => [l, lineAt(s.teks, s.lines, i)] as [string, number])),
  ["DI TAHAP MANA KAMU SEKARANG?", M.akhir1],
];
const TICKS = TYPED.flatMap(([text, at]) => [...text].map((ch, i) => (ch !== " " && i % 2 === 0 ? at + i / TYPE_CPS : -1)).filter((x) => x >= 0));

// "4 tahap membangun kekayaan" dari buku Jeong Seon Yong — stickman menaiki tangga (seri latar hitam).
// SFX @remotion/sfx (salinan lokal) + sintetis, watermark @yumust.
export const TanggaKekayaan: React.FC = () => (
  <AbsoluteFill style={{ background: "#050506" }}>
    {SCENES.map((s) => {
      const Comp = SCENE_COMPONENTS[s.id];
      return (
        <Sequence key={s.id} name={`${s.id} · ${s.label}`} from={sec(s.start)} durationInFrames={sec(s.end - s.start)}>
          <Comp dur={s.end - s.start} />
        </Sequence>
      );
    })}
    {SFX.map((x, i) => (
      <Sequence key={`sfx${i}`} name={`sfx ${x.src.split("/").pop()}`} from={sec(x.at)} durationInFrames={sec(x.dur ?? 2.5)}>
        <Audio src={x.src.startsWith("http") ? sfx(x.src) : staticFile(x.src)} volume={x.vol ?? 1} />
      </Sequence>
    ))}
    {TICKS.map((at, i) => (
      <Sequence key={`tik${i}`} from={sec(at)} durationInFrames={3}>
        <Audio src={staticFile("audio/tangga-kekayaan/ketik.wav")} volume={0.45} />
      </Sequence>
    ))}
    <Watermark dark text="@yumust" />
  </AbsoluteFill>
);
