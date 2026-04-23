import { useState } from "react";

const peopleData = [
  {
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Mary Massis",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Daria Nati",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Lisa Kruckova",
  },
];

export default function App() {
  const [search, setSearch] = useState("");
  const [people, _] = useState(peopleData);
  const [inviteLink, setInviteLink] = useState(
    "https://work.me/g/sdkjhfkjshfkjsdhf",
  );
  const [addedMembers, setAddedMembers] = useState([]);

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = (person) => {
    if (!addedMembers.includes(person.name)) {
      const updatedMembers = [...addedMembers, person.name];
      setAddedMembers(updatedMembers);

      const encoded = encodeURIComponent(updatedMembers.join(","));
      setInviteLink(`https://work.me/g/invite?members=${encoded}`);
    }
  };

  return (
    <div className="bg-blue-50 flex items-center justify-center h-screen">
      <div className="p-8 rounded-2xl shadow bg-white max-w-lg w-full space-y-4">
        <h1 className="font-bold text-2xl">About</h1>

        <div className="flex items-center justify-between">
          <p>Members (2,778)</p>
          <button className="text-blue-500 border border-blue-500 p-2 rounded hover:opacity-75">
            Import
          </button>
        </div>

        <div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Find and add people"
            className="border border-gray-400 rounded-md p-2 outline-none w-full focus:ring-2 focus:ring-gray-800"
          />
        </div>

        <div>
          <p>Share an invitation link</p>

          <input
            value={inviteLink}
            type="url"
            placeholder="https://work.me/g/sdkjhfkjshfkjsdhf"
            className="border border-gray-400 rounded-md p-2 outline-none w-full focus:ring-2 focus:ring-gray-800"
          />
        </div>

        <div>
          <h2 className="font-bold text-xl mb-4">Suggested Members</h2>
          <div className="space-y-4">
            {filteredPeople.map((person) => (
              <article
                key={person.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="rounded-full size-16 object-cover"
                  />
                  <h4>{person.name}</h4>
                </div>

                <button
                  className="bg-gray-900 rounded text-white py-2 px-4 hover:opacity-75"
                  onClick={() => handleAdd(person)}
                >
                  + Add
                </button>
              </article>
            ))}

            {filteredPeople.length === 0 && (
              <p className="text-sm text-gray-500">No matches found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
