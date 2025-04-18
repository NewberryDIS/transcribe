# app/dependencies.py
from fastapi import Request, HTTPException
from app.db.supabase import get_supabase

async def get_current_user(request: Request):
    auth_token = request.cookies.get('sb-auth-token')
    if not auth_token:
        return None
    
    try:
        supabase = get_supabase()
        user = supabase.auth.get_user(auth_token)
        return user
    except Exception:
        return None

async def require_user(request: Request):
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user
