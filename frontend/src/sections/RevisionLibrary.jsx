export function RevisionLibrary({ onToggleReminder, reminderLoading, savedReels }) {
  return (
    <section className="rounded-[32px] bg-panel p-6 shadow-float">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-moss">Revision library</p>
          <h3 className="mt-2 font-display text-2xl font-bold">Saved reels for later recall</h3>
        </div>
        <span className="rounded-full bg-[#efe4d0] px-4 py-2 text-sm text-ink/70">
          {savedReels.length} saved
        </span>
      </div>

      {savedReels.length === 0 ? (
        <div className="mt-5 rounded-[24px] bg-[#f5efe4] px-4 py-4 text-sm text-ink/65">
          Save reels from the study reel section to build your personal revision stack.
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {savedReels.map((reel) => (
            <article key={`saved-${reel.id}`} className="rounded-[24px] bg-[#f7efdf] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{reel.title}</p>
                  <p className="mt-1 text-sm text-ink/60">{reel.subject} - {reel.duration}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs text-ink/70">
                  {reel.revised ? "Revised" : "Revision ready"}
                </span>
              </div>
              <p className="mt-3 text-sm text-ink/70">{reel.takeaway}</p>
              <div className="mt-3 text-sm text-ink/60">
                {reel.revised
                  ? `Latest quiz score: ${reel.latestScore}/${reel.totalQuestions}${
                      reel.latestScore === reel.totalQuestions ? " - perfect recall" : ""
                    }`
                  : "No quiz attempt recorded yet."}
              </div>
              <div className="mt-2 text-sm text-ink/60">
                {reel.nextReviewDate
                  ? `Next review: ${reel.nextReviewDate}`
                  : "Next review will be scheduled after your first quiz attempt."}
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                {reel.videoUrl ? (
                  <a className="text-moss underline" href={reel.videoUrl} rel="noreferrer" target="_blank">
                    Open reel
                  </a>
                ) : null}
                {reel.transcriptUrl ? (
                  <a className="text-coral underline" href={reel.transcriptUrl} rel="noreferrer" target="_blank">
                    Open transcript
                  </a>
                ) : null}
                <button
                  className="text-ink underline"
                  onClick={() => onToggleReminder(reel.id, !reel.reminderEnabled)}
                  type="button"
                >
                  {reminderLoading === reel.id
                    ? "Updating reminder..."
                    : reel.reminderEnabled
                      ? "Disable reminder"
                      : "Enable reminder"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
