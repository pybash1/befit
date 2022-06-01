from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

import auth
import track

origins = ["http://localhost", "https://localhost", "*"]

api = FastAPI(title="BeFit API", version="0.1.0", description="API for BeFit the free and open source fitness tracker")
api.include_router(auth.router, tags=["Authentication"])
api.include_router(track.router, tags=["Tracking"])
api.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["*"], allow_headers=["*"])

@api.get("/")
def index():
    return JSONResponse(
        {
            "error": False,
            "message": "All Systems Operational"
        },
        200
    )