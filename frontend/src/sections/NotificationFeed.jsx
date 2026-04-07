export function NotificationFeed({ notifications, onMarkRead, readLoading }) {
  return (
    <section className="rounded-[32px] bg-panel p-6 shadow-float">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-moss">Notifications</p>
          <h3 className="mt-2 font-display text-2xl font-bold">Reminder feed</h3>
        </div>
        <span className="rounded-full bg-[#efe4d0] px-4 py-2 text-sm text-ink/70">
          {notifications.filter((item) => !item.read).length} unread
        </span>
      </div>

      {notifications.length === 0 ? (
        <div className="mt-5 rounded-[24px] bg-[#f5efe4] px-4 py-4 text-sm text-ink/65">
          No reminder notifications yet. Scheduled reminders will appear here after due items are processed.
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {notifications.map((notification) => (
            <article key={notification.id} className="rounded-[24px] bg-[#f7efdf] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{notification.reelTitle}</p>
                  <p className="mt-1 text-sm text-ink/65">{notification.message}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs text-ink/70">
                  {notification.notificationDate}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <span className={notification.read ? "text-moss" : "text-coral"}>
                  {notification.read ? "Read" : "Unread"}
                </span>
                {!notification.read ? (
                  <button
                    className="text-ink underline"
                    onClick={() => onMarkRead(notification.id)}
                    type="button"
                  >
                    {readLoading === notification.id ? "Marking..." : "Mark as read"}
                  </button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
