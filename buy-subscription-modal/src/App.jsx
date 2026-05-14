export default function App() {
  const plans = [
    {
      title: "Ice Mobile 10GB",
      subtitle: "Up to 100Mbit/s",
      price: "299,-",
      accent: "bg-amber-100",
      logo: (
        <span className="text-3xl font-black tracking-tight lowercase">
          ice
        </span>
      ),
    },
    {
      title: "Telia Mobil 15GB",
      subtitle: "Unlimited calls, SMS and MMS",
      price: "953,-",
      accent: "bg-fuchsia-100",
      logo: (
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-linear-to-br from-fuchsia-500 to-violet-700" />
          <span className="text-2xl font-bold text-violet-700">Telia</span>
        </div>
      ),
    },
    {
      title: "Telenor Next Fast",
      subtitle: "Up to 100Mbit/s",
      price: "1028,-",
      accent: "bg-indigo-100",
      logo: (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-sky-500" />
          <span className="text-2xl font-medium text-gray-700">telenor</span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200 px-4 py-8">
      <div className="w-full max-w-5xl rounded-3xl bg-slate-50 px-8 py-12 shadow-sm">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-black leading-tight text-indigo-950">
            Get the most out of your mobile
            <br />
            with the right subscription
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600">
            All devices come with free delivery or pickup as standard. See
            information on available shopping options for your location.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap items-stretch justify-center gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="relative">
              <div
                className={`absolute -left-4 -top-4 h-full w-full rounded-3xl ${plan.accent}`}
              />

              <div className="relative z-10 flex h-80 w-65 flex-col rounded-3xl bg-white px-7 py-8 shadow-sm">
                <div className="mb-6">{plan.logo}</div>

                <h2 className="text-2xl font-bold text-slate-900">
                  {plan.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {plan.subtitle}
                </p>

                <div className="mt-auto">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-indigo-950">
                      {plan.price}
                    </span>

                    <span className="mb-1 text-sm text-slate-600">/month</span>
                  </div>

                  <button className="mt-6 w-full rounded-full border border-slate-200 bg-slate-50 py-3 text-sm font-semibold text-slate-800 transition hover:shadow-md">
                    Add subscription
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button className="rounded-full bg-indigo-950 px-8 py-3 text-sm font-semibold text-white transition hover:scale-105">
            See all subscriptions
          </button>
        </div>
      </div>
    </div>
  );
}
