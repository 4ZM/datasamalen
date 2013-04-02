from flask import render_template, Blueprint, jsonify, request
from datasamalen import app
from datasamalen.models import Device
from datasamalen.mock_data import *
from fabric.api import local
import time

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

@app.route('/console/<command>', methods = ['GET'])
def command(command):
    if command == '--help':
        return "help section"
    elif command == 'restart wlan':
        start_monitor()
        return "wlan restarted"
    else:
        return "--help"


def start_monitor():
    local("sudo ifconfig wlan0 down")
    local("sudo ifconfig wlan0 up")
    return "restaring deathray"

@app.route('/start_mon0', methods = ['GET'])
def start_monitor():
    local("sudo airmon-ng start wlan0")
    return "running air-mon"

@app.route('/stop_mon0', methods = ['GET'])
def stop_monitor():
    local("sudo airmon-ng stop wlan0")
    return "stopping air-mon"

@app.route('/monitor_airmon', methods = ['GET'])
def start_airmon():
    local("sudo airodump-ng mon0")
    return "running air-mon"

@app.route('/run_dump', methods = ['GET'])
def run_dump():
    local("perl airodump-scrubber.pl")
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
