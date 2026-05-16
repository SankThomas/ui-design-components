import { useMemo, useState } from "react";
import { Star, X, Circle, CheckCircle2 } from "lucide-react";

export default function App() {
  const [rating, setRating] = useState(4);
  const [hovered, setHovered] = useState(0);
  const [recommend, setRecommend] = useState("yes");
  const [accepted, setAccepted] = useState(false);

  const [form, setForm] = useState({
    title: "",
    review: "",
    nickname: "",
    email: "",
  });

  const activeRating = hovered || rating;

  const isValid = useMemo(() => {
    return (
      rating > 0 &&
      form.title.trim() &&
      form.review.trim() &&
      form.nickname.trim() &&
      form.email.trim() &&
      accepted
    );
  }, [rating, form, accepted]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid) return;

    alert(
      JSON.stringify(
        {
          rating,
          recommend,
          ...form,
        },
        null,
        2,
      ),
    );
  };

  const inputStyles =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100 placeholder:text-slate-400";

  return (
    <div className="min-h-screen bg-violet-50 px-4 py-10">
      <div className="relative mx-auto flex max-w-5xl items-center justify-center">
        <div className="absolute inset-y-16 left-0 hidden w-72 rounded-[3rem] bg-rose-100 lg:block" />

        <div className="absolute inset-y-16 right-0 hidden w-72 rounded-[3rem] bg-rose-100 lg:block" />

        <div className="relative z-10 w-full max-w-2xl rounded-[2.5rem] bg-white p-6 shadow-xl sm:p-8">
          <button className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200">
            <X className="size-5" />
          </button>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Overall rating
              </h1>

              <div className="mt-5 flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, index) => {
                  const value = index + 1;
                  const active = value <= activeRating;

                  return (
                    <button
                      key={value}
                      type="button"
                      onMouseEnter={() => setHovered(value)}
                      onMouseLeave={() => setHovered(0)}
                      onClick={() => setRating(value)}
                      className="flex size-12 items-center justify-center rounded-lg border border-slate-200 bg-white transition hover:border-amber-300"
                    >
                      <Star
                        className={`size-7 transition ${
                          active
                            ? "fill-amber-300 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 text-sm text-slate-500">Click to rate</p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">
                Review title
              </label>

              <input
                type="text"
                placeholder="Example: Easy to use"
                className={inputStyles}
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-slate-900">
                Would you recommend this product to a friend?
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-8">
                <button
                  type="button"
                  onClick={() => setRecommend("yes")}
                  className="flex items-center gap-3"
                >
                  {recommend === "yes" ? (
                    <CheckCircle2 className="size-6 fill-slate-900 text-slate-900" />
                  ) : (
                    <Circle className="size-6 text-slate-300" />
                  )}

                  <span className="text-base font-medium text-slate-800">
                    Yes
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setRecommend("no")}
                  className="flex items-center gap-3"
                >
                  {recommend === "no" ? (
                    <CheckCircle2 className="size-6 fill-slate-900 text-slate-900" />
                  ) : (
                    <Circle className="size-6 text-slate-300" />
                  )}

                  <span className="text-base font-medium text-slate-800">
                    No
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">
                Product review
              </label>

              <textarea
                rows={5}
                placeholder="Example: Since I bought this a month ago, it has been used a lot. What I like best/ what is worst about this product is ..."
                className={`${inputStyles} resize-none`}
                value={form.review}
                onChange={(e) =>
                  setForm({
                    ...form,
                    review: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900">
                  Nickname
                </label>

                <input
                  type="text"
                  placeholder="Example: bob27"
                  className={inputStyles}
                  value={form.nickname}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      nickname: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900">
                  Email address (will not be published)
                </label>

                <input
                  type="email"
                  placeholder="Example: your@email.com"
                  className={inputStyles}
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setAccepted(!accepted)}
                className="flex items-center gap-3"
              >
                {accepted ? (
                  <CheckCircle2 className="size-6 fill-slate-900 text-slate-900" />
                ) : (
                  <Circle className="size-6 text-slate-300" />
                )}

                <span className="text-base text-slate-800">
                  I accept the{" "}
                  <span className="font-medium underline underline-offset-4">
                    terms and conditions
                  </span>
                </span>
              </button>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500">
                You will be able to receive emails in connection with this
                review. All emails contain the option to unsubscribe. We can use
                the text and star rating from your review in other marketing.
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={!isValid}
                className="rounded-xl bg-slate-900 px-7 py-4 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Submit product review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
