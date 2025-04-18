from fastapi import APIRouter, Depends, HTTPException, Request, Response, Form, status, File, UploadFile
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from typing import Annotated
# import jwt
from datetime import datetime
from typing import Optional

from app.utils.templates import get_template_response
from .exceptions import FormError, LoginError, SignupError, ResetError
from app.utils.markdown_handler import MarkdownHandler
from app.db.sql import get_db
from app.db.supabase import supabase
from app.models import Users, Contribution
from sqlalchemy import select, desc
import uuid
from datetime import datetime
# import pytz

import logging
logger = logging.getLogger(__name__)

router = APIRouter()
markdown_handler = MarkdownHandler()
templates = Jinja2Templates(directory="templates")


def require_auth(request: Request):
    token = request.cookies.get("sb-auth-token")
    if not token:
        return RedirectResponse(url="/login", status_code=303)
    return token

async def get_current_user(
    request: Request,
    db: Annotated[Session, Depends(get_db)],
    token: str = Depends(require_auth)
) -> Users:
    try:
        user_resp = supabase.auth.get_user(token)
        if user_resp:
            # print(user_resp.user)
            db_user = db.query(Users).filter(Users.id == user_resp.user.id).first()
            return db_user
        else:
            return None
    except Exception as e:
        return e

# TODO: combine /user and /login
# BUG: if you're logged in and you go to login, it pukes forever
# -- fixed with simple redirect to user; maybe we find a better solution for this tho

@router.get("/user", response_class=HTMLResponse)
async def user_page(
    request: Request,
    auth_result: Annotated[str, Depends(require_auth)]
):
    logger.info("Starting user_page route")
    if isinstance(auth_result, RedirectResponse):
        logger.info("Redirecting unauthenticated user to login page")
        return auth_result

    try:
        logger.info("Verifying Auth token")
        auth_response = supabase.auth.get_user(auth_result)
        # The user data is nested in the response
        user_id = auth_response.user.id  # Access the ID correctly
        
        logger.info(f"Got user ID: {user_id}")
        
        with next(get_db()) as db:
            logger.info("Querying database for user")
            db_user = db.query(Users).filter(Users.id == user_id).first()
            if not db_user:
                logger.info("User not found in database")
                return RedirectResponse(url="/login", status_code=303)
            
            # Create a dict of user data to avoid potential lazy loading issues
            user_data = {
                "id": db_user.id,
                "username": db_user.username,
                "email": db_user.email,
                "has_verified_email": db_user.has_verified_email,
                "created_at": db_user.created_at,
                "updated_at": db_user.updated_at,
                "contribution_count": db_user.contribution_count,
                "avatar":db_user.avatar
            }
            username = db_user.username
            contributions = db.scalars(select(Contribution).where(Contribution.username == username).order_by(desc(Contribution.contribution_timestamp))).all()
            leaderboard = db.scalars(select(Users).order_by(desc(Users.contribution_count)).limit(5)).all()
            user_background = contributions[0].image if contributions else "2KXJ8ZW261H8"

            logger.info("Rendering template")
            header_menu, footer_menu = markdown_handler.get_menus()

            return get_template_response(
                "users/user.html",
                {"request": request, 
                "user": user_data, 
                "contributions": contributions,
                "user_background": user_background,
                "leaderboard": leaderboard,
                "header_menu": header_menu,
                "footer_menu": footer_menu}
            )
                
    except Exception as e:
        logger.error(f"Error in user_page: {str(e)}")
        logger.exception("Full traceback:")  # This will log the full stack trace
        return RedirectResponse(url="/login", status_code=303)

@router.get("/login")
async def login_page(request: Request, db: Annotated[Session, Depends(get_db)]):
    token = request.cookies.get("sb-auth-token")
    header_menu, footer_menu = markdown_handler.get_menus()
    if token:
        return RedirectResponse(url="/user", status_code=303)
    else: 
        leaderboard = db.scalars(select(Users).order_by(desc(Users.contribution_count)).limit(5)).all()
        return get_template_response( "auth/login.html", {
            "request": request, 
            "leaderboard": leaderboard, 
            "header_menu": header_menu,
            "footer_menu": footer_menu
        })

# this should only be accessible by authenticated users
@router.get("/reset-password", response_class=HTMLResponse)
async def reset_password(
    request: Request,
    auth_result: Annotated[str, Depends(require_auth)],
    db: Annotated[Session, Depends(get_db)],
    ):

    # TODO: check access_token from email???
    # loading page works when logged in but not with token from email
    if isinstance(auth_result, RedirectResponse):
        logger.info("Redirecting unauthenticated user to login page")
        print("failed to retrieve token")
        return auth_result
    try:
        print("loading reset page")

        user_resp = supabase.auth.get_user()
        # user_id = user_resp.user.id
        # user = do db check with id
        # username = user.username
        # user = request.cookies.get("sb-auth-token")
        header_menu, footer_menu = markdown_handler.get_menus()
        return get_template_response(
            "auth/reset-password.html",
            {"request": request, 
            "username": username, 
            "header_menu": header_menu, 
            "footer_menu": footer_menu}
        )

    except Exception as e:
        logger.error(f"Error in reset page: {str(e)}")
        logger.exception("Full traceback:")  # This will log the full stack trace
        return RedirectResponse(url="/login", status_code=303)


@router.get("/login/login-form")
async def login_form(request: Request):
    return get_template_response(
        "auth/login-form.html",
        {"request": request, "active_tab": "login"}
    )

@router.get("/login/signup-form")
async def signup_form(request: Request):
    return get_template_response(
        "auth/signup-form.html",
        {"request": request, "active_tab": "signup"}
    )

@router.get("/login/forgot-pw-form")
async def forgot_pw_form(request:Request):
    return get_template_response(
        "auth/forgot-pw-contact.html",
        # "auth/forgot-pw-form.html",
        {"request": request}
    )

@router.post("/auth/login", response_class=RedirectResponse)
async def login(
    request: Request,
    db: Annotated[Session, Depends(get_db)],
    username: str = Form(...),
    password: str = Form(...),
    # auth_result: Annotated[str, Depends(require_auth)]
):
    try:
        existing_user = db.query(Users).filter(Users.username == username).first()
        if existing_user:
            email = f"{username}@users.internal"
            if (existing_user.email):
                email = existing_user.email
        else: 
            raise LoginError("No account exists with this username")

        auth_response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        
        # If login successful, return redirect response with cookie
        response = RedirectResponse(url="/user", status_code=200)
        response.headers["HX-Redirect"] = "/user"  # Tells HTMX to do a full redirect

        response.set_cookie(
            "sb-auth-token",
            auth_response.session.access_token,
            max_age=3600,
            httponly=True,
            secure=True,
            samesite="lax"
        )
        return response

    except Exception as e:
        if e.message=="Invalid login credentials":
            raise LoginError("Incorrect password")
        raise LoginError(e)

@router.post("/auth/signup")
async def signup(
    request: Request,
    db: Annotated[Session, Depends(get_db)],
    username: str = Form(...),
    password: str = Form(...),
    confirm_password: str = Form(...),
    email: str = Form(None),
    newsletter: bool = Form(False)
):
    try:
        # Validate the input
        if len(password) < 6:
            raise SignupError("Password must be at least 6 characters")
        if len(username) < 3:
            raise SignupError("Username must be at least 3 characters")
        if password != confirm_password:
            raise SignupError("Passwords must match")

        # Check if username already exists
        existing_user = db.query(Users).filter(Users.username == username).first()
        print(existing_user)
        if existing_user:
            raise SignupError("Username already in use")

        # Create auth user with Supabase
        auth_data = {
            "password": password
        }
        
        if email:
            auth_data["email"] = email
        else:
            auth_data["email"] = f"{username}@users.internal"

        auth_response = supabase.auth.sign_up(auth_data)
        # print(f"auth_resp: {auth_response}")
        token = auth_response.session.access_token

        # Create user in our database
        db_user = Users(
            id=auth_response.user.id,
            username=username,
            email=email,
            has_verified_email=False,
            created_at=auth_response.user.created_at,
            updated_at=auth_response.user.updated_at,
            contribution_count=0,
            newsletter=newsletter,
        )
        db.add(db_user)
        db.commit()

        # Redirect with auth cookie
        # status code 200 to allow P/R/G pattern 
        response = RedirectResponse(url="/login", status_code=200)
        response.headers["HX-Redirect"] = "/login"

        response.set_cookie(
            "sb-auth-token",
            token,
            max_age=3600,
            httponly=True,
            secure=True,
            samesite="lax"
        )
        return response
 
    except Exception as e:
        print(e)
        raise SignupError(e)

@router.post("/auth/logout")
async def logout():
    logger.info("Logging out...")
    
    try:
        supabase.auth.sign_out()
    except Exception as e:
        logger.error(f"Error signing out: {str(e)}")
        raise FormError(f"Error signing out: {str(e)}")
    
    response = RedirectResponse(url="/", status_code=303)
    response.delete_cookie("sb-auth-token")
    
    logger.info("Logged out")
    return response

@router.post("/auth/set-avatar")
async def set_avatar(
    request: Request,
    db: Annotated[Session, Depends(get_db)],
    avatar_upload: UploadFile = File(...),
):
    try:
        file_extension = avatar_upload.filename.split('.')[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        contents = await avatar_upload.read()

        user_id = (supabase.auth.get_user(request.cookies.get("sb-auth-token"))).user.id
        print(user_id)
        db_user = db.query(Users).filter(Users.id == user_id).first()
        print(db_user)

        # get the old images
        # files_to_delete = (
        #     supabase.storage
        #     .from_("avatars")
        #     .list(
        #         db_user.username
        #     )
        # )

        # upload the new image
        supabase.storage.from_('avatars').upload(
            file=contents, 
            path=f"{db_user.username}/{unique_filename}",
            file_options={"content-type": avatar_upload.content_type}
        )

        db_user.avatar = f"{db_user.username}/{ unique_filename }"
        print(db_user.avatar)
        db.commit()

        response = RedirectResponse(url="/user", status_code=303)
        
    except Exception:
        # log it
        print(avatar_upload)
        # hide the save button and reload
        return RedirectResponse(url="/user", status_code=303)
        
    finally:
        await avatar_upload.close()
    return response

# @router.post("/auth/request-reset")
# async def request_reset(
#     request: Request,
#     db: Annotated[Session, Depends(get_db)],
#     email: str = Form(...)
# ):
#     try:
#         # check if account exists
#         existing_user = db.query(Users).filter(Users.email == email).first()
#         print(existing_user)
#         if existing_user:
#             #if it does then request an email
#             supabase.auth.reset_password_email(
#                 email,
#                 {'redirect_to':'http://localhost:8000/reset-password'}
#             )
#             reset_requested_html = """
#             <div class="reset-request" style="display: block;">Your request for a password reset has been submitted. Please check your email.</div>
#             """
#             return Response(content=reset_requested_html, media_type="text/html")
#     except Exception as e:
#         print(e)
#         return templates.TemplateResponse(
#             "/auth/error.html",
#             {"request": request, "error": e}
#         )
    

# @router.post("/auth/reset-password")
# async def reset_pw(
#     request: Request,
#     # auth_result: Annotated[str, Depends(require_auth)],
#     password: str = Form(...),
#     confirm_password: str = Form(...)
# ):

#     try:
#         if password != confirm_password:
#             raise ResetError("Passwords must match")

#         # TODO: auth session missing?
#         supabase.auth.get_user()
#         supabase.auth.update_user({'password': password})

#         reset_success_html = """
#             <div class="reset-success" style="display: block;">You have successfully reset your password.</div>
#             """
#         return Response(content=reset_success_html, media_type="text/html")
#     except Exception as e:
#         print(e)
#         raise ResetError(e)

