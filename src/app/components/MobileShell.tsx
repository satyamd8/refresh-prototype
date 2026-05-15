import type React from "react";

export function MobileShell({ children }: { children: React.ReactNode }) {
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
