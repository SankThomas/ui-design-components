import { useMemo, useState } from "react";

const tags = [
  "All",
  "Profile",
  "New York",
  "Relaxing",
  "Person",
  "Fashion",
  "Travel",
  "Architecture",
];

const collections = [
  {
    title: "People",
    category: "Person",
    count: "144",
    main: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "Portrait Mood",
    category: "Person",
    count: "2.1K",
    main: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "Studio Faces",
    category: "Person",
    count: "830",
    main: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "Nature",
    category: "Relaxing",
    count: "7K",
    main: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "Calm Ocean",
    category: "Relaxing",
    count: "4.8K",
    main: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "Forest Escape",
    category: "Relaxing",
    count: "1.5K",
    main: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "History",
    category: "Architecture",
    count: "431",
    main: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "Ancient Cities",
    category: "Architecture",
    count: "920",
    main: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "Modern Buildings",
    category: "Architecture",
    count: "2K",
    main: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "Fashion Week",
    category: "Fashion",
    count: "1.2K",
    main: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "Street Style",
    category: "Fashion",
    count: "5K",
    main: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "Minimal Looks",
    category: "Fashion",
    count: "670",
    main: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "New York City",
    category: "New York",
    count: "980",
    main: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "Brooklyn Nights",
    category: "New York",
    count: "2.8K",
    main: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "NYC Streets",
    category: "New York",
    count: "3.1K",
    main: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "Travel Diaries",
    category: "Travel",
    count: "3.4K",
    main: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "Mountain Trips",
    category: "Travel",
    count: "1.8K",
    main: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "Beach Adventures",
    category: "Travel",
    count: "2.2K",
    main: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "Creative Profiles",
    category: "Profile",
    count: "500",
    main: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "Social Avatars",
    category: "Profile",
    count: "920",
    main: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    title: "Professional Headshots",
    category: "Profile",
    count: "1.4K",
    main: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    ],
  },
];

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
