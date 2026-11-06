# IntelliVet

**IntelliVet: An Intelligent Centralized Veterinary System for AI-Assisted Operations**

A centralized, web-based Veterinary Information Management System (VIMS) integrating electronic medical records, automated appointment scheduling, billing tracking, AI-assisted pet-care guidance, and predictive clinic analytics.

---

## Architecture Overview

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons
- **Backend API**: Python 3.12 + FastAPI + Pydantic v2 + SQLAlchemy 2.0 (async)
- **Database**: PostgreSQL (with SQLite async fallback for local dev)
- **AI Integration**: OpenAI API integration with veterinary triage & guidance safeguards
- **Notifications**: Automated appointment & vaccination SMS reminder system

---

## Project Structure

```text
IntelliVet/
├── backend/
│   ├── app/
│   │   ├── api/v1/          # REST API endpoints (Health, Auth, Pets, Appointments, etc.)
│   │   ├── core/            # App configuration, security, database session setup
│   │   ├── models/          # SQLAlchemy ORM models
│   │   ├── schemas/         # Pydantic validation schemas
│   │   ├── services/        # AI, SMS, and analytics business logic
│   │   └── main.py          # FastAPI application entry point
│   ├── tests/               # Pytest async test suite
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example         # Environment template
│   └── .venv/               # Python virtual environment
├── frontend/
│   ├── src/                 # React components, pages, context, and styles
│   ├── vite.config.ts       # Vite config with API proxy to localhost:8000
│   └── package.json         # Node scripts & dependencies
├── PRD.md                   # Product Requirements Document
├── TECH_STACK.md            # Technology stack rationale
├── SYSTEM_ARCHITECTURE.md   # Architectural design & data flows
└── pytest.ini               # Backend test runner configuration
```

---

## Quickstart Guide

### 1. Backend Setup

```bash
# Navigate to backend and activate virtualenv (Windows)
cd backend
.venv\Scripts\activate

# Install dependencies (already prepared)
pip install -r requirements.txt

# Run development server
uvicorn app.main:app --reload --port 8000
```

- API Base URL: `http://localhost:8000`
- Interactive Swagger UI: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/api/v1/health`

### 2. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Start Vite dev server
npm run dev
```

- Frontend App: `http://localhost:5173` (proxies `/api` directly to `http://localhost:8000`)

### 3. Running Tests

```bash
# Run backend pytest suite from root
backend\.venv\Scripts\pytest.exe
```
