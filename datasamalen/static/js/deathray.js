
$(function() {

    var rotation = 0,
        show_data_list = 1;

    $.get("json", function(data) {
        $.each(data, function(id, group) {
            var _id = group.id,
                angel = group.angel,
                bssid = group.bssid,
                x_y =  x_y_from_angel(angel),
                power = group.power,
                local_id = bssid.toString().replace(/\:/g, '');
                j = 1;

            // add device to localstorage
            if (localStorage.getItem(local_id))
                var v =  delete localStorage[local_id];
            localStorage.setItem(local_id,
                    '{"id":"'+_id+'", ' +
                    '"mac" :"'+bssid+'", ' +
                    '"angle" :"'+angel+'", '+
                    '"power" :"'+power+'"}');


            // show visualization
            indicator(x_y, power, _id, bssid, angel);

            list_devices();
        });
    });

    function list_devices() {
        if (show_data_list == 1) {
            for(var i=0, len=localStorage.length; i<len; i++) {
                var key = localStorage.key(i);
                var value = localStorage[key];

                var value = $.parseJSON(localStorage[key]);

                $(".data ul").append('<li id="'+value['id']+'" ' +
                    'class="device_info">Device ' +
                    'id: '+value['mac']+'<br/>' +
                    'Power:'+value['power']+
                    ' Angel: ' +value['angle']+'<br/>' +
                    '<button>nmap</button>' +
                    '<button>disassociate</button>'+
                    '<button>upsidedownternet</button><br/>' +
                    '</li>');

            }
        }
    }

    function x_y_from_angel(angle) {
        var x = 0 + 400 * Math.cos(angle);
        var y = 0 + 400 * Math.sin(angle);
        return { 'x':x, 'y':y }
    };

    function indicator(x_y, power, _id, bssid, angel){
        var x = x_y.x
        var y = x_y.y

        if (power > 79) {
            var level = "highest",
                size = 100,
                color = "red";
        } else if (power > 60) {
            var level = "high",
                size = 60,
                color = "#ff6e00";
        } else if (power > 40) {
            var level = "medium",
                size = 40,
                color = "#f6e016";
        } else if (power > 20) {
            var level = "low",
                size = 32,
                color = "#0051ff";
        } else {
            var level = "minor",
                size = 16,
                color = "#22ff00";
        }

        $('.'+level).clone().css({
            position: "absolute",
            opacity: "0.9",
            top: "500px",
            left: "500px",
            zIndex: "100",
            cursor: "pointer",
            boxShadow: "0px 0px 10px #22ff00",
            width: size+"px",
            height: size+"px",
            backgroundColor: color,
            borderRadius: size/2+"px",
            marginLeft: y,
            marginTop: x
        }).attr({"id": _id, "class": "device"}).appendTo('.container');
        device_into(level, power, angel, bssid);
    }

    function device_into(level, power, angel, bssid) {
    $('.device').click(function(e){
        $(this).css({outlineStyle: "dashed"}).append(".");

        $('.device_info').hide()
        $('#'+this.id).show()
        console.log(this.id)
    });
    }


    if (rotation == 1) {
        var degree = 90, // starting position
            $element = $('#meter'),
            timer,
            speed = 10, // update rate in milli sec. higher is slower
            length = 1;

        rotate();

        function rotate() {
            $element.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
            $element.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
            timer = setTimeout(function() {
                degree = degree + length;
                rotate();
            },speed);
        }
    }
    else
        $('#meter').remove()



});
