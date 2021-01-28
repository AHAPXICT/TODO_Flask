from flask_migrate import Migrate


from todo import create_app, db

app = create_app('development')
migrate = Migrate(app, db)
