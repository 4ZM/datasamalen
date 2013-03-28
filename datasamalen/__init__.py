from flask import Flask
from flask.ext.mongoengine import MongoEngine
from flask import request
from flask import jsonify

app = Flask(__name__)
app.config["MONGODB_SETTINGS"] = {'DB': "datasamalen"}
app.config["SECRET_KEY"] = "KeepThisS3cr3t"

db = MongoEngine(app)

class Device(db.Document):
    mac = db.StringField(max_length=17)
    power = db.StringField(max_length=3)
    packets = db.StringField(max_length=5)
    bssid = db.StringField(max_length=17)
    angel = db.StringField(max_length=3)

    def __unicode__(self):
        return self.mac

@app.route('/', methods = ['GET',])
def api_root():
    if request.method == 'GET':
        devices = Device.objects.all()
        devices_data = {}
        i = 1
        for d in devices:
            devices_data[i] = "[{'mac':'"+d.mac+"','power':'"+d.power+"','angel':'"+d.angel+"','bssid':'"+d.bssid+"']}"
            i = i + 1
        j = jsonify(devices_data)
        return j

if __name__ == '__main__':
    app.run()


