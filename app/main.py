from fastapi import FastAPI, Response, Request, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.exception_handlers import http_exception_handler

from app.api.v1.exceptions import FormError, LoginError, SignupError, ResetError
from app.api.v1 import (
    index,
    static_pages,
    mss,
    ms,
    page,
    creators,
    # reader,
    review,
    transcribe,
    auth,
    catch_all,
    webhooks,
)
from app.core.config import get_settings

settings = get_settings()
app = FastAPI(title=settings.PROJECT_NAME)

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/robots.txt")
async def robots_txt():
    return FileResponse("static/robots.txt")


# app.include_router(reader.router, prefix="/read", tags=["reader"])
#
app.include_router(mss.router, prefix="/mss", tags=["all_sets"])
app.include_router(ms.router, prefix="/ms", tags=["single_set"])
app.include_router(page.router, prefix="/page", tags=["single_page"])

app.include_router(review.router, prefix="/review", tags=["review"])
app.include_router(transcribe.router, prefix="/transcribe", tags=["transcribe"])

app.include_router(creators.router, prefix="/creators", tags=["creators"])

app.include_router(static_pages.router, tags=["static_pages"])
app.include_router(index.router, tags=["home_page"])
app.include_router(auth.router, tags=["user_acccounts"])
app.include_router(webhooks.router, tags=["api"])

# catch-all has to be last
app.include_router(catch_all.router, tags=["catch_all"])


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    if exc.status_code == 404:
        return JSONResponse(
            status_code=404,
            content={"detail": "Not Found"},
        )
    return await http_exception_handler(
        request, exc
    )  # Use the imported default handler


@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    raise HTTPException(status_code=404)


@app.exception_handler(LoginError)
async def form_error_exception_handler(request: Request, exc: LoginError):
    error_html = f"""
    <div id="error-message" class="error label-input">
        {exc.message}
    </div>
    """
    response = Response(content=error_html, media_type="text/html")
    response.headers["HX-Retarget"] = "#login-errors"
    response.headers["HX-Reswap"] = "innerHTML"
    return response


@app.exception_handler(SignupError)
async def form_error_exception_handler(request: Request, exc: SignupError):
    error_html = f"""
    <div id="error-message" class="error label-input">
        {exc.message}
    </div>
    """
    response = Response(content=error_html, media_type="text/html")
    response.headers["HX-Retarget"] = "#signup-errors"
    response.headers["HX-Reswap"] = "innerHTML"
    return response


@app.exception_handler(ResetError)
async def form_error_exception_handler(request: Request, exc: ResetError):
    error_html = f"""
    <div id="error-message" class="error">
        {exc.message}
    </div>
    """
    response = Response(content=error_html, media_type="text/html")
    response.headers["HX-Retarget"] = "#reset-errors"
    response.headers["HX-Reswap"] = "innerHTML"
    return response
