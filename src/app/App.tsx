import { useEffect, useRef, useState } from "react";
import { MobileShell } from "./components/MobileShell";
import { BottomNav } from "./components/BottomNav";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { SeedScreen } from "./screens/SeedScreen";
import { ModeSelectScreen } from "./screens/ModeSelectScreen";
import { DiscoveryScreen } from "./screens/DiscoveryScreen";
import { VibeScreen } from "./screens/VibeScreen";
import { FriendsScreen } from "./screens/FriendsScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { RECS, SEEDS } from "./data";
import type { Mode, Rating, Screen } from "./types";

export default function App() {
  const [screen, setScreen] = useState<Screen>("onboarding");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [ratings, setRatings] = useState<Record<string, Rating>>({});
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("ai");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;

    const onEnded = () => setPlayingId(null);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.pause();
    };
  }, []);

  // React to playingId changes: play / pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingId) {
      const rec = RECS.find((r) => r.id === playingId);
      if (!rec || !rec.snippet) return;

      const targetUrl = new URL(rec.snippet, window.location.href).toString();
      if (audio.src !== targetUrl) {
        audio.src = rec.snippet;
      }
      audio.currentTime = 0;
      audio.volume = 0.4;
      audio.play().catch(() => {
        // Snippet missing or autoplay blocked — silently ignore.
      });
    } else if (!audio.paused) {
      audio.pause();
    }
  }, [playingId]);

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

  const pickMode = (m: Mode) => {
    setMode(m);
    setScreen("discovery");
  };

  const reset = () => {
    setSelected(new Set());
    setQuery("");
    setRatings({});
    setPlayingId(null);
    setMode("ai");
    setScreen("onboarding");
  };

  const filteredSeeds = SEEDS.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.artist.toLowerCase().includes(query.toLowerCase())
  );

  if (screen === "onboarding") {
    return (
      <MobileShell>
        <OnboardingScreen onSync={() => setScreen("mode")} onManual={() => setScreen("seed")} />
      </MobileShell>
    );
  }

  if (screen === "seed") {
    return (
      <MobileShell onReset={reset}>
        <SeedScreen
          songs={filteredSeeds}
          selected={selected}
          query={query}
          onQuery={setQuery}
          onToggle={toggleSong}
          onDone={() => setScreen("mode")}
        />
      </MobileShell>
    );
  }

  if (screen === "mode") {
    return (
      <MobileShell onReset={reset}>
        <ModeSelectScreen onPick={pickMode} />
      </MobileShell>
    );
  }

  return (
    <MobileShell onReset={reset}>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          {screen === "discovery" && (
            <DiscoveryScreen
              recs={RECS}
              ratings={ratings}
              playingId={playingId}
              mode={mode}
              onRate={rate}
              onPlay={togglePlay}
              onModeChange={setMode}
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
