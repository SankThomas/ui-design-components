import { Check, ChevronDown } from "lucide-react";
import type { PhotoFilter, SortOption, Tab } from "../data";
import { useState } from "react";

type ProfileToolbarProps = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  photoFilter: PhotoFilter;
  setPhotoFilter: (filter: PhotoFilter) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
};

export default function ProfileToolbar({
  activeTab,
  setActiveTab,
  photoFilter,
  setPhotoFilter,
  sortBy,
  setSortBy,
}: ProfileToolbarProps) {
  return (
    <div className="profile-toolbar">
      <nav className="profile-tabs" aria-label="Profile sections">
        {(["Posts", "Albums", "Stats"] as Tab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            className={`tab-button ${activeTab === tab ? "tab-active" : ""}`}
            aria-current={activeTab === tab ? "page" : undefined}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="toolbar-controls">
        <Dropdown<PhotoFilter>
          label="Filter"
          value={photoFilter}
          options={["All photos", "Photos", "Videos"]}
          onChange={setPhotoFilter}
        />

        <Dropdown<SortOption>
          label="Sort by"
          value={sortBy}
          options={["Following", "Popularity", "New"]}
          onChange={setSortBy}
        />
      </div>
    </div>
  );
}

type DropdownProps<T extends string> = {
  label: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
};

function Dropdown<T extends string>({
  label,
  value,
  options,
  onChange,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown-wrap">
      <button
        className={`toolbar-button ${label === "Sort by" ? "sort-button" : ""}`}
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {label} <strong>{value}</strong>
        <ChevronDown size={15} />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="dropdown-dismiss"
            aria-label={`Close ${label.toLowerCase()} menu`}
            onClick={() => setOpen(false)}
          />

          <div className="dropdown-menu">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={`dropdown-option ${
                  value === option ? "dropdown-option-active" : ""
                }`}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                {option}
                {value === option && <Check size={15} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
