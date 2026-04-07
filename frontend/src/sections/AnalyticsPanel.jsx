export function AnalyticsPanel({ dashboard }) {
  const insights = [
    `You are ${100 - dashboard.tasksDueToday}% less likely to slip when evening planning is done before 6 PM.`,
    "Database work needs earlier starts; long sessions are getting deferred.",
    "Your current streak suggests consistency is strong, but revision blocks are still short."
  ];

  return (
    <section className="rounded-[32px] bg-panel p-6 shadow-float">
      <p className="text-sm uppercase tracking-[0.25em] text-coral">Performance analytics</p>
      <h3 className="mt-2 font-display text-2xl font-bold">Understand your study behavior.</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <article className="rounded-[24px] bg-[#ffe5c9] p-4">
          <p className="text-sm text-ink/60">Deep work blocks</p>
          <p className="mt-2 font-display text-3xl font-bold">6</p>
        </article>
        <article className="rounded-[24px] bg-[#e0f0e8] p-4">
          <p className="text-sm text-ink/60">Weekly target</p>
          <p className="mt-2 font-display text-3xl font-bold">81%</p>
        </article>
        <article className="rounded-[24px] bg-[#f5dfe1] p-4">
          <p className="text-sm text-ink/60">Miss-risk alert</p>
          <p className="mt-2 font-display text-3xl font-bold">Low</p>
        </article>
      </div>
      <div className="mt-5 space-y-3">
        {insights.map((insight) => (
          <div key={insight} className="rounded-[22px] border border-black/5 bg-white px-4 py-3 text-sm text-ink/75">
            {insight}
          </div>
        ))}
      </div>
    </section>
  );
}
