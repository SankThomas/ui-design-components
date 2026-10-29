import { X } from "lucide-react";
import type { SubmitEvent } from "react";
import type { Profile } from "../data";

type EditProfileModalProps = {
  profile: Profile;
  onClose: () => void;
  onSave: (profile: Profile) => void;
};

export default function EditProfileModal({
  profile,
  onClose,
  onSave,
}: EditProfileModalProps) {
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onSave({
      ...profile,
      name: String(formData.get("name")).trim(),
      title: String(formData.get("title")).trim(),
      location: String(formData.get("location")).trim(),
      handle: String(formData.get("handle")).trim(),
      website: String(formData.get("website")).trim(),
    });
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-title"
      >
        <div className="modal-heading">
          <div>
            <h2 id="edit-title">Edit profile</h2>
            <p>Update your public profile information.</p>
          </div>

          <button
            className="icon-button"
            type="button"
            aria-label="Close editor"
            onClick={onClose}
          >
            <X size={19} />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label className="form-label">
            Full name
            <input name="name" defaultValue={profile.name} required />
          </label>

          <label className="form-label">
            Professional title
            <input name="title" defaultValue={profile.title} required />
          </label>

          <label className="form-label">
            Location
            <input name="location" defaultValue={profile.location} required />
          </label>

          <label className="form-label">
            Social handle
            <input name="handle" defaultValue={profile.handle} required />
          </label>

          <label className="form-label">
            Website
            <input name="website" defaultValue={profile.website} required />
          </label>

          <div className="modal-actions">
            <button
              className="button button-secondary"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button className="button button-primary" type="submit">
              Save changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
