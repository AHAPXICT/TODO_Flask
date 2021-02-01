from datetime import datetime


def pretty_todo_response(title: str,
                         body: str,
                         slug: str,
                         created_at: datetime,
                         is_complete: bool) -> dict:
    return {
                'slug': slug,
                'title': title,
                'body': body,
                'created_at': str(created_at),
                'is_complete': is_complete
                }
