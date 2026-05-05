import { useState } from "react";

const cards = [
  {
    title: "Price calculator",
    description:
      "How much does 1 Eru in 1963 equal in today's prices? Adjust the rent",
    button: "Calculate price changes",
    color: "bg-blue-500/25",
  },
  {
    title: "Name statistics",
    description:
      "How much does 1 Eru in 1963 equal in today's prices? Adjust the rent",
    button: "Search by name",
    color: "bg-pink-500/25",
  },
  {
    title: "Stats table",
    description:
      "How much does 1 Eru in 1963 equal in today's prices? Adjust the rent",
    button: "Go to tables",
    color: "bg-indigo-500/25",
  },
  {
    title: "Calendar",
    description: "See the advance release of calendars in 2021",
    button: "Go to calendar",
    color: "",
  },
  {
    title: "Subscribe to news",
    description:
      "Get the latest statistics releases and publications by e-mail",
    button: "Receive e-mail alerts",
    color: "",
  },
  {
    title: "API",
    description:
      "Easily retrieve and integrate Statistics with your own system",
    button: "Open API",
    color: "",
  },
];

export default function App() {
  const [query, setQuery] = useState("");

  const filteredCards = cards.filter((card) =>
    `${card.title} ${card.description}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <div className="max-w-4xl mx-auto flex items-center justify-center min-h-screen">
      <div className="bg-white w-full p-8 border-4 border-black rounded-2xl space-y-6">
        <h1 className="font-bold text-2xl text-center">
          Search for statistics
        </h1>

        <input
          type="text"
          placeholder="Enter any keyword"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mx-auto block w-1/2 border border-gray-200 rounded-lg p-4"
        />

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filteredCards.map((card, index) => (
            <div
              key={index}
              className={`${card.color} p-6 space-y-6 rounded-lg border`}
            >
              <h2 className="text-xl">{card.title}</h2>
              <p className="text-sm">{card.description}</p>
              <button className="text-sm px-4 py-2 border rounded-full">
                {card.button}
              </button>
            </div>
          ))}
        </div>

        {filteredCards.length === 0 && (
          <p className="text-center text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
}
