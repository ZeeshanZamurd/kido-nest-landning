export type VideoKind = "video" | "short";

export type CatalogVideo = {
  id: string;
  title: string;
  channel: string;
  category: string;
  language: string;
  duration: string;
  kind: VideoKind;
  views: string;
  hue: string;
};

export const categories = [
  "Stories",
  "Science",
  "Math",
  "Nature",
  "Art",
  "Music",
  "Coding",
] as const;

export const languages = ["English", "Urdu", "Spanish"] as const;

export const catalog: CatalogVideo[] = [
  {
    id: "moon-story",
    title: "The Moon Who Lost Her Glow",
    channel: "Nest Stories",
    category: "Stories",
    language: "English",
    duration: "8:12",
    kind: "video",
    views: "12K",
    hue: "from-violet-500 to-fuchsia-400",
  },
  {
    id: "kind-fox",
    title: "The Kind Fox and the Rain",
    channel: "Nest Stories",
    category: "Stories",
    language: "Urdu",
    duration: "6:40",
    kind: "video",
    views: "9.1K",
    hue: "from-orange-400 to-rose-400",
  },
  {
    id: "volcano",
    title: "Why Do Volcanoes Erupt?",
    channel: "Little Lab",
    category: "Science",
    language: "English",
    duration: "7:05",
    kind: "video",
    views: "21K",
    hue: "from-red-400 to-amber-300",
  },
  {
    id: "water-cycle",
    title: "The Water Cycle in One Song",
    channel: "Little Lab",
    category: "Science",
    language: "Spanish",
    duration: "4:18",
    kind: "video",
    views: "15K",
    hue: "from-sky-400 to-cyan-300",
  },
  {
    id: "fractions",
    title: "Fractions with Pizza Slices",
    channel: "Count Nest",
    category: "Math",
    language: "English",
    duration: "5:22",
    kind: "video",
    views: "18K",
    hue: "from-amber-400 to-yellow-300",
  },
  {
    id: "shapes",
    title: "Shapes Hiding in the House",
    channel: "Count Nest",
    category: "Math",
    language: "Urdu",
    duration: "3:55",
    kind: "video",
    views: "7.4K",
    hue: "from-lime-400 to-emerald-300",
  },
  {
    id: "rainforest",
    title: "A Walk Through the Rainforest",
    channel: "Wild Nest",
    category: "Nature",
    language: "English",
    duration: "9:01",
    kind: "video",
    views: "11K",
    hue: "from-emerald-500 to-lime-300",
  },
  {
    id: "oceans",
    title: "Who Lives in the Deep Ocean?",
    channel: "Wild Nest",
    category: "Nature",
    language: "Spanish",
    duration: "6:12",
    kind: "video",
    views: "8.8K",
    hue: "from-blue-500 to-cyan-300",
  },
  {
    id: "paint",
    title: "Mix Colors Like a Painter",
    channel: "Color Nest",
    category: "Art",
    language: "English",
    duration: "5:48",
    kind: "video",
    views: "6.2K",
    hue: "from-pink-400 to-violet-400",
  },
  {
    id: "drums",
    title: "Make a Beat with Kitchen Drums",
    channel: "Melody Nest",
    category: "Music",
    language: "English",
    duration: "4:02",
    kind: "video",
    views: "10K",
    hue: "from-fuchsia-500 to-orange-300",
  },
  {
    id: "loops",
    title: "Loops: Tell the Robot Again",
    channel: "Code Cub",
    category: "Coding",
    language: "English",
    duration: "7:33",
    kind: "video",
    views: "5.6K",
    hue: "from-indigo-500 to-sky-400",
  },
  {
    id: "short-stars",
    title: "Count the Stars",
    channel: "Nest Shorts",
    category: "Science",
    language: "English",
    duration: "0:28",
    kind: "short",
    views: "40K",
    hue: "from-slate-700 to-indigo-400",
  },
  {
    id: "short-birds",
    title: "Bird Calls in 20 Seconds",
    channel: "Nest Shorts",
    category: "Nature",
    language: "Urdu",
    duration: "0:21",
    kind: "short",
    views: "22K",
    hue: "from-teal-500 to-emerald-300",
  },
  {
    id: "short-song",
    title: "Clap the Rhythm",
    channel: "Nest Shorts",
    category: "Music",
    language: "Spanish",
    duration: "0:34",
    kind: "short",
    views: "31K",
    hue: "from-rose-400 to-amber-300",
  },
];

export const parentTools = [
  {
    id: "child",
    title: "Register a child",
    detail: "Create a profile so each kid only sees videos you assign.",
  },
  {
    id: "approve",
    title: "Approve videos",
    detail: "Nothing plays until a parent allows it.",
  },
  {
    id: "time",
    title: "Screen time",
    detail: "Set a daily limit and pause a profile from here.",
  },
  {
    id: "interests",
    title: "Interests",
    detail: "Stories, science, art, music, and more — you pick the mix.",
  },
] as const;
