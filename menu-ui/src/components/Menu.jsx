import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiSearch, FiX, FiChevronRight } from "react-icons/fi";
import { menuData } from "../data/menuData";

export default function Menu() {
  const categories = Object.keys(menuData);

  const [active, setActive] = useState("Decor");
  const [selectedItem, setSelectedItem] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredColumns = useMemo(() => {
    const category = menuData[active];

    if (!search.trim()) return category.columns;

    return category.columns.map((column) => ({
      ...column,
      items: column.items.filter((item) => {
        const name = typeof item === "string" ? item : item.name;

        return name.toLowerCase().includes(search.toLowerCase());
      }),
    }));
  }, [active, search]);

  return (
    <>
      <div className="flex items-center justify-between border-b bg-white p-4 lg:hidden">
        <h2 className="font-semibold">Menu</h2>

        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <FiMenu size={22} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className="fixed left-0 top-0 z-50 h-screen w-80 bg-white shadow-xl"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">Categories</h3>

                <button onClick={() => setMobileOpen(false)}>
                  <FiX size={22} />
                </button>
              </div>

              <div className="p-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActive(category);
                      setMobileOpen(false);
                    }}
                    className={`block w-full rounded-lg px-4 py-3 text-left transition
                    ${
                      active === category
                        ? "bg-violet-100 text-violet-700"
                        : "hover:bg-slate-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="fixed left-1/2 top-0 z-50 w-full max-w-6xl -translate-x-1/2 bg-white shadow-xl">
        <div className="flex flex-wrap gap-8 px-8 pt-8 text-slate-700">
          {categories.map((item) => (
            <button
              key={item}
              onMouseEnter={() => setActive(item)}
              className="relative pb-4 text-sm font-medium"
            >
              {item}

              {active === item && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-fuchsia-500"
                />
              )}
            </button>
          ))}
        </div>

        <div className="px-8 pt-6">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-violet-400"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 gap-10 px-8 py-10 xl:grid-cols-4"
          >
            {filteredColumns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 font-semibold text-slate-900">
                  {column.title}
                </h3>

                <ul className="space-y-2">
                  {column.items.map((item) => {
                    const isNested = typeof item === "object";

                    const name = isNested ? item.name : item;

                    return (
                      <li key={name}>
                        <button
                          onClick={() => setSelectedItem(name)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition
                          ${
                            selectedItem === name
                              ? "bg-violet-100 text-violet-700"
                              : "text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {name}

                          {isNested && <FiChevronRight />}
                        </button>

                        {/* NESTED ITEMS */}

                        {isNested && selectedItem === name && (
                          <motion.ul
                            initial={{
                              opacity: 0,
                              height: 0,
                            }}
                            animate={{
                              opacity: 1,
                              height: "auto",
                            }}
                            className="ml-4 mt-2 space-y-1 overflow-hidden"
                          >
                            {item.children.map((child) => (
                              <li
                                key={child}
                                className="rounded-md px-3 py-1 text-sm text-slate-500 hover:bg-slate-100"
                              >
                                {child}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-4 lg:hidden">
        <div className="mb-4">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 py-3 pl-11"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredColumns.map((column) => (
            <div
              key={column.title}
              className="rounded-xl border border-slate-200 p-4"
            >
              <h3 className="mb-3 font-semibold">{column.title}</h3>

              {column.items.map((item) => {
                const name = typeof item === "string" ? item : item.name;

                return (
                  <div key={name} className="py-2 text-slate-600">
                    {name}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
