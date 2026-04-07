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
- Reel metadata creation and revision-save flow

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
