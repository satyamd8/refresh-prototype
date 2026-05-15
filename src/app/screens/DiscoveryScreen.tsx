import { Sparkles } from "lucide-react";
import type { Rating, Rec } from "../types";
import { SongCard } from "./SongCard";

export function DiscoveryScreen({
  recs,
  ratings,
  playingId,
  onRate,
  onPlay,
}: {
  recs: Rec[];
  ratings: Record<string, Rating>;
  playingId: string | null;
  onRate: (id: string, r: Rating) => void;
  onPlay: (id: string) => void;
}) {
  return (
    <div className="h-full overflow-y-auto">
      {/* Sticky header */}
      <div
        className="sticky top-0 z-10 px-6 pt-4 pb-4 flex items-center justify-between"
        style={{ background: "rgba(10,10,12,0.9)", backdropFilter: "blur(16px)" }}
      >
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span className="text-[10px] text-purple-400 uppercase tracking-[0.14em]">AI Curated</span>
          </div>
          <h2
            className="text-[26px] text-white leading-none"
            style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700 }}
          >
            FOR YOU
          </h2>
        </div>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold text-white"
          style={{
            background: "linear-gradient(135deg, #A855F7, #14F5D0)",
            fontFamily: "Oswald, sans-serif",
          }}
        >
          JD
        </div>
      </div>

      {/* Cards */}
      <div className="px-4 pb-6 space-y-4">
        {recs.map((rec) => (
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
    </div>
  );
}
