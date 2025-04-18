from sqlalchemy.orm import Session
from sqlalchemy import func, select, and_, distinct
from app.models import Ms, Filter


def get_filters(db: Session, page_type: str = "transcribe"):
    """Get available filters, optionally filtered by page type (transcribe/review)"""
    # Start with the base filter query
    filter_query = select(
        Filter.filter_group,
        Filter.human_value,
        Filter.slug_value,
        func.count(distinct(Filter.ms_id)).label("count"),
    )

    # Join with manuscripts and add conditions based on page type
    filter_query = filter_query.join(Ms, Filter.ms_id == Ms.ms_id)

    if page_type == "transcribe":
        filter_query = filter_query.where(Ms.transcribed < Ms.num_pages)
    elif page_type == "review":
        filter_query = filter_query.where(
            and_(Ms.transcribed > 0, Ms.reviewed < Ms.num_pages)
        )

    filter_query = filter_query.group_by(
        Filter.filter_group, Filter.human_value, Filter.slug_value
    )

    filter_results = db.execute(filter_query).all()

    filters = {"subject": [], "language": [], "format": []}
    all_dates = []

    for filter in filter_results:
        if filter.filter_group in [
            "date_start",
            "date_end",
        ] and filter.slug_value not in ["0", "9999"]:
            all_dates.append(filter.slug_value)
        elif filter.slug_value in ["0", "9999"]:
            continue
        else:
            if filter.filter_group not in filters:
                filters[filter.filter_group] = []
            filters[filter.filter_group].append(
                {
                    "hvalue": filter.human_value,
                    "svalue": filter.slug_value,
                    "count": filter.count,
                }
            )

    for filter_group in filters:
        filters[filter_group] = sorted(filters[filter_group], key=lambda d: d["hvalue"])
        # print(f"filters in {filter_group}: {filters[filter_group]}")

    date_range = [min(all_dates), max(all_dates)] if all_dates else []

    return filters, date_range
