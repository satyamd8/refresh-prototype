import { Sparkles, BarChart2, Users, Settings } from "lucide-react";
import type { Screen } from "../types";

export function BottomNav({ screen, onNav }: { screen: Screen; onNav: (s: Screen) => void }) {
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
