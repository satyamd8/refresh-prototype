export type Screen = "onboarding" | "seed" | "mode" | "discovery" | "vibe" | "friends" | "settings";
export type Rating = "up" | "down" | null;
export type Mode = "ai" | "normal";

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
  genre: string;
  length: string;
  snippet?: string;
}
