import React from "react";
import { Composition } from "remotion";
import "./components/fonts";
import { theme } from "./components/theme";
import { CaraBikinnya } from "./videos/cara-bikinnya";
import { CaraRemotion } from "./videos/cara-remotion";
import { DURATION as CR_DURATION, FPS as CR_FPS } from "./videos/cara-remotion/timeline";
import { Fastreng } from "./videos/fastreng";
import { Makaryo } from "./videos/makaryo";
import { DealerPakAji } from "./videos/dealer-pakaji";
import { CallBlocker } from "./videos/call-blocker";
import { Duitku } from "./videos/duitku";
import { Warkas } from "./videos/warkas";
import { Wismaku } from "./videos/wismaku";
import { DURATION as WM_DURATION, FPS as WM_FPS } from "./videos/wismaku/timeline";
import { DURATION as WK_DURATION, FPS as WK_FPS } from "./videos/warkas/timeline";
import { DURATION as DK_DURATION, FPS as DK_FPS } from "./videos/duitku/timeline";
import { DURATION as CB_DURATION, FPS as CB_FPS } from "./videos/call-blocker/timeline";
import { DURATION as DP_DURATION, FPS as DP_FPS } from "./videos/dealer-pakaji/timeline";
import { DURATION as MK_DURATION, FPS as MK_FPS } from "./videos/makaryo/timeline";
import { DURATION as FR_DURATION, FPS as FR_FPS } from "./videos/fastreng/timeline";
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
        id="Fastreng"
        component={Fastreng}
        durationInFrames={FR_DURATION}
        fps={FR_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="Makaryo"
        component={Makaryo}
        durationInFrames={MK_DURATION}
        fps={MK_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="DealerPakAji"
        component={DealerPakAji}
        durationInFrames={DP_DURATION}
        fps={DP_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="CallBlocker"
        component={CallBlocker}
        durationInFrames={CB_DURATION}
        fps={CB_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="Duitku"
        component={Duitku}
        durationInFrames={DK_DURATION}
        fps={DK_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="Warkas"
        component={Warkas}
        durationInFrames={WK_DURATION}
        fps={WK_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="Wismaku"
        component={Wismaku}
        durationInFrames={WM_DURATION}
        fps={WM_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="CaraRemotion"
        component={CaraRemotion}
        durationInFrames={CR_DURATION}
        fps={CR_FPS}
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
