import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SeriAudio } from "../../components/SeriAudio";
import { Watermark } from "../../components/Watermark";
import { S01 } from "./scenes/S01";
import { FPS, SCENES, sec, SFX, TYPE_CPS, TYPED, type SceneId } from "./timeline";

const SCENE_COMPONENTS: Record<SceneId, React.FC<{ dur: number }>> = { S01 };

// "Asah gergajimu" — The 7 Habits (Stephen R. Covey), kebiasaan ke-7: dua penebang, satu berhenti mengasah lalu menyalip. Seri stickman latar hitam, watermark @yumust.
export const AsahGergaji: React.FC = () => (
  <AbsoluteFill style={{ background: "#050506" }}>
    {SCENES.map((s) => {
      const Comp = SCENE_COMPONENTS[s.id];
      return (
        <Sequence key={s.id} name={`${s.id} · ${s.label}`} from={sec(s.start)} durationInFrames={sec(s.end - s.start)}>
          <Comp dur={s.end - s.start} />
        </Sequence>
      );
    })}
    <SeriAudio fps={FPS} sfxList={SFX} typed={TYPED} cps={TYPE_CPS} tick="syn:klik" tickVol={0.3} every={3} />
    <Watermark dark text="@yumust" />
  </AbsoluteFill>
);
