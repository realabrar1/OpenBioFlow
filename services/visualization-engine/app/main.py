from fastapi import FastAPI

app = FastAPI(
    title="OpenBioFlow - Visualization Engine Service",
    description="Generates maps, clusters, and plots for single-cell genomics databases.",
    version="1.0.0",
)

@app.get("/")
def read_root():
    return {
        "service": "visualization-engine",
        "status": "ready"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
