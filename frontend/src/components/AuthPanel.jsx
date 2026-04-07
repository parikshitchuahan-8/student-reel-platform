import { useState } from "react";

const loginInitial = {
  email: "aarav@studentreel.dev",
  password: "password123"
};

const registerInitial = {
  fullName: "",
  email: "",
  course: "",
  password: ""
};

export function AuthPanel({ onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [loginForm, setLoginForm] = useState(loginInitial);
  const [registerForm, setRegisterForm] = useState(registerInitial);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Sign in to make the dashboard yours.");

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((current) => ({ ...current, [name]: value }));
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(mode === "login" ? "Signing you in..." : "Creating your account...");

    try {
      const endpoint = mode === "login" ? "login" : "register";
      const payload = mode === "login" ? loginForm : registerForm;

      const response = await fetch(`import.meta.env.VITE_API_BASE_URL/api/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const user = await response.json();
      onAuthSuccess(user);
    } catch (error) {
      setMessage("Backend auth is not available yet. Start the backend to sign in or register.");
    } finally {
      setLoading(false);
    }
  };

  const form = mode === "login" ? loginForm : registerForm;
  const handleChange = mode === "login" ? handleLoginChange : handleRegisterChange;

  return (
    <section className="mx-auto mt-10 max-w-3xl rounded-[36px] bg-panel p-6 shadow-float md:p-8">
      <div className="flex flex-wrap gap-3">
        <button
          className={`rounded-full px-4 py-2 text-sm ${mode === "login" ? "bg-moss text-white" : "bg-[#efe4d0] text-ink"}`}
          onClick={() => setMode("login")}
          type="button"
        >
          Login
        </button>
        <button
          className={`rounded-full px-4 py-2 text-sm ${mode === "register" ? "bg-coral text-white" : "bg-[#efe4d0] text-ink"}`}
          onClick={() => setMode("register")}
          type="button"
        >
          Register
        </button>
      </div>
      <h2 className="mt-4 font-display text-3xl font-bold">Student productivity, personalized.</h2>
      <p className="mt-2 text-sm text-ink/65">
        Use the seeded account or create a new one. This first pass keeps auth lightweight while making the app truly user-aware.
      </p>
      <form className="mt-6 grid gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
        {mode === "register" ? (
          <>
            <input
              className="rounded-[20px] border border-black/10 bg-white px-4 py-3 outline-none"
              name="fullName"
              onChange={handleChange}
              placeholder="Full name"
              required
              value={form.fullName}
            />
            <input
              className="rounded-[20px] border border-black/10 bg-white px-4 py-3 outline-none"
              name="course"
              onChange={handleChange}
              placeholder="Course"
              required
              value={form.course}
            />
          </>
        ) : null}
        <input
          className="rounded-[20px] border border-black/10 bg-white px-4 py-3 outline-none"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
          type="email"
          value={form.email}
        />
        <input
          className="rounded-[20px] border border-black/10 bg-white px-4 py-3 outline-none"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
          type="password"
          value={form.password}
        />
        <button
          className="rounded-full bg-ink px-5 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
          disabled={loading}
          type="submit"
        >
          {loading ? "Please wait..." : mode === "login" ? "Login to dashboard" : "Create account"}
        </button>
      </form>
      <div className="mt-4 rounded-[22px] bg-[#f5efe4] px-4 py-3 text-sm text-ink/70">{message}</div>
      <div className="mt-4 rounded-[22px] bg-[#efe4d0] px-4 py-3 text-sm text-ink/75">
        Seeded login: `aarav@studentreel.dev` / `password123`
      </div>
    </section>
  );
}
