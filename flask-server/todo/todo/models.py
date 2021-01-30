from datetime import datetime
from todo import db
from sqlalchemy.orm import validates


class Todo(db.Model):
    """Todo model."""

    __tablename__ = 'todos'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(80), index=True, nullable=False)
    body = db.Column(db.Text, default='', nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    # slug = db.Column(db.String, default='', unique=True, nullable=False)

    @validates('created_at')
    def validates_created_at(self, key, value):
        if self.created_at or value:
            raise ValueError("Created_at cannot be modified.")

        return value

    # @validates('created_at')
    # def validates_created_at(self, key, value):
    #     if self.created_at:
    #         raise ValueError("Created_at cannot be modified.")
    #
    #     return value

    @validates('updated_at')
    def validates_updated_at(self, key, value):
        if not isinstance(value, datetime):
            raise ValueError("Value for updated_at must be a datetime.")
        return value

    # def __init__(self, title, body=''):
    #     self.title = title
    #     self.body = body

    def __repr__(self):
        return f'<Todo {self.id}, {self.title}>'
