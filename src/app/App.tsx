import { useState } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Play,
  Pause,
  ThumbsUp,
  ThumbsDown,
  Music2,
  BarChart2,
  Users,
  Settings,
  Search,
  Sparkles,
  Zap,
  ChevronRight,
  X,
  User,
  Bell,
  Shield,
  ExternalLink,
  Check,
  Activity,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = "onboarding" | "seed" | "discovery" | "vibe" | "friends" | "settings";
type Rating = "up" | "down" | null;

interface SeedSong {
  id: string;
  title: string;
  artist: string;
  img: string;
}

interface Rec {
  id: string;
  title: string;
  artist: string;
  album: string;
  img: string;
  matchPct: number;
  why: string;
  tags: string[];
  bpm: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SEEDS: SeedSong[] = [
  { id: "s1", title: "Blinding Lights", artist: "The Weeknd", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop" },
  { id: "s2", title: "Levitating", artist: "Dua Lipa", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=80&h=80&fit=crop" },
  { id: "s3", title: "Heat Waves", artist: "Glass Animals", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=80&h=80&fit=crop" },
  { id: "s4", title: "Good 4 U", artist: "Olivia Rodrigo", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=80&h=80&fit=crop" },
  { id: "s5", title: "Save Your Tears", artist: "The Weeknd", img: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=80&h=80&fit=crop" },
  { id: "s6", title: "As It Was", artist: "Harry Styles", img: "https://images.unsplash.com/photo-1462965326201-d02e4f455804?w=80&h=80&fit=crop" },
  { id: "s7", title: "Industry Baby", artist: "Lil Nas X", img: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=80&h=80&fit=crop" },
  { id: "s8", title: "Stay", artist: "The Kid LAROI", img: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=80&h=80&fit=crop" },
  { id: "s9", title: "About Damn Time", artist: "Lizzo", img: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=80&h=80&fit=crop" },
  { id: "s10", title: "Bad Habit", artist: "Steve Lacy", img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=80&h=80&fit=crop" },
  { id: "s11", title: "Anti-Hero", artist: "Taylor Swift", img: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=80&h=80&fit=crop" },
  { id: "s12", title: "Escapism.", artist: "RAYE", img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=80&h=80&fit=crop" },
  { id: "s13", title: "Flowers", artist: "Miley Cyrus", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop" },
  { id: "s14", title: "Vampire", artist: "Olivia Rodrigo", img: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=80&h=80&fit=crop" },
  { id: "s15", title: "Rush", artist: "Troye Sivan", img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c5b?w=80&h=80&fit=crop" },
];

const RECS: Rec[] = [
  {
    id: "r1",
    title: "Midnight Rain",
    artist: "Taylor Swift",
    album: "Midnights",
    img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c5b?w=400&h=400&fit=crop",
    matchPct: 94,
    why: "Matches your high-tempo evening vibe — melancholic undertones align with late-night listening patterns and your elevated valence preference.",
    tags: ["Synth-pop", "Alt-pop"],
    bpm: 124,
  },
  {
    id: "r2",
    title: "Escapism.",
    artist: "RAYE ft. 070 Shake",
    album: "My 21st Century Blues",
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    matchPct: 91,
    why: "Emotional range score and genre-fluid taste match this raw R&B-meets-electronic crossover. Danceability correlation: 0.84.",
    tags: ["R&B", "Electronic"],
    bpm: 118,
  },
  {
    id: "r3",
    title: "Rush",
    artist: "Troye Sivan",
    album: "Something to Give Each Other",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
    matchPct: 87,
    why: "High BPM and euphoric production match your workout-mode playlists. Valence 0.82 mirrors your peak-energy listening windows.",
    tags: ["Dance-pop", "House"],
    bpm: 132,
  },
  {
    id: "r4",
    title: "Vampire",
    artist: "Olivia Rodrigo",
    album: "GUTS",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
    matchPct: 85,
    why: "Emotional arc and lyricism closely mirror your SOUR-era listening. Pop-rock and piano-ballad crossover fits your genre profile.",
    tags: ["Pop-rock", "Indie"],
    bpm: 104,
  },
];

const RADAR_DATA = [
  { attr: "Tempo", v: 78 },
  { attr: "Valence", v: 65 },
  { attr: "Energy", v: 84 },
  { attr: "Dance", v: 72 },
  { attr: "Acoustic", v: 28 },
  { attr: "Live", v: 41 },
];

const ATTRS = [
  { label: "Tempo", value: 78, color: "#A855F7" },
  { label: "Valence", value: 65, color: "#A855F7" },
  { label: "Energy", value: 84, color: "#14F5D0" },
  { label: "Danceability", value: 72, color: "#14F5D0" },
  { label: "Acousticness", value: 28, color: "#6366F1" },
  { label: "Liveness", value: 41, color: "#6366F1" },
];

// ─── MobileShell ─────────────────────────────────────────────────────────────

function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-0 md:p-8">
      <div
        className="relative w-full max-w-[390px] bg-[#0A0A0C] flex flex-col overflow-hidden md:rounded-[44px]"
        style={{
          height: "100dvh",
          maxHeight: "844px",
          boxShadow: "0 40px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Ambient purple glow at top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.14) 0%, transparent 70%)" }}
        />
        {/* Status bar */}
        <div className="relative flex items-center justify-between px-7 pt-5 pb-1 flex-shrink-0">
          <span className="text-[11px] text-white/40 font-mono">9:41</span>
          <div className="flex items-center gap-2">
            <div className="flex gap-[2px] items-end h-3">
              {[3, 5, 7, 9, 11].map((h, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-[1px]"
                  style={{
                    height: h,
                    background: i < 4 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>
            <div className="w-5 h-3 rounded-[3px] border border-white/25 relative flex items-center pl-0.5">
              <div className="h-1.5 w-3 rounded-[1px] bg-white/50" />
              <div
                className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[3px] h-1.5 rounded-r-sm"
                style={{ background: "rgba(255,255,255,0.25)" }}
              />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── WaveformViz ──────────────────────────────────────────────────────────────

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

// ─── OnboardingScreen ────────────────────────────────────────────────────────

function OnboardingScreen({ onSync, onManual }: { onSync: () => void; onManual: () => void }) {
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

// ─── SeedScreen ───────────────────────────────────────────────────────────────

function SeedScreen({
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

// ─── SongCard ─────────────────────────────────────────────────────────────────

function SongCard({
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

// ─── DiscoveryScreen ──────────────────────────────────────────────────────────

function DiscoveryScreen({
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

// ─── VibeScreen ───────────────────────────────────────────────────────────────

function VibeScreen() {
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

// ─── FriendsScreen ────────────────────────────────────────────────────────────

function FriendsScreen() {
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

// ─── SettingsScreen ───────────────────────────────────────────────────────────

function SettingsScreen() {
  const sections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Profile", sub: "Jamie Doe" },
        { icon: Bell, label: "Notifications", sub: "All alerts on" },
        { icon: Shield, label: "Privacy & Data", sub: "Permissions & export" },
      ],
    },
    {
      title: "Integrations",
      items: [
        { icon: Music2, label: "Spotify", sub: "Connected · spotify:jdoe" },
        { icon: ExternalLink, label: "Apple Music", sub: "Not connected" },
      ],
    },
    {
      title: "AI & Discovery",
      items: [
        { icon: Sparkles, label: "AI Mode", sub: "RAG-enhanced · Active" },
        { icon: Activity, label: "Scoring Weights", sub: "Custom profile" },
        { icon: Zap, label: "Discovery Frequency", sub: "Daily refreshes" },
      ],
    },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-6 pt-4 pb-5">
        <div className="flex items-center gap-1.5 mb-1">
          <Settings className="w-3 h-3 text-white/30" />
          <span className="text-[10px] text-white/30 uppercase tracking-[0.14em]">Preferences</span>
        </div>
        <h2
          className="text-[26px] text-white leading-none"
          style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700 }}
        >
          SETTINGS
        </h2>
      </div>

      {/* Profile row */}
      <div
        className="mx-6 mb-5 p-4 rounded-2xl flex items-center gap-3"
        style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(20,245,208,0.05) 100%)",
          border: "1px solid rgba(168,85,247,0.22)",
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-base flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #A855F7, #14F5D0)", fontFamily: "Oswald, sans-serif" }}
        >
          JD
        </div>
        <div className="flex-1">
          <div className="text-white font-semibold text-[14px]">Jamie Doe</div>
          <div className="text-white/35 text-xs mt-0.5">Premium · 847 tracks analyzed</div>
        </div>
        <ChevronRight className="w-4 h-4 text-white/20" />
      </div>

      {/* Sections */}
      <div className="px-6 space-y-5 pb-8">
        {sections.map((sec) => (
          <div key={sec.title}>
            <p className="text-[10px] text-white/25 uppercase tracking-widest mb-2 px-1">{sec.title}</p>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "#131316", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              {sec.items.map((item, i) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/5"
                  style={i > 0 ? { borderTop: "1px solid rgba(255,255,255,0.04)" } : {}}
                >
                  <item.icon className="w-4 h-4 text-purple-400/70 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-white/75 text-[13px]">{item.label}</div>
                    <div className="text-white/25 text-[11px]">{item.sub}</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-white/15" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── BottomNav ────────────────────────────────────────────────────────────────

function BottomNav({ screen, onNav }: { screen: Screen; onNav: (s: Screen) => void }) {
  const tabs = [
    { id: "discovery" as Screen, icon: Sparkles, label: "Discover" },
    { id: "vibe" as Screen, icon: BarChart2, label: "My Vibe" },
    { id: "friends" as Screen, icon: Users, label: "Friends" },
    { id: "settings" as Screen, icon: Settings, label: "Settings" },
  ];

  return (
    <div
      className="flex-shrink-0 flex items-start px-2 pt-2 pb-7"
      style={{
        background: "rgba(10,10,12,0.95)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(24px)",
      }}
    >
      {tabs.map((t) => {
        const active = screen === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onNav(t.id)}
            className="flex-1 flex flex-col items-center gap-1 py-1 transition-all"
          >
            <div
              className="flex items-center justify-center rounded-xl transition-all"
              style={{
                width: 36,
                height: 36,
                background: active ? "rgba(168,85,247,0.18)" : "transparent",
              }}
            >
              <t.icon
                style={{
                  width: 18,
                  height: 18,
                  color: active ? "#C084FC" : "rgba(255,255,255,0.25)",
                }}
              />
            </div>
            <span
              className="text-[10px] transition-colors"
              style={{ color: active ? "#C084FC" : "rgba(255,255,255,0.22)" }}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("onboarding");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [ratings, setRatings] = useState<Record<string, Rating>>({});
  const [playingId, setPlayingId] = useState<string | null>(null);

  const toggleSong = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < 10) next.add(id);
      return next;
    });
  };

  const rate = (id: string, r: Rating) => {
    setRatings((prev) => ({ ...prev, [id]: prev[id] === r ? null : r }));
  };

  const togglePlay = (id: string) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  const filteredSeeds = SEEDS.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.artist.toLowerCase().includes(query.toLowerCase())
  );

  if (screen === "onboarding") {
    return (
      <MobileShell>
        <OnboardingScreen onSync={() => setScreen("discovery")} onManual={() => setScreen("seed")} />
      </MobileShell>
    );
  }

  if (screen === "seed") {
    return (
      <MobileShell>
        <SeedScreen
          songs={filteredSeeds}
          selected={selected}
          query={query}
          onQuery={setQuery}
          onToggle={toggleSong}
          onDone={() => setScreen("discovery")}
        />
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          {screen === "discovery" && (
            <DiscoveryScreen
              recs={RECS}
              ratings={ratings}
              playingId={playingId}
              onRate={rate}
              onPlay={togglePlay}
            />
          )}
          {screen === "vibe" && <VibeScreen />}
          {screen === "friends" && <FriendsScreen />}
          {screen === "settings" && <SettingsScreen />}
        </div>
        <BottomNav screen={screen} onNav={setScreen} />
      </div>
    </MobileShell>
  );
}
