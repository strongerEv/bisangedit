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
import { IklanAplikasi } from "./videos/iklan-aplikasi";
import { Fiviz } from "./videos/fiviz";
import { Ingonentok } from "./videos/ingonentok";
import { MasjidAlmisbah } from "./videos/masjid-almisbah";
import { DURATION as MA_DURATION, FPS as MA_FPS } from "./videos/masjid-almisbah/timeline";
import { IklanHastrans } from "./videos/iklan-hastrans";
import { PreviewSesandingan } from "./videos/preview-sesandingan";
import { TerlahirTampan } from "./videos/terlahir-tampan";
import { KesabaranBisnis } from "./videos/kesabaran-bisnis";
import { TanggaKekayaan } from "./videos/tangga-kekayaan";
import { PriaDiMobil } from "./videos/pria-di-mobil";
import { SatuPersen } from "./videos/satu-persen";
import { KayaTakTerlihat } from "./videos/kaya-tak-terlihat";
import { DURATION as KT_DURATION, FPS as KT_FPS } from "./videos/kaya-tak-terlihat/timeline";
import { UangBekerja } from "./videos/uang-bekerja";
import { DURATION as UB_DURATION, FPS as UB_FPS } from "./videos/uang-bekerja/timeline";
import { ZonaNyaman } from "./videos/zona-nyaman";
import { DURATION as ZN_DURATION, FPS as ZN_FPS } from "./videos/zona-nyaman/timeline";
import { SisihkanDulu } from "./videos/sisihkan-dulu";
import { DURATION as SD_DURATION, FPS as SD_FPS } from "./videos/sisihkan-dulu/timeline";
import { PikiranNyata } from "./videos/pikiran-nyata";
import { DURATION as PN_DURATION, FPS as PN_FPS } from "./videos/pikiran-nyata/timeline";
import { AsahGergaji } from "./videos/asah-gergaji";
import { DURATION as AG_DURATION, FPS as AG_FPS } from "./videos/asah-gergaji/timeline";
import { MakanKatak } from "./videos/makan-katak";
import { DURATION as KK_DURATION, FPS as KK_FPS } from "./videos/makan-katak/timeline";
import { Ikigai } from "./videos/ikigai";
import { DURATION as IG_DURATION, FPS as IG_FPS } from "./videos/ikigai/timeline";
import { MahirProdukDigital } from "./videos/mahir-produk-digital";
import { DURATION as MPD_DURATION, FPS as MPD_FPS } from "./videos/mahir-produk-digital/timeline";
import { DURATION as SP_DURATION, FPS as SP_FPS } from "./videos/satu-persen/timeline";
import { DURATION as PM_DURATION, FPS as PM_FPS } from "./videos/pria-di-mobil/timeline";
import { DURATION as TK_DURATION, FPS as TK_FPS } from "./videos/tangga-kekayaan/timeline";
import { DURATION as KB_DURATION, FPS as KB_FPS } from "./videos/kesabaran-bisnis/timeline";
import { DURATION as TT_DURATION, FPS as TT_FPS } from "./videos/terlahir-tampan/timeline";
import { DURATION as PS_DURATION, FPS as PS_FPS } from "./videos/preview-sesandingan/timeline";
import { DURATION as IH_DURATION, FPS as IH_FPS } from "./videos/iklan-hastrans/timeline";
import { DURATION as IE_DURATION, FPS as IE_FPS } from "./videos/ingonentok/timeline";
import { DURATION as FV_DURATION, FPS as FV_FPS } from "./videos/fiviz/timeline";
import { DURATION as IA_DURATION, FPS as IA_FPS } from "./videos/iklan-aplikasi/timeline";
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
        id="IklanAplikasi"
        component={IklanAplikasi}
        durationInFrames={IA_DURATION}
        fps={IA_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="Fiviz"
        component={Fiviz}
        durationInFrames={FV_DURATION}
        fps={FV_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="Ingonentok"
        component={Ingonentok}
        durationInFrames={IE_DURATION}
        fps={IE_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="MasjidAlmisbah"
        component={MasjidAlmisbah}
        durationInFrames={MA_DURATION}
        fps={MA_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="IklanHastrans"
        component={IklanHastrans}
        durationInFrames={IH_DURATION}
        fps={IH_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="PreviewSesandingan"
        component={PreviewSesandingan}
        durationInFrames={PS_DURATION}
        fps={PS_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="TerlahirTampan"
        component={TerlahirTampan}
        durationInFrames={TT_DURATION}
        fps={TT_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="KesabaranBisnis"
        component={KesabaranBisnis}
        durationInFrames={KB_DURATION}
        fps={KB_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="TanggaKekayaan"
        component={TanggaKekayaan}
        durationInFrames={TK_DURATION}
        fps={TK_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="PriaDiMobil"
        component={PriaDiMobil}
        durationInFrames={PM_DURATION}
        fps={PM_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="SatuPersen"
        component={SatuPersen}
        durationInFrames={SP_DURATION}
        fps={SP_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="KayaTakTerlihat"
        component={KayaTakTerlihat}
        durationInFrames={KT_DURATION}
        fps={KT_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="UangBekerja"
        component={UangBekerja}
        durationInFrames={UB_DURATION}
        fps={UB_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="ZonaNyaman"
        component={ZonaNyaman}
        durationInFrames={ZN_DURATION}
        fps={ZN_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="SisihkanDulu"
        component={SisihkanDulu}
        durationInFrames={SD_DURATION}
        fps={SD_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="PikiranNyata"
        component={PikiranNyata}
        durationInFrames={PN_DURATION}
        fps={PN_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="AsahGergaji"
        component={AsahGergaji}
        durationInFrames={AG_DURATION}
        fps={AG_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="MakanKatak"
        component={MakanKatak}
        durationInFrames={KK_DURATION}
        fps={KK_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="Ikigai"
        component={Ikigai}
        durationInFrames={IG_DURATION}
        fps={IG_FPS}
        width={theme.width}
        height={theme.height}
      />
      <Composition
        id="MahirProdukDigital"
        component={MahirProdukDigital}
        durationInFrames={MPD_DURATION}
        fps={MPD_FPS}
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
