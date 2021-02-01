from flask_restful import Resource


from ..common import pretty_result


class TodoListResource(Resource):

    def get(self):
        return "<h1>Api</h1>"
