#!/usr/bin/python2.7
"""
Copyright (c) 2013 Anders Sundman <anders@4zm.org>

This file is part of Datasamalen

Datasamalen is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Datasamalen is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Datasamalen.  If not, see <http://www.gnu.org/licenses/>.
"""

import sys

import pymongo
from datetime import datetime
from pymongo import MongoClient
import re

import serial

# Open the serial port (angle data from arduino) if available
try:
    s = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
except:
    s = None
    print('No serial interface found - running without angle info')
    
# Client observation
#   mac
#-   connected
#   power
#   probes
#   angle
#   time

# AP observation

# Client
#   mac
#   probes
#   


# AP

# 

def parse_airodump(line):
    """ Process one line from the airodump scrubber """
    parts = line.split()
    if (parts[0] == 'A'):
        return parse_ap(line)
    elif (parts[0] == 'C'):
        return parse_client(line)
    

def parse_client(line):
    """ """
    parts = line.split()
    date, time = parts[1:3]
    ap, mac = parts[3:5]
    pwr = parts[5]
    probes = line[90:]

    #print(mac)
    #print(''.join(['  AP  ', ap]))
    #print(''.join(['  PWR ', pwr]))
    #print(''.join(['  PRB ', probes]))

    pwr = int(pwr)
    
    client = dict()
    client['type'] = 'client'
    client['mac'] = mac
    client['power'] = pwr if pwr < -1 and pwr > -127 else None 
    client['probes'] = [s.strip() for s in probes.split(',')]
    return client
    
def parse_ap(line):
    """ """
    ap = dict()
    ap['type'] = 'ap'
    return ap
    
def add_angle_info(sample):
    """ If available, add angular data to data point """

    angle_reading = s.readline() if s else None
    
    sample['angle'] = int(angle_reading[:-2]) if angle_reading and re.match('^-?[0-9]+\r\n', angle_reading) else None

def update_db(sample):
    """ Add the sample to the db, or update the data allready there """  

    if sample['type'] != 'client':
        return
    
    # Register the observation
    client_observations = db.client_observations
    client_observations.insert({
            'mac': sample['mac'],
            'time': datetime.utcnow(),
            'power': sample['power'],
            'angle': sample['angle'],
            })


    # Get the clients collection
    clients = db.clients

    # Get the client if it is already known
    client = clients.find_one({"mac": sample['mac']})     

    # If it's a new client, insert it
    if not client:
        clients.insert({
                'mac': sample['mac'],
                'probes': sample['probes'],
                })
        
    # If it's a known client, update it
    else:
        client['probes'] = list(set(client['probes']) | set(sample['probes']))
        clients.save(client)


mongo_client = MongoClient('localhost', 27017)
db = mongo_client.deathray
    
last_line = sys.stdin.readline()
while last_line != '':
    sample = parse_airodump(last_line)
    add_angle_info(sample)

    # do some noise reduction

    update_db(sample)
    
    last_line = sys.stdin.readline()

    
