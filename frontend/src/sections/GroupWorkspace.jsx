export function GroupWorkspace({ groups }) {
  const features = [
    "Shared goal tracker",
    "Topic threads",
    "Live session rooms",
    "Collaborative whiteboard"
  ];

  return (
    <section className="rounded-[32px] bg-moss p-6 text-white shadow-float">
      <p className="text-sm uppercase tracking-[0.25em] text-white/70">Study groups</p>
      <h3 className="mt-2 font-display text-2xl font-bold">Group momentum beats solo drift.</h3>
      <div className="mt-5 space-y-3">
        {groups.map((group) => (
          <article key={group.id} className="rounded-[24px] bg-white/10 px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{group.name}</p>
                <p className="text-sm text-white/75">{group.topic}</p>
              </div>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs">{group.activeMembers} active</span>
            </div>
            <p className="mt-3 text-sm text-white/80">Next session: {group.nextSession}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {features.map((feature) => (
          <span key={feature} className="rounded-full border border-white/20 px-3 py-2 text-sm">
            {feature}
          </span>
        ))}
      </div>
    </section>
  );
}
