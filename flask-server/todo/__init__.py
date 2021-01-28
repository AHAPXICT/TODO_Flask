from flask import Flask
from flask_sqlalchemy import SQLAlchemy


from config import config


db = SQLAlchemy()


def register_blueprints(app: Flask):
    from .todo import todo

    app.register_blueprint(todo, url_prefix='/todo')


def create_app(config_name: str):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    db.init_app(app)

    register_blueprints(app)

    return app
