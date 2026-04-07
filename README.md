# Student Reel Platform

Student productivity and collaboration platform for academic planning, study groups, focus tracking, and academic-only study reels.

## Stack

- Frontend: React + Tailwind + Vite
- Backend: Spring Boot + Spring AI + PostgreSQL
- AI service: Python + FastAPI

## Environment Setup

Best practice used in this repo:

- commit `.env.example`
- keep real `.env` files out of git
- use environment variables for backend secrets
- use `VITE_` variables only for frontend public config

Example files included:

- [frontend/.env.example](C:\XboxGames\GameSave\student-reel-platform\frontend\.env.example)
- [backend/.env.example](C:\XboxGames\GameSave\student-reel-platform\backend\.env.example)
- [pyAi/.env.example](C:\XboxGames\GameSave\student-reel-platform\pyAi\.env.example)

## Current scaffold

- Lightweight register/login flow with user-aware dashboard state
- Student dashboard with planner, analytics, study groups, and reels UI
- Spring Boot APIs for dashboard data and Groq-backed chat
- Python AI endpoints for study-plan generation, summarization, and reel quizzes
- Spring Boot proxy endpoints to the Python AI service
- Reel metadata creation, revision-save flow, saved revision library, quiz progress tracking, next-review scheduling, daily due review surfacing, in-app reminders, and scheduled notification feed

## Suggested next build order

1. Add authentication and user profiles
2. Replace sample dashboard data with JPA entities and repositories
3. Add task CRUD, reminders, and calendar scheduling
4. Persist study groups, sessions, and shared notes
5. Add binary reel uploads and managed media storage
6. Connect analytics to real progress and focus-session data

## Local run order

### 1. Python AI service

```powershell
cd C:\XboxGames\GameSave\student-reel-platform\pyAi
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 2. Spring Boot backend

```powershell
cd C:\XboxGames\GameSave\student-reel-platform\backend
$env:DB_URL="jdbc:postgresql://localhost:5432/student_reel"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="your_postgres_password"
$env:GROQ_API_KEY="your-groq-key"
$env:GROQ_MODEL="llama-3.3-70b-versatile"
$env:PYTHON_AI_URL="http://localhost:8000"
.\start-backend.ps1
```

Seeded login after first boot:

- Email: `aarav@studentreel.dev`
- Password: `password123`

### 3. React frontend

```powershell
cd C:\XboxGames\GameSave\student-reel-platform\frontend
npm install
npm run dev
```

Frontend local config:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Deployment rule:

- frontend public config goes in frontend env variables
- backend and AI secrets should be set in the deployment platform, not committed to the repo

## Deployment Layout

Recommended production split:

- Vercel: `frontend`
- Render web service: `backend`
- Render web service: `pyAi`
- Render Postgres: `student_reel`

Deployment files included:

- [frontend/vercel.json](C:\XboxGames\GameSave\student-reel-platform\frontend\vercel.json)
- [render.yaml](C:\XboxGames\GameSave\student-reel-platform\render.yaml)
- [backend/Dockerfile](C:\XboxGames\GameSave\student-reel-platform\backend\Dockerfile)

## Deploy on Vercel and Render

### 1. Deploy the backend stack on Render

Use the Blueprint in [render.yaml](C:\XboxGames\GameSave\student-reel-platform\render.yaml). It creates:

- `student-reel-db` PostgreSQL
- `student-reel-ai` FastAPI service
- `student-reel-backend` Spring Boot service

Important Render environment variables:

- `GROQ_API_KEY`: add your Groq key manually in Render
- `CORS_ALLOWED_ORIGINS`: set this to your Vercel frontend URLs, for example `https://student-reel-platform.vercel.app,https://*.vercel.app`

Render-specific notes:

- the backend Docker entrypoint converts Render's `postgresql://...` database URL into the JDBC URL Spring Boot expects
- the backend also normalizes Render private-network host values for `PYTHON_AI_URL`
- backend health check path is `/api/health`
- Python AI health check path is `/health`

### 2. Deploy the frontend on Vercel

Create a Vercel project with [frontend](C:\XboxGames\GameSave\student-reel-platform\frontend) as the root directory.

Use:

- framework preset: `Vite`
- build command: `npm run build`
- output directory: `dist`

Set this Vercel environment variable:

- `VITE_API_BASE_URL=https://your-backend-name.onrender.com`

After Vercel gives you the real frontend URL, add that URL back into Render as `CORS_ALLOWED_ORIGINS` and redeploy the backend.
