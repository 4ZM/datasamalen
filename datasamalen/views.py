from flask import render_template, Blueprint, jsonify, request
from datasamalen import app
from datasamalen.models import Device
from datasamalen.mock_data import *
from fabric.api import local
from datetime import datetime

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
    t = datetime.now().strftime('[%H:%M:%S]')
    print t
    if command == '--help':
        return '%s Commands: 1:[restart wlan] 2:[start mon] [stop mon] 3:[start dump] [stop dump]' %  str(t)
    elif command == 'restart wlan':
        restart_wlan()
        return '%s wlan restarted' % str(t)
    elif command == 'start mon':
        start_monitor()
        return '%s start monitor mode' % str(t)
    elif command == 'start scan':
        start_scan()
        return '%s start scanning' % str(t)
    elif command == 'stop mon':
        stop_monitor()
        return '%s stop monitor mode' % str(t)
    elif command == 'run data':
        run_dump()
        return '%s dumping data into database' % str(t)
    else:
        return '%s --help' % str(t)


def restart_wlan():
    local("sudo ifconfig wlan0 down")
    local("sudo ifconfig wlan0 up")
    return "restaring deathray"


def start_scan():
    local("sudo ifconfig wlan0 down")
    local("sudo ifconfig wlan0 up")
    local("sudo airmon-ng start wlan0")
    local("sudo airodump-ng mon0")
    return "scanning"

def start_monitor():
    local("sudo airmon-ng start wlan0")
    return "running air-mon"

def stop_monitor():
    local("sudo airmon-ng stop mon0")
    return "stopping air-mon"


def start_airmon():
    local("sudo airodump-ng mon0")
    return "mon down"

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
