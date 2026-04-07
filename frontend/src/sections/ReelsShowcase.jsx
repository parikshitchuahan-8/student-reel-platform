import { useState } from "react";

const initialReelForm = {
  title: "",
  subject: "",
  duration: "",
  takeaway: "",
  videoUrl: "",
  transcriptUrl: ""
};

export function ReelsShowcase({
  reels,
  onCreateReel,
  onGenerateQuiz,
  onSelectAnswer,
  onSubmitQuiz,
  onSaveReel,
  quizState,
  quizLoading,
  saveLoading
}) {
  const [form, setForm] = useState(initialReelForm);
  const [creating, setCreating] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCreating(true);
    try {
      await onCreateReel(form);
      setForm(initialReelForm);
    } finally {
      setCreating(false);
    }
  };

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
              <button
                className="rounded-full bg-white/10 px-3 py-2 text-xs text-white"
                onClick={() => onGenerateQuiz(reel)}
                type="button"
              >
                {quizLoading === reel.id ? "Loading quiz..." : "Quick quiz"}
              </button>
              <button
                className="rounded-full bg-white/10 px-3 py-2 text-xs text-white"
                onClick={() => onSaveReel(reel.id)}
                type="button"
              >
                {saveLoading === reel.id ? "Saving..." : "Add to revision"}
              </button>
            </div>
            {reel.videoUrl ? (
              <a className="mt-4 inline-block text-sm text-[#ffd48f]" href={reel.videoUrl} rel="noreferrer" target="_blank">
                Open reel link
              </a>
            ) : null}
            {reel.transcriptUrl ? (
              <a className="mt-2 block text-sm text-white/70" href={reel.transcriptUrl} rel="noreferrer" target="_blank">
                Open transcript
              </a>
            ) : null}
            {quizState?.reelId === reel.id ? (
              <div className="mt-5 space-y-3 rounded-[22px] bg-white/10 p-4">
                <p className="text-sm font-semibold text-white/90">Quiz for {quizState.title}</p>
                {quizState.questions.map((question, index) => (
                  <div key={`${reel.id}-${index}`} className="rounded-[18px] bg-white/10 p-3 text-sm">
                    <p className="font-medium">{index + 1}. {question.question}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {question.options.map((option) => (
                        <button
                          key={option}
                          className={`rounded-full px-3 py-1 text-xs ${
                            quizState.selectedAnswers?.[index] === option
                              ? "bg-[#ffd48f] text-ink"
                              : "bg-black/20 text-white"
                          }`}
                          onClick={() => onSelectAnswer(index, option)}
                          type="button"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {quizState.submitted ? (
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#ffd48f]">
                        Answer: {question.answer}
                      </p>
                    ) : null}
                  </div>
                ))}
                <button
                  className="rounded-full bg-[#ffd48f] px-4 py-2 text-xs font-medium text-ink"
                  onClick={() => onSubmitQuiz(reel.id)}
                  type="button"
                >
                  Submit quiz
                </button>
                {quizState.submitted ? (
                  <div className="text-sm text-white/90">
                    Score: {quizState.score}/{quizState.questions.length}
                  </div>
                ) : null}
              </div>
            ) : null}
          </article>
        ))}
      </div>
      <form className="mt-8 grid gap-3 rounded-[28px] bg-white/50 p-5 md:grid-cols-2" onSubmit={handleSubmit}>
        <input
          className="rounded-[18px] border border-black/10 bg-white px-4 py-3 outline-none"
          name="title"
          onChange={handleChange}
          placeholder="Reel title"
          required
          value={form.title}
        />
        <input
          className="rounded-[18px] border border-black/10 bg-white px-4 py-3 outline-none"
          name="subject"
          onChange={handleChange}
          placeholder="Subject"
          required
          value={form.subject}
        />
        <input
          className="rounded-[18px] border border-black/10 bg-white px-4 py-3 outline-none"
          name="duration"
          onChange={handleChange}
          placeholder="Duration label, e.g. 01:10"
          required
          value={form.duration}
        />
        <input
          className="rounded-[18px] border border-black/10 bg-white px-4 py-3 outline-none"
          name="takeaway"
          onChange={handleChange}
          placeholder="Learning takeaway"
          required
          value={form.takeaway}
        />
        <input
          className="rounded-[18px] border border-black/10 bg-white px-4 py-3 outline-none"
          name="videoUrl"
          onChange={handleChange}
          placeholder="Optional reel URL"
          value={form.videoUrl}
        />
        <input
          className="rounded-[18px] border border-black/10 bg-white px-4 py-3 outline-none"
          name="transcriptUrl"
          onChange={handleChange}
          placeholder="Optional transcript URL"
          value={form.transcriptUrl}
        />
        <button
          className="rounded-full bg-coral px-5 py-3 font-medium text-white md:col-span-2"
          disabled={creating}
          type="submit"
        >
          {creating ? "Creating reel..." : "Add study reel"}
        </button>
      </form>
    </section>
  );
}
