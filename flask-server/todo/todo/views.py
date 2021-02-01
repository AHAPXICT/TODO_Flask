from flask_restful import Resource, reqparse


from ..common.common import pretty_todo_response
from .models import Todo
from sqlalchemy.exc import SQLAlchemyError
from todo import db


class TodoListResource(Resource):
    """Todo list."""

    def __init__(self):
        self.parser = reqparse.RequestParser()

    def get(self):
        try:
            todos = Todo.query.all()
        except SQLAlchemyError as e:
            db.session.rollback()
            return 'Database error.', 500
        else:
            data = []

            for todo in todos:
                data.append(
                    pretty_todo_response(
                        title=todo.title,
                        body=todo.body,
                        slug=todo.slug,
                        created_at=todo.created_at,
                        is_complete=todo.is_complete
                    )
                )

            return data, 200

    def post(self):

        self.parser.add_argument('title', type=str, help='Title for todo, must be set.', required=True)
        self.parser.add_argument('body', type=str, help='body for todo, can be empty.')
        args = self.parser.parse_args()

        todo = Todo(title=args['title'], body=args['body'])

        try:
            db.session.add(todo)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            return 'Database error.', 500
        else:
            return 'Done', 201


class TodoResource(Resource):
    """Todo item."""

    def get(self, todo_slug):
        try:
            if Todo.query.filter_by(slug=todo_slug).first():
                todo = Todo.query.filter_by(slug=todo_slug).first()
            else:
                return 'Not found.', 404
        except SQLAlchemyError as e:
            db.session.rollback()
            return 'Database error.', 500
        else:
            response = pretty_todo_response(
                title=todo.title,
                body=todo.body,
                slug=todo.slug,
                created_at=todo.created_at,
                is_complete=todo.is_complete
            )
            return response, 200

    def put(self, todo_slug):
        pass

    def delete(self, todo_slug):
        try:
            if Todo.query.filter_by(slug=todo_slug).first():
                Todo.query.filter_by(slug=todo_slug).delete()
                db.session.commit()
            else:
                return 'Not found.', 404
        except SQLAlchemyError as e:
            db.session.rollback()
            return 'Database error.', 500
        else:
            return 'Deleted.', 200
