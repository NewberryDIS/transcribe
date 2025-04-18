from fastapi import APIRouter
from fastapi.responses import RedirectResponse

router = APIRouter()

# {path:path} is the catch all in FastAPI
@router.get("/{path:path}", response_class=RedirectResponse)
async def redirect_catch_all():
    return "/"