from fastapi import FastAPI

app = FastAPI(
    title="OpenBioFlow - Report Generator Service",
    description="Calculates Gene Set Enrichment (GSEA) and generates publication-grade files.",
    version="1.0.0",
)

@app.get("/")
def read_root():
    return {
        "service": "report-generator",
        "status": "ready"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
