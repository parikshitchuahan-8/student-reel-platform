import { useState } from "react";

const fallbackReply = "Backend not running yet, but this chat box is ready for Groq via Spring AI.";

export function ChatPanel() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("Ask for a study plan, revision strategy, or a quick topic explanation.");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      const data = await response.json();
      setReply(data.reply);
    } catch (error) {
      console.warn("Using fallback chat copy until backend is ready.", error);
      setReply(fallbackReply);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-[32px] bg-[#1f3a33] p-6 text-white shadow-float">
      <p className="text-sm uppercase tracking-[0.25em] text-white/70">Groq assistant</p>
      <h3 className="mt-2 font-display text-2xl font-bold">Basic chatbox for focused help</h3>
      <p className="mt-2 text-sm text-white/75">
        Powered by Spring AI on the backend. Keep it practical: planning, concept help, and productivity coaching.
      </p>
      <div className="mt-5 rounded-[24px] bg-white/10 p-4 text-sm leading-7 text-white/90">
        {reply}
      </div>
      <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
        <textarea
          className="min-h-32 w-full rounded-[24px] border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
          placeholder="Ask: Make me a 2-hour revision plan for DBMS and OS."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          className="rounded-full bg-amber px-5 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
          type="submit"
        >
          {loading ? "Thinking..." : "Send to StudyMate"}
        </button>
      </form>
    </section>
  );
}
