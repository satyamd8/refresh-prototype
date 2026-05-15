import { Search, X, Check, Sparkles } from "lucide-react";
import type { SeedSong } from "../types";

export function SeedScreen({
  songs,
  selected,
  query,
  onQuery,
  onToggle,
  onDone,
}: {
  songs: SeedSong[];
  selected: Set<string>;
  query: string;
  onQuery: (q: string) => void;
  onToggle: (id: string) => void;
  onDone: () => void;
}) {
  const canProceed = selected.size >= 3;

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      {/* Header */}
      <div className="px-7 pt-4 pb-4 flex-shrink-0">
        <h2
          className="text-[30px] text-white leading-none mb-1"
          style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700 }}
        >
          SEED SELECTION
        </h2>
        <p className="text-white/35 text-xs">Choose tracks to initialize your AI profile</p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(selected.size / 10) * 100}%`,
                background: "linear-gradient(to right, #A855F7, #14F5D0)",
              }}
            />
          </div>
          <span className="text-xs text-purple-400 font-mono tabular-nums">{selected.size}/10</span>
        </div>
      </div>

      {/* Search */}
      <div className="px-7 mb-3 flex-shrink-0">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Search className="w-4 h-4 text-white/25 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search songs or artists..."
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none"
          />
          {query && (
            <button onClick={() => onQuery("")} className="text-white/25 hover:text-white/50 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Song list */}
      <div className="flex-1 overflow-y-auto px-7 pb-28 space-y-2">
        {songs.map((s) => {
          const sel = selected.has(s.id);
          return (
            <button
              key={s.id}
              onClick={() => onToggle(s.id)}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
              style={{
                background: sel ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.03)",
                border: sel ? "1px solid rgba(168,85,247,0.35)" : "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-11 h-11 rounded-lg object-cover"
                  style={{ background: "#1A1020" }}
                />
                {sel && (
                  <div
                    className="absolute inset-0 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(168,85,247,0.85)" }}
                  >
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium truncate ${sel ? "text-white" : "text-white/70"}`}>
                  {s.title}
                </div>
                <div className="text-xs text-white/35 truncate">{s.artist}</div>
              </div>
              {sel && <Sparkles className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div
        className="absolute bottom-0 left-0 right-0 px-7 pb-10 pt-8"
        style={{ background: "linear-gradient(to top, #0A0A0C 65%, transparent)" }}
      >
        <button
          onClick={onDone}
          disabled={!canProceed}
          className="w-full py-[15px] rounded-2xl text-[14px] font-semibold transition-all"
          style={
            canProceed
              ? {
                  fontFamily: "Oswald, sans-serif",
                  letterSpacing: "0.08em",
                  background: "linear-gradient(135deg, #A855F7, #7C3AED)",
                  color: "#fff",
                  boxShadow: "0 0 28px rgba(168,85,247,0.4)",
                }
              : {
                  fontFamily: "Oswald, sans-serif",
                  letterSpacing: "0.05em",
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.2)",
                }
          }
        >
          {canProceed ? "BUILD MY PROFILE →" : `SELECT ${3 - selected.size} MORE TO CONTINUE`}
        </button>
      </div>
    </div>
  );
}
