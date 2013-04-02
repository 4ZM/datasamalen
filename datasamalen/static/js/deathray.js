
$(function() {

    var rotation = 0,
        show_data_list = 1,
        print_time = 1
        devices_listed = 0;
        first = 1;
        regular = 0
        var times;



    updateContent()
    function updateContent() {
        $.ajax({
            url:"json",
            beforeSend: function ( xhr ) {

            }
            }).done(function ( data ) {

                $.each(data, function(id, group) {

                    var _id = group.id,
                    angel = group.angel,
                    bssid = group.bssid,
                    power = group.power,
                    local_id = bssid.toString().replace(/\:/g, '');

                    if(first == 1) {
                        localStorage.clear();
                        first = 0;
                    }

                    store_device(_id, angel, bssid, power, local_id);

                });

            setTimeout(updateContent, 5000);

        });
    }


    function store_device(_id, angle, bssid, power, local_id) {
        device = localStorage.getItem(local_id);
        if (device) {

        } else {
            localStorage.setItem(local_id,
            '{"id":"'+_id+'", ' +
                '"mac" :"'+bssid+'", ' +
                '"angle" :"'+angle+'", '+
                '"power" :"'+power+'"}');

        $(".data_2 ul").prepend('<li id="'+local_id+'">' +
            'Bssid: '+bssid+
            ' Power: '+power+
            ' Angel: '+angle+
            '</li>');
        var x_y =  x_y_from_angel(angle, power);
        list_device(_id, x_y, bssid, angle, power);

        }
    }

    function list_device(id, x_y, bssid, angle, power) {
        $(".data ul").append('<li id="'+id+'" ' +
            'class="device_info">Device ' +
            'Id: '+bssid+'<br/>' +
            'Power: '+power+'<br/>' +
            'Angel: ' +angle+'<br/><br/>' +
            '<button>nmap</button>' +
            '<button>disassociate</button>'+
            '<button>upsidedownternet</button><br/>' +
            '</li>');

        indicator(x_y, power, id, angle);
    }

    function list_devices(num) {
        len=localStorage.length

        if (show_data_list == 1) {

            for(var i=num; i<len; i++) {
                var key = localStorage.key(i);
                var value = localStorage[key];
                var value = $.parseJSON(localStorage[key]);

                $(".data ul").append('<li id="'+value['id']+'" ' +
                    'class="device_info">Device ' +
                    'Id: '+value['mac']+'<br/>' +
                    'Power: '+value['power']+'<br/>' +
                    'Angel: ' +value['angle']+'<br/><br/>' +
                    '<button>nmap</button>' +
                    '<button>disassociate</button>'+
                    '<button>upsidedownternet</button><br/>' +
                    '</li>');
                var x_y =  x_y_from_angel(value['angle'], value['power']);
                // show visualization
                indicator(x_y, value['power'], value['id'], value['angle']);
            }

        }
    }

    function x_y_from_angel(angle, power) {
        var x = parseInt(300 * Math.cos(angle));
        var y = parseInt(300 * Math.sin(angle) * -1);
        return { 'x':x, 'y':y }
    }

    function indicator(x_y, power, _id, angle){
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
            fontcolor: "#FFFFFF",
            borderRadius: size/2+"px",
            marginLeft: x,
            marginTop: y
        }).attr({"id": _id, "class": "device"}).html(angle).appendTo('.container');
        device_info();
    }

    function device_info() {
        $('.device').click(function(e){
            $(this).css({outlineStyle: "dashed", border:"3px solid black"});
            $('.device_info').hide()
            $('#'+this.id).show()
        });
    }

    server_console();
    function server_console() {
        $('.submit').click(function(e){
            var command = $('.command').val()
            e.preventDefault();
            $.ajax({
                url:"console/"+command

            }).done(function ( data ) {
                $(".data_3 ul").append('<li>' +
                    data +
                    '</li>');
                });
            $('.command').val('')
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
