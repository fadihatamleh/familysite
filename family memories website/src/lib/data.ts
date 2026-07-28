import { IMAGES } from "@/assets/images";

// ── Types ──────────────────────────────────────────────────────────────────
export interface Album {
  id: string;
  title: string;
  description: string;
  cover: string;
  photoCount: number;
  date: string;
  category: "vacation" | "celebration" | "holiday" | "everyday" | "milestone";
  photos: string[];
}

export interface FamilyEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  type: "birthday" | "anniversary" | "graduation" | "holiday" | "reunion" | "other";
}

export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

// ── Albums ─────────────────────────────────────────────────────────────────
export const albums: Album[] = [
  {
    id: "1",
    title: "Summer Vacation 2024",
    description: "Our amazing trip to the coast — sun, sand, and laughter.",
    cover: IMAGES.FAMILY_1,
    photoCount: 48,
    date: "July 2024",
    category: "vacation",
    photos: [IMAGES.FAMILY_1, IMAGES.FAMILY_5, IMAGES.FAMILY_9],
  },
  {
    id: "2",
    title: "Christmas Together",
    description: "Cozy evenings, warm lights, and everyone under one roof.",
    cover: IMAGES.FAMILY_6,
    photoCount: 62,
    date: "December 2024",
    category: "holiday",
    photos: [IMAGES.FAMILY_6, IMAGES.FAMILY_7, IMAGES.FAMILY_8],
  },
  {
    id: "3",
    title: "Family Portraits",
    description: "Professional portraits capturing the whole family.",
    cover: IMAGES.FAMILY_2,
    photoCount: 24,
    date: "March 2024",
    category: "milestone",
    photos: [IMAGES.FAMILY_2, IMAGES.FAMILY_4, IMAGES.FAMILY_10],
  },
  {
    id: "4",
    title: "Under the Stars",
    description: "Camping nights, stargazing, and backyard adventures.",
    cover: IMAGES.FAMILY_10,
    photoCount: 31,
    date: "August 2024",
    category: "everyday",
    photos: [IMAGES.FAMILY_10, IMAGES.FAMILY_9, IMAGES.FAMILY_5],
  },
  {
    id: "5",
    title: "Holiday Gatherings",
    description: "All the cousins, aunts, uncles — the full house!",
    cover: IMAGES.FAMILY_3,
    photoCount: 77,
    date: "November 2024",
    category: "celebration",
    photos: [IMAGES.FAMILY_3, IMAGES.FAMILY_6, IMAGES.FAMILY_7],
  },
  {
    id: "6",
    title: "Everyday Moments",
    description: "The small moments that matter most.",
    cover: IMAGES.FAMILY_5,
    photoCount: 94,
    date: "Ongoing",
    category: "everyday",
    photos: [IMAGES.FAMILY_5, IMAGES.FAMILY_9, IMAGES.FAMILY_2],
  },
];

// ── Events ─────────────────────────────────────────────────────────────────
export const events: FamilyEvent[] = [
  {
    id: "1",
    title: "Mom & Dad's 30th Anniversary",
    date: "February 14, 2025",
    description:
      "Three decades of love, partnership, and building this beautiful family. Surprise dinner with all the kids.",
    image: IMAGES.FAMILY_9,
    type: "anniversary",
  },
  {
    id: "2",
    title: "Emma's High School Graduation",
    date: "June 7, 2024",
    description:
      "Our eldest graduates with honors. So incredibly proud — the whole family came to cheer.",
    image: IMAGES.FAMILY_2,
    type: "graduation",
  },
  {
    id: "3",
    title: "Christmas Family Reunion",
    date: "December 25, 2024",
    description:
      "Every branch of the family tree back together for the first time in three years. Magical.",
    image: IMAGES.FAMILY_3,
    type: "holiday",
  },
  {
    id: "4",
    title: "Grandpa's 75th Birthday",
    date: "April 18, 2024",
    description:
      "A surprise party to celebrate 75 wonderful years. Grandpa's face said it all.",
    image: IMAGES.FAMILY_10,
    type: "birthday",
  },
  {
    id: "5",
    title: "Summer Beach Reunion",
    date: "July 22, 2024",
    description:
      "Five families, one beach house, and a whole week of unforgettable memories.",
    image: IMAGES.FAMILY_1,
    type: "reunion",
  },
];

// ── Family Members ─────────────────────────────────────────────────────────
export const familyMembers: FamilyMember[] = [
  {
    id: "1",
    name: "Robert & Mary",
    role: "Parents",
    avatar: IMAGES.FAMILY_9,
    bio: "The heart and soul of our family. Together for over 30 years.",
  },
  {
    id: "2",
    name: "Emma",
    role: "Eldest Daughter",
    avatar: IMAGES.FAMILY_2,
    bio: "Class of 2024, aspiring journalist, and the family photographer.",
  },
  {
    id: "3",
    name: "Jake",
    role: "Son",
    avatar: IMAGES.FAMILY_5,
    bio: "Sports enthusiast, future chef, and the family's best joke-teller.",
  },
  {
    id: "4",
    name: "Grandma & Grandpa",
    role: "Grandparents",
    avatar: IMAGES.FAMILY_10,
    bio: "The wise elders who started it all. 75 years young and counting.",
  },
];

// ── Category labels ────────────────────────────────────────────────────────
export const categoryColors: Record<Album["category"], string> = {
  vacation: "bg-sky-100 text-sky-700",
  celebration: "bg-accent/20 text-accent-foreground",
  holiday: "bg-primary/15 text-primary",
  everyday: "bg-secondary text-secondary-foreground",
  milestone: "bg-amber-100 text-amber-700",
};

export const eventTypeIcons: Record<FamilyEvent["type"], string> = {
  birthday: "🎂",
  anniversary: "💕",
  graduation: "🎓",
  holiday: "🎄",
  reunion: "🏡",
  other: "⭐",
};
