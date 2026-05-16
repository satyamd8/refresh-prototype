import { useState } from "react";
import { Sparkles, BarChart2, Plus, Check } from "lucide-react";
import type { Mode, Rating, Rec } from "../types";
import { SongCard } from "./SongCard";

const AI_EXPANDED_COUNT = 5;

function CompactRow({ rec }: { rec: Rec }) {
  return (
    <div
      className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-white/[0.04]"
    >
      <img
        src={rec.img}
        alt={rec.title}
        className="w-11 h-11 rounded-md object-cover flex-shrink-0"
        style={{ background: "#1A1020" }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-white text-[13px] font-medium truncate">{rec.title}</div>
        <div className="text-white/40 text-[11px] truncate">
          {rec.artist} · {rec.album} · {rec.genre}
        </div>
      </div>
      <span className="text-[11px] text-white/45 font-mono tabular-nums flex-shrink-0">
        {rec.length}
      </span>
    </div>
  );
}

function ModeToggle({ mode, onModeChange }: { mode: Mode; onModeChange: (m: Mode) => void }) {
  return (
    <div
      className="inline-flex p-0.5 rounded-full"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <button
        onClick={() => onModeChange("ai")}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all"
        style={
          mode === "ai"
            ? {
                background: "linear-gradient(135deg, #A855F7, #7C3AED)",
                color: "#fff",
                boxShadow: "0 0 16px rgba(168,85,247,0.35)",
              }
            : { color: "rgba(255,255,255,0.45)" }
        }
      >
        <Sparkles style={{ width: 11, height: 11 }} />
        AI
      </button>
      <button
        onClick={() => onModeChange("normal")}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all"
        style={
          mode === "normal"
            ? {
                background: "linear-gradient(135deg, #14F5D0, #6366F1)",
                color: "#0A0A0C",
                boxShadow: "0 0 16px rgba(20,245,208,0.35)",
              }
            : { color: "rgba(255,255,255,0.45)" }
        }
      >
        <BarChart2 style={{ width: 11, height: 11 }} />
        Normal
      </button>
    </div>
  );
}

export function DiscoveryScreen({
  recs,
  ratings,
  playingId,
  mode,
  onRate,
  onPlay,
  onModeChange,
}: {
  recs: Rec[];
  ratings: Record<string, Rating>;
  playingId: string | null;
  mode: Mode;
  onRate: (id: string, r: Rating) => void;
  onPlay: (id: string) => void;
  onModeChange: (m: Mode) => void;
}) {
  const [saved, setSaved] = useState(false);

  const expanded = mode === "ai" ? recs.slice(0, AI_EXPANDED_COUNT) : [];
  const compact = mode === "ai" ? recs.slice(AI_EXPANDED_COUNT) : recs;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div
        className="px-6 pt-4 pb-3 flex-shrink-0"
        style={{ background: "rgba(10,10,12,0.95)", backdropFilter: "blur(16px)" }}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              {mode === "ai" ? (
                <>
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span className="text-[10px] text-purple-400 uppercase tracking-[0.14em]">
                    AI Curated
                  </span>
                </>
              ) : (
                <>
                  <BarChart2 className="w-3 h-3 text-teal-400" />
                  <span className="text-[10px] text-teal-400 uppercase tracking-[0.14em]">
                    Score-Based
                  </span>
                </>
              )}
            </div>
            <h2
              className="text-[26px] text-white leading-none"
              style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700 }}
            >
              FOR YOU
            </h2>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #A855F7, #14F5D0)",
              fontFamily: "Oswald, sans-serif",
            }}
          >
            JD
          </div>
        </div>
        <ModeToggle mode={mode} onModeChange={onModeChange} />
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto">
        {mode === "ai" && (
          <div className="px-4 pt-4 space-y-4">
            {expanded.map((rec) => (
              <SongCard
                key={rec.id}
                rec={rec}
                rating={ratings[rec.id] ?? null}
                isPlaying={playingId === rec.id}
                onRate={onRate}
                onPlay={onPlay}
              />
            ))}
          </div>
        )}

        {compact.length > 0 && (
          <div className="px-4 pt-4 pb-4">
            {mode === "ai" && (
              <div className="flex items-center gap-2 px-2 mb-2">
                <span className="text-[10px] text-white/35 uppercase tracking-widest">
                  More score-based picks
                </span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
            )}
            <div className="space-y-1">
              {compact.map((rec) => (
                <CompactRow key={rec.id} rec={rec} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Save CTA */}
      <div
        className="px-4 pt-2 pb-3 flex-shrink-0"
        style={{
          background: "linear-gradient(to top, #0A0A0C 70%, rgba(10,10,12,0.6))",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <button
          onClick={() => setSaved((s) => !s)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-[13px] font-semibold transition-all active:scale-[0.98]"
          style={
            saved
              ? {
                  background: "rgba(20,245,208,0.15)",
                  border: "1px solid rgba(20,245,208,0.45)",
                  color: "#14F5D0",
                  boxShadow: "0 0 20px rgba(20,245,208,0.25)",
                }
              : {
                  background: "linear-gradient(135deg, #A855F7, #7C3AED)",
                  color: "#fff",
                  boxShadow: "0 0 20px rgba(168,85,247,0.35)",
                }
          }
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" strokeWidth={3} />
              Saved to Library
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Save as Playlist ({recs.length})
            </>
          )}
        </button>
      </div>
    </div>
  );
}
