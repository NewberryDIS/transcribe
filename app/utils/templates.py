from fastapi.templating import Jinja2Templates
from typing import Dict, Any

templates = Jinja2Templates(directory="templates")

themes = [ 
    "nt-2KXJ8Z1ZLV0H",
    "nt-2KXJ8ZE0DCKJ",
    "nt-2KXJ8ZELYODH",
    "nt-2KXJ8ZSA8ZZBB",
    "nt-2KXJ8ZSCY4XHT",
    "nt-2KXJ8ZSF6FBKA",
    "nt-2KXJ8ZSFQB9OQ",
    "nt-2KXJ8ZSKYV4OE",
    "nt-2KXJ8ZW261H8",
    "nt-2KXJ8ZW2MKF1",
    # new additions
    "nt-2KXJ8ZSC09H2L",
    "nt-2KXJ8ZS8UB8KB",
    "nt-2KXJ8ZSLOJ965",
    "nt-2KXJ8ZJ78RKI",
    "nt-2KXJ8ZS2V831N",
    "nt-2KXJ8ZQ50KYQ"
]


def get_template_response(template_name: str, context: Dict[str, Any], status_code: int = 200):

    globals = {
        "themes": themes,
    }
    
    merged_context = {**globals, **context}
    
    request = merged_context["request"]
    return templates.TemplateResponse(
        request=request,
        name=template_name,
        context=merged_context,
        status_code=status_code
    )
