import { albums } from "../data";

export default function AlbumsSection() {
  return (
    <section className="posts-section">
      <div className="posts-heading">
        <div>
          <h2 className="section-title">Photo albums</h2>
          <p className="section-description">
            Collections of creative inspiration
          </p>
        </div>
      </div>

      <div className="posts-grid">
        {albums.map((album) => (
          <article className="post-card" key={album.title}>
            <div className="post-image-button">
              <img
                className="post-image"
                src={album.image}
                alt={album.title}
                loading="lazy"
              />
            </div>

            <div className="post-info">
              <h3 className="post-title">{album.title}</h3>
              <p className="album-count">{album.count}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
