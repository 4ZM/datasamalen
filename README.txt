DeathRay 2S23 

Sparvnästet have been invited to take part in the event Art Hack Day
at Bonniers Konsthall. The event will be 11-13 April and has the theme
of Life-logging about the relation between memory and digital
information.

The project we are planning is based on the possibility to pick up
wifi-probe requests. The requests are messages sent by wifi-devices to
see if they are close to some network that they have been connected to
previously. For instance your phone regularly broadcasts the SSID of
your home network, your work network and some other random networks
that you have been using in the past.

We will build a very directional 2.4Ghz wifi Yagi antenna and mount it
on a tripod with a motor to rotate it. The antenna would scan the
surroundings continuously to identify devices and pick up all their
probe requests. This data will then be visualized on a radar
screen. It can be quite scary and interesting to realize that you are
sharing that information.

If there is time, there are several ways to expand on this. It would
be fairly easy to add additional information to the blips on the radar
screen. Like display what kind of device it is by checking the
MAC-address against the IEEEs table, what ports are open and what
services the device run by doing a nmap scan, etc.

In a second release we would let visitors select a blip on the radar
screen and have the antenna start tracking it. In the tracking mode we
could also implement a wifi mitm to mess with the connection of the
tracked person for instance turning the web upside down or in other
ways change the data.

The project consists of building the hardware; the rotation
control-mechanism with the antenna connected to a computer. Handle the
data; intercept the requests and parsing them to accessible data and
then finally build a visualization from it.
