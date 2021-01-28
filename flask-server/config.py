import db_connection_config


class BaseConfig:
    """Base config class"""
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(BaseConfig):
    """Development environment specific config"""
    DEBUG = True
    TESTING = False

    connection = f"mysql+pymysql://{db_connection_config.dbuser}:{db_connection_config.dbpass}" \
                 f"@{db_connection_config.dbhost}/{db_connection_config.dbname}"

    SQLALCHEMY_DATABASE_URI = connection


class TestingConfig(BaseConfig):
    """Testing environment specific config"""
    TESTING = True
    DEBUG = False


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,

    'default': DevelopmentConfig
}
