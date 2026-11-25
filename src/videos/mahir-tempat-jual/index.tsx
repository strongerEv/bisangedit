import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { SeriAudio } from "../../components/SeriAudio";
import { Watermark } from "../../components/Watermark";
import { S01 } from "./scenes/S01";
import { AUDIO, FPS, SCENES, sec, SFX, type SceneId } from "./timeline";

const SCENE_COMPONENTS: Record<SceneId, React.FC<{ dur: number }>> = { S01 };

// @mahirambilpeluang — "3 tempat jualan produk digital" (Jumat, minggu 1). Karakter bergantian kiri/kanan.
// Gaya referensi/mahir-layout-kartu-grid.mp4: latar putih berkotak, kartu, stempel, subtitle karaoke, karakter.
export const MahirTempatJual: React.FC = () => (
  <AbsoluteFill style={{ background: "#FFFFFF" }}>
    <Audio src={staticFile(AUDIO)} />
    {SCENES.map((s) => {
      const Comp = SCENE_COMPONENTS[s.id];
      return (
        <Sequence key={s.id} name={`${s.id} · ${s.label}`} from={sec(s.start)} durationInFrames={sec(s.end - s.start)}>
          <Comp dur={s.end - s.start} />
        </Sequence>
      );
    })}
    <SeriAudio fps={FPS} sfxList={SFX} typed={[]} cps={30} tick="syn:ketik" />
    <Watermark text="@mahirambilpeluang" />
  </AbsoluteFill>
);
