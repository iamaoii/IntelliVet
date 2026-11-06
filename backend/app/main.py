from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.database import engine, Base
from app.api.v1.health import router as health_router
from app.api.v1.auth import router as auth_router

# Import all models so Base has them registered
import app.models

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Auto-create tables on startup (especially helpful in dev mode)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="IntelliVet: Intelligent Centralized Veterinary System Backend API",
    version="0.1.0",
    lifespan=lifespan
)

# CORS setup
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Include Routers
app.include_router(health_router, prefix=settings.API_V1_STR, tags=["Health"])
app.include_router(auth_router, prefix=f"{settings.API_V1_STR}/auth", tags=["Authentication"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to IntelliVet API",
        "docs_url": "/docs",
        "version": "0.1.0"
    }
