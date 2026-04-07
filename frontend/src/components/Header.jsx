export function Header({ user, onLogout }) {
  return (
    <header className="rounded-[28px] border border-black/5 bg-panel/90 px-5 py-4 shadow-float backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-moss">Student Reel Platform</p>
          <h1 className="mt-1 font-display text-3xl font-bold">Build consistency, not noise.</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {user ? (
            <span className="rounded-full bg-[#efe4d0] px-4 py-2 text-ink">
              {user.fullName} • {user.course}
            </span>
          ) : null}
          <span className="rounded-full bg-moss px-4 py-2 text-white">Focus OS</span>
          <span className="rounded-full bg-amber px-4 py-2 text-white">AI Planner</span>
          <span className="rounded-full bg-coral px-4 py-2 text-white">Study Reels</span>
          {user ? (
            <button className="rounded-full bg-ink px-4 py-2 text-white" onClick={onLogout} type="button">
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
