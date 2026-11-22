import React from "react";
import { Audio, Sequence } from "remotion";
import { sfx, syn } from "./sfx";

/** "syn:nama" → efek sintetis, URL → @remotion/sfx (salinan lokal). */
export const sfxSrc = (s: string) => (s.startsWith("syn:") ? syn(s.slice(4)) : sfx(s));

/**
 * Audio untuk seri stickman: daftar SFX terjadwal + bunyi "ketik" untuk teks yang diketik.
 * Semua waktu dalam detik absolut. `tick` = sumber bunyi ketik (format sama dengan SFX), tiap `every` huruf.
 */
export const SeriAudio: React.FC<{
  fps: number;
  sfxList: { at: number; src: string; vol?: number; dur?: number }[];
  typed: [string, number][];
  cps: number;
  tick: string;
  tickVol?: number;
  every?: number;
}> = ({ fps, sfxList, typed, cps, tick, tickVol = 0.4, every = 2 }) => {
  const sec = (s: number) => Math.round(s * fps);
  const ticks = typed.flatMap(([text, at]) => [...text].map((ch, i) => (ch !== " " && i % every === 0 ? at + i / cps : -1)).filter((x) => x >= 0));
  return (
    <>
      {sfxList.map((x, i) => (
        <Sequence key={`sfx${i}`} name={`sfx ${x.src.split("/").pop()}`} from={sec(x.at)} durationInFrames={sec(x.dur ?? 2.5)}>
          <Audio src={sfxSrc(x.src)} volume={x.vol ?? 1} />
        </Sequence>
      ))}
      {ticks.map((at, i) => (
        <Sequence key={`tik${i}`} from={sec(at)} durationInFrames={3}>
          <Audio src={sfxSrc(tick)} volume={tickVol} />
        </Sequence>
      ))}
    </>
  );
};
