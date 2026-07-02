import time
import uuid
import logging
from typing import Callable
from fastapi import FastAPI, Request, Response
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# Configure structured-looking standard logging
logging.basicConfig(
    level=logging.INFO,
    format='{"time": "%(asctime)s", "level": "%(levelname)s", "correlation_id": "%(name)s", "message": "%(message)s"}',
)
logger = logging.getLogger("sys-gateway")

app = FastAPI(
    title="OpenBioFlow API Gateway",
    description="Core Gateway routing backend for AI-orchestrated bioinformatics workloads.",
    version="1.0.0",
)

# CORS Policy
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Correlation ID and Performance Middleware
@app.middleware("http")
async def add_correlation_and_timing_middleware(request: Request, call_next: Callable) -> Response:
    correlation_id = request.headers.get("X-Correlation-ID", str(uuid.uuid4()))
    request.state.correlation_id = correlation_id
    
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    
    response.headers["X-Correlation-ID"] = correlation_id
    response.headers["X-Response-Time-Seconds"] = f"{duration:.4f}"
    
    logger.name = correlation_id
    logger.info(f"Handled {request.method} {request.url.path} - Status: {response.status_code} in {duration:.4f}s")
    return response

# Standardized Error Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    correlation_id = getattr(request.state, "correlation_id", "unknown")
    logger.name = correlation_id
    logger.error(f"Global exception intercepted: {str(exc)}", exc_info=True)
    
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": {
                "code": "ERR_SYS_INTERNAL_ERROR",
                "message": "An unexpected server error occurred.",
                "correlation_id": correlation_id,
            }
        }
    )

# Core endpoints
@app.get("/")
async def root():
    return {
        "service": "OpenBioFlow Core API Gateway",
        "status": "online",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "dependencies": {
            "database": "scaffolded",
            "redis": "scaffolded"
        }
    }
