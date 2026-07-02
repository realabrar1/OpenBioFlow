# OpenBioFlow AI - System Architecture Blueprint

This document describes the architectural layout, subsystem integrations, and communication contracts of the OpenBioFlow AI platform.

---

## 1. Subsystem Architecture

The platform is designed around a **microservices topology** with a central API Gateway routing to specialized Python analytics engines.

```
                  ┌───────────────────────┐
                  │   Next.js 15 Web      │
                  │   Frontend Client     │
                  └──────────┬────────────┘
                             │ (JSON / HTTPS)
                             ▼
                  ┌───────────────────────┐
                  │    FastAPI Gateway    │◄──────────┐
                  │      (apps/api)       │           │
                  └────┬──────────────┬───┘           │
                       │              │               │
      (PostgreSQL)     ▼              ▼ (Redis)       │ (gRPC / HTTP)
    ┌──────────────┐ ┌───┐          ┌───┐             │
    │  Metadata DB │ │   │          │   │             │
    └──────────────┘ └───┘          └───┘             │
                       │              │               │
                       ▼              ▼               ▼
           ┌─────────────────────────────────────────────────────┐
           │                  Microservices Bus                  │
           └─┬──────────────┬──────────────┬──────────────┬──────┘
             │              │              │              │
             ▼              ▼              ▼              ▼
     ┌──────────────┐┌──────────────┐┌──────────────┐┌──────────────┐
     │      AI      ││  Execution   ││  Literature  ││  Visuals &   │
     │ Orchestrator ││    Engine    ││   Service    ││ Reports      │
     │   (Gemini)   ││   (Scanpy)   ││   (PubMed)   ││(GSEA/WebGL)  │
     └──────────────┘└──────────────┘└──────────────┘└──────────────┘
```

---

## 2. Core Service Responsibilities

### A. Next.js 15 Web Portal (`apps/web`)
- Serves the Single Page Dashboard Application.
- Utilizes **React Query** for server-state synchronization and cache polling.
- Manages local client state (UI toggles, visual configuration parameters) via **Zustand**.
- Implements WebGL plots and responsive data-tables wrapping genomic matrices.

### B. FastAPI Core Gateway (`apps/api`)
- Performs JWT authentication and permission validation.
- Standardizes entry schemas using **Pydantic** validation models.
- Manages relational state in **PostgreSQL** using SQLAlchemy async contexts.
- Coordinates long-running pipelines via Redis queues.

### C. AI Orchestrator (`services/ai-orchestrator`)
- Connects to the **Google Gemini Pro v1.5 API**.
- Translates unstructured medical prompts into programmatic pipeline scripts (Scanpy steps).
- Reasons over data filters, gene lists, and cluster dimensions dynamically.

### D. Execution Engine (`services/execution-engine`)
- Houses high-performance bioinformatics pipelines.
- Reads and parses scientific data containers (**AnnData** `.h5ad` formats).
- Executes data scaling, clustering (Leiden/Louvain algorithms), UMAP layout calculations.

### E. Literature Service (`services/literature-service`)
- Interacts with public scientific databases via NCBI E-utilities.
- Aggregates literature keywords and extracts citation graphs using Biopython.

### F. Visualization & Reports (`services/visualization-engine` & `services/report-generator`)
- Prepares dynamic multi-scale maps for rendering WebGL tiles.
- Calculates Enrichment scores (**GSEApy**) and builds PDF summaries with **ReportLab**.

---

## 3. Communication Patterns
1. **Synchronous Requests:** The Next.js frontend calls the FastAPI Gateway using JSON endpoints. The Gateway resolves metadata immediately.
2. **Asynchronous Jobs:** Large calculations (e.g., executing Scanpy runs or generating GSEA maps) are handled out-of-band:
   - The Gateway pushes a job description to a Redis task queue.
   - The Gateway returns a `task_id` with a `202 Accepted` status.
   - The Next.js client polls `/api/v1/tasks/{task_id}` for completion status.
   - The Execution Engine runs the task and uploads output files to local/cloud **S3-compatible Object Storage**.
