import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { theme } from "../../components/theme";
import { S01 } from "./scenes/S01";
import { S02 } from "./scenes/S02";
import { S03 } from "./scenes/S03";
import { S04 } from "./scenes/S04";
import { S99 } from "./scenes/S99";
import { AUDIO, SCENES, sec, type SceneId } from "./timeline";

const SCENE_COMPONENTS: Record<SceneId, React.FC<{ dur: number }>> = { S01, S02, S03, S04, S99 };

// Iklan 20 dtk Youcanbuild — angle "bisnis masih pakai chat & Excel" + bukti portofolio.
export const IklanAplikasi: React.FC = () => (
  <AbsoluteFill style={{ background: theme.colors.bg }}>
    <Audio src={staticFile(AUDIO)} />
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
