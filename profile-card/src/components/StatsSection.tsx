import { Image, TrendingUp, Users } from "lucide-react";
import type { Post } from "../data";

type StatsSectionProps = {
  posts: Post[];
  likedPosts: number[];
};

export default function StatsSection({ posts, likedPosts }: StatsSectionProps) {
  const totalLikes =
    posts.reduce((total, post) => total + post.likes, 0) +
    likedPosts.filter((id) => posts.some((post) => post.id === id)).length;

  const stats = [
    {
      label: "Followers",
      value: "2,480",
      icon: Users,
    },
    {
      label: "Posts",
      value: posts.length.toString(),
      icon: Image,
    },
    {
      label: "Total likes",
      value: totalLikes.toLocaleString(),
      icon: TrendingUp,
    },
  ];

  return (
    <section className="posts-section">
      <div className="posts-heading">
        <div>
          <h2 className="section-title">Profile statistics</h2>
          <p className="section-description">An overview of profile activity</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map(({ label, value, icon: Icon }) => (
          <article className="stat-card" key={label}>
            <Icon size={20} />
            <p className="stat-label">{label}</p>
            <p className="stat-value">{value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
