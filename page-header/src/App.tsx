import { useMemo, useState, type FormEvent } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Pencil,
  Plus,
  Search,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import type { Parameter, ParameterForm, Tab } from "./types";
import { emptyForm, initialParameters, PAGE_SIZE, tabs } from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("My parameters");
  const [parameters, setParameters] = useState<Parameter[]>(initialParameters);
  const [query, setQuery] = useState("auth0");
  const [filterEnabled, setFilterEnabled] = useState(true);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showValues, setShowValues] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [form, setForm] = useState<ParameterForm>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [notice, setNotice] = useState("");

  const visibleParameters = useMemo(() => {
    return parameters.filter((parameter) => {
      const matchesTab =
        activeTab === "Configurations" ||
        (activeTab === "Public"
          ? parameter.visibility === "Public"
          : parameter.visibility === "Private");

      const matchesSearch =
        `${parameter.name} ${parameter.value} ${parameter.description}`
          .toLowerCase()
          .includes(query.trim().toLowerCase());

      const matchesFilter =
        !filterEnabled ||
        activeTab !== "My parameters" ||
        parameter.name.toLowerCase().includes("auth0");

      return matchesTab && matchesSearch && matchesFilter;
    });
  }, [activeTab, filterEnabled, parameters, query]);

  const totalPages = Math.max(
    1,
    Math.ceil(visibleParameters.length / PAGE_SIZE),
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedParameters = visibleParameters.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function changeTab(tab: Tab) {
    setActiveTab(tab);
    setPage(1);
    setSelectedIds([]);
    setSettingsOpen(false);
  }

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit() {
    const selected = parameters.find(
      (parameter) => parameter.id === selectedIds[0],
    );

    if (!selected) {
      setNotice("Select a parameter to edit.");
      return;
    }

    setEditingId(selected.id);
    setForm({
      name: selected.name,
      value: selected.value,
      description: selected.description,
      visibility: selected.visibility,
    });
    setModalOpen(true);
  }

  function saveParameter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();

    if (!name) return;

    if (
      parameters.some(
        (parameter) =>
          parameter.name.toLowerCase() === name.toLowerCase() &&
          parameter.id !== editingId,
      )
    ) {
      setNotice("A parameter with this name already exists.");
      return;
    }

    if (editingId) {
      setParameters((current) =>
        current.map((parameter) =>
          parameter.id === editingId
            ? { ...parameter, ...form, name }
            : parameter,
        ),
      );
      setNotice("Parameter updated successfully.");
    } else {
      setParameters((current) => [
        ...current,
        {
          ...form,
          name,
          id: crypto.randomUUID(),
        },
      ]);
      setNotice("Parameter created successfully.");
    }

    setModalOpen(false);
    setEditingId(null);
    setSelectedIds([]);
    setPage(1);
  }

  function deleteSelected() {
    if (selectedIds.length === 0) {
      setNotice("Select at least one parameter to delete.");
      return;
    }

    setDeleteConfirm(true);
  }

  function confirmDelete() {
    setParameters((current) =>
      current.filter((parameter) => !selectedIds.includes(parameter.id)),
    );
    setSelectedIds([]);
    setDeleteConfirm(false);
    setNotice("Selected parameters deleted.");
  }

  function toggleSelection(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function clearFilters() {
    setQuery("");
    setFilterEnabled(false);
    setPage(1);
  }

  function copyValue(value: string) {
    void navigator.clipboard
      .writeText(value)
      .then(() => setNotice("Value copied to clipboard."))
      .catch(() => setNotice("Unable to copy the value."));
  }

  function dismissNotice() {
    setNotice("");
  }

  return (
    <main className="page-shell">
      <div className="backdrop-accent" aria-hidden="true" />

      <section
        className={`parameters-panel ${compactMode ? "is-compact" : ""}`}
      >
        <nav className="tabs" aria-label="Parameter sections">
          {tabs.map((tab) => (
            <button
              className={`tab ${activeTab === tab ? "tab-active" : ""}`}
              key={tab}
              onClick={() => changeTab(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </nav>

        <header className="panel-toolbar">
          <h1 className="panel-title">
            {activeTab === "Configurations" ? "Configurations" : activeTab}
          </h1>

          <div className="action-buttons">
            <button className="button button-outline" onClick={openEdit}>
              <Pencil size={20} strokeWidth={1.8} />
              <span>Edit</span>
            </button>

            <button className="button button-outline" onClick={deleteSelected}>
              <Trash2 size={21} strokeWidth={1.8} />
              <span>Delete</span>
            </button>

            <button className="button button-primary" onClick={openCreate}>
              <Plus className="create-icon" size={18} />
              <span>Create parameter</span>
            </button>
          </div>
        </header>

        {activeTab === "Configurations" ? (
          <section className="configuration-content">
            <h2 className="section-heading">Display preferences</h2>
            <p className="section-description">
              Customize how parameters are displayed in this workspace.
            </p>

            <label className="setting-row">
              <span>
                <strong>Show parameter values</strong>
                <small>Display values in the parameter list.</small>
              </span>

              <input
                checked={showValues}
                onChange={(event) => setShowValues(event.target.checked)}
                type="checkbox"
              />
            </label>

            <label className="setting-row">
              <span>
                <strong>Compact mode</strong>
                <small>Reduce the spacing between interface elements.</small>
              </span>
              <input
                checked={compactMode}
                onChange={(event) => setCompactMode(event.target.checked)}
                type="checkbox"
              />
            </label>

            <button
              className="button button-outline reset-button"
              onClick={() => {
                setShowValues(true);
                setCompactMode(false);
                setNotice("Display preferences reset.");
              }}
            >
              Reset preferences
            </button>
          </section>
        ) : (
          <>
            <div className="search-toolbar">
              <label className="search-box">
                <Search size={25} strokeWidth={1.8} />
                <input
                  aria-label="Search parameters"
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search"
                  type="search"
                  value={query}
                />

                {query && (
                  <button
                    aria-label="Clear search"
                    className="search-clear"
                    onClick={() => {
                      setQuery("");
                      setPage(1);
                    }}
                    type="button"
                  >
                    <X size={17} />
                  </button>
                )}
              </label>

              <div className="search-controls">
                <div className="pagination">
                  <button
                    aria-label="Previous page"
                    className="icon-button"
                    disabled={currentPage <= 1}
                    onClick={() => setPage((value) => Math.max(1, value - 1))}
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <span className="page-number">{currentPage}</span>

                  <button
                    aria-label="Next page"
                    className="icon-button"
                    disabled={currentPage >= totalPages}
                    onClick={() =>
                      setPage((value) => Math.min(totalPages, value + 1))
                    }
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>

                <div className="settings-wrapper">
                  <button
                    aria-expanded={settingsOpen}
                    aria-label="Search settings"
                    className="icon-button settings-button"
                    onClick={() => setSettingsOpen((open) => !open)}
                  >
                    <Settings size={23} strokeWidth={1.8} />
                  </button>

                  {settingsOpen && (
                    <div className="settings-popover">
                      <h3>Search settings</h3>
                      <label className="popover-setting">
                        <input
                          checked={filterEnabled}
                          onChange={(event) => {
                            setFilterEnabled(event.target.checked);
                            setPage(1);
                          }}
                          type="checkbox"
                        />
                        <span>Filter names containing auth0</span>
                      </label>
                      <p>
                        {visibleParameters.length} matching parameter
                        {visibleParameters.length === 1 ? "" : "s"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="filter-row">
              {filterEnabled && activeTab === "My parameters" && (
                <button
                  className="filter-chip"
                  onClick={() => {
                    setFilterEnabled(false);
                    setPage(1);
                  }}
                  type="button"
                >
                  <span>Name: contains: auth0</span>
                  <X size={16} />
                </button>
              )}

              <button
                className="button button-small"
                onClick={clearFilters}
                type="button"
              >
                Clear filters
              </button>
            </div>

            {paginatedParameters.length > 0 && (
              <section className="results-list" aria-label="Parameters">
                <div className="results-heading">
                  <span>Parameter</span>
                  <span>Value</span>
                </div>

                {paginatedParameters.map((parameter) => (
                  <article
                    className={`parameter-row ${
                      selectedIds.includes(parameter.id) ? "row-selected" : ""
                    }`}
                    key={parameter.id}
                  >
                    <label className="parameter-name">
                      <input
                        checked={selectedIds.includes(parameter.id)}
                        onChange={() => toggleSelection(parameter.id)}
                        type="checkbox"
                      />
                      <span>
                        <strong>{parameter.name}</strong>
                        <small>{parameter.description}</small>
                      </span>
                    </label>

                    <div className="parameter-value">
                      <span>{showValues ? parameter.value : "••••••••"}</span>
                      <button
                        aria-label={`Copy ${parameter.name} value`}
                        className="icon-button copy-button"
                        onClick={() => copyValue(parameter.value)}
                        type="button"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </section>
            )}

            <div className="results-summary">
              {visibleParameters.length === 0
                ? "No parameters match your search."
                : `Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(
                    currentPage * PAGE_SIZE,
                    visibleParameters.length,
                  )} of ${visibleParameters.length} parameters`}
            </div>
          </>
        )}
      </section>

      {notice && (
        <div className="toast" role="status">
          <Check size={17} />
          <span>{notice}</span>
          <button aria-label="Dismiss notification" onClick={dismissNotice}>
            <X size={16} />
          </button>
        </div>
      )}

      {modalOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setModalOpen(false);
          }}
        >
          <section
            aria-labelledby="parameter-dialog-title"
            aria-modal="true"
            className="dialog"
            role="dialog"
          >
            <header className="dialog-header">
              <div>
                <h2 id="parameter-dialog-title">
                  {editingId ? "Edit parameter" : "Create parameter"}
                </h2>
                <p>
                  {editingId
                    ? "Update the details for this parameter."
                    : "Add a new parameter to your workspace."}
                </p>
              </div>
              <button
                aria-label="Close dialog"
                className="icon-button"
                onClick={() => setModalOpen(false)}
              >
                <X size={20} />
              </button>
            </header>

            <form className="parameter-form" onSubmit={saveParameter}>
              <label className="form-field">
                <span>Name</span>
                <input
                  autoFocus
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder="e.g. auth0_domain"
                  required
                  value={form.name}
                />
              </label>

              <label className="form-field">
                <span>Value</span>
                <input
                  onChange={(event) =>
                    setForm({ ...form, value: event.target.value })
                  }
                  placeholder="Enter parameter value"
                  required
                  value={form.value}
                />
              </label>

              <label className="form-field">
                <span>Description</span>
                <textarea
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                  placeholder="What is this parameter used for?"
                  rows={3}
                  value={form.description}
                />
              </label>

              <label className="form-field">
                <span>Visibility</span>
                <select
                  onChange={(event) =>
                    setForm({
                      ...form,
                      visibility: event.target.value as Parameter["visibility"],
                    })
                  }
                  value={form.visibility}
                >
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                </select>
              </label>

              <footer className="dialog-actions">
                <button
                  className="button button-outline"
                  onClick={() => setModalOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button className="button button-primary" type="submit">
                  {editingId ? "Save changes" : "Create parameter"}
                </button>
              </footer>
            </form>
          </section>
        </div>
      )}

      {deleteConfirm && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDeleteConfirm(false);
          }}
        >
          <section
            aria-labelledby="delete-dialog-title"
            aria-modal="true"
            className="dialog delete-dialog"
            role="alertdialog"
          >
            <h2 id="delete-dialog-title">Delete selected parameters?</h2>
            <p>
              This will permanently remove {selectedIds.length} selected
              parameter{selectedIds.length === 1 ? "" : "s"} from this
              workspace.
            </p>
            <footer className="dialog-actions">
              <button
                className="button button-outline"
                onClick={() => setDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button className="button button-danger" onClick={confirmDelete}>
                <Trash2 size={17} />
                Delete
              </button>
            </footer>
          </section>
        </div>
      )}
    </main>
  );
}
