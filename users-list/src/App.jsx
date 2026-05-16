import { useMemo, useState } from "react";
import { Search, MapPin, ChevronRight } from "lucide-react";

const users = [
  {
    id: 1,
    name: "Lelah Nichols",
    location: "Troy, MI",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    category: "New users",
    tags: ["clothes", "stem"],
  },
  {
    id: 2,
    name: "Jesus Weiss",
    location: "Fort Worth, TX",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    category: "New users",
    tags: ["headset", "gadget", "speed", "winter"],
  },
  {
    id: 3,
    name: "Annie Rice",
    location: "Austin, TX",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
    category: "Editors",
    tags: ["road", "mountain", "trip", "earth", "nature"],
  },
  {
    id: 4,
    name: "Robert Brower",
    location: "Cincinnati, OH",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
    category: "Moderators",
    tags: ["maintenance", "gears", "frames", "repair"],
  },
  {
    id: 5,
    name: "Amy Campbell",
    location: "Warrior, AL",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=300&auto=format&fit=crop",
    category: "Voters",
    tags: ["music", "disks"],
  },
  {
    id: 6,
    name: "Anthony S. Morin",
    location: "Lyndhurst, NJ",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    category: "Reputation",
    tags: ["vintage", "electric"],
  },
];

const tabs = ["Reputation", "New users", "Voters", "Editors", "Moderators"];

export default function App() {
  const [activeTab, setActiveTab] = useState("New users");
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesTab =
        activeTab === "Reputation" ? true : user.category === activeTab;

      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.location.toLowerCase().includes(search.toLowerCase()) ||
        user.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase()),
        );

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  return (
    <div className="min-h-screen bg-slate-200 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-6 shadow-sm sm:p-10">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-5">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                Users
              </h1>

              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search users"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-base text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {tabs.map((tab) => {
                const active = activeTab === tab;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-xl px-5 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-indigo-400 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={
                  "group rounded-3xl border bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-lg border-indigo-100"
                }
              >
                <div className="flex items-start gap-4">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="size-20 rounded-full object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-2xl font-bold leading-tight text-slate-900">
                          {user.name}
                        </h2>

                        <div className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                          <MapPin className="size-4" />
                          <span>{user.location}</span>
                        </div>
                      </div>

                      <button className="rounded-full p-2 text-slate-400 opacity-0 transition hover:bg-slate-100 hover:text-slate-700 group-hover:opacity-100">
                        <ChevronRight className="size-5" />
                      </button>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {user.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 py-20 text-center">
              <Search className="size-10 text-slate-300" />

              <h3 className="mt-4 text-lg font-semibold text-slate-700">
                No users found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try adjusting your search or selecting another category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
