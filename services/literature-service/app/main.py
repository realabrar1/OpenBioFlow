from fastapi import FastAPI

app = FastAPI(
    title="OpenBioFlow - Literature Service",
    description="Crawls and synthesizes academic publication insights from databases like PubMed.",
    version="1.0.0",
)

@app.get("/")
def read_root():
    return {
        "service": "literature-service",
        "status": "ready"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
