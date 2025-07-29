from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import HTMLResponse
from app.utils.templates import get_template_response
import httpx
import asyncio
from datetime import datetime
from typing import List, Dict, Optional
import os

router = APIRouter()

# Bluesky API configuration
BLUESKY_API_BASE = "https://bsky.social/xrpc"
BLUESKY_HANDLE = "germyparker.bsky.social"  # Replace with your actual handle
BLUESKY_HANDLE = "n3white.bsky.social"  # Replace with your actual handle


class BlueskyClient:
    def __init__(self):
        self.session = None
        self.access_jwt = None

    async def login(self, identifier: str, password: str):
        """Login to Bluesky and get session token"""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{BLUESKY_API_BASE}/com.atproto.server.createSession",
                json={"identifier": identifier, "password": password},
            )
            if response.status_code == 200:
                data = response.json()
                self.access_jwt = data["accessJwt"]
                return True
            return False

    async def get_profile_posts(self, actor: str, limit: int = 4) -> List[Dict]:
        """Get recent posts from a Bluesky profile"""
        if not self.access_jwt:
            # For public posts, we can use the public API without auth
            pass

        async with httpx.AsyncClient() as client:
            headers = {}
            if self.access_jwt:
                headers["Authorization"] = f"Bearer {self.access_jwt}"

            response = await client.get(
                f"{BLUESKY_API_BASE}/com.atproto.repo.listRecords",
                params={
                    "repo": actor,
                    "collection": "app.bsky.feed.post",
                    "limit": limit,
                    "reverse": False,
                },
                headers=headers,
            )

            if response.status_code == 200:
                data = response.json()
                posts = []

                for record in data.get("records", []):
                    post_data = record.get("value", {})

                    # Parse the post data
                    post = {
                        "text": post_data.get("text", ""),
                        "created_at": post_data.get("createdAt", ""),
                        "uri": record.get("uri", ""),
                        "cid": record.get("cid", ""),
                    }

                    # Format the date
                    if post["created_at"]:
                        try:
                            dt = datetime.fromisoformat(
                                post["created_at"].replace("Z", "+00:00")
                            )
                            post["formatted_date"] = dt.strftime("%B %d, %Y")
                            post["relative_time"] = self._get_relative_time(dt)
                        except:
                            post["formatted_date"] = "Recently"
                            post["relative_time"] = "Recently"

                    # Create Bluesky post URL
                    post_id = post["uri"].split("/")[-1] if post["uri"] else ""
                    post["url"] = f"https://bsky.app/profile/{actor}/post/{post_id}"

                    posts.append(post)

                return posts
            else:
                return []

    def _get_relative_time(self, dt: datetime) -> str:
        """Get relative time string"""
        now = datetime.now(dt.tzinfo)
        diff = now - dt

        if diff.days > 0:
            return f"{diff.days}d ago"
        elif diff.seconds > 3600:
            return f"{diff.seconds // 3600}h ago"
        elif diff.seconds > 60:
            return f"{diff.seconds // 60}m ago"
        else:
            return "just now"


bluesky_client = BlueskyClient()

# Optional: Login if we get hit by rate limits
# Set as env variables
# async def init_bluesky():
#     username = os.getenv("BLUESKY_USERNAME")
#     password = os.getenv("BLUESKY_PASSWORD")
#     if username and password:
#         await bluesky_client.login(username, password)


# @router.get("/posts")
# async def get_bluesky_posts():
#     """API endpoint to fetch latest Bluesky posts"""
#     try:
#         posts = await bluesky_client.get_profile_posts(BLUESKY_HANDLE, limit=4)
#         return {"posts": posts}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error fetching posts: {str(e)}")


@router.get("/feed", response_class=HTMLResponse)
async def bluesky_feed_component(request: Request):
    """Returns the Bluesky feed HTML"""
    try:
        posts = await bluesky_client.get_profile_posts(BLUESKY_HANDLE, limit=4)

        print(f"posts: {posts}")
        # Generate HTML for the posts
        return get_template_response(
            "chunks/bsky.html",
            {
                "request": request,
                "posts": posts,
                "bsky_username": BLUESKY_HANDLE,
            },
        )
    except Exception as e:
        return f"""
        <div class="bluesky-feed-container">
            <div class="bluesky-header">
                <h2>Latest from our Bluesky</h2>
            </div>
            <div class="bluesky-posts">
                <p class="error-message">Unable to load any posts.{e}</p>
            </div>
        </div>
        """
