import { Ellipsis, Pencil, Smile, type LucideIcon } from "lucide-react";

export default function ProfileActions({
  onStatus,
  onEdit,
  onToggleMenu,
  menuOpen,
}: {
  onStatus: () => void;
  onEdit: () => void;
  onToggleMenu: () => void;
  menuOpen: boolean;
}) {
  const actions: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    expanded?: boolean;
  }[] = [
    { label: "Set a status", icon: Smile, onClick: onStatus },
    { label: "Edit profile", icon: Pencil, onClick: onEdit },
    {
      label: "More",
      icon: Ellipsis,
      onClick: onToggleMenu,
      expanded: menuOpen,
    },
  ];

  return (
    <div className="profile-actions">
      {actions.map(({ label, icon: Icon, onClick, expanded }) => (
        <button
          key={label}
          className={`profile-action ${expanded ? "profile-action-active" : ""}`}
          type="button"
          onClick={onClick}
          aria-label={label}
          aria-expanded={expanded}
          aria-haspopup={label === "More" ? "menu" : undefined}
        >
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
