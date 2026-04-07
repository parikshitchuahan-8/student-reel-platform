# Student Reel Platform Frontend

React + Tailwind frontend for the student productivity platform.

## Screens included

- Login and registration flow with remembered local session
- Personal dashboard
- AI planner board
- AI study-plan generation wired to the Spring Boot to Python AI flow
- Task manager connected to Spring Boot task CRUD APIs
- Study reels loaded from backend with creation, revision-save, and AI quiz generation
- Groq-backed study chat panel
- Study group workspace preview
- Performance analytics

## Reels note

- New reels currently use metadata and optional URLs
- Direct video file upload is a later step
- Academic-only study reels section

## Run

```powershell
npm install
npm run dev
```

## Environment

Create a local `frontend/.env` from [frontend/.env.example](C:\XboxGames\GameSave\student-reel-platform\frontend\.env.example):

```env
VITE_API_BASE_URL=http://localhost:8080
```

Use deployment environment variables for hosted environments instead of committing real values.
