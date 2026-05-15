import {
  Settings,
  User,
  Bell,
  Shield,
  Music2,
  ExternalLink,
  Sparkles,
  Activity,
  Zap,
  ChevronRight,
} from "lucide-react";

export function SettingsScreen() {
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
