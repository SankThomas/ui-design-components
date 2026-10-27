import { ArrowUpRight, ChevronRight, X } from "lucide-react";
import { MENU_ITEMS, type MenuEntry } from "./data";
import { useEffect, useRef } from "react";

export default function ProfileMenu({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (item: MenuEntry) => void;
}) {
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (!menuRef.current) return;

      const items = Array.from(
        menuRef.current.querySelectorAll<HTMLButtonElement>(
          '[role="menuitem"]',
        ),
      );

      const currentIndex = items.indexOf(
        document.activeElement as HTMLButtonElement,
      );

      if (event.key === "ArrowDown") {
        event.preventDefault();
        items[(currentIndex + 1) % items.length]?.focus();
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        items[(currentIndex - 1 + items.length) % items.length]?.focus();
      }

      if (event.key === "Home") {
        event.preventDefault();
        items[0]?.focus();
      }

      if (event.key === "End") {
        event.preventDefault();
        items[items.length - 1]?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <nav
      className="profile-menu"
      ref={menuRef}
      aria-label="Account navigation"
      role="menu"
    >
      <div className="menu-heading">
        <span className="menu-eyebrow">YOUR ACCOUNT</span>
        <button
          className="menu-close"
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X aria-hidden="true" />
        </button>
      </div>

      <div className="menu-items">
        {MENU_ITEMS.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`menu-item ${index === 2 ? "menu-item-highlight" : ""}`}
              type="button"
              role="menuitem"
              onClick={() => onSelect(item)}
            >
              <span className="menu-icon">
                {Icon ? (
                  <Icon aria-hidden="true" />
                ) : (
                  <ArrowUpRight aria-hidden="true" />
                )}
              </span>

              <span className="menu-item-copy">
                <span className="menu-item-label">{item.label}</span>
                {index === 2 && (
                  <span className="menu-item-description">
                    Customize your experience
                  </span>
                )}
              </span>

              <ChevronRight className="menu-arrow" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div className="menu-footer">
        <span className="menu-footer-dot" />
        <span>Profile menu</span>
        <span className="menu-footer-version">v1.0</span>
      </div>
    </nav>
  );
}
