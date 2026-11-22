import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SeriAudio } from "../../components/SeriAudio";
import { Watermark } from "../../components/Watermark";
import { S01 } from "./scenes/S01";
import { FPS, SCENES, sec, SFX, TYPE_CPS, TYPED, type SceneId } from "./timeline";

const SCENE_COMPONENTS: Record<SceneId, React.FC<{ dur: number }>> = { S01 };

// "Makan katakmu dulu" — Eat That Frog! (Brian Tracy): versi menunda vs versi tugas tersulit dulu. Seri stickman latar hitam, watermark @yumust.
export const MakanKatak: React.FC = () => (
  <AbsoluteFill style={{ background: "#050506" }}>
    {SCENES.map((s) => {
      const Comp = SCENE_COMPONENTS[s.id];
      return (
        <Sequence key={s.id} name={`${s.id} · ${s.label}`} from={sec(s.start)} durationInFrames={sec(s.end - s.start)}>
          <Comp dur={s.end - s.start} />
        </Sequence>
      );
    })}
    <SeriAudio fps={FPS} sfxList={SFX} typed={TYPED} cps={TYPE_CPS} tick="syn:ketik" tickVol={0.45} />
    <Watermark dark text="@yumust" />
  </AbsoluteFill>
);
