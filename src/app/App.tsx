import { useState } from "react";
import { MobileShell } from "./components/MobileShell";
import { BottomNav } from "./components/BottomNav";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { SeedScreen } from "./screens/SeedScreen";
import { DiscoveryScreen } from "./screens/DiscoveryScreen";
import { VibeScreen } from "./screens/VibeScreen";
import { FriendsScreen } from "./screens/FriendsScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { RECS, SEEDS } from "./data";
import type { Rating, Screen } from "./types";

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
