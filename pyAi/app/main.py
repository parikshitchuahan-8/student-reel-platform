from fastapi import FastAPI
from pydantic import BaseModel, Field


app = FastAPI(
    title="study-orbit AI Service",
    description="Python microservice for study planning, summaries, and future AI workflows.",
    version="0.0.1",
)


class StudyPlanRequest(BaseModel):
    subject: str = Field(..., description="Subject name")
    available_hours: int = Field(..., ge=1, le=12)
    weak_areas: list[str] = Field(default_factory=list)
    deadline: str = Field(..., description="Deadline or exam date")


class SummaryRequest(BaseModel):
    title: str
    content: str = Field(..., min_length=20)


class ReelQuizRequest(BaseModel):
    title: str
    subject: str
    takeaway: str


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/ai/study-plan")
def generate_study_plan(payload: StudyPlanRequest) -> dict:
    revision_focus = payload.weak_areas or ["core concepts", "practice questions"]

    slots = [
        {
            "block": "Block 1",
            "duration_minutes": payload.available_hours * 20,
            "task": f"Review {payload.subject} fundamentals",
            "focus": revision_focus[0],
        },
        {
            "block": "Block 2",
            "duration_minutes": payload.available_hours * 15,
            "task": f"Active recall and short notes for {payload.subject}",
            "focus": revision_focus[min(len(revision_focus) - 1, 0)],
        },
        {
            "block": "Block 3",
            "duration_minutes": payload.available_hours * 25,
            "task": "Timed practice and error review",
            "focus": "exam readiness",
        },
    ]

    return {
        "subject": payload.subject,
        "deadline": payload.deadline,
        "recommendation": f"Spread the remaining work across {payload.available_hours} focused hours and finish with practice testing.",
        "slots": slots,
    }


@app.post("/ai/summarize")
def summarize_content(payload: SummaryRequest) -> dict:
    compact = " ".join(payload.content.split())
    summary = compact[:240] + ("..." if len(compact) > 240 else "")

    return {
        "title": payload.title,
        "summary": summary,
        "quiz_prompt": f"What are the three most important takeaways from {payload.title}?",
        "revision_action": "Save this summary and revisit it in 48 hours.",
    }


@app.post("/ai/reel-quiz")
def generate_reel_quiz(payload: ReelQuizRequest) -> dict:
    base = f"{payload.subject}: {payload.takeaway}"
    return {
        "title": payload.title,
        "subject": payload.subject,
        "questions": [
            {
                "question": f"What is the main idea emphasized in '{payload.title}'?",
                "options": [
                    payload.takeaway,
                    "Ignoring revision scheduling",
                    "Replacing practice with passive watching",
                    "Avoiding concept review",
                ],
                "answer": payload.takeaway,
            },
            {
                "question": f"Which topic area does this reel mainly support?",
                "options": [
                    payload.subject,
                    "General social media trends",
                    "Unrelated entertainment",
                    "Random memorization only",
                ],
                "answer": payload.subject,
            },
            {
                "question": "What is the best next action after watching the reel?",
                "options": [
                    f"Use the key takeaway in active recall: {base}",
                    "Skip practice and move on",
                    "Delete your notes",
                    "Ignore the topic for a week",
                ],
                "answer": f"Use the key takeaway in active recall: {base}",
            },
        ],
    }
