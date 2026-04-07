export function ReelsShowcase({ reels }) {
  return (
    <section className="rounded-[32px] bg-[#f0dcc8] p-6 shadow-float">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-coral">Study reels</p>
          <h3 className="mt-2 font-display text-2xl font-bold">Short-form learning, still tied to outcomes.</h3>
        </div>
        <p className="max-w-xl text-sm text-ink/70">
          Reels stay academic only: concept bites, revision tips, quick explainers, and quiz-driven recall.
        </p>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reels.map((reel) => (
          <article key={reel.id} className="rounded-[28px] bg-ink p-5 text-white">
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>{reel.subject}</span>
              <span>{reel.duration}</span>
            </div>
            <h4 className="mt-6 font-display text-2xl font-bold">{reel.title}</h4>
            <p className="mt-3 text-sm text-white/75">{reel.takeaway}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white/10 px-3 py-2">AI summary</span>
              <span className="rounded-full bg-white/10 px-3 py-2">Quick quiz</span>
              <span className="rounded-full bg-white/10 px-3 py-2">Add to revision</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
