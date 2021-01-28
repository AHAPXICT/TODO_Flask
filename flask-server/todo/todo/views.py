from todo.todo import todo


@todo.route('/')
def index():
    return '<h1>Todo app</h1>'
