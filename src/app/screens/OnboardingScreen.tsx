import { Music2, Sparkles, Zap } from "lucide-react";

function WaveformViz() {
  const heights = [4, 8, 14, 22, 30, 40, 52, 60, 56, 48, 62, 54, 44, 34, 24, 16, 8, 12, 20, 32, 46, 58, 50, 38, 28, 18, 10, 6, 14, 26, 40, 54, 48, 36, 26, 16, 10, 6, 4, 8];
  return (
    <div className="flex items-center gap-0.5">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-1.5 rounded-full"
          style={{
            height: h,
            background: h > 45
              ? "linear-gradient(to top, #A855F7, #14F5D0)"
              : "linear-gradient(to top, #6D28D9, #A855F7)",
            opacity: 0.25 + (h / 62) * 0.75,
          }}
        />
      ))}
    </div>
  );
}

export function OnboardingScreen({ onSync, onManual }: { onSync: () => void; onManual: () => void }) {
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.18) 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-40 left-0 w-48 h-48 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(20,245,208,0.07) 0%, transparent 65%)" }}
      />

      <div className="relative flex flex-col flex-1 px-7 pt-8 pb-10">
        {/* Brand */}
        <div>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #A855F7 0%, #6D28D9 100%)",
              boxShadow: "0 0 32px rgba(168,85,247,0.45), 0 0 64px rgba(168,85,247,0.15)",
            }}
          >
            <Zap className="w-7 h-7 text-white" />
          </div>
          <h1
            className="text-[52px] text-white leading-none mb-3 tracking-tight"
            style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700 }}
          >
            SONG<br />REFRESH
          </h1>
          <p className="text-white/40 text-sm leading-relaxed">
            AI-powered music discovery.<br />Your listening DNA, amplified.
          </p>
        </div>

        {/* Waveform */}
        <div className="flex-1 flex items-center justify-center py-4">
          <WaveformViz />
        </div>

        {/* Feature chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["RAG Recommendations", "Sonic DNA Profiling", "Live Scoring"].map((f) => (
            <span
              key={f}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] text-white/40"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Sparkles className="w-2.5 h-2.5 text-purple-400" />
              {f}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <button
            onClick={onSync}
            className="w-full flex items-center justify-center gap-2.5 py-[15px] rounded-2xl text-[15px] font-semibold text-black transition-opacity hover:opacity-90 active:scale-[0.98] transition-transform"
            style={{ background: "#1DB954" }}
          >
            <Music2 className="w-4 h-4" />
            Sync Spotify History
          </button>
          <button
            onClick={onSync}
            className="w-full flex items-center justify-center gap-2.5 py-[15px] rounded-2xl text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            Sync Apple Music
          </button>
          <button
            onClick={onManual}
            className="w-full py-2 text-[13px] text-white/30 hover:text-white/55 transition-colors text-center"
          >
            Pick songs manually →
          </button>
        </div>
      </div>
    </div>
  );
}
