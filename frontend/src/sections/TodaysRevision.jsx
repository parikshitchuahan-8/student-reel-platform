export function TodaysRevision({ dueReels }) {
  return (
    <section className="rounded-[32px] bg-[#1f3a33] p-6 text-white shadow-float">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/65">Today&apos;s revision</p>
          <h3 className="mt-2 font-display text-2xl font-bold">What needs your attention now</h3>
        </div>
        <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
          {dueReels.length} due
        </span>
      </div>

      {dueReels.length === 0 ? (
        <div className="mt-5 rounded-[24px] bg-white/10 px-4 py-4 text-sm text-white/75">
          Nothing is due today. Keep the streak going by reviewing one saved reel anyway.
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {dueReels.map((reel) => (
            <article key={`due-${reel.id}`} className="rounded-[24px] bg-white/10 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{reel.title}</p>
                  <p className="mt-1 text-sm text-white/70">{reel.subject} - review due {reel.nextReviewDate}</p>
                </div>
                <span className="rounded-full bg-black/20 px-3 py-1 text-xs">
                  {reel.revised ? `${reel.latestScore}/${reel.totalQuestions}` : "Unattempted"}
                </span>
              </div>
              <p className="mt-3 text-sm text-white/78">{reel.takeaway}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                {reel.videoUrl ? (
                  <a className="text-[#ffd48f] underline" href={reel.videoUrl} rel="noreferrer" target="_blank">
                    Open reel
                  </a>
                ) : null}
                {reel.transcriptUrl ? (
                  <a className="text-white underline" href={reel.transcriptUrl} rel="noreferrer" target="_blank">
                    Open transcript
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
