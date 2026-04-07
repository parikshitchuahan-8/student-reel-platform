# Student Reel Platform Backend

Spring Boot backend for the student productivity platform.

## Features in this scaffold

- Dashboard and planner sample APIs
- Basic Groq chatbox integration using Spring AI
- Python AI proxy endpoints for study plan generation and summarization
- JPA entities and repositories for users, tasks, study groups, reels, and focus sessions
- Task CRUD APIs backed by PostgreSQL
- PostgreSQL-ready configuration
- Room to add JPA entities, auth, reminders, and collaboration APIs

## Key endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/dashboard?userId=1`
- `GET /api/dashboard/planner`
- `GET /api/tasks?userId=1`
- `POST /api/tasks`
- `PUT /api/tasks/{taskId}`
- `DELETE /api/tasks/{taskId}`
- `GET /api/reels`
- `GET /api/reels/saved?userId=1`
- `GET /api/reels/due?userId=1`
- `POST /api/reels`
- `POST /api/reels/quiz`
- `POST /api/reels/{reelId}/save`
- `POST /api/reels/{reelId}/attempt`
- `POST /api/reels/{reelId}/reminder`
- `GET /api/reminders?userId=1`
- `POST /api/reminders/{notificationId}/read`
- `POST /api/chat`
- `POST /api/ai/study-plan`
- `POST /api/ai/summarize`

## Environment variables

```powershell
$env:DB_URL="jdbc:postgresql://localhost:5432/student_reel"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="postgres"
$env:GROQ_API_KEY="your-groq-key"
$env:GROQ_MODEL="llama-3.3-70b-versatile"
$env:PYTHON_AI_URL="http://localhost:8000"
$env:CORS_ALLOWED_ORIGINS="http://localhost:5173,http://localhost:4173"
```

Recommended local setup:

- copy [backend/.env.example](C:\XboxGames\GameSave\student-reel-platform\backend\.env.example) into your own local env source
- do not commit real secrets
- for deployment, set these values in your server, container platform, or cloud environment settings

## Seeded login

- Email: `aarav@studentreel.dev`
- Password: `password123`

## Reels note

- Current reel creation stores metadata and optional URLs
- Binary file upload/storage is not implemented yet
- Saved reels now track next review dates based on quiz performance
- Saved reels can also enable or disable reminder nudges
- A scheduled reminder job can create in-app notifications for due saved reels

## Run

```powershell
mvn spring-boot:run
```

## Local .env startup

This repo also includes a local-only launcher:

```powershell
.\start-backend.ps1
```

It loads values from `backend/.env` before starting Spring Boot.

If your PostgreSQL password is not `postgres`, update `DB_PASSWORD` inside `backend/.env`.

## Render

The backend is configured for Docker-based deployment on Render because Render recommends Docker for JVM services.

- Dockerfile: [backend/Dockerfile](C:\XboxGames\GameSave\student-reel-platform\backend\Dockerfile)
- Entrypoint: [backend/docker-entrypoint.sh](C:\XboxGames\GameSave\student-reel-platform\backend\docker-entrypoint.sh)
- Health endpoint: [HealthController.java](C:\XboxGames\GameSave\student-reel-platform\backend\src\main\java\com\studentreel\platform\controller\HealthController.java)
- Blueprint: [render.yaml](C:\XboxGames\GameSave\student-reel-platform\render.yaml)

Render environment setup:

- `GROQ_API_KEY`: set manually in Render
- `CORS_ALLOWED_ORIGINS`: set to your Vercel deployment URLs
- `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`: populated from the Render Postgres database by the Blueprint
- `PYTHON_AI_URL`: populated from the Render Python AI service by the Blueprint

The Docker entrypoint converts Render's Postgres connection string into the JDBC URL Spring Boot expects before startup.
