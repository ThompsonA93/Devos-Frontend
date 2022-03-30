from flask import Flask
from devoclient.config import Config

def launch_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    from devoclient.governance.routes import gv
    from devoclient.errors.routes import errors 

    app.register_blueprint(gv)
    app.register_blueprint(errors)

    return app