import { TrendingUp } from "lucide-react";
import { useState } from "react";
import type { Post } from "../data";

type PostsSectionProps = {
  posts: Post[];
  likedPosts: number[];
  toggleLike: (postId: number) => void;
  onSelectPost: (post: Post) => void;
};

export default function PostsSection({
  posts,
  likedPosts,
  toggleLike,
  onSelectPost,
}: PostsSectionProps) {
  const [search, setSearch] = useState("");

  const visiblePosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="posts-section">
      <div className="posts-heading">
        <div>
          <h2 className="section-title">Recent posts</h2>
          <p className="section-description">
            Design inspiration and creative work
          </p>
        </div>

        <label className="search-field">
          <span className="sr-only">Search posts</span>
          <input
            type="search"
            placeholder="Search posts..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </div>

      {visiblePosts.length > 0 ? (
        <div className="posts-grid">
          {visiblePosts.map((post) => {
            const isLiked = likedPosts.includes(post.id);

            return (
              <article className="post-card" key={post.id}>
                <button
                  type="button"
                  className="post-image-button"
                  onClick={() => onSelectPost(post)}
                  aria-label={`View ${post.title}`}
                >
                  <img
                    className="post-image"
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                  />
                </button>

                <div className="post-info">
                  <button
                    className="post-title"
                    type="button"
                    onClick={() => onSelectPost(post)}
                  >
                    {post.title}
                  </button>

                  <div className="post-meta">
                    <span>{post.date}</span>

                    <button
                      type="button"
                      className={`like-button ${isLiked ? "like-active" : ""}`}
                      aria-pressed={isLiked}
                      onClick={() => toggleLike(post.id)}
                    >
                      <TrendingUp size={15} />
                      {post.likes + Number(isLiked)}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <p>No posts match your search.</p>
          <button
            className="button button-outline"
            type="button"
            onClick={() => setSearch("")}
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  );
}
