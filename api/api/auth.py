import os
from datetime import timedelta

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from fastapi_login import LoginManager
from dotenv import load_dotenv

from db import AuthDB, UserExistsException
from models import User

load_dotenv()

router = APIRouter()
manager = LoginManager(os.getenv("SECRET"), "/login", use_cookie=True, default_expiry=timedelta(days=30))
db = AuthDB(os.getenv("DETA_KEY"), "befit-users")


@manager.user_loader()
def load_user(email: str):
    return db.get_user(email)


@router.post("/login")
def login(user: User, response: JSONResponse):
    if db.get_user(user.email) is None:
        return JSONResponse({"message": "User not found"}, 200)

    if db.check_password(user.email, user.password):
        token = manager.create_access_token(data={"sub": user.email})
        response = JSONResponse({"user": {"email": user.email}, "access_token": token})
        manager.set_cookie(response, token)
        response.status_code = 200
        return response
    return JSONResponse({"message": "Invalid password"}, 401)


@router.post("/register")
def register(user: User, response: JSONResponse):
    if db.get_user(user.email) is not None:
        return JSONResponse({"message": "User already exists"}, 200)

    try:
        db.create_user(user.email, user.password)
    except UserExistsException:
        return JSONResponse({"message": "User already exists"}, 200)
    
    token = manager.create_access_token(data={"sub": user.email})
    response = JSONResponse({"user": {"email": user.email}, "access_token": token})
    manager.set_cookie(response, token)
    response.status_code = 200
    return response


@router.get("/logout")
def logout(response: JSONResponse, user=Depends(manager)):
    response = JSONResponse({"message": "Logged out"})
    manager.unset_cookie(response)
    response.status_code = 200
    return response

@router.get("/checkjwt")
def checkjwt(_=Depends(manager)):
    return JSONResponse({"valid": True}, 200)