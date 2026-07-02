# OpenBioFlow AI - Core API Specification

This specification documents the primary REST endpoints served by the FastAPI Core Gateway (`apps/api`).

---

## 1. Authentication & Security
All requests to protected endpoints must pass a JWT token in the `Authorization` header:
```http
Authorization: Bearer <jwt_token>
```

---

## 2. Endpoints Overview

### Health Operations
- **`GET /health`**
  - *Description:* Check status of the gateway and its database adapters.
  - *Response (`200 OK`):*
    ```json
    {
      "status": "healthy",
      "timestamp": 1720286884.281,
      "dependencies": {
        "database": "connected",
        "redis": "connected"
      }
    }
    ```

### Dataset Management
- **`POST /api/v1/datasets/upload`**
  - *Description:* Stream genomic matrix files (`.h5ad` / `.loom`) to Object Storage.
  - *Request Form-Data:* `file` (binary binary stream)
  - *Response (`201 Created`):*
    ```json
    {
      "success": true,
      "dataset_id": "ds_892ba73d",
      "filename": "pbmc3k.h5ad",
      "s3_path": "s3://openbioflow-data/raw/ds_892ba73d/pbmc3k.h5ad"
    }
    ```

### Analytical Task Execution
- **`POST /api/v1/pipelines/run`**
  - *Description:* Dispatches a natural language analysis request to the AI Orchestrator.
  - *Request Body (`application/json`):*
    ```json
    {
      "dataset_id": "ds_892ba73d",
      "prompt": "Filter cells with mitochondrial count > 5% and perform Leiden clustering"
    }
    ```
  - *Response (`202 Accepted`):*
    ```json
    {
      "success": true,
      "task_id": "task_20a8bc7f",
      "status": "pending",
      "message": "Analysis pipeline queued."
    }
    ```

- **`GET /api/v1/pipelines/tasks/{task_id}`**
  - *Description:* Fetch progress metrics or download locations for active pipelines.
  - *Response (`200 OK`):*
    ```json
    {
      "success": true,
      "data": {
        "task_id": "task_20a8bc7f",
        "status": "running",
        "progress": 45,
        "logs": [
          "Filtering high mitochondrial expressions",
          "Running principal component analysis"
        ]
      }
    }
    ```

---

## 3. Error Responses
If a request fails, the payload will strictly conform to the global error envelope:
```json
{
  "success": false,
  "error": {
    "code": "ERR_BIO_SCANPY_CLUSTERING_FAILED",
    "message": "Leiden clustering failed: input matrix was too sparse.",
    "correlation_id": "req-982a-bc93-aef4"
  }
}
```
For more information, see the [Engineering Blueprint](../.gemini/antigravity-ide/brain/b50128a9-d87f-412c-84ef-ab09a4a566c8/engineering_blueprint.md).
