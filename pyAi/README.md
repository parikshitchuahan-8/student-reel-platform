# Student Reel AI Service

FastAPI service for AI-heavy workflows that are better isolated from the Spring Boot app.

## Initial endpoints

- `GET /health`
- `POST /ai/study-plan`
- `POST /ai/summarize`

## Run

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Next AI candidates

- quiz generation from notes or reels
- weak-area detection from performance data
- reminder prioritization
- note-to-flashcard conversion
