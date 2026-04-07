# Student Reel Platform

Student productivity and collaboration platform for academic planning, study groups, focus tracking, and academic-only study reels.

## Stack

- Frontend: React + Tailwind + Vite
- Backend: Spring Boot + Spring AI + PostgreSQL
- AI service: Python + FastAPI

## Current scaffold

- Lightweight register/login flow with user-aware dashboard state
- Student dashboard with planner, analytics, study groups, and reels UI
- Spring Boot APIs for dashboard data and Groq-backed chat
- Python AI endpoints for study-plan generation and summarization
- Spring Boot proxy endpoints to the Python AI service

## Suggested next build order

1. Add authentication and user profiles
2. Replace sample dashboard data with JPA entities and repositories
3. Add task CRUD, reminders, and calendar scheduling
4. Persist study groups, sessions, and shared notes
5. Add reel upload, transcript, quiz, and save-for-revision flows
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
$env:GROQ_API_KEY="your-groq-key"
$env:GROQ_MODEL="llama-3.3-70b-versatile"
$env:PYTHON_AI_URL="http://localhost:8000"
mvn spring-boot:run
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
