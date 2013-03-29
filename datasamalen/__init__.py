from flask import Flask
from flask.ext.mongoengine import MongoEngine

app = Flask(__name__)
app.config["MONGODB_SETTINGS"] = {'DB': "datasamalen"}
app.config["SECRET_KEY"] = "KeepThisS3cr3t"
app.debug = True

db = MongoEngine(app)

if __name__ == '__main__':
    app.run()

def register_blueprints(app):
    # Prevents circular imports
    from datasamalen.views import devices
    app.register_blueprint(devices)

register_blueprints(app)

