# study-orbit AI Service

FastAPI service for AI-heavy workflows that are better isolated from the Spring Boot app.

## Initial endpoints

- `GET /health`
- `POST /ai/study-plan`
- `POST /ai/summarize`
- `POST /ai/reel-quiz`

## Run

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Environment

Use [pyAi/.env.example](C:\XboxGames\GameSave\study-orbit\pyAi\.env.example) as the template for local Python AI configuration.

## Render

The Python AI service is configured for Render native Python deployment in [render.yaml](C:\XboxGames\GameSave\study-orbit\render.yaml).

## Next AI candidates

- quiz generation from notes or reels
- weak-area detection from performance data
- reminder prioritization
- note-to-flashcard conversion
