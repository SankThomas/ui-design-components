export type Tab = "Posts" | "Albums" | "Stats";

export type PhotoFilter = "All photos" | "Photos" | "Videos";

export type SortOption = "Following" | "Popularity" | "New";

export type Profile = {
  name: string;
  title: string;
  location: string;
  handle: string;
  website: string;
  avatar: string;
};

export type Post = {
  id: number;
  title: string;
  image: string;
  likes: number;
  date: string;
  type: "photo" | "video";
};

export const initialProfile: Profile = {
  name: "Ildiko Gaspar",
  title: "UX Designer and Chemist of Aesthetics",
  location: "Bergen, Norway",
  handle: "uidesigndaily",
  website: "uidesigndaily.com",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces",
};

export const initialPosts: Post[] = [
  {
    id: 1,
    title: "Minimal dashboard exploration",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=700&fit=crop",
    likes: 248,
    date: "2026-10-25",
    type: "photo",
  },
  {
    id: 2,
    title: "Color and typography study",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&h=700&fit=crop",
    likes: 184,
    date: "2026-10-22",
    type: "photo",
  },
  {
    id: 3,
    title: "Workspace inspiration",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=700&fit=crop",
    likes: 312,
    date: "2026-10-19",
    type: "photo",
  },
  {
    id: 4,
    title: "Creative studio",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&h=700&fit=crop",
    likes: 126,
    date: "2026-10-14",
    type: "photo",
  },
  {
    id: 5,
    title: "Interface design inspiration",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900&h=700&fit=crop",
    likes: 207,
    date: "2026-10-10",
    type: "photo",
  },
  {
    id: 6,
    title: "Designing better experiences",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&h=700&fit=crop",
    likes: 96,
    date: "2026-10-04",
    type: "photo",
  },
];

export const albums = [
  {
    title: "UI Inspiration",
    count: "12 photos",
    image: initialPosts[0].image,
  },
  {
    title: "Creative Workspace",
    count: "8 photos",
    image: initialPosts[2].image,
  },
  {
    title: "Design Studies",
    count: "16 photos",
    image: initialPosts[4].image,
  },
];
