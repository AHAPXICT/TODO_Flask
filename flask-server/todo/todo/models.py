from datetime import datetime
from todo import db
from sqlalchemy.orm import validates


class Todo(db.Model):
    """Todo model."""

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(80), index=True, nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    @validates('created_at')
    def validates_created_at(self, key, value):
        if self.created_at:
            raise ValueError('Created_at cannot be modified.')

        return value

    def __init__(self, title, body):
        self.title = title
        self.body = body

    def __repr__(self):
        return f'<Todo {self.id}, {self.body}>'
