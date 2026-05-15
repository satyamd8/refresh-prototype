import type { Rec, SeedSong } from "./types";

export const SEEDS: SeedSong[] = [
  { id: "s1", title: "Feel No Ways", artist: "Drake", img: "https://lastfm.freetls.fastly.net/i/u/675aedda266d84d3fdcb008326bc3b10" },
  { id: "s2", title: "Attracted to You", artist: "PinkPantheress", img: "https://lastfm.freetls.fastly.net/i/u/11695ed0b453ddae38418e45d5441470" },
  { id: "s3", title: "Jungle", artist: "Drake", img: "https://lastfm.freetls.fastly.net/i/u/f4cf524e4b46f72ebe75bbf1e0873b42" },
  { id: "s4", title: "Television / So Far So Good", artist: "Rex Orange County", img: "https://lastfm.freetls.fastly.net/i/u/c869ac799047020ad305d589f44bbe75" },
  { id: "s5", title: "Helmet", artist: "Steve Lacy", img: "https://lastfm.freetls.fastly.net/i/u/12dcf1122cccf14bd8d943480d04cd58" },
  { id: "s6", title: "Noises", artist: "PinkPantheress", img: "https://lastfm.freetls.fastly.net/i/u/5edfc17276a2c1f445f41faf2c9da1be" },
  { id: "s7", title: "Ultralight Beam", artist: "Kanye West", img: "https://lastfm.freetls.fastly.net/i/u/8c6af1315c66631bad022085c7992b34" },
  { id: "s8", title: "3005", artist: "Childish Gambino", img: "https://lastfm.freetls.fastly.net/i/u/0f636525495f1458c7c55f238eb8e27d" },
  { id: "s9", title: "Company", artist: "Drake", img: "https://lastfm.freetls.fastly.net/i/u/f4cf524e4b46f72ebe75bbf1e0873b42" },
  { id: "s10", title: "Take me home", artist: "PinkPantheress", img: "https://lastfm.freetls.fastly.net/i/u/67dfb2d6147fad4604054ae48d44ab88" },
  { id: "s11", title: "Pray 4 Love (feat. The Weeknd)", artist: "Travis Scott", img: "https://lastfm.freetls.fastly.net/i/u/29f1a6ef4c129b3a4ddbdd34d4e757d0" },
  { id: "s12", title: "L.E.S.", artist: "Childish Gambino", img: "https://lastfm.freetls.fastly.net/i/u/d2c51831aa2b59b93c7e56b29efbbcf6" },
  { id: "s13", title: "Close to You", artist: "Frank Ocean", img: "https://lastfm.freetls.fastly.net/i/u/82c92f044b27db86328ed6be3f8a735a" },
  { id: "s14", title: "In the Night", artist: "The Weeknd", img: "https://lastfm.freetls.fastly.net/i/u/9ea87cbc2865f38105cc1aecc49bfa82" },
  { id: "s15", title: "Sunshine (feat. Fousheé)", artist: "Steve Lacy", img: "https://lastfm.freetls.fastly.net/i/u/12dcf1122cccf14bd8d943480d04cd58" },
];

export const RECS: Rec[] = [
  {
    id: "r1",
    title: "Gravity (feat. Tyler, The Creator)",
    artist: "Brent Faiyaz",
    album: "WASTELAND",
    img: "https://4kwallpapers.com/images/walls/thumbs_3t/13794.png",
    matchPct: 95,
    why: "You love smooth R&B and creative collaborations, and this track blends both.",
    tags: ["R&B", "Collab"],
    bpm: 120,
  },
  {
    id: "r2",
    title: "Pink + White",
    artist: "Frank Ocean",
    album: "Blonde",
    img: "https://i.redd.it/1r0pklck1vpy.png",
    matchPct: 92,
    why: "Dreamy production and emotional vocals match your taste for genre-blending and introspective music.",
    tags: ["R&B", "Alt"],
    bpm: 135,
  },
  {
    id: "r3",
    title: "Boredom (feat. Rex Orange County & Anna of the North)",
    artist: "Tyler, The Creator",
    album: "Flower Boy",
    img: "https://preview.redd.it/i-widened-the-flower-boy-album-cover-for-pc-wallpaper-v0-2osyg6q62o8e1.png?auto=webp&s=8da6f55e897db22fbe6d5a415dacc2fc1ac69d51",
    matchPct: 90,
    why: "You enjoy alternative hip-hop and unique features, and this track is a perfect fit.",
    tags: ["Hip-Hop", "Alternative"],
    bpm: 80,
  },
  {
    id: "r4",
    title: "Instant Crush (feat. Julian Casablancas)",
    artist: "Daft Punk",
    album: "Random Access Memories",
    img: "https://img1.wallspic.com/previews/6/0/4/6/5/156406/156406-daft_punk-random_access_memories-get_lucky-disco-metal-x350.jpg",
    matchPct: 88,
    why: "Synth-driven pop and strong vocal hooks are a staple in your listening.",
    tags: ["Pop", "Synth"],
    bpm: 110,
  },
];

export const RADAR_DATA = [
  { attr: "Tempo", v: 82 },
  { attr: "Valence", v: 60 },
  { attr: "Energy", v: 77 },
  { attr: "Dance", v: 68 },
  { attr: "Acoustic", v: 32 },
  { attr: "Live", v: 38 },
];

export const ATTRS = [
  { label: "Tempo", value: 82, color: "#A855F7" },
  { label: "Valence", value: 60, color: "#A855F7" },
  { label: "Energy", value: 77, color: "#14F5D0" },
  { label: "Danceability", value: 68, color: "#14F5D0" },
  { label: "Acousticness", value: 32, color: "#6366F1" },
  { label: "Liveness", value: 38, color: "#6366F1" },
];
