import { useEffect, useMemo, useRef, useState } from "react";
import {
  Clock3,
  Heart,
  ChevronLeft,
  ChevronRight,
  Search,
  Star,
  Users,
  Flame,
} from "lucide-react";

const recipes = [
  {
    id: 1,
    title: "Spinach Salad",
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=1200&auto=format&fit=crop",
    description:
      "Simple recipe for a weeknight or a celebration table. One of the easiest salads you will ever make.",
    rating: 5,
    reviews: "14K",
    time: "30 min",
    servings: "6 servings",
    calories: "210 cals",
    difficulty: "Medium",
  },
  {
    id: 2,
    title: "Crispy Crouton Salad",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
    description: "Fresh greens mixed with crunchy homemade croutons and herbs.",
    rating: 4,
    reviews: "8K",
    time: "20 min",
    servings: "4 servings",
    calories: "180 cals",
    difficulty: "Easy",
  },
  {
    id: 3,
    title: "Pancakes with Yogurt",
    image:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=1200&auto=format&fit=crop",
    description:
      "Soft pancakes topped with creamy yogurt and natural honey drizzle.",
    rating: 5,
    reviews: "21K",
    time: "25 min",
    servings: "3 servings",
    calories: "320 cals",
    difficulty: "Medium",
  },
  {
    id: 4,
    title: "Crispy and Creamy Doughnuts",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1200&auto=format&fit=crop",
    description: "Golden doughnuts with creamy filling and colorful toppings.",
    rating: 5,
    reviews: "11K",
    time: "45 min",
    servings: "8 servings",
    calories: "420 cals",
    difficulty: "Hard",
  },
];

const difficulties = ["All", "Easy", "Medium", "Hard"];

export default function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(recipes[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const sliderRef = useRef(null);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = recipe.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesDifficulty =
        selectedDifficulty === "All"
          ? true
          : recipe.difficulty === selectedDifficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [search, selectedDifficulty]);

  useEffect(() => {
    function filterRecipes() {
      if (!filteredRecipes.find((recipe) => recipe.id === selectedRecipe.id)) {
        setSelectedRecipe(filteredRecipes[0] || recipes[0]);
      }
    }

    filterRecipes();
  }, [filteredRecipes, selectedRecipe.id]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);

    setTimeout(() => {
      setSubscribed(false);
    }, 3000);

    setEmail("");
  };

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -260,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 260,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-stone-100 px-4 py-6 text-slate-900 sm:px-6 lg:px-12 lg:py-10">
      <div className="container mx-auto grid gap-4 lg:grid-cols-12 lg:gap-6">
        <div className="space-y-4 lg:col-span-5 lg:space-y-6">
          <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-full bg-stone-100 sm:size-12">
                  <Clock3 className="size-5 text-slate-800 sm:size-6" />
                </div>

                <div>
                  <p className="text-sm font-semibold sm:text-base lg:text-lg">
                    {selectedRecipe.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-full bg-stone-100 sm:size-12">
                  <Users className="size-5 text-slate-800 sm:size-6" />
                </div>

                <div>
                  <p className="text-sm font-semibold sm:text-base lg:text-lg">
                    {selectedRecipe.servings}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-full bg-stone-100 sm:size-12">
                  <Flame className="size-5 text-slate-800 sm:size-6" />
                </div>

                <div>
                  <p className="text-sm font-semibold sm:text-base lg:text-lg">
                    {selectedRecipe.calories}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className="h-64 w-full object-cover sm:h-80 lg:h-[320px]"
            />

            <div className="p-5 sm:p-6 lg:p-8">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                    {selectedRecipe.title}
                  </h2>
                </div>

                <button
                  onClick={() => toggleFavorite(selectedRecipe.id)}
                  className="flex size-12 shrink-0 items-center justify-center rounded-full border border-rose-100 transition hover:bg-rose-50 sm:size-14"
                >
                  <Heart
                    className={`size-5 transition sm:size-6 ${
                      favorites.includes(selectedRecipe.id)
                        ? "fill-rose-500 text-rose-500"
                        : "text-slate-800"
                    }`}
                  />
                </button>
              </div>

              <p className="text-sm leading-7 text-slate-600 sm:text-base lg:text-lg lg:leading-8">
                {selectedRecipe.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({
                    length: selectedRecipe.rating,
                  }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-rose-500 text-rose-500 sm:size-5"
                    />
                  ))}
                </div>

                <span className="text-sm font-semibold text-slate-500 sm:text-base lg:text-lg">
                  {selectedRecipe.reviews}
                </span>

                <span className="rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-500 sm:px-4 sm:text-sm">
                  {selectedRecipe.difficulty}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6 lg:p-8">
            <h3 className="text-xl font-bold sm:text-2xl">Difficulty</h3>

            <div className="mt-5 flex flex-wrap gap-3 sm:gap-4">
              {difficulties.map((difficulty) => {
                const active = selectedDifficulty === difficulty;

                return (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`rounded-full border px-5 py-3 text-sm font-medium transition sm:px-6 sm:text-base lg:px-8 lg:py-4 lg:text-lg ${
                      active
                        ? "bg-rose-500 text-white shadow-lg shadow-rose-200"
                        : "border-rose-100 bg-white text-slate-700 hover:bg-rose-50"
                    }`}
                  >
                    {difficulty}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl bg-rose-500 p-5 shadow-sm sm:p-6 lg:p-8">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              Search for recipes
            </h3>

            <div className="relative mt-5 sm:mt-6">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400 sm:left-5 sm:size-6" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search recipes..."
                className="w-full rounded-2xl bg-white py-4 pl-12 pr-4 text-base text-slate-700 outline-none sm:py-5 sm:pl-14 sm:pr-5 sm:text-lg"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-3 sm:mt-6">
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe) => (
                  <button
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-rose-100 sm:px-5 sm:py-3 sm:text-base"
                  >
                    {recipe.title}
                  </button>
                ))
              ) : (
                <div className="rounded-2xl bg-white px-5 py-4 text-sm font-medium text-slate-700 sm:text-base">
                  No recipes found
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:col-span-7 lg:space-y-6">
          <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6 lg:p-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-xl font-bold sm:text-2xl">Popular Recipes</h3>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={scrollLeft}
                  className="flex size-10 items-center justify-center rounded-full bg-rose-50 text-rose-500 transition hover:bg-rose-100 sm:size-12"
                >
                  <ChevronLeft className="size-4 sm:size-5" />
                </button>

                <button
                  onClick={scrollRight}
                  className="flex size-10 items-center justify-center rounded-full bg-rose-50 text-rose-500 transition hover:bg-rose-100 sm:size-12"
                >
                  <ChevronRight className="size-4 sm:size-5" />
                </button>
              </div>
            </div>

            <div ref={sliderRef} className="flex gap-4 overflow-x-auto pb-2">
              {filteredRecipes.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  className={`min-w-[180px] rounded-3xl border p-4 text-left transition sm:min-w-[220px] sm:p-5 ${
                    selectedRecipe.id === recipe.id
                      ? "border-rose-300 bg-rose-50"
                      : "border-rose-100 bg-white hover:-translate-y-1 hover:shadow-md"
                  }`}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="mx-auto size-24 rounded-full object-cover sm:size-28"
                  />

                  <h3 className="mt-4 text-center text-base font-semibold leading-6 sm:mt-5 sm:text-xl sm:leading-7">
                    {recipe.title}
                  </h3>

                  <div className="mt-3 flex items-center justify-center gap-1 sm:mt-4">
                    {Array.from({ length: recipe.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-3 fill-rose-500 text-rose-500 sm:size-4"
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className="h-64 w-full object-cover sm:h-80 lg:h-[340px]"
            />

            <div className="p-5 sm:p-6 lg:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 sm:text-sm">
                Subscribe Today
              </p>

              <h2 className="mt-3 text-2xl font-bold leading-tight sm:mt-4 sm:text-3xl lg:text-4xl">
                Never miss a recipe
              </h2>

              <form
                onSubmit={handleSubscribe}
                className="mt-6 space-y-4 sm:mt-8 sm:space-y-5"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full rounded-2xl border border-rose-100 bg-white py-4 pl-12 pr-4 text-base outline-none transition focus:border-rose-300 sm:py-5 sm:pl-14 sm:pr-5 sm:text-lg"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-rose-500 py-4 text-base font-semibold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-600 sm:py-5 sm:text-xl"
                >
                  Subscribe
                </button>
              </form>

              {subscribed && (
                <div className="mt-5 rounded-2xl bg-emerald-100 px-5 py-4 text-center text-sm font-medium text-emerald-700 sm:text-base">
                  Successfully subscribed
                </div>
              )}

              <p className="mt-5 text-center text-sm leading-6 text-slate-500 sm:mt-6 sm:text-base sm:leading-7">
                We won&apos;t send you spam.
                <br />
                Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
