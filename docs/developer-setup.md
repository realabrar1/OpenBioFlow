# OpenBioFlow AI - Local Developer Setup Guide

This guide describes how to run and verify the OpenBioFlow AI platform locally.

---

## 1. Setup Local Configurations

Copy the default environment variables from the template:
```bash
cp infrastructure/docker/.env.example infrastructure/docker/.env
```
*Note: Make sure to edit `.env` and fill in your `GEMINI_API_KEY` to test AI agent interactions.*

---

## 2. Boot Local Infrastructure Containers

Start the databases, cache, and object storage containers:
```bash
docker compose -f infrastructure/docker/docker-compose.yml up -d
```
Verify they are running correctly:
```bash
docker compose -f infrastructure/docker/docker-compose.yml ps
```

---

## 3. Configure Python Microservices

For each service under `services/` (and `apps/api`), initialize the virtual environment using `uv` (recommended) or `poetry`.

### Recommended Method (uv):
1. Install `uv` if not already present:
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```
2. For each python folder, compile and install dependencies:
   ```bash
   cd apps/api
   uv venv
   uv pip install -e ".[dev]"
   ```

---

## 4. Install TypeScript Workspaces

Navigate back to the workspace root and run `pnpm` to install packages across the monorepo:
```bash
pnpm install
```

---

## 5. Running the Dev Environment

Use **Turborepo** to launch all components in hot-reloading development modes in parallel:
```bash
pnpm run dev
```
This runs:
- Next.js Web on `http://localhost:3000`
- FastAPI Gateway on `http://localhost:8000`

---

## 6. Code Verification

### Checking JS/TS Code (Linter & Formatter):
```bash
pnpm run lint
pnpm run format
```

### Checking Python Code:
Navigate to any Python service folder and run:
```bash
# Run Ruff lint and formatting checks
ruff check .
ruff format --check .

# Run pytest unit tests
pytest
```
