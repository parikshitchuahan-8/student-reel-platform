import { useState } from "react";

const initialForm = {
  title: "",
  subject: "",
  description: "",
  dueDate: "",
  status: "NOT_STARTED",
  priority: "MEDIUM",
  progress: 0
};

export function TaskManager({ tasks, onCreateTask, onUpdateTask, onDeleteTask, loading }) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === "progress" ? Number(value) : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await onCreateTask(form);
      setForm(initialForm);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-[32px] bg-panel p-6 shadow-float">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-moss">Task system</p>
          <h3 className="mt-2 font-display text-2xl font-bold">Plan work that actually gets finished</h3>
        </div>
        <span className="rounded-full bg-[#efe4d0] px-4 py-2 text-sm text-ink/70">
          {loading ? "Syncing..." : `${tasks.length} tasks`}
        </span>
      </div>

      <form className="mt-5 grid gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
        <input
          className="rounded-[20px] border border-black/10 bg-white px-4 py-3 outline-none"
          name="title"
          onChange={handleChange}
          placeholder="Task title"
          required
          value={form.title}
        />
        <input
          className="rounded-[20px] border border-black/10 bg-white px-4 py-3 outline-none"
          name="subject"
          onChange={handleChange}
          placeholder="Subject"
          required
          value={form.subject}
        />
        <input
          className="rounded-[20px] border border-black/10 bg-white px-4 py-3 outline-none"
          min="0"
          max="100"
          name="progress"
          onChange={handleChange}
          placeholder="Progress"
          type="number"
          value={form.progress}
        />
        <input
          className="rounded-[20px] border border-black/10 bg-white px-4 py-3 outline-none"
          name="dueDate"
          onChange={handleChange}
          required
          type="date"
          value={form.dueDate}
        />
        <select
          className="rounded-[20px] border border-black/10 bg-white px-4 py-3 outline-none"
          name="status"
          onChange={handleChange}
          value={form.status}
        >
          <option value="NOT_STARTED">Not started</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <select
          className="rounded-[20px] border border-black/10 bg-white px-4 py-3 outline-none"
          name="priority"
          onChange={handleChange}
          value={form.priority}
        >
          <option value="LOW">Low priority</option>
          <option value="MEDIUM">Medium priority</option>
          <option value="HIGH">High priority</option>
        </select>
        <textarea
          className="min-h-28 rounded-[20px] border border-black/10 bg-white px-4 py-3 outline-none md:col-span-2"
          name="description"
          onChange={handleChange}
          placeholder="Add a short task description"
          value={form.description}
        />
        <button
          className="rounded-full bg-moss px-5 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
          disabled={submitting}
          type="submit"
        >
          {submitting ? "Creating task..." : "Create task"}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {tasks.map((task) => (
          <article key={task.id} className="rounded-[24px] bg-[#f7efdf] p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-xs text-ink/70">{task.subject}</span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs text-ink/70">{task.priority}</span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs text-ink/70">Due {task.dueDate}</span>
                </div>
                <h4 className="mt-3 text-lg font-semibold">{task.title}</h4>
                <p className="mt-1 text-sm text-ink/65">{task.description || "No description added yet."}</p>
              </div>
              <button
                className="rounded-full bg-coral px-4 py-2 text-sm text-white"
                onClick={() => onDeleteTask(task.id)}
                type="button"
              >
                Delete
              </button>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-[0.7fr_0.3fr]">
              <input
                className="w-full"
                max="100"
                min="0"
                onChange={(event) =>
                  onUpdateTask(task.id, {
                    ...task,
                    progress: Number(event.target.value)
                  })
                }
                type="range"
                value={task.progress}
              />
              <select
                className="rounded-[16px] border border-black/10 bg-white px-4 py-2 outline-none"
                onChange={(event) =>
                  onUpdateTask(task.id, {
                    ...task,
                    status: event.target.value
                  })
                }
                value={task.status}
              >
                <option value="NOT_STARTED">Not started</option>
                <option value="IN_PROGRESS">In progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-ink/60">
              <span>{task.status.replaceAll("_", " ")}</span>
              <span>{task.progress}%</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
