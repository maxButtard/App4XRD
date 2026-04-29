from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.api.routes import xrd

app = FastAPI(title="App4XRD API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# STATIC FILES
# =========================

app.mount("/static", StaticFiles(directory="app/static"), name="static")

# =========================
# ROUTES
# =========================

app.include_router(xrd.router, prefix="/xrd")


@app.get("/")
def root():
    return {
        "message": "App4XRD API running"
    }
@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse("app/static/favicon.png")