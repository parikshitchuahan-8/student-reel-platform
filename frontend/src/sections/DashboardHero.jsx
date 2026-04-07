export function DashboardHero({ dashboard }) {
  const stats = [
    { label: "Tasks due today", value: dashboard.tasksDueToday },
    { label: "Focus minutes", value: dashboard.focusMinutesToday },
    { label: "Streak days", value: dashboard.streakDays },
    { label: "Completion rate", value: `${dashboard.completionRate}%` }
  ];

  return (
    <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="overflow-hidden rounded-[32px] bg-ink px-6 py-8 text-white shadow-float">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Personal dashboard</p>
        <h2 className="mt-3 max-w-xl font-display text-4xl font-bold leading-tight">
          Hello {dashboard.studentName}, your academic day is structured and ready.
        </h2>
        <p className="mt-4 max-w-2xl text-white/75">
          Plan assignments, collaborate in study rooms, revise with short reels, and use AI where it adds real value.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-[28px] border border-black/5 bg-panel p-5 shadow-float">
            <p className="text-sm text-ink/60">{stat.label}</p>
            <p className="mt-3 font-display text-4xl font-bold">{stat.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
