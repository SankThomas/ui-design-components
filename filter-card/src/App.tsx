import { useMemo, useState } from "react";
import { MapPin, BriefcaseBusiness } from "lucide-react";
import {
  experienceOptions,
  jobs,
  targetOptions,
  type Experience,
  type Target,
} from "./data";

export default function App() {
  const [location, setLocation] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [targets, setTargets] = useState<Target[]>([]);

  const filteredJobs = useMemo(() => {
    const normalizedLocation = location.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesLocation =
        !normalizedLocation ||
        job.location.toLowerCase().includes(normalizedLocation);

      const matchesExperience =
        experiences.length === 0 || experiences.includes(job.experience);

      const matchesTarget =
        targets.length === 0 || targets.includes(job.target);

      return matchesLocation && matchesExperience && matchesTarget;
    });
  }, [location, experiences, targets]);

  const toggleExperience = (experience: Experience) => {
    setExperiences((current) =>
      current.includes(experience)
        ? current.filter((item) => item !== experience)
        : [...current, experience],
    );
  };

  const toggleTarget = (target: Target) => {
    setTargets((current) =>
      current.includes(target)
        ? current.filter((item) => item !== target)
        : [...current, target],
    );
  };

  const clearFilters = () => {
    setLocation("");
    setExperiences([]);
    setTargets([]);
  };

  return (
    <div className="app">
      <div className="page-container">
        <aside className="filter-wrapper">
          <div className="filter-accent" />

          <div className="filter-card">
            <h1 className="filter-title">Filter</h1>

            <section className="filter-section">
              <label htmlFor="location" className="filter-label">
                Location
              </label>

              <div className="location-wrapper">
                <MapPin className="location-icon" />

                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Eg. London"
                  className="location-input"
                />
              </div>
            </section>

            <section className="filter-section">
              <p className="filter-label">Experience level</p>

              <div className="checkbox-grid">
                {experienceOptions.map((experience) => (
                  <label className="checkbox-label" key={experience}>
                    <input
                      type="checkbox"
                      checked={experiences.includes(experience)}
                      onChange={() => toggleExperience(experience)}
                      className="checkbox"
                    />

                    <span>{experience}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="filter-section">
              <p className="filter-label">Target</p>

              <div className="checkbox-grid">
                {targetOptions.map((target) => (
                  <label className="checkbox-label" key={target}>
                    <input
                      type="checkbox"
                      checked={targets.includes(target)}
                      onChange={() => toggleTarget(target)}
                      className="checkbox"
                    />

                    <span>{target}</span>
                  </label>
                ))}
              </div>
            </section>

            <button
              type="button"
              onClick={clearFilters}
              className="clear-button"
            >
              Clear filters
            </button>
          </div>
        </aside>

        <section className="results-panel">
          <header className="results-header">
            <div>
              <h2 className="results-title">Available opportunities</h2>
              <p className="results-count">
                {filteredJobs.length}&nbsp;
                {filteredJobs.length === 1 ? "result" : "results"} found
              </p>
            </div>
          </header>

          {filteredJobs.length > 0 ? (
            <div className="jobs-list">
              {filteredJobs.map((job) => (
                <article className="job-card" key={job.id}>
                  <div className="job-card-top">
                    <div>
                      <h3 className="job-title">{job.title}</h3>
                      <p className="company">{job.company}</p>
                    </div>

                    <BriefcaseBusiness className="size-5 shrink-0 text-[#6666a0]" />
                  </div>

                  <div className="job-location">
                    <MapPin className="size-4" />
                    <span>{job.location}</span>
                  </div>

                  <div className="job-meta">
                    <span className="badge">{job.experience}</span>
                    <span className="badge target-badge">{job.target}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3 className="empty-title">No opportunities found</h3>
              <p className="empty-text">
                Try changing your filters or clearing them to see more
                opportunities.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
