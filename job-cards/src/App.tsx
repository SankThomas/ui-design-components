import { useEffect, useState, type SyntheticEvent } from "react";
import { departments, type Department } from "./data";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Send,
  BriefcaseBusiness,
  Clock,
  MapPin,
  X,
} from "lucide-react";

type View = "jobs" | "details" | "apply";

type ApplicationForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialForm: ApplicationForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function App() {
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [view, setView] = useState<View>("jobs");
  const [form, setForm] = useState<ApplicationForm>(initialForm);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close the modal when you press Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (selectedDepartment) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedDepartment]);

  // Prevent the page from scrolling when the modal is open
  useEffect(() => {
    if (selectedDepartment) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedDepartment]);

  const closeModal = () => {
    setSelectedDepartment(null);
    setSelectedJob(null);
    setView("jobs");
    setForm(initialForm);
    setIsSubmitted(false);
  };

  const openJob = (job: string) => {
    setSelectedJob(job);
    setView("details");
  };

  const openApplication = () => {
    setView("apply");
    setIsSubmitted(false);
  };

  const goBack = () => {
    if (view === "apply") {
      setView("details");
      return;
    }

    if (view === "details") {
      setSelectedJob(null);
      setView("jobs");
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: selectedJob,
          body: form.message,
          userId: 1,
          applicantName: form.name,
          applicantEmail: form.email,
          applicantPhone: form.phone,
          department: selectedDepartment?.name,
        }),
      });

      const data = await response.json();

      console.log("API status:", response.status);
      console.log("API response:", data);

      if (!response.ok) {
        throw new Error(
          data?.message || `Request failed with status ${response.status}`,
        );
      }

      console.log("Application successfully submitted:", data);

      setIsSubmitted(true);
    } catch (error) {
      console.error("Application submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedIcon = selectedDepartment?.icon;
  const SelectedIcon = selectedIcon;

  return (
    <main className="jobs-page">
      <section className="jobs-section">
        <div className="jobs-container">
          <header className="jobs-header">
            <h1 className="jobs-title">Open positions</h1>
          </header>

          <div className="department-grid">
            {departments.map((department) => {
              const Icon = department.icon;

              return (
                <article className="department-card" key={department.name}>
                  <div className="department-heading">
                    <div className={`department-icon ${department.iconClass}`}>
                      <Icon size={23} strokeWidth={1.8} />
                    </div>

                    <h2 className="department-name">{department.name}</h2>
                  </div>

                  <button
                    type="button"
                    className={`positions-button ${department.name === "Engineering" ? "positions-button-active" : ""}`}
                    onClick={() => setSelectedDepartment(department)}
                    aria-label={`View ${department.positions} open positions in ${department.name}`}
                  >
                    {department.positions} open positions
                  </button>
                </article>
              );
            })}
          </div>

          <p className="equal-opportunity">
            We are proud to be an equal opportunity employer that values
            diversity. We do not discriminate on the basis of race, religion,
            color, national origin, gender, sexual orientation, age, marital
            status, veteran status, or disability status.
          </p>
        </div>
      </section>

      {selectedDepartment && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="jobs-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="jobs-modal-title"
          >
            {view === "jobs" && (
              <>
                <div className="modal-header">
                  <div className="flex items-center gap-3">
                    {SelectedIcon && (
                      <div
                        className={`department-icon ${selectedDepartment.iconClass} size-11`}
                      >
                        <SelectedIcon size={19} strokeWidth={1.8} />
                      </div>
                    )}

                    <div>
                      <p className="modal-eyebrow">Open positions</p>

                      <h2 id="jobs-modal-title" className="modal-title">
                        {selectedDepartment.name}
                      </h2>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="modal-close"
                    onClick={closeModal}
                    aria-label="Close positions"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="job-list">
                  {selectedDepartment.jobs.map((job) => (
                    <button
                      type="button"
                      className="job-item"
                      key={job}
                      onClick={() => openJob(job)}
                    >
                      <div className="job-item-content">
                        <BriefcaseBusiness size={18} />

                        <div>
                          <h3>{job}</h3>

                          <div className="job-meta">
                            <span>
                              <MapPin size={14} /> Nairobi / Remote
                            </span>

                            <span>
                              <Clock size={14} /> Full-time
                            </span>
                          </div>
                        </div>
                      </div>

                      <ArrowRight size={14} />
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Job details */}
            {view === "details" && selectedJob && (
              <>
                <div className="modal-header">
                  <button
                    type="button"
                    className="modal-back-button"
                    onClick={goBack}
                  >
                    <ArrowLeft size={17} /> Back to positions
                  </button>

                  <button
                    type="button"
                    className="modal-close"
                    onClick={closeModal}
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="job-details">
                  <div className="job-details-icon">
                    <BriefcaseBusiness size={24} />
                  </div>

                  <p className="modal-eyebrow">{selectedDepartment.name}</p>

                  <h2 className="modal-title">{selectedJob}</h2>

                  <div className="job-details-meta">
                    <span>
                      <MapPin size={16} />
                      Nairobi / Remote
                    </span>

                    <span>
                      <Clock size={16} />
                      Full-time
                    </span>

                    <span>
                      <BriefcaseBusiness size={16} />
                      {selectedDepartment.name}
                    </span>
                  </div>

                  <div className="job-description">
                    <h3>About the role</h3>
                    <p>
                      We are looking for a talented and motivated professional
                      to join our {selectedDepartment.name.toLowerCase()} team
                      as a {selectedJob}
                    </p>

                    <p>
                      You will work closely with other members of the team to
                      deliver high-quality work, solve meaningful problems, and
                      contribute to the growth of the organization.
                    </p>

                    <h3>What you'll do</h3>

                    <ul>
                      <li>Collaborate with cross-functional team members.</li>
                      <li>
                        Contribute to projects and day-to-day initiatives.
                      </li>
                      <li>Help improve processes and deliverables.</li>
                      <li>Communicate clearly with stakeholders.</li>
                    </ul>

                    <h3>What we're looking for</h3>

                    <ul>
                      <li>Strong communication and collaboration skills.</li>
                      <li>
                        Ability to work independently and as part of a team.
                      </li>
                      <li>A proactive approach to solving problems.</li>
                      <li>Strong attention to detail.</li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    className="apply-button"
                    onClick={openApplication}
                  >
                    Apply for this position
                    <ArrowRight size={17} />
                  </button>
                </div>
              </>
            )}

            {/* Application form */}
            {view === "apply" && selectedJob && !isSubmitted && (
              <>
                <div className="modal-header">
                  <button
                    type="button"
                    className="modal-back-button"
                    onClick={goBack}
                  >
                    <ArrowLeft size={17} /> Back to job
                  </button>

                  <button
                    type="button"
                    className="modal-close"
                    onClick={closeModal}
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="application-form">
                  <div className="application-heading">
                    <p className="modal-eyebrow">Application</p>

                    <h2 className="modal-title">{selectedJob}</h2>

                    <p>Complete the form to appy for this position</p>
                  </div>

                  <div className="form-grid">
                    <label className="form-field">
                      <span>Full name</span>

                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                      />
                    </label>

                    <label className="form-field">
                      <span>Email address</span>

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                      />
                    </label>

                    <label className="form-field">
                      <span>Phone number</span>

                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        placeholder="+254 700 000 000"
                        required
                      />
                    </label>

                    <label className="form-field form-field-full">
                      <span>Why are you interested in this role?</span>

                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleInputChange}
                        placeholder="Tell us briefly about yourself and why you would be a good fit..."
                        rows={5}
                        required
                      />
                    </label>
                  </div>

                  <div className="application-actions">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={goBack}
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      className="apply-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          Submit application
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Success */}
            {view === "apply" && isSubmitted && (
              <div className="application-success">
                <div className="success-icon">
                  <CheckCircle2 size={32} />
                </div>

                <p className="modal-eyebrow">Application submitted</p>

                <h2 className="modal-title">Thank you, {form.name}</h2>

                <p>
                  Your application for <strong>{selectedJob}</strong> has been
                  received. We will review your application and get back to you
                  if your experience matches what we're looking for.
                </p>

                <button
                  type="button"
                  className="apply-button"
                  onClick={closeModal}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
