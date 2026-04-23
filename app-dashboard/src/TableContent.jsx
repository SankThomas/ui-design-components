import { useState } from "react";

const tableData = [
  {
    name: "Day 1333 App Dashboard UI Design",
    lastModified: "Just now",
    kind: "InVision Studio",
  },
  {
    name: "Norske Verb A",
    lastModified: "3 hours ago",
    kind: "PDF Document",
  },
  {
    name: "Mediemskort",
    lastModified: "Yesterday",
    kind: "SVG",
  },
  {
    name: "plus_icon",
    lastModified: "Yesterday",
    kind: "SVG",
  },
  {
    name: "Day 1393 Checkout UI Components",
    lastModified: "Last month",
    kind: "PNG Image",
  },
  {
    name: "City",
    lastModified: "Last month",
    kind: "SVG",
  },
  {
    name: "TexturePack",
    lastModified: "2 months ago",
    kind: "Adobe Illustrator",
  },
  {
    name: "UI Kit 1",
    lastModified: "2 months ago",
    kind: "Sketch Document",
  },
  {
    name: "Day 1393 Checkout UI Components",
    lastModified: "Last month",
    kind: "PNG Image",
  },
  {
    name: "City",
    lastModified: "Last month",
    kind: "SVG",
  },
  {
    name: "TexturePack",
    lastModified: "2 months ago",
    kind: "Adobe Illustrator",
  },
  {
    name: "UI Kit 1",
    lastModified: "2 months ago",
    kind: "Sketch Document",
  },
];

export default function TableContent() {
  const [search, setSearch] = useState("");

  const filteredData = tableData.filter((item) =>
    `${item.name} ${item.lastModified} ${item.kind}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="p-4">
      <div>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-b border-gray-100 focus:border-blue-600 w-full outline-none p-4"
        />
      </div>

      <table width="100%">
        <thead>
          <tr>
            <td className="uppercase text-sm p-4 text-gray-900/75">Name</td>
            <td className="uppercase text-sm p-4 text-gray-900/75">
              Last Modified
            </td>
            <td className="uppercase text-sm p-4 text-gray-900/75">Kind</td>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-200 transition">
              <td className="p-4">{item.name}</td>
              <td className="p-4">{item.lastModified}</td>
              <td className="p-4">{item.kind}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {!filteredData ||
        (filteredData.length === 0 && (
          <p className="mt-10 text-gray-900/75 text-sm text-center">
            No entries found. Try adjusting your search resuts
          </p>
        ))}

      <button className="fixed bottom-4 right-4 rounded-full bg-blue-600 text-2xl size-12 text-white hover:opacity-75">
        +
      </button>
    </div>
  );
}
