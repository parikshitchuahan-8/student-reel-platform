export function ReminderPanel({ dueReels }) {
  const reminderItems = dueReels.filter((reel) => reel.reminderEnabled);

  return (
    <section className="rounded-[32px] bg-[#ffe5c9] p-6 shadow-float">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-coral">Reminders</p>
          <h3 className="mt-2 font-display text-2xl font-bold">In-app study nudges</h3>
        </div>
        <span className="rounded-full bg-white px-4 py-2 text-sm text-ink/70">
          {reminderItems.length} active
        </span>
      </div>

      {reminderItems.length === 0 ? (
        <div className="mt-5 rounded-[24px] bg-white px-4 py-4 text-sm text-ink/65">
          No reminder nudges are active for due revision items right now.
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {reminderItems.map((reel) => (
            <article key={`reminder-${reel.id}`} className="rounded-[24px] bg-white p-4">
              <p className="font-semibold">{reel.title}</p>
              <p className="mt-1 text-sm text-ink/65">
                Due today. Review this reel before the day ends to stay on schedule.
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
