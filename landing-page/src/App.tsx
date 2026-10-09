import { useMemo, useState } from "react";
import { designs, designTypes, tools, type Design, type Tool } from "./data";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import DesignCard from "./DesignCard";
import DesignModal from "./DesignModal";
import AuthModal from "./AuthModal";

export default function App() {
  const [activeTab, setActiveTab] = useState<"Latest" | "Popular">("Latest");
  const [activeType, setActiveType] =
    useState<(typeof designTypes)[number]>("All");
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [search, setSearch] = useState("");
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);

  const filteredDesigns = useMemo(() => {
    return designs.filter((design) => {
      const matchesTab =
        activeTab === "Latest" ? true : design.popular === true;
      const matchesType =
        activeType === "All" ? true : design.type === activeType;
      const matchesTool = activeTool ? design.tool === activeTool : true;
      const matchesSearch =
        design.title.toLowerCase().includes(search.toLowerCase()) ||
        design.author.toLowerCase().includes(search.toLowerCase());

      return matchesTab && matchesType && matchesTool && matchesSearch;
    });
  }, [activeTab, activeType, activeTool, search]);

  const handleTypeChange = (type: (typeof designTypes)[number]) => {
    setActiveType(type);
    setTypeMenuOpen(false);
  };

  return (
    <main className="site-shell">
      <div className="page-container">
        <header className="navbar">
          <div className="brand">
            <div className="brand-mark">UI</div>
            <span>Design Daily</span>
          </div>

          <nav className="desktop-nav">
            <button className="nav-link nav-link-active">Free designs</button>
            <button className="nav-link">License</button>
            <button className="nav-link">Articles</button>
            <button className="nav-link">Contributors</button>
            <button className="nav-link">About</button>
          </nav>

          <div className="nav-actions">
            <button
              className="login-button"
              onClick={() => setAuthModal("login")}
            >
              Log in
            </button>

            <button
              className="signup-button"
              onClick={() => setAuthModal("signup")}
            >
              Sign Up
            </button>

            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </header>

        {mobileMenuOpen && (
          <div className="mobile-nav">
            <button>Free designs</button>
            <button>License</button>
            <button>Articles</button>
            <button>Contributors</button>
            <button>About</button>
          </div>
        )}

        <section className="hero">
          <div className="day-badge">Day 1384</div>

          <div className="hero-content">
            <h1>Free UI resources for everyone</h1>

            <p>
              The largest database of 100% free UI components and designs
              available in the formats popular by UI designers.
            </p>

            <div className="search-box">
              <div className="type-selector">
                <button
                  className="type-selector-button"
                  onClick={() => setTypeMenuOpen((open) => !open)}
                >
                  <span>
                    {activeType === "All" ? "Free designs" : activeType}
                  </span>
                  <ChevronDown size={18} />
                </button>

                {typeMenuOpen && (
                  <div className="type-dropdown">
                    {designTypes.map((type) => (
                      <button
                        key={type}
                        className={
                          activeType === type
                            ? "dropdown-option dropdown-option-active"
                            : "dropdown-option"
                        }
                        onClick={() => handleTypeChange(type)}
                      >
                        {type === "All" ? "Free designs" : type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="search-input-wrapper">
                <Search size={24} />
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />

                {search && (
                  <button
                    className="clear-search"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="filters-row">
            <div className="latest-filter">
              <button
                className={
                  activeTab === "Latest"
                    ? "latest-filter-button latest-filter-active"
                    : "latest-filter-button"
                }
                onClick={() => setActiveTab("Latest")}
              >
                Latest
              </button>

              <button
                className={
                  activeTab === "Popular"
                    ? "latest-filter-button latest-filter-active"
                    : "latest-filter-button"
                }
                onClick={() => setActiveTab("Popular")}
              >
                Popular
              </button>
            </div>

            <div className="category-filter">
              {designTypes.map((type) => (
                <button
                  key={type}
                  className={
                    activeType === type
                      ? "category-button category-button-active"
                      : "category-button"
                  }
                  onClick={() => setActiveType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="tool-filter">
              {tools.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  title={name}
                  className={
                    activeTool === name
                      ? "tool-button tool-button-active"
                      : "tool-button"
                  }
                  onClick={() =>
                    setActiveTool((current) => (current === name ? null : name))
                  }
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>

          {(search || activeType !== "All" || activeTool) && (
            <div className="active-filters">
              <span>
                {filteredDesigns.length}{" "}
                {filteredDesigns.length === 1 ? "design" : "designs"} found
              </span>

              <button
                onClick={() => {
                  setSearch("");
                  setActiveType("All");
                  setActiveTool(null);
                }}
              >
                Clear filters
                <X size={14} />
              </button>
            </div>
          )}

          {filteredDesigns.length > 0 ? (
            <div className="design-grid">
              {filteredDesigns.map((design) => (
                <DesignCard
                  key={design.id}
                  design={design}
                  onClick={() => setSelectedDesign(design)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={34} />
              <h2>No designs found</h2>
              <p>Try changing your search or filters.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveType("All");
                  setActiveTool(null);
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </section>
      </div>

      {selectedDesign && (
        <DesignModal
          design={selectedDesign}
          onClose={() => setSelectedDesign(null)}
        />
      )}

      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSwitch={() =>
            setAuthModal(authModal === "login" ? "signup" : "login")
          }
        />
      )}
    </main>
  );
}
