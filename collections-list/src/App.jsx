import { useMemo, useState } from "react";
import { collections, tags } from "./data";

export default function App() {
  const [activeTag, setActiveTag] = useState("All");

  const [selectedImages, setSelectedImages] = useState(
    collections.map((item) => item.main),
  );

  const handleThumbnailClick = (collectionIndex, image) => {
    setSelectedImages((prev) => {
      const updated = [...prev];
      updated[collectionIndex] = image;
      return updated;
    });
  };

  const filteredCollections = useMemo(() => {
    if (activeTag === "All") return collections;

    return collections.filter(
      (collection) => collection.category === activeTag,
    );
  }, [activeTag]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-300 px-4 py-12">
      <div className="absolute right-40 top-8 size-72 rounded-full bg-white/20" />

      <div className="absolute -bottom-32 left-32 size-96 rounded-full bg-white/20" />

      <div className="relative z-10 w-full max-w-7xl rounded-3xl bg-zinc-100 px-14 py-14 shadow-2xl">
        <h1 className="text-5xl font-bold leading-none tracking-tight text-slate-900">
          Popular Collections
        </h1>

        <div className="mt-10 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                activeTag === tag
                  ? "scale-105 bg-slate-900 text-white shadow-lg"
                  : "bg-white text-slate-900 shadow-sm hover:scale-105 hover:shadow-md"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {filteredCollections.length > 0 ? (
            filteredCollections.map((item) => {
              const collectionIndex = collections.findIndex(
                (c) => c.title === item.title,
              );

              return (
                <div
                  key={item.title}
                  className="rounded-3xl bg-zinc-50 p-5 shadow-sm"
                >
                  <div className="h-60 overflow-hidden rounded-3xl">
                    <img
                      src={selectedImages[collectionIndex]}
                      alt={item.title}
                      className="size-full object-cover transition-all duration-300"
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {item.thumbs.map((thumb, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          handleThumbnailClick(collectionIndex, thumb)
                        }
                        className={`h-20 cursor-pointer overflow-hidden rounded-3xl border-4 transition-all duration-200 hover:scale-105 ${
                          selectedImages[collectionIndex] === thumb
                            ? "border-slate-900"
                            : "border-transparent"
                        }`}
                      >
                        <img
                          src={thumb}
                          alt=""
                          className="size-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between px-1">
                    <div>
                      <h2 className="font-semibold text-slate-900">
                        {item.title}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-slate-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75V6A2.25 2.25 0 014.5 3.75h15A2.25 2.25 0 0121.75 6v9.75M2.25 15.75l4.72-4.72a2.25 2.25 0 013.182 0l1.91 1.909a2.25 2.25 0 003.182 0l4.72-4.719M2.25 15.75V18A2.25 2.25 0 004.5 20.25h15A2.25 2.25 0 0021.75 18v-2.25M15.75 8.25h.008v.008h-.008V8.25z"
                        />
                      </svg>

                      <span className="font-semibold">{item.count}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center rounded-3xl bg-zinc-50 py-24 text-center shadow-sm">
              <div className="flex size-20 items-center justify-center rounded-full bg-slate-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-10 text-slate-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l1.409 1.409a2.25 2.25 0 0 0 3.182 0l3.409-3.409a2.25 2.25 0 0 1 3.182 0L21.75 9.75M3.75 19.5h16.5A1.5 1.5 0 0 0 21.75 18V6A1.5 1.5 0 0 0 20.25 4.5H3.75A1.5 1.5 0 0 0 2.25 6v12A1.5 1.5 0 0 0 3.75 19.5Zm11.25-9a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
                  />
                </svg>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                No Collections Found
              </h2>

              <p className="mt-2 max-w-md text-gray-500">
                There are currently no photo collections available for this
                category. Try selecting another tag.
              </p>

              <button
                onClick={() => setActiveTag("All")}
                className="mt-6 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:scale-105"
              >
                View All Collections
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
