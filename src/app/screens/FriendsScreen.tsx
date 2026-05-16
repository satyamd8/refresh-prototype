import { useState } from "react";
import { Users, Plus, Check, Sparkles } from "lucide-react";
import { SUGGESTED_PLAYLISTS } from "../data";

export function FriendsScreen() {
  const [added, setAdded] = useState<Set<string>>(new Set());
  const toggleAdd = (id: string) =>
    setAdded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const friends = [
    { initials: "NM", name: "Nadia Marin", track: "Espresso — Sabrina Carpenter", time: "2m ago", color: "#A855F7" },
    { initials: "YG", name: "Yusuf Giles", track: "NOKIA — Drake", time: "8m ago", color: "#14F5D0" },
    { initials: "RJ", name: "Ryan Jo", track: "Human Nature — Michael Jackson", time: "15m ago", color: "#6366F1" },
    { initials: "KK", name: "Kynlee Kim", track: "Murder on the Dancefloor — Sophie E-P", time: "32m ago", color: "#EC4899" },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-6 pt-4 pb-5">
        <div className="flex items-center gap-1.5 mb-1">
          <Users className="w-3 h-3 text-purple-400" />
          <span className="text-[10px] text-purple-400 uppercase tracking-[0.14em]">Social</span>
        </div>
        <h2
          className="text-[26px] text-white leading-none"
          style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700 }}
        >
          FRIENDS
        </h2>
      </div>

      {/* Now playing */}
      <div className="px-6 mb-5">
        <p className="text-[10px] text-white/25 uppercase tracking-widest mb-3">Now Playing</p>
        <div className="space-y-2">
          {friends.map((f) => (
            <div
              key={f.name}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: "#131316", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
                style={{
                  background: `${f.color}22`,
                  border: `1.5px solid ${f.color}55`,
                  fontFamily: "Oswald, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {f.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-[13px] font-medium">{f.name}</div>
                <div className="text-white/30 text-[11px] truncate">{f.track}</div>
              </div>
              <span className="text-[10px] text-white/20 flex-shrink-0">{f.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested playlists */}
      <div className="px-6 pb-8">
        <div className="mb-3">
          <p className="text-[10px] text-white/25 uppercase tracking-widest mb-1.5">
            Suggested Playlists
          </p>
          <div className="flex items-start gap-1.5">
            <Sparkles className="w-3 h-3 text-purple-400/80 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-white/45 leading-snug">
              AI-curated by Refresh from each friend's listening DNA — tap + to save to your library.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {SUGGESTED_PLAYLISTS.map((p) => {
            const isAdded = added.has(p.id);
            return (
              <div
                key={p.id}
                className="rounded-xl overflow-hidden transition-all"
                style={{ background: "#131316", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="aspect-square relative">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    style={{ background: "#1A1020" }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }}
                  />
                  <button
                    onClick={() => toggleAdd(p.id)}
                    aria-label={isAdded ? "Remove from library" : "Add to library"}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                    style={
                      isAdded
                        ? {
                            background: "rgba(20,245,208,0.92)",
                            border: "1px solid rgba(20,245,208,1)",
                            boxShadow: "0 0 12px rgba(20,245,208,0.5)",
                          }
                        : {
                            background: "rgba(0,0,0,0.55)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            backdropFilter: "blur(4px)",
                          }
                    }
                  >
                    {isAdded ? (
                      <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-white" />
                    )}
                  </button>
                  <span className="absolute bottom-2 left-3 text-[10px] text-white/85 font-mono tabular-nums">
                    {p.tracks} tracks
                  </span>
                </div>
                <div className="p-3">
                  <div className="text-white text-[13px] font-medium truncate">{p.title}</div>
                  <div className="text-white/35 text-[11px] mt-0.5 truncate">For {p.by}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
