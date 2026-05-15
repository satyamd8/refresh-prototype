export type Screen = "onboarding" | "seed" | "discovery" | "vibe" | "friends" | "settings";
export type Rating = "up" | "down" | null;

export interface SeedSong {
  id: string;
  title: string;
  artist: string;
  img: string;
}

export interface Rec {
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
