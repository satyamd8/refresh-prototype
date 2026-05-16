import { Sparkles, BarChart2, ChevronRight, Zap } from "lucide-react";
import type { Mode } from "../types";

export function ModeSelectScreen({ onPick }: { onPick: (m: Mode) => void }) {
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.18) 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-20 left-0 w-48 h-48 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(20,245,208,0.08) 0%, transparent 65%)" }}
      />

      <div className="relative flex flex-col flex-1 px-7 pt-6 pb-10">
        {/* Header */}
        <div className="mb-6 flex-shrink-0">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Zap className="w-3 h-3 text-purple-400" />
            <span className="text-[10px] text-purple-400 uppercase tracking-[0.14em]">
              Discovery Mode
            </span>
          </div>
          <h2
            className="text-[32px] text-white leading-none mb-2"
            style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700 }}
          >
            CHOOSE YOUR<br />MODE
          </h2>
          <p className="text-white/40 text-sm leading-relaxed">
            How would you like Refresh to surface new music?
          </p>
        </div>

        {/* Mode cards */}
        <div className="flex flex-col gap-3 flex-1 justify-center">
          {/* AI mode */}
          <button
            onClick={() => onPick("ai")}
            className="text-left rounded-2xl p-5 transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(20,245,208,0.06) 100%)",
              border: "1px solid rgba(168,85,247,0.35)",
              boxShadow: "0 0 32px rgba(168,85,247,0.12)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #A855F7 0%, #6D28D9 100%)",
                  boxShadow: "0 0 20px rgba(168,85,247,0.4)",
                }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                style={{
                  background: "rgba(20,245,208,0.15)",
                  border: "1px solid rgba(20,245,208,0.35)",
                  color: "#14F5D0",
                }}
              >
                RAG
              </span>
            </div>
            <h3
              className="text-white text-[20px] mb-1 leading-tight"
              style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, letterSpacing: "0.02em" }}
            >
              AI-ASSISTED
            </h3>
            <p className="text-white/55 text-[12px] leading-relaxed mb-3">
              Top picks shown as expanded cards with reasoning, followed by score-based recommendations. Best for exploring new sounds.
            </p>
            <div className="flex items-center gap-1 text-purple-300 text-[12px]">
              <span>Start with AI</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Normal mode */}
          <button
            onClick={() => onPick("normal")}
            className="text-left rounded-2xl p-5 transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #14F5D0 0%, #6366F1 100%)",
                  boxShadow: "0 0 20px rgba(20,245,208,0.3)",
                }}
              >
                <BarChart2 className="w-5 h-5 text-white" />
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                CLASSIC
              </span>
            </div>
            <h3
              className="text-white text-[20px] mb-1 leading-tight"
              style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, letterSpacing: "0.02em" }}
            >
              SCORE-BASED
            </h3>
            <p className="text-white/55 text-[12px] leading-relaxed mb-3">
              A clean, compact list ranked by audio-feature similarity. Title, album, genre, length — like a familiar playlist view.
            </p>
            <div className="flex items-center gap-1 text-teal-300 text-[12px]">
              <span>Start with Normal</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        <p className="text-white/25 text-[11px] text-center mt-4 flex-shrink-0">
          You can switch modes anytime from the Discover tab.
        </p>
      </div>
    </div>
  );
}
