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
```

## Seeded login

- Email: `aarav@studentreel.dev`
- Password: `password123`

## Run

```powershell
mvn spring-boot:run
```
