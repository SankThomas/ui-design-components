import {
  Bell,
  Check,
  CheckCheck,
  ChevronDown,
  Moon,
  Settings2,
  Sun,
  Trash2,
  Undo2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  defaultPreferences,
  STORAGE_KEY,
  type Category,
  type Filter,
  type NotificationItem,
  type StoredState,
} from "./data";
import { getInitialState, relativeTime } from "./utils";

export default function App() {
  const [storedState, setStoredState] = useState(getInitialState);
  const [isOpen, setIsOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [showSettings, setShowSettings] = useState(false);
  const [toast, setToast] = useState("");
  const [lastDismissed, setLastDismissed] = useState<NotificationItem | null>(
    null,
  );
  const [browserPermission, setBrowserPermission] = useState<
    NotificationPermission | "unsupported"
  >(
    typeof window !== "undefined" && "Notification" in window
      ? Notification.permission
      : "unsupported",
  );

  const panelRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { notifications, preferences, darkMode } = storedState;

  const updateState = useCallback(
    (updater: (state: StoredState) => StoredState) => {
      setStoredState(updater);
    },
    [],
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedState));
  }, [storedState]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        setShowSettings(false);
      }
    }

    function handleOutsideClick(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowSettings(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const showToast = useCallback((message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToast(message);

    toastTimeoutRef.current = setTimeout(() => {
      setToast("");
    }, 3500);
  }, []);

  const unreadCount = notifications.filter(
    (item) => !item.read && !item.archived,
  ).length;

  const visibleNotifications = useMemo(() => {
    return notifications
      .filter((item) => {
        if (!preferences[item.category]) return false;

        if (activeFilter === "Unread") {
          return !item.read && !item.archived;
        }

        if (activeFilter === "Archived") {
          return item.archived;
        }

        return !item.archived;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [notifications, preferences, activeFilter]);

  function togglePanel() {
    setIsOpen((open) => !open);
    setShowSettings(false);
  }

  function markAsRead(id: string) {
    updateState((state) => ({
      ...state,
      notifications: state.notifications.map((item) =>
        item.id === id ? { ...item, read: true } : item,
      ),
    }));
  }

  function markAllAsRead() {
    updateState((state) => ({
      ...state,
      notifications: state.notifications.map((item) =>
        item.archived ? item : { ...item, read: true },
      ),
    }));

    showToast("All notifications marked as read.");
  }

  function dismissNotification(id: string) {
    const target = notifications.find((item) => item.id === id);
    if (!target) return;

    setLastDismissed(target);

    updateState((state) => ({
      ...state,
      notifications: state.notifications.filter((item) => item.id !== id),
    }));

    showToast("Notification dismissed.");
  }

  function undoDismissal() {
    if (!lastDismissed) return;

    updateState((state) => ({
      ...state,
      notifications: [...state.notifications, lastDismissed],
    }));

    setLastDismissed(null);
    setToast("");
  }

  function archiveNotification(id: string) {
    updateState((state) => ({
      ...state,
      notifications: state.notifications.map((item) =>
        item.id === id ? { ...item, archived: true } : item,
      ),
    }));

    showToast("Notification archived.");
  }

  function togglePreference(category: Category) {
    updateState((state) => ({
      ...state,
      preferences: {
        ...state.preferences,
        [category]: !state.preferences[category],
      },
    }));
  }

  function toggleTheme() {
    updateState((state) => ({
      ...state,
      darkMode: !state.darkMode,
    }));
  }

  async function enableBrowserNotifications() {
    if (!("Notification" in window)) {
      showToast("Browser notifications are not supported.");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setBrowserPermission(permission);

      if (permission === "granted") {
        new Notification("Notifications enabled", {
          body: "You'll receive browser notifications when supported.",
        });
        showToast("Browser notifications enabled.");
      } else {
        showToast(
          permission === "denied"
            ? "Notifications are blocked in your browser settings."
            : "Notification permission was not granted.",
        );
      }
    } catch {
      showToast("Could not enable browser notifications.");
    }
  }

  function shareOnTwitter() {
    const text = encodeURIComponent(
      "If you like what we do, please tell your friends and share.",
    );

    window.open(
      `https://twitter.com/intent/tweet?text=${text}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function performAction(item: NotificationItem) {
    markAsRead(item.id);

    if (item.actionUrl) {
      window.open(item.actionUrl, "_blank", "noopener,noreferrer");
      return;
    }

    if (item.category === "Messages") {
      showToast("This is a demo: connect a messaging page to continue.");
    } else if (item.category === "Updates") {
      showToast("This is a demo: connect your project page to continue.");
    } else if (item.category === "Reminders") {
      showToast("This is a demo: connect your task list to continue.");
    } else {
      showToast("You're all caught up.");
    }
  }

  return (
    <main className={`notification-page ${darkMode ? "theme-dark" : ""}`}>
      <div className="notification-scene" ref={panelRef}>
        <div className="notification-backdrop" aria-hidden="true" />

        <button
          type="button"
          className={`notification-bell ${
            unreadCount > 0 ? "notification-bell--unread" : ""
          }`}
          onClick={togglePanel}
          aria-label={`Notifications, ${unreadCount} unread`}
          aria-expanded={isOpen}
          aria-controls="notification-panel"
        >
          <Bell size={26} strokeWidth={1.8} />

          {unreadCount > 0 && (
            <span className="notification-badge">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>

        {isOpen && (
          <section
            id="notification-panel"
            className="notification-card"
            aria-label="Notification center"
          >
            <header className="notification-card-header">
              <div>
                <h1 className="notification-title">Notifications</h1>
                <p className="notification-subtitle">
                  {unreadCount > 0
                    ? `You have ${unreadCount} unread ${
                        unreadCount === 1 ? "notification" : "notifications"
                      }`
                    : "You're all caught up"}
                </p>
              </div>

              <div className="notification-header-actions">
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => setShowSettings((value) => !value)}
                  aria-label="Notification settings"
                  aria-expanded={showSettings}
                  title="Settings"
                >
                  <Settings2 size={19} />
                </button>

                <button
                  type="button"
                  className="icon-button"
                  onClick={toggleTheme}
                  aria-label={
                    darkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                  title={darkMode ? "Light mode" : "Dark mode"}
                >
                  {darkMode ? <Sun size={19} /> : <Moon size={19} />}
                </button>

                <button
                  type="button"
                  className="icon-button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close notifications"
                >
                  <X size={19} />
                </button>
              </div>
            </header>

            {showSettings ? (
              <div className="notification-settings">
                <div className="settings-heading">
                  <div>
                    <h2>Preferences</h2>
                    <p>Choose which notifications to show.</p>
                  </div>
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => setShowSettings(false)}
                    aria-label="Close settings"
                  >
                    <X size={18} />
                  </button>
                </div>

                {(Object.keys(defaultPreferences) as Category[]).map(
                  (category) => (
                    <label className="preference-row" key={category}>
                      <span>{category}</span>
                      <input
                        type="checkbox"
                        checked={preferences[category]}
                        onChange={() => togglePreference(category)}
                      />
                    </label>
                  ),
                )}

                <div className="browser-notification-setting">
                  <div>
                    <strong>Browser notifications</strong>
                    <p>
                      {browserPermission === "granted"
                        ? "Permission granted"
                        : browserPermission === "denied"
                          ? "Blocked by browser"
                          : browserPermission === "unsupported"
                            ? "Not supported"
                            : "Optional desktop alerts"}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="settings-action"
                    onClick={enableBrowserNotifications}
                    disabled={
                      browserPermission === "granted" ||
                      browserPermission === "unsupported"
                    }
                  >
                    {browserPermission === "granted" ? "Enabled" : "Enable"}
                  </button>
                </div>

                <button
                  type="button"
                  className="settings-done"
                  onClick={() => setShowSettings(false)}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <nav
                  className="notification-tabs"
                  aria-label="Filter notifications"
                >
                  {(["All", "Unread", "Archived"] as Filter[]).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      className={`notification-tab ${
                        activeFilter === filter
                          ? "notification-tab--active"
                          : ""
                      }`}
                      onClick={() => setActiveFilter(filter)}
                      aria-pressed={activeFilter === filter}
                    >
                      {filter}
                      {filter === "Unread" && unreadCount > 0 && (
                        <span className="tab-count">{unreadCount}</span>
                      )}
                    </button>
                  ))}
                </nav>

                <div className="notification-toolbar">
                  <span className="notification-list-label">
                    {activeFilter === "Archived"
                      ? "Archived"
                      : activeFilter === "Unread"
                        ? "Unread messages"
                        : "Recent activity"}
                  </span>

                  {unreadCount > 0 && activeFilter !== "Archived" && (
                    <button
                      type="button"
                      className="text-action"
                      onClick={markAllAsRead}
                    >
                      <CheckCheck size={15} />
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="notification-list">
                  {visibleNotifications.map((item) => {
                    const ItemIcon = item.icon;

                    return (
                      <article
                        key={item.id}
                        className={`notification-item ${
                          !item.read ? "notification-item--unread" : ""
                        }`}
                      >
                        <div
                          className="notification-icon"
                          style={{
                            color: item.color,
                            backgroundColor: item.background,
                          }}
                        >
                          <ItemIcon size={24} strokeWidth={1.8} />
                        </div>

                        <div className="notification-details">
                          <div className="notification-item-heading">
                            <h2 className="notification-item-title">
                              {item.title}
                            </h2>
                            {!item.read && (
                              <span
                                className="unread-dot"
                                aria-label="Unread"
                              />
                            )}
                          </div>

                          <p className="notification-message">{item.message}</p>

                          <div className="notification-meta">
                            <time dateTime={item.date}>
                              {relativeTime(item.date)}
                            </time>
                            <span>{item.category}</span>
                          </div>

                          <div className="notification-item-actions">
                            {item.actionLabel && !item.archived && (
                              <button
                                type="button"
                                className="inline-action"
                                onClick={() => performAction(item)}
                              >
                                {item.actionLabel}
                              </button>
                            )}

                            {!item.read && (
                              <button
                                type="button"
                                className="inline-action inline-action--muted"
                                onClick={() => {
                                  markAsRead(item.id);
                                  showToast("Marked as read.");
                                }}
                              >
                                Mark read
                              </button>
                            )}

                            {!item.archived && (
                              <button
                                type="button"
                                className="item-icon-action"
                                onClick={() => archiveNotification(item.id)}
                                aria-label={`Archive ${item.title}`}
                                title="Archive"
                              >
                                <ChevronDown size={16} />
                              </button>
                            )}

                            <button
                              type="button"
                              className="item-icon-action"
                              onClick={() => dismissNotification(item.id)}
                              aria-label={`Dismiss ${item.title}`}
                              title="Dismiss"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}

                  {visibleNotifications.length === 0 && (
                    <div className="notification-empty">
                      <div className="empty-icon">
                        <Check size={24} />
                      </div>
                      <h2>
                        {activeFilter === "Archived"
                          ? "Nothing archived yet"
                          : activeFilter === "Unread"
                            ? "You're all caught up"
                            : "No notifications"}
                      </h2>
                      <p>
                        {activeFilter === "Unread"
                          ? "New unread notifications will appear here."
                          : "There is nothing to show in this view."}
                      </p>

                      {activeFilter !== "All" && (
                        <button
                          type="button"
                          className="inline-action"
                          onClick={() => setActiveFilter("All")}
                        >
                          View all notifications
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <footer className="notification-footer">
                  <button
                    type="button"
                    className="footer-action"
                    onClick={shareOnTwitter}
                  >
                    Share on Twitter
                  </button>
                  <span className="footer-divider" />
                  <button
                    type="button"
                    className="footer-action"
                    onClick={shareOnFacebook}
                  >
                    Share on Facebook
                  </button>
                </footer>
              </>
            )}
          </section>
        )}
      </div>

      {toast && (
        <div className="toast-message" role="status" aria-live="polite">
          <Check size={17} />
          <span>{toast}</span>
          {lastDismissed && toast === "Notification dismissed." && (
            <button
              type="button"
              className="toast-undo"
              onClick={undoDismissal}
            >
              <Undo2 size={15} />
              Undo
            </button>
          )}
          <button
            type="button"
            className="toast-close"
            onClick={() => setToast("")}
            aria-label="Dismiss message"
          >
            <X size={15} />
          </button>
        </div>
      )}
    </main>
  );
}
