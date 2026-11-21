import React from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { sfx, syn } from "../../components/sfx";
import { Watermark } from "../../components/Watermark";
import { S01 } from "./scenes/S01";
import { lineAt, MARKERS as M, QUOTES, SCENES, sec, SFX, TYPE_CPS, type SceneId } from "./timeline";

const SCENE_COMPONENTS: Record<SceneId, React.FC<{ dur: number }>> = { S01 };

// Teks yang diketik → bunyi klik lembut tiap 2 huruf (variasi dari "ketik" di video lain).
const TYPED: [string, number][] = [
  ["KEKAYAAN YANG TIDAK TERLIHAT.", M.judul],
  ...QUOTES.flatMap((q) => q.lines.map((l, i) => [l, lineAt(q.at, q.lines, i)] as [string, number])),
];
const TICKS = TYPED.flatMap(([text, at]) => [...text].map((ch, i) => (ch !== " " && i % 2 === 0 ? at + i / TYPE_CPS : -1)).filter((x) => x >= 0));

const src = (s: string) => (s.startsWith("syn:") ? syn(s.slice(4)) : sfx(s));

// "Kekayaan adalah apa yang tidak kamu lihat" — The Psychology of Money (Morgan Housel). Seri stickman latar hitam,
// panggung dua rumah + pemindai sinar-X. Watermark @yumust.
export const KayaTakTerlihat: React.FC = () => (
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
        <Audio src={src(x.src)} volume={x.vol ?? 1} />
      </Sequence>
    ))}
    {TICKS.map((at, i) => (
      <Sequence key={`tik${i}`} from={sec(at)} durationInFrames={3}>
        <Audio src={syn("klik")} volume={0.35} />
      </Sequence>
    ))}
    <Watermark dark text="@yumust" />
  </AbsoluteFill>
);
