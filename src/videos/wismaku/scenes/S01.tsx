import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enterAt, rise } from "../../../components/motion";
import { Stage } from "../../../components/Stage";
import { mixPose, POSES, type Pose, Stickman, walkPose } from "../../../components/Stickman";
import { Words } from "../../../components/Words";
import { Backdrop, font, N } from "../parts";
import { local, MARKERS as M } from "../timeline";

const L = (t: number) => local("S01", t);

const FLOOR = 1660;
const DOOR = { w: 250, h: 700 };
const DOORS = [
  { n: "101", x: 270 },
  { n: "102", x: 560 },
  { n: "103", x: 850 },
];
const STAND = (i: number) => DOORS[i].x - 170; // posisi pinggul stickman di kiri pintu
const SCALE = 1.2;
const HIP_Y = FLOOR - 176 * SCALE;

// Jadwal gerak (detik lokal): masuk → ketok 101 → jalan → ketok 102 → jalan → ketok 103 → lesu.
const T = {
  enterFrom: L(M.pemilik) - 0.3,
  at101: L(M.ketok) - 0.15,
  knock101: L(M.ketok),
  leave101: L(M.pintu) + 0.35,
  at102: L(M.nanyain) - 0.2,
  knock102: L(M.nanyain) - 0.1,
  leave102: L(M.nanyain) + 0.45,
  at103: L(M.nanyain) + 1.0,
  knock103: L(M.nanyain) + 1.05,
  slump: L(M.nanyain) + 1.5,
};

const KNOCK_A: Pose = { armL: [-20, 10], armR: [100, -70], legL: [-12, 4], legR: [12, -4] };
const KNOCK_B: Pose = { armL: [-20, 10], armR: [80, -40], legL: [-12, 4], legR: [12, -4] };

const Door: React.FC<{ n: string; x: number; open: number; shake: number }> = ({ n, x, open, shake }) => (
  <div style={{ position: "absolute", left: x - DOOR.w / 2, top: FLOOR - DOOR.h, width: DOOR.w, height: DOOR.h }}>
    {/* kusen + ruang gelap di balik pintu */}
    <div style={{ position: "absolute", inset: -14, borderRadius: "14px 14px 0 0", background: "#3B2A1E" }} />
    <div style={{ position: "absolute", inset: 0, background: "#0A0D18" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 40 * open, background: "linear-gradient(90deg, rgba(255,194,75,0.55), rgba(255,194,75,0))" }} />
    </div>
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, #A06A43 0%, #8A5636 100%)",
        borderRadius: 4,
        transformOrigin: "right center",
        transform: `perspective(900px) rotateY(${-38 * open}deg) translateX(${shake}px)`,
        boxShadow: "inset 0 0 0 6px rgba(0,0,0,0.12)",
      }}
    >
      <div style={{ position: "absolute", left: 28, right: 28, top: 40, height: 250, borderRadius: 8, boxShadow: "inset 0 0 0 5px rgba(0,0,0,0.14)" }} />
      <div style={{ position: "absolute", left: 28, right: 28, top: 330, height: 320, borderRadius: 8, boxShadow: "inset 0 0 0 5px rgba(0,0,0,0.14)" }} />
      <div style={{ position: "absolute", left: 50, right: 50, top: -4, height: 64, marginTop: 70, borderRadius: 10, background: N.amber, color: N.night, ...font, fontWeight: 800, fontSize: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</div>
      <div style={{ position: "absolute", left: 22, top: 370, width: 24, height: 24, borderRadius: 11, background: N.amber }} />
    </div>
  </div>
);

const Bubble: React.FC<{ text: string; x: number; p: number }> = ({ text, x, p }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: FLOOR - DOOR.h - 120,
      transform: `translateX(-50%) scale(${0.6 + 0.4 * p})`,
      transformOrigin: "bottom center",
      opacity: p,
      background: N.cream,
      color: N.night,
      borderRadius: 30,
      padding: "18px 30px",
      ...font,
      fontWeight: 700,
      fontSize: 54,
      whiteSpace: "nowrap",
      boxShadow: `0 16px 40px ${N.shadow}`,
    }}
  >
    {text}
  </div>
);

// "Tanggal satu. Pemilik kos keliling, ketok pintu satu-satu, nanyain uang sewa."
export const S01: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // posisi x stickman
  const x = interpolate(
    t,
    [T.enterFrom, T.at101, T.leave101, T.at102, T.leave102, T.at103],
    [-160, STAND(0), STAND(0), STAND(1), STAND(1), STAND(2)],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const walking = (t > T.enterFrom && t < T.at101) || (t > T.leave101 && t < T.at102) || (t > T.leave102 && t < T.at103);
  const knocking = [T.knock101, T.knock102, T.knock103].some((k) => t > k && t < k + 0.45);
  const slump = enterAt(frame, fps, T.slump, 0.4);
  let pose: Pose = POSES.stand;
  if (walking) pose = walkPose(t * 1.6);
  else if (knocking) pose = Math.floor(t * 12) % 2 ? KNOCK_A : KNOCK_B;
  pose = mixPose(pose, POSES.slump, slump);

  const toks = [T.knock101, T.knock102, T.knock103];
  const doorShake = (i: number) => (t > toks[i] && t < toks[i] + 0.45 ? Math.sin(t * 90) * 3 : 0);
  const open101 = between(frame, fps, T.knock101 + 0.5, T.knock101 + 0.8) * (1 - between(frame, fps, T.leave101 + 0.3, T.leave101 + 0.6));
  const cal = spring({ frame: frame - Math.round((L(M.tanggal) - 0.05) * fps), fps, config: { damping: 10 } });
  const sweat = enterAt(frame, fps, T.slump + 0.2, 0.3);

  return (
    <Stage dur={dur}>
      <Backdrop />
      {/* dinding lorong + lampu */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 780, height: FLOOR - 780, background: `linear-gradient(180deg, ${N.wall} 0%, ${N.night3} 100%)` }} />
      {[150, 450, 750, 1050].map((lx) => (
        <React.Fragment key={lx}>
          <div style={{ position: "absolute", left: lx - 160, top: 720, width: 320, height: 320, borderRadius: 160, background: "radial-gradient(circle, rgba(255,194,75,0.35) 0%, rgba(255,194,75,0) 65%)" }} />
          <div style={{ position: "absolute", left: lx - 22, top: 840, width: 44, height: 24, borderRadius: "22px 22px 6px 6px", background: N.amber, boxShadow: "0 0 30px rgba(255,194,75,0.9)" }} />
        </React.Fragment>
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: FLOOR, bottom: 0, background: "#0D1328" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: FLOOR, height: 8, background: N.night3 }} />

      {DOORS.map((d, i) => (
        <Door key={d.n} n={d.n} x={d.x} open={i === 0 ? open101 : 0} shake={doorShake(i)} />
      ))}

      {/* TOK TOK */}
      {toks.map((k, i) => {
        const p = enterAt(frame, fps, k, 0.15) * (1 - enterAt(frame, fps, k + 0.55, 0.2));
        return (
          <div key={i} style={{ position: "absolute", left: DOORS[i].x - 40, top: FLOOR - DOOR.h + 120, ...font, fontWeight: 900, fontSize: 64, color: N.amber, opacity: p, transform: `rotate(-10deg) scale(${0.6 + 0.4 * p})`, textShadow: "0 4px 14px rgba(0,0,0,0.6)" }}>
            TOK TOK!
          </div>
        );
      })}
      <Bubble text="Besok ya, Bu…" x={DOORS[0].x + 60} p={enterAt(frame, fps, T.knock101 + 0.65, 0.25) * (1 - enterAt(frame, fps, T.leave101 + 0.4, 0.2))} />
      <Bubble text="…" x={DOORS[1].x + 40} p={enterAt(frame, fps, T.knock102 + 0.5, 0.25) * (1 - enterAt(frame, fps, T.leave102 + 0.4, 0.2))} />

      <Stickman x={x} y={HIP_Y} pose={pose} face={slump > 0.5 ? "stress" : "neutral"} facing={1} scale={SCALE} color={N.cream} />
      <div style={{ position: "absolute", left: x + 50, top: HIP_Y - 300, width: 26, height: 38, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", background: "#7CC6FF", opacity: sweat, transform: `translateY(${sweat * 20}px)` }} />

      {/* kalender + judul */}
      <div style={{ position: "absolute", left: 90, top: 200, width: 210, height: 230, borderRadius: 28, background: N.cream, overflow: "hidden", boxShadow: `0 20px 50px ${N.shadow}`, ...font, opacity: Math.min(1, cal * 2), transform: `scale(${0.5 + 0.5 * cal}) rotate(${(1 - cal) * -12}deg)` }}>
        <div style={{ height: 66, background: N.coral, color: "white", fontWeight: 800, fontSize: 34, display: "flex", alignItems: "center", justifyContent: "center", letterSpacing: "0.1em" }}>OKT</div>
        <div style={{ textAlign: "center", fontWeight: 900, fontSize: 130, color: N.night, lineHeight: "164px" }}>1</div>
      </div>
      <div style={{ position: "absolute", left: 350, top: 215, width: 660 }}>
        <Words text="Tanggal *satu.*" delay={L(M.tanggal) - 0.1} stagger={0.35} size={100} color={N.text} accent={N.amber} />
      </div>
      <div style={{ position: "absolute", left: 352, top: 340, width: 660, ...rise(enterAt(frame, fps, L(M.pemilik) - 0.1, 0.35), 16) }}>
        <Words text="Waktunya *nagih* sewa…" delay={L(M.pemilik) - 0.1} stagger={0.18} size={58} weight={600} color={N.muted} accent={N.coral} />
      </div>
    </Stage>
  );
};
