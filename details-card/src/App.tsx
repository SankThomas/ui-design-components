import { useEffect, useRef, useState } from "react";
import { Check, MoreHorizontal, X } from "lucide-react";

export default function App() {
  const [joined, setJoined] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [post, setPost] = useState("");
  const [posted, setPosted] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  function handleSubmitPost() {
    if (!post.trim()) return;

    setPosted(true);
    setPost("");
    setComposerOpen(false);
  }

  return (
    <main className="page-container">
      <div className="ambient-shape" aria-hidden="true" />

      <section className="community-card" aria-label="Community details">
        <div ref={menuRef}>
          <button
            type="button"
            className="menu-button"
            aria-label="More community options"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MoreHorizontal size={22} strokeWidth={2.8} />
          </button>

          {menuOpen && (
            <div className="popover" role="menu">
              <button
                type="button"
                className="popover-item"
                onClick={() => setMenuOpen(false)}
              >
                Community settings
              </button>

              <button
                type="button"
                className="popover-item"
                onClick={() => setMenuOpen(false)}
              >
                Share community
              </button>
            </div>
          )}
        </div>

        <p className="eyebrow">About the community</p>

        <h1 className="community-title">Blender Renders</h1>

        <p className="community-description">
          A place where beginner Blender artists can post their creations and
          get feedback on.
        </p>

        <div className="stat-grid" aria-label="Community statistics">
          <div>
            <p className="stat-value">13.5k</p>

            <p className="stat-label">Members</p>
          </div>

          <div>
            <p className="stat-value">47</p>

            <p className="stat-label">Online</p>
          </div>
        </div>

        <div className="action-row">
          <button
            type="button"
            className={`action-button join-button ${joined ? "is-joined" : ""}`}
            aria-pressed={joined}
            onClick={() => setJoined((value) => !value)}
          >
            {joined ? "Joined" : "Join"}
          </button>

          <button
            type="button"
            className="action-button post-button"
            onClick={() => setComposerOpen(true)}
          >
            Create Post
          </button>
        </div>

        <p className="created-date">Created September 9, 2026</p>

        {posted && (
          <p className="post-success" role="status">
            <Check size={15} />
            Post saved as a draft for the community
          </p>
        )}
      </section>

      {composerOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => setComposerOpen(false)}
        >
          <div
            className="composer-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="composer-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="composer-header">
              <div>
                <p className="eyebrow">New post</p>

                <h2 id="composer-title" className="composter-title">
                  Share a Blender render
                </h2>
              </div>

              <button
                type="button"
                className="close-button"
                aria-label="Close composer"
                onClick={() => setComposerOpen(false)}
              >
                <X size={19} />
              </button>
            </div>

            <textarea
              className="composer-input"
              value={post}
              onChange={(event) => setPost(event.target.value)}
              placeholder="What did you make?"
              autoFocus
            />

            <div className="modal-actions">
              <button
                type="button"
                className="modal-button cancel-button"
                onClick={() => setComposerOpen(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="modal-button publish-button"
                disabled={!post.trim()}
                onClick={handleSubmitPost}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
