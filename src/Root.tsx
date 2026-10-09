import React from "react";
import { Composition } from "remotion";
import "./components/fonts";
import { theme } from "./components/theme";
import { CaraBikinnya } from "./videos/cara-bikinnya";
import { IklanWebApp } from "./videos/iklan-web-app";
import { KucingJatuh } from "./videos/kucing-jatuh";
import { DURATION as KJ_DURATION, FPS as KJ_FPS } from "./videos/kucing-jatuh/timeline";
import { KucingJatuhTes } from "./videos/kucing-jatuh-tes";
import { DURATION as KUCING_DURATION, FPS as KUCING_FPS } from "./videos/kucing-jatuh-tes/timeline";
import { RockyPakar } from "./videos/rocky-pakar";
import { DURATION as PAKAR_DURATION, FPS as PAKAR_FPS } from "./videos/rocky-pakar/timeline";
import { TutorialClaudeCode } from "./videos/tutorial-claude-code";
import { TutorialCodex } from "./videos/tutorial-codex";
import { DURATION as CODEX_DURATION, FPS as CODEX_FPS } from "./videos/tutorial-codex/timeline";
import { DURATION as TUTOR_DURATION, FPS as TUTOR_FPS } from "./videos/tutorial-claude-code/timeline";
import { IklanStyleTest, STYLE_TEST_FRAMES } from "./videos/iklan-web-app/StyleTest";
import { DURATION as IKLAN_DURATION, FPS as IKLAN_FPS } from "./videos/iklan-web-app/timeline";
import { DURATION as CARA_DURATION, FPS as CARA_FPS } from "./videos/cara-bikinnya/timeline";
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
      <Composition
        id="CaraBikinnya"
        component={CaraBikinnya}
        durationInFrames={CARA_DURATION}
        fps={CARA_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="IklanWebApp"
        component={IklanWebApp}
        durationInFrames={IKLAN_DURATION}
        fps={IKLAN_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="TutorialClaudeCode"
        component={TutorialClaudeCode}
        durationInFrames={TUTOR_DURATION}
        fps={TUTOR_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="RockyPakar"
        component={RockyPakar}
        durationInFrames={PAKAR_DURATION}
        fps={PAKAR_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="TutorialCodex"
        component={TutorialCodex}
        durationInFrames={CODEX_DURATION}
        fps={CODEX_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="KucingJatuh"
        component={KucingJatuh}
        durationInFrames={KJ_DURATION}
        fps={KJ_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="KucingJatuh-Tes"
        component={KucingJatuhTes}
        durationInFrames={KUCING_DURATION}
        fps={KUCING_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="IklanWebApp-UjiGaya"
        component={IklanStyleTest}
        durationInFrames={STYLE_TEST_FRAMES * 60}
        fps={30}
        width={theme.width}
        height={theme.height}
      />
    </>
  );
};
