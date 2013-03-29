from datasamalen import db

class Device(db.Document):
    mac = db.StringField(max_length=17)
    power = db.StringField(max_length=3)
    packets = db.StringField(max_length=5)
    bssid = db.StringField(max_length=17)
    angel = db.StringField(max_length=3)

    def __unicode__(self):
        return self.mac

