import { useMemo, useState } from "react";
import type { Post, PhotoFilter, Profile, SortOption, Tab } from "./data";
import { initialPosts, initialProfile } from "./data";
import ProfileHeader from "./components/ProfileHeader";
import ProfileToolbar from "./components/ProfileToolbar";
import PostsSection from "./components/PostsSection";
import AlbumsSection from "./components/AlbumsSection";
import StatsSection from "./components/StatsSection";
import EditProfileModal from "./components/EditProfileModal";
import MessageModal from "./components/MessageModal";
import ViewPost from "./components/ViewPost";
import { MessageCircle, X } from "lucide-react";

type ModalType = "edit" | "message" | null;

function App() {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [posts] = useState<Post[]>(initialPosts);
  const [activeTab, setActiveTab] = useState<Tab>("Posts");
  const [photoFilter, setPhotoFilter] = useState<PhotoFilter>("Photos");
  const [sortBy, setSortBy] = useState<SortOption>("Popularity");
  const [isFollowing, setIsFollowing] = useState(true);
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  const filteredPosts = useMemo(() => {
    const filtered = posts.filter((post) => {
      if (photoFilter === "All photos") return true;
      if (photoFilter === "Photos") return post.type === "photo";
      return post.type === "video";
    });

    if (sortBy === "Popularity") {
      return [...filtered].sort((a, b) => b.likes - a.likes);
    }

    if (sortBy === "New") {
      return [...filtered].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }

    return filtered;
  }, [posts, photoFilter, sortBy]);

  function toggleLike(postId: number) {
    setLikedPosts((current) =>
      current.includes(postId)
        ? current.filter((id) => id !== postId)
        : [...current, postId],
    );
  }

  function handleProfileSave(updatedProfile: Profile) {
    setProfile(updatedProfile);
    setModal(null);
    setNotice("Profile updated successfully.");
  }

  function handleMessageSend(message: string) {
    setSentMessages((current) => [...current, message]);
    setModal(null);
    setNotice("Message sent successfully.");
  }

  function handleToggleFollow() {
    const nextFollowing = !isFollowing;

    setIsFollowing(nextFollowing);
    setNotice(
      nextFollowing
        ? `You are now following ${profile.name}.`
        : `You unfollowed ${profile.name}.`,
    );
  }

  return (
    <main className="page-shell">
      <section className="profile-card">
        <ProfileHeader
          profile={profile}
          isFollowing={isFollowing}
          onEdit={() => setModal("edit")}
          onMessage={() => setModal("message")}
          onToggleFollow={handleToggleFollow}
        />

        <div className="profile-divider" />

        <ProfileToolbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          photoFilter={photoFilter}
          setPhotoFilter={setPhotoFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {notice && (
          <div className="notice" role="status">
            <span>{notice}</span>
            <button
              type="button"
              className="notice-dismiss"
              aria-label="Dismiss notification"
              onClick={() => setNotice("")}
            >
              <X size={15} />
            </button>
          </div>
        )}

        <div className="tab-content">
          {activeTab === "Posts" && (
            <PostsSection
              posts={filteredPosts}
              likedPosts={likedPosts}
              toggleLike={toggleLike}
              onSelectPost={setSelectedPost}
            />
          )}

          {activeTab === "Albums" && <AlbumsSection />}

          {activeTab === "Stats" && (
            <StatsSection posts={posts} likedPosts={likedPosts} />
          )}
        </div>
      </section>

      {modal === "edit" && (
        <EditProfileModal
          profile={profile}
          onClose={() => setModal(null)}
          onSave={handleProfileSave}
        />
      )}

      {modal === "message" && (
        <MessageModal
          recipient={profile.name}
          onClose={() => setModal(null)}
          onSend={handleMessageSend}
        />
      )}

      {selectedPost && (
        <ViewPost
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
          likedPosts={likedPosts}
          toggleLike={toggleLike}
        />
      )}

      {sentMessages.length > 0 && (
        <div className="message-count" aria-label="Messages sent">
          <MessageCircle size={15} />
          {sentMessages.length} sent
        </div>
      )}
    </main>
  );
}

export default App;
