import { useState } from "react";

const initialPlanForm = {
  subject: "DBMS",
  availableHours: 2,
  weakAreas: "Normalization, SQL joins",
  deadline: ""
};

export function PlannerBoard({ planner, tasks, generatedPlan, onGeneratePlan, loading }) {
  const [form, setForm] = useState(initialPlanForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === "availableHours" ? Number(value) : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onGeneratePlan(form);
  };

  return (
    <section className="rounded-[32px] bg-panel p-6 shadow-float">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-moss">AI planner</p>
          <h3 className="mt-2 font-display text-2xl font-bold">Smart study flow</h3>
        </div>
        <div className="rounded-full bg-moss px-4 py-2 text-sm text-white">Today</div>
      </div>
      <div className="mt-5 space-y-4">
        {planner.map((item) => (
          <article key={item.timeSlot} className="rounded-[24px] border border-black/5 bg-white px-4 py-4">
            <p className="text-xs uppercase tracking-[0.25em] text-coral">{item.timeSlot}</p>
            <h4 className="mt-2 text-lg font-semibold">{item.title}</h4>
            <p className="mt-1 text-sm text-ink/65">{item.purpose}</p>
          </article>
        ))}
      </div>
      <form className="mt-6 grid gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
        <input
          className="rounded-[20px] border border-black/10 bg-white px-4 py-3 outline-none"
          name="subject"
          onChange={handleChange}
          placeholder="Subject"
          value={form.subject}
        />
        <input
          className="rounded-[20px] border border-black/10 bg-white px-4 py-3 outline-none"
          max="12"
          min="1"
          name="availableHours"
          onChange={handleChange}
          placeholder="Available hours"
          type="number"
          value={form.availableHours}
        />
        <input
          className="rounded-[20px] border border-black/10 bg-white px-4 py-3 outline-none"
          name="deadline"
          onChange={handleChange}
          required
          type="date"
          value={form.deadline}
        />
        <input
          className="rounded-[20px] border border-black/10 bg-white px-4 py-3 outline-none"
          name="weakAreas"
          onChange={handleChange}
          placeholder="Weak areas separated by commas"
          value={form.weakAreas}
        />
        <button
          className="rounded-full bg-amber px-5 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
          disabled={loading}
          type="submit"
        >
          {loading ? "Generating plan..." : "Generate AI study plan"}
        </button>
      </form>
      {generatedPlan ? (
        <div className="mt-6 rounded-[28px] bg-[#f1e7d2] p-5">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-coral">Generated plan</p>
              <h4 className="mt-1 font-display text-2xl font-bold">{generatedPlan.subject}</h4>
            </div>
            <p className="text-sm text-ink/65">Deadline: {generatedPlan.deadline}</p>
          </div>
          <p className="mt-3 text-sm text-ink/70">{generatedPlan.recommendation}</p>
          <div className="mt-4 space-y-3">
            {generatedPlan.slots?.map((slot) => (
              <article key={slot.block} className="rounded-[22px] bg-white px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{slot.block}</p>
                  <span className="text-sm text-moss">{slot.duration_minutes} mins</span>
                </div>
                <p className="mt-2 text-sm text-ink/75">{slot.task}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-coral">{slot.focus}</p>
              </article>
            ))}
          </div>
        </div>
      ) : null}
      <div className="mt-6">
        <h4 className="font-display text-xl font-bold">Priority tasks</h4>
        <div className="mt-4 space-y-3">
          {tasks.map((task) => (
            <article key={task.id} className="rounded-[24px] bg-[#f1e7d2] px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{task.title}</p>
                  <p className="text-sm text-ink/60">{task.subject} - Due {task.dueDate}</p>
                </div>
                <span className="text-sm text-moss">{task.progress}%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white">
                <div className="h-2 rounded-full bg-moss" style={{ width: `${task.progress}%` }} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
