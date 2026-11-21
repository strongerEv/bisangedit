import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { sfx } from "../../components/sfx";
import { Watermark } from "../../components/Watermark";
import { S01 } from "./scenes/S01";
import { MARKERS as M, SCENES, sec, SFX, TYPE_CPS, type SceneId } from "./timeline";

const SCENE_COMPONENTS: Record<SceneId, React.FC<{ dur: number }>> = { S01 };

// Teks yang diketik → bunyi "tik" tiap 2 huruf (bukan spasi).
const TYPED: [string, number][] = [
  ["WAKTU YANG SAMA.", M.judul],
  ["MEMBANGUN BISNIS 3 TAHUN,", M.q1],
  ["KAMU TIDAK SABAR.", M.q2],
  ["TAPI BEKERJA UNTUK ORANG LAIN", M.q3],
  ["40 TAHUN, KAMU SABAR.", M.q4],
  ["KESABARAN BERBEDA.", M.judul2],
];
const TICKS = TYPED.flatMap(([text, at]) => [...text].map((ch, i) => (ch !== " " && i % 2 === 0 ? at + i / TYPE_CPS : -1)).filter((x) => x >= 0));

// "Waktu yang sama. Kesabaran berbeda." — seri stickman dua kamar (latar hitam), kutipan tanpa nama tokoh.
// SFX @remotion/sfx (salinan lokal) + sintetis, watermark @yumust.
export const KesabaranBisnis: React.FC = () => (
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
        <Audio src={staticFile("audio/kesabaran-bisnis/ketik.wav")} volume={0.5} />
      </Sequence>
    ))}
    <Watermark dark text="@yumust" />
  </AbsoluteFill>
);
