import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { Activity } from "lucide-react";
import { ATTRS, RADAR_DATA } from "../data";

export function VibeScreen() {
  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-4 pb-5">
        <div className="flex items-center gap-1.5 mb-1">
          <Activity className="w-3 h-3 text-teal-400" />
          <span className="text-[10px] text-teal-400 uppercase tracking-[0.14em]">Listening DNA</span>
        </div>
        <h2
          className="text-[26px] text-white leading-none"
          style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700 }}
        >
          MY VIBE
        </h2>
      </div>

      {/* Profile card */}
      <div
        className="mx-4 mb-4 rounded-2xl p-4"
        style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(20,245,208,0.05) 100%)",
          border: "1px solid rgba(168,85,247,0.22)",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #A855F7, #14F5D0)", fontFamily: "Oswald, sans-serif" }}
          >
            JD
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-[15px]">Jamie Doe</h3>
            <p className="text-white/40 text-xs mt-0.5">Premium Listener · 847 tracks analyzed</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-[9px] text-white/25 uppercase tracking-wider mb-0.5">Score</div>
            <div
              className="text-2xl font-bold text-purple-400 leading-none"
              style={{ fontFamily: "Oswald, sans-serif" }}
            >
              8.7
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["Synth-pop", "Electronic", "Alt-pop", "Indie R&B"].map((g) => (
            <span
              key={g}
              className="px-2.5 py-0.5 rounded-full text-[10px] text-white/45"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
            >
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Radar chart */}
      <div
        className="mx-4 mb-4 rounded-2xl p-4"
        style={{ background: "#131316", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Sonic Profile Radar</div>
        <ResponsiveContainer width="100%" height={210}>
          <RadarChart data={RADAR_DATA} cx="50%" cy="50%" outerRadius={72}>
            <PolarGrid stroke="rgba(255,255,255,0.06)" />
            <PolarAngleAxis
              dataKey="attr"
              tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10, fontFamily: "JetBrains Mono, monospace" }}
            />
            <Radar
              name="Vibe"
              dataKey="v"
              stroke="#A855F7"
              fill="#A855F7"
              fillOpacity={0.18}
              strokeWidth={1.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Scoring bars */}
      <div
        className="mx-4 mb-4 rounded-2xl p-4 space-y-3"
        style={{ background: "#131316", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="text-[10px] text-white/30 uppercase tracking-widest">Scoring Logic</div>
        {ATTRS.map((a) => (
          <div key={a.label}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-white/55">{a.label}</span>
              <span className="text-xs text-white/40 font-mono tabular-nums">{a.value}</span>
            </div>
            <div className="h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${a.value}%`, background: a.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="mx-4 mb-6 grid grid-cols-3 gap-3">
        {[
          { label: "Tracks Rated", value: "124" },
          { label: "AI Sessions", value: "38" },
          { label: "Discovery Score", value: "94%" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-3 text-center"
            style={{ background: "#131316", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div
              className="text-xl font-bold text-purple-400 mb-1 leading-none"
              style={{ fontFamily: "Oswald, sans-serif" }}
            >
              {s.value}
            </div>
            <div className="text-[10px] text-white/30 leading-tight">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
