from fastapi import FastAPI

app = FastAPI(
    title="OpenBioFlow - Execution Engine Service",
    description="Processes AnnData transcriptomic datasets and executes clustering workflows.",
    version="1.0.0",
)

@app.get("/")
def read_root():
    return {
        "service": "execution-engine",
        "status": "ready"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
