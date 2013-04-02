from flask import render_template, Blueprint, jsonify, request
from datasamalen import app
from datasamalen.models import Device
from datasamalen.mock_data import *
from fabric.api import local


devices = Blueprint('devices', __name__, template_folder='templates')


@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/json', methods = ['GET'])
def api_root():
    if request.method == 'GET':
        devices = Device.objects.all().order_by('-_id')[:20]
        devices_data = {}
        for d in devices:
            id = str(d.id)

            devices_data[d.mac] = {'power':d.power,'angel':d.angel,'bssid':d.bssid, 'id':id}

        resp = jsonify(devices_data)
        resp.status_code = 200

        return resp


@app.route('/muck', methods = ['GET'])
def muck():
    device_data = create_device()
    resp = jsonify(device_data)
    resp.status_code = 200

    return resp

@app.route('/disassociate/<device>', methods = ['GET'])
def disassociate(device):
    ## TODO make disassociation logic
    message = {}
    message[device] = 'disassociated'
    resp = jsonify(message)
    resp.status_code = 200

    return resp



@app.route('/test', methods = ['GET'])
def first():
    local("ls")
    return "test ok"



def create_device():
    device = Device(
        mac=generate_id(),
        power=str(generate_num(100)),
        angel=str(generate_num(360)),
        bssid=generate_id(),
        packets=str(generate_num(9999))
    )

    device.save()
    device_data = {}
    device_data[device.mac] = {'power':device.power,'angel':device.angel,'bssid':device.bssid}

    return device_data
