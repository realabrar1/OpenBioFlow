from fastapi import FastAPI

app = FastAPI(
    title="OpenBioFlow - AI Orchestrator Service",
    description="Orchestrates analytical pipelines using Google Gemini LLM API.",
    version="1.0.0",
)

@app.get("/")
def read_root():
    return {
        "service": "ai-orchestrator",
        "status": "ready"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
