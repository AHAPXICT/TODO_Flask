from flask import Blueprint
from flask_restful import Api


from todo.todo import views


api_v1 = Blueprint('api_v1', __name__)

api = Api(api_v1)

api.add_resource(views.TodoListResource, '/todos')
