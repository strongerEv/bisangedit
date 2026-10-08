import React from "react";
import { Stage } from "../../../components/Stage";
import { Words } from "../../../components/Words";
import { L, SatireTag } from "../parts";
import { local, MARKERS } from "../timeline";

// Hook — langsung disusul ruang kosong klip pidato.
export const S01: React.FC<{ dur: number }> = ({ dur }) => (
  <Stage dur={dur}>
    <SatireTag />
    <div style={{ position: "absolute", left: L.x, top: 700, width: L.w }}>
      <Words text="Pantesan presiden pernah pidato *gini…*" delay={local("S01", MARKERS.pantesan) - 0.1} stagger={0.08} size={120} />
    </div>
  </Stage>
);
