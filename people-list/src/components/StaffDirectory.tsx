import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Search, Users, X } from "lucide-react";
import { staff, type StaffMember } from "../data/staff";
import StaffCard from "./StaffCard";
import StaffModal from "./StaffModal";

export default function StaffDirectory() {
  const [showEveryone, setShowEveryone] = useState(false);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  const closeModal = useCallback(() => {
    setSelectedStaff(null);
  }, []);

  useEffect(() => {
    if (!showEveryone) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      if (search) {
        setSearch("");
      } else {
        closeDirectory();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showEveryone, search]);

  const departments = useMemo(
    () => ["All", ...new Set(staff.map((person) => person.department))],
    [],
  );

  const visibleStaff = useMemo(() => {
    const query = search.trim().toLowerCase();

    return staff.filter((person, index) => {
      const matchesSearch =
        !query ||
        person.name.toLowerCase().includes(query) ||
        person.role.toLowerCase().includes(query) ||
        person.department.toLowerCase().includes(query);

      const matchesDepartment =
        department === "All" || person.department === department;

      const matchesInitialView = showEveryone || index < 6;

      return matchesSearch && matchesDepartment && matchesInitialView;
    });
  }, [search, department, showEveryone]);

  function openDirectory() {
    setShowEveryone(true);
    setSearch("");
    setDepartment("All");
  }

  function closeDirectory() {
    setShowEveryone(false);
    setSearch("");
    setDepartment("All");
  }

  return (
    <main className="page-shell">
      <section className="directory-panel" aria-labelledby="directory-title">
        <header className="directory-header">
          {showEveryone && (
            <button
              className="back-button"
              type="button"
              onClick={closeDirectory}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to featured staff</span>
            </button>
          )}

          <div className="directory-heading">
            <div className="directory-eyebrow">
              <span className="eyebrow-dot" />
              MEET THE TEAM
            </div>

            <div className="directory-title-row">
              <h1 id="directory-title" className="directory-title">
                {showEveryone ? "Everyone" : "Our Staff"}
              </h1>

              <span className="staff-total">
                {showEveryone ? staff.length : 6} members
              </span>
            </div>

            <p className="directory-subtitle">
              {showEveryone
                ? "Meet the people behind our publication."
                : "The people behind the stories."}
            </p>
          </div>
        </header>

        {showEveryone && (
          <div className="directory-tools">
            <label className="search-field">
              <Search size={17} aria-hidden="true" className="search-icon" />
              <span className="sr-only">Search staff</span>
              <input
                type="search"
                placeholder="Search by name, role or team..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              {search && (
                <button
                  className="clear-search"
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearch("")}
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </label>

            <label className="department-filter">
              <span className="sr-only">Filter by department</span>
              <select
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
              >
                {departments.map((name) => (
                  <option key={name} value={name}>
                    {name === "All" ? "All departments" : name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        <div className="staff-grid" aria-live="polite">
          {visibleStaff.map((person) => (
            <StaffCard
              key={person.id}
              person={person}
              onOpen={setSelectedStaff}
            />
          ))}
        </div>

        {visibleStaff.length === 0 && (
          <div className="empty-state">
            <Search size={24} aria-hidden="true" />
            <p className="empty-title">No staff members found</p>
            <p>Try another name, role, or department.</p>
            <button
              className="text-button"
              type="button"
              onClick={() => {
                setSearch("");
                setDepartment("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        {!showEveryone && (
          <div className="directory-footer">
            <button
              className="view-button"
              type="button"
              onClick={openDirectory}
            >
              <Users size={16} aria-hidden="true" />
              <span>View everyone</span>
              <ArrowRight
                className="view-button-arrow"
                size={16}
                aria-hidden="true"
              />
            </button>
          </div>
        )}

        {showEveryone && (
          <p className="staff-count" aria-live="polite">
            Showing {visibleStaff.length} of {staff.length} staff members
          </p>
        )}
      </section>

      {selectedStaff && (
        <StaffModal person={selectedStaff} onClose={closeModal} />
      )}
    </main>
  );
}
