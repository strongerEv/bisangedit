import React from "react";
import { Composition } from "remotion";
import "./components/fonts";
import { theme } from "./components/theme";
import { RockyWantimpres } from "./videos/rocky-wantimpres";
import { DURATION as ROCKY_DURATION, FPS as ROCKY_FPS } from "./videos/rocky-wantimpres/timeline";

// Daftar semua komposisi. Tambahkan <Composition> per video di src/videos/<nama-video>/.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RockyWantimpres"
        component={RockyWantimpres}
        durationInFrames={ROCKY_DURATION}
        fps={ROCKY_FPS}
        width={theme.width}
        height={theme.height}
      />
    </>
  );
};
