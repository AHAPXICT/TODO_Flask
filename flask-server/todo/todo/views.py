from flask_restful import Resource
from flask import json


from ..common.common import pretty_result
from ..common.code import *
from .models import Todo
from sqlalchemy.exc import SQLAlchemyError
from todo import db


class TodoListResource(Resource):
    """Todo list."""

    def get(self):
        try:
            todos = Todo.query.all()
        except SQLAlchemyError as e:
            db.session.rollback()
            return pretty_result(InternalServerError, 'database error')
        else:
            data = []

            for todo in todos:
                data.append({
                    'slug': todo.slug,
                    'title': todo.title,
                    'body': todo.body,
                    'created_at': str(todo.created_at)
                })

            return pretty_result(OK, data)
