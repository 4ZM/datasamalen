from flask import render_template, Blueprint, jsonify, request
from datasamalen import app
from datasamalen.models import Device

devices = Blueprint('devices', __name__, template_folder='templates')


@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/json', methods = ['GET'])
def api_root():
    if request.method == 'GET':
        devices = Device.objects.all().order_by('-mac')
        devices_data = {}
        for d in devices:
            devices_data[d.mac] = {'power':d.power,'angel':d.angel,'bssid':d.bssid}

        resp = jsonify(devices_data)
        resp.status_code = 200

        return resp
