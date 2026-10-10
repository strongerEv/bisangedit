import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { Backdrop, Chip, css, D, HiBox, mono, Phone, TitleArea } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S06", t);
const W = 500;
const KPI = css(288, 418, W); // kartu "Prospek baru"
const ROW1 = css(195, 230, W); // baris Toyota Raize
const STATUS1 = css(57, 230, W);
const LEAD1 = css(195, 485, W);

// "Di belakangnya, admin punya dashboard: kelola stok, tandai terjual, dan pantau semua prospek pembeli."
export const S06: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const toStok = between(frame, fps, L(M.stok) - 0.2, L(M.stok) + 0.05);
  const toRight = between(frame, fps, L(M.terjual) - 0.25, L(M.terjual));
  const toSold = between(frame, fps, L(M.terjual) + 0.45, L(M.terjual) + 0.65);
  const toLead = between(frame, fps, L(M.pantau) - 0.2, L(M.pantau) + 0.05);
  return (
    <Stage dur={dur}>
      <Backdrop />
      <TitleArea dur={dur}>
        <div style={{ ...mono, color: D.red, opacity: enterAt(frame, fps, L(M.admin) - 0.2, 0.3) }}>DI BELAKANG LAYAR</div>
        <Words text="Panel *admin*" delay={L(M.admin) - 0.1} stagger={0.3} size={104} color={D.text} accent={D.red} />
      </TitleArea>
      <Phone
        width={W}
        y={1170}
        shots={[
          { src: "13_dashboard.png", o: 1 - toStok },
          { src: "14_stok_left.png", o: toStok * (1 - toRight) },
          { src: "14_stok_a.png", o: toRight * (1 - toSold) * (1 - toLead) },
          { src: "14_stok_b.png", o: toSold * (1 - toLead) },
          { src: "15_prospek.png", o: toLead },
        ]}
      >
        <HiBox c={KPI} w={180} h={124} p={enterAt(frame, fps, L(M.dashboard) - 0.1, 0.25) * (1 - toStok)} width={W} />
        <HiBox c={ROW1} w={370} h={70} p={enterAt(frame, fps, L(M.stok) + 0.15, 0.25) * (1 - toRight)} width={W} />
        <HiBox c={STATUS1} w={108} h={44} p={toRight * (1 - toLead)} width={W} />
        <HiBox c={LEAD1} w={366} h={300} p={enterAt(frame, fps, L(M.prospek) - 0.1, 0.3)} width={W} />
      </Phone>
      <Chip tone="red" style={{ left: 640, top: 1420, ...rise(toSold * (1 - toLead), 24) }}>
        Terjual ✓
      </Chip>
      <Chip tone="light" style={{ left: 60, top: 1750, fontSize: 28, padding: "10px 22px", opacity: 0.9 }}>
        prospek = data contoh
      </Chip>
    </Stage>
  );
};
