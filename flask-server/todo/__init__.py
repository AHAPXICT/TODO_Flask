from flask import Flask
from flask_sqlalchemy import SQLAlchemy


from config import config


db = SQLAlchemy()


def _access_control(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET,HEAD,PUT,PATCH,POST,DELETE'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response


def register_blueprints(app):
    from .api import api_v1

    app.register_blueprint(api_v1, url_prefix='/api')


def create_app(config_name: str):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    app.after_request(_access_control)

    db.init_app(app)


    register_blueprints(app)

    return app
