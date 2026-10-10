import React from "react";
import { AppBar, C, Icon, Radio } from "./parts";

// Layar aplikasi digambar ulang (CSS 390×844), mengikuti tampilan di halaman Play Store aplikasinya.

/** Beranda tanpa aturan + tombol Add Rule. */
export const HomeScreen: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: C.soft }}>
    <AppBar title="Call Blocker" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 250, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, color: C.muted }}>
      <div style={{ width: 120, height: 120, borderRadius: 60, background: "white", display: "flex", alignItems: "center", justifyContent: "center", color: C.orange }}>
        <Icon name="shield" size={64} stroke={2} />
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>No rules yet</div>
      <div style={{ fontSize: 15 }}>Create a rule to block spam calls</div>
    </div>
    <div style={{ position: "absolute", left: 115, width: 160, top: 740, height: 52, borderRadius: 26, background: "#0B0B0F", color: "white", fontSize: 18, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      <Icon name="plus" size={20} stroke={3} /> Add Rule
    </div>
  </div>
);
export const HOME_ADD = { x: 195, y: 766 };

const Option: React.FC<{ title: string; sub: string; on: number }> = ({ title, sub, on }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, height: 56 }}>
    <Radio on={on} />
    <div>
      <div style={{ fontSize: 16, fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{sub}</div>
    </div>
  </div>
);

/** Layar Create Rule. `unknown` / `reject` = 0→1 pilihan aktif. */
export const CreateRuleScreen: React.FC<{ unknown: number; reject: number }> = ({ unknown, reject }) => (
  <div style={{ position: "absolute", inset: 0, background: "white" }}>
    <AppBar title="Create Block Rule" back />
    <div style={{ padding: "26px 26px 0" }}>
      <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.01em" }}>Create Rule</div>
      <div style={{ fontSize: 17, fontWeight: 700, color: C.muted, marginTop: 22 }}>Blacklist numbers that</div>
      <div style={{ marginTop: 12, borderRadius: 18, boxShadow: "0 6px 20px rgba(0,0,0,0.08)", padding: "8px 20px" }}>
        <Option title="Starts With" sub="Example : 021" on={1 - unknown} />
        <Option title="Exact Match (or) Contacts" sub="Example : 0215091xxxx (or) contact" on={0} />
        <Option title="Block Unknown calls" sub="Blocks numbers not in Contacts" on={unknown} />
      </div>
      <div style={{ fontSize: 17, fontWeight: 700, color: C.muted, marginTop: 30 }}>Choose the way to Block</div>
      <div style={{ marginTop: 12, borderRadius: 18, boxShadow: "0 6px 20px rgba(0,0,0,0.08)", padding: "8px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, height: 50 }}>
          <Radio on={1 - reject} />
          <span style={{ fontSize: 16, fontWeight: 600 }}>Silence</span>
          <Icon name="bellOff" size={16} color={C.muted} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, height: 50 }}>
          <Radio on={reject} />
          <span style={{ fontSize: 16, fontWeight: 600 }}>Reject</span>
          <Icon name="x" size={16} color={C.muted} />
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", left: 100, width: 190, top: 740, height: 52, borderRadius: 26, background: "#0B0B0F", color: "white", fontSize: 18, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
      <span style={{ width: 24, height: 24, borderRadius: 12, background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="check" size={15} stroke={3.5} color="white" />
      </span>
      Save Rule
    </div>
  </div>
);
// Titik penting di layar Create Rule (CSS px), untuk kotak sorot & tap.
export const CR = {
  blacklistCard: { x: 195, y: 310, w: 350, h: 188 },
  unknownRow: { x: 195, y: 366, w: 340, h: 56 },
  unknownRadio: { x: 56, y: 366 },
  silenceRow: { x: 195, y: 498, w: 340, h: 50 },
  rejectRow: { x: 195, y: 548, w: 340, h: 50 },
  rejectRadio: { x: 56, y: 548 },
  save: { x: 195, y: 766 },
};

/** Layar kunci. */
export const LockScreen: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${C.navy} 0%, ${C.navy2} 100%)`, color: "white" }}>
    <div style={{ textAlign: "center", marginTop: 110, fontSize: 84, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>10:10</div>
    <div style={{ textAlign: "center", marginTop: 8, fontSize: 17, opacity: 0.8 }}>Minggu, 12 Oktober</div>
    {children}
  </div>
);

/** Layar panggilan masuk (seluler). `blocked` = 0→1 cap DIBLOKIR. */
export const IncomingCall: React.FC<{ name: string; sub: string; blocked?: number; contact?: boolean; accepted?: number; ring: number }> = ({
  name,
  sub,
  blocked = 0,
  contact,
  accepted = 0,
  ring,
}) => (
  <div style={{ position: "absolute", inset: 0, background: "#0F1626", color: "white" }}>
    <div style={{ textAlign: "center", marginTop: 120, fontSize: 16, opacity: 0.7 }}>{accepted > 0.5 ? "Tersambung · 00:01" : "Panggilan masuk · Seluler"}</div>
    <div style={{ display: "flex", justifyContent: "center", marginTop: 34 }}>
      <div style={{ position: "relative", width: 130, height: 130, borderRadius: 65, background: contact ? C.orange : "#374151", display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(${ring * 6}deg)` }}>
        {contact ? <Icon name="heart" size={58} color="white" fill="white" /> : <span style={{ fontSize: 64, fontWeight: 700, color: "#9CA3AF" }}>?</span>}
      </div>
    </div>
    <div style={{ textAlign: "center", marginTop: 26, fontSize: 34, fontWeight: 700 }}>{name}</div>
    <div style={{ textAlign: "center", marginTop: 6, fontSize: 16, opacity: 0.7 }}>{sub}</div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 650, display: "flex", justifyContent: "space-between", opacity: 1 - blocked }}>
      <div style={{ width: 76, height: 76, borderRadius: 38, background: C.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="phone" size={34} color="white" fill="white" style={{ transform: "rotate(135deg)" }} />
      </div>
      <div style={{ width: 76, height: 76, borderRadius: 38, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", opacity: 1 - accepted * 0.6 }}>
        <Icon name="phone" size={34} color="white" fill="white" />
      </div>
    </div>
    {blocked > 0 ? (
      <div style={{ position: "absolute", left: 0, right: 0, top: 440, display: "flex", justifyContent: "center", opacity: blocked }}>
        <div style={{ border: `5px solid ${C.red}`, color: C.red, borderRadius: 14, padding: "8px 22px", fontSize: 36, fontWeight: 900, letterSpacing: "0.06em", transform: `rotate(-8deg) scale(${1.6 - 0.6 * blocked})`, background: "rgba(15,22,38,0.85)" }}>
          DIBLOKIR
        </div>
      </div>
    ) : null}
  </div>
);

/** Notifikasi "Call Blocked" (teks seperti di aplikasinya). */
export const BlockedNotif: React.FC<{ number: string; style?: React.CSSProperties }> = ({ number, style }) => (
  <div style={{ background: "rgba(255,255,255,0.96)", color: C.text, borderRadius: 20, padding: 14, display: "flex", gap: 12, alignItems: "center", ...style }}>
    <div style={{ width: 46, height: 46, borderRadius: 12, background: C.navy, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon name="shield" size={28} color={C.orange} fill={C.orange} />
    </div>
    <div>
      <div style={{ fontSize: 16, fontWeight: 800 }}>Call Blocked</div>
      <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>We have blocked the call from {number}</div>
    </div>
  </div>
);
