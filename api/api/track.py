import os
import uuid

from fastapi import APIRouter, Depends

from auth import manager
from models import Log
from db import LogDB

router = APIRouter()
db = LogDB(os.getenv("DETA_KEY"), "befit-logs")


@router.get("/logs")
def get_logs(user=Depends(manager)):
    return db.get_logs(user["key"])


@router.post("/create/log")
def create_log(log: Log, user=Depends(manager)):
    return db.create_update_log(user["key"], log, str(int(uuid.uuid4())))


@router.put("/update/log/{lid}")
def update_log(lid: str, log: Log, user=Depends(manager)):
    return db.create_update_log(user["key"], log, lid)


@router.delete("/delete/log/{lid}")
def delete_log(lid: str, _=Depends(manager)):
    return db.delete_log(lid)


@router.get("/log/{lid}")
def get_log(lid: str, _=Depends(manager)):
    return db.get_log(lid)
