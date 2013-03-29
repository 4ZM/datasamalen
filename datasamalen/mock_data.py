import random
from models import Device
import time
def generate_id():
    id = ''
    characters = 'ABCD1234567890'
    id_length = 12
    n = 1
    for y in range(id_length):
        id += characters[random.randint(0, len(characters)-1)]
        if n == 2:
            id += ":"
            n = 0
        n = n + 1
    return id[:-1]


def generate_num(length):
    number = random.randrange(0, length, 2)
    return number

def mock_one_data():
    devices_data = {'mac':generate_id(), 'power':generate_num(100),'angel':generate_num(360), 'bssid':generate_id(), 'packets':generate_num(9999)}
    return devices_data


def create_device():
    device = Device(
        mac=generate_id(),
        power=str(generate_num(100)),
        angel=str(generate_num(360)),
        bssid=generate_id(),
        packets=str(generate_num(9999))
    )
    time.sleep(2)
    print "new device created"
    device.save()

from threading import Thread

for i in range(10):
    t = Thread(target=create_device())
    t.start()
