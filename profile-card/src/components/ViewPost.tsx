import { TrendingUp, X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { Post } from "../data";

type ViewPostProps = {
  selectedPost: Post;
  setSelectedPost: Dispatch<SetStateAction<Post | null>>;
  likedPosts: number[];
  toggleLike: (postId: number) => void;
};

export default function ViewPost({
  selectedPost,
  setSelectedPost,
  likedPosts,
  toggleLike,
}: ViewPostProps) {
  const isLiked = likedPosts.includes(selectedPost.id);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setSelectedPost(null);
        }
      }}
    >
      <section
        className="post-preview"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
      >
        <button
          type="button"
          className="preview-close"
          aria-label="Close post preview"
          onClick={() => setSelectedPost(null)}
        >
          <X size={19} />
        </button>

        <img src={selectedPost.image} alt={selectedPost.title} />

        <div className="preview-content">
          <h2 id="preview-title">{selectedPost.title}</h2>
          <p>{selectedPost.date}</p>

          <button
            className={`button ${
              isLiked ? "button-outline" : "button-primary"
            }`}
            type="button"
            aria-pressed={isLiked}
            onClick={() => toggleLike(selectedPost.id)}
          >
            <TrendingUp size={16} />
            {isLiked ? "Liked" : "Like"} ·{" "}
            {selectedPost.likes + Number(isLiked)}
          </button>
        </div>
      </section>
    </div>
  );
}
