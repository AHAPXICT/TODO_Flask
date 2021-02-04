from flask_restful import Resource, reqparse
from flask import abort


from ..common.common import pretty_todo_response
from .models import Todo
from sqlalchemy.exc import SQLAlchemyError
from todo import db


class TodoListResource(Resource):
    """Todo list."""

    def __init__(self):
        self.parser = reqparse.RequestParser()

    @staticmethod
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
        self.parser.add_argument('body', type=str, help='Body for todo, can be empty.')
        args = self.parser.parse_args()

        todo = Todo(title=args['title'], body=args['body'])

        try:
            db.session.add(todo)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            return 'Database error.', 500
        else:
            return 'Done.', 201


class TodoResource(Resource):
    """Todo item."""

    def __init__(self):
        self.parser = reqparse.RequestParser()

    @staticmethod
    def get(self, todo_slug):

        if not Todo.query.filter_by(slug=todo_slug).first():
            abort(404)

        try:
            todo = Todo.query.filter_by(slug=todo_slug).first()
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

        if not Todo.query.filter_by(slug=todo_slug).first():
            abort(404)

        try:
            self.parser.add_argument('title', type=str, help='Title for todo.')
            self.parser.add_argument('body', type=str, help='Body for todo, can be empty.')
            self.parser.add_argument('is_complete', type=bool, help='Whether the task is completed.')

            args = self.parser.parse_args()

            todo = Todo.query.filter_by(slug=todo_slug).first()

            todo.title = args['title']
            todo.body = args['body']
            todo.is_complete = args['is_complete']

            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            return 'Database error.', 500
        else:
            return 'Updated.', 201
        pass

    @staticmethod
    def delete(self, todo_slug):

        if not Todo.query.filter_by(slug=todo_slug).first():
            abort(404)

        try:
            Todo.query.filter_by(slug=todo_slug).delete()
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            return 'Database error.', 500
        else:
            return 'Deleted.', 200
