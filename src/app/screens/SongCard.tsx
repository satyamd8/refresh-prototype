import { Play, Pause, ThumbsUp, ThumbsDown, Sparkles, ExternalLink, Activity } from "lucide-react";
import type { Rating, Rec } from "../types";

export function SongCard({
  rec,
  rating,
  isPlaying,
  onRate,
  onPlay,
}: {
  rec: Rec;
  rating: Rating;
  isPlaying: boolean;
  onRate: (id: string, r: Rating) => void;
  onPlay: (id: string) => void;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden relative"
      style={{
        background: "linear-gradient(160deg, #141418 0%, #0F0F13 100%)",
        border: "1px solid rgba(168,85,247,0.22)",
        boxShadow: "0 0 40px rgba(168,85,247,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Top edge glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent 10%, #A855F7 40%, #14F5D0 60%, transparent 90%)" }}
      />

      {/* Album art */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={rec.img}
          alt={`${rec.title} by ${rec.artist}`}
          className="w-full h-full object-cover"
          style={{ background: "#1A1020" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, #0F0F13 0%, rgba(15,15,19,0.35) 55%, transparent 100%)",
          }}
        />

        {/* BPM badge */}
        <div className="absolute top-3 left-3">
          <span
            className="px-2 py-0.5 rounded-md text-[10px] font-mono"
            style={{
              background: "rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {rec.bpm} BPM
          </span>
        </div>

        {/* Match badge */}
        <div className="absolute top-3 right-3">
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono"
            style={
              rec.matchPct >= 90
                ? { background: "rgba(20,245,208,0.15)", border: "1px solid rgba(20,245,208,0.35)", color: "#14F5D0" }
                : { background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.35)", color: "#C084FC" }
            }
          >
            <Activity style={{ width: 10, height: 10 }} />
            {rec.matchPct}%
          </div>
        </div>

        {/* Play button */}
        <button
          onClick={() => onPlay(rec.id)}
          className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-black" />
          ) : (
            <Play className="w-4 h-4 text-black" style={{ marginLeft: 2 }} />
          )}
        </button>
      </div>

      {/* Body */}
      <div className="px-4 pt-3 pb-4 space-y-3">
        {/* Track info */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-white font-semibold text-[15px] leading-tight truncate">{rec.title}</h3>
            <p className="text-white/40 text-[12px] mt-0.5">
              {rec.artist} · {rec.album}
            </p>
          </div>
          <div className="flex flex-col gap-1 items-end flex-shrink-0 mt-0.5">
            {rec.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-md text-[10px] text-white/35"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Why This Fits */}
        <div
          className="rounded-xl p-3"
          style={{ background: "rgba(168,85,247,0.07)", border: "1px solid rgba(168,85,247,0.16)" }}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span className="text-[10px] text-purple-400 uppercase tracking-[0.14em]">Why This Fits</span>
          </div>
          <p className="text-white/55 text-[12px] leading-relaxed">{rec.why}</p>
        </div>

        {/* Action row */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onRate(rec.id, "up")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] transition-all"
            style={
              rating === "up"
                ? { background: "rgba(20,245,208,0.15)", border: "1px solid rgba(20,245,208,0.35)", color: "#14F5D0" }
                : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.35)" }
            }
          >
            <ThumbsUp style={{ width: 13, height: 13 }} />
            Like
          </button>
          <button
            onClick={() => onRate(rec.id, "down")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] transition-all"
            style={
              rating === "down"
                ? { background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.35)", color: "#F87171" }
                : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.35)" }
            }
          >
            <ThumbsDown style={{ width: 13, height: 13 }} />
            Skip
          </button>
          <div className="flex-1" />
          <button
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl text-[11px] transition-colors hover:opacity-80"
            style={{ background: "rgba(29,185,84,0.12)", border: "1px solid rgba(29,185,84,0.25)", color: "#1DB954" }}
          >
            <ExternalLink style={{ width: 11, height: 11 }} />
            Spotify
          </button>
          <button
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl text-[11px] transition-colors hover:opacity-80"
            style={{ background: "rgba(252,90,90,0.12)", border: "1px solid rgba(252,90,90,0.25)", color: "#FC5A5A" }}
          >
            <ExternalLink style={{ width: 11, height: 11 }} />
            Apple
          </button>
        </div>
      </div>
    </div>
  );
}
