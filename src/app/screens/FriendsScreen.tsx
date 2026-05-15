import { Users, Sparkles } from "lucide-react";

export function FriendsScreen() {
  const friends = [
    { initials: "AL", name: "Alex Liu", track: "Espresso — Sabrina Carpenter", time: "2m ago", color: "#A855F7" },
    { initials: "MK", name: "Maya Kwan", track: "Greedy — Tate McRae", time: "8m ago", color: "#14F5D0" },
    { initials: "RJ", name: "Ryan Jo", track: "Cruel Summer — Taylor Swift", time: "15m ago", color: "#6366F1" },
    { initials: "SP", name: "Sam Park", track: "Murder on the Dancefloor — Sophie E-P", time: "32m ago", color: "#EC4899" },
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

      {/* Coming soon */}
      <div
        className="mx-6 rounded-2xl p-6 text-center"
        style={{ background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.12)" }}
      >
        <Sparkles className="w-7 h-7 mx-auto mb-3" style={{ color: "rgba(168,85,247,0.45)" }} />
        <h3 className="text-white/55 text-sm font-semibold mb-1.5">Social Features Coming Soon</h3>
        <p className="text-white/25 text-xs leading-relaxed">
          Share playlists, compare listening DNA, and discover music through your network.
        </p>
      </div>
    </div>
  );
}
