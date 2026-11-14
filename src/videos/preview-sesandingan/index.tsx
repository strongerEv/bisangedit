import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { S01 } from "./scenes/S01";
import { S02 } from "./scenes/S02";
import { S99 } from "./scenes/S99";
import { SCENES, sec, type SceneId } from "./timeline";

const SCENE_COMPONENTS: Record<SceneId, React.FC<{ dur: number }>> = { S01, S02, S99 };

// Preview undangan Sesandingan tema The Wedding Journey (One Piece): rekaman layar asli + teks fitur. Tanpa audio
// (VO/musik menyusul dari user). Brand Sesandingan → tanpa watermark Youcanbuild.
export const PreviewSesandingan: React.FC = () => (
  <AbsoluteFill style={{ background: "#FFFFFF" }}>
    {SCENES.map((s) => {
      const Comp = SCENE_COMPONENTS[s.id];
      return (
        <Sequence key={s.id} name={`${s.id} · ${s.label}`} from={sec(s.start)} durationInFrames={sec(s.end - s.start)}>
          <Comp dur={s.end - s.start} />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
